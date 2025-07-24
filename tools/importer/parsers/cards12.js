/* global WebImporter */
export default function parse(element, { document }) {
  // Table header as in example
  const headerRow = ['Cards (cards12)'];
  const rows = [headerRow];

  // Helper to get first descendant <img>
  function getImage(el) {
    return el.querySelector('img');
  }

  // Helper to get card text content: prefer h3 and p from card wrapper
  function getTextContent(el) {
    // Try the .utility-padding-all-2rem (the card body wrapper)
    const wrapper = el.querySelector('.utility-padding-all-2rem');
    if (wrapper) {
      // Collect all heading and paragraphs within
      const nodes = [];
      wrapper.childNodes.forEach(node => {
        // Only include elements (h3, p, etc) and significant text nodes
        if (node.nodeType === 1) {
          nodes.push(node);
        } else if (node.nodeType === 3 && node.textContent.trim()) {
          // If significant text node, wrap in a span for HTML safety
          const span = document.createElement('span');
          span.textContent = node.textContent;
          nodes.push(span);
        }
      });
      return nodes.length ? nodes : '';
    }
    // Fallback: try h3 and p directly
    const nodes = Array.from(el.querySelectorAll('h3, p'));
    return nodes.length ? nodes : '';
  }

  // Parse each card (direct children)
  const children = Array.from(element.children);
  for (const child of children) {
    // Only consider as card if it has an <img>
    const img = getImage(child);
    if (!img) continue; // skip non-card "layout" divs if exist
    const textContent = getTextContent(child);
    // For cards with image and text (normal cards)
    if (img && textContent && textContent.length > 0) {
      rows.push([
        img,
        textContent
      ]);
    } else if (img) {
      // Image only (no text)
      rows.push([
        img, ''
      ]);
    }
    // If neither image nor text, do not add row (keeps table structure clean)
  }

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
