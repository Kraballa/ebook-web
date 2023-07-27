import { writable } from "svelte/store";

export const book = writable({title: [], author: [], publisher: ''});