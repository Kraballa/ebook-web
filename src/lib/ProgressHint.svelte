<script>
    let scrollPercent = 0;
    let scrollY = 0;
    let windowHeight = 0;
    let visible = true;

    $: {
        let roundedProgress = Math.round((100 * scrollY) / (document.body.scrollHeight - windowHeight));
        scrollPercent = Math.min(Math.max(roundedProgress, 0), 100);
    }

    function onKeyPress(e) {
        if (e.key === "p") {
            visible = !visible;
        }
    }
</script>

<svelte:window bind:scrollY bind:innerHeight={windowHeight} on:keypress|preventDefault={onKeyPress} />

<div class="frame {visible ? '' : 'invis'}">
    {scrollPercent}%
</div>

<style>
    div.frame {
        font-size: 8pt;
        position: fixed;
        right: 0;
        bottom: 0;
        color: gray;
    }

    div.invis {
        visibility: hidden;
    }
</style>
