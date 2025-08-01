/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as per specification
  const headerRow = ['Cards (cards24)'];
  // Collect all direct child card anchors
  const cards = Array.from(element.querySelectorAll(':scope > a.utility-link-content-block'));
  const rows = cards.map((card) => {
    // Card image: always in first direct div in the card
    const imgWrapper = card.querySelector(':scope > div');
    const img = imgWrapper ? imgWrapper.querySelector('img') : null;
    // Card meta (tag and date)
    const meta = card.querySelector(':scope > .flex-horizontal');
    let metaDiv = null;
    if (meta) {
      // Compose a single div containing tag and date
      metaDiv = document.createElement('div');
      Array.from(meta.childNodes).forEach((child) => {
        // Only include element nodes with text
        if (child.nodeType === 1 && child.textContent.trim()) {
          metaDiv.appendChild(child);
        }
      });
      // If nothing appended, discard
      if (!metaDiv.hasChildNodes()) metaDiv = null;
    }
    // Card title
    const title = card.querySelector('h3, .h4-heading');
    // Compose the right cell content
    const textCellContent = [];
    if (metaDiv) textCellContent.push(metaDiv);
    if (title) textCellContent.push(title);
    // Compose the row: [image, right cell]
    return [img || '', textCellContent.length > 0 ? textCellContent : ''];
  });
  // Build the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    ...rows
  ], document);
  // Replace original element with the new table
  element.replaceWith(table);
}
