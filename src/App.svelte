<script>
    import LoadEpub from "./lib/LoadEpub.svelte";
    import Spine from "./lib/Spine.svelte";
    import Chapter from "./lib/Chapter.svelte";
    import Navigator from "./lib/Navigator.svelte";
    import JSZip from "jszip";
    import { parseSpine } from "./lib/parseSpine";

    let epubFile = null;
    let epubChapters = [];
    let chapterIndex = 0;

    let epubZip = null;

    $: {
        if (epubFile) {
            loadFile();
        }
    }

    async function loadFile() {
        const buf = epubFile.arrayBuffer();
        epubZip = await JSZip.loadAsync(buf);
        chapterIndex = 0;
        epubChapters = await parseSpine(epubZip);
    }
</script>

<div class="row bg">
    <LoadEpub bind:epubFile />
    {#if epubFile}
        <Spine bind:chapterIndex bind:epubChapters />
        <Navigator bind:chapterIndex bind:epubChapters />
        <Chapter bind:epubZip bind:epubChapters bind:chapterIndex />
        <hr />
        <Navigator bind:chapterIndex bind:epubChapters />
    {/if}
</div>

<style>
</style>
