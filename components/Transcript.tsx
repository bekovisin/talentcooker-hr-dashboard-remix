export function Transcript() {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="font-bold text-slate-900">Transcript</h3>
      
      <div className="flex flex-col gap-6">
        {/* AI Message */}
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <span className="font-semibold text-slate-900 text-sm">AI Interviewer</span>
            <span className="text-xs text-slate-400 font-medium">0:00</span>
          </div>
          <div className="bg-slate-50 p-4 rounded-2xl rounded-tl-none text-slate-700 text-sm leading-relaxed">
            Hi, there. I&apos;m an AI recruiter assistant. Am I speaking with Jake Goldstein?
          </div>
        </div>

        {/* Candidate Message */}
        <div className="flex flex-col gap-2 items-end">
          <div className="flex justify-between items-center w-full max-w-[80%]">
            <span className="text-xs text-slate-400 font-medium ml-auto mr-2">0:07</span>
            <span className="font-semibold text-slate-900 text-sm">Candidate</span>
          </div>
          <div className="flex gap-2 w-full justify-end">
            <div className="bg-indigo-600 p-4 rounded-2xl rounded-tr-none text-white text-sm leading-relaxed max-w-[80%]">
              Yeah, Jake Goldstein
            </div>
            <div className="w-1.5 bg-indigo-600 rounded-full shrink-0" />
          </div>
        </div>

        {/* AI Message 2 */}
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <span className="font-semibold text-slate-900 text-sm">AI Interviewer</span>
            <span className="text-xs text-slate-400 font-medium">0:10</span>
          </div>
          <div className="bg-slate-50 p-4 rounded-2xl rounded-tl-none text-slate-700 text-sm leading-relaxed">
            Great. Thank you for confirming, Jake. Let&apos;s get started. Could you please describe a specific project where you integrated a front end React application with back end services? What was your role and what challenges did you face?
          </div>
        </div>
      </div>
    </div>
  );
}
