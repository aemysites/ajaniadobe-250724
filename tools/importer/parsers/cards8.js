/* global WebImporter */
export default function parse(element, { document }) {
  // Header as per block name
  const headerRow = ['Cards (cards8)'];
  // All direct card containers
  const cardDivs = Array.from(element.querySelectorAll(':scope > div'));
  
  // Map each to [image, empty cell]
  const rows = cardDivs.map(div => {
    const img = div.querySelector('img');
    // Defensive: if no img, leave cell empty
    return [img || '', ''];
  });

  // Compose table data
  const tableRows = [headerRow, ...rows];
  const block = WebImporter.DOMUtils.createTable(tableRows, document);
  element.replaceWith(block);
}
