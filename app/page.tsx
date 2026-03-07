import { Sidebar } from '@/components/Sidebar';
import { DashboardHeader } from '@/components/DashboardHeader';
import { StatsOverview } from '@/components/StatsOverview';
import { ProjectTracking } from '@/components/ProjectTracking';
import { BottomWidgets } from '@/components/BottomWidgets';

export default function Dashboard() {
  return (
    <div className="flex h-screen bg-slate-50 text-slate-900 font-sans overflow-hidden">
      <Sidebar />
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <DashboardHeader />
        <div className="flex-1 overflow-y-auto p-4 lg:p-8 flex flex-col gap-6 lg:gap-8">
          <StatsOverview />
          <ProjectTracking />
          <BottomWidgets />
        </div>
      </main>
    </div>
  );
}
