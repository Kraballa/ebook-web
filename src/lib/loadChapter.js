//import DOMPurify from 'dompurify';

async function loadChapter(zip, path) {
    try {
        const dirty = await zip.file(path).async("string")
        return sanitize(dirty);
    } catch (err) {
        return "error loading chapter: " + err
    }
}

function sanitize(dirty) {
    const doc = new DOMParser().parseFromString(dirty, 'text/html');

    //do basic sanitization to stop the GET404 spam
    [...doc.getElementsByTagName("img")].forEach((e) => e.remove());
    return new XMLSerializer().serializeToString(doc.body);
}

export { loadChapter };