/* global WebImporter */
export default function parse(element, { document }) {
  // Create header row as required
  const headerRow = ['Hero (hero12)'];

  // Find the background image: the absolute-positioned cover image
  const bgImg = element.querySelector('img.cover-image.utility-position-absolute');

  // The content cell should contain all of the text, CTAs, and images (except background)
  // We want to include both the left headline/cta content and the right column (concert image)
  // We target the .card-body, which holds a .grid-layout with multiple columns
  let contentCell;
  const cardBody = element.querySelector('.card-body');
  if (cardBody) {
    // To keep all semantic/visual structure and avoid missing text, include the entire .card-body
    contentCell = cardBody;
  } else {
    // Fallback: include the entire element's first .container
    const fallback = element.querySelector('.container');
    contentCell = fallback ? fallback : element;
  }

  // Build the table: 1 column, 3 rows (header, bg image, content)
  const cells = [
    headerRow,
    [bgImg ? bgImg : ''],
    [contentCell]
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
