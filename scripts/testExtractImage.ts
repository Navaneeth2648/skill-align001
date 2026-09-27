import fs from 'fs';
import { PDFParse } from 'pdf-parse';

async function testExtractImage() {
  const buf = fs.readFileSync('M_Navaneeth_Resume.pdf');
  console.log('Reading M_Navaneeth_Resume.pdf...');
  const parser = new PDFParse({ data: buf });
  try {
    const images = await parser.getImage({ imageBuffer: true });
    console.log('Images extracted object keys:', Object.keys(images));
    if (images.pages && images.pages.length > 0) {
      console.log('Num pages with images:', images.pages.length);
      for (let i = 0; i < images.pages.length; i++) {
        const page = images.pages[i];
        console.log(`Page ${i + 1} images count:`, page.images?.length || 0);
        if (page.images && page.images.length > 0) {
          const img0 = page.images[0];
          console.log(`Image 0: width=${img0.width}, height=${img0.height}, kind=${img0.kind}, data length=${img0.data?.length || 0}`);
        }
      }
    } else {
      console.log('No pages with images found directly.');
    }
  } catch (err) {
    console.error('parser.getImage error:', err);
  } finally {
    await parser.destroy();
  }
}

testExtractImage().catch(console.error);
