<script context="module">
    const defaults = {
        progress: {},
    }

    export const set = {...defaults, ...(JSON.parse(localStorage.getItem('settings')) || {})};
</script>