<script>
    import { loadChapter } from "./loadChapter";

    export let epubZip = null;
    export let epubChapters = [];
    export let chapterIndex = 0;

    let content = null;

    $: {
        if (epubZip !== null && epubChapters.length > 0 && chapterIndex > -1 && chapterIndex < epubChapters.length) {
            reloadContent();
        }
    }

    async function reloadContent() {
        content = await loadChapter(epubZip, epubChapters[chapterIndex]);
        console.log(epubChapters[chapterIndex]);
    }
</script>

{#if content}
    <span>{@html content}</span>
{/if}
