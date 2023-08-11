import { book } from "./stores";
import { ebookProto } from "./ebook";

async function parseSpine(ebookZip) {
    let containerFile = await ebookZip.file("META-INF/container.xml").async("string");

    let parser = new DOMParser();
    let containerDoc = parser.parseFromString(containerFile, "text/xml");
    let contentFilePath = containerDoc.getElementsByTagName("rootfile")[0].getAttribute("full-path");
    let content = await ebookZip.file(contentFilePath).async("string");
    let folderPath = getBasePath(contentFilePath);
    return parseChapterList(content, folderPath);
}

function parseChapterList(data, basePath) {
    let parser = new DOMParser();
    let doc = parser.parseFromString(data, "text/html");
    parseMetadata(doc);
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
    // return list of file paths corresponding to chapters
    return itemIds.map((item) => itemById[item]);
}

function parseMetadata(document) {
    let metadata = new ebookProto();

    for (const elem of document.getElementsByTagName("metadata")[0].children) {
        switch (elem.tagName.toLowerCase()) {
            case 'dc:creator':
                metadata.author.push(elem.textContent);
                break;
            case 'dc:title':
                metadata.title.push(elem.textContent);
                break;
            case 'dc:publisher':
                metadata.publisher = elem.textContent;
                break;
        }
    }
    book.set(metadata);
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