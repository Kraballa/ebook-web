<script>
    import {
        chapterList,
        contentPath,
        currentChapter,
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

    function chapterSelect(chap) {
        currentChapter.update(() => chap);
    }
</script>

{#if fileName != ""}
    <h1 class="bookTitle">{fileName}</h1>
{/if}
{#if chapters != []}
    {#each chapters as chap, i}
        <input type="button" value={chap} on:click={chapterSelect(chap)} />
    {/each}
{/if}

<style>
    h1.bookTitle {
        text-align: center;
    }
</style>
