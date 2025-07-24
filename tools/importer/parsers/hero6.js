/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Table header must exactly match the example
  const headerRow = ['Hero (hero6)'];

  // 2. Background image extraction (1st row, 2nd row in table)
  // The example always shows exactly one background image in this row.
  // Look for an absolutely positioned .cover-image, or the first img if not found
  let bgImg = element.querySelector('img.cover-image.utility-position-absolute');
  if (!bgImg) {
    // fallback: look for a cover-image (not inside a grid cell)
    const possibleImgs = Array.from(element.querySelectorAll('img.cover-image'));
    bgImg = possibleImgs.find(img => img.closest('.grid-layout') === element || img.closest('section') === element) || possibleImgs[0];
  }
  // If still not found, fallback to any img
  if (!bgImg) {
    bgImg = element.querySelector('img');
  }
  const backgroundRow = [bgImg || ''];

  // 3. Content: headline, subhead, cta (all in one cell)
  // Find the most likely content block (headings, paragraphs, buttons)
  // This is typically inside a .card-body, else inside a .container, or fallback to a div with headings
  let contentBlock = element.querySelector('.card-body');
  if (!contentBlock) {
    contentBlock = element.querySelector('.container');
  }
  if (!contentBlock) {
    // Find first div with at least one heading inside
    contentBlock = Array.from(element.querySelectorAll('div')).find(div => div.querySelector('h1,h2,h3')); 
  }
  // Fallback to the section itself if nothing found
  if (!contentBlock) {
    contentBlock = element;
  }
  
  const contentRow = [contentBlock];

  // Compose the table as a 1-column, 3-row table
  const cells = [
    headerRow,
    backgroundRow,
    contentRow,
  ];

  // Use WebImporter.DOMUtils.createTable
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace element with table
  element.replaceWith(block);
}
