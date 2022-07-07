import JSZip from "jszip";
import fs from "fs";
import { ebookZip, contentPath, chapterList } from "./stores";

async function parseSpine(file) {
    let reader = new FileReader();
    reader.onload = function (event) {
        let binaryData = event.target.result;
        let contentFile = '';
        JSZip.loadAsync(binaryData).then(function (zip) {
            ebookZip.update(() => zip);
            zip.file("META-INF/container.xml").async("string").then(function (data) {
                // parse content.opf path from epub entry point
                contentFile = parseContentFilePath(data);
                contentPath.update(() => contentFile);

                // parse chapter files from content.opf
                zip.file(contentFile).async("string").then(function(data){
                    chapterList.update(() => parseChapterList(data));
                })
            })
            
        }).catch(function (err) {
            console.error("failed to open", file, "as zip file:", err);
        })
    }
    reader.readAsArrayBuffer(file);
}

function parseContentFilePath(data) {
    let parser = new DOMParser();
    let doc = parser.parseFromString(data,"text/xml");
    return doc.getElementsByTagName("rootfile")[0].getAttribute("full-path");
}

function parseChapterList(data) {
    let parser = new DOMParser();
    let doc = parser.parseFromString(data,"text/xml");
    return Array.from(doc.getElementsByTagName("itemref")).map((elem) => elem.getAttribute("idref"));
}

export { parseSpine };