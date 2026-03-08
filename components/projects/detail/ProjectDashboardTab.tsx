'use client';

import React from 'react';
import { ProjectStats } from './ProjectStats';
import { ProjectStageProgress } from './ProjectStageProgress';
import { ProjectLeaders } from './ProjectLeaders';
import { ProjectCandidateResults } from './ProjectCandidateResults';
import { ProjectLiveTracking } from './ProjectLiveTracking';
import { ProjectAISummary } from './ProjectAISummary';

export function ProjectDashboardTab({ projectId, onTabChange }: { projectId: string, onTabChange: (tab: string) => void }) {
  return (
    <div className="flex flex-col gap-4 sm:gap-6 lg:gap-8">
      {/* Top Stats */}
      <ProjectStats />

      {/* Middle Row: Leaders, Stage Progress, AI Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
        <div className="lg:col-span-1">
          <ProjectLeaders />
        </div>
        <div className="lg:col-span-2">
          <ProjectStageProgress />
        </div>
        <div className="lg:col-span-1">
          <ProjectAISummary onReview={() => onTabChange('ai-summary')} />
        </div>
      </div>

      {/* Bottom Row: Candidate Results & Live Tracking */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
        <div className="lg:col-span-2">
          <ProjectCandidateResults />
        </div>
        <div className="lg:col-span-1">
          <ProjectLiveTracking />
        </div>
      </div>
    </div>
  );
}
