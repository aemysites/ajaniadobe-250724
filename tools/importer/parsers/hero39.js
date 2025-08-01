/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Table header row
  const headerRow = ['Hero (hero39)'];

  // 2. Background image row: find first <img> in the element (background)
  let bgImg = null;
  const allImgs = element.querySelectorAll('img');
  if (allImgs.length > 0) {
    // Use the first image as the background
    bgImg = allImgs[0];
  }

  const bgImgRow = [bgImg ? bgImg : ''];

  // 3. Text/CTA row: h1, p, and CTA/link button, all together
  let headline = '';
  let paragraph = '';
  let ctaContainer = '';

  // Find headline (h1)
  const h1 = element.querySelector('h1');
  if (h1) headline = h1;

  // Find the paragraph(s) (usually inside .flex-vertical)
  // but be robust to variations
  let contentParagraphs = [];
  const ps = element.querySelectorAll('p');
  ps.forEach(p => contentParagraphs.push(p));

  // Find CTA (look for .button-group or .button)
  let cta = null;
  let ctaGroup = element.querySelector('.button-group');
  if (ctaGroup) {
    cta = ctaGroup;
  } else {
    // fallback: any .button class anchor
    const btn = element.querySelector('a.button, .w-button');
    if (btn) cta = btn;
  }

  // Compose third row: [headline, all paragraphs, CTA] all together in one cell
  const rowContent = [];
  if (headline) rowContent.push(headline);
  if (contentParagraphs.length) rowContent.push(...contentParagraphs);
  if (cta) rowContent.push(cta);

  const textRow = [rowContent.length ? rowContent : ''];

  // Assemble table structure
  const cells = [headerRow, bgImgRow, textRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  // Replace the original element
  element.replaceWith(table);
}
