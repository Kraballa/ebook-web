# ebook-web 
ebook-web is a web based ebook reader.

supported formats:
- epub

## Epub File Format
- zipped file folder
- `./META-INF/container.xml` is the entry point
- `container.rootfiles.rootfile[full-path]` contains the path to the content.opf file which contains the spine
- a spine contains links to chapters which are html/css formatted files