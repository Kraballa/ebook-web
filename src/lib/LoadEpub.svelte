<script>
    export let epubFile;
    let files = [];
    $: {
        if (files && files[0]) {
            epubFile = files[0];
        }
    }

    function openFileClick() {
        document.getElementById("selectedFile").click();
    }
</script>

<div style="margin-bottom: 5px;">
    <!--This is ugly but hides the even uglier file selected text-->
    <input type="file" id="selectedFile" accept=".epub" style="display: none;" bind:files />
    <input type="button" value="open ebook" on:click={openFileClick} />
    {#if epubFile !== null}
        <input type="button" value="close ebook" on:click={() => (epubFile = null)} />
    {/if}
    <a class="right" href="https://kraballa.net">home</a>
    <a class="right" href="https://github.com/Kraballa/ebook-web">github repo</a>
</div>

<style>
    a.right {
        float: right;
        margin-right: 8px;
    }
</style>
