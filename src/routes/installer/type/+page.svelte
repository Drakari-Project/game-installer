<script>
    import { exec_type } from '$lib/installer_stores.ts';

    const on_radio_change = (event) => exec_type.set(event.currentTarget.value);
</script>

<h1>Install a Game</h1>
<form>
    <div>
        <p>Game Type</p>
        <div class="radio-group">
            <label for="Code.org">
                <input checked={$exec_type == "Code.org"} on:change={on_radio_change} type="radio" name="game_type" value="Code.org" id="Code.org" /> Code.org
            </label>

            <label for="NativeExe">
                <input on:change={on_radio_change} type="radio" name="game_type" value="NativeExe" id="NativeExe" /> Native Executable
            </label>

            <label for="Emulation">
                <input on:change={on_radio_change} type="radio" name="game_type" value="Emulation" id="Emulation" /> Emulation
            </label>
        </div>
        <!-- <p>{$exec_type}</p> -->
    </div>
</form>
<div class="crossbar">
    <a class="return" href="/installer">Return</a>
    <a class="continue" href="/installer/game">Next</a>
</div>
