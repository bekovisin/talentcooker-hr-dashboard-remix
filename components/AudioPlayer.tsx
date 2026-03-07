import { Play, Volume2 } from 'lucide-react';

export function AudioPlayer() {
  return (
    <div className="p-4 rounded-xl border border-slate-200 bg-white flex items-center gap-4 shadow-sm">
      <button className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white hover:bg-indigo-700 transition-colors shrink-0">
        <Play size={18} className="ml-1" />
      </button>
      
      <div className="text-sm font-medium text-slate-500 w-10 shrink-0 text-right">0:00</div>
      
      <div className="flex-1 h-1.5 bg-slate-100 rounded-full relative">
        <div className="absolute left-0 top-0 bottom-0 w-1/3 bg-indigo-600 rounded-full" />
        <div className="absolute left-1/3 top-1/2 -translate-y-1/2 w-3 h-3 bg-indigo-600 rounded-full shadow-sm" />
      </div>
      
      <div className="text-sm font-medium text-slate-500 w-10 shrink-0">5:19</div>
      
      <div className="flex items-center gap-2 shrink-0">
        <Volume2 size={18} className="text-slate-400" />
        <div className="w-16 h-1.5 bg-slate-100 rounded-full relative">
          <div className="absolute left-0 top-0 bottom-0 w-3/4 bg-indigo-200 rounded-full" />
          <div className="absolute left-3/4 top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-indigo-200 rounded-full" />
        </div>
      </div>
    </div>
  );
}
