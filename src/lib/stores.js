import { writable } from "svelte/store";

export let ebookZip = writable();

export let contentPath = writable('');
export let chapterList = writable('');