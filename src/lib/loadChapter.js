//import DOMPurify from 'dompurify';

// load a chapter file from the zip
async function loadChapter(zip, path) {
    try {
        const dirty = await zip.file(path).async("string")
        return await sanitize(dirty, zip, path);
    } catch (err) {
        return "error loading chapter: " + err;
    }
}

// sanitize the html, translate images, stylesheets etc to blobs
async function sanitize(dirty, zip, path) {
    const doc = new DOMParser().parseFromString(dirty, 'text/html');
    await handleStylesheets(doc, zip, path);
    await handleImages(doc, zip, path);
    handleLinks(doc);
    return new XMLSerializer().serializeToString(doc);
}

// links are mostly going to be dead/internal so remove them
function handleLinks(doc) {
    //replace 'a' tags with underlined
    [...doc.querySelectorAll('a')].forEach((e) => {
        if (e.getAttribute("href") !== null) {
            let newEle = doc.createElement('u');
            newEle.innerHTML = e.innerHTML;
            e.replaceWith(newEle);
        }
    });
}

async function handleStylesheets(doc, zip, path) {
    await Promise.all([...doc.querySelectorAll('link')].map(async (e) => {
        let stylePath = getPath(e.getAttribute('href'), path);
        let file = zip.file(stylePath);
        if (file === null) {
            e.remove();
            console.log('file at', stylePath, 'not found');
            return;
        }

        const stylesheet = await file.async("blob");
        e.href = URL.createObjectURL(stylesheet);
    }));
}

async function handleImages(doc, zip, path) {
    await Promise.all([...doc.querySelectorAll('img,image')].map(async (e) => {

        let isImg = e.tagName.toLowerCase() === "img";

        let imagePath = getPath(e.getAttribute(isImg ? 'src' : 'xlink:href'), path);
        let file = zip.file(imagePath);
        if (file === null) {
            e.remove();
            console.log('file at', imagePath, 'not found');
            return;
        }

        const blob = URL.createObjectURL(await file.async("blob"));
        if (isImg) {
            e.src = blob;
            return;
        }

        // we can't rewrite image.xlink:href so replace the image tag with an img one
        let newEle = doc.createElement('img');
        newEle.src = blob;
        e.replaceWith(newEle);
    }));
}

function getPath(href, currentPath) {
    let newPath = href;
    if (href.startsWith('../')) {
        // just assume it's OEBPS and if it's not just forget about it
        newPath = 'OEBPS/' + href.slice(3);
    }
    return newPath;
}

export { loadChapter };