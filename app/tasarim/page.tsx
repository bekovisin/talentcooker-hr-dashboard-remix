import { OldSidebar } from '@/components/OldSidebar';
import { CandidateHeader } from '@/components/CandidateHeader';
import { ScoreCard } from '@/components/ScoreCard';
import { MatchBreakdown } from '@/components/MatchBreakdown';
import { AudioPlayer } from '@/components/AudioPlayer';
import { Transcript } from '@/components/Transcript';

export default function Tasarim() {
  return (
    <div className="flex h-screen bg-white text-slate-900 font-sans">
      <OldSidebar />
      <main className="flex-1 flex flex-col overflow-hidden">
        <CandidateHeader />
        <div className="flex-1 overflow-y-auto px-8 pb-8 flex gap-12">
          {/* Left Column */}
          <div className="w-1/2 flex flex-col gap-6 max-w-2xl">
            <ScoreCard />
            <MatchBreakdown />
          </div>
          
          {/* Right Column */}
          <div className="w-1/2 flex flex-col gap-6 max-w-2xl">
            <AudioPlayer />
            <Transcript />
          </div>
        </div>
      </main>
    </div>
  );
}
