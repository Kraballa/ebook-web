<script>
    import LoadEpub from "./lib/LoadEpub.svelte";
    import Spine from "./lib/Spine.svelte";
    import Chapter from "./lib/Chapter.svelte";
    import Navigator from "./lib/Navigator.svelte";
    import ProgressHint from "./lib/ProgressHint.svelte";
    import Info from "./lib/Info.svelte";

    let epubZip = null;
    let epubChapters = [];
    let chapterIndex = 0;

</script>

<div class="row bg">
    <LoadEpub bind:epubZip bind:epubChapters bind:chapterIndex/>
    {#if epubZip}
        <Spine bind:chapterIndex bind:epubChapters />
        <Navigator bind:chapterIndex bind:epubChapters />
        <Chapter bind:epubZip bind:epubChapters bind:chapterIndex />
        <Navigator bind:chapterIndex bind:epubChapters />
        <ProgressHint />
    {:else}
        <Info />
    {/if}
</div>

<style>
</style>
