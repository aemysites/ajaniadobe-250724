/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: safely get direct child grid columns
  function getGridColumns(grid) {
    return grid ? Array.from(grid.querySelectorAll(':scope > div')) : [];
  }
  // 1. Get the main grid (with headline and right side)
  const mainGrid = element.querySelector('.w-layout-grid.grid-layout.tablet-1-column');
  const [leftCol, rightCol] = getGridColumns(mainGrid);

  // Left column: contains eyebrow and h1
  let leftContent = [];
  if (leftCol) leftContent = Array.from(leftCol.children);

  // Right column: contains text, avatar/meta, button
  let rightContent = [];
  if (rightCol) rightContent = Array.from(rightCol.children);

  // 2. Get the image grid for the next row
  const imageGrid = element.querySelector('.w-layout-grid.grid-layout.mobile-portrait-1-column');
  let img1 = null, img2 = null;
  if (imageGrid) {
    const imageDivs = Array.from(imageGrid.querySelectorAll('.utility-aspect-1x1'));
    if (imageDivs[0]) img1 = imageDivs[0].querySelector('img');
    if (imageDivs[1]) img2 = imageDivs[1].querySelector('img');
  }

  // The header row must always be a single cell (one column), even if content rows have more columns
  const headerRow = ['Columns (columns16)'];

  // Compose the table rows: header (1 col), data rows (2 cols)
  const rows = [
    headerRow,
    [leftContent, rightContent],
    [img1 ? img1 : '', img2 ? img2 : '']
  ];

  // WebImporter.DOMUtils.createTable expects all rows to be the same length.
  // We'll fix the header after table creation by setting colspan if needed.
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Fix the header row to span all columns
  const colCount = Math.max(
    rows[1] ? rows[1].length : 1,
    rows[2] ? rows[2].length : 1
  );
  const headerTh = table.querySelector('tr:first-child th');
  if (headerTh && colCount > 1) {
    headerTh.setAttribute('colspan', colCount);
  }

  // Remove any extra th that may have been created (should only be one)
  // (If createTable creates extra th's, remove them)
  const headerTr = table.querySelector('tr:first-child');
  while (headerTr && headerTr.children.length > 1) {
    headerTr.removeChild(headerTr.lastChild);
  }

  element.replaceWith(table);
}
