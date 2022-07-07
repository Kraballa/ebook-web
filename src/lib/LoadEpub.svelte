<script>
    import { parseSpine } from "./parseSpine";
    import { ebookFile } from "./stores";

    let files;
    let fileName = "";
    $: {
        if (files && files[0]) {
            ebookFile.update(() => files[0]);
            parseSpine(files[0]);
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
