import fs from 'fs';
import { PDFParse } from 'pdf-parse';
import Tesseract from 'tesseract.js';

async function saveOcrText() {
  const buf = fs.readFileSync('M_Navaneeth_Resume.pdf');
  const parser = new PDFParse({ data: buf });
  const images = await parser.getImage({ imageBuffer: true });
  await parser.destroy();

  const img = images.pages[0].images[0];
  const pngBuffer = Buffer.from(img.data);

  const worker = await Tesseract.createWorker('eng');
  const ret = await worker.recognize(pngBuffer);
  await worker.terminate();

  fs.writeFileSync('scripts/ocr_output.txt', ret.data.text, 'utf-8');
  console.log('Saved OCR output to scripts/ocr_output.txt! Length:', ret.data.text.length);
}

saveOcrText().catch(console.error);
