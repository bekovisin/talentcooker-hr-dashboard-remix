import { 
  Home, Briefcase, Users, FileText, Mic, ClipboardList, UsersRound, 
  ShieldCheck, MessageSquare, Database, Filter, PieChart, HelpCircle,
  ChevronDown
} from 'lucide-react';

export function OldSidebar() {
  return (
    <aside className="w-64 bg-[#F8F9FA] border-r border-slate-200 flex flex-col h-screen shrink-0">
      <div className="p-6 flex items-center gap-2">
        <div className="w-6 h-6 text-indigo-600">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
          </svg>
        </div>
        <span className="font-bold text-xl tracking-tight text-slate-900">HiPeople</span>
      </div>

      <nav className="flex-1 overflow-y-auto py-4 flex flex-col gap-1 px-3">
        <NavItem icon={<Home size={18} />} label="Home" />
        <NavItem icon={<Briefcase size={18} />} label="Jobs" />
        <NavItem icon={<Users size={18} />} label="Candidates" />
        
        <div className="my-2 border-t border-slate-200" />
        
        <NavItem icon={<FileText size={18} />} label="Screening" />
        <NavItem icon={<Mic size={18} />} label="Interviews" active />
        <NavItem icon={<ClipboardList size={18} />} label="Assessments" />
        <NavItem icon={<UsersRound size={18} />} label="References" />
        
        <div className="my-2 border-t border-slate-200" />
        
        <NavItem icon={<ShieldCheck size={18} />} label="Quality of Hire" />
        <NavItem icon={<MessageSquare size={18} />} label="Candidate Experience" />
        <NavItem icon={<Database size={18} />} label="Talent pool" />
        <NavItem icon={<Filter size={18} />} label="Sales pool" />
        <NavItem icon={<PieChart size={18} />} label="Report" />
      </nav>

      <div className="p-4 border-t border-slate-200">
        <NavItem icon={<HelpCircle size={18} />} label="Help" />
        <div className="mt-4 flex items-center gap-3 px-2 py-2 hover:bg-slate-100 rounded-lg cursor-pointer transition-colors">
          <div className="w-8 h-8 rounded bg-indigo-100 text-indigo-600 flex items-center justify-center font-medium text-sm">
            AG
          </div>
          <span className="text-sm font-medium flex-1">Alex Graham</span>
          <ChevronDown size={16} className="text-slate-400" />
        </div>
      </div>
    </aside>
  );
}

function NavItem({ icon, label, active }: { icon: React.ReactNode; label: string; active?: boolean }) {
  return (
    <a href="#" className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${active ? 'bg-white text-indigo-600 shadow-sm border border-slate-100' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'}`}>
      {icon}
      {label}
    </a>
  );
}
