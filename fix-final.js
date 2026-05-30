const fs = require('fs');

// 1. Corregir nombres de función con guiones o puntos en páginas específicas
const fixes = [
  { file: 'src/app/editoresvideo/page.tsx', from: 'LandingEditoresvideo-video', to: 'LandingEditoresvideo' },
  { file: 'src/app/contrato-freelance-editorvideo/page.tsx', from: 'ContratoEditorvideo-video', to: 'ContratoEditorvideo' },
  { file: 'src/app/contrato-freelance-socialmedia/page.tsx', from: 'ContratoSocialmedia-media', to: 'ContratoSocialmedia' },
  { file: 'src/app/vs-quickbooksselfemployed/page.tsx', from: 'ComparativaQuickBooksSelfEmployed-Employed', to: 'ComparativaQuickBooksSelfEmployed' },
  { file: 'src/app/vs-andco/page.tsx', from: 'ComparativaAndco.co', to: 'ComparativaAndco' },
];

fixes.forEach(({ file, from, to }) => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    content = content.replace(new RegExp(from, 'g'), to);
    fs.writeFileSync(file, content);
    console.log('✅ Corregido:', file);
  }
});

// 2. Eliminar la definición duplicada de nicheModalData en page.tsx
const pagePath = 'src/app/page.tsx';
let pageCode = fs.readFileSync(pagePath, 'utf8');
const lines = pageCode.split('\n');
let found = 0;
const newLines = lines.filter(line => {
  if (line.includes('const [nicheModalData, setNicheModalData] = useState<any>(null)')) {
    found++;
    return found === 1; // mantiene solo la primera ocurrencia
  }
  return true;
});
fs.writeFileSync(pagePath, newLines.join('\n'));
console.log('✅ Estado duplicado eliminado en page.tsx');
