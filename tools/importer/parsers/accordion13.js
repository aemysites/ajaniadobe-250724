/* global WebImporter */
export default function parse(element, { document }) {
  // Define the header for the block
  const headerRow = ['Accordion (accordion13)'];
  const rows = [headerRow];

  // Select all immediate children with class 'divider'
  const dividers = element.querySelectorAll(':scope > .divider');
  dividers.forEach(divider => {
    // Each divider should have one grid containing two children: title and content
    const grid = divider.querySelector(':scope > .w-layout-grid');
    if (grid) {
      // Find all immediate children of the grid (should be two: title, content)
      const gridChildren = Array.from(grid.children);
      // Defensive: only process if we have at least 2 children
      if (gridChildren.length >= 2) {
        const title = gridChildren[0];
        const content = gridChildren[1];
        // Use the actual elements, not clones or innerHTML
        rows.push([title, content]);
      }
    }
  });

  // Create the block table with the collected rows
  const table = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element with the new block table
  element.replaceWith(table);
}
