<script>
    export let style = "";
    $: style = "html { background-color: " + combinations[idx ?? 0][1] + "; color: " + combinations[idx ?? 0][0] + "; }";

    function onClicked() {
        localStorage.setItem("_style", JSON.stringify({ id: idx }));
    }

    function onLoad() {
        idx = 0;
        console.log("onload");
        let data = localStorage.getItem("_style");
        if (data != null) {
            let id = parseInt(JSON.parse(data).id);
            idx = parseInt(id);
        }
    }

    const combinations = [
        ["#000000", "#ffffff", "white"],
        ["#302e25", "#ffd596", "sepia"],
        ["#2b211e", "#b58b69", "dim"],
        ["#d1c68e", "#212121", "dark"],
        ["#7a7ca8", "#191829", "blue-dark"],
        ["#ffffff", "#000000", "oled"],
    ];

    let idx;

    onLoad();
</script>

<h3 class="small">Style</h3>
<div>Select a theme.</div>

<table>
    {#each combinations as comb, i}
    <tr>
        <td>
            <label>
                <input type="radio" bind:group={idx} value={i} on:change={onClicked} />
                {comb[2]}
            </label>
        </td>
        <td>
            <p class="disp" style="background-color: {combinations[i][0]}"/>
        </td>
        <td>
            <p class="disp" style="background-color: {combinations[i][1]}"/>
        </td>
    </tr>
{/each}
</table>


<style>
    table, tr, td{
        border-spacing: 0;
    }

    td:first-child {
        margin-right: 20px;
        padding-right: 20px;
    }
    
    td:nth-child(2) > p {
        padding: 0;
        border-radius: 5px 0 0 5px;
    }

    td:nth-child(3) > p {
        padding: 0;
        border-radius: 0 5px 5px 0;
    }

    p {
        border: 1px black solid;
        width: 20px;
        height:20px;
        padding: 0;
        margin: 3px 0;
    }
</style>
