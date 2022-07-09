import DOMPurify from 'dompurify';

async function loadChapter(zip, path) {
    let fileData = null;
    try {
        fileData = await zip.file(path).async("string")
        //TODO: maybe sanitize fileData
    } catch (err) {
        fileData = "error loading chapter: " + err
    }
    return fileData;
}

export { loadChapter };