/* global WebImporter */
export default function parse(element, { document }) {
  // Table header must match exactly
  const headerRow = ['Cards (cards37)'];

  // Find the main grid of cards (top-level container with grid classes)
  let grid = element.querySelector('.w-layout-grid.grid-layout');
  if (!grid) grid = element;

  // Collect all card items in order
  const allCards = [];
  const children = Array.from(grid.children);
  for (const child of children) {
    if (
      child.classList &&
      child.classList.contains('w-layout-grid') &&
      child.classList.contains('grid-layout')
    ) {
      // Nested grid: add its direct card children (usually <a> tags)
      allCards.push(...Array.from(child.children).filter(
        el => el.matches('a.utility-link-content-block, a.utility-link-content-block.w-inline-block')
      ));
    } else if (child.matches && child.matches('a.utility-link-content-block, a.utility-link-content-block.w-inline-block')) {
      allCards.push(child);
    }
  }

  // For each card, create a row: [image, text-content]
  const rows = allCards.map(card => {
    // IMAGE CELL: use first <img> descendant (if any)
    let img = card.querySelector('img.cover-image');
    let imageCell = img ? img : '';

    // TEXT CELL: gather heading, description, and CTA (in order, as existing elements)
    const textCellContent = [];
    // Heading (h2, h3, h4), prefer h2 first, then h3, then h4
    let heading = card.querySelector('h2, h3, h4, .h2-heading, .h4-heading');
    if (heading) textCellContent.push(heading);
    // All <p> elements (description)
    let paragraphs = card.querySelectorAll('p');
    paragraphs.forEach(p => textCellContent.push(p));
    // Button/CTA (may be a div.button or a real <button>)
    let cta = card.querySelector('.button, button');
    if (cta) textCellContent.push(cta);
    return [imageCell, textCellContent];
  });

  // Construct the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    ...rows
  ], document);

  // Replace the original element
  element.replaceWith(table);
}
