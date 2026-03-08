'use client';

import React from 'react';

const stages = [
  {
    id: 1,
    title: 'OCEAN Kişilik Envanteri',
    badge: 'Envanter',
    badgeColor: 'bg-purple-100 text-purple-700',
    avgScore: '%64',
    avgTime: '29dk 28sn',
    completed: 8,
    inProgress: 1,
    waiting: 7,
    total: 16,
  },
  {
    id: 2,
    title: 'Çalışma Değerleri Envanteri',
    badge: 'Envanter',
    badgeColor: 'bg-purple-100 text-purple-700',
    avgScore: '%50',
    avgTime: '10sa 22dk',
    completed: 6,
    inProgress: 2,
    waiting: 8,
    total: 16,
  },
  {
    id: 3,
    title: 'Mono Sigorta - Sağlık Sigortaları Danışmanı',
    badge: 'Değerlendirme',
    badgeColor: 'bg-blue-100 text-blue-700',
    avgScore: '%15',
    avgTime: '41dk 57sn',
    completed: 7,
    inProgress: 0,
    waiting: 9,
    total: 16,
  },
];

export function ProjectStageProgress() {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-[0_1px_3px_rgb(0_0_0/0.02)] p-5 sm:p-6 h-full flex flex-col">
      <div className="flex items-center justify-between mb-6 sm:mb-8">
        <h2 className="text-lg font-bold text-slate-900">Aşama İlerleme Durumu</h2>
      </div>

      <div className="flex-1 flex flex-col gap-8">
        {stages.map((stage) => {
          const completedPct = (stage.completed / stage.total) * 100;
          const inProgressPct = (stage.inProgress / stage.total) * 100;
          const waitingPct = (stage.waiting / stage.total) * 100;

          return (
            <div key={stage.id} className="flex flex-col gap-3">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                  <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-sm shrink-0">
                    {stage.id}
                  </div>
                  <span className="font-semibold text-slate-900 text-sm sm:text-base">{stage.title}</span>
                  <span className={`px-2 py-0.5 rounded-md text-xs font-medium ${stage.badgeColor}`}>
                    {stage.badge}
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-sm ml-10 sm:ml-0">
                  <div className="text-slate-600">Ort: <span className="font-bold text-slate-900">{stage.avgScore}</span></div>
                  <div className="text-slate-600">Süre: <span className="font-bold text-slate-900">{stage.avgTime}</span></div>
                  <div className="font-bold text-slate-900">{stage.completed}/{stage.total}</div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="h-3 w-full rounded-full overflow-hidden flex bg-slate-200">
                <div
                  className="h-full bg-[#22c55e] transition-all duration-1000 ease-out"
                  style={{ width: `${completedPct}%` }}
                />
                <div
                  className="h-full bg-[#eab308] transition-all duration-1000 ease-out"
                  style={{ width: `${inProgressPct}%` }}
                />
                <div
                  className="h-full bg-[#e2e8f0] transition-all duration-1000 ease-out"
                  style={{ width: `${waitingPct}%` }}
                />
              </div>

              {/* Legend */}
              <div className="flex flex-wrap items-center gap-3 sm:gap-6 text-xs text-slate-500">
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-[#22c55e]" />
                  <span>Tamamlandı ({stage.completed})</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-[#eab308]" />
                  <span>Devam Ediyor ({stage.inProgress})</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-[#e2e8f0]" />
                  <span>Bekliyor ({stage.waiting})</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
