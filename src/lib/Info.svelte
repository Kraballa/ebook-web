<script>
    let bookmarkData = [];

    let confirm = false;

    function loadBookmarkData() {
        bookmarkData = [];
        for (let i = 0; i < localStorage.length; i++) {
            let key = localStorage.key(i);
            bookmarkData.push({ title: key, chapter: JSON.parse(localStorage.getItem(key)).chapterIndex });
        }
    }

    function clearBookmarkData() {
        localStorage.clear();
        bookmarkData = [];
        confirm = false;
    }

    function clearBookmark(key){
        localStorage.removeItem(key);
        loadBookmarkData();
    }
</script>

<h3>Description</h3>
<div>
    <it>ebook-web</it> is a minimal ebook reader for the browser. It can read .epub files and render images and styles. By
    having minimal dependencies and keeping the scope small we can easily support many browsers and devices while respecting
    user modifications like dark mode, yomichan or tts/screen reader extensions.
</div>
<h3>Usage</h3>
<div>
    Simply <i>open ebook</i> and load up a .epub file. A list of numbered buttons should appear that represent the different
    chapter files. Embedded styles and images should appear automatically.
</div>
<h3>Shortcuts</h3>
<ul>
    <li>P: toggle progress display (bottom right corner)</li>
</ul>

<button on:click={loadBookmarkData}>load bookmarks</button>

{#if bookmarkData.length != 0}
    <h3>Bookmarks</h3>

    <table>
        <tr>
            <th>title</th>
            <th>progress</th>
            <th>clear</th>
        </tr>
        {#each bookmarkData as bookmark}
            <tr>
                <td>{bookmark.title}</td>
                <td>chapter {bookmark.chapter + 1}</td>
                <td><button on:click={() => clearBookmark(bookmark.title)}>clear</button></td>
            </tr>
        {/each}
    </table>

    <br />
    <button on:click={() => (confirm = !confirm)}>clear bookmarks</button>
    {#if confirm}
        <button class="confirm" on:click={clearBookmarkData}>confirm?</button>
    {/if}
{/if}

<style>
    div {
        text-align: justify;
        margin-bottom: 6px;
    }

    .confirm {
        color: rgb(223, 0, 0);
        float: right;
    }

    table,
    th,
    td {
        text-align: left;
        padding-top: 5px;
        padding-bottom: 5px;
    }

    th, td {
        min-width: 6em;
        padding-right: 12px;
        text-indent: 6px;
    }

    th {
        background-color: #bebebe;
    }

    tr:nth-child(even) {background-color: #dbdbdb;}

</style>
