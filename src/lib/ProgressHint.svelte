<script>
    import {calcScrollFromWindow} from './scrollCalc.js';

    let scrollPercent = 0;
    let scrollY = 0;
    let windowHeight = 0;

    $: {
        scrollPercent = calcScrollFromWindow(windowHeight, scrollY);
    }
</script>

<svelte:window bind:scrollY bind:innerHeight={windowHeight} />

<div class="frame">
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
</style>
