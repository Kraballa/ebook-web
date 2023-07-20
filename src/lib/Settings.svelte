<script>
    const defaults = {
        useCss: true
    }

    export const set = {...defaults, ...(JSON.parse(localStorage.getItem('settings')) || {})};
</script>

<input type="checkbox" on:change={(v) => set.useCss = v}/>