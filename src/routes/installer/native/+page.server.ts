import { fail, redirect } from '@sveltejs/kit';
import { writeFile, mkdir } from 'fs/promises';
import { name } from "$lib/installer_stores.ts";

export const actions = {
  upload: async ({ request }) => {
    const formData = await request.formData();
    const exec = formData.get("exec") as File;

    await mkdir(`static/${name}`);
    await writeFile(`static/${name}/${exec.name}`, new Uint8Array(await exec.arrayBuffer()));

    redirect(303, "/");

    return {
      success: true
    };
  }
};
