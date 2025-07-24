/* global WebImporter */
export default function parse(element, { document }) {
  // Header row: block name, must match exactly
  const headerRow = ['Hero (hero13)'];

  // 2nd row: Background Image (optional)
  // Find the grid with the image in the left cell
  let bgImg = null;
  const grid = element.querySelector('.w-layout-grid');
  if (grid) {
    // Try to find an <img> inside a .ix-parallax-scale-out-hero descendant
    const imgContainer = grid.querySelector('.ix-parallax-scale-out-hero');
    if (imgContainer) {
      const img = imgContainer.querySelector('img');
      if (img) {
        bgImg = img;
      }
    }
  }
  const imageRow = [bgImg ? bgImg : '']; // must be a cell (even if empty)

  // 3rd row: Title, Subheading, CTA (all optional)
  // Find the content in the right cell
  let contentCell = [];
  if (grid) {
    // The right cell has container.utility-z-index-2
    const containers = grid.querySelectorAll('.container.utility-z-index-2');
    for (const container of containers) {
      // Find all h1, h2, h3, p, and button/link
      // In provided HTML, it's just a h1 and .button-group
      const contentDiv = container.querySelector('.utility-margin-bottom-6rem') || container;
      // Get all children except empty divs
      const children = Array.from(contentDiv.childNodes).filter(node => {
        if (node.nodeType === Node.ELEMENT_NODE) {
          // keep non-empty elements
          if (node.tagName === 'DIV' && node.childNodes.length === 0) return false;
          return true;
        }
        // keep text nodes if they are not just whitespace
        if (node.nodeType === Node.TEXT_NODE && node.textContent.trim().length > 0) return true;
        return false;
      });
      contentCell = children;
      break;
    }
  }
  if (contentCell.length === 0) {
    // Fallback: try to get all text/heading/buttons in the element
    contentCell = Array.from(element.querySelectorAll('h1, h2, h3, h4, h5, h6, p, a, button'));
    if (contentCell.length === 0) contentCell = [''];
  }

  // Create table
  const cells = [
    headerRow,
    [bgImg ? bgImg : ''],
    [contentCell]
  ];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element
  element.replaceWith(block);
}
