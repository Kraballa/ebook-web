<script>
    export let file = null;

    let files = null;

    function handleChange(){
        if (files && files[0]) {
            file = files[0];
        }
    }

    function openFileClick() {
        document.getElementById("selectedFile").click();
    }

    function closeFile() {
        file = null;
        files = null;
    }
</script>

<div style="margin-bottom: 5px;">
    <!--This is ugly but hides the even uglier file selected text-->
    <input type="file" id="selectedFile" accept=".epub" style="display: none;" bind:files on:change={handleChange}/>
    <input type="button" value="open ebook" on:click={openFileClick} />
    {#if file !== null}
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
