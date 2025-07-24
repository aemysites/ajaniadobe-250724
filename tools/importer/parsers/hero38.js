/* global WebImporter */
export default function parse(element, { document }) {
  // Create the header row
  const cells = [['Hero (hero38)']];

  // Get the immediate container divs for grid layout (source: :scope > div > div)
  const gridDivs = element.querySelectorAll(':scope > div > div');

  // --- Background Image row ---
  let imageEl = null;
  if (gridDivs.length) {
    // Look for the image in the first grid cell
    imageEl = gridDivs[0].querySelector('img');
  }
  cells.push([imageEl || '']);

  // --- Content row ---
  // The main content (heading, paragraph, CTA)
  let contentContainer = null;
  if (gridDivs.length > 1) {
    // Find the innermost grid that holds heading, text, and button
    contentContainer = gridDivs[1].querySelector('.w-layout-grid');
  }

  const contentParts = [];
  if (contentContainer) {
    // Heading (h1)
    const h1 = contentContainer.querySelector('h1');
    if (h1) contentParts.push(h1);
    // Paragraph(s)
    const paragraphs = contentContainer.querySelectorAll('p');
    paragraphs.forEach(p => contentParts.push(p));
    // CTA (button/link)
    const cta = contentContainer.querySelector('a.button');
    if (cta) contentParts.push(cta);
  }
  cells.push([contentParts]);

  // Build table and replace the original element
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
