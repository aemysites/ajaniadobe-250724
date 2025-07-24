/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as required
  const headerRow = ['Columns (columns5)'];

  // Get all top-level columns (expected 3 for this structure)
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // For each column, collect all its children into a fragment (not just the image)
  const colCells = columns.map(col => {
    // If there's only one child, return it directly; else group all children
    const children = Array.from(col.childNodes).filter(node => {
      // Ignore empty text nodes
      return !(node.nodeType === Node.TEXT_NODE && !node.textContent.trim());
    });
    if (children.length === 1) {
      return children[0];
    } else {
      const frag = document.createDocumentFragment();
      children.forEach(child => frag.appendChild(child));
      return frag;
    }
  });

  // Compose the table rows
  const rows = [headerRow, colCells];

  // Create and replace with the columns table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
