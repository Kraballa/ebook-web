<script>
    let showMetadata = true;
    let minimalMode = false;
    let autoBookmark = false;
</script>

<h3>Settings</h3>

<table>
    <tr>
        <td>
            <label>
                <input type="checkbox" bind:checked={autoBookmark}/>
                automatic bookmark
            </label>
        </td>
        <td>
            <div>Automatically create bookmarks based on the book title. Stores chapter and scroll percentage in <a href="https://en.wikipedia.org/wiki/Web_storage">local storage</a></div>
        </td>
    </tr>
    <tr>
        <td>
            <label>
                <input type="checkbox" bind:checked={showMetadata} />
                show metadata
            </label>
        </td>
        <td>
            <div>Show metadata of the ebook if available.</div>
        </td>
    </tr>
    <tr>
        <td>
            <label>
                <input type="checkbox" bind:checked={minimalMode} />
                use minimal mode
            </label>
        </td>
        <td>
            <div>
                Discard embedded stylesheets and images leaving only html.
            </div>
        </td>
    </tr>
</table>

<style>

    td {
        min-width: 20vw;
    }

    div {
        text-align: justify;
    }
</style>
