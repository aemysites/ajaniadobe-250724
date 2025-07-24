/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: get direct child by index but return null if missing
  function getChildSafe(parent, idx) {
    return (parent && parent.children && parent.children[idx]) ? parent.children[idx] : null;
  }

  // Main grid (should be the direct child of container)
  const container = element.querySelector('.container');
  const grid = container ? container.querySelector('.grid-layout') : null;
  if (!grid) return; // Defensive: no grid found

  // Get columns
  // Left: text content, Right: images
  const textCol = getChildSafe(grid, 0);
  const imagesCol = getChildSafe(grid, 1);
  if (!imagesCol) return; // Defensive: no images

  // Gather text parts for the first slide
  // Use <h2> for the heading because in carousel slide context
  let textCellContent = [];
  if (textCol) {
    // Heading
    const h1 = textCol.querySelector('h1');
    if (h1) {
      const h2 = document.createElement('h2');
      h2.innerHTML = h1.innerHTML;
      textCellContent.push(h2);
    }
    // Subheading or description
    const subheading = textCol.querySelector('p');
    if (subheading) textCellContent.push(subheading);
    // Buttons
    const buttonGroup = textCol.querySelector('.button-group');
    if (buttonGroup) textCellContent.push(buttonGroup);
  }

  // Gather images (each is a slide)
  // All images are direct children (no nested grids)
  let slides = [];
  let imageNodes = imagesCol.querySelectorAll('img');

  imageNodes.forEach((img, idx) => {
    if (idx === 0) {
      slides.push([
        img,
        textCellContent.length ? textCellContent.slice() : ''
      ]);
    } else {
      slides.push([
        img, ''
      ]);
    }
  });

  const rows = [
    ['Carousel (carousel35)'],
    ...slides
  ];

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
