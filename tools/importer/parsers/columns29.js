/* global WebImporter */
export default function parse(element, { document }) {
  // Header row matches the example: one single cell, block name
  const headerRow = ['Columns (columns29)'];

  // Get columns (divs directly under element)
  const columnDivs = Array.from(element.querySelectorAll(':scope > div'));

  // For each column, extract the top-level image (or all children if required in variations)
  const contentRow = columnDivs.map(div => {
    // Most likely an aspect-ratio wrapper, so grab the image inside
    // Try to get just the image
    const img = div.querySelector('img');
    if (img) return img;
    // Otherwise, just use the div itself
    return div;
  });

  // Compose the block table with a single header cell and one row with a cell per column
  const cells = [headerRow, contentRow];

  // Create the table
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the table
  element.replaceWith(table);
}
