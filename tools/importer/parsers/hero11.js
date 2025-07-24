/* global WebImporter */
export default function parse(element, { document }) {
  // Get all immediate children; in the source these are grid "slots" with a single <img> each
  const children = element.querySelectorAll(':scope > div');
  // Collect all <img> elements directly
  const images = [];
  children.forEach(child => {
    const img = child.querySelector('img');
    if (img) images.push(img);
  });
  // Create the block table with 1 col, 3 rows per spec
  // 1. Header row: block name, 2. Background image(s), 3. Empty (no title/subheading/CTA in this HTML)
  const cells = [
    ['Hero (hero11)'],
    [images],
    ['']
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
