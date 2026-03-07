import { Calendar, Mail, Sparkles, ThumbsUp, ThumbsDown, MoreHorizontal, ChevronLeft, ChevronRight, FileText, ClipboardList, Mic, UsersRound } from 'lucide-react';

export function CandidateHeader() {
  return (
    <div className="px-8 pt-8 pb-4 flex flex-col gap-4">
      {/* Breadcrumb & Pagination */}
      <div className="flex justify-between items-center text-sm text-slate-500">
        <div>
          <span>Senior Backend Engineer</span>
          <span className="mx-2">/</span>
          <span className="text-slate-900">Jake Goldstein</span>
        </div>
        <div className="flex items-center gap-3">
          <span>1 / 7</span>
          <div className="flex gap-1">
            <button className="p-1 rounded hover:bg-slate-100 text-slate-400"><ChevronLeft size={16} /></button>
            <button className="p-1 rounded hover:bg-slate-100 text-slate-900"><ChevronRight size={16} /></button>
          </div>
        </div>
      </div>

      {/* Title & Actions */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Jake Goldstein</h1>
          <div className="flex items-center gap-4 text-sm text-slate-600 font-medium">
            <div className="flex items-center gap-1.5">
              <Calendar size={14} className="text-slate-400" />
              14:00 7/22/2025
            </div>
            <div className="flex items-center gap-1.5">
              <Mail size={14} className="text-slate-400" />
              jake.gold@gmail.com
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 text-indigo-600 font-medium text-sm border border-indigo-100 hover:bg-indigo-100 transition-colors">
            <Sparkles size={16} />
            AI Actions
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-100 text-slate-700 font-medium text-sm hover:bg-slate-200 transition-colors">
            <ThumbsUp size={16} />
            Advance
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-100 text-slate-700 font-medium text-sm hover:bg-slate-200 transition-colors">
            <ThumbsDown size={16} />
            Reject
          </button>
          <button className="p-2 rounded-lg hover:bg-slate-100 text-slate-600 transition-colors">
            <MoreHorizontal size={20} />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-8 border-b border-slate-200 mt-4">
        <Tab icon={<FileText size={16} />} label="Screening" />
        <Tab icon={<ClipboardList size={16} />} label="Assessment" />
        <Tab icon={<Mic size={16} />} label="Interviews" active />
        <Tab icon={<UsersRound size={16} />} label="References" />
      </div>
    </div>
  );
}

function Tab({ icon, label, active }: { icon: React.ReactNode; label: string; active?: boolean }) {
  return (
    <button className={`flex items-center gap-2 pb-3 text-sm font-medium border-b-2 transition-colors ${active ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'}`}>
      {icon}
      {label}
    </button>
  );
}
