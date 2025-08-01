/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid layout containing the columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all direct children of that grid (these are the columns)
  const columns = Array.from(grid.children);
  if (columns.length < 2) return;

  // Instead of cloning, reference the actual existing DOM elements to preserve document context and links
  // For each column, collect all child nodes that are not empty
  function extractContent(col) {
    // if col is an <img>, just use the image itself
    if (col.tagName === 'IMG') {
      return col;
    }
    // Otherwise, if col is a container, gather all non-empty children/descendants
    const content = [];
    for (const node of Array.from(col.childNodes)) {
      // preserve headings, paragraphs, buttons, etc
      if (
        node.nodeType === Node.ELEMENT_NODE ||
        (node.nodeType === Node.TEXT_NODE && node.textContent.trim())
      ) {
        content.push(node);
      }
    }
    // fallback: just use the col
    return content.length === 1 ? content[0] : (content.length > 1 ? content : col);
  }
  const leftCol = extractContent(columns[0]);
  const rightCol = extractContent(columns[1]);

  // Table header row must match exactly and be a single cell
  const headerRow = ['Columns (columns15)'];
  // The content row must have one cell per column, and each cell must reference the element(s) from the DOM
  const contentRow = [leftCol, rightCol];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
