/* global WebImporter */
export default function parse(element, { document }) {
  // Step 1: Build the header row, exactly as in the example
  const headerRow = ['Carousel (carousel20)'];

  // Step 2: Find the slide content (always one slide for this input)
  // The image is inside: .card-body > img
  // The text is: .card-body > .h4-heading (if present)
  let img = null;
  let heading = null;
  
  // .card-body could be nested, so search for it
  const cardBody = element.querySelector('.card-body');
  if (cardBody) {
    img = cardBody.querySelector('img');
    heading = cardBody.querySelector('.h4-heading, h1, h2, h3, h4, h5, h6');
  }

  // Prepare the image cell (mandatory)
  const imageCell = img ? img : '';
  
  // Prepare the text cell (optional)
  let textCell = '';
  if (heading && heading.textContent.trim().length > 0) {
    // Use the existing heading element (do not clone)
    textCell = heading;
  }
  
  // Step 3: Build the table rows
  const rows = [headerRow, [imageCell, textCell]];
  
  // Step 4: Create the table block
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Step 5: Replace the original element with the new block table
  element.replaceWith(table);
}
