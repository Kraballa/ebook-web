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

{#if content != ""}
    <div>
        content path: {content}
    </div>
{/if}
{#if fileName != ""}
    <h1 class="bookTitle">{fileName.slice(0, -5)}</h1>
{/if}
{#if chapters != []}
    {#each chapters as chap}
        <input type="button" value={chap} on:click={chapterSelect(chap)} />
    {/each}
{/if}
