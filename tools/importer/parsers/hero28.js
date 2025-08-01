/* global WebImporter */
export default function parse(element, { document }) {
  // Table header as specified
  const headerRow = ['Hero (hero28)'];

  // --- 2nd row: Background Image (if present) ---
  // According to the HTML, the image is inside the first child div of .grid-layout
  let backgroundImg = '';
  const grid = element.querySelector('.w-layout-grid.grid-layout');
  if (grid) {
    // Look for an img inside the first immediate child div
    const firstGridChild = grid.querySelector('div');
    if (firstGridChild) {
      const img = firstGridChild.querySelector('img');
      if (img) backgroundImg = img;
    }
  }

  // --- 3rd row: Content (title, subtitle, CTA) ---
  // According to the HTML, content is in .container
  let contentElements = [];
  const container = element.querySelector('.container');
  if (container) {
    // Optional: find main heading (h1, h2, etc.)
    const heading = container.querySelector('h1, h2, h3, h4, h5, h6');
    if (heading) contentElements.push(heading);

    // Optional: subheading (look for h2/h3 after h1, but not in this HTML, generalize)
    // In this example, only h1 is present. If more, add them.
    const allHeadings = container.querySelectorAll('h2, h3, h4, h5, h6');
    allHeadings.forEach(h => {
      if (!contentElements.includes(h)) {
        contentElements.push(h);
      }
    });

    // Any paragraphs or supporting text
    const paragraphs = container.querySelectorAll('p');
    paragraphs.forEach(p => contentElements.push(p));

    // Any CTA - links/buttons
    // This block has .button-group, but it's empty here; handle in general
    const buttonGroup = container.querySelector('.button-group');
    if (buttonGroup) {
      Array.from(buttonGroup.children).forEach(btn => contentElements.push(btn));
    }
  }

  // If contentElements is empty, fill with blank string to keep cell present
  const contentRow = [contentElements.length ? contentElements : ''];

  // Build rows for createTable
  const rows = [
    headerRow,
    [backgroundImg ? backgroundImg : ''],
    contentRow,
  ];

  // Create table and replace element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
