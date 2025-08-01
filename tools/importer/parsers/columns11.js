/* global WebImporter */
export default function parse(element, { document }) {
  // Collect left and right columns from the main grid
  const container = element.querySelector('.container');
  const mainGrid = container.querySelector('.w-layout-grid.grid-layout');
  const gridChildren = mainGrid ? mainGrid.querySelectorAll(':scope > div') : [];
  const leftCol = gridChildren[0] || document.createElement('div');
  const rightCol = gridChildren[1] || document.createElement('div');

  // Collect images for the image row
  const imagesGrid = element.querySelector('.w-layout-grid.grid-gap-md, .w-layout-grid.mobile-portrait-1-column.grid-gap-md');
  const imageDivs = imagesGrid ? imagesGrid.querySelectorAll('.utility-aspect-1x1') : [];
  const img1 = imageDivs[0] ? imageDivs[0].querySelector('img') : '';
  const img2 = imageDivs[1] ? imageDivs[1].querySelector('img') : '';

  // Table: single header cell, then two columns per row below (matches provided markdown example)
  const cells = [];
  cells.push(['Columns (columns11)']); // Header row: one cell only
  cells.push([leftCol, rightCol]);     // Content row: two columns
  cells.push([img1, img2]);           // Image row: two columns

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
