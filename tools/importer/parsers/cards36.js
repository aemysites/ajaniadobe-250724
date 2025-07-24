/* global WebImporter */
export default function parse(element, { document }) {
  // Table header as specified
  const headerRow = ['Cards (cards36)'];

  // Find the main grid containing all cards
  // This will find the biggest w-layout-grid (the direct child of .container)
  let mainGrid = element.querySelector('.w-layout-grid.grid-layout');
  if (!mainGrid) {
    // fallback: find first grid
    mainGrid = element.querySelector('.w-layout-grid');
  }

  // Collect all cards: these are <a> tags at the top level of mainGrid, plus those inside a nested w-layout-grid
  let cardElements = [];
  if (mainGrid) {
    Array.from(mainGrid.children).forEach(child => {
      if (child.matches('a')) {
        cardElements.push(child);
      } else if (child.classList.contains('w-layout-grid')) {
        // Nested grid of more cards
        Array.from(child.children).forEach(subchild => {
          if (subchild.matches('a')) cardElements.push(subchild);
        });
      }
    });
  }

  // Fallback: if we find no cards, try to get all <a> descendant cards
  if (cardElements.length === 0) {
    cardElements = Array.from(element.querySelectorAll('a.utility-link-content-block'));
  }

  // Parse each card into [image, content] row
  const rows = cardElements.map(card => {
    // IMAGE: Look for .utility-aspect-* > img
    let aspectDiv = card.querySelector('.utility-aspect-2x3, .utility-aspect-1x1');
    let imageEl = null;
    if (aspectDiv) {
      imageEl = aspectDiv.querySelector('img');
    }
    // TEXT: Look for heading, paragraph, and optional CTA/button
    // Sometimes content is in a padding div, sometimes directly on the card
    let textContainer = card.querySelector('.utility-padding-all-2rem') || card;
    let content = [];
    // Get heading (h2, h3, h4)
    let heading = textContainer.querySelector('h2, h3, h4');
    if (heading) content.push(heading);
    // Get paragraph
    let paragraph = textContainer.querySelector('p');
    if (paragraph) content.push(paragraph);
    // Get CTA (button or similar div)
    let cta = textContainer.querySelector('.button');
    if (cta) content.push(cta);
    // Defensive: if we found nothing, fall back to all text content
    if (!content.length) {
      // Try all child nodes except image
      Array.from(textContainer.childNodes).forEach(node => {
        if (node.nodeType === 1 && node !== aspectDiv && !node.classList.contains('cover-image')) content.push(node);
      });
    }
    return [imageEl, content];
  });

  // Remove any rows that have no image or no text content (defensive, not expected for this layout)
  const validRows = rows.filter(([img, content]) => img && content && content.length);

  // Build table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    ...validRows
  ], document);

  element.replaceWith(table);
}
