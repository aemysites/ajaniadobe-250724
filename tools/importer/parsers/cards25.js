/* global WebImporter */
export default function parse(element, { document }) {
  // Build the header
  const cells = [['Cards (cards25)']];

  // Get all direct children that are cards (they always have an img, optionally also text)
  const cardDivs = Array.from(element.querySelectorAll(':scope > div'));
  for (const cardDiv of cardDivs) {
    // Find the image for the card
    const img = cardDiv.querySelector('img');
    if (!img) continue; // Only process cards with images (mandatory)

    // Find heading and description text -- both may be missing, but at least one is usually present
    let textCellContent = [];
    const heading = cardDiv.querySelector('h1, h2, h3, h4, h5, h6');
    if (heading) textCellContent.push(heading);
    const desc = cardDiv.querySelector('p');
    if (desc) textCellContent.push(desc);

    // If no heading or description, leave cell empty
    // Compose the row: [img, text content]
    cells.push([
      img,
      textCellContent.length ? textCellContent : ''
    ]);
  }

  // Create and replace block table
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
