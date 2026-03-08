'use client';

import React, { useState, useMemo } from 'react';
import { Search, ChevronDown, ChevronLeft, ChevronRight, ArrowRight, ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';
import { useRouter } from 'next/navigation';

const initialCandidates = [
  { id: 1, name: "Ahmet Yılmaz", date: "10/09/2024", stage: "Aşama 4: Mülakat", match: 92, role: "Senior Frontend Developer", ocean: { o: 85, c: 90, e: 82, a: 88, n: 95 } },
  { id: 2, name: "Ayşe Kaya", date: "12/09/2024", stage: "Aşama 3: Teknik Test", match: 98, role: "Senior Frontend Developer", ocean: { o: 90, c: 85, e: 80, a: 85, n: 75 } },
  { id: 3, name: "Can Öztürk", date: "08/09/2024", stage: "Aşama 2: Değerlendirme", match: 75, role: "Senior Frontend Developer", ocean: { o: 70, c: 60, e: 90, a: 85, n: 50 } },
  { id: 4, name: "Elif Demir", date: "15/09/2024", stage: "Aşama 1: Yeni Başvuru", match: 42, role: "Senior Frontend Developer", ocean: { o: 30, c: 85, e: 65, a: 90, n: 40 } },
  { id: 5, name: "Burak Yılmaz", date: "11/09/2024", stage: "Aşama 3: Teknik Test", match: 96, role: "Senior Frontend Developer", ocean: { o: 88, c: 92, e: 85, a: 80, n: 85 } },
  { id: 6, name: "Selin Şahin", date: "14/09/2024", stage: "Aşama 4: Mülakat", match: 62, role: "Senior Frontend Developer", ocean: { o: 82, c: 80, e: 55, a: 45, n: 65 } },
];

function MatchScoreBadge({ score }: { score: number }) {
  let colorClass = "text-emerald-700 bg-emerald-50";
  let iconColor = "text-emerald-500";
  if (score < 50) {
    colorClass = "text-rose-700 bg-rose-50";
    iconColor = "text-rose-500";
  } else if (score < 80) {
    colorClass = "text-amber-700 bg-amber-50";
    iconColor = "text-amber-500";
  }

  return (
    <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold transition-transform hover:scale-110 cursor-default ${colorClass}`}>
      <svg className={`w-3.5 h-3.5 ${iconColor}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 12a9 9 0 1 1-9-9" />
      </svg>
      {score}%
    </div>
  );
}

function HighIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="7" cy="7" r="7" fill="#10B981" />
      <path d="M4 7L6 9L10 4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function MediumIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="7" cy="7" r="7" fill="#F59E0B" />
      <path d="M4 7H10" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function LowIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="7" cy="7" r="7" fill="#EF4444" />
      <path d="M4.5 4.5L9.5 9.5M9.5 4.5L4.5 9.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function SkillBadge({ score, mode }: { score: number, mode: 'level' | 'score' }) {
  let level = 'Low';
  if (score >= 80) level = 'High';
  else if (score >= 50) level = 'Medium';

  if (mode === 'score') {
    let colorClass = "text-emerald-700 bg-emerald-50";
    let iconColor = "text-emerald-500";
    if (score < 50) {
      colorClass = "text-rose-700 bg-rose-50";
      iconColor = "text-rose-500";
    } else if (score < 80) {
      colorClass = "text-amber-700 bg-amber-50";
      iconColor = "text-amber-500";
    }

    return (
      <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold transition-transform hover:scale-110 cursor-default ${colorClass}`}>
        <svg className={`w-3.5 h-3.5 ${iconColor}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 12a9 9 0 1 1-9-9" />
        </svg>
        {score}%
      </div>
    );
  }

  if (level === 'High') {
    return (
      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold text-emerald-700 bg-emerald-50 transition-transform hover:scale-110 cursor-default">
        <HighIcon />
        Yüksek
      </div>
    );
  }
  if (level === 'Medium') {
    return (
      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold text-amber-700 bg-amber-50 transition-transform hover:scale-110 cursor-default">
        <MediumIcon />
        Orta
      </div>
    );
  }
  return (
    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold text-rose-700 bg-rose-50 transition-transform hover:scale-110 cursor-default">
      <LowIcon />
      Düşük
    </div>
  );
}

