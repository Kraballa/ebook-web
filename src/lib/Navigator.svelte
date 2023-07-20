<script>
    export let chapterIndex = 0;
    export let epubChapters = [];

    function toTop(){
        window.scrollTo(0,0);
    }

    function nextChapter() {
        if (chapterIndex == -1) {
            chapterIndex = 0;
        } else if (chapterIndex < epubChapters.length - 1) {
            chapterIndex++;
        }
        toTop();
    }

    function previousChapter() {
        if (chapterIndex == -1) {
            chapterIndex = 0;
        } else if (chapterIndex > 0) {
            chapterIndex--;
        }
        toTop();
    }
</script>

<div>
    <span><input type="button" class="navigation" value="previous chapter" on:click={previousChapter} disabled={chapterIndex == 0}/></span>

    {#if chapterIndex != -1}
        <span>{chapterIndex}</span>
    {/if}

    <span><input type="button" class="navigation" value="next chapter" on:click={nextChapter} disabled={chapterIndex >= epubChapters.length -1}/></span>
</div>

<style>
    div {
        text-align: center;
        display: block;
        margin-top: 2em;
    }

    span {
        padding: 10px;
    }

    input.navigation {
        border-radius: 0px;
        border-width: 1px;
        width: 150px;
        height: 28px;
    }

    input.navigation:hover {
        background-color: rgb(217, 217, 217);
    }
</style>
