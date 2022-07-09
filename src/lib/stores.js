import { writable } from "svelte/store";

export let ebookFile = writable();

export let contentPath = writable("");
export let chapterList = writable([]);

export let currentChapter = writable("");
export let currentChapterIndex = writable(-1);