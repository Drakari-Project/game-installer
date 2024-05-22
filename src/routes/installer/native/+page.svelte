<script>
    import { goto } from '$app/navigation';
    import File from "$lib/components/File.svelte";

    let coverFiles = [];
    let execFiles = [];
</script>

<h1>Native Game</h1>
<form action="?/upload" method="post" enctype="multipart/form-data">
    <File files={coverFiles} name="cover" label="Cover Image" />
    <File files={execFiles} name="exec" label="Executable" />
    
    <button type="submit">Submit</button>
</form>
