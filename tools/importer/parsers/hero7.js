/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Table header row: EXACT name as provided
  const headerRow = ['Hero (hero7)'];

  // 2. Extract background image (optional)
  // Find the image with class 'cover-image' within the first .grid-layout > div
  let bgImgElem = null;
  const gridDivs = element.querySelectorAll('.grid-layout > div');
  for (const div of gridDivs) {
    const img = div.querySelector('img.cover-image');
    if (img) {
      bgImgElem = img;
      break;
    }
  }

  // 3. Extract card content (heading, subheading, CTA)
  // Find the first .card in the element
  let contentElem = null;
  const card = element.querySelector('.card');
  if (card) {
    contentElem = card;
  }

  // 4. Build rows: always 1 column; only add rows if data exists
  const rows = [
    headerRow,
    [bgImgElem].filter(Boolean),
    [contentElem].filter(Boolean)
  ];

  // Only include rows that have content (header always present)
  const finalRows = [rows[0]];
  if (rows[1].length > 0) finalRows.push(rows[1]);
  if (rows[2].length > 0) finalRows.push(rows[2]);

  // 5. Create table and replace original element
  const table = WebImporter.DOMUtils.createTable(finalRows, document);
  element.replaceWith(table);
}
