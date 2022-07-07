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

    chapterContent.subscribe((cont) => content = cont);
</script>

{#if chapterPath != ""}
    <div>
        trying to render {chapterPath}
    </div>
{/if}
{@html content}