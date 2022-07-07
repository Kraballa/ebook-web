<script>
    import { chapterList, contentPath, ebookFile } from "./stores";

    let fileName = "";
    let content = "";
    let chapters = [];
    contentPath.subscribe((s) => (content = s));
    ebookFile.subscribe((f) => {
        if (f) fileName = f.name;
    });
    chapterList.subscribe((f) => {
        chapters = f;
    });
</script>

<div>
    content path: {content}
</div>
{#if fileName != ""}
    <h1 class="bookTitle">{fileName.slice(0, -5)}</h1>
{/if}
{#if chapters != []}
<ul>
    {#each chapters as chap}
        <li>
            {chap}
        </li>
    {/each}
</ul>
{/if}
