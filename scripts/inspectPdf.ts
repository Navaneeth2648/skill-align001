import fs from 'fs';

const buf = fs.readFileSync('M_Navaneeth_Resume.pdf');
console.log('PDF Length:', buf.length);
console.log('Header:', buf.subarray(0, 300).toString('utf-8'));

// Check for font objects, text streams, or image XObjects
const str = buf.toString('latin1');
const hasImages = str.includes('/Image') || str.includes('/Subtype /Image') || str.includes('/XObject');
const hasText = str.includes('BT') && str.includes('ET');
const numPages = (str.match(/\/Type\s*\/Page\b/g) || []).length;
console.log('Num page objects:', numPages);
console.log('Has /Image XObjects:', hasImages);
console.log('Has BT/ET text operators:', hasText);

// Look for readable text snippets
const textMatches = str.match(/\(([^\)]{3,50})\)\s*Tj/g) || [];
console.log('Number of text matches with Tj:', textMatches.length);
if (textMatches.length > 0) {
  console.log('Sample text matches:', textMatches.slice(0, 10));
}
