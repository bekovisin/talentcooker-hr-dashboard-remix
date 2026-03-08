'use client';
import React, { useState, useMemo } from 'react';
import { Search, Upload, Plus, Edit2, Copy, Check, ChevronDown, ChevronUp, ArrowRight, X, Clock, Calendar } from 'lucide-react';
import * as Dialog from '@radix-ui/react-dialog';

const mockCandidates = [
  {
    id: '1',
    name: 'Aynur Buse Tekeli',
    email: 'aynurbusetkl.07@icloud.com',
    phone: '5531551436',
    date: '10/09/2024',
    stage: 'Aşama 4: Mülakat',
    match: 61,
    accessCode: 'AQG2AX',
    ocean: { o: 45, c: 60, e: 55, a: 70, n: 30 },
    tests: [
      { id: 't1', name: 'OCEAN Kişilik Envanteri', type: 'Envanter', status: 'Tamamlandı', score: 61, accessCode: 'AQG2AX', startTime: '10:00', endTime: '10:45', duration: '45dk' },
      { id: 't2', name: 'Çalışma Değerleri Envanteri', type: 'Envanter', status: 'Tamamlandı', score: 50, accessCode: '5GZEU4', startTime: '11:00', endTime: '11:20', duration: '20dk' },
      { id: 't3', name: 'Mono Sigorta - Sağlık Sigortaları Danışmanı', type: 'Değerlendirme', status: 'Bekliyor', score: null, accessCode: 'WXPA7M', startTime: '-', endTime: '-', duration: '-' }
    ]
  },
  {
    id: '2',
    name: 'Derya Bal',
    email: 'deryabal1553@gmail.com',
    phone: '5447431553',
    date: '12/09/2024',
    stage: 'Aşama 3: Teknik Test',
    match: 98,
    accessCode: 'B8X9YZ',
    ocean: { o: 85, c: 90, e: 82, a: 88, n: 95 },
    tests: [
      { id: 't1', name: 'OCEAN Kişilik Envanteri', type: 'Envanter', status: 'Tamamlandı', score: 98, accessCode: 'B8X9YZ', startTime: '14:00', endTime: '14:30', duration: '30dk' }
    ]
  },
  {
    id: '3',
    name: 'Elif Barak',
    email: 'barakelif112@icloud.com',
    phone: '5437316189',
    date: '08/09/2024',
    stage: 'Aşama 1: Yeni Başvuru',
    match: 42,
    accessCode: 'C7M2KL',
    ocean: { o: 30, c: 85, e: 65, a: 90, n: 40 },
    tests: []
  }
];

