import { Sidebar } from '@/components/Sidebar';
import { ProjectDetailContent } from '@/components/projects/detail/ProjectDetailContent';

export default async function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  return (
    <div className="flex h-screen bg-slate-50 text-slate-900 font-sans overflow-hidden">
      <Sidebar />
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <ProjectDetailContent projectId={resolvedParams.id} />
      </main>
    </div>
  );
}
