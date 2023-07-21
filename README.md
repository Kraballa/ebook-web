# ebook-web 
ebook-web is an entirely client-side web based epub reader. Select an ebook from your harddrive and begin reading! A version is hosted on my website at https://ebook.kraballa.net/.

features:
- parses epub files
- displays images and handles custom embedded stylings
- browser addons based on text parsing like yomichan, text to speech or similar work like on any other website

## A few notes on implementation details
.epub files are essentially just zipped html + css + media like images. To render .epub content we start at the entry point `/META-INF/container.xml` which points to an html file that contains a list of all chapters in order. These again are just html and may contain images and css. We then render them with `@html`.

When rendering the html chapters references to images and stylesheets get converted into HTTP GET requests which hammer the server. Instead, we want the browser to pull the files from the epub. To do that we simply resolve the `href` and `src` attributes manually and create [blobs](https://developer.mozilla.org/en-US/docs/Web/API/Blob). Then we can generate a URL from that blob and write that back into `href`. That way stylesheets apply (in svelte we cannot target `@html` content without using global styles).