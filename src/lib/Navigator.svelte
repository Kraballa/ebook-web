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
    <input type="button" value="previous chapter" on:click={previousChapter} />
    {#if chapterIndex != -1}
        {chapterIndex}
    {/if}
    <input type="button" value="next chapter" on:click={nextChapter} />
</div>

<style>
    div {
        text-align: center;
        display: block;
    }
</style>
