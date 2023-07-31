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

    let file = null;

    let epubZip = null;
    let epubChapters = [];
    let chapterIndex = -1;

    let chapterContent = '';

    $: {
        //loading ebook
        if(file !== null) {
            openEbook();
        }
        else{ //close ebook
            closeEbook();
        }
    }

    $: {
        if (chapterIndex > -1) {
            reloadContent();
            saveBookmark(get(book).title, chapterIndex);
        }
    }

    async function openEbook(){
        const buf = file.arrayBuffer();
        epubZip = await JSZip.loadAsync(buf);
        epubChapters = await parseSpine(epubZip);

        let data = getBookmark(get(book).title);
        if(data !== null){
            chapterIndex = data.chapterIndex;
        }
        else{
            chapterIndex = 0;
        }
    }

    async function reloadContent() {
        console.log('loading chapterIdx', chapterIndex);
        chapterContent = await loadChapter(epubZip, epubChapters[chapterIndex]);
    }

    function closeEbook(){
        epubZip = null;
        chapterContent = '';
    }

</script>

<div class="row bg">
    <LoadEpub bind:file />
    {#if epubZip}
        <Spine bind:chapterIndex bind:epubChapters />
        <Navigator bind:chapterIndex bind:epubChapters />
        <Chapter bind:chapterContent />
        <Navigator bind:chapterIndex bind:epubChapters />
        <ProgressHint />
    {:else}
        <Info />
    {/if}
</div>

<style>
</style>
