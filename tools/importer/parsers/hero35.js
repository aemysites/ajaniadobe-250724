/* global WebImporter */
export default function parse(element, { document }) {
  // Table header: block name exactly as given
  const headerRow = ['Hero (hero35)'];

  // Background image row (none in provided HTML)
  const bgRow = [''];

  // Prep content row (heading, subheading, CTA)
  let contentItems = [];

  // Locate content wrappers: grid -> content (text) div and CTA link
  const container = element.querySelector('.container');
  let grid = container ? container.querySelector('.grid-layout') : null;
  if (!grid) grid = element;
  const gridChildren = Array.from(grid.children);

  // Identify the text content div and the CTA button/link
  let textDiv = null;
  let cta = null;
  gridChildren.forEach(child => {
    // If it's a link, treat as CTA
    if (child.tagName === 'A' || child.classList.contains('button')) {
      cta = child;
    } else {
      // Assume the other is the text node
      textDiv = child;
    }
  });

  // Gather heading and subheading from textDiv
  if (textDiv) {
    // Get all headings directly in this div
    const headings = textDiv.querySelectorAll('h1, h2, h3, h4, h5, h6');
    headings.forEach(h => contentItems.push(h));
    // Get subheading/paragraph(s)
    const paragraphs = textDiv.querySelectorAll('p, .subheading');
    paragraphs.forEach(p => {
      // Avoid duplicates if subheading is a p already selected
      if (!contentItems.includes(p)) contentItems.push(p);
    });
  }

  // Add CTA if exists
  if (cta) contentItems.push(cta);

  // If nothing found, ensure at least empty string in content row
  if (contentItems.length === 0) contentItems = [''];

  const contentRow = [contentItems];

  // Assemble
  const rows = [headerRow, bgRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
