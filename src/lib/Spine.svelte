<script>
    export let chapterIndex = 0;
    export let epubChapters = [];
</script>

{#if epubChapters.length > 0}
    {#each epubChapters as chap, i}
        <input type="button" value={i} on:click={() => (chapterIndex = i)} />
    {/each}
{/if}