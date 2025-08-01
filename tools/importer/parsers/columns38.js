/* global WebImporter */
export default function parse(element, { document }) {
  // The header row must be a single cell with the block name (even if there are multiple columns in the content row)
  const headerRow = ['Columns (columns38)'];

  // Extract the immediate child divs (columns)
  const columnDivs = Array.from(element.querySelectorAll(':scope > div'));

  // For each column, extract the img (or all children for future-proofing)
  const contentRow = columnDivs.map(colDiv => {
    // In this case, we just want the image (if present)
    const img = colDiv.querySelector('img');
    return img || '';
  });

  // Compose the cells as: header row (1 cell), then content row (n columns)
  const cells = [
    headerRow,          // 1 cell
    contentRow          // n cells
  ];

  // Create and replace
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
