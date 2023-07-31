<script>
    import JSZip from "jszip";
    import { parseSpine } from "../lib/parseSpine";
    import { getBookmark } from "./bookmark";
    import { book } from "./stores";
    import { get } from "svelte/store";

    export let chapterIndex = 0;
    export let epubZip = null;
    export let epubChapters = [];

    let inputElement;
    let files = null;

    $: {
        if (files && files[0]) {
            loadFile(files[0]);
        }
    }

    function openFileClick() {
        document.getElementById("selectedFile").click();
    }

    function closeFile() {
        epubZip = null;
        inputElement.value = "";
        files = null;
    }

    async function loadFile(file) {
        const buf = file.arrayBuffer();
        epubZip = await JSZip.loadAsync(buf);
        epubChapters = await parseSpine(epubZip);

        let data = getBookmark(get(book).title);
        if(data !== null){
            chapterIndex = data.chapterIndex;
        }
        else{
            chapterIndex = 0;
        }
    }
</script>

<div style="margin-bottom: 5px;">
    <!--This is ugly but hides the even uglier file selected text-->
    <input type="file" id="selectedFile" accept=".epub" style="display: none;" bind:files bind:this={inputElement} />
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
