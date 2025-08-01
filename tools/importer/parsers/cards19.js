/* global WebImporter */
export default function parse(element, { document }) {
  // Header row - must match exactly
  const headerRow = ['Cards (cards19)'];

  // Each card is a direct child div
  const cardDivs = Array.from(element.querySelectorAll(':scope > div'));
  const rows = cardDivs.map((card) => {
    // Icon cell: find .icon svg (referencing the real SVG element)
    let iconContent = null;
    const iconDiv = card.querySelector('div.icon');
    if (iconDiv) {
      // Use the SVG directly
      iconContent = iconDiv.querySelector('svg');
    }
    // Text cell: get the <p> (all text is in one p in this HTML)
    const textEl = card.querySelector('p');
    // Defensive: if p not found, fall back to empty string
    return [iconContent || '', textEl || ''];
  });
  // Compose cells for table
  const cells = [headerRow, ...rows];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
