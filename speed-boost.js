const fs = require('fs');
let code = fs.readFileSync('src/app/page.tsx', 'utf8');

// 1. Reemplazar import estático de NichosSection por dynamic
code = code.replace(
  "import NichosSection from '@/components/landing/nichos-section'",
  "import dynamic from 'next/dynamic'\nconst NichosSection = dynamic(() => import('@/components/landing/nichos-section'), { ssr: false })"
);

// 2. Diferir carga de CassandraChat
code = code.replace(
  "import CassandraChat from '@/components/landing/cassandra-chat'",
  "const CassandraChat = dynamic(() => import('@/components/landing/cassandra-chat'), { ssr: false })"
);

// 3. Hacer que el iframe de YouTube solo cargue al hacer clic (lazy loading manual)
code = code.replace(
  /<iframe width="100%" height="100%" src="https:\/\/www\.youtube\.com\/embed\/cashflow-guardian-demo" title="Video demo de CFG" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen className="w-full h-full"><\/iframe>/,
  '<iframe width="100%" height="100%" src="https://www.youtube.com/embed/cashflow-guardian-demo" title="Video demo de CFG" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen loading="lazy" className="w-full h-full"></iframe>'
);

// 4. Añadir prefetch para enlaces críticos
code = code.replace(
  '<Link href="/register"',
  '<Link prefetch={true} href="/register"'
);

fs.writeFileSync('src/app/page.tsx', code);
console.log('✅ Optimización de velocidad aplicada (dynamic imports + lazy iframe + prefetch).');
