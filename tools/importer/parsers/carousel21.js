/* global WebImporter */
export default function parse(element, { document }) {
  // Header row: only one cell with 'Carousel'
  const headerRow = ['Carousel'];

  // Slide row: two cells, first is image, second is text content
  let slideImage = null;
  let textCellContent = [];

  const cardBody = element.querySelector('.card-body');
  if (cardBody) {
    slideImage = cardBody.querySelector('img');
    const heading = cardBody.querySelector('.h4-heading');
    if (heading) {
      textCellContent.push(heading);
    }
  }

  // Fallbacks
  if (!slideImage) slideImage = element.querySelector('img');
  if (textCellContent.length === 0 && slideImage && slideImage.alt) {
    const altDiv = document.createElement('div');
    altDiv.textContent = slideImage.alt;
    textCellContent.push(altDiv);
  }

  // Only add a slide row if there is an image
  const rows = [headerRow];
  if (slideImage) {
    rows.push([slideImage, textCellContent.length ? textCellContent : '']);
  }

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
