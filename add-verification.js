const fs = require('fs');
let layout = fs.readFileSync('src/app/layout.tsx', 'utf8');
const metaTag = '<meta name="google-site-verification" content={process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION || ""} />';
if (!layout.includes('google-site-verification')) {
  layout = layout.replace('<head>', '<head>\n        ' + metaTag);
  fs.writeFileSync('src/app/layout.tsx', layout);
  console.log('✅ Meta tag de verificación añadido a layout.tsx');
} else {
  console.log('ℹ️  El meta tag ya existe.');
}
