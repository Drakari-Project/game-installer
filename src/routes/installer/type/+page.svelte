<script>
    import { Select } from '$lib/components';
    import { exec_type } from '$lib/installer_stores.ts';

    const options = ["codeorg", "native", "emulator"];
    const names = ["Code.org", "Native Executable", "Emulatable ROM"];
</script>

<h1>Install a Game</h1>
<form>
    <div>
        <p>Game Type</p>
        <Select {options} {names} bind:selected={$exec_type}/>
    </div>
</form>
<div class="crossbar">
    <a class="return" href="/installer">Return</a>
    <a class="continue" href="/installer/{$exec_type}">Next</a>
</div>
