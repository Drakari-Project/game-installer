import { writable } from 'svelte/store';

export const name = writable(undefined);
export const author = writable(undefined);
export const cover = writable(undefined);
export const description = writable(undefined);
export const executable = writable(undefined);
export const exec_type = writable("Code.org");
export const assets = writable(undefined);
