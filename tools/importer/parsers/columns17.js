/* global WebImporter */
export default function parse(element, { document }) {
  // Header row: single cell, block name
  const cells = [['Columns (columns17)']];
  // Second row: one cell per image/column
  const columnDivs = Array.from(element.querySelectorAll(':scope > .utility-aspect-1x1'));
  const imageCells = columnDivs.map(div => {
    const img = div.querySelector('img');
    return img || '';
  });
  cells.push(imageCells);
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
