/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: for first row 2 columns, second row 3 columns — for 5 items, as in example
  function customChunk(arr) {
    if (arr.length === 5) return [arr.slice(0, 2), arr.slice(2, 5)];
    if (arr.length === 4) return [arr.slice(0, 2), arr.slice(2, 4)];
    if (arr.length === 6) return [arr.slice(0, 3), arr.slice(3, 6)];
    if (arr.length === 3) return [arr.slice(0, 3)];
    if (arr.length === 2) return [arr.slice(0, 2)];
    // fallback: chunk into max 3 per row
    const result = [];
    for (let i = 0; i < arr.length; i += 3) {
      result.push(arr.slice(i, i + 3));
    }
    return result;
  }

  const tabPanes = Array.from(element.querySelectorAll(':scope > .w-tab-pane'));
  tabPanes.forEach(tabPane => {
    const grid = tabPane.querySelector('.w-layout-grid');
    if (!grid) return;
    const columns = Array.from(grid.children);
    if (!columns.length) return;

    const columnChunks = customChunk(columns);
    const cells = [];
    cells.push(['Columns (columns22)']);
    columnChunks.forEach(chunk => {
      cells.push(chunk);
    });
    const table = WebImporter.DOMUtils.createTable(cells, document);
    grid.replaceWith(table);
  });

  // Replace the original element with new content
  const newContent = document.createElement('div');
  tabPanes.forEach(tp => newContent.appendChild(tp));
  element.replaceWith(newContent);
}
