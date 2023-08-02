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

    let epubZip = null;
    let epubChapters = [];
    let chapterIndex = 0;

    let chapterContent = "";

    async function handleOpenEbook(event) {
        let file = event.detail.file;
        if (file === null) return;

        const buf = file.arrayBuffer();
        epubZip = await JSZip.loadAsync(buf);
        epubChapters = await parseSpine(epubZip);

        let data = getBookmark(get(book).title);
        if (data !== null) {
            chapterIndex = data.chapterIndex;
        }
        reloadContent();
    }

    function handleCloseEbook() {
        epubZip = null;
        chapterContent = "";
    }

    function handleChapterChange(event) {
        reloadContent();
        saveBookmark(get(book).title, chapterIndex);
        window.scrollTo(0, 0);
    }

    async function reloadContent() {
        console.log("loading chapterIdx", chapterIndex);
        chapterContent = await loadChapter(epubZip, epubChapters[chapterIndex]);
    }
</script>

<div class="row bg">
    <LoadEpub on:ebookClosed={handleCloseEbook} on:fileSelected={handleOpenEbook} />
    {#if epubZip}
        <Spine bind:chapterIndex bind:epubChapters on:chapterChange={handleChapterChange} />
        <Navigator bind:chapterIndex bind:epubChapters on:chapterChange={handleChapterChange} />
        <Chapter bind:chapterContent />
        <Navigator bind:chapterIndex bind:epubChapters on:chapterChange={handleChapterChange} />
        <ProgressHint />
    {:else}
        <Info />
    {/if}
</div>

<style>
</style>
