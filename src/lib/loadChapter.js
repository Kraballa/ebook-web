import DOMPurify from 'dompurify';
import JSZip, { loadAsync } from 'jszip'

async function loadChapter(path, file) {
    let fileData = null;
    try {
        const buf = await file.arrayBuffer()
        const zip = await JSZip.loadAsync(buf)
        fileData = await zip.file(path).async("string")
        //TODO: maybe sanitize fileData
    } catch (err) {
        fileData = "error loading chapter: " + err
    }
    return fileData;

    /*
    let reader = new FileReader();
    reader.onload = function (event) {
        let binaryData = event.target.result;
        JSZip.loadAsync(binaryData).then(function (zip) {
            zip.file(path).async("string").then(function (data) {
                chapterContent.update(() => DOMPurify.sanitize(data, { USE_PROFILES: { html: true } }));
            })

        }).catch(function (err) {
            chapterContent.update(() => "error loading chapter: " + err);
        })
    }
    reader.readAsArrayBuffer(file);
    */
}

export { loadChapter };