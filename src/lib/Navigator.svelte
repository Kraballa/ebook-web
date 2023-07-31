<script>
    export let chapterIndex = 0;
    export let epubChapters = [];

    function finalize(){
        window.scrollTo(0,0);
    }

    function nextChapter() {
        if (chapterIndex == -1) {
            chapterIndex = 0;
        } else if (chapterIndex < epubChapters.length - 1) {
            chapterIndex++;
        }
        finalize();
    }

    function previousChapter() {
        if (chapterIndex == -1) {
            chapterIndex = 0;
        } else if (chapterIndex > 0) {
            chapterIndex--;
        }
        finalize();
    }
</script>

<div>
    <span><input type="button" class="navigation" value="previous" on:click={previousChapter} disabled={chapterIndex == 0}/></span>

    {#if chapterIndex != -1}
        <span>{chapterIndex+1} / {epubChapters.length}</span>
    {/if}

    <span><input type="button" class="navigation" value="next" on:click={nextChapter} disabled={chapterIndex >= epubChapters.length -1}/></span>
</div>

<style>
    div {
        text-align: center;
        display: block;
        margin-top: 24px;
        margin-bottom: 24px;
    }

    span {
        padding: 10px;
    }

    input.navigation {
        border-radius: 3px;
        border-width: 1px;
        width: 100px;
        height: 28px;
    }
    
    input.navigation:hover {
        background-color: rgb(217, 217, 217);
    }
</style>
