/* global WebImporter */
export default function parse(element, { document }) {
  // Header row matching the example
  const header = ['Cards (cards10)'];

  // Get all cards (direct children <a> elements)
  const cards = Array.from(element.querySelectorAll(':scope > a.card-link'));

  // Build table rows for each card
  const rows = cards.map((card) => {
    // First cell: the card image (first <img> inside the first div)
    let image = null;
    const imageDiv = card.querySelector(':scope > div');
    if (imageDiv) {
      image = imageDiv.querySelector('img');
    }

    // Second cell: all remaining text content
    // Find the container with tag, heading, and paragraph
    const infoDiv = card.querySelector('.utility-padding-all-1rem');
    const textCell = document.createElement('div');

    if (infoDiv) {
      // Tag(s)
      const tags = infoDiv.querySelectorAll('.tag-group .tag');
      if (tags.length > 0) {
        const tagsDiv = document.createElement('div');
        tagsDiv.className = 'card-tags';
        tags.forEach(tag => tagsDiv.appendChild(tag));
        textCell.appendChild(tagsDiv);
      }
      // Heading
      const heading = infoDiv.querySelector('h3, .h4-heading');
      if (heading) {
        textCell.appendChild(heading);
      }
      // Paragraph
      const paragraph = infoDiv.querySelector('p');
      if (paragraph) {
        textCell.appendChild(paragraph);
      }
    }
    return [image, textCell.childNodes.length ? Array.from(textCell.childNodes) : ''];
  });

  // Compose the table
  const table = WebImporter.DOMUtils.createTable([
    header,
    ...rows,
  ], document);
  element.replaceWith(table);
}
