/* global WebImporter */
export default function parse(element, { document }) {
  // Header row per block spec
  const headerRow = ['Accordion (accordion27)'];
  const rows = [];
  // Find all direct child dividers, each is an accordion item
  const dividers = element.querySelectorAll(':scope > .divider');
  dividers.forEach(divider => {
    // Each divider should contain a grid-layout
    const grid = divider.querySelector('.grid-layout');
    if (!grid) return;
    // The grid contains two divs: title and content
    const children = grid.querySelectorAll(':scope > div');
    // Defensive: ensure at least two children
    if (children.length < 2) return;
    const title = children[0];
    const content = children[1];
    // Push actual DOM nodes, not text or clones
    rows.push([title, content]);
  });
  // Build table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    ...rows
  ], document);
  // Replace original element
  element.replaceWith(table);
}