function MatchScoreBadge({ score }: { score: number | null }) {
  if (score === null) return <span className="text-slate-400 text-xs font-medium">-</span>;
  
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
    <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${colorClass}`}>
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
      <circle cx="7" cy="7" r="7" fill="#10B981"/>
      <path d="M4 7L6 9L10 4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function MediumIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="7" cy="7" r="7" fill="#F59E0B"/>
      <path d="M4 7H10" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

function LowIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="7" cy="7" r="7" fill="#EF4444"/>
      <path d="M4.5 4.5L9.5 9.5M9.5 4.5L4.5 9.5" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
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

function CopyableCode({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button 
      onClick={handleCopy}
      className="inline-flex items-center gap-1.5 px-2 py-1 rounded bg-indigo-50 text-indigo-700 hover:bg-indigo-100 transition-colors text-xs font-bold group"
      title="Kodu Kopyala"
    >
      {code}
      {copied ? <Check size={12} className="text-emerald-600" /> : <Copy size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />}
    </button>
  );
}

export function ProjectCandidatesTab({ projectId }: { projectId: string }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());
  const [selectedTest, setSelectedTest] = useState<any>(null);
  const [displayMode, setDisplayMode] = useState<'level' | 'score'>('level');

  const toggleRow = (id: string) => {
    const newSet = new Set(expandedRows);
    if (newSet.has(id)) newSet.delete(id);
    else newSet.add(id);
    setExpandedRows(newSet);
  };

  const filteredCandidates = useMemo(() => {
    return mockCandidates.filter(c => 
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.email.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const getStageStyles = (stage: string) => {
    if (stage.includes('Yeni Başvuru')) return 'bg-sky-50 text-sky-700 border-sky-200';
    if (stage.includes('Değerlendirme')) return 'bg-purple-50 text-purple-700 border-purple-200';
    if (stage.includes('Teknik Test')) return 'bg-amber-50 text-amber-700 border-amber-200';
    if (stage.includes('Mülakat')) return 'bg-indigo-50 text-indigo-700 border-indigo-200';
    if (stage.includes('Teklif')) return 'bg-emerald-50 text-emerald-700 border-emerald-200';
    return 'bg-slate-50 text-slate-700 border-slate-200';
  };

  return (
    <div className="flex flex-col h-full bg-transparent">
      {/* Top Bar */}
      <div className="pb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shrink-0">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Aday ara..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all shadow-sm"
          />
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg text-sm font-bold hover:bg-slate-50 transition-colors shadow-sm">
            <Upload size={16} />
            CSV Yükle
          </button>
          <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-bold hover:bg-indigo-700 transition-colors shadow-sm">
            <Plus size={16} />
            Aday Ekle
          </button>
        </div>
      </div>

      {/* Table Container */}
      <div className="flex-1 overflow-auto bg-white border border-slate-200 rounded-lg shadow-sm">
        <table className="w-full text-left border-collapse min-w-[1200px]">
          <thead className="sticky top-0 z-10 bg-slate-50/80 shadow-sm backdrop-blur-sm">
            <tr className="border-b border-slate-100">
              <th colSpan={8} className="px-4 py-2 border-r border-slate-100"></th>
              <th colSpan={5} className="px-4 py-2 text-center text-[11px] font-bold text-indigo-600 uppercase tracking-wider bg-indigo-50/50 border-b-2 border-indigo-100">
                <div className="flex items-center justify-between">
                  <span className="flex-1 text-center">OCEAN Raporu</span>
                  <div className="flex bg-white p-0.5 rounded-lg border border-slate-200 shadow-sm">
                    <button 
                      onClick={() => setDisplayMode('level')}
                      className={`px-2 py-0.5 text-[10px] font-bold rounded transition-colors ${displayMode === 'level' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-500 hover:text-slate-700'}`}
                    >
                      Düzey
                    </button>
                    <button 
                      onClick={() => setDisplayMode('score')}
                      className={`px-2 py-0.5 text-[10px] font-bold rounded transition-colors ${displayMode === 'score' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-500 hover:text-slate-700'}`}
                    >
                      Skor
                    </button>
                  </div>
                </div>
              </th>
            </tr>
            <tr className="border-b border-slate-100 bg-slate-50/30">
              <th className="px-4 py-2.5 text-[10px] font-bold text-slate-500 uppercase tracking-wider w-[300px]">Ad Soyad</th>
              <th className="px-4 py-2.5 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Erişim Kodu</th>
              <th className="px-4 py-2.5 text-[10px] font-bold text-slate-500 uppercase tracking-wider">E-posta</th>
              <th className="px-4 py-2.5 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Telefon</th>
              <th className="px-4 py-2.5 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Başvuru Tarihi</th>
              <th className="px-4 py-2.5 text-[10px] font-bold text-slate-500 uppercase tracking-wider w-[250px]">Aşama</th>
              <th className="px-4 py-2.5 text-[10px] font-bold text-slate-500 uppercase tracking-wider">İncele</th>
              <th className="px-4 py-2.5 text-[10px] font-bold text-slate-500 uppercase tracking-wider border-r border-slate-100">Uyum Skoru</th>
              <th className="px-4 py-2.5 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Deneyime Açıklık</th>
              <th className="px-4 py-2.5 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Sorumluluk</th>
              <th className="px-4 py-2.5 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Dışadönüklük</th>
              <th className="px-4 py-2.5 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Uyumluluk</th>
              <th className="px-4 py-2.5 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Duygusal Denge</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {filteredCandidates.map((candidate) => (
              <React.Fragment key={candidate.id}>
                <tr 
                  className={`hover:bg-slate-50/80 transition-colors cursor-pointer ${expandedRows.has(candidate.id) ? 'bg-slate-50/50' : ''}`}
                  onClick={() => toggleRow(candidate.id)}
                >
                  <td className="px-4 py-2.5">
                    <div className="flex items-center gap-2">
                      <div className={`p-1 rounded-md transition-colors ${expandedRows.has(candidate.id) ? 'bg-indigo-100 text-indigo-600' : 'text-slate-400 hover:bg-slate-200'}`}>
                        {expandedRows.has(candidate.id) ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      </div>
                      <span className="text-sm font-semibold text-slate-700">{candidate.name}</span>
                      <button 
                        className="p-1 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded transition-colors ml-auto"
                        onClick={(e) => { e.stopPropagation(); }}
                        title="Düzenle"
                      >
                        <Edit2 size={14} />
                      </button>
                    </div>
                  </td>
                  <td className="px-4 py-2.5">
                    <CopyableCode code={candidate.accessCode} />
                  </td>
                  <td className="px-4 py-2.5 text-xs text-slate-600">{candidate.email}</td>
                  <td className="px-4 py-2.5 text-xs text-slate-600">{candidate.phone}</td>
                  <td className="px-4 py-2.5 text-xs font-medium text-slate-500">{candidate.date}</td>
                  <td className="px-4 py-2.5">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-bold border ${getStageStyles(candidate.stage)}`}>
                      {candidate.stage}
                    </span>
                  </td>
                  <td className="px-4 py-2.5">
                    <button 
                      className="px-3 py-1.5 bg-indigo-50 text-indigo-700 text-xs font-bold rounded-lg hover:bg-indigo-100 transition-colors"
                      onClick={(e) => { e.stopPropagation(); }}
                    >
                      İncele
                    </button>
                  </td>
                  <td className="px-4 py-2.5 border-r border-slate-50">
                    <MatchScoreBadge score={candidate.match} />
                  </td>
                  <td className="px-4 py-2.5"><SkillBadge score={candidate.ocean.o} mode={displayMode} /></td>
                  <td className="px-4 py-2.5"><SkillBadge score={candidate.ocean.c} mode={displayMode} /></td>
                  <td className="px-4 py-2.5"><SkillBadge score={candidate.ocean.e} mode={displayMode} /></td>
                  <td className="px-4 py-2.5"><SkillBadge score={candidate.ocean.a} mode={displayMode} /></td>
                  <td className="px-4 py-2.5"><SkillBadge score={candidate.ocean.n} mode={displayMode} /></td>
                </tr>

                {expandedRows.has(candidate.id) && (
                  <tr>
                    <td colSpan={13} className="p-0 bg-slate-50 border-b border-slate-200">
                      <div className="px-8 py-6">
                        <div className="flex flex-col gap-2">
                          {candidate.tests.length > 0 ? (
                            <>
                              <div className="flex items-center px-4 py-2">
                                <div className="w-[280px] text-[10px] font-bold text-slate-400 uppercase tracking-wider">Test Adı</div>
                                <div className="w-[120px] text-[10px] font-bold text-slate-400 uppercase tracking-wider">Tür</div>
                                <div className="w-[120px] text-[10px] font-bold text-slate-400 uppercase tracking-wider">Durum</div>
                                <div className="w-[100px] text-[10px] font-bold text-slate-400 uppercase tracking-wider">Başlangıç</div>
                                <div className="w-[100px] text-[10px] font-bold text-slate-400 uppercase tracking-wider">Bitiş</div>
                                <div className="w-[80px] text-[10px] font-bold text-slate-400 uppercase tracking-wider">Süre</div>
                                <div className="w-[120px] text-[10px] font-bold text-slate-400 uppercase tracking-wider">Erişim Kodu</div>
                                <div className="w-[100px] text-[10px] font-bold text-slate-400 uppercase tracking-wider">Uyum Puanı</div>
                                <div className="flex-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider text-right">İşlemler</div>
                              </div>
                              
                              {candidate.tests.map((test, idx) => {
                                let rowClass = "bg-white border-slate-200";
                                let iconClass = "bg-slate-100 text-slate-500";
                                let typeClass = "bg-slate-100 text-slate-600";
                                
                                if (test.status === 'Bekliyor' || test.status === 'Başlanmamış') {
                                  rowClass = "bg-slate-50 border-dashed border-slate-200 text-slate-400";
                                  iconClass = "bg-slate-100 text-slate-400";
                                  typeClass = "bg-slate-100 text-slate-400";
                                } else if (test.type === 'Envanter') {
                                  rowClass = "bg-emerald-50/30 border-emerald-100";
                                  iconClass = "bg-emerald-100 text-emerald-600";
                                  typeClass = "bg-emerald-100 text-emerald-700";
                                } else if (test.type === 'Değerlendirme') {
                                  rowClass = "bg-purple-50/30 border-purple-100";
                                  iconClass = "bg-purple-100 text-purple-600";
                                  typeClass = "bg-purple-100 text-purple-700";
                                }

                                return (
                                  <div key={test.id} className={`flex items-center px-4 py-3 rounded-xl border transition-colors ${rowClass}`}>
                                    <div className="w-[280px] flex items-center gap-3">
                                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${iconClass}`}>
                                        {idx + 1}
                                      </div>
                                      <span className={`text-sm font-bold truncate pr-4 ${test.status === 'Bekliyor' || test.status === 'Başlanmamış' ? 'text-slate-500' : 'text-slate-900'}`}>{test.name}</span>
                                    </div>
                                    <div className="w-[120px]">
                                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${typeClass}`}>
                                        {test.type}
                                      </span>
                                    </div>
                                    <div className="w-[120px]">
                                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-bold ${test.status === 'Tamamlandı' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'}`}>
                                        {test.status}
                                      </span>
                                    </div>
                                    <div className="w-[100px] flex items-center gap-1 text-xs font-medium text-slate-600">
                                      <Clock size={12} className="text-slate-400" />
                                      {test.startTime}
                                    </div>
                                    <div className="w-[100px] flex items-center gap-1 text-xs font-medium text-slate-600">
                                      <Clock size={12} className="text-slate-400" />
                                      {test.endTime}
                                    </div>
                                    <div className="w-[80px] text-xs font-bold text-slate-700">
                                      {test.duration}
                                    </div>
                                    <div className="w-[120px]">
                                      <CopyableCode code={test.accessCode} />
                                    </div>
                                    <div className="w-[100px]">
                                      <MatchScoreBadge score={test.score} />
                                    </div>
                                    <div className="flex-1 flex items-center justify-end gap-2">
                                      <button className="px-3 py-1.5 bg-white border border-slate-200 text-slate-700 text-xs font-bold rounded-lg hover:bg-slate-50 transition-colors">
                                        Yeniden Çöz
                                      </button>
                                      <button 
                                        className="px-3 py-1.5 bg-indigo-50 text-indigo-700 text-xs font-bold rounded-lg hover:bg-indigo-100 transition-colors"
                                        onClick={() => setSelectedTest({ candidateName: candidate.name, ...test })}
                                      >
                                        İncele
                                      </button>
                                    </div>
                                  </div>
                                );
                              })}
                            </>
                          ) : (
                            <div className="bg-white rounded-xl border border-slate-200 border-dashed p-8 text-center flex flex-col items-center justify-center">
                              <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 mb-3">
                                <Calendar size={24} />
                              </div>
                              <p className="text-sm font-medium text-slate-600">Bu adaya henüz test veya envanter atanmamış.</p>
                              <button className="mt-4 px-4 py-2 bg-indigo-50 text-indigo-700 text-xs font-bold rounded-lg hover:bg-indigo-100 transition-colors">
                                Test / Envanter Ata
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

      {/* Test Review Modal */}
      <Dialog.Root open={!!selectedTest} onOpenChange={(open) => !open && setSelectedTest(null)}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
          <Dialog.Content className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border border-slate-200 bg-white p-6 shadow-xl sm:rounded-xl duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]">
            <div className="flex flex-col space-y-1.5 text-center sm:text-left pr-6">
              <Dialog.Title className="text-lg font-bold text-slate-900">{selectedTest?.name}</Dialog.Title>
              <Dialog.Description className="text-sm text-slate-500">
                {selectedTest?.candidateName} adayının test sonuçları.
              </Dialog.Description>
            </div>
            
            <div className="py-4 flex flex-col gap-4">
              <div className="bg-slate-50 p-4 rounded-lg border border-slate-100 flex justify-between items-center">
                <span className="text-sm font-medium text-slate-600">Durum:</span>
                <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-bold ${selectedTest?.status === 'Tamamlandı' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'}`}>
                  {selectedTest?.status}
                </span>
              </div>
              <div className="bg-slate-50 p-4 rounded-lg border border-slate-100 flex justify-between items-center">
                <span className="text-sm font-medium text-slate-600">Uyum Skoru:</span>
                <MatchScoreBadge score={selectedTest?.score} />
              </div>
              <div className="bg-slate-50 p-4 rounded-lg border border-slate-100 flex justify-between items-center">
                <span className="text-sm font-medium text-slate-600">Erişim Kodu:</span>
                <CopyableCode code={selectedTest?.accessCode || ''} />
              </div>
              
              {selectedTest?.status === 'Tamamlandı' && (
                <div className="mt-4 p-4 bg-indigo-50 border border-indigo-100 rounded-lg text-sm text-indigo-700">
                  Detaylı rapor ve soru bazlı analizler yakında eklenecektir.
                </div>
              )}
            </div>

            <Dialog.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-white transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-slate-100 data-[state=open]:text-slate-500">
              <X className="h-4 w-4" />
              <span className="sr-only">Kapat</span>
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}
