<script>
    let bookmarkData = [];

    function loadBookmarkData() {
        bookmarkData = [];
        for (let i = 0; i < localStorage.length; i++) {
            let key = localStorage.key(i);
            if (key.startsWith("_")) {
                continue;
            }

            let data = JSON.parse(localStorage.getItem(key));
            bookmarkData.push({ title: key, chapter: data.chapterIndex, scroll: data.scroll });
        }
    }

    function clearBookmark(key) {
        if (window.confirm("Clear bookmark for '" + key + "'?")) {
            localStorage.removeItem(key);
            loadBookmarkData();
        }
    }

    function clearAllBookmarks() {
        if (window.confirm("Clear ALL bookmarks? This cannot be undone.")) {
            localStorage.clear();
            bookmarkData = [];
        }
    }

    loadBookmarkData();
</script>

<h2>E-Book Reader</h2>

<h3 class="small">Description</h3>
<div>
    <it>ebook-web</it> is a minimal ebook reader for the browser. It can read .epub files and render images and styles. By
    having minimal dependencies and keeping the scope small we can easily support many browsers and devices while respecting
    user modifications like dark mode, yomichan or tts/screen reader extensions.
</div>

<h3 class="small">Bookmarks</h3>
<div>Bookmarks are created automatically. Reopening a book navigates to the last stored bookmark.</div>
{#if bookmarkData.length !== 0}
    <hr />
    <table>
        {#each bookmarkData as bookmark}
            <tr>
                <td>{bookmark.title}</td>
                <td>ch. {bookmark.chapter + 1}</td>
                <td>{bookmark.scroll ?? 0}%</td>
                <td><button on:click={() => clearBookmark(bookmark.title)}>clear</button></td>
            </tr>
        {/each}
    </table>
    <br />
    <button on:click={clearAllBookmarks}>clear bookmarks</button>
{/if}

<style>
    div {
        text-align: justify;
        margin-bottom: 6px;
    }

    td {
        padding: 8px;
    }
</style>
