<script>
    import { name, author, cover, description } from '$lib/installer_stores.ts';
    
    let cover_files;

    $: if (cover_files) {
        cover.set(cover_files[0]);
    }
</script>

<h1 style="margin-bottom: 0;">Install a Game</h1>
<p style="margin-top: 10px;" class="important">
    Only use this if you know that your app is statically linked; if you don't know what that means, your app probably isn't.<br>
    (look it up though, it's cool!)
</p>
<form>
    <div>
        <p>Game Name</p>
        <input name="name" type="text" placeholder="Space Invaders" bind:value={$name}/>
    </div>
    <div>
        <p>Author Name</p>
        <input name="author" type="text" placeholder="Drake Reinert" bind:value={$author}/>
    </div>
    <div>
        <p>Cover</p>
        <label class="fileinput button">
            {#if $cover}
                {$cover.name}
            {:else}
                Choose a file...
            {/if}
            <input name="coverart" type="file" bind:files={cover_files} accept="image/*"/>
        </label>
    </div>
    <div>
        <p>Description</p>
        <textarea data-gramm="false" spellcheck=false bind:value={$description} placeholder="A pixel shmup game."></textarea>
    </div>
</form>
<div class="crossbar">
    <a class="return" href="/">Return</a>
    <a class="continue" href="/installer/game">Next</a>
</div>
