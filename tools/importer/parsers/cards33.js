/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards33) block - header row
  const headerRow = ['Cards (cards33)'];
  const rows = [headerRow];

  // Get each card by immediate child <a>
  const cardLinks = element.querySelectorAll(':scope > a');
  cardLinks.forEach((card) => {
    // Find the cover image (first img descendant)
    const img = card.querySelector('img');

    // Find the card content container
    // Structure: <a> <div.grid-layout> <img> <div>...</div></div></a>
    let contentDiv = null;
    const grid = card.querySelector(':scope > div');
    if (grid) {
      // Find all div children of grid (after img)
      const gridChildren = Array.from(grid.children);
      contentDiv = gridChildren.find(child => child.tagName === 'DIV' && child.querySelector('h3, .h4-heading'));
    }
    // Fallback: find any div with heading
    if (!contentDiv) {
      contentDiv = card.querySelector('h3, .h4-heading')?.parentElement;
    }
    // Defensive: fallback to any div in card
    if (!contentDiv) {
      contentDiv = card.querySelector('div');
    }

    if (contentDiv) {
      // Remove any 'Read' <div>s at the bottom that are NOT links
      // (in this structure, it's a div containing 'Read', not a link)
      const readDivs = Array.from(contentDiv.children).filter(child => {
        return child.tagName === 'DIV' && child.textContent.trim() === 'Read' && child.children.length === 0;
      });
      readDivs.forEach(div => div.remove());
      // Defensive: Remove empty trailing divs
      while (contentDiv.lastElementChild && contentDiv.lastElementChild.tagName === 'DIV' && contentDiv.lastElementChild.textContent.trim() === '') {
        contentDiv.lastElementChild.remove();
      }
    }

    // Compose the row: [image, contentDiv]
    rows.push([img, contentDiv]);
  });

  // Create and replace block
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
