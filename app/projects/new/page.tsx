'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Check, ArrowLeft, ArrowRight, X } from 'lucide-react';
import Step1BasicInfo from '@/components/projects/new/Step1BasicInfo';
import Step2Inventory from '@/components/projects/new/Step2Inventory';
import Step3TestSelection from '@/components/projects/new/Step3TestSelection';
import Step4Settings from '@/components/projects/new/Step4Settings';
import Step5Preview from '@/components/projects/new/Step5Preview';

const mockInventories = [
  {
    id: 'inv1',
    title: 'OCEAN Kişilik Envanteri',
    type: 'Kişilik Envanteri',
    typeColor: 'bg-purple-100 text-purple-700',
    desc: 'Beş Faktör Kişilik Modeli (OCEAN/Big Five) bazlı kapsamlı kişilik envanteri. 5 boyut (Deneyime Açıklık, Sorumluluk, Dışadönüklük, Uyumluluk, Duygusal Dengesizlik), 30 alt boyut, 90 kişilik özelliği...',
    items: 90,
    time: 20,
    scales: 30
  },
  {
    id: 'inv2',
    title: 'Çalışma Değerleri Envanteri',
    type: 'Çalışma Değerleri',
    typeColor: 'bg-teal-100 text-teal-700',
    desc: 'Bu envanter MaxDiff (Best-Worst Scaling) tasarımıyla çalışma değerlerini ölçer. 8 üst değer, 24 alt değer, 42 set, 168 benzersiz ifadeden oluşur. Her alt değer 7 farklı ifadeyle 7 kez...',
    items: 168,
    time: 20,
    scales: 24
  }
];

const mockTestCategories = [
  {
    id: 'cat1', title: 'Sayısal Yetenek', count: 21, tests: [
      { id: 't4', title: 'Sayısal Yetenek — Giriş Seviye', level: 'Giriş Seviye', levelColor: 'bg-emerald-100 text-emerald-700', questions: 10, time: 15, passRate: 50, easyCount: 5, mediumCount: 3, hardCount: 2 },
    ]
  },
  { id: 'cat2', title: 'Sözel Yetenek', count: 20, tests: [] },
  { id: 'cat3', title: 'Mantıksal & Akıl Yürütme', count: 29, tests: [] },
  {
    id: 'cat4', title: 'Eleştirel Düşünme', count: 10,
    tests: [
      { id: 't1', title: 'Eleştirel Düşünme / Bilgi Yorumlama — Giriş Seviye', level: 'Giriş Seviye', levelColor: 'bg-emerald-100 text-emerald-700', questions: 4, time: 8, passRate: 50, easyCount: 2, mediumCount: 2, hardCount: 0 },
      { id: 't2', title: 'Eleştirel Düşünme — Giriş Seviye', level: 'Giriş Seviye', levelColor: 'bg-emerald-100 text-emerald-700', questions: 4, time: 8, passRate: 50, easyCount: 3, mediumCount: 1, hardCount: 0 },
      { id: 't3', title: 'Eleştirel Düşünme — Orta Seviye', level: 'Orta Seviye', levelColor: 'bg-blue-100 text-blue-700', questions: 6, time: 12, passRate: 60, easyCount: 1, mediumCount: 3, hardCount: 2 },
    ]
  }
];

