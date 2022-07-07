<script>
    import {
        chapterList,
        contentPath,
        currentChapter,
        currentChapterIndex,
        ebookFile,
    } from "./stores";

    let fileName = "";
    let content = "";
    let chapters = [];
    contentPath.subscribe((s) => (content = s));
    ebookFile.subscribe((f) => {
        if (f) fileName = f.name;
    });
    chapterList.subscribe((f) => {
        chapters = f;
    });

    function chapterSelect(chap, index) {
        currentChapter.update(() => chap);
        currentChapterIndex.update(() => index);
    }
</script>

{#if fileName != ""}
    <h1 class="bookTitle">{fileName}</h1>
{/if}
{#if chapters != []}
    {#each chapters as chap, i}
        <input type="button" value={i} on:click={chapterSelect(chap, i)} />
    {/each}
{/if}

<style>
    h1.bookTitle {
        text-align: center;
    }
</style>
