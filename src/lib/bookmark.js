
export function saveBookmark(bookTitle, chapterIndex, scrollPercent) {
    if (chapterIndex === 0)
        return;
    let data = { chapterIndex: chapterIndex, scroll: scrollPercent };
    localStorage.setItem(bookTitle, JSON.stringify(data));
}

export function getBookmark(bookTitle) {
    let data = JSON.parse(localStorage.getItem(bookTitle));
    return data;
}