function Pagination({ page, totalPages, onPageChange, rowsPerPage, onRowsChange, rowsOptions }: any) {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between px-4 py-3 border-t border-slate-100 bg-white shrink-0 gap-3">
      <div className="flex items-center gap-2">
        <span className="text-xs text-slate-500 font-medium">Göster:</span>
        <select
          value={rowsPerPage}
          onChange={(e) => onRowsChange(Number(e.target.value))}
          className="text-xs border border-slate-200 rounded px-2 py-1 bg-slate-50 text-slate-700 outline-none focus:border-indigo-500 font-medium cursor-pointer"
        >
          {rowsOptions.map((opt: number) => <option key={opt} value={opt}>{opt}</option>)}
        </select>
      </div>
      <div className="flex items-center gap-3">
        <button
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
          className="p-1 rounded border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronLeft size={14} />
        </button>
        <span className="text-xs text-slate-600 font-medium min-w-[70px] text-center">
          Sayfa {page} / {Math.max(1, totalPages)}
        </span>
        <button
          disabled={page >= totalPages}
          onClick={() => onPageChange(page + 1)}
          className="p-1 rounded border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );
}

function SortIcon({ columnKey, sortConfig }: { columnKey: string, sortConfig: { key: string, direction: 'asc' | 'desc' } | null }) {
  if (sortConfig?.key !== columnKey) {
    return <ArrowUpDown size={12} className="text-slate-300 ml-1 inline-block" />;
  }
  return sortConfig.direction === 'asc'
    ? <ArrowUp size={12} className="text-indigo-500 ml-1 inline-block" />
    : <ArrowDown size={12} className="text-indigo-500 ml-1 inline-block" />;
}

