import { createClient } from '@/lib/supabase/server'
import ProjectDetail from '@/components/projects/project-detail'

export default async function ProjectPage({ params }: { params: { id: string } }) {
  const supabase = await createClient()
  const { data: project } = await supabase
    .from('projects')
    .select('*, client:clients(name, email)')
    .eq('id', params.id)
    .single()

  if (!project) return <div className="p-6 text-zinc-400">Proyecto no encontrado</div>

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">{project.name}</h1>
      <p className="text-zinc-400 mb-6">
        Cliente: {project.client?.name || 'Sin cliente'} · Presupuesto: €{project.budget || 'No definido'}
      </p>
      <ProjectDetail projectId={project.id} />
    </div>
  )
}
