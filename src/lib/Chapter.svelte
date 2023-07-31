<script>
    import { loadChapter } from "./loadChapter";

    export let epubZip = null;
    export let epubChapters = [];
    export let chapterIndex = 0;

    let content = null;
    let innerWidth = 0;

    $: if(innerWidth){
        loaded();
    }

    $: {
        if (chapterIndex > -1) {
            reloadContent();
        }
    }

    async function reloadContent() {
        console.log('loading', chapterIndex);
        content = await loadChapter(epubZip, epubChapters[chapterIndex]);
    }

    function loaded() {
        let iframe = document.getElementById("chapter");
        if(iframe != null){
            iframe.style.height = iframe.contentWindow.document.documentElement.offsetHeight + "px";
        }
    }
</script>

<svelte:window bind:innerWidth={innerWidth}/>

{#if content}
    <iframe id="chapter" srcdoc={content} scrolling="no" title="chapter" on:load={loaded} />
{/if}

<style>
    #chapter {
        width: 100%;
        border: 0;
    }
</style>
