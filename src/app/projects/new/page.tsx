import { createClient } from '@/lib/supabase/server'
import NewProjectForm from '@/components/projects/new-project-form'

const TEMPLATES: Record<string, any> = {
  design: { name: 'Proyecto de Diseño Web', milestones: ['Wireframes y UX', 'Diseño Visual', 'Entrega final'], amounts: [500, 800, 700] },
  dev: { name: 'Desarrollo de App', milestones: ['MVP Funcional', 'Testing y QA', 'Deployment'], amounts: [1500, 1000, 500] },
  consulting: { name: 'Consultoría Estratégica', milestones: ['Auditoría inicial', 'Plan de acción', 'Mentoría de implementación'], amounts: [800, 1200, 1000] },
}

export default async function NewProjectPage({ searchParams }: { searchParams: { template?: string } }) {
  const template = searchParams.template ? TEMPLATES[searchParams.template] : null

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">
        {template ? `Nuevo proyecto: ${template.name}` : 'Nuevo Proyecto'}
      </h1>
      <p className="text-zinc-400 mb-6">
        {template 
          ? 'Hemos preparado hitos sugeridos. Puedes modificarlos a tu gusto.'
          : 'Divide tu proyecto en hitos para cobrar antes de entregar el trabajo final. Tú tienes el control.'
        }
      </p>
      <NewProjectForm template={template} />
    </div>
  )
}
