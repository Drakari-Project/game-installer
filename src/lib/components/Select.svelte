<script>
    import { onMount } from 'svelte';
    
    export let options;
    export let names;
    export let descriptions;
    export let selected;
    let selected_index;

    onMount(() => {
        if (!selected && options) {
            selected = options[0];
        }
    });
</script>

<div class="radio-group">
    {#each options as option, i}
        <label class:selected={selected == option}>
            {names[i]}
            <input checked={selected == option} on:change={(e) => {
                selected = option;
                selected_index = i;
            }} type="radio" value={option}/>
        </label>
    {/each}
</div>
