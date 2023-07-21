<script>
    export let chapterIndex = 0;
    export let epubChapters = [];
</script>

{#if epubChapters.length > 0}
    {#each epubChapters as _, i}
        <input type="button" value={i+1} on:click={() => (chapterIndex = i)} class="{chapterIndex === i ? "highlight" : ""}"/>
    {/each}
{/if}

<style>
    input {
        margin-right: 5px;
        margin-bottom: 5px;
    }

    input.highlight {
        background-color: rgb(207, 207, 207);
        border-radius: 3px;
    }
</style>