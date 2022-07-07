# ebook-web 
ebook-web is a web based ebook reader. Select an ebook from your harddrive and begin reading!

supported formats:
- epub

## Epub File Format
- zipped file folder
- `./META-INF/container.xml` is the entry point
- `container.rootfiles.rootfile[full-path]` contains the path to the content.opf file which contains the spine
- a spine contains links to chapters which are html/css formatted files
- more specifically, the `<spine>` tag contains items called `<itemref>` with `idref` attributes
- these *idrefs* are references to entries in the `<manifest>` tag that contain the full path of the chapter file