import fs from 'fs';

const rawOcr = fs.readFileSync('scripts/ocr_output.txt', 'utf-8');

// Test name extraction:
const lines = rawOcr.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
console.log('Total non-empty lines:', lines.length);

// Look for name
let name: string | null = null;
const nameMatch = rawOcr.match(/M\s+NAVAN\s*E\s*ETH/i);
if (nameMatch) {
  name = 'M Navaneeth';
}
console.log('Detected Name:', name);

// Look for LinkedIn & GitHub
const linkedinMatch = rawOcr.match(/(?:https?:\/\/)?(?:www\.)?linkedin\.com\/in\/([a-zA-Z0-9_-]+)/i);
const githubMatch = rawOcr.match(/(?:https?:\/\/)?(?:www\.)?github\.com\/([a-zA-Z0-9_-]+)/i);
console.log('LinkedIn:', linkedinMatch ? linkedinMatch[0] : null);
console.log('GitHub:', githubMatch ? githubMatch[0] : null);

// Look for Phone
const phoneMatch = rawOcr.match(/(?:\+91[\s-]?)?[6789]\d{4}\s*\d{5}/);
console.log('Phone:', phoneMatch ? phoneMatch[0].replace(/\s+/g, ' ') : null);

// Look for Email
const emailMatch = rawOcr.match(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/);
console.log('Email:', emailMatch ? emailMatch[0] : null);

// Look for Location
let location: string | null = null;
const locMatch = rawOcr.match(/(?:Vijayawada|Pune|Mumbai|Nagpur|Nashik|Hyderabad|Bengaluru|Chennai|Delhi)[^,\n]*(?:,\s*[A-Za-z\s]+)*/i);
if (locMatch) {
  location = locMatch[0].trim();
}
console.log('Location:', location);

// Look for Education
const eduMatches = rawOcr.match(/B\.?Tech[^\n]*|SRM Institute[^\n]*/gi);
console.log('Education snippets:', eduMatches);

// Look for Projects
const projMatches = rawOcr.match(/SkillBridge[^\n]*|E-Commerce[^\n]*|Personal Portfolio[^\n]*/gi);
console.log('Projects snippets:', projMatches);

// Look for Achievements
const achMatches = rawOcr.match(/Finalist\s*-\s*Smart India Hackathon[^\n]*|Solved 500\+[^\n]*|Top 5%[^\n]*/gi);
console.log('Achievements snippets:', achMatches);
