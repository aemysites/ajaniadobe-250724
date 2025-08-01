/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Cards (cards10)'];
  const rows = [headerRow];
  // Each card is an <a> child of the grid
  const cards = element.querySelectorAll(':scope > a.card-link');
  cards.forEach((card) => {
    // Get card image (first descendant img)
    const imgContainer = card.querySelector('.utility-aspect-3x2');
    const img = imgContainer ? imgContainer.querySelector('img') : null;
    // Text content container
    const textContainer = card.querySelector('.utility-padding-all-1rem');
    const textParts = [];
    // Tag (optional)
    const tag = textContainer && textContainer.querySelector('.tag-group .tag');
    if (tag) {
      // Use the actual div, just strip classes (for simplicity)
      tag.removeAttribute('class');
      textParts.push(tag);
    }
    // Heading (h3)
    const heading = textContainer && textContainer.querySelector('h3');
    if (heading) {
      textParts.push(heading);
    }
    // Description (p)
    const desc = textContainer && textContainer.querySelector('p');
    if (desc) {
      textParts.push(desc);
    }
    // Compose row
    rows.push([
      img,
      textParts
    ]);
  });
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
