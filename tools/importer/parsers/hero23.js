/* global WebImporter */
export default function parse(element, { document }) {
  // Find the immediate child grid which contains content and image
  const grid = element.querySelector(':scope > .w-layout-grid');
  if (!grid) {
    element.replaceWith(document.createTextNode('Could not parse Hero (hero23) block.'));
    return;
  }

  // Find the content container and image
  let contentSection = null;
  let imageEl = null;
  // Get all immediate children of the grid
  const gridChildren = Array.from(grid.children);
  for (const child of gridChildren) {
    if (!contentSection && child.querySelector && child.querySelector('h2')) {
      // This child or one below it has the main heading
      contentSection = child;
    }
    if (!imageEl && child.tagName === 'IMG') {
      imageEl = child;
    }
  }

  // Backup: if no h2 found, just take first div
  if (!contentSection) {
    contentSection = gridChildren.find(c => c.tagName === 'DIV');
  }

  // Defensive: if still missing image, search deeply for IMG
  if (!imageEl) {
    imageEl = grid.querySelector('img');
  }

  // Defensive: if either is missing, just output error node
  if (!contentSection || !imageEl) {
    element.replaceWith(document.createTextNode('Could not parse Hero (hero23) block.'));
    return;
  }

  // Compose the content cell (Heading, paragraph, button group)
  const contentElements = [];
  // Heading
  const heading = contentSection.querySelector('h2');
  if (heading) contentElements.push(heading);
  // Rich text/paragraphs
  const richText = contentSection.querySelector('.rich-text, .w-richtext');
  if (richText) contentElements.push(richText);
  // Button group
  const buttonGroup = contentSection.querySelector('.button-group');
  if (buttonGroup) contentElements.push(buttonGroup);

  // If nothing, just add the contentSection as a fallback
  if (contentElements.length === 0) {
    contentElements.push(contentSection);
  }

  // Build the block table: 1 col, 3 rows
  const cells = [
    ['Hero (hero23)'],
    [imageEl],
    [contentElements]
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
