
export function saveBookmark(bookTitle, chapterIndex) {
    if (chapterIndex === 0)
        return;
    let data = { chapterIndex: chapterIndex, scroll: 0 };
    localStorage.setItem(bookTitle, JSON.stringify(data));
}

export function getBookmark(bookTitle) {
    let data = JSON.parse(localStorage.getItem(bookTitle));
    return data;
}