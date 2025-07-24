/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid inside the section > .container > .grid-layout
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;
  const gridChildren = Array.from(grid.children);

  // Find columns: image and the other content
  const image = gridChildren.find(el => el.tagName === 'IMG');
  const mainContentDiv = gridChildren.find(el => el.tagName === 'DIV');
  const contactList = gridChildren.find(el => el.tagName === 'UL');

  // Assemble the left column: combine mainContentDiv and contactList if they exist
  const leftCol = document.createElement('div');
  if (mainContentDiv) leftCol.appendChild(mainContentDiv);
  if (contactList) leftCol.appendChild(contactList);

  // Build the cells array to ensure header has exactly one column, content has two columns
  const cells = [
    ['Columns (columns17)'],
    [leftCol, image].map(el => el || document.createElement('div')),
  ];

  // The second row must be a single array with two columns (leftCol, image)
  // No extra rows or header columns
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
