/* global WebImporter */
export default function parse(element, { document }) {
  // Find tab menu for labels
  const tabMenu = Array.from(element.children).find(child => child.classList.contains('w-tab-menu'));
  const tabLinks = tabMenu ? Array.from(tabMenu.children).filter(el => el.matches('a.w-tab-link')) : [];
  const tabLabels = tabLinks.map(link => {
    const labelDiv = link.querySelector('div');
    return labelDiv ? labelDiv.textContent.trim() : link.textContent.trim();
  });

  // Find tab content container
  const tabContentContainer = Array.from(element.children).find(child => child.classList.contains('w-tab-content'));
  const tabPanes = tabContentContainer ? Array.from(tabContentContainer.children).filter(el => el.classList.contains('w-tab-pane')) : [];

  // Prepare rows: header should be a single cell containing only 'Tabs'
  const rows = [['Tabs']];
  // Each tab row: [label, content]
  for (let i = 0; i < Math.max(tabLabels.length, tabPanes.length); i++) {
    const label = tabLabels[i] || '';
    let contentCell = '';
    if (tabPanes[i]) {
      // Use all direct children of the pane as the content for maximum robustness
      const children = Array.from(tabPanes[i].children);
      if (children.length === 1) {
        contentCell = children[0];
      } else if (children.length > 1) {
        contentCell = children;
      } else {
        contentCell = tabPanes[i];
      }
    }
    rows.push([label, contentCell]);
  }

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
