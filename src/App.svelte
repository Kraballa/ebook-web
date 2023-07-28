<script>
    import LoadEpub from "./lib/LoadEpub.svelte";
    import Spine from "./lib/Spine.svelte";
    import Chapter from "./lib/Chapter.svelte";
    import Navigator from "./lib/Navigator.svelte";
    import JSZip from "jszip";
    import { parseSpine } from "./lib/parseSpine";
    import ProgressHint from "./lib/ProgressHint.svelte";
    import Info from "./lib/Info.svelte";

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
        chapterIndex = 0;
        const buf = epubFile.arrayBuffer();
        epubZip = await JSZip.loadAsync(buf);
        epubChapters = await parseSpine(epubZip);
    }
</script>

<div class="row bg">
    <LoadEpub bind:epubFile />
    {#if epubFile}
        <Spine bind:chapterIndex bind:epubChapters />
        <Navigator bind:chapterIndex bind:epubChapters />
        <Chapter bind:epubZip bind:epubChapters bind:chapterIndex />
        <Navigator bind:chapterIndex bind:epubChapters />
        <ProgressHint />
    {:else}
        <Info/>
    {/if}
</div>

<style>
</style>
