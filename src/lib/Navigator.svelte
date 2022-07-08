<script>
    import { chapterList, currentChapterIndex } from "./stores";

    let chapterIndex = -1;
    let chapterNames = [];

    chapterList.subscribe((vals) => (chapterNames = vals));
    currentChapterIndex.subscribe((val) => (chapterIndex = val));

    function nextChapter() {
        currentChapterIndex.update(() => {
            if (chapterIndex == -1) {
                return 0;
            } else if (chapterIndex < chapterNames.length - 1) {
                return chapterIndex + 1;
            }
            return chapterIndex;
        });
    }

    function previousChapter() {
        currentChapterIndex.update(() => {
            if (chapterIndex == -1) {
                return 0;
            } else if (chapterIndex > 0) {
                return chapterIndex - 1;
            }
            return chapterIndex;
        });
    }
</script>

<div>
    <span><input type="button" class="navigation" value="previous chapter" on:click={previousChapter} /></span>
    {#if chapterIndex != -1}
        <span>{chapterIndex}</span>
    {/if}
    
    <span><input type="button" class="navigation" value="next chapter" on:click={nextChapter} /></span>
</div>

<style>
    div {
        text-align: center;
        display: block;
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
