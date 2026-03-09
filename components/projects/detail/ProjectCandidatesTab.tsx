'use client';
import React, { useState, useMemo } from 'react';
import { Search, Upload, Plus, Edit2, Copy, Check, ChevronDown, ChevronUp, ArrowRight, X, Clock, Calendar, FileText, CheckCircle2, AlertCircle } from 'lucide-react';
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
      { id: 't1', name: 'OCEAN Kişilik Envanteri', type: 'Envanter', status: 'Tamamlandı', score: 61, accessCode: 'AQG2AX', startTime: '10.09.2024 10:00', endTime: '10.09.2024 10:45', duration: '45dk' },
      { id: 't2', name: 'Çalışma Değerleri Envanteri', type: 'Envanter', status: 'Tamamlandı', score: 50, accessCode: '5GZEU4', startTime: '10.09.2024 11:00', endTime: '10.09.2024 11:20', duration: '20dk' },
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
      { id: 't1', name: 'OCEAN Kişilik Envanteri', type: 'Envanter', status: 'Tamamlandı', score: 98, accessCode: 'B8X9YZ', startTime: '12.09.2024 14:00', endTime: '12.09.2024 14:30', duration: '30dk' }
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

  let colorClass = "text-emerald-700 bg-emerald-50 border-emerald-100";
  if (score < 50) {
    colorClass = "text-rose-700 bg-rose-50 border-rose-100";
  } else if (score < 80) {
    colorClass = "text-amber-700 bg-amber-50 border-amber-100";
  }

  return (
    <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border ${colorClass}`}>
      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 12a9 9 0 1 1-9-9" />
      </svg>
      {score}%
    </div>
  );
}

function SkillBadge({ score, mode }: { score: number, mode: 'level' | 'score' }) {
  let level = 'Low';
  if (score >= 80) level = 'High';
  else if (score >= 50) level = 'Medium';

  if (mode === 'score') {
    let colorClass = "text-emerald-700 bg-emerald-50 border-emerald-100";
    if (score < 50) {
      colorClass = "text-rose-700 bg-rose-50 border-rose-100";
    } else if (score < 80) {
      colorClass = "text-amber-700 bg-amber-50 border-amber-100";
    }

    return (
      <div className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[11px] font-bold border ${colorClass}`}>
        {score}%
      </div>
    );
  }

  if (level === 'High') {
    return (
      <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-100">
        <CheckCircle2 size={12} />
        Yüksek
      </div>
    );
  }
  if (level === 'Medium') {
    return (
      <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[11px] font-bold text-amber-700 bg-amber-50 border border-amber-100">
        <AlertCircle size={12} />
        Orta
      </div>
    );
  }
  return (
    <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[11px] font-bold text-rose-700 bg-rose-50 border border-rose-100">
      <X size={12} />
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
      className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 hover:bg-indigo-50 hover:text-indigo-700 transition-colors text-[11px] font-mono font-bold group"
      title="Kodu Kopyala"
    >
      {code}
      {copied ? <Check size={11} className="text-emerald-600" /> : <Copy size={11} className="opacity-0 group-hover:opacity-100 transition-opacity" />}
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
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input
            type="text"
            placeholder="Aday ara..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
          />
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg text-xs font-bold hover:bg-slate-50 transition-colors">
            <Upload size={14} />
            CSV Yükle
          </button>
          <button className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3 py-2 bg-indigo-600 text-white rounded-lg text-xs font-bold hover:bg-indigo-700 transition-colors">
            <Plus size={14} />
            Aday Ekle
          </button>
        </div>
      </div>

      {/* Table Container */}
      <div className="flex-1 overflow-auto bg-white border border-slate-200 rounded-lg">
        <table className="w-full text-left border-collapse min-w-[1200px]">
          <thead className="sticky top-0 z-10">
            <tr className="border-b border-slate-200 bg-slate-50">
              <th colSpan={8} className="px-4 py-2 border-r border-slate-200"></th>
              <th colSpan={5} className="px-4 py-2 text-center">
                <div className="flex items-center justify-between">
                  <span className="flex-1 text-center text-[10px] font-bold text-indigo-600 uppercase tracking-wider">OCEAN Raporu</span>
                  <div className="flex bg-white p-0.5 rounded-md border border-slate-200">
                    <button
                      onClick={() => setDisplayMode('level')}
                      className={`px-2 py-0.5 text-[10px] font-bold rounded-sm transition-colors ${displayMode === 'level' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-500 hover:text-slate-700'}`}
                    >
                      Düzey
                    </button>
                    <button
                      onClick={() => setDisplayMode('score')}
                      className={`px-2 py-0.5 text-[10px] font-bold rounded-sm transition-colors ${displayMode === 'score' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-500 hover:text-slate-700'}`}
                    >
                      Skor
                    </button>
                  </div>
                </div>
              </th>
            </tr>
            <tr className="border-b border-slate-200 bg-slate-50/50">
              <th className="px-4 py-2.5 text-[10px] font-bold text-slate-500 uppercase tracking-wider w-[280px]">Ad Soyad</th>
              <th className="px-4 py-2.5 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Erişim Kodu</th>
              <th className="px-4 py-2.5 text-[10px] font-bold text-slate-500 uppercase tracking-wider">E-posta</th>
              <th className="px-4 py-2.5 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Telefon</th>
              <th className="px-4 py-2.5 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Başvuru Tarihi</th>
              <th className="px-4 py-2.5 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Aşama</th>
              <th className="px-4 py-2.5 text-[10px] font-bold text-slate-500 uppercase tracking-wider">İncele</th>
              <th className="px-4 py-2.5 text-[10px] font-bold text-slate-500 uppercase tracking-wider border-r border-slate-200">Uyum Skoru</th>
              <th className="px-4 py-2.5 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Deneyime Açıklık</th>
              <th className="px-4 py-2.5 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Sorumluluk</th>
              <th className="px-4 py-2.5 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Dışadönüklük</th>
              <th className="px-4 py-2.5 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Uyumluluk</th>
              <th className="px-4 py-2.5 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Duygusal Denge</th>
            </tr>
          </thead>
          <tbody>
            {filteredCandidates.map((candidate) => (
              <React.Fragment key={candidate.id}>
                <tr
                  className={`border-b border-slate-100 hover:bg-slate-50/60 transition-colors cursor-pointer ${expandedRows.has(candidate.id) ? 'bg-indigo-50/30' : ''}`}
                  onClick={() => toggleRow(candidate.id)}
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      <div className={`w-6 h-6 rounded-md flex items-center justify-center transition-colors shrink-0 ${expandedRows.has(candidate.id) ? 'bg-indigo-100 text-indigo-600' : 'bg-slate-100 text-slate-400'}`}>
                        {expandedRows.has(candidate.id) ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                      </div>
                      <span className="text-[13px] font-semibold text-slate-800">{candidate.name}</span>
                      <button
                        className="p-1 text-slate-300 hover:text-indigo-600 hover:bg-indigo-50 rounded transition-colors ml-auto"
                        onClick={(e) => { e.stopPropagation(); }}
                        title="Düzenle"
                      >
                        <Edit2 size={13} />
                      </button>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <CopyableCode code={candidate.accessCode} />
                  </td>
                  <td className="px-4 py-3 text-[12px] text-slate-500">{candidate.email}</td>
                  <td className="px-4 py-3 text-[12px] text-slate-500">{candidate.phone}</td>
                  <td className="px-4 py-3 text-[12px] font-medium text-slate-500">{candidate.date}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold border ${getStageStyles(candidate.stage)}`}>
                      {candidate.stage}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <button
                      className="px-2.5 py-1 bg-indigo-50 text-indigo-700 text-[11px] font-bold rounded-md hover:bg-indigo-100 transition-colors border border-indigo-100"
                      onClick={(e) => { e.stopPropagation(); }}
                    >
                      İncele
                    </button>
                  </td>
                  <td className="px-4 py-3 border-r border-slate-100">
                    <MatchScoreBadge score={candidate.match} />
                  </td>
                  <td className="px-4 py-3"><SkillBadge score={candidate.ocean.o} mode={displayMode} /></td>
                  <td className="px-4 py-3"><SkillBadge score={candidate.ocean.c} mode={displayMode} /></td>
                  <td className="px-4 py-3"><SkillBadge score={candidate.ocean.e} mode={displayMode} /></td>
                  <td className="px-4 py-3"><SkillBadge score={candidate.ocean.a} mode={displayMode} /></td>
                  <td className="px-4 py-3"><SkillBadge score={candidate.ocean.n} mode={displayMode} /></td>
                </tr>

                {expandedRows.has(candidate.id) && (
                  <tr>
                    <td colSpan={13} className="p-0">
                      <div className="bg-slate-50/80 border-b border-slate-200">
                        <div className="px-6 py-4">
                          {candidate.tests.length > 0 ? (
                            <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
                              {/* Test Table Header */}
                              <div className="grid grid-cols-12 gap-0 px-4 py-2.5 bg-slate-50 border-b border-slate-200 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                                <div className="col-span-3">Test / Envanter</div>
                                <div className="col-span-1">Tür</div>
                                <div className="col-span-1">Durum</div>
                                <div className="col-span-2">Başlangıç</div>
                                <div className="col-span-2">Bitiş</div>
                                <div className="col-span-1">Süre</div>
                                <div className="col-span-1">Erişim Kodu</div>
                                <div className="col-span-1 text-right">Puan</div>
                              </div>

                              {/* Test Rows */}
                              {candidate.tests.map((test, idx) => {
                                const isCompleted = test.status === 'Tamamlandı';
                                const isPending = test.status === 'Bekliyor' || test.status === 'Başlanmamış';

                                return (
                                  <div
                                    key={test.id}
                                    className={`grid grid-cols-12 gap-0 px-4 py-3 items-center transition-colors group cursor-pointer hover:bg-slate-50/50 ${idx < candidate.tests.length - 1 ? 'border-b border-slate-100' : ''} ${isPending ? 'opacity-60' : ''}`}
                                    onClick={() => setSelectedTest({ candidateName: candidate.name, ...test })}
                                  >
                                    <div className="col-span-3 flex items-center gap-2.5">
                                      <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-[11px] font-bold shrink-0 ${isCompleted
                                        ? test.type === 'Envanter'
                                          ? 'bg-emerald-100 text-emerald-700'
                                          : 'bg-purple-100 text-purple-700'
                                        : 'bg-slate-100 text-slate-400'
                                        }`}>
                                        {isCompleted ? <CheckCircle2 size={14} /> : <span>{idx + 1}</span>}
                                      </div>
                                      <span className={`text-[12px] font-semibold truncate pr-3 ${isPending ? 'text-slate-400' : 'text-slate-800'}`}>{test.name}</span>
                                    </div>

                                    <div className="col-span-1">
                                      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md border ${test.type === 'Envanter'
                                        ? 'bg-emerald-50 text-emerald-700 border-emerald-100'
                                        : test.type === 'Değerlendirme'
                                          ? 'bg-purple-50 text-purple-700 border-purple-100'
                                          : 'bg-slate-50 text-slate-600 border-slate-200'
                                        }`}>
                                        {test.type}
                                      </span>
                                    </div>

                                    <div className="col-span-1">
                                      <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-1.5 py-0.5 rounded-md border ${isCompleted
                                        ? 'bg-emerald-50 text-emerald-700 border-emerald-100'
                                        : 'bg-slate-50 text-slate-500 border-slate-200'
                                        }`}>
                                        {isCompleted ? <CheckCircle2 size={10} /> : <Clock size={10} />}
                                        {test.status}
                                      </span>
                                    </div>

                                    <div className="col-span-2 flex items-center gap-1.5">
                                      <Calendar size={12} className="text-slate-300 shrink-0" />
                                      <span className={`text-[11px] font-medium ${isPending ? 'text-slate-300' : 'text-slate-600'}`}>{test.startTime}</span>
                                    </div>

                                    <div className="col-span-2 flex items-center gap-1.5">
                                      <Calendar size={12} className="text-slate-300 shrink-0" />
                                      <span className={`text-[11px] font-medium ${isPending ? 'text-slate-300' : 'text-slate-600'}`}>{test.endTime}</span>
                                    </div>

                                    <div className="col-span-1">
                                      <span className={`text-[11px] font-bold ${isPending ? 'text-slate-300' : 'text-slate-700'}`}>{test.duration}</span>
                                    </div>

                                    <div className="col-span-1">
                                      <CopyableCode code={test.accessCode} />
                                    </div>

                                    <div className="col-span-1 flex items-center justify-end gap-2">
                                      <MatchScoreBadge score={test.score} />
                                      <ArrowRight size={14} className="text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          ) : (
                            <div className="bg-white rounded-lg border border-dashed border-slate-200 p-8 text-center flex flex-col items-center justify-center">
                              <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-slate-400 mb-3">
                                <FileText size={20} />
                              </div>
                              <p className="text-sm font-medium text-slate-500 mb-3">Bu adaya henüz test veya envanter atanmamış.</p>
                              <button className="px-3 py-1.5 bg-indigo-50 text-indigo-700 text-xs font-bold rounded-lg hover:bg-indigo-100 transition-colors border border-indigo-100">
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
          <Dialog.Content className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border border-slate-200 bg-white p-6 sm:rounded-xl duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]">
            <div className="flex flex-col space-y-1.5 text-center sm:text-left pr-6">
              <Dialog.Title className="text-lg font-bold text-slate-900">{selectedTest?.name}</Dialog.Title>
              <Dialog.Description className="text-sm text-slate-500">
                {selectedTest?.candidateName} adayının test sonuçları.
              </Dialog.Description>
            </div>

            <div className="py-4 flex flex-col gap-3">
              <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-100 flex justify-between items-center">
                <span className="text-sm font-medium text-slate-600">Durum:</span>
                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-bold border ${selectedTest?.status === 'Tamamlandı' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-slate-50 text-slate-600 border-slate-200'}`}>
                  {selectedTest?.status === 'Tamamlandı' && <CheckCircle2 size={12} />}
                  {selectedTest?.status}
                </span>
              </div>
              <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-100 flex justify-between items-center">
                <span className="text-sm font-medium text-slate-600">Uyum Skoru:</span>
                <MatchScoreBadge score={selectedTest?.score} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-100">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Başlangıç</div>
                  <div className="text-sm font-medium text-slate-700 flex items-center gap-1.5">
                    <Calendar size={13} className="text-slate-400" />
                    {selectedTest?.startTime}
                  </div>
                </div>
                <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-100">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Bitiş</div>
                  <div className="text-sm font-medium text-slate-700 flex items-center gap-1.5">
                    <Calendar size={13} className="text-slate-400" />
                    {selectedTest?.endTime}
                  </div>
                </div>
              </div>
              <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-100 flex justify-between items-center">
                <span className="text-sm font-medium text-slate-600">Erişim Kodu:</span>
                <CopyableCode code={selectedTest?.accessCode || ''} />
              </div>

              {selectedTest?.status === 'Tamamlandı' && (
                <div className="mt-2 p-3.5 bg-indigo-50 border border-indigo-100 rounded-lg text-sm text-indigo-700">
                  Detaylı rapor ve soru bazlı analizler yakında eklenecektir.
                </div>
              )}
            </div>

            <Dialog.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-white transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2">
              <X className="h-4 w-4" />
              <span className="sr-only">Kapat</span>
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}
