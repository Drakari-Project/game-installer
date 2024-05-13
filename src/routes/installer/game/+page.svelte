<script>
    import { executable, exec_type, assets } from '$lib/installer_stores.ts';
    let executable_files;
</script>

<h1>Install a Game</h1>
<form>
    <div>
        <p>Executable</p>
        <label class="fileinput button">
            <input name="executable" type="file" bind:files={executable_files}/>
        </label>
    </div>
</form>
