/* global WebImporter */
export default function parse(element, { document }) {
  // Gather direct child columns
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // The header row is a single cell with the block name
  const headerRow = ['Columns (columns37)'];

  // Each cell in the content row is the full contents of a column div (image, text, buttons, etc)
  // For this specific HTML, each "column" div only contains an <img>, but this structure works for future cases too
  const contentRow = columns.map(col => col);

  // The final table has one row (header) and one row (columns)
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  element.replaceWith(table);
}
