<script>
    export let chapterContent = "";

    let innerWidth = 0;

    $: if (innerWidth) {
        loaded();
    }

    function loaded() {
        let iframe = document.getElementById("chapter");
        if (iframe != null) {
            iframe.style.height = iframe.contentWindow.document.documentElement.offsetHeight + "px";
        }
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
