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
</div>
