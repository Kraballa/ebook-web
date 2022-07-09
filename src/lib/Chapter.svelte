<script>
    import {
        chapterList,
        currentChapter,
        currentChapterIndex,
        ebookFile,
    } from "./stores";
    import { loadChapter } from "./loadChapter";

    let content = null;
    let file = null;
    let chapters = [];

    chapterList.subscribe((cont) => (chapters = cont));

    ebookFile.subscribe((f) => (file = f));

    currentChapter.subscribe(async (chap) => {
        content = await loadChapter(chap, file);
    });

    currentChapterIndex.subscribe(async (index) => {
        if (index > -1 && index < chapters.length) {
            content = await loadChapter(chapters[index], file);
        }
    });
</script>

<!--This *should* be safe as content already has been cleaned-->
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
