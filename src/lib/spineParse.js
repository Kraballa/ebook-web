import JSZip from "jszip";
import fs from "fs";
import { ebookZip, contentPath, chapterList } from "./stores";

async function parseSpine(file) {
    let reader = new FileReader();
    reader.onload = function (event) {
        let binaryData = event.target.result;

        JSZip.loadAsync(binaryData).then(function (zip) {
            zip.file("META-INF/container.xml").async("string").then(function (data) {
                contentPath.update(() => parseContentFilePath(data));
            })
        }).catch(function (err) {
            console.error("failed to open", file, "as zip file:", err);
        })
    }
    reader.readAsArrayBuffer(file);
}

function parseContentFilePath(data) {
    return data;
}

async function parseChapter(file, path) {

}

export { parseSpine };