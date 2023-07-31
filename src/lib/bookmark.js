
export function saveBookmark(bookTitle, chapterIndex){
    //console.log('bookmarking', bookTitle, "at chapter",chapterIndex);
    let data = {chapterIndex: chapterIndex};
    localStorage.setItem(bookTitle, JSON.stringify(data));
}

export function getBookmark(bookTitle){
    //console.log('loading bookmark for', bookTitle);
    let data = JSON.parse(localStorage.getItem(bookTitle));
    return data;
}