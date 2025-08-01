/* global WebImporter */
export default function parse(element, { document }) {
  // Header row: block name, exactly as in the requirement
  const headerRow = ['Hero (hero6)'];

  // --- Row 2: Background Image (optional) ---
  // Look for any <img> that appears to be the hero background
  let bgImgCell = '';
  const bgImg = element.querySelector('img.cover-image');
  if (bgImg) {
    bgImgCell = bgImg;
  }

  // --- Row 3: Title, Subheading, CTA (all in a single card element) ---
  let contentCell = '';
  const card = element.querySelector('.card');
  if (card) {
    contentCell = card;
  }

  // Compose the block table as a 1-column, 3-row table
  const cells = [
    headerRow,
    [bgImgCell],
    [contentCell]
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}