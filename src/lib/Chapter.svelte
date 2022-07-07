<script>
    import {
        chapterContent,
        chapterList,
        currentChapter,
        currentChapterIndex,
        ebookFile,
    } from "./stores";
    import { loadChapter } from "./loadChapter";

    let content = "";
    let file = "";
    let chapters = [];

    chapterList.subscribe((cont) => (chapters = cont));

    ebookFile.subscribe((f) => (file = f));

    currentChapter.subscribe((chap) => {
        if (chap != "") {
            loadChapter(chap, file);
        } else {
            chapterContent.update(() => "");
        }
    });

    currentChapterIndex.subscribe((index) => {
        if (index > -1 && index < chapters.length) {
            loadChapter(chapters[index], file);
        }
    });

    chapterContent.subscribe((cont) => (content = cont));
</script>

<!--This *should* be safe as content already has been cleaned-->
{#if content != ""}
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
