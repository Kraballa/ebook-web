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

<div>
    <!--This is ugly but hides the even uglier file selected text-->
    <input
        type="file"
        id="selectedFile"
        accept=".epub"
        style="display: none;"
        bind:files
    />
    <input type="button" value="Open Ebook" on:click={openFileClick} />
</div>
