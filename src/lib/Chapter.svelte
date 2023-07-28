<script>
    import { loadChapter } from "./loadChapter";

    export let epubZip = null;
    export let epubChapters = [];
    export let chapterIndex = 0;

    let content = null;
    let blobUrl = null;

    $: {
        if (epubZip !== null && epubChapters.length > 0 && chapterIndex > -1 && chapterIndex < epubChapters.length) {
            reloadContent();
        }
    }

    async function reloadContent() {
        content = await loadChapter(epubZip, epubChapters[chapterIndex]);
        console.log(epubChapters[chapterIndex]);
        let blob = new Blob([content], {
            type: "text/html",
        });
        blobUrl = URL.createObjectURL(blob);
    }

    function loaded() {
        let iframe = document.getElementById("chapter");
        iframe.style.height = iframe.contentWindow.document.documentElement.offsetHeight + "px";
    }
</script>

{#if content}
    <iframe id="chapter" src={blobUrl} scrolling="no" title="chapter" on:load={loaded} />
{/if}

<style>
    #chapter {
        width: 100%;
        height: max-content;
        border: 0;
        overflow-x: scroll;
    }
</style>
