/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Find the container (section > div.container)
  const container = element.querySelector('.container');
  if (!container) return;

  // 2. Find the main grid layout (the two columns)
  const grid = container.querySelector('.w-layout-grid');
  if (!grid) return;

  // 3. Find the left/main feature card (first direct child a.utility-link-content-block)
  //    This will be the first child of grid.
  const leftCard = grid.querySelector(':scope > a.utility-link-content-block');
  if (!leftCard) return;

  // 4. Find the right column: This grid has two direct children after the left card: 
  //    - flex-horizontal.flex-vertical.flex-gap-sm (top: two cards with images)
  //    - flex-horizontal.flex-vertical.flex-gap-sm (bottom: text-only list)
  // However, only one class name, so get all such containers after the leftCard
  const gridChildren = Array.from(grid.children);
  let leftCardIdx = gridChildren.indexOf(leftCard);
  if (leftCardIdx === -1) leftCardIdx = 0;
  // Expect two flex containers after the left card
  const rightTop = gridChildren[leftCardIdx+1];
  const rightBottom = gridChildren[leftCardIdx+2];

  // Defensive: If not both, fallback to only one (for variant HTML)
  let rightImageCards = [], rightTextCards = [];
  if (rightTop && rightTop.querySelectorAll) {
    rightImageCards = Array.from(rightTop.querySelectorAll('a.utility-link-content-block'));
  }
  if (rightBottom && rightBottom.querySelectorAll) {
    rightTextCards = Array.from(rightBottom.querySelectorAll('a.utility-link-content-block'));
  }

  // 5. Compose the left column content (the whole card)
  //    Use the entire leftCard element as the cell content
  const leftCell = leftCard;

  // 6. Compose the right column content
  //    Stack the rightImageCards, then the rightTextCards, separated by dividers (as per HTML)
  const rightCellContent = [];

  // Image cards (top two cards)
  rightImageCards.forEach((card, idx) => {
    rightCellContent.push(card);
    if (idx < rightImageCards.length - 1) {
      // Add divider between image cards if more than one
      const divider = document.createElement('div');
      divider.className = 'divider';
      rightCellContent.push(divider);
    }
  });
  // Text cards (bottom list)
  rightTextCards.forEach((card, idx) => {
    // Add a divider before each except the very first text card if at least one image card
    if (rightImageCards.length && idx === 0) {
      const divider = document.createElement('div');
      divider.className = 'divider';
      rightCellContent.push(divider);
    } else if (idx > 0) {
      const divider = document.createElement('div');
      divider.className = 'divider';
      rightCellContent.push(divider);
    }
    rightCellContent.push(card);
  });

  // 7. Table header must exactly match the variant: 'Columns (columns2)'
  const tableRows = [
    ['Columns (columns2)'],
    [leftCell, rightCellContent]
  ];

  // 8. Create and replace
  const table = WebImporter.DOMUtils.createTable(tableRows, document);
  element.replaceWith(table);
}
