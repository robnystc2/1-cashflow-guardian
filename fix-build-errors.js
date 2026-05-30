const fs = require('fs');
const path = require('path');

// 1. Renombrar archivos con guiones o puntos inválidos
const renames = [
  ['src/app/editores-video', 'src/app/editoresvideo'],
  ['src/app/contrato-freelance-editor-video', 'src/app/contrato-freelance-editorvideo'],
  ['src/app/contrato-freelance-social-media', 'src/app/contrato-freelance-socialmedia'],
  ['src/app/vs-quickbooks-self-employed', 'src/app/vs-quickbooksselfemployed'],
  ['src/app/vs-and.co', 'src/app/vs-andco'],
];
renames.forEach(([oldDir, newDir]) => {
  if (fs.existsSync(oldDir)) {
    fs.renameSync(oldDir, newDir);
    console.log('Renombrado:', oldDir, '->', newDir);
  }
});

// 2. Arreglar nombres de función en los archivos movidos
const functionFixes = [
  ['editoresvideo', 'LandingEditoresvideo'],
  ['contrato-freelance-editorvideo', 'ContratoEditorvideo'],
  ['contrato-freelance-socialmedia', 'ContratoSocialmedia'],
  ['vs-quickbooksselfemployed', 'ComparativaQuickBooksSelfEmployed'],
  ['vs-andco', 'ComparativaAndco'],
];
functionFixes.forEach(([slug, newName]) => {
  const pagePath = path.join('src', 'app', slug, 'page.tsx');
  if (fs.existsSync(pagePath)) {
    let content = fs.readFileSync(pagePath, 'utf8');
    content = content.replace(/export default function \w+/, 'export default function ' + newName);
    fs.writeFileSync(pagePath, content);
    console.log('Corregido:', pagePath);
  }
});

// 3. Eliminar comentarios HTML en page.tsx
let pageCode = fs.readFileSync('src/app/page.tsx', 'utf8');
pageCode = pageCode.replace(/<!-- Plan por proyecto eliminado temporalmente -->/g, '');
pageCode = pageCode.replace(/<!-- Plan Teams movido a \/equipos -->/g, '');
fs.writeFileSync('src/app/page.tsx', pageCode);
console.log('Comentarios HTML eliminados de page.tsx');

// 4. Eliminar párrafo duplicado en el blog
const blogFile = 'src/app/blog/que-es-payscore/page.tsx';
if (fs.existsSync(blogFile)) {
  let blog = fs.readFileSync(blogFile, 'utf8');
  const lines = blog.split('\n');
  let found = 0;
  const cleaned = lines.filter(line => {
    if (line.includes('* Datos basados en encuestas internas')) {
      found++;
      return found === 1;
    }
    return true;
  });
  fs.writeFileSync(blogFile, cleaned.join('\n'));
  console.log('Párrafo duplicado eliminado del blog');
}

// 5. Corregir script de Clarity en layout.tsx
let layout = fs.readFileSync('src/app/layout.tsx', 'utf8');
// Eliminar versiones rotas
layout = layout.replace(/<script id="microsoft-clarity" strategy="afterInteractive">\{[\s\S]*?\}?<\/script>/g, '');
// Insertar versión correcta
const claritySnippet = `<script id="microsoft-clarity" strategy="afterInteractive">
          {(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window, document, "clarity", "script", "wrk1ugf3t5");}
        </script>`;
if (!layout.includes('wrk1ugf3t5')) {
  layout = layout.replace('</head>', claritySnippet + '\n</head>');
}
fs.writeFileSync('src/app/layout.tsx', layout);
console.log('Clarity corregido en layout.tsx');

console.log('✅ Todos los errores de build han sido corregidos.');
