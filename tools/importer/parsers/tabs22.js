/* global WebImporter */
export default function parse(element, { document }) {
  // Find tab menu and content containers
  let tabMenu = null, tabContent = null;
  for (const child of element.children) {
    if (child.classList.contains('w-tab-menu')) tabMenu = child;
    if (child.classList.contains('w-tab-content')) tabContent = child;
  }
  if (!tabMenu || !tabContent) return;

  // Gather all tab links (by role="tab")
  const tabLinks = Array.from(tabMenu.children).filter(l => l.getAttribute('role') === 'tab');
  // Gather all tab panes (by role="tabpanel")
  const tabPanes = Array.from(tabContent.children).filter(p => p.getAttribute('role') === 'tabpanel');

  // Build table data: header is a single-cell row, subsequent rows are two columns
  const tableData = [];
  tableData.push(['Tabs']); // header row should be one column only
  for (let i = 0; i < tabLinks.length; i++) {
    const link = tabLinks[i];
    let label = '';
    const labelDiv = link.querySelector('div');
    if (labelDiv && labelDiv.textContent) {
      label = labelDiv.textContent.trim();
    } else {
      label = link.textContent.trim();
    }
    // Find correct pane by data-w-tab value
    let pane = null;
    const dataWTab = link.getAttribute('data-w-tab');
    if (dataWTab) {
      pane = tabPanes.find(p => p.getAttribute('data-w-tab') === dataWTab);
    }
    if (!pane) pane = tabPanes[i];
    // Use the entire main grid div within the tab pane as content if present
    let contentElem = (pane && pane.children.length === 1) ? pane.children[0] : pane;
    tableData.push([label, contentElem]);
  }

  const block = WebImporter.DOMUtils.createTable(tableData, document);
  element.replaceWith(block);
}
