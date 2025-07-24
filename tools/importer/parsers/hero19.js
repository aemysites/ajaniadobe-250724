/* global WebImporter */
export default function parse(element, { document }) {
  // Header row, must exactly match the block name
  const headerRow = ['Hero (hero19)'];

  // 2nd row: visual (all background images, as in the example)
  // Find the main grid that contains all images
  let images = [];
  const heroScaleGrid = element.querySelector('.ix-hero-scale-3x-to-1x .grid-layout');
  if (heroScaleGrid) {
    images = Array.from(heroScaleGrid.querySelectorAll('img'));
  }

  // Use all images in a single <div> for the background, for resilience
  const backgroundDiv = document.createElement('div');
  images.forEach(img => backgroundDiv.appendChild(img));

  const backgroundRow = [backgroundDiv];

  // 3rd row: content (heading, subheading, CTAs)
  // Find the content container
  let contentCell;
  const contentContainer = element.querySelector('.ix-hero-scale-3x-to-1x-content .container');
  if (contentContainer) {
    // Reference the heading, subheading, and CTA button group
    const parts = [];
    const heading = contentContainer.querySelector('h1, h2, h3, h4, h5, h6');
    const subheading = contentContainer.querySelector('p');
    const ctas = contentContainer.querySelector('.button-group');
    if (heading) parts.push(heading);
    if (subheading) parts.push(subheading);
    if (ctas) parts.push(ctas);
    // If none found, use empty div
    contentCell = parts.length > 0 ? parts : [document.createElement('div')];
  } else {
    contentCell = [document.createElement('div')];
  }
  const contentRow = [contentCell];

  // Compose the block table per requirements
  const cells = [headerRow, backgroundRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
