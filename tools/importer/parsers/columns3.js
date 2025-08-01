/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout containing columns
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Collect all direct children (columns) of the grid
  const columns = Array.from(grid.children);
  if (!columns.length) return;

  // Build the cells array: header row (1 cell), then content row (as many columns as found)
  const headerRow = ['Columns (columns3)'];
  const contentRow = columns.map(col => col);
  const cells = [headerRow, contentRow];

  // Create the table block
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Fix: set colspan on header cell to span all columns (always exactly as many as columns in content row)
  const headerTr = table.querySelector('tr');
  if (headerTr) {
    const th = headerTr.querySelector('th');
    if (th) {
      th.colSpan = columns.length;
    }
  }

  // Replace the original element with the new table block
  element.replaceWith(table);
}
