/* global WebImporter */
export default function parse(element, { document }) {
  // Get the top-level grid layout (holds two columns)
  const container = element.querySelector('.container');
  if (!container) return;
  const mainGrid = container.querySelector('.grid-layout');
  if (!mainGrid) return;
  const mainCols = mainGrid.querySelectorAll(':scope > div');
  if (mainCols.length < 2) return;

  // LEFT COLUMN: Heading, subheading, buttons
  const leftCol = mainCols[0];
  const fragLeft = document.createDocumentFragment();
  const h1 = leftCol.querySelector('h1');
  if (h1) fragLeft.appendChild(h1);
  const subheading = leftCol.querySelector('p');
  if (subheading) fragLeft.appendChild(subheading);
  const buttonGroup = leftCol.querySelector('.button-group');
  if (buttonGroup) fragLeft.appendChild(buttonGroup);

  // RIGHT COLUMN: Three images
  const rightCol = mainCols[1];
  const imagesGrid = rightCol.querySelector('.grid-layout');
  const fragRight = document.createDocumentFragment();
  if (imagesGrid) {
    imagesGrid.querySelectorAll('img').forEach(img => {
      fragRight.appendChild(img);
    });
  }

  // Ensure header row is a single cell (for proper spanning)
  // The number of columns in the content row must match the number of content cells (2 in this case)
  // But the header row is a single cell so the table code will make it span both columns
  const headerRow = ['Columns (columns36)'];
  const contentRow = [fragLeft, fragRight];
  const cells = [headerRow, contentRow];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  // Set header cell to span all columns
  const th = table.querySelector('th');
  if (th) th.colSpan = contentRow.length;

  element.replaceWith(table);
}
