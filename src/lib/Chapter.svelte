<script>
    import { chapterContent, currentChapter, ebookFile } from "./stores";
    import { loadChapter } from "./loadChapter";

    let chapterPath = "";
    let content = "";

    let file = "";
    ebookFile.subscribe((f) => (file = f));

    currentChapter.subscribe((chap) => {
        chapterPath = chap;
        if (chap != "") {
            loadChapter(chap, file);
        }
    });

    chapterContent.subscribe((cont) => (content = cont));
</script>

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
