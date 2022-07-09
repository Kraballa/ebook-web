<script>
    export let chapterIndex = 0;
    export let epubChapters = [];
</script>

{#if epubChapters != []}
    {#each epubChapters as chap, i}
        <input type="button" value={i} on:click={() => (chapterIndex = i)} />
    {/each}
{/if}

<style>
    h1.bookTitle {
        text-align: center;
    }
</style>
