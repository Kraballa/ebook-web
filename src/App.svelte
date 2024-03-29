<script>
    import LoadEpub from "./lib/LoadEpub.svelte";
    import Spine from "./lib/Spine.svelte";
    import Chapter from "./lib/Chapter.svelte";
    import Navigator from "./lib/Navigator.svelte";
    import ProgressHint from "./lib/ProgressHint.svelte";
    import Info from "./lib/Info.svelte";
    import JSZip from "jszip";
    import { parseSpine } from "./lib/parseSpine";
    import { get } from "svelte/store";
    import { getBookmark, saveBookmark } from "./lib/bookmark";
    import { book } from "./lib/stores";
    import { loadChapter } from "./lib/loadChapter";
    import { calcScrollFromWindow, calcWindowFromScroll } from "./lib/scrollCalc";
    import Styling from "./lib/Styling.svelte";

    let epubZip = null;
    let epubChapters = [];
    let chapterIndex = 0;

    let chapterContent = "";

    let scrollY = 0;
    let windowHeight = 0;
    let bookmarkScroll = -1;

    let style = '';

    $: if (scrollY !== 0) {
        createBookmark();
    }

    function createBookmark() {
        if (epubZip === null) return;
        let scrollVal = calcScrollFromWindow(windowHeight, scrollY);
        saveBookmark($book.title, chapterIndex, scrollVal);
    }

    async function handleOpenEbook(event) {
        let file = event.detail.file;
        if (file === null) return;

        const buf = file.arrayBuffer();
        epubZip = await JSZip.loadAsync(buf);
        epubChapters = await parseSpine(epubZip);

        let data = getBookmark($book.title);
        if (data !== null) {
            chapterIndex = data.chapterIndex ?? 0;
            bookmarkScroll = data.scroll ?? -1;
        }
        else{
            chapterIndex = 0;
        }
        reloadContent();
    }

    function handleCloseEbook() {
        epubZip = null;
        chapterContent = "";
        window.scrollTo(0, 0);
    }

    function handleChapterChange(event) {
        reloadContent();
        saveBookmark(get(book).title, chapterIndex);
        window.scrollTo(0, 0);
    }

    async function reloadContent() {
        if(epubChapters.length === 0){
            console.error('error, cannot parse spine');
            return;
        }
        console.log("loading chapterIdx", chapterIndex);
        chapterContent = await loadChapter(epubZip, epubChapters[chapterIndex]);
    }

    function handleIframeLoaded() {
        if (bookmarkScroll === -1) {
            return;
        }
        window.scrollTo(0, calcWindowFromScroll(windowHeight, bookmarkScroll));

        bookmarkScroll = -1;
    }
</script>

<svelte:window bind:scrollY bind:innerHeight={windowHeight}/>

<svelte:head>
    <title>
        {epubZip ? "Ebook: " + $book.title[0] ?? "Ebook Reader" : "Ebook Reader"}
    </title>
</svelte:head>

<div class="row bg">
    <LoadEpub on:ebookClosed={handleCloseEbook} on:fileSelected={handleOpenEbook} />
    {#if epubZip}
        <Spine bind:chapterIndex bind:epubChapters on:chapterChange={handleChapterChange} />
        <Navigator bind:chapterIndex bind:epubChapters on:chapterChange={handleChapterChange} />
        <Chapter bind:chapterContent on:iframeLoaded={handleIframeLoaded} bind:style/>
        <Navigator bind:chapterIndex bind:epubChapters on:chapterChange={handleChapterChange} />
        <ProgressHint />
    {:else}
        <Info />
        <Styling bind:style />
    {/if}
</div>

{@html ("<style>" + style + "</style>")}

<style>

:global(h3.small) {
    margin-bottom: 4px;
}
</style>
