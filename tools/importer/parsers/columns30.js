/* global WebImporter */
export default function parse(element, { document }) {
  // The structure must match the block table spec for Columns (columns30):
  // - First row: single cell with header
  // - Second row: as many columns as in the layout. Each cell contains the content for that column (can be multiple elements, not just images)

  // Find the main grid of columns (should be a .grid-layout)
  let grid = element.querySelector('.grid-layout');
  if (!grid) grid = element.querySelector('[class*="grid"]');
  if (!grid) return;
  // Get each column (immediate children of grid)
  const columnDivs = Array.from(grid.querySelectorAll(':scope > div'));
  // For each column, collect ALL direct child elements as content
  // (In our HTML, these are divs holding another div which holds the img)
  const columnsContent = columnDivs.map(colDiv => {
    // If there's only one child, just use that
    const children = Array.from(colDiv.childNodes).filter(n => n.nodeType === 1);
    if (children.length === 1) return children[0];
    if (children.length > 1) return children;
    // fallback: empty cell
    return '';
  });

  // Build the table: header is one cell, content row is N cells (columns)
  const cells = [
    ['Columns (columns30)'],
    columnsContent
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
