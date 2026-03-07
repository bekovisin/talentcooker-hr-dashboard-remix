export function ScoreCard() {
  return (
    <div className="flex items-center gap-6">
      <div className="bg-gradient-to-br from-indigo-600 to-blue-700 rounded-xl p-5 text-white flex-1 shadow-md">
        <div className="flex items-end gap-6">
          <div>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-bold">85</span>
              <span className="text-xl font-medium">%</span>
            </div>
            <div className="text-indigo-100 text-sm font-medium mt-1">High match</div>
          </div>
          
          <div className="flex gap-6 mb-1">
            <div>
              <div className="text-xl font-bold">69<span className="text-sm font-medium">%</span></div>
              <div className="text-indigo-200 text-xs font-medium">Average Score</div>
            </div>
            <div>
              <div className="text-xl font-bold">84<span className="text-sm font-medium">%</span></div>
              <div className="text-indigo-200 text-xs font-medium">Highest Score</div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex flex-col items-end gap-2 text-sm shrink-0">
        <div className="text-slate-600">
          Advanced at : <span className="text-slate-900 font-medium">14:00 7/22/2025</span>
        </div>
        <div className="text-slate-600">
          Called at : <span className="text-slate-900 font-medium">14:00 7/22/2025</span>
        </div>
        <button className="mt-1 px-4 py-1.5 rounded-full border border-emerald-500 text-emerald-600 font-medium text-sm hover:bg-emerald-50 transition-colors">
          Advanced
        </button>
      </div>
    </div>
  );
}
