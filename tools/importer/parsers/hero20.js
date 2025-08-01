/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Header row matches: 'Hero (hero20)'
  const headerRow = ['Hero (hero20)'];

  // 2. Extract all background images in the collage grid
  let backgroundImages = [];
  const bgGrid = element.querySelector('.grid-layout.desktop-3-column');
  if (bgGrid) {
    backgroundImages = Array.from(bgGrid.querySelectorAll('img'));
  }
  // Combine images into a fragment (as per semantic intent)
  let backgroundCell;
  if (backgroundImages.length > 0) {
    if (backgroundImages.length === 1) {
      backgroundCell = backgroundImages[0];
    } else {
      const frag = document.createDocumentFragment();
      backgroundImages.forEach(img => frag.appendChild(img));
      backgroundCell = frag;
    }
  } else {
    backgroundCell = '';
  }

  // 3. Compose text/call-to-action cell from the overlay content
  // Text area is in .ix-hero-scale-3x-to-1x-content > .container.small-container
  let textCell = '';
  const textContentContainer = element.querySelector('.ix-hero-scale-3x-to-1x-content .container.small-container');
  if (textContentContainer) {
    // We'll reference all block-level children in order, preserving headings, paragraph, button group
    const contentEls = [];
    // only include direct children for semantic order
    Array.from(textContentContainer.children).forEach(child => {
      // Exclude any empty elements (edge case)
      if (child.textContent.trim() || child.querySelector('a,button')) {
        contentEls.push(child);
      }
    });
    if (contentEls.length) {
      textCell = contentEls;
    }
  }

  // 4. Compose table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    [backgroundCell],
    [textCell]
  ], document);

  element.replaceWith(table);
}
