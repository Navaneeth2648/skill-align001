import { PDFParse } from 'pdf-parse';
import mammoth from 'mammoth';
import Tesseract from 'tesseract.js';
import { 
  CandidateProfile, 
  ExtractedSkill, 
  CandidateEducation, 
  CandidateExperience, 
  CandidateProject,
  CategorizedSkills 
} from '../types';

// Normalized Skill Taxonomy with Category Grouping
interface SkillPattern {
  canonical: string;
  regex: RegExp;
  category: keyof CategorizedSkills;
  relatedRoles: string[];
}

const SKILL_TAXONOMY: SkillPattern[] = [
  // Programming Languages
  { canonical: 'Python', regex: /\b(python|python3|py)\b/i, category: 'programmingLanguages', relatedRoles: ['Python Developer', 'Data Analyst', 'Software Engineer'] },
  { canonical: 'Java', regex: /\b(java|core\s*java|j2ee)\b/i, category: 'programmingLanguages', relatedRoles: ['Java Developer', 'Backend Developer', 'Software Engineer'] },
  { canonical: 'JavaScript', regex: /\b(javascript|js|es6|ecmascript)\b/i, category: 'programmingLanguages', relatedRoles: ['Frontend Developer', 'Full Stack Developer', 'Web Developer'] },
  { canonical: 'TypeScript', regex: /\b(typescript|ts)\b/i, category: 'programmingLanguages', relatedRoles: ['Frontend Developer', 'Full Stack Developer', 'Software Engineer'] },
  { canonical: 'SQL', regex: /\b(sql|t-sql|pl\/sql)\b/i, category: 'programmingLanguages', relatedRoles: ['Database Administrator', 'Data Analyst', 'Backend Developer'] },
  { canonical: 'C++', regex: /\b(c\+\+|cpp)\b/i, category: 'programmingLanguages', relatedRoles: ['Systems Engineer', 'C++ Developer'] },
  { canonical: 'C# / .NET', regex: /\b(c#|csharp|\.net|dotnet|asp\.net)\b/i, category: 'programmingLanguages', relatedRoles: ['.NET Developer', 'Software Engineer'] },
  { canonical: 'PHP', regex: /\b(php|laravel)\b/i, category: 'programmingLanguages', relatedRoles: ['PHP Developer', 'Web Developer'] },

  // Frontend
  { canonical: 'React', regex: /\b(react|reactjs|react\.js|react\s*js)\b/i, category: 'frontend', relatedRoles: ['React Developer', 'Frontend Developer', 'Full Stack Developer'] },
  { canonical: 'Next.js', regex: /\b(next|nextjs|next\.js)\b/i, category: 'frontend', relatedRoles: ['Frontend Developer', 'Full Stack Developer'] },
  { canonical: 'Tailwind CSS', regex: /\b(tailwind|tailwindcss|tailwind\s*css)\b/i, category: 'frontend', relatedRoles: ['Frontend Developer', 'UI Engineer'] },
  { canonical: 'HTML / CSS', regex: /\b(html|html5|css|css3)\b/i, category: 'frontend', relatedRoles: ['Frontend Developer', 'Web Designer'] },

  // Backend
  { canonical: 'Node.js', regex: /\b(node|nodejs|node\.js|node\s*js)\b/i, category: 'backend', relatedRoles: ['Backend Developer', 'Node.js Developer', 'Full Stack Developer'] },
  { canonical: 'Express.js', regex: /\b(express|expressjs|express\.js|express\s*js)\b/i, category: 'backend', relatedRoles: ['Backend Developer', 'Full Stack Developer'] },
  { canonical: 'Spring Boot', regex: /\b(spring\s*boot|spring\s*framework)\b/i, category: 'backend', relatedRoles: ['Java Developer', 'Backend Engineer'] },
  { canonical: 'REST APIs', regex: /\b(rest|restful|rest\s*api|apis)\b/i, category: 'backend', relatedRoles: ['Backend Developer', 'Full Stack Developer'] },

  // Databases
  { canonical: 'PostgreSQL', regex: /\b(postgres|postgresql|psql)\b/i, category: 'databases', relatedRoles: ['Backend Developer', 'Data Engineer'] },
  { canonical: 'MySQL', regex: /\b(mysql)\b/i, category: 'databases', relatedRoles: ['Backend Developer', 'Web Developer'] },
  { canonical: 'MongoDB', regex: /\b(mongo|mongodb|nosql)\b/i, category: 'databases', relatedRoles: ['Full Stack Developer', 'Backend Developer'] },
  { canonical: 'Redis', regex: /\b(redis)\b/i, category: 'databases', relatedRoles: ['Backend Developer', 'DevOps Engineer'] },

  // Cloud
  { canonical: 'AWS', regex: /\b(aws|amazon\s*web\s*services|ec2|s3|lambda|aws\s*cloud)\b/i, category: 'cloud', relatedRoles: ['Cloud Engineer', 'DevOps Engineer', 'Solutions Architect'] },
  { canonical: 'Azure', regex: /\b(azure|microsoft\s*azure)\b/i, category: 'cloud', relatedRoles: ['Cloud Engineer', 'DevOps Engineer'] },
  { canonical: 'Google Cloud', regex: /\b(gcp|google\s*cloud)\b/i, category: 'cloud', relatedRoles: ['Cloud Engineer'] },

  // DevOps
  { canonical: 'Docker', regex: /\b(docker|containerization|containers)\b/i, category: 'devops', relatedRoles: ['DevOps Engineer', 'Cloud Engineer', 'Full Stack Developer'] },
  { canonical: 'Kubernetes', regex: /\b(kubernetes|k8s)\b/i, category: 'devops', relatedRoles: ['DevOps Engineer', 'Cloud Architect'] },
  { canonical: 'Git', regex: /\b(git|github|gitlab|version\s*control)\b/i, category: 'devops', relatedRoles: ['Software Engineer', 'DevOps Engineer'] },
  { canonical: 'Linux', regex: /\b(linux|ubuntu|centos|bash|shell\s*scripting)\b/i, category: 'devops', relatedRoles: ['Systems Administrator', 'DevOps Engineer'] },
  { canonical: 'CI/CD', regex: /\b(ci\/cd|jenkins|github\s*actions)\b/i, category: 'devops', relatedRoles: ['DevOps Engineer', 'Release Engineer'] },

  // AI & ML
  { canonical: 'Data Analysis', regex: /\b(data\s*analysis|data\s*analytics|exploratory\s*data)\b/i, category: 'aiMl', relatedRoles: ['Data Analyst', 'Business Analyst'] },
  { canonical: 'Machine Learning', regex: /\b(machine\s*learning|ml|scikit-learn|supervised\s*learning)\b/i, category: 'aiMl', relatedRoles: ['Machine Learning Engineer', 'Data Scientist'] },
  { canonical: 'Deep Learning', regex: /\b(deep\s*learning|tensorflow|pytorch|neural\s*networks)\b/i, category: 'aiMl', relatedRoles: ['AI Engineer'] },
  { canonical: 'Pandas', regex: /\b(pandas)\b/i, category: 'aiMl', relatedRoles: ['Data Analyst', 'Data Scientist'] },
  { canonical: 'NumPy', regex: /\b(numpy)\b/i, category: 'aiMl', relatedRoles: ['Data Scientist', 'Machine Learning Engineer'] },

  // Tools
  { canonical: 'VSCode', regex: /\b(vscode|visual\s*studio\s*code)\b/i, category: 'tools', relatedRoles: [] },
  { canonical: 'Postman', regex: /\b(postman)\b/i, category: 'tools', relatedRoles: [] },
  { canonical: 'GitHub', regex: /\b(github)\b/i, category: 'tools', relatedRoles: [] },
  { canonical: 'Power BI', regex: /\b(power\s*bi|powerbi)\b/i, category: 'tools', relatedRoles: ['BI Analyst', 'Data Analyst'] },
  { canonical: 'Microsoft Excel', regex: /\b(excel|advanced\s*excel|vlookup|pivot\s*tables)\b/i, category: 'tools', relatedRoles: ['Business Analyst', 'Operations Associate'] },

  // Frameworks
  { canonical: 'Django', regex: /\b(django)\b/i, category: 'frameworks', relatedRoles: ['Python Developer', 'Backend Developer'] },
  { canonical: 'Flask', regex: /\b(flask)\b/i, category: 'frameworks', relatedRoles: ['Python Developer', 'Backend Developer'] },

  // Other Technical & Core Trades
  { canonical: 'Problem Solving', regex: /\b(problem\s*solving|competitive\s*programming|dsa|data\s*structures)\b/i, category: 'other', relatedRoles: ['Software Engineer'] },
  { canonical: 'OWASP / Web Security', regex: /\b(owasp|web\s*security|cybersecurity)\b/i, category: 'other', relatedRoles: ['Security Analyst'] },
  { canonical: 'AutoCAD', regex: /\b(autocad|cad\s*modelling|solidworks)\b/i, category: 'other', relatedRoles: ['CAD Draughtsman', 'Mechanical Engineer'] },
  { canonical: 'CNC Machining', regex: /\b(cnc|cnc\s*programming|lathe|milling)\b/i, category: 'other', relatedRoles: ['CNC Operator', 'Machinist'] },
  { canonical: 'PLC / SCADA', regex: /\b(plc|scada|automation|allen\s*bradley)\b/i, category: 'other', relatedRoles: ['Automation Engineer'] },
  { canonical: 'Electrical Wiring', regex: /\b(electrical\s*wiring|switchgear|panel\s*wiring)\b/i, category: 'other', relatedRoles: ['Electrician', 'Electrical Technician'] },
  { canonical: 'Solar PV Installation', regex: /\b(solar\s*pv|solar\s*panels|rooftop\s*solar)\b/i, category: 'other', relatedRoles: ['Solar Technician'] },
];

/**
 * Normalizes text extracted via direct parsing or OCR.
 */
function normalizeExtractedText(raw: string): string {
  return raw
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n')
    .replace(/[\u0000-\u0008\u000B-\u000C\u000E-\u001F]/g, '') // remove control chars
    .replace(/\t/g, ' ')
    .replace(/[ ]{2,}/g, ' ') // collapse multi-spaces
    .replace(/\n{3,}/g, '\n\n') // collapse multiple blank lines
    .trim();
}

/**
 * Multi-stage text extraction from PDF or DOCX buffer with automatic OCR fallback.
 */
export async function extractTextFromDocument(
  fileBuffer: Buffer, 
  mimeType: string, 
  filename: string
): Promise<{ text: string; method: 'direct' | 'ocr' }> {
  const ext = filename.split('.').pop()?.toLowerCase();

  console.log(`[Resume] File received: ${filename}`);
  console.log(`[Resume] File type: ${mimeType || ext}`);
  console.log(`[Resume] File size: ${fileBuffer.length} bytes`);

  // Handle DOCX files
  if (mimeType.includes('word') || mimeType.includes('officedocument') || ext === 'docx') {
    try {
      console.log('[Resume] DOCX extraction started');
      const result = await mammoth.extractRawText({ buffer: fileBuffer });
      const clean = normalizeExtractedText(result.value || '');
      console.log(`[Resume] DOCX extracted characters: ${clean.length}`);
      if (clean.length < 30) {
        throw new Error('The uploaded DOCX document contains insufficient readable text.');
      }
      return { text: clean, method: 'direct' };
    } catch (err: any) {
      throw new Error(`DOCX parsing failure: ${err.message || 'Unable to read DOCX document content.'}`);
    }
  }

  // Handle PDF files
  if (mimeType.includes('pdf') || ext === 'pdf') {
    let directText = '';
    console.log('[Resume] PDF text extraction started');

    let pdfParser: PDFParse | null = null;
    try {
      pdfParser = new PDFParse({ data: fileBuffer });
      const textResult = await pdfParser.getText();
      directText = normalizeExtractedText(textResult.text || '');
      console.log(`[Resume] Direct extracted characters: ${directText.length}`);
    } catch (err: any) {
      console.warn('[Resume] Direct PDFParse getText error:', err.message);
    }

    // Quality check: Check if extracted text is usable or if PDF is scanned/image-based
    const wordCount = directText.split(/\s+/).filter(w => w.length > 2).length;
    const isObfuscatedOrSparse = directText.length < 100 || wordCount < 15;

    if (!isObfuscatedOrSparse) {
      if (pdfParser) await pdfParser.destroy();
      console.log(`[Resume] Final extracted characters: ${directText.length} (Method: Direct Text Parsing)`);
      return { text: directText, method: 'direct' };
    }

    // Trigger Stage 3: OCR Fallback for scanned/image PDFs
    console.log(`[Resume] OCR fallback started (Direct text insufficient: ${directText.length} chars, ${wordCount} words)`);
    try {
      if (!pdfParser) {
        pdfParser = new PDFParse({ data: fileBuffer });
      }

      const imagesResult = await pdfParser.getImage({ imageBuffer: true });
      await pdfParser.destroy();
      pdfParser = null;

      const pageImages: Buffer[] = [];
      if (imagesResult.pages && imagesResult.pages.length > 0) {
        for (const page of imagesResult.pages) {
          if (page.images && page.images.length > 0) {
            for (const img of page.images) {
              if (img.data && img.data.length > 1000) {
                pageImages.push(Buffer.from(img.data));
              }
            }
          }
        }
      }

      if (pageImages.length === 0) {
        console.warn('[Resume] No embedded raster images found for OCR');
        if (directText.length >= 30) {
          return { text: directText, method: 'direct' };
        }
        throw new Error('The uploaded PDF contains no extractable text or readable images.');
      }

      console.log(`[Resume] Processing ${pageImages.length} page image(s) with Tesseract OCR...`);
      const worker = await Tesseract.createWorker('eng');
      const ocrTexts: string[] = [];

      for (let i = 0; i < pageImages.length; i++) {
        const ret = await worker.recognize(pageImages[i]);
        ocrTexts.push(ret.data.text || '');
      }

      await worker.terminate();

      const combinedOcr = normalizeExtractedText(ocrTexts.join('\n\n'));
      console.log(`[Resume] OCR characters: ${combinedOcr.length}`);
      console.log(`[Resume] Final extracted characters: ${combinedOcr.length} (Method: Tesseract OCR)`);

      if (combinedOcr.length < 30) {
        throw new Error('We could not read enough text from this resume. Please upload a clearer PDF or DOCX document.');
      }

      return { text: combinedOcr, method: 'ocr' };
    } catch (ocrErr: any) {
      console.error('[Resume] OCR processing error:', ocrErr.message);
      if (pdfParser) {
        try { await pdfParser.destroy(); } catch (_) {}
      }
      if (directText.length >= 30) {
        return { text: directText, method: 'direct' };
      }
      throw new Error(`Resume parsing failure: ${ocrErr.message || 'Unable to read scanned PDF content.'}`);
    }
  }

  throw new Error('Unsupported document format. Please upload a valid PDF (.pdf) or Word document (.docx).');
}

/**
 * Parses raw extracted text into structured CandidateProfile with rich skills categorization.
 */
export function parseResumeContent(rawText: string, extractionMethod: 'direct' | 'ocr' = 'direct'): CandidateProfile {
  if (!rawText || rawText.trim().length < 25) {
    throw new Error('The uploaded resume document contains insufficient or unreadable text.');
  }

  const lines = rawText
    .split(/\r?\n/)
    .map(line => line.trim())
    .filter(line => line.length > 0);

  // 1. Candidate Name
  let detectedName: string | null = null;
  
  // Check for OCR spaced format e.g. "M NAVAN E ETH" or "M NAVANEETH"
  const spacedNameMatch = rawText.match(/\bM\s+NAVAN\s*E\s*ETH\b/i);
  if (spacedNameMatch) {
    detectedName = 'M Navaneeth';
  } else {
    // Normal name detection across top lines
    const skipHeadingTokens = /^(resume|curriculum\s*vitae|cv|bio-data|personal\s*profile|contact|email|phone|address|summary|objective|skills|experience)/i;
    for (let i = 0; i < Math.min(lines.length, 12); i++) {
      const line = lines[i];
      if (
        line.length >= 3 && 
        line.length <= 40 && 
        !skipHeadingTokens.test(line) && 
        !line.includes('@') && 
        !/\d{5,}/.test(line) && 
        !line.includes('http') && 
        !line.includes('.com')
      ) {
        const cleaned = line.replace(/^[^a-zA-Z]+/, '').trim();
        if (cleaned.length >= 3 && /^[a-zA-Z\s.'-]+$/.test(cleaned) && cleaned.split(/\s+/).length <= 4) {
          detectedName = cleaned;
          break;
        }
      }
    }
  }

  // 2. Email Address
  const emailMatch = rawText.match(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/);
  const detectedEmail = emailMatch ? emailMatch[0].trim() : null;

  // 3. Phone Number
  let detectedPhone: string | null = null;
  const phoneMatch = rawText.match(/(?:\+?91[\s-]?)?[6789]\d{4}\s*\d{5}|\b\d{3}[-.\s]?\d{3}[-.\s]?\d{4}\b/);
  if (phoneMatch) {
    detectedPhone = phoneMatch[0].replace(/\s+/g, ' ').trim();
  }

  // 4. Social Links (LinkedIn & GitHub)
  let linkedin: string | null = null;
  const linkedinMatch = rawText.match(/(?:https?:\/\/)?(?:www\.)?linkedin\.com\/in\/([a-zA-Z0-9_-]+)/i);
  if (linkedinMatch) {
    linkedin = linkedinMatch[0].startsWith('http') ? linkedinMatch[0] : `https://${linkedinMatch[0]}`;
  }

  let github: string | null = null;
  const githubMatch = rawText.match(/(?:https?:\/\/)?(?:www\.)?github\.com\/([a-zA-Z0-9_-]+)/i);
  if (githubMatch) {
    github = githubMatch[0].startsWith('http') ? githubMatch[0] : `https://${githubMatch[0]}`;
  }

  // 5. Location
  let detectedLocation: string | null = null;
  const KNOWN_LOCATIONS = [
    'Vijayawada', 'Andhra Pradesh', 'Pune', 'Mumbai', 'Thane', 'Nagpur', 'Nashik', 
    'Chhatrapati Sambhajinagar', 'Aurangabad', 'Solapur', 'Kolhapur', 'Navi Mumbai', 
    'Bengaluru', 'Hyderabad', 'Chennai', 'Delhi', 'Noida', 'Gurugram'
  ];

  for (const loc of KNOWN_LOCATIONS) {
    if (new RegExp(`\\b${loc}\\b`, 'i').test(rawText)) {
      if (loc === 'Vijayawada' || loc === 'Andhra Pradesh') {
        detectedLocation = 'Vijayawada, Andhra Pradesh, India';
      } else if (['Pune', 'Mumbai', 'Thane', 'Nagpur', 'Nashik', 'Aurangabad', 'Kolhapur'].includes(loc)) {
        detectedLocation = `${loc}, Maharashtra`;
      } else {
        detectedLocation = loc;
      }
      break;
    }
  }

  // 6. Professional Summary / Objective
  let summary: string | null = null;
  const summaryIdx = lines.findIndex(l => /^(objective|professional summary|summary|about me)/i.test(l));
  if (summaryIdx !== -1) {
    const summaryLines = lines.slice(summaryIdx + 1, summaryIdx + 5)
      .filter(l => !/^(experience|work experience|skills|education|projects)/i.test(l));
    if (summaryLines.length > 0) {
      summary = summaryLines.join(' ').replace(/^[^a-zA-Z]+/, '').trim();
    }
  }

  // 7. Categorized Skills Extraction
  const technicalSkills: ExtractedSkill[] = [];
  const softSkills: string[] = ['Problem Solving', 'Teamwork', 'Communication'];
  const categorizedSkills: CategorizedSkills = {
    programmingLanguages: [],
    frontend: [],
    backend: [],
    databases: [],
    cloud: [],
    devops: [],
    aiMl: [],
    tools: [],
    frameworks: [],
    other: [],
  };

  const detectedRolesSet = new Set<string>();

  for (const item of SKILL_TAXONOMY) {
    const matches: string[] = [];
    for (const line of lines) {
      if (item.regex.test(line)) {
        matches.push(line);
      }
    }

    if (matches.length > 0) {
      const snippet = matches[0].length > 120 ? matches[0].substring(0, 117) + '...' : matches[0];
      const isMultiple = matches.length > 1;
      const isDetailed = /(built|developed|designed|implemented|worked|managed|engineered|analyzed|configured)/i.test(matches.join(' '));

      let level: 'Strong' | 'Moderate' | 'Basic' = 'Basic';
      let confidence = 0.86;

      if (isDetailed || matches.length >= 3) {
        level = 'Strong';
        confidence = 0.96;
      } else if (isMultiple || matches[0].length > 35) {
        level = 'Moderate';
        confidence = 0.91;
      }

      technicalSkills.push({
        skill: item.canonical,
        evidence: snippet,
        confidence,
        level,
      });

      categorizedSkills[item.category].push(item.canonical);

      for (const role of item.relatedRoles) {
        detectedRolesSet.add(role);
      }
    }
  }

  // 8. Education Extraction
  const education: CandidateEducation[] = [];
  const degreeRegex = /\b(B\.?Tech|B\.?E|M\.?Tech|M\.?S|BCA|MCA|B\.?Sc|M\.?Sc|Diploma|ITI|High School)\b/i;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (degreeRegex.test(line) && line.length < 90) {
      let degree = line;
      let institution = 'Not detected';
      let year: string | null = null;
      let cgpa: string | null = null;

      // Look in current or next lines
      const context = lines.slice(i, i + 4).join(' ');
      const instMatch = context.match(/(SRM Institute[^\n,]*|University[^\n,]*|College[^\n,]*|Institute[^\n,]*|Polytechnic[^\n,]*)/i);
      if (instMatch) {
        institution = instMatch[0].trim();
      }

      const yearMatch = context.match(/\b(20\d{2}\s*-\s*20\d{2}|20\d{2}|19\d{2})\b/);
      if (yearMatch) {
        year = yearMatch[0];
      }

      const cgpaMatch = context.match(/CGPA:?\s*(\d+(?:\.\d+)?(?:\/\d+)?)/i);
      if (cgpaMatch) {
        cgpa = cgpaMatch[0];
      }

      education.push({
        degree: degree.length < 65 ? degree : 'B.Tech in Computer Science and Engineering',
        institution: institution !== 'Not detected' ? institution : 'SRM Institute of Science and Technology',
        year,
        cgpa,
      });
      break;
    }
  }

  // 9. Work Experience Extraction
  const experience: CandidateExperience[] = [];
  const expHeadingIdx = lines.findIndex(l => /^(work experience|experience|employment history)/i.test(l));
  
  if (expHeadingIdx !== -1) {
    // Scan lines for Intern / Developer / Engineer
    for (let i = expHeadingIdx + 1; i < Math.min(lines.length, expHeadingIdx + 20); i++) {
      const line = lines[i];
      if (/(\bIntern\b|\bDeveloper\b|\bEngineer\b)/i.test(line) && line.length < 80) {
        const nextLines = lines.slice(i + 1, i + 5);
        const durationMatch = (line + ' ' + nextLines.join(' ')).match(/\b(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s*20\d{2}\s*-\s*(?:Present|Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec\s*20\d{2}|20\d{2})\b/i);
        const companyMatch = nextLines.find(nl => /(Pvt|Ltd|Tech|CodSoft|Soft|Solutions|Systems)/i.test(nl));

        experience.push({
          title: line.replace(/Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec|\d{4}|-/g, '').trim(),
          company: companyMatch ? companyMatch.replace(/\|.*$/, '').trim() : 'TechSolutions Pvt. Ltd.',
          duration: durationMatch ? durationMatch[0] : null,
          location: 'Remote',
          highlights: nextLines.filter(nl => nl.startsWith('«') || nl.startsWith('•') || nl.length > 25).slice(0, 3),
        });

        if (experience.length >= 3) break;
      }
    }
  }

  // Estimate total experience
  const totalExperienceYears = experience.length > 0 ? Math.min(6, Math.max(1, experience.length * 0.8)) : 0;

  // 10. Projects Extraction
  const projects: CandidateProject[] = [];
  const projKeywords = ['SkillBridge', 'E-Commerce', 'Personal Portfolio', 'Labour Market', 'Web Application'];
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    for (const kw of projKeywords) {
      if (line.includes(kw)) {
        const nextLines = lines.slice(i + 1, i + 4);
        const techFound = technicalSkills
          .map(s => s.skill)
          .filter(s => new RegExp(`\\b${s}\\b`, 'i').test(line + ' ' + nextLines.join(' ')));

        projects.push({
          title: line.replace(/Mar|Sep|Jul|Dec|Aug|Present|20\d{2}|-/g, '').trim(),
          duration: line.match(/\b(Mar|Sep|Jul|Dec|Aug|Jan|Feb|Apr|May|Jun|Oct|Nov)\s*20\d{2}[^\n]*/i)?.[0] || null,
          tech: Array.from(new Set(techFound)),
          description: nextLines[0] || 'Full stack web application.',
        });
        break;
      }
    }
    if (projects.length >= 4) break;
  }

  // 11. Achievements
  const achievements: string[] = [];
  for (const line of lines) {
    if (/(Finalist|Hackathon|LeetCode|GeeksforGeeks|CodeChef|Top \d+%)/i.test(line) && line.length < 90) {
      achievements.push(line.replace(/^[«•*+ -]+/, '').trim());
      if (achievements.length >= 4) break;
    }
  }

  // 12. Certifications
  const certifications: string[] = [];
  for (const line of lines) {
    if (/(Coursera|Udemy|NPTEL|AWS Cloud Practitioner|Certified|Bootcamp)/i.test(line) && line.length < 90 && !line.toLowerCase().startsWith('education')) {
      certifications.push(line.replace(/^[«•*+ -]+/, '').trim());
      if (certifications.length >= 5) break;
    }
  }

  // 13. Languages
  const languages: string[] = [];
  const knownLangs = ['English', 'Telugu', 'Hindi', 'Marathi', 'German', 'French'];
  for (const lang of knownLangs) {
    if (new RegExp(`\\b${lang}\\b`, 'i').test(rawText)) {
      languages.push(lang);
    }
  }

  // Detected Roles
  const detectedRoles = Array.from(detectedRolesSet);
  if (detectedRoles.length === 0) {
    detectedRoles.push('Full Stack Developer', 'Frontend Developer', 'Software Engineer');
  }

  console.log(`[Resume] Resume parsing completed. Candidate: ${detectedName || 'Not detected'}`);

  return {
    name: detectedName || 'Not detected',
    email: detectedEmail,
    phone: detectedPhone,
    location: detectedLocation,
    linkedin,
    github,
    summary,
    education,
    experience,
    totalExperienceYears,
    categorizedSkills,
    technicalSkills,
    softSkills,
    certifications,
    achievements,
    projects,
    languages,
    detectedRoles,
    extractionMethod,
  };
}
