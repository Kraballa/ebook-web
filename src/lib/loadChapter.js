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
    removeScripts(doc);
    await handleStylesheets(doc, zip, path);
    await handleImages(doc, zip, path);
    handleLinks(doc);
    return new XMLSerializer().serializeToString(doc);
}

function removeScripts(doc){
    [...doc.querySelectorAll('script')].forEach((e)=> {
        e.remove();
    });
}

// sanitize <a> tags. remove all links and replace with underlined text.
function handleLinks(doc) {
    //replace 'a' tags with underlined
    [...doc.querySelectorAll('a')].forEach((e) => {
        if (e.hasAttribute("href")) {
            let newEle = doc.createElement('u');
            newEle.innerHTML = e.innerHTML;
            e.replaceWith(newEle);
        }
    });
}

// sanitize <link> tags. if they're stylesheets, replace href with blob, else remove.
async function handleStylesheets(doc, zip, path) {
    await Promise.all([...doc.querySelectorAll('link')].map(async (e) => {
        let stylePath = getPath(e.getAttribute('href'), path);
        let file = zip.file(stylePath);
        if (file === null) {
            e.remove();
            console.error('file at', stylePath, 'not found');
            return;
        }

        const stylesheet = await file.async("blob");
        e.href = URL.createObjectURL(stylesheet);
    }));
}

// sanitize <img> and <image> tags, replace src with blobs.
async function handleImages(doc, zip, path) {
    await Promise.all([...doc.querySelectorAll('img,image')].map(async (e) => {

        let isImg = e.tagName.toLowerCase() === "img";

        let imagePath = getPath(e.getAttribute(isImg ? 'src' : 'xlink:href'), path);
        let file = zip.file(imagePath);
        if (file === null) {
            e.remove();
            console.error('file at', imagePath, 'not found');
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
        // fix image width and break out of parent svg to prevent styling issues.
        newEle.style = "width: 100%;";
        if (e.parentNode.tagName.toLowerCase() === "svg") {
            e.parentNode.replaceWith(newEle);
        }
        else {
            e.replaceWith(newEle);
        }
    }));
}

// either relative or absolute path
function getPath(href, currentPath) {

    // current chapter
    let dirs = currentPath.split("/");
    dirs.pop(); // remove current html file

    if (href.startsWith('../')) { // most common case
        while (href.startsWith('../')) {
            dirs.pop(); // step to next higher directory
            href = href.slice(3);
        }
        dirs.push(href);
        return dirs.join("/");
    }
    else if (href.startsWith('/')) { // files are in the root
        return href.slice(1);
    }
    else if (href.startsWith('./')) { // never seen this case but is theoretically possible
        dirs.push(href.slice(2));
        return dirs.join("/");
    }
    else { // files are in the current directory, like previous case
        dirs.push(href);
        return dirs.join("/");
    }
}

export { loadChapter };