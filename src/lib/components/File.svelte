<script lang="ts">
    // export let accept;
    export let files;
    export let name: string;
    export let label: string;
</script>

<div>
    <p>{label}</p>
    <label class="fileinput button">
        {#if files.length > 0}
            {files[0].name}
        {:else}
            Choose a file...
        {/if}
        <input name={name} type="file" bind:files={files} required/>
    </label>
</div>
