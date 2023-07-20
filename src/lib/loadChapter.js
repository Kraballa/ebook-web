//import DOMPurify from 'dompurify';

async function loadChapter(zip, path) {
    try {
        const dirty = await zip.file(path).async("string")
        return await sanitize(dirty, zip, path);
    } catch (err) {
        return "error loading chapter: " + err;
    }
}

async function sanitize(dirty, zip, path) {
    const doc = new DOMParser().parseFromString(dirty, 'text/html');

    await Promise.all([...doc.querySelectorAll('link')].map(async (e) => {
        if (e.getAttribute('rel') !== "stylesheet") {
            e.remove();
            return;
        }

        // find path of stylesheet, doesn't always work
        let stylePath = getPath(e.getAttribute('href'), path);

        let file = zip.file(stylePath);
        if (file === null) {
            e.remove();
            console.log('file at', stylePath, 'not found');
            return;
        }

        const stylesheet = await file.async("string");
        let blob = new Blob([stylesheet], { type: "text/css" });
        e.href = URL.createObjectURL(blob);
    }));

    // not guaranteed to find all images, sometimes images are stored in custom tags like <xs:image>
    await Promise.all([...doc.querySelectorAll('img')].map(async (e) => {
        let imagePath = getPath(e.getAttribute('src'), path);
        let file = zip.file(imagePath);
        if (file === null) {
            e.remove();
            console.log('file at', imagePath, 'not found');
            return;
        }

        const image = await file.async("blob");
        e.src = URL.createObjectURL(image);
    }));
    replaceLinks(doc);
    return new XMLSerializer().serializeToString(doc);
}

function replaceLinks(document) {
    //replace 'a' tags with underlined
    [...document.querySelectorAll('a')].forEach((e) => {
        if (e.getAttribute("href") !== null) {
            let newEle = document.createElement('u');
            newEle.innerHTML = e.innerHTML;
            e.replaceWith(newEle);
        }
    });
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