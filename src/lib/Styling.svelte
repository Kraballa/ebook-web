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
{#each combinations as comb, i}
    <label>
        <input type="radio" bind:group={idx} value={i} on:change={onClicked} />
        {comb[2]}
    </label>
{/each}
