import type { Node } from "unist";
import type { Element, ElementContent, Literal } from "hast";
import type { Transformer } from "unified";


export default function remarkReveal() {
  const transform: Transformer = async (hast) => {
    visitRoot(hast)
  }
  return transform;
}

export function visitRoot(root: Node) {
  if (root.type != 'root') {
    throw new Error('element is not root');
  }
  const origChildren = (root as Element).children;

  const slides = splitSlides(origChildren);


  (root as Element).children = [{
    type: 'element',
    tagName: 'div',
    properties: {
      className: ['reveal']
    },
    children: [{
      type: 'element',
      tagName: 'div',
      properties: {
        className: ['slides'],
      },
      children: slides
    }]
  }];

}

function splitSlides(elements: ElementContent[]): Element[] {
  let sections: ElementContent[][][] = [];
  let currentSection: ElementContent[][] = [];
  let currentSubsection: ElementContent[] = [];
  let currentNotes: ElementContent[] = [];
  let notes = false;

  function pushSubsection() {
    currentSection.push(currentSubsection);
    currentSubsection = [];
  }

  function pushSection() {
    sections.push(currentSection);
    currentSection = [];
  }

  function pushNotes() {
    if (currentNotes.length > 0) {
      currentSubsection.push({
        type: 'element',
        tagName: 'aside',
        properties: {
          className: ['notes']
        },
        children: currentNotes
      });
    }
    notes = false;
    currentNotes = [];
  }

  for (const node of elements) {
    const n = node as Element;
    if (
      n.tagName == 'p' &&
      n.children.length == 1 &&
      n.children[0].type == 'text') {
      // found possible separator
      const sep = (n.children[0] as Literal).value;
      if (sep == '///') {
        // push subsection, then section
        pushNotes();
        pushSubsection();
        pushSection();
        continue;
      } else if (sep === '////') {
        // only push current subsection
        pushNotes()
        pushSubsection();
        continue;
      } else if (sep === 'Note:') {
        notes = true;
        continue;
      }
    }
    if (notes) {
      currentNotes.push(node)
    } else {
      currentSubsection.push(node);
    }
  }

  // finally, push last subsection and section
  pushNotes();
  pushSubsection();
  pushSection();


  function arrayToSection(arr: any[]): Element {
    return {
      type: 'element',
      tagName: 'section',
      children: arr
    }
  }

  return sections.map((section) => {
    return arrayToSection(
      section.map(arrayToSection)
    );
  });

}
