# Use remark to generate reveal.js presentations from markdown

This is a collection of bits you can use to build a [reveal.js](https://revealjs.com/) presentation from markdown using [remark](https://github.com/remarkjs/remark/tree/main) with [shiki-twoslash](https://github.com/shikijs/twoslash) to provide rich syntax highlighting with typescript type information.

## How to use

You need node and npm installed on your machine.

* clone and enter this repository
* run `npm install`
* run `npm run build`

Now, you can process your presentation defined in `presentation.md` into a reveal.js presentation at `presentation.html` by running

* `npm run start`

Hint: You can automatically rebuild the html whenever you change the markdown by starting:
```
echo presentation.md | entr -r npm run start
```

## Slide separators

The default slide separators are `///` to begin a new horizontal slide and `////` to begin a new vertical slide.

Make sure these are surrounded by an empty line before and after!

## Speaker Notes

Speaker notes are supported. The separator for speaker notes is `Note:`. Again, make sure it is surrounded by empty lines.

Everything appearing on a slide after the speaker note separator will become part of the notes for this slide.

## What are all these bits?

* `presentation.md` contains your presentation slides in markdown. Code blocks get processed by shiki-twoslash to provide syntax highlighting. I built this for typescript but any language supported by VS code should work.
* `assets/init.js` is included last and initializes reveal.js. Set reveal.js options and enable plugins here.
* `src/generate.ts` puts your markdown presentation through a bunch of processing to generate the html.
    * Change the title of the generated html by adjusting `DOCUMENT_TITLE`

* `src/remark-reveal.ts` is responsible for packaging the markdown in a way reveal.js understands
    * It wraps the html in `div`s with appropriate classes applied
    * It splits the html into slides along the slide separators
* `assets/` contains js and css copied from the `reveal.js` package
* `assets/shiki-twoslash.css` is the default css provided in the documentation of shiki-twoslash
* `assets/patch.css` contains some tweaks to make shiki-twoslash and reveal.js styling play along more nicely

## Why not use reveal.js markdown support?

I have in the past and it's decent, but I wanted rich, interactive typescript code samples. It would probably also be possible to include shiki-twoslash into marked, the markdown parser used by the reveal.js markdown plugin, but I didn't want to bother with that.

Just generating the final html including syntax highlighting ahead of time is much easier than trying to do it all in the browser.

## This is all pretty cumbersome to use…

I kind of agree! I would prefer having this packaged up nicely into something you can just grab from npm and run on a markdown file, similar to [reveal-md](https://github.com/webpro/reveal-md). If you're interested in that too or willing to help out, please let me know.

However, as it is, this was written in one afternoon for a presentation I wanted to do, not to be a fully featured tool. There's quite some jank that would have to be redone to make this properly usable.
