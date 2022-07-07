<script>
    import LoadEpub from "./lib/LoadEpub.svelte";
    import Spine from "./lib/Spine.svelte";
    import Chapter from "./lib/Chapter.svelte";
    import Navigator from "./lib/Navigator.svelte";
</script>

<div class="row bg">
    <LoadEpub />
    <hr />
    <Spine />
    <hr />
    <Navigator />
    <Chapter />
    <hr />
    <Navigator />
</div>

<style>
</style>
