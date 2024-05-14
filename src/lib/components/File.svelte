<script>
    export let accept;
    export let files;
</script>

<label class="fileinput button">
    {#if files}
        {files[0].name}
    {:else}
        Choose a file...
    {/if}
    <input type="file" bind:files={files} {accept}/>
</label>
