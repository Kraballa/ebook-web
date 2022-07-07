<script>
    import { chapterContent, currentChapter, ebookFile } from "./stores";
    import { loadChapter } from "./loadChapter";

    let content = "";

    let file = "";
    ebookFile.subscribe((f) => (file = f));

    currentChapter.subscribe((chap) => {
        if (chap != "") {
            loadChapter(chap, file);
        } else {
            chapterContent.update(() => "");
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
