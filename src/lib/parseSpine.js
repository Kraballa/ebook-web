import JSZip from "jszip";
import { contentPath, chapterList, currentChapterIndex } from "./stores";

async function parseSpine(file) {
    let reader = new FileReader();
    reader.onload = function (event) {
        let binaryData = event.target.result;
        let contentFile = '';
        JSZip.loadAsync(binaryData).then(function (zip) {
            zip.file("META-INF/container.xml").async("string").then(function (data) {
                // parse content.opf path from epub entry point
                contentFile = parseContentFilePath(data);
                contentPath.update(() => contentFile);

                // parse chapter files from content.opf
                zip.file(contentFile).async("string").then(function (data) {
                    chapterList.update(() => parseChapterList(data, getBasePath(contentFile)));
                    currentChapterIndex.update(() => 0);
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
    let doc = parser.parseFromString(data, "text/xml");
    return doc.getElementsByTagName("rootfile")[0].getAttribute("full-path");
}

function parseChapterList(data, basePath) {
    let parser = new DOMParser();
    let doc = parser.parseFromString(data, "text/xml");
    // get the chapter references in spine order
    let itemIds = [...doc.getElementsByTagName("itemref")].map((elem) => elem.getAttribute("idref"));
    let itemById = {};
    // build a dict of all xhtml element ids with their mappings
    for (const elem of doc.getElementsByTagName("item")) {
        if (elem.getAttribute("media-type") === "application/xhtml+xml") {
            itemById[elem.getAttribute("id")] = basePath + elem.getAttribute("href");
        }
    }
    // map spine elements onto manifest elements
    return itemIds.map((item) => itemById[item]);
}

// item paths are relative to content file so extract base path
function getBasePath(contentPath) {
    let basePath = "";
    let lastSlash = contentPath.lastIndexOf('/');
    if (lastSlash !== -1) {
        basePath = contentPath.substring(0, lastSlash + 1);
    }
    return basePath;
}

export { parseSpine };