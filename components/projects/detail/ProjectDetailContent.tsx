'use client';

import React, { useState } from 'react';
import { ProjectHeader } from './ProjectHeader';
import { ProjectDashboardTab } from './ProjectDashboardTab';
import { ProjectCandidatesTab } from './ProjectCandidatesTab';
import { Sparkles } from 'lucide-react';

export function ProjectDetailContent({ projectId }: { projectId: string }) {
  const [activeTab, setActiveTab] = useState('dashboard');

  const tabs = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'candidates', label: 'Adaylar' },
    { id: 'tracking', label: 'Anlık Takip' },
    { id: 'ai-summary', label: 'AI Yönetici Özeti' },
    { id: 'details', label: 'Detaylar' },
  ];

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Header Section */}
      <ProjectHeader projectId={projectId} />

      {/* Tabs Menu */}
      <div className="px-4 lg:px-8 border-b border-slate-200 bg-white shrink-0">
        <div className="flex gap-6 sm:gap-8 overflow-x-auto hide-scrollbar">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? 'border-indigo-600 text-indigo-600'
                  : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-y-auto p-4 lg:p-8">
        {activeTab === 'dashboard' && <ProjectDashboardTab projectId={projectId} onTabChange={setActiveTab} />}
        {activeTab === 'candidates' && <ProjectCandidatesTab projectId={projectId} />}
        {activeTab === 'tracking' && (
          <div className="flex items-center justify-center h-full text-slate-500">
            Anlık Takip sekmesi içeriği
          </div>
        )}
        {activeTab === 'ai-summary' && (
          <div className="flex flex-col items-center justify-center h-full text-slate-500 gap-4">
            <div className="w-16 h-16 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center">
              <Sparkles size={32} />
            </div>
            <h2 className="text-xl font-bold text-slate-900">AI Yönetici Özeti Raporu</h2>
            <p className="max-w-md text-center">Bu alanda yapay zeka tarafından oluşturulmuş detaylı proje analizi ve aday değerlendirmeleri yer alacaktır.</p>
          </div>
        )}
        {activeTab === 'details' && (
          <div className="flex items-center justify-center h-full text-slate-500">
            Detaylar sekmesi içeriği
          </div>
        )}
      </div>
    </div>
  );
}
