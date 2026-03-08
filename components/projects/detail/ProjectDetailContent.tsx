'use client';

import React, { useState } from 'react';
import { ProjectHeader } from './ProjectHeader';
import { ProjectDashboardTab } from './ProjectDashboardTab';
import { ProjectCandidatesTab } from './ProjectCandidatesTab';
import { Sparkles, Mail, MoreVertical, Edit2, PauseCircle, Trash2, Copy, Archive } from 'lucide-react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

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

      {/* Tabs Menu & Controls */}
      <div className="border-b border-slate-200 bg-white shrink-0 px-4 pl-16 lg:px-8 pt-3 flex items-end justify-between overflow-x-auto no-scrollbar">
        <div className="flex gap-4 sm:gap-6 -mb-[1px]">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-3 text-[13px] sm:text-sm font-medium border-b-[3px] transition-colors whitespace-nowrap ${activeTab === tab.id
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3 pb-3">
          <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-1.5 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 rounded-lg text-sm font-medium transition-colors">
            <Mail size={16} />
            <span className="inline">E-posta Gönder</span>
          </button>

          <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
              <button className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors border border-transparent hover:border-slate-200">
                <MoreVertical size={20} />
              </button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Portal>
              <DropdownMenu.Content
                className="min-w-[200px] bg-white rounded-xl shadow-lg border border-slate-100 p-1 z-50 animate-in fade-in-80 zoom-in-95"
                align="end"
              >
                <DropdownMenu.Item className="flex items-center gap-2 px-3 py-2 text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg cursor-pointer outline-none">
                  <Edit2 size={16} /> Düzenle
                </DropdownMenu.Item>
                <DropdownMenu.Item className="flex items-center gap-2 px-3 py-2 text-sm text-amber-600 hover:text-amber-700 hover:bg-amber-50 rounded-lg cursor-pointer outline-none">
                  <PauseCircle size={16} /> Projeyi Durdur
                </DropdownMenu.Item>
                <DropdownMenu.Item className="flex items-center gap-2 px-3 py-2 text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg cursor-pointer outline-none">
                  <Copy size={16} /> Çoğalt
                </DropdownMenu.Item>
                <DropdownMenu.Item className="flex items-center gap-2 px-3 py-2 text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg cursor-pointer outline-none">
                  <Archive size={16} /> Arşivle
                </DropdownMenu.Item>
                <DropdownMenu.Separator className="h-px bg-slate-100 my-1" />
                <DropdownMenu.Item className="flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg cursor-pointer outline-none">
                  <Trash2 size={16} /> Sil
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>
        </div>
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-y-auto p-4 lg:p-8 w-full max-w-[1400px] mx-auto">
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
    </div >
  );
}
