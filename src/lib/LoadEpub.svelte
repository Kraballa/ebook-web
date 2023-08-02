<script>
    import { createEventDispatcher } from "svelte";

    let files = null;

    const dispatch = createEventDispatcher();

    function handleChange() {
        if (files && files[0]) {
            dispatch("fileSelected", { file: files[0] });
        }
    }

    function openFileClick() {
        document.getElementById("selectedFile").click();
    }

    function closeFile() {
        files = null;
        dispatch("ebookClosed");
    }

    function onClick(e){
        e.target.value = '';
    }
</script>

<div style="margin-bottom: 5px;">
    <!--This is ugly but hides the even uglier file selected text-->
    <input type="file" id="selectedFile" accept=".epub" style="display: none;" bind:files on:change={handleChange} on:click={onClick}/>
    <input type="button" value="open ebook" on:click={openFileClick} />
    {#if files !== null}
        <input type="button" value="close ebook" on:click={closeFile} />
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
