import {read, write} from 'to-vfile'
import {reporter} from 'vfile-reporter'
import {unified} from 'unified'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypeDocument from 'rehype-document'
import rehypeFormat from 'rehype-format'
import rehypeStringify from 'rehype-stringify'
import remarkShikiTwoslash from 'remark-shiki-twoslash';
import remarkReveal from './remark-reveal.js';

const DOCUMENT_TITLE = 'Presenation';

const file = await unified()
  .use(remarkParse)
  // I don't get why we need .default here, but it just silently does nothing if it's missing...
  //@ts-ignore
  .use(remarkShikiTwoslash.default, { theme: "dark-plus" })
  //@ts-ignore
  .use(remarkRehype, { allowDangerousHtml: true })
  //@ts-ignore
  .use(remarkReveal)
  .use(rehypeDocument,
    {
      title: DOCUMENT_TITLE,
      css: ["assets/reveal.css", "assets/black.css", "assets/shiki-twoslash.css", "assets/patch.css"],
      js: ["assets/reveal.js", "assets/notes.js", "assets/init.js"],
      responsive: false
    })
  .use(rehypeFormat)
  .use(rehypeStringify, {allowDangerousHtml: true})
  .process(await read('presentation.md'));

console.error(reporter(file));
file.basename = 'presentation.html';
await write(file)
