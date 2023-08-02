<script>
    import { createEventDispatcher } from "svelte";

    export let chapterContent = "";
    export let style = '';

    let innerWidth = 0;

    const dispatch = createEventDispatcher();

    $: if (innerWidth) {
        resizeIframe();
    }

    function resizeIframe(){
        let iframe = document.getElementById("chapter");
        if (iframe != null) {
            iframe.style.height = iframe.contentWindow.document.documentElement.offsetHeight + "px";
        }
    }

    function loaded() {
        resizeIframe();
        dispatch('iframeLoaded');
        let iframe = document.getElementById('chapter');
        const styleElement = document.createElement("style");
        styleElement.textContent = style;
        iframe.contentDocument.head.appendChild(styleElement);
    }
</script>

<svelte:window bind:innerWidth />

{#if chapterContent !== ""}
    <iframe id="chapter" srcdoc={chapterContent} scrolling="no" title="chapter" on:load={loaded} />
{/if}

<style>
    #chapter {
        width: 100%;
        border: 0;
    }
</style>
