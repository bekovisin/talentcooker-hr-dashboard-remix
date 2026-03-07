import React from 'react';
import { Building2, Briefcase, Hash, CheckCircle2, Clock, List, Target, Settings2, FileText, Check, AlertCircle, X } from 'lucide-react';

interface Step5PreviewProps {
  selectedInventories?: Set<string>;
  mockInventories?: any[];
  selectedTests?: any[];
  settings?: any;
  sector?: string;
  positionLevel?: string;
  projectName?: string;
  projectDesc?: string;
}

export default function Step5Preview({
  selectedInventories = new Set(),
  mockInventories = [],
  selectedTests = [],
  settings = {},
  sector = 'Finans & Bankacılık',
  positionLevel = 'Yönetici',
  projectName = 'Yeni İşe Alım Projesi',
  projectDesc = 'Bu proje, adayların yetkinliklerini ve kişilik özelliklerini değerlendirmek amacıyla oluşturulmuştur.'
}: Step5PreviewProps) {

  const inventories = mockInventories.filter(inv => selectedInventories.has(inv.id));

  // If no data is selected, use mock data to show the design
  const displayInventories = inventories.length > 0 ? inventories : [
    { id: '1', title: 'Çalışma Değerleri Envanteri', type: 'Çalışma Değerleri', items: 168, time: 20, typeColor: 'bg-teal-100 text-teal-700' },
    { id: '2', title: 'OCEAN Kişilik Envanteri', type: 'Kişilik Envanteri', items: 90, time: 20, typeColor: 'bg-purple-100 text-purple-700' }
  ];

  const displayTests = selectedTests.length > 0 ? selectedTests : [
    { id: '1', title: 'Sözel Yetenek / Okuma Anlama — İleri Seviye', desc: 'Sözel Yetenek > Okuma Anlama alt modülü için ileri seviye değerlendirme testi.', questions: 8, time: 16 },
    { id: '2', title: 'Sözel Yetenek / Okuma Anlama — Orta Seviye', desc: 'Sözel Yetenek > Okuma Anlama alt modülü için orta seviye değerlendirme testi.', questions: 6, time: 12 }
  ];

  const totalQuestions = displayTests.reduce((acc, test) => acc + (test.questions || 0), 0);
  const totalTestTime = displayTests.reduce((acc, test) => acc + (test.time || 0), 0);
  const totalInvTime = displayInventories.reduce((acc, inv) => acc + (inv.time || 0), 0);
  const totalTime = totalTestTime + totalInvTime;

  return (
    <div className="w-full max-w-6xl mx-auto pb-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">

        {/* Left Column: Main Content */}
        <div className="lg:col-span-2 space-y-6">

          {/* Header Card */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden p-5 sm:p-6">
            <div className="flex items-start justify-between mb-5">
              <div>
                <h1 className="text-lg font-bold text-slate-900 mb-1.5">{projectName}</h1>
                <p className="text-[13px] text-slate-500 leading-relaxed max-w-2xl">
                  {projectDesc}
                </p>
              </div>
              <div className="hidden sm:flex flex-col items-end text-right">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Toplam Süre</div>
                <div className="text-xl font-black text-indigo-600 flex items-center gap-1.5">
                  <Clock size={16} className="text-indigo-400" />
                  {totalTime} <span className="text-xs font-bold text-slate-500">dk</span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 pt-5 border-t border-slate-100">
              <div className="flex items-center gap-1.5 px-2.5 py-1 bg-slate-50 text-slate-700 rounded-md text-[11px] font-medium border border-slate-200">
                <Building2 size={12} className="text-slate-400" />
                {sector || 'Sektör Belirtilmedi'}
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-1 bg-slate-50 text-slate-700 rounded-md text-[11px] font-medium border border-slate-200">
                <Briefcase size={12} className="text-slate-400" />
                {positionLevel || 'Seviye Belirtilmedi'}
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-1 bg-indigo-50 text-indigo-700 rounded-md text-[11px] font-medium border border-indigo-100">
                <FileText size={12} className="text-indigo-400" />
                {displayInventories.length} Envanter, {displayTests.length} Test
              </div>
            </div>
          </div>

          {/* Inventories Section */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
              <h3 className="text-[13px] font-bold text-slate-900 flex items-center gap-2">
                <List size={14} className="text-indigo-500" />
                Envanterler
                <span className="px-1.5 py-0.5 rounded bg-slate-200 text-slate-600 text-[10px] font-bold ml-1">
                  {displayInventories.length}
                </span>
              </h3>
              <div className="text-[11px] font-medium text-slate-500">
                Toplam {totalInvTime} dk
              </div>
            </div>
            <div className="p-4">
              <div className="space-y-2">
                {displayInventories.map((inv, idx) => (
                  <div key={inv.id} className="flex flex-col sm:flex-row sm:items-center gap-3 p-3 rounded-lg border border-slate-100 hover:border-indigo-100 hover:bg-indigo-50/30 transition-all group">
                    <div className="w-6 h-6 rounded-full bg-slate-100 text-slate-500 group-hover:bg-indigo-100 group-hover:text-indigo-600 flex items-center justify-center text-[10px] font-bold shrink-0 transition-colors">
                      {idx + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-[13px] font-bold text-slate-900 truncate">{inv.title}</h4>
                      <div className="flex flex-wrap items-center gap-2 sm:gap-3 mt-1">
                        <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${inv.typeColor || 'bg-slate-200 text-slate-700'}`}>
                          {inv.type}
                        </span>
                        <span className="flex items-center gap-1 text-[10px] text-slate-500 font-medium">
                          <Target size={10} /> {inv.items} madde
                        </span>
                        <span className="flex items-center gap-1 text-[10px] text-slate-500 font-medium">
                          <Clock size={10} /> {inv.time} dk
                        </span>
                      </div>
                    </div>
                    <div className="shrink-0 sm:self-center self-start">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-100 rounded text-[9px] font-bold">
                        <CheckCircle2 size={10} /> Rapor: Evet
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Tests Section */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
              <h3 className="text-[13px] font-bold text-slate-900 flex items-center gap-2">
                <CheckCircle2 size={14} className="text-blue-500" />
                Değerlendirme Testleri
                <span className="px-1.5 py-0.5 rounded bg-slate-200 text-slate-600 text-[10px] font-bold ml-1">
                  {displayTests.length}
                </span>
              </h3>
              <div className="text-[11px] font-medium text-slate-500">
                Toplam {totalTestTime} dk
              </div>
            </div>
            <div className="p-4">
              <div className="space-y-2">
                {displayTests.map((test, idx) => (
                  <div key={test.id} className="flex flex-col sm:flex-row sm:items-center gap-3 p-3 rounded-lg border border-slate-100 hover:border-blue-100 hover:bg-blue-50/30 transition-all group">
                    <div className="w-6 h-6 rounded-full bg-slate-100 text-slate-500 group-hover:bg-blue-100 group-hover:text-blue-600 flex items-center justify-center text-[10px] font-bold shrink-0 transition-colors">
                      {idx + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-[13px] font-bold text-slate-900 truncate">{test.title}</h4>
                      <p className="text-[10px] text-slate-500 mt-0.5 line-clamp-1">{test.desc || 'Değerlendirme testi.'}</p>
                    </div>
                    <div className="shrink-0 flex sm:flex-col items-center sm:items-end gap-2 sm:gap-1">
                      <div className="flex items-center gap-1 text-[11px] font-bold text-slate-900 bg-slate-100 px-1.5 py-0.5 rounded">
                        <Hash size={10} className="text-slate-400" /> {test.questions} soru
                      </div>
                      <div className="flex items-center gap-1 text-[10px] font-medium text-slate-500">
                        <Clock size={10} /> {test.time} dk
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-3 pt-3 border-t border-slate-100 flex justify-end">
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-md text-[11px] font-bold text-slate-700">
                  Toplam: <span className="text-indigo-600">{totalQuestions} soru</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Settings */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden sticky top-6">
            <div className="p-4 border-b border-slate-100 bg-slate-50/50">
              <h3 className="text-[13px] font-bold text-slate-900 flex items-center gap-2">
                <Settings2 size={14} className="text-slate-500" />
                Proje Ayarları Özeti
              </h3>
            </div>

            <div className="p-4 space-y-5">
              {/* Test Deneyimi */}
              <div>
                <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2.5">Test Deneyimi</h4>
                <ul className="space-y-2">
                  <li className="flex items-start justify-between gap-2">
                    <span className="text-[11px] text-slate-600">Soru Sunumu</span>
                    <span className="text-[11px] font-bold text-slate-900 text-right">{settings.soruSunumu === 'tek' ? 'Tek tek' : 'Sayfa sayfa'}</span>
                  </li>
                  <li className="flex items-start justify-between gap-2">
                    <span className="text-[11px] text-slate-600">Süre Ayarı</span>
                    <span className="text-[11px] font-bold text-slate-900 text-right">
                      {settings.sureAyari === 'bolum' ? 'Bölüm bazlı' : settings.sureAyari === 'soru' ? 'Soru bazlı' : 'Süresiz'}
                    </span>
                  </li>
                  <li className="flex items-start justify-between gap-2">
                    <span className="text-[11px] text-slate-600">Geri Dönüş</span>
                    <span className="text-[11px] font-bold text-slate-900 text-right flex items-center gap-1">
                      {settings.geriDonuseIzinVer ? <Check size={12} className="text-emerald-500" /> : <X size={12} className="text-rose-500" />}
                      {settings.geriDonuseIzinVer ? 'İzin Ver' : 'Kapalı'}
                    </span>
                  </li>
                  <li className="flex items-start justify-between gap-2">
                    <span className="text-[11px] text-slate-600">Soru Karıştırma</span>
                    <span className="text-[11px] font-bold text-slate-900 text-right flex items-center gap-1">
                      {settings.sorulariKaristir ? <Check size={12} className="text-emerald-500" /> : <X size={12} className="text-rose-500" />}
                      {settings.sorulariKaristir ? 'Aktif' : 'Kapalı'}
                    </span>
                  </li>
                </ul>
              </div>

              {/* Güvenlik & Gözetim */}
              <div>
                <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2.5">Güvenlik & Gözetim</h4>
                <ul className="space-y-2">
                  <li className="flex items-start justify-between gap-2">
                    <span className="text-[11px] text-slate-600">Sekme Değiştirme</span>
                    <span className="text-[11px] font-bold text-slate-900 text-right flex items-center gap-1">
                      {settings.sekmeDegistirmeAlgilama ? <Check size={12} className="text-emerald-500" /> : <X size={12} className="text-rose-500" />}
                      {settings.sekmeDegistirmeAlgilama ? 'Algıla' : 'Kapalı'}
                    </span>
                  </li>
                  <li className="flex items-start justify-between gap-2">
                    <span className="text-[11px] text-slate-600">Kopya/Yapıştır</span>
                    <span className="text-[11px] font-bold text-slate-900 text-right flex items-center gap-1">
                      {settings.kopyalamaEngelleme ? <Check size={12} className="text-emerald-500" /> : <X size={12} className="text-rose-500" />}
                      {settings.kopyalamaEngelleme ? 'Engelle' : 'Kapalı'}
                    </span>
                  </li>
                  <li className="flex items-start justify-between gap-2">
                    <span className="text-[11px] text-slate-600">Kamera/Mikrofon</span>
                    <span className="text-[11px] font-bold text-slate-900 text-right flex items-center gap-1">
                      {settings.kameraMikrofonGozetimi ? <Check size={12} className="text-emerald-500" /> : <X size={12} className="text-rose-500" />}
                      {settings.kameraMikrofonGozetimi ? 'Aktif' : 'Kapalı'}
                    </span>
                  </li>
                  <li className="flex items-start justify-between gap-2">
                    <span className="text-[11px] text-slate-600">Tam Ekran</span>
                    <span className="text-[11px] font-bold text-slate-900 text-right flex items-center gap-1">
                      {settings.tamEkranZorunlulugu ? <Check size={12} className="text-emerald-500" /> : <X size={12} className="text-rose-500" />}
                      {settings.tamEkranZorunlulugu ? 'Zorunlu' : 'Kapalı'}
                    </span>
                  </li>
                </ul>
              </div>

              {/* Aday Deneyimi */}
              <div>
                <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2.5">Aday Deneyimi</h4>
                <ul className="space-y-2">
                  <li className="flex items-start justify-between gap-2">
                    <span className="text-[11px] text-slate-600">Sonuç Gösterimi</span>
                    <span className="text-[11px] font-bold text-slate-900 text-right flex items-center gap-1">
                      {settings.adayaSonuclariGoster ? <Check size={12} className="text-emerald-500" /> : <X size={12} className="text-rose-500" />}
                      {settings.adayaSonuclariGoster ? 'Aktif' : 'Kapalı'}
                    </span>
                  </li>
                  <li className="flex items-start justify-between gap-2">
                    <span className="text-[11px] text-slate-600">Bölüm Tanıtımı</span>
                    <span className="text-[11px] font-bold text-slate-900 text-right flex items-center gap-1">
                      {settings.bolumTanitimEkraniGoster ? <Check size={12} className="text-emerald-500" /> : <X size={12} className="text-rose-500" />}
                      {settings.bolumTanitimEkraniGoster ? 'Göster' : 'Kapalı'}
                    </span>
                  </li>
                </ul>
              </div>

              <div className="mt-5 p-2.5 bg-slate-50 rounded-lg border border-slate-200 flex items-start gap-2">
                <AlertCircle size={12} className="text-slate-500 shrink-0 mt-0.5" />
                <p className="text-[10px] text-slate-600 leading-relaxed font-medium">
                  Bu ayarlar proje yayınlandıktan sonra değiştirilemez. Lütfen onaylamadan önce kontrol edin.
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
