import React from 'react';
import { Search, List, Clock, Target, ChevronUp, ChevronDown, Edit2, Trash2 } from 'lucide-react';

interface Step3TestSelectionProps {
  mockTestCategories: any[];
  activeCategory: string;
  setActiveCategory: (id: string) => void;
  selectedTests: any[];
  addTest: (test: any) => void;
  removeTest: (id: string) => void;
  moveTest: (index: number, direction: number) => void;
  setDetailTest: (test: any) => void;
  setEditTest: (test: any) => void;
}

export default function Step3TestSelection({
  mockTestCategories,
  activeCategory,
  setActiveCategory,
  selectedTests,
  addTest,
  removeTest,
  moveTest,
  setDetailTest,
  setEditTest
}: Step3TestSelectionProps) {
  return (
    <div className="flex flex-col lg:flex-row h-full gap-4">
      {/* Column 1: Categories */}
      <div className="w-full lg:w-64 bg-white rounded-xl border border-slate-200 flex flex-col overflow-hidden shrink-0">
        <div className="p-4 border-b border-slate-100 bg-slate-50/50">
          <h3 className="font-bold text-slate-900 text-sm">Kategoriler</h3>
        </div>
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {mockTestCategories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors text-left ${activeCategory === cat.id
                  ? 'bg-indigo-50 text-indigo-700 font-bold'
                  : 'text-slate-600 hover:bg-slate-50 font-medium'
                }`}
            >
              <span className="text-xs truncate pr-2">{cat.title}</span>
              <span className={`text-[10px] px-2 py-0.5 rounded-full shrink-0 ${activeCategory === cat.id ? 'bg-indigo-100 text-indigo-700' : 'bg-slate-100 text-slate-500'
                }`}>
                {cat.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Column 2: Tests in Category */}
      <div className="flex-[2] bg-white rounded-xl border border-slate-200 flex flex-col overflow-hidden">
        <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
          <h3 className="font-bold text-slate-900 text-sm">
            {mockTestCategories.find(c => c.id === activeCategory)?.title} Testleri
          </h3>
          <div className="relative w-48">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
            <input type="text" placeholder="Test ara..." className="w-full pl-8 pr-3 py-1.5 bg-white border border-slate-200 rounded-md text-xs focus:ring-2 focus:ring-indigo-500 outline-none" />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {mockTestCategories.find(c => c.id === activeCategory)?.tests?.map((test: any) => (
            <div key={test.id} className="bg-white border border-slate-200 rounded-xl p-3 hover:border-indigo-300 transition-all flex flex-col gap-2.5 group">
              <div className="flex justify-between items-start">
                <h4 className="font-bold text-slate-900 text-sm leading-tight pr-2">{test.title}</h4>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => setDetailTest(test)}
                    className="text-indigo-600 text-[11px] font-bold hover:text-indigo-700 transition-colors underline underline-offset-2"
                  >
                    Detayı Gör
                  </button>
                  <button
                    onClick={() => addTest(test)}
                    className="bg-indigo-50 text-indigo-600 px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-indigo-100 transition-colors flex items-center gap-1"
                  >
                    Ekle
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${test.levelColor}`}>{test.level}</span>
                <div className="flex gap-1">
                  <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded" title="Kolay">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div> {test.easyCount || 0}
                  </span>
                  <span className="flex items-center gap-1 text-[10px] font-bold text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded" title="Orta">
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-500"></div> {test.mediumCount || 0}
                  </span>
                  <span className="flex items-center gap-1 text-[10px] font-bold text-rose-600 bg-rose-50 px-1.5 py-0.5 rounded" title="Zor">
                    <div className="w-1.5 h-1.5 rounded-full bg-rose-500"></div> {test.hardCount || 0}
                  </span>
                </div>
                <div className="w-px h-3 bg-slate-200 mx-0.5"></div>
                <div className="flex items-center gap-2 text-[10px] font-medium text-slate-500">
                  <span className="flex items-center gap-1"><List size={12} className="text-slate-400" /> {test.questions} soru</span>
                  <span className="flex items-center gap-1"><Clock size={12} className="text-slate-400" /> {test.time} dk</span>
                  <span className="flex items-center gap-1"><Target size={12} className="text-slate-400" /> %{test.passRate}</span>
                </div>
              </div>
            </div>
          )) || (
              <div className="h-full flex flex-col items-center justify-center text-slate-400 text-xs">
                Bu kategoride henüz test bulunmuyor.
              </div>
            )}
        </div>
      </div>

      {/* Column 3: Selected Tests */}
      <div className="flex-[1.5] bg-white rounded-xl border border-slate-200 flex flex-col overflow-hidden">
        <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
          <h3 className="font-bold text-slate-900 text-sm">Bölümler ({selectedTests.length})</h3>
          <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded-md">
            {selectedTests.reduce((acc, t) => acc + t.questions, 0)} Soru • {selectedTests.reduce((acc, t) => acc + t.time, 0)} dk
          </span>
        </div>
        <div className="flex-1 overflow-y-auto p-3">
          {selectedTests.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center">
              <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center mb-3">
                <List size={20} className="text-slate-300" />
              </div>
              <p className="text-xs font-medium text-slate-600 mb-1">Henüz test seçilmedi</p>
              <p className="text-[10px] text-slate-400">Orta panelden test seçerek değerlendirmenizi oluşturun</p>
            </div>
          ) : (
            <div className="space-y-2">
              {selectedTests.map((test, index) => (
                <div key={test.id} className="p-3 rounded-lg border border-slate-200 bg-white flex flex-col gap-3 group relative">
                  <div className="flex items-start gap-2.5">
                    <div className="w-6 h-6 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center text-xs font-bold shrink-0">
                      {index + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-slate-900 text-sm leading-tight mb-1.5 pr-8">{test.title}</h4>
                      <div className="flex items-center gap-2 text-[11px] font-medium text-slate-500 flex-wrap">
                        <span className="flex items-center gap-1"><List size={12} /> {test.questions} soru</span>
                        <div className="w-1 h-1 rounded-full bg-slate-300"></div>
                        <span className="flex items-center gap-1"><Clock size={12} /> {test.time} dk</span>
                        <div className="w-1 h-1 rounded-full bg-slate-300"></div>
                        <span className="flex items-center gap-1"><Target size={12} /> %{test.passRate}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                    <button
                      onClick={() => moveTest(index, -1)}
                      disabled={index === 0}
                      className="p-1.5 text-slate-400 hover:text-indigo-600 disabled:opacity-30 disabled:hover:text-slate-400 transition-colors bg-slate-50 hover:bg-indigo-50 rounded"
                    >
                      <ChevronUp size={14} />
                    </button>
                    <button
                      onClick={() => moveTest(index, 1)}
                      disabled={index === selectedTests.length - 1}
                      className="p-1.5 text-slate-400 hover:text-indigo-600 disabled:opacity-30 disabled:hover:text-slate-400 transition-colors bg-slate-50 hover:bg-indigo-50 rounded"
                    >
                      <ChevronDown size={14} />
                    </button>
                    <div className="w-px h-4 bg-slate-200 mx-1"></div>
                    <button
                      onClick={() => setEditTest(test)}
                      className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded transition-colors"
                      title="Düzenle"
                    >
                      <Edit2 size={14} />
                    </button>
                    <button
                      onClick={() => removeTest(test.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded transition-colors"
                      title="Sil"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
