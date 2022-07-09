<script>
    import { loadChapter } from "./loadChapter";

    export let epubZip = null;
    export let epubChapters = [];
    export let chapterIndex = 0;

    let content = null;

    $: {
        if (epubZip !== null && epubChapters.length > 0 && chapterIndex > -1) {
            reloadContent();
        }
    }

    async function reloadContent() {
        content = await loadChapter(epubZip, epubChapters[chapterIndex]);
    }
</script>

{#if content}
    <p>{@html content}</p>
{/if}

<!--styling the content inside html-->
<style>
    p :global(div) {
        text-align: justify;
    }
    p :global(p) {
        text-align: justify;
    }
</style>
