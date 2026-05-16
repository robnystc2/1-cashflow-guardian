'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'
import { Plus, Lock, ArrowRight, ChevronDown, Sparkles, FileText, Palette, Code } from 'lucide-react'
import { Button } from '@/components/ui/button'

type Filter = 'all' | 'active' | 'proposal' | 'completed'

export default function ProjectsPage() {
  const [projects, setProjects] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<Filter>('all')
  const [showDropdown, setShowDropdown] = useState(false)
  const supabase = createClient()

  useEffect(() => {
    const fetchProjects = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return
      const { data } = await supabase
        .from('projects')
        .select('*, client:clients(name), milestones(id, amount, status, is_locked, name)')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
      setProjects(data || [])
      setLoading(false)
    }
    fetchProjects()
  }, [])

  const filtered = filter === 'all' ? projects : projects.filter(p => {
    if (filter === 'proposal') return p.status === 'proposal'
    if (filter === 'active') return p.status === 'active'
    if (filter === 'completed') return p.status === 'completed'
    return true
  })

  const counts = {
    all: projects.length,
    active: projects.filter(p => p.status === 'active').length,
    proposal: projects.filter(p => p.status === 'proposal').length,
    completed: projects.filter(p => p.status === 'completed').length,
  }

  const hasLockedMilestones = (project: any) => project.milestones?.some((m: any) => m.is_locked)
  const getNextMilestoneName = (project: any) => project.milestones?.find((m: any) => m.status === 'pending' && !m.is_locked)?.name || null

  if (loading) return null

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Proyectos</h1>
        <div className="relative">
          <Button 
            className="bg-emerald-600 hover:bg-emerald-500"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <Plus className="w-4 h-4 mr-2" /> Nuevo Proyecto
            <ChevronDown className="w-4 h-4 ml-2" />
          </Button>
          {showDropdown && (
            <div className="absolute right-0 top-12 w-64 bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl z-50 overflow-hidden">
              <Link href="/projects/new" className="block p-3 hover:bg-zinc-800 transition-colors" onClick={() => setShowDropdown(false)}>
                <FileText className="w-4 h-4 inline mr-2 text-zinc-400" /> Empezar desde cero
              </Link>
              <div className="border-t border-zinc-800 p-2 text-xs text-zinc-500">PLANTILLAS RÁPIDAS</div>
              <Link href="/projects/new?template=design" className="block p-3 hover:bg-zinc-800 transition-colors" onClick={() => setShowDropdown(false)}>
                <Palette className="w-4 h-4 inline mr-2 text-purple-400" /> Diseño Web
                <span className="text-xs text-zinc-500 ml-6">Wireframes + Prototipo + Entrega</span>
              </Link>
              <Link href="/projects/new?template=dev" className="block p-3 hover:bg-zinc-800 transition-colors" onClick={() => setShowDropdown(false)}>
                <Code className="w-4 h-4 inline mr-2 text-cyan-400" /> Desarrollo App
                <span className="text-xs text-zinc-500 ml-6">MVP + Testing + Deployment</span>
              </Link>
              <Link href="/projects/new?template=consulting" className="block p-3 hover:bg-zinc-800 transition-colors" onClick={() => setShowDropdown(false)}>
                <Sparkles className="w-4 h-4 inline mr-2 text-amber-400" /> Consultoría
                <span className="text-xs text-zinc-500 ml-6">Auditoría + Informe + Mentoría</span>
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Pestañas de filtro */}
      <div className="flex gap-2 mb-6">
        {(['all', 'active', 'proposal', 'completed'] as Filter[]).map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1.5 text-sm rounded-full transition-colors ${
              filter === f ? 'bg-white text-black font-medium' : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
            }`}
          >
            {f === 'all' ? 'Todos' : f === 'proposal' ? 'Blindando' : f === 'active' ? 'Activos' : 'Completados'}
            <span className="ml-1 opacity-70">({counts[f]})</span>
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-12 text-center">
          {/* Visualización del mecanismo */}
          <div className="flex justify-center items-center gap-4 mb-8">
            <div className="bg-emerald-900/20 border border-emerald-800 rounded-lg p-4 text-center">
              <div className="text-2xl mb-1">1</div>
              <div className="text-xs text-emerald-400 font-medium">Abierto</div>
              <div className="text-sm font-bold">500€</div>
            </div>
            <ArrowRight className="text-zinc-600" />
            <div className="bg-zinc-800 border border-zinc-700 rounded-lg p-4 text-center opacity-50">
              <div className="text-2xl mb-1">🔒</div>
              <div className="text-xs text-zinc-500 font-medium">Bloqueado</div>
              <div className="text-sm font-bold">500€</div>
            </div>
            <ArrowRight className="text-zinc-600" />
            <div className="bg-zinc-800 border border-zinc-700 rounded-lg p-4 text-center opacity-30">
              <div className="text-2xl mb-1">🔒</div>
              <div className="text-xs text-zinc-500 font-medium">Bloqueado</div>
              <div className="text-sm font-bold">500€</div>
            </div>
          </div>
          <p className="text-xl mb-2">Cada proyecto es un blindaje</p>
          <p className="text-sm text-zinc-400 mb-4 max-w-md mx-auto">
            Crea tu primer proyecto, divídelo en hitos y asegura el cobro antes de entregar el trabajo final. 
            <br/>Tú tienes el control. El cliente no ve el siguiente paso hasta que paga.
          </p>
          <Link href="/projects/new">
            <Button className="bg-emerald-600 hover:bg-emerald-500">Crear tu primer proyecto blindado</Button>
          </Link>
        </div>
      ) : (
        <div className="grid gap-4">
          {filtered.map((project: any) => {
            const totalMilestones = project.milestones?.length || 0
            const paidMilestones = project.milestones?.filter((m: any) => m.status === 'paid').length || 0
            const progress = totalMilestones > 0 ? (paidMilestones / totalMilestones) * 100 : 0
            const nextMilestone = getNextMilestoneName(project)
            const locked = hasLockedMilestones(project)

            return (
              <Link
                key={project.id}
                href={`/projects/${project.id}`}
                className="block bg-zinc-900 border border-zinc-800 rounded-xl p-4 hover:border-zinc-700 transition-colors relative"
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg font-semibold">{project.name}</h2>
                    {locked && (
                      <div className="relative group">
                        <Lock className="w-4 h-4 text-red-400" />
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 px-2 py-0.5 bg-red-900 text-red-300 text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                          Cliente con pagos pendientes
                        </div>
                      </div>
                    )}
                  </div>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    project.status === 'proposal' ? 'bg-amber-900/50 text-amber-400' :
                    project.status === 'active' ? 'bg-emerald-900/50 text-emerald-400' :
                    'bg-zinc-700 text-zinc-300'
                  }`}>
                    {project.status === 'proposal' ? 'Blindando acuerdo' :
                     project.status === 'active' ? 'Activo' :
                     project.status === 'completed' ? 'Completado' : 'Pausado'}
                  </span>
                </div>
                <p className="text-sm text-zinc-400 mb-3">
                  Cliente: {project.client?.name || 'Sin cliente'} 
                  {project.budget ? ` · Presupuesto: €${project.budget}` : ''}
                </p>
                {totalMilestones > 0 && (
                  <>
                    <div className="flex justify-between text-xs text-zinc-500 mb-1">
                      <span>Progreso</span>
                      <span>{progress.toFixed(0)}% ({paidMilestones}/{totalMilestones} hitos)</span>
                    </div>
                    <div className="w-full bg-zinc-800 rounded-full h-1.5">
                      <div className="bg-gradient-to-r from-emerald-500 to-cyan-500 h-1.5 rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
                    </div>
                    {nextMilestone && (
                      <p className="text-xs text-zinc-500 mt-2 flex items-center gap-1">
                        <ArrowRight className="w-3 h-3" /> Próximo hito: {nextMilestone}
                      </p>
                    )}
                  </>
                )}
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}
