/* global WebImporter */
export default function parse(element, { document }) {
  // Header row
  const headerRow = ['Hero (hero5)'];

  // Find the main grid inside the section
  const mainGrid = element.querySelector(':scope > .w-layout-grid');
  if (!mainGrid) return;

  // Find the image (should be at mainGrid level)
  const img = mainGrid.querySelector('img');
  // Defensive: if no image, leave cell null
  const imageCell = img ? [img] : [];

  // Find the nested grid containing text/buttons content
  const nestedGrid = mainGrid.querySelector(':scope > .w-layout-grid');
  let contentCell = [];
  if (nestedGrid) {
    // The content block is the first direct child of nestedGrid
    const contentBlock = nestedGrid.querySelector(':scope > div');
    if (contentBlock) {
      contentCell = [contentBlock];
    }
  }

  // If fallback: if nestedGrid missing, but there's a div with text/buttons directly under mainGrid
  if (contentCell.length === 0) {
    const maybeContentDiv = mainGrid.querySelector(':scope > div');
    if (maybeContentDiv) {
      contentCell = [maybeContentDiv];
    }
  }

  // Assemble table: 1 column, 3 rows
  const rows = [
    headerRow,
    imageCell,
    contentCell,
  ];

  const table = WebImporter.DOMUtils.createTable(rows, document);

  element.replaceWith(table);
}
