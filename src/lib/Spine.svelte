<script>
    import { createEventDispatcher } from "svelte";
    import { ebookProto } from "./ebook";
    import { book } from "./stores";

    export let chapterIndex = 0;
    export let epubChapters = [];

    let metadata = new ebookProto();
    book.subscribe((val) => (metadata = val));
    const dispatch = createEventDispatcher();

    function onChapterClick(idx) {
        chapterIndex = idx;
        dispatch("chapterChange");
    }

    function getClasses(idx, chap) {
        if (idx == chap) return "highlight";
        if (idx < chap) return "dim";
        return "";
    }
</script>

{#if epubChapters.length > 0}
    {#each epubChapters as _, i}
        <input type="button" value={i + 1} on:click={() => onChapterClick(i)} class={getClasses(i, chapterIndex)} />
    {/each}
    {#if chapterIndex === 0}
        {#if metadata.title.length > 0}
            <h1>{metadata.title[0]}</h1>
        {/if}
        {#each metadata.title as title, i}
            {#if i !== 0}
                <h2>{title}</h2>
            {/if}
        {/each}

        <h3>by {metadata.author.join(", ")}</h3>
        <h3>published by {metadata.publisher}</h3>
        <hr />
    {/if}
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

    input.dim {
        color: gray;
    }

    h1 {
        margin-top: 12px;
        text-align: center;
    }

    h2 {
        text-align: center;
    }

    h3 {
        margin: 4px;
        text-align: center;
    }
</style>
