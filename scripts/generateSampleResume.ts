import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';

const doc = new PDFDocument({ margin: 50 });
const outputPath = path.resolve(process.cwd(), 'sample_resume_rahul_sharma.pdf');
const stream = fs.createWriteStream(outputPath);

doc.pipe(stream);

// Header
doc.fontSize(22).font('Helvetica-Bold').text('Rahul Sharma', { align: 'left' });
doc.fontSize(10).font('Helvetica').fillColor('#555555')
   .text('Pune, Maharashtra | rahul.sharma@example.com | +91 9876543210', { align: 'left' });
doc.moveDown(1);

// Professional Summary
doc.fontSize(13).font('Helvetica-Bold').fillColor('#102c49').text('PROFESSIONAL SUMMARY');
doc.rect(50, doc.y, 512, 1).fill('#102c49');
doc.moveDown(0.5);
doc.fontSize(10).font('Helvetica').fillColor('#222222')
   .text('Results-driven Software Developer with 3 years of experience building modern web applications, scalable backend REST APIs, and automated data pipelines using Python, SQL, and React. Passionate about cloud technologies and continuous integration.', { lineGap: 3 });
doc.moveDown(1);

// Technical Skills
doc.fontSize(13).font('Helvetica-Bold').fillColor('#102c49').text('TECHNICAL SKILLS');
doc.rect(50, doc.y, 512, 1).fill('#102c49');
doc.moveDown(0.5);
doc.fontSize(10).font('Helvetica-Bold').fillColor('#222222').text('Languages & Web: ', { continued: true })
   .font('Helvetica').text('Python, JavaScript, TypeScript, React, HTML / CSS, Node.js, REST APIs');
doc.fontSize(10).font('Helvetica-Bold').text('Databases: ', { continued: true })
   .font('Helvetica').text('SQL, PostgreSQL, MySQL');
doc.fontSize(10).font('Helvetica-Bold').text('DevOps & Tools: ', { continued: true })
   .font('Helvetica').text('Git, Linux, Docker, CI/CD pipelines');
doc.fontSize(10).font('Helvetica-Bold').text('Core Competencies: ', { continued: true })
   .font('Helvetica').text('Data Analysis, Problem Solving, Agile & Scrum, Teamwork');
doc.moveDown(1);

// Work Experience
doc.fontSize(13).font('Helvetica-Bold').fillColor('#102c49').text('WORK EXPERIENCE');
doc.rect(50, doc.y, 512, 1).fill('#102c49');
doc.moveDown(0.5);

doc.fontSize(11).font('Helvetica-Bold').fillColor('#222222').text('Software Developer', { continued: true })
   .font('Helvetica').text(' — Sahyadri Infotech Systems, Pune (Jan 2023 - Present)');
doc.fontSize(9.5).fillColor('#444444')
   .text('• Developed full-stack web applications and microservices using Python and React.', { indent: 10 })
   .text('• Designed complex SQL queries and optimized PostgreSQL database indices.', { indent: 10 })
   .text('• Integrated Git version control and containerized services using Docker.', { indent: 10 });
doc.moveDown(0.8);

doc.fontSize(11).font('Helvetica-Bold').fillColor('#222222').text('Junior Developer Intern', { continued: true })
   .font('Helvetica').text(' — Deccan Software Labs, Pune (Jun 2022 - Dec 2022)');
doc.fontSize(9.5).fillColor('#444444')
   .text('• Built interactive user interfaces with JavaScript, React, and CSS.', { indent: 10 })
   .text('• Collaborated in cross-functional agile sprints and daily stand-ups.', { indent: 10 });
doc.moveDown(1);

// Education
doc.fontSize(13).font('Helvetica-Bold').fillColor('#102c49').text('EDUCATION');
doc.rect(50, doc.y, 512, 1).fill('#102c49');
doc.moveDown(0.5);
doc.fontSize(10).font('Helvetica-Bold').fillColor('#222222').text('Bachelor of Engineering (B.E.) in Computer Engineering (2022)');
doc.fontSize(9.5).font('Helvetica').fillColor('#555555').text('Savitribai Phule Pune University / Pune Institute of Computer Technology');
doc.moveDown(1);

// Key Projects
doc.fontSize(13).font('Helvetica-Bold').fillColor('#102c49').text('KEY PROJECTS');
doc.rect(50, doc.y, 512, 1).fill('#102c49');
doc.moveDown(0.5);
doc.fontSize(10).font('Helvetica-Bold').fillColor('#222222').text('Labour Market Data Aggregator');
doc.fontSize(9.5).font('Helvetica').fillColor('#444444')
   .text('Engineered automated ingestion pipeline using Python, SQL, and Docker to process job vacancy feeds.', { indent: 10 });

doc.end();

stream.on('finish', () => {
  console.log('Sample PDF resume created successfully at:', outputPath);
});