export function ProjectCandidateResults() {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [displayMode, setDisplayMode] = useState<'level' | 'score'>('level');
  const [sortConfig, setSortConfig] = useState<{ key: string, direction: 'asc' | 'desc' } | null>(null);

  const handleSort = (key: string) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedCandidates = useMemo(() => {
    let sortableItems = [...initialCandidates];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        let aValue: any;
        let bValue: any;

        if (sortConfig.key === 'date') {
          const [ad, am, ay] = a.date.split('/');
          const [bd, bm, by] = b.date.split('/');
          aValue = new Date(`${ay}-${am}-${ad}`).getTime();
          bValue = new Date(`${by}-${bm}-${bd}`).getTime();
        } else if (['o', 'c', 'e', 'a', 'n'].includes(sortConfig.key)) {
          aValue = a.ocean[sortConfig.key as keyof typeof a.ocean];
          bValue = b.ocean[sortConfig.key as keyof typeof b.ocean];
        } else {
          aValue = a[sortConfig.key as keyof typeof a];
          bValue = b[sortConfig.key as keyof typeof b];
        }

        if (aValue < bValue) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [sortConfig]);

  const paginatedCandidates = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    return sortedCandidates.slice(start, start + rowsPerPage);
  }, [sortedCandidates, page, rowsPerPage]);

  const getStageStyles = (stage: string) => {
    if (stage.includes('Yeni Başvuru')) return 'bg-sky-50 text-sky-700 border-sky-200 hover:bg-sky-100';
    if (stage.includes('Değerlendirme')) return 'bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100';
    if (stage.includes('Teknik Test')) return 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100';
    if (stage.includes('Mülakat')) return 'bg-indigo-50 text-indigo-700 border-indigo-200 hover:bg-indigo-100';
    if (stage.includes('Teklif')) return 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100';
    return 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100';
  };

  const getThClass = (key: string) => {
    const baseClass = "px-4 py-2.5 text-[10px] font-bold uppercase tracking-wider whitespace-nowrap cursor-pointer transition-colors";
    if (sortConfig?.key === key) {
      return `${baseClass} bg-indigo-50/80 text-indigo-700`;
    }
    return `${baseClass} text-slate-500 hover:bg-slate-100`;
  };

  const getTdClass = (key: string, extraClass: string = "") => {
    const baseClass = `px-4 py-2 whitespace-nowrap ${extraClass}`;
    if (sortConfig?.key === key) {
      return `${baseClass} bg-indigo-50/30`;
    }
    return baseClass;
  };

  return (
    <div className="bg-white border border-slate-200 rounded-lg shadow-[0_1px_3px_rgb(0_0_0/0.02)] flex flex-col overflow-hidden h-full min-h-[500px]">
      <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-50/50 shrink-0">
        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Aday Sonuçları</h3>
          <button className="flex items-center gap-1.5 px-2.5 py-1 bg-white border border-slate-200 rounded-md text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors shadow-sm">
            Senior Frontend Developer
            <ChevronDown size={14} className="text-slate-400" />
          </button>
        </div>
        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
          <div className="flex items-center bg-slate-100 rounded-lg p-0.5 border border-slate-200">
            <button
              onClick={() => setDisplayMode('level')}
              className={`px-3 py-1.5 rounded-md text-[10px] font-bold uppercase tracking-wider transition-all ${displayMode === 'level' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
              Seviye
            </button>
            <button
              onClick={() => setDisplayMode('score')}
              className={`px-3 py-1.5 rounded-md text-[10px] font-bold uppercase tracking-wider transition-all ${displayMode === 'score' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
              Skor
            </button>
          </div>
          <button className="flex items-center gap-1 px-2.5 py-1.5 bg-indigo-50 text-xs font-bold text-indigo-700 border border-indigo-100 rounded-md hover:bg-indigo-100 transition-colors">
            Tümünü Gör
            <ArrowRight size={14} />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[800px]">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/30">
              <th className={getThClass('name')} onClick={() => handleSort('name')}>Aday Adı <SortIcon columnKey="name" sortConfig={sortConfig} /></th>
              <th className={getThClass('date')} onClick={() => handleSort('date')}>Başvuru Tarihi <SortIcon columnKey="date" sortConfig={sortConfig} /></th>
              <th className={getThClass('stage')} onClick={() => handleSort('stage')}>Aşama <SortIcon columnKey="stage" sortConfig={sortConfig} /></th>
              <th className={getThClass('match')} onClick={() => handleSort('match')}>Uyum Skoru <SortIcon columnKey="match" sortConfig={sortConfig} /></th>
              <th className={getThClass('o')} onClick={() => handleSort('o')} title="Openness (Açıklık)">O <SortIcon columnKey="o" sortConfig={sortConfig} /></th>
              <th className={getThClass('c')} onClick={() => handleSort('c')} title="Conscientiousness (Sorumluluk)">C <SortIcon columnKey="c" sortConfig={sortConfig} /></th>
              <th className={getThClass('e')} onClick={() => handleSort('e')} title="Extraversion (Dışa Dönüklük)">E <SortIcon columnKey="e" sortConfig={sortConfig} /></th>
              <th className={getThClass('a')} onClick={() => handleSort('a')} title="Agreeableness (Uyumluluk)">A <SortIcon columnKey="a" sortConfig={sortConfig} /></th>
              <th className={getThClass('n')} onClick={() => handleSort('n')} title="Neuroticism (Duygusal Denge)">N <SortIcon columnKey="n" sortConfig={sortConfig} /></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {paginatedCandidates.map((c) => (
              <tr key={c.id} onClick={() => router.push('/tasarim')} className="hover:bg-slate-50/80 transition-colors group cursor-pointer">
                <td className={getTdClass('name')}>
                  <div className="flex items-center gap-2">
                    <button className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors" title="İncele">
                      <Search size={14} />
                    </button>
                    <span className="text-sm font-semibold text-slate-700 group-hover:text-indigo-600 transition-colors">{c.name}</span>
                  </div>
                </td>
                <td className={getTdClass('date', 'text-xs font-medium text-slate-500')}>{c.date}</td>
                <td className={getTdClass('stage')}>
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-bold border transition-all hover:scale-105 cursor-default ${getStageStyles(c.stage)}`}>
                    {c.stage}
                  </span>
                </td>
                <td className={getTdClass('match')}>
                  <MatchScoreBadge score={c.match} />
                </td>
                <td className={getTdClass('o')}><SkillBadge score={c.ocean.o} mode={displayMode} /></td>
                <td className={getTdClass('c')}><SkillBadge score={c.ocean.c} mode={displayMode} /></td>
                <td className={getTdClass('e')}><SkillBadge score={c.ocean.e} mode={displayMode} /></td>
                <td className={getTdClass('a')}><SkillBadge score={c.ocean.a} mode={displayMode} /></td>
                <td className={getTdClass('n')}><SkillBadge score={c.ocean.n} mode={displayMode} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination
        page={page}
        totalPages={Math.ceil(initialCandidates.length / rowsPerPage)}
        onPageChange={setPage}
        rowsPerPage={rowsPerPage}
        onRowsChange={(val: number) => { setRowsPerPage(val); setPage(1); }}
        rowsOptions={[5, 10, 20]}
      />
    </div>
  );
}
