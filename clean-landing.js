const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'app', 'page.tsx');
const backupPath = path.join(__dirname, 'src', 'app', 'page.backup3.tsx');

console.log('🔍 Leyendo page.tsx...');
let content = fs.readFileSync(filePath, 'utf8');
fs.writeFileSync(backupPath, content);
console.log('💾 Backup adicional en page.backup3.tsx');

const lines = content.split('\n');

// Buscar primer 'use client'
let start = -1;
for (let i = 0; i < lines.length; i++) {
  const trimmed = lines[i].trim();
  if (trimmed === "'use client'" || trimmed === '"use client"') {
    start = i;
    break;
  }
}
if (start === -1) {
  console.error('No se encontró inicio del componente');
  process.exit(1);
}

// Buscar cierre de la primera función export default
let depth = 0;
let end = -1;
let insideTemplate = false;
for (let i = start; i < lines.length; i++) {
  const line = lines[i];
  // Detectar template literals (backticks)
  if (line.includes('`')) {
    insideTemplate = !insideTemplate;
  }
  if (insideTemplate) continue;

  for (const ch of line) {
    if (ch === '{') depth++;
    else if (ch === '}') depth--;
  }

  if (i > start + 5 && depth === 0) {
    end = i;
    break;
  }
}

if (end === -1) {
  console.error('No se encontró el final del componente');
  process.exit(1);
}

console.log(`Componente líneas ${start + 1} a ${end + 1}`);

let cleanLines = lines.slice(start, end + 1);
let cleanCode = cleanLines.join('\n');

// Reparar fragmentos pegados
cleanCode = cleanCode
  .replace(/'const comparisonRows = \[/g, 'const comparisonRows = [')
  .replace(/bonsai: '17const comparisonRows = \[/g, "bonsai: '17$',\nconst comparisonRows = [")
  .replace(/} 60 días:\|g/g, '')
  .replace(/, honeybook: '19const comparisonRows = \[/g, ", honeybook: '19$',\nconst comparisonRows = [")
  .replace(/, moxie: '20const comparisonRows = \[/g, ", moxie: '20$',\nconst comparisonRows = [")
  .replace(/, dubsado: '20const comparisonRows = \[/g, ", dubsado: '20$',\nconst comparisonRows = [")
  .replace(/use client'/g, "'use client'")
  .trim();

if (!cleanCode.endsWith('\n')) cleanCode += '\n';

fs.writeFileSync(filePath, cleanCode);
console.log(`✅ Landing limpia: ${cleanCode.split('\n').length} líneas (antes ${lines.length})`);
