/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Locate the main grid containing the two columns
  const container = element.querySelector('.container');
  if (!container) return;

  // The primary content grid (the two side-by-side columns)
  // It will be the first '.w-layout-grid.grid-layout' inside the container
  const mainGrid = container.querySelector('.w-layout-grid.grid-layout');
  if (!mainGrid) return;

  // The structure: mainGrid has 3 children:
  // [0]: h2-heading (heading)
  // [1]: paragraph-lg (testimonial text)
  // [2]: w-layout-grid (nested grid: divider, avatar, attribution, logo)
  const gridChildren = Array.from(mainGrid.children);
  if (gridChildren.length < 3) return;
  const heading = gridChildren[0];
  const testimonial = gridChildren[1];
  const innerGrid = gridChildren[2];

  // Compose the first column: heading + testimonial
  const col1 = document.createElement('div');
  if (heading) col1.appendChild(heading);
  if (testimonial) col1.appendChild(testimonial);

  // Second column: the entire attribution grid (divider, avatar, text, logo)
  // Reference the existing element directly
  // No need to wrap, just reference innerGrid

  // Build the table
  const cells = [
    ['Columns (columns25)'],
    [col1, innerGrid]
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