export default function NewCustomProjectPage() {
  const router = useRouter();
  const [customStep, setCustomStep] = useState<number>(1);
  const [selectedInventories, setSelectedInventories] = useState<Set<string>>(new Set());
  const [selectedTests, setSelectedTests] = useState<any[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('cat4');
  const [detailTest, setDetailTest] = useState<any | null>(null);
  const [editTest, setEditTest] = useState<any | null>(null);

  const toggleInventory = (id: string) => {
    const newSet = new Set(selectedInventories);
    if (newSet.has(id)) newSet.delete(id);
    else newSet.add(id);
    setSelectedInventories(newSet);
  };

  const addTest = (test: any) => {
    if (!selectedTests.find(t => t.id === test.id)) {
      setSelectedTests([...selectedTests, test]);
    }
  };

  const removeTest = (id: string) => {
    setSelectedTests(selectedTests.filter(t => t.id !== id));
  };

  const moveTest = (index: number, direction: number) => {
    const newTests = [...selectedTests];
    const temp = newTests[index];
    newTests[index] = newTests[index + direction];
    newTests[index + direction] = temp;
    setSelectedTests(newTests);
  };

  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [positionLevel, setPositionLevel] = useState<string>('');
  const [sector, setSector] = useState<string>('');

  const [settings, setSettings] = useState({
    soruSunumu: 'tek',
    sayfaBasinaSoru: 5,
    sorulariKaristir: true,
    secenekleriKaristir: true,
    geriDonuseIzinVer: true,

    sureAyari: 'bolum',

    soruSeti: 'farkli',

    adayaSonuclariGoster: true,
    bolumArasiSonuclariGoster: false,
    dogruCevaplariGoster: false,
    bolumTanitimEkraniGoster: true,
    bolumlerArasiGeriDonuseIzinVer: false,

    sekmeDegistirmeAlgilama: true,
    kopyalamaEngelleme: true,
    ekranGoruntusuAlgilama: true,
    yapistirmaAlgilama: true,
    tamEkranZorunlulugu: true,
    gelistiriciAraclariAlgilama: true,
    kameraMikrofonGozetimi: true,
    asamaBazliGozetim: true,
    kvkkRizasiZorunlu: false,
    gozetimVerisiSaklamaSuresi: 30
  });

  const customSteps = ['Temel Bilgiler', 'Envanterler', 'Testler', 'Ayarlar', 'Önizleme'];

  return (
    <div className="flex flex-col h-screen w-full bg-[#F8F9FC] font-sans">
      {/* Header & Progress Bar */}
      <div className="px-6 h-[54px] flex items-center bg-white border-b border-slate-200 shrink-0 relative z-20">
        <div className="w-full mx-auto flex items-center justify-between gap-4">
          {/* Left */}
          <div className="flex items-center gap-2 text-xs font-medium text-slate-500 w-[140px] lg:w-[220px] shrink-0">
            <button onClick={() => router.push('/projects')} className="hover:text-slate-900 transition-colors flex items-center gap-1">
              <ArrowLeft size={14} /> Geri
            </button>
            <div className="w-px h-3 bg-slate-300 mx-1"></div>
            <span className="text-slate-900 font-bold hidden lg:inline whitespace-nowrap">Özel Proje Oluştur</span>
          </div>

          {/* Center - Progress Bar */}
          <div className="hidden md:flex items-start justify-center flex-1 max-w-lg px-4 -mt-3.5">
            {customSteps.map((label, idx) => {
              const stepNum = idx + 1;
              const isActive = customStep === stepNum;
              const isPast = customStep > stepNum;
              return (
                <React.Fragment key={label}>
                  <button
                    onClick={() => setCustomStep(stepNum)}
                    className="relative flex flex-col items-center group px-2"
                  >
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold transition-all duration-300 z-10 ${isActive ? 'bg-indigo-600 text-white shadow-sm ring-2 ring-indigo-50' :
                      isPast ? 'bg-indigo-600 text-white' :
                        'bg-white text-slate-400 border border-slate-300 group-hover:border-indigo-300'
                      }`}>
                      {isPast ? <Check size={10} strokeWidth={3} /> : stepNum}
                    </div>
                    <span className={`absolute top-7 w-20 text-center leading-tight text-[10px] break-words transition-colors ${isActive ? 'text-indigo-600 font-bold' : isPast ? 'text-slate-700 font-medium' : 'text-slate-400 font-medium group-hover:text-slate-600'
                      }`}>
                      {label}
                    </span>
                  </button>
                  {idx < customSteps.length - 1 && (
                    <div className="flex-1 h-px mt-2.5 mx-0.5 bg-slate-200 relative">
                      <div className={`absolute left-0 top-0 bottom-0 bg-indigo-600 transition-all duration-500 ${isPast ? 'w-full' : 'w-0'}`}></div>
                    </div>
                  )}
                </React.Fragment>
              )
            })}
          </div>

          {/* Right */}
          <div className="w-[140px] lg:w-[220px] shrink-0 hidden md:block"></div>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-hidden">
        <div className="h-full overflow-y-auto p-4 sm:p-8 flex justify-center">
          <div className="w-full max-w-7xl h-full flex flex-col">
            {customStep === 1 && (
              <Step1BasicInfo
                startDate={startDate}
                setStartDate={setStartDate}
                endDate={endDate}
                setEndDate={setEndDate}
                sector={sector}
                setSector={setSector}
                positionLevel={positionLevel}
                setPositionLevel={setPositionLevel}
              />
            )}

            {customStep === 2 && (
              <Step2Inventory
                mockInventories={mockInventories}
                selectedInventories={selectedInventories}
                toggleInventory={toggleInventory}
              />
            )}

            {customStep === 3 && (
              <Step3TestSelection
                mockTestCategories={mockTestCategories}
                activeCategory={activeCategory}
                setActiveCategory={setActiveCategory}
                selectedTests={selectedTests}
                addTest={addTest}
                removeTest={removeTest}
                moveTest={moveTest}
                setDetailTest={setDetailTest}
                setEditTest={setEditTest}
              />
            )}

            {customStep === 4 && (
              <Step4Settings
                settings={settings}
                setSettings={setSettings}
              />
            )}

            {customStep === 5 && (
              <Step5Preview
                selectedInventories={selectedInventories}
                mockInventories={mockInventories}
                selectedTests={selectedTests}
                settings={settings}
                sector={sector}
                positionLevel={positionLevel}
              />
            )}
          </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="px-6 py-4 bg-white border-t border-slate-200 shrink-0">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <button
            onClick={() => customStep > 1 ? setCustomStep(customStep - 1) : router.push('/projects')}
            className="flex items-center gap-2 text-slate-600 hover:text-slate-900 font-bold px-4 py-2.5 rounded-lg hover:bg-slate-50 transition-colors text-sm"
          >
            <ArrowLeft size={16} /> Geri
          </button>
          <button
            onClick={() => customStep < 5 ? setCustomStep(customStep + 1) : router.push('/projects')}
            className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-2.5 rounded-lg font-bold hover:bg-indigo-700 transition-colors text-sm shadow-sm"
          >
            {customStep === 5 ? 'Tamamla' : 'İleri'} <ArrowRight size={16} />
          </button>
        </div>
      </div>

      {/* Detail Modal */}
      {detailTest && (
        <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-5 border-b border-slate-100 flex justify-between items-start bg-slate-50/50">
              <div>
                <h2 className="text-lg font-bold text-slate-900 mb-1">{detailTest.title}</h2>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${detailTest.levelColor}`}>{detailTest.level}</span>
              </div>
              <button onClick={() => setDetailTest(null)} className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
                <X size={18} />
              </button>
            </div>
            <div className="p-5 overflow-y-auto">
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-center">
                  <div className="text-2xl font-black text-indigo-600 mb-1">{detailTest.questions}</div>
                  <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Soru Sayısı</div>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-center">
                  <div className="text-2xl font-black text-indigo-600 mb-1">{detailTest.time}</div>
                  <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Süre (Dk)</div>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-center">
                  <div className="text-2xl font-black text-indigo-600 mb-1">%{detailTest.passRate}</div>
                  <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Geçme Notu</div>
                </div>
              </div>

              <h3 className="font-bold text-slate-900 text-sm mb-3">Zorluk Dağılımı</h3>
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-16 text-xs font-bold text-slate-600">Kolay</div>
                  <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${(detailTest.easyCount / detailTest.questions) * 100}%` }}></div>
                  </div>
                  <div className="w-8 text-right text-xs font-bold text-slate-900">{detailTest.easyCount}</div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-16 text-xs font-bold text-slate-600">Orta</div>
                  <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-amber-500 rounded-full" style={{ width: `${(detailTest.mediumCount / detailTest.questions) * 100}%` }}></div>
                  </div>
                  <div className="w-8 text-right text-xs font-bold text-slate-900">{detailTest.mediumCount}</div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-16 text-xs font-bold text-slate-600">Zor</div>
                  <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-rose-500 rounded-full" style={{ width: `${(detailTest.hardCount / detailTest.questions) * 100}%` }}></div>
                  </div>
                  <div className="w-8 text-right text-xs font-bold text-slate-900">{detailTest.hardCount}</div>
                </div>
              </div>

              <h3 className="font-bold text-slate-900 text-sm mb-2">Açıklama</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Bu test adayların eleştirel düşünme ve bilgi yorumlama becerilerini ölçmek için tasarlanmıştır. Verilen metinleri, grafikleri veya tabloları analiz etme, mantıksal çıkarımlar yapma ve doğru sonuçlara ulaşma yeteneklerini değerlendirir.
              </p>
            </div>
            <div className="p-5 border-t border-slate-100 flex justify-end gap-3 bg-slate-50/50">
              <button onClick={() => setDetailTest(null)} className="px-4 py-2 text-sm font-bold text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">Kapat</button>
              <button
                onClick={() => { addTest(detailTest); setDetailTest(null); }}
                className="px-4 py-2 text-sm font-bold bg-indigo-600 text-white hover:bg-indigo-700 rounded-lg transition-colors shadow-sm"
              >
                Projeye Ekle
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editTest && (
        <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden flex flex-col">
            <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <h2 className="text-base font-bold text-slate-900">Bölümü Düzenle</h2>
              <button onClick={() => setEditTest(null)} className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
                <X size={18} />
              </button>
            </div>
            <div className="p-5 space-y-5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Bölüm Adı</label>
                <input type="text" defaultValue={editTest.title} className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Soru Sayısı</label>
                  <input type="number" defaultValue={editTest.questions} className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Süre (Dakika)</label>
                  <input type="number" defaultValue={editTest.time} className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Geçme Notu (%)</label>
                <div className="flex items-center gap-3">
                  <input type="range" min="0" max="100" defaultValue={editTest.passRate} className="flex-1 accent-indigo-600" />
                  <span className="text-sm font-bold text-slate-900 w-8 text-right">%{editTest.passRate}</span>
                </div>
              </div>
            </div>
            <div className="p-5 border-t border-slate-100 flex justify-end gap-3 bg-slate-50/50">
              <button onClick={() => setEditTest(null)} className="px-4 py-2 text-sm font-bold text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">İptal</button>
              <button
                onClick={() => setEditTest(null)}
                className="px-4 py-2 text-sm font-bold bg-indigo-600 text-white hover:bg-indigo-700 rounded-lg transition-colors shadow-sm"
              >
                Kaydet
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
