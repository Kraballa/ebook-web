import DOMPurify from 'dompurify';
import JSZip from 'jszip'
import {chapterContent} from './stores'

async function loadChapter(path, file) {
    let chapData = '';

    let reader = new FileReader();
    reader.onload = function (event) {
        let binaryData = event.target.result;
        JSZip.loadAsync(binaryData).then(function (zip) {

            zip.file(path).async("string").then(function (data){
                chapterContent.update(() => DOMPurify.sanitize(data, { USE_PROFILES: { html: true } }));
            })

        }).catch(function (err) {
            chapterContent.update(() => "error loading chapter: " + err);
        })
    }
    reader.readAsArrayBuffer(file);
    return chapData;
}

export { loadChapter };