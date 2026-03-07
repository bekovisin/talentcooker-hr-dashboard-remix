import { Sparkles, CheckCircle2, ChevronDown } from 'lucide-react';

export function MatchBreakdown() {
  const criteria = [
    "Communication",
    "Problem-Solving Skills",
    "IT Competence",
    "Cross-functional Collaboration",
    "Stakeholder Management",
    "Innovation Skills"
  ];

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Sparkles size={18} className="text-indigo-600" />
          <h2 className="font-bold text-slate-900">Match Breakdown</h2>
          <span className="text-slate-500 text-sm">7 of 7 match</span>
        </div>
        <button className="px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 text-sm font-medium hover:bg-slate-50 flex items-center gap-2">
          Criteria
          <div className="w-1.5 h-1.5 rounded-full bg-indigo-600" />
        </button>
      </div>

      <div className="flex flex-col gap-3">
        {criteria.map((item, i) => (
          <div key={i} className="flex items-center justify-between p-4 rounded-xl border border-slate-200 bg-white hover:border-slate-300 transition-colors cursor-pointer">
            <span className="font-medium text-slate-800">{item}</span>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-sm font-medium">
                <CheckCircle2 size={14} className="text-emerald-600" />
                High
              </div>
              <ChevronDown size={18} className="text-slate-400" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
