/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout containing the columns
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;
  // Get the two columns (should be two direct children)
  const columns = Array.from(grid.children);
  if (columns.length < 2) return;

  // First column: should be the image
  const firstCol = columns[0];
  let img = firstCol;
  if (img.tagName !== 'IMG') {
    img = firstCol.querySelector('img');
  }
  // Second column: the full content block
  const secondCol = columns[1];
  // Defensive: do not proceed without both columns
  if (!img || !secondCol) return;

  // Construct the block table
  const headerRow = ['Columns (columns32)'];
  const contentRow = [img, secondCol];
  const block = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  // Replace the original element
  element.replaceWith(block);
}
