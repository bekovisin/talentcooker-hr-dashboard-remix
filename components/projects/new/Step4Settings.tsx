import React from 'react';
import * as RadioGroup from '@radix-ui/react-radio-group';
import * as Checkbox from '@radix-ui/react-checkbox';
import { LayoutTemplate, Clock, List, Target, Check } from 'lucide-react';

interface Step4SettingsProps {
  settings: any;
  setSettings: (settings: any) => void;
}

export default function Step4Settings({ settings, setSettings }: Step4SettingsProps) {
  return (
    <div className="w-full max-w-6xl mx-auto flex flex-col lg:flex-row gap-6 h-full overflow-y-auto pb-12">
      {/* Left Column */}
      <div className="flex-1 space-y-6">
        {/* Soru Sunumu */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="px-4 py-3 border-b border-slate-100 flex items-center gap-2 bg-slate-50/50">
            <LayoutTemplate size={16} className="text-indigo-600" />
            <h3 className="font-bold text-slate-900 text-sm">Soru Sunumu</h3>
          </div>
          <div className="p-4 space-y-4">
            <RadioGroup.Root value={settings.soruSunumu} onValueChange={(v) => setSettings({...settings, soruSunumu: v})} className="space-y-2">
              <RadioGroup.Item value="tek" className="w-full flex items-start gap-3 p-3 rounded-xl border border-slate-200 data-[state=checked]:border-indigo-600 data-[state=checked]:bg-indigo-50/30 transition-all text-left group">
                <div className="w-4 h-4 rounded-full border border-slate-300 flex items-center justify-center shrink-0 mt-0.5 group-data-[state=checked]:border-indigo-600">
                  <RadioGroup.Indicator className="w-2 h-2 rounded-full bg-indigo-600" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 text-xs">Tek tek</span>
                    <span className="text-[10px] font-bold text-indigo-600 bg-indigo-100 px-2 py-0.5 rounded-full">Önerilen</span>
                  </div>
                  <p className="text-[10px] text-slate-500 mt-1">Her ekranda 1 soru gösterilir.</p>
                </div>
              </RadioGroup.Item>
              <RadioGroup.Item value="sayfa" className="w-full flex items-start gap-3 p-3 rounded-xl border border-slate-200 data-[state=checked]:border-indigo-600 data-[state=checked]:bg-indigo-50/30 transition-all text-left group">
                <div className="w-4 h-4 rounded-full border border-slate-300 flex items-center justify-center shrink-0 mt-0.5 group-data-[state=checked]:border-indigo-600">
                  <RadioGroup.Indicator className="w-2 h-2 rounded-full bg-indigo-600" />
                </div>
                <div className="flex-1">
                  <span className="font-bold text-slate-900 text-xs">Sayfa sayfa</span>
                  <p className="text-[10px] text-slate-500 mt-1 mb-2">Her sayfada birden fazla soru gösterilir.</p>
                  {settings.soruSunumu === 'sayfa' && (
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-600">Sayfa başına:</span>
                      <input type="number" value={settings.sayfaBasinaSoru} onChange={(e) => setSettings({...settings, sayfaBasinaSoru: parseInt(e.target.value)})} className="w-16 px-2 py-1 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-indigo-500 outline-none" />
                      <span className="text-xs text-slate-600">soru</span>
                    </div>
                  )}
                </div>
              </RadioGroup.Item>
            </RadioGroup.Root>

            <div className="space-y-2 pt-2 border-t border-slate-100">
              <label className="flex items-center gap-3 cursor-pointer group">
                <Checkbox.Root checked={settings.sorulariKaristir} onCheckedChange={(c) => setSettings({...settings, sorulariKaristir: c as boolean})} className="w-4 h-4 rounded border border-slate-300 flex items-center justify-center bg-white data-[state=checked]:bg-indigo-600 data-[state=checked]:border-indigo-600 transition-colors">
                  <Checkbox.Indicator><Check size={12} className="text-white" strokeWidth={3} /></Checkbox.Indicator>
                </Checkbox.Root>
                <span className="text-xs font-medium text-slate-700 group-hover:text-slate-900">Soruları karıştır</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer group">
                <Checkbox.Root checked={settings.secenekleriKaristir} onCheckedChange={(c) => setSettings({...settings, secenekleriKaristir: c as boolean})} className="w-4 h-4 rounded border border-slate-300 flex items-center justify-center bg-white data-[state=checked]:bg-indigo-600 data-[state=checked]:border-indigo-600 transition-colors">
                  <Checkbox.Indicator><Check size={12} className="text-white" strokeWidth={3} /></Checkbox.Indicator>
                </Checkbox.Root>
                <span className="text-xs font-medium text-slate-700 group-hover:text-slate-900">Seçenekleri karıştır</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer group">
                <Checkbox.Root checked={settings.geriDonuseIzinVer} onCheckedChange={(c) => setSettings({...settings, geriDonuseIzinVer: c as boolean})} className="w-4 h-4 rounded border border-slate-300 flex items-center justify-center bg-white data-[state=checked]:bg-indigo-600 data-[state=checked]:border-indigo-600 transition-colors">
                  <Checkbox.Indicator><Check size={12} className="text-white" strokeWidth={3} /></Checkbox.Indicator>
                </Checkbox.Root>
                <span className="text-xs font-medium text-slate-700 group-hover:text-slate-900">Geri dönüşe izin ver (aynı bölüm içinde)</span>
              </label>
            </div>
          </div>
        </div>

        {/* Süre Ayarı */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="px-4 py-3 border-b border-slate-100 flex items-center gap-2 bg-slate-50/50">
            <Clock size={16} className="text-indigo-600" />
            <h3 className="font-bold text-slate-900 text-sm">Süre Ayarı</h3>
          </div>
          <div className="p-4">
            <RadioGroup.Root value={settings.sureAyari} onValueChange={(v) => setSettings({...settings, sureAyari: v})} className="space-y-2">
              <RadioGroup.Item value="bolum" className="w-full flex items-start gap-3 p-3 rounded-xl border border-slate-200 data-[state=checked]:border-indigo-600 data-[state=checked]:bg-indigo-50/30 transition-all text-left group">
                <div className="w-4 h-4 rounded-full border border-slate-300 flex items-center justify-center shrink-0 mt-0.5 group-data-[state=checked]:border-indigo-600">
                  <RadioGroup.Indicator className="w-2 h-2 rounded-full bg-indigo-600" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 text-xs">Bölüm bazlı süre</span>
                    <span className="text-[10px] font-bold text-indigo-600 bg-indigo-100 px-2 py-0.5 rounded-full">Önerilen</span>
                  </div>
                  <p className="text-[10px] text-slate-500 mt-1 mb-2">Her bölümün kendi toplam süresi var. Şablondaki süre kullanılır.</p>
                  {settings.sureAyari === 'bolum' && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      <span className="text-[10px] bg-indigo-100 text-indigo-700 px-2 py-1 rounded font-medium">Bölüm 1: 8 dk</span>
                      <span className="text-[10px] bg-indigo-100 text-indigo-700 px-2 py-1 rounded font-medium">Bölüm 2: 6 dk</span>
                      <span className="text-[10px] bg-indigo-100 text-indigo-700 px-2 py-1 rounded font-medium">Bölüm 3: 6 dk</span>
                      <span className="text-[10px] bg-indigo-100 text-indigo-700 px-2 py-1 rounded font-medium">Bölüm 4: 15 dk</span>
                      <span className="text-[10px] bg-indigo-600 text-white px-2 py-1 rounded font-bold">Toplam: 35 dakika</span>
                    </div>
                  )}
                </div>
              </RadioGroup.Item>
              <RadioGroup.Item value="soru" className="w-full flex items-start gap-3 p-3 rounded-xl border border-slate-200 data-[state=checked]:border-indigo-600 data-[state=checked]:bg-indigo-50/30 transition-all text-left group">
                <div className="w-4 h-4 rounded-full border border-slate-300 flex items-center justify-center shrink-0 mt-0.5 group-data-[state=checked]:border-indigo-600">
                  <RadioGroup.Indicator className="w-2 h-2 rounded-full bg-indigo-600" />
                </div>
                <div>
                  <span className="font-bold text-slate-900 text-xs">Soru bazlı süre</span>
                  <p className="text-[10px] text-slate-500 mt-1">Her soruda geri sayım çalışır, süre bitince otomatik sonraki soruya geçer.</p>
                  {settings.sureAyari === 'soru' && (
                    <div className="mt-2 p-2 bg-indigo-50 rounded-lg border border-indigo-100">
                      <div className="text-xs font-bold text-indigo-700 mb-1">90 sn / soru</div>
                      <div className="text-[10px] text-indigo-600/80">Zorluk seviyesine göre şablon süreleri uygulanır</div>
                    </div>
                  )}
                </div>
              </RadioGroup.Item>
              <RadioGroup.Item value="suresiz" className="w-full flex items-start gap-3 p-3 rounded-xl border border-slate-200 data-[state=checked]:border-indigo-600 data-[state=checked]:bg-indigo-50/30 transition-all text-left group">
                <div className="w-4 h-4 rounded-full border border-slate-300 flex items-center justify-center shrink-0 mt-0.5 group-data-[state=checked]:border-indigo-600">
                  <RadioGroup.Indicator className="w-2 h-2 rounded-full bg-indigo-600" />
                </div>
                <div>
                  <span className="font-bold text-slate-900 text-xs">Süresiz</span>
                  <p className="text-[10px] text-slate-500 mt-1">Adaylar istedikleri kadar zaman harcayabilir.</p>
                </div>
              </RadioGroup.Item>
            </RadioGroup.Root>
          </div>
        </div>

        {/* Soru Seti */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="px-4 py-3 border-b border-slate-100 flex items-center gap-2 bg-slate-50/50">
            <List size={16} className="text-indigo-600" />
            <h3 className="font-bold text-slate-900 text-sm">Soru Seti</h3>
          </div>
          <div className="p-4">
            <RadioGroup.Root value={settings.soruSeti} onValueChange={(v) => setSettings({...settings, soruSeti: v})} className="space-y-2">
              <RadioGroup.Item value="farkli" className="w-full flex items-start gap-3 p-3 rounded-xl border border-slate-200 data-[state=checked]:border-indigo-600 data-[state=checked]:bg-indigo-50/30 transition-all text-left group">
                <div className="w-4 h-4 rounded-full border border-slate-300 flex items-center justify-center shrink-0 mt-0.5 group-data-[state=checked]:border-indigo-600">
                  <RadioGroup.Indicator className="w-2 h-2 rounded-full bg-indigo-600" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 text-xs">Her aday farklı sorular görsün</span>
                    <span className="text-[10px] font-bold text-indigo-600 bg-indigo-100 px-2 py-0.5 rounded-full">Önerilen</span>
                  </div>
                  <p className="text-[10px] text-slate-500 mt-1">Şablondaki kurallarla her seferde yeni soru seti oluşturulur. Kopya çekmeyi zorlaştırır.</p>
                </div>
              </RadioGroup.Item>
              <RadioGroup.Item value="ayni" className="w-full flex items-start gap-3 p-3 rounded-xl border border-slate-200 data-[state=checked]:border-indigo-600 data-[state=checked]:bg-indigo-50/30 transition-all text-left group">
                <div className="w-4 h-4 rounded-full border border-slate-300 flex items-center justify-center shrink-0 mt-0.5 group-data-[state=checked]:border-indigo-600">
                  <RadioGroup.Indicator className="w-2 h-2 rounded-full bg-indigo-600" />
                </div>
                <div>
                  <span className="font-bold text-slate-900 text-xs">Tüm adaylar aynı soruları görsün</span>
                  <p className="text-[10px] text-slate-500 mt-1">İlk oturum oluşturulduğunda soru seti belirlenir, sonraki adaylara aynı sorular verilir. Karşılaştırılabilirlik için idealdir.</p>
                </div>
              </RadioGroup.Item>
            </RadioGroup.Root>
          </div>
        </div>
      </div>

      {/* Right Column */}
      <div className="flex-1 space-y-6">
        {/* Sonuç & Bölüm Geçişi */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="px-4 py-3 border-b border-slate-100 flex items-center gap-2 bg-slate-50/50">
            <Target size={16} className="text-indigo-600" />
            <h3 className="font-bold text-slate-900 text-sm">Sonuç & Bölüm Geçişi</h3>
          </div>
          <div className="p-4 space-y-3">
            <label className="flex items-start gap-3 cursor-pointer group">
              <Checkbox.Root checked={settings.adayaSonuclariGoster} onCheckedChange={(c) => setSettings({...settings, adayaSonuclariGoster: c as boolean})} className="w-4 h-4 rounded border border-slate-300 flex items-center justify-center bg-white data-[state=checked]:bg-indigo-600 data-[state=checked]:border-indigo-600 transition-colors mt-0.5 shrink-0">
                <Checkbox.Indicator><Check size={12} className="text-white" strokeWidth={3} /></Checkbox.Indicator>
              </Checkbox.Root>
              <div>
                <span className="block text-xs font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">Adaya sonuçları göster</span>
                <span className="block text-[10px] text-slate-500 mt-0.5">Değerlendirme tamamlanınca adaya puanını gösterir</span>
              </div>
            </label>
            <label className="flex items-start gap-3 cursor-pointer group">
              <Checkbox.Root checked={settings.bolumArasiSonuclariGoster} onCheckedChange={(c) => setSettings({...settings, bolumArasiSonuclariGoster: c as boolean})} className="w-4 h-4 rounded border border-slate-300 flex items-center justify-center bg-white data-[state=checked]:bg-indigo-600 data-[state=checked]:border-indigo-600 transition-colors mt-0.5 shrink-0">
                <Checkbox.Indicator><Check size={12} className="text-white" strokeWidth={3} /></Checkbox.Indicator>
              </Checkbox.Root>
              <div>
                <span className="block text-xs font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">Bölüm arası sonuçları göster</span>
                <span className="block text-[10px] text-slate-500 mt-0.5">Her bölümden sonra aday o bölümün sonucunu görür</span>
              </div>
            </label>
            <label className="flex items-start gap-3 cursor-pointer group">
              <Checkbox.Root checked={settings.dogruCevaplariGoster} onCheckedChange={(c) => setSettings({...settings, dogruCevaplariGoster: c as boolean})} className="w-4 h-4 rounded border border-slate-300 flex items-center justify-center bg-white data-[state=checked]:bg-indigo-600 data-[state=checked]:border-indigo-600 transition-colors mt-0.5 shrink-0">
                <Checkbox.Indicator><Check size={12} className="text-white" strokeWidth={3} /></Checkbox.Indicator>
              </Checkbox.Root>
              <div>
                <span className="block text-xs font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">Doğru cevapları göster</span>
                <span className="block text-[10px] text-slate-500 mt-0.5">Adaya doğru ve yanlış cevaplarını gösterir</span>
              </div>
            </label>
            <div className="w-full h-px bg-slate-100 my-2"></div>
            <label className="flex items-start gap-3 cursor-pointer group">
              <Checkbox.Root checked={settings.bolumTanitimEkraniGoster} onCheckedChange={(c) => setSettings({...settings, bolumTanitimEkraniGoster: c as boolean})} className="w-4 h-4 rounded border border-slate-300 flex items-center justify-center bg-white data-[state=checked]:bg-indigo-600 data-[state=checked]:border-indigo-600 transition-colors mt-0.5 shrink-0">
                <Checkbox.Indicator><Check size={12} className="text-white" strokeWidth={3} /></Checkbox.Indicator>
              </Checkbox.Root>
              <div>
                <span className="block text-xs font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">Bölüm tanıtım ekranı göster</span>
                <span className="block text-[10px] text-slate-500 mt-0.5">Her bölüm başında açıklama ve bilgi ekranı gösterilir</span>
              </div>
            </label>
            <label className="flex items-start gap-3 cursor-pointer group">
              <Checkbox.Root checked={settings.bolumlerArasiGeriDonuseIzinVer} onCheckedChange={(c) => setSettings({...settings, bolumlerArasiGeriDonuseIzinVer: c as boolean})} className="w-4 h-4 rounded border border-slate-300 flex items-center justify-center bg-white data-[state=checked]:bg-indigo-600 data-[state=checked]:border-indigo-600 transition-colors mt-0.5 shrink-0">
                <Checkbox.Indicator><Check size={12} className="text-white" strokeWidth={3} /></Checkbox.Indicator>
              </Checkbox.Root>
              <div>
                <span className="block text-xs font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">Bölümler arası geri dönüşe izin ver</span>
                <span className="block text-[10px] text-slate-500 mt-0.5">Aday tamamlanmış bölüme geri dönebilir</span>
              </div>
            </label>
          </div>
        </div>

        {/* Güvenlik Ayarları */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="px-4 py-3 border-b border-slate-100 flex items-center gap-2 bg-slate-50/50">
            <div className="w-4 h-4 rounded-full border-2 border-rose-500 flex items-center justify-center text-rose-500">
              <svg width="8" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
            </div>
            <h3 className="font-bold text-slate-900 text-sm">Güvenlik Ayarları</h3>
          </div>
          <div className="p-4">
            <p className="text-[10px] text-slate-500 mb-4">Test sırasında adaya uygulanan güvenlik önlemlerini seçin.</p>
            <div className="space-y-3">
              <label className="flex items-start gap-3 cursor-pointer group">
                <Checkbox.Root checked={settings.sekmeDegistirmeAlgilama} onCheckedChange={(c) => setSettings({...settings, sekmeDegistirmeAlgilama: c as boolean})} className="w-4 h-4 rounded border border-slate-300 flex items-center justify-center bg-white data-[state=checked]:bg-indigo-600 data-[state=checked]:border-indigo-600 transition-colors mt-0.5 shrink-0">
                  <Checkbox.Indicator><Check size={12} className="text-white" strokeWidth={3} /></Checkbox.Indicator>
                </Checkbox.Root>
                <div>
                  <span className="block text-xs font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">Sekme değiştirme algılama</span>
                  <span className="block text-[10px] text-slate-500 mt-0.5">Aday başka bir sekmeye geçtiğinde uyarı gösterir ve kaydeder</span>
                </div>
              </label>
              <label className="flex items-start gap-3 cursor-pointer group">
                <Checkbox.Root checked={settings.kopyalamaEngelleme} onCheckedChange={(c) => setSettings({...settings, kopyalamaEngelleme: c as boolean})} className="w-4 h-4 rounded border border-slate-300 flex items-center justify-center bg-white data-[state=checked]:bg-indigo-600 data-[state=checked]:border-indigo-600 transition-colors mt-0.5 shrink-0">
                  <Checkbox.Indicator><Check size={12} className="text-white" strokeWidth={3} /></Checkbox.Indicator>
                </Checkbox.Root>
                <div>
                  <span className="block text-xs font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">Kopyalama engelleme</span>
                  <span className="block text-[10px] text-slate-500 mt-0.5">Sağ tık, kopyalama, kesme ve metin seçimini engeller</span>
                </div>
              </label>
              <label className="flex items-start gap-3 cursor-pointer group">
                <Checkbox.Root checked={settings.ekranGoruntusuAlgilama} onCheckedChange={(c) => setSettings({...settings, ekranGoruntusuAlgilama: c as boolean})} className="w-4 h-4 rounded border border-slate-300 flex items-center justify-center bg-white data-[state=checked]:bg-indigo-600 data-[state=checked]:border-indigo-600 transition-colors mt-0.5 shrink-0">
                  <Checkbox.Indicator><Check size={12} className="text-white" strokeWidth={3} /></Checkbox.Indicator>
                </Checkbox.Root>
                <div>
                  <span className="block text-xs font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">Ekran görüntüsü algılama</span>
                  <span className="block text-[10px] text-slate-500 mt-0.5">PrintScreen ve ekran görüntüsü kısayollarını tespit eder</span>
                </div>
              </label>
              <label className="flex items-start gap-3 cursor-pointer group">
                <Checkbox.Root checked={settings.yapistirmaAlgilama} onCheckedChange={(c) => setSettings({...settings, yapistirmaAlgilama: c as boolean})} className="w-4 h-4 rounded border border-slate-300 flex items-center justify-center bg-white data-[state=checked]:bg-indigo-600 data-[state=checked]:border-indigo-600 transition-colors mt-0.5 shrink-0">
                  <Checkbox.Indicator><Check size={12} className="text-white" strokeWidth={3} /></Checkbox.Indicator>
                </Checkbox.Root>
                <div>
                  <span className="block text-xs font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">Yapıştırma algılama</span>
                  <span className="block text-[10px] text-slate-500 mt-0.5">Ctrl+V / Cmd+V ile içerik yapıştırmayı tespit eder</span>
                </div>
              </label>
              <label className="flex items-start gap-3 cursor-pointer group">
                <Checkbox.Root checked={settings.tamEkranZorunlulugu} onCheckedChange={(c) => setSettings({...settings, tamEkranZorunlulugu: c as boolean})} className="w-4 h-4 rounded border border-slate-300 flex items-center justify-center bg-white data-[state=checked]:bg-indigo-600 data-[state=checked]:border-indigo-600 transition-colors mt-0.5 shrink-0">
                  <Checkbox.Indicator><Check size={12} className="text-white" strokeWidth={3} /></Checkbox.Indicator>
                </Checkbox.Root>
                <div>
                  <span className="block text-xs font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">Tam ekran zorunluluğu</span>
                  <span className="block text-[10px] text-slate-500 mt-0.5">Test tam ekranda çalışır, çıkışta içerik gizlenir</span>
                </div>
              </label>
              <label className="flex items-start gap-3 cursor-pointer group">
                <Checkbox.Root checked={settings.gelistiriciAraclariAlgilama} onCheckedChange={(c) => setSettings({...settings, gelistiriciAraclariAlgilama: c as boolean})} className="w-4 h-4 rounded border border-slate-300 flex items-center justify-center bg-white data-[state=checked]:bg-indigo-600 data-[state=checked]:border-indigo-600 transition-colors mt-0.5 shrink-0">
                  <Checkbox.Indicator><Check size={12} className="text-white" strokeWidth={3} /></Checkbox.Indicator>
                </Checkbox.Root>
                <div>
                  <span className="block text-xs font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">Geliştirici araçları algılama</span>
                  <span className="block text-[10px] text-slate-500 mt-0.5">Tarayıcı geliştirici araçları açıldığında içeriği gizler</span>
                </div>
              </label>
              <label className="flex items-start gap-3 cursor-pointer group">
                <Checkbox.Root checked={settings.kameraMikrofonGozetimi} onCheckedChange={(c) => setSettings({...settings, kameraMikrofonGozetimi: c as boolean})} className="w-4 h-4 rounded border border-slate-300 flex items-center justify-center bg-white data-[state=checked]:bg-indigo-600 data-[state=checked]:border-indigo-600 transition-colors mt-0.5 shrink-0">
                  <Checkbox.Indicator><Check size={12} className="text-white" strokeWidth={3} /></Checkbox.Indicator>
                </Checkbox.Root>
                <div>
                  <span className="block text-xs font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">Kamera & mikrofon gözetimi</span>
                  <span className="block text-[10px] text-slate-500 mt-0.5">Test başında kamera ve mikrofon izni istenir, gözetim başlar</span>
                </div>
              </label>
              
              {settings.kameraMikrofonGozetimi && (
                <div className="pl-7 space-y-3 mt-3">
                  <div className="space-y-1">
                    <span className="block text-xs font-bold text-slate-900">Aşama bazlı gözetim:</span>
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <Checkbox.Root checked={settings.asamaBazliGozetim} onCheckedChange={(c) => setSettings({...settings, asamaBazliGozetim: c as boolean})} className="w-3.5 h-3.5 rounded border border-slate-300 flex items-center justify-center bg-white data-[state=checked]:bg-indigo-600 data-[state=checked]:border-indigo-600 transition-colors">
                        <Checkbox.Indicator><Check size={10} className="text-white" strokeWidth={3} /></Checkbox.Indicator>
                      </Checkbox.Root>
                      <span className="text-[10px] font-medium text-slate-700 group-hover:text-slate-900">Testler <span className="text-slate-400 font-normal">(değerlendirme)</span></span>
                    </label>
                    <p className="text-[9px] text-slate-400">Kapatılan aşamada kamera/mikrofon izni istenmez.</p>
                  </div>

                  <label className="flex items-start gap-2 cursor-pointer group">
                    <Checkbox.Root checked={settings.kvkkRizasiZorunlu} onCheckedChange={(c) => setSettings({...settings, kvkkRizasiZorunlu: c as boolean})} className="w-3.5 h-3.5 rounded border border-slate-300 flex items-center justify-center bg-white data-[state=checked]:bg-indigo-600 data-[state=checked]:border-indigo-600 transition-colors mt-0.5 shrink-0">
                      <Checkbox.Indicator><Check size={10} className="text-white" strokeWidth={3} /></Checkbox.Indicator>
                    </Checkbox.Root>
                    <div>
                      <span className="block text-[10px] font-medium text-slate-700 group-hover:text-slate-900 transition-colors">KVKK rızası zorunlu</span>
                      <span className="block text-[9px] text-slate-400 mt-0.5">Açık rıza vermeyenler teste devam edemez. Kapalıysa rıza vermeden de devam edebilir.</span>
                    </div>
                  </label>

                  <div className="space-y-1 pt-2">
                    <span className="block text-[10px] font-medium text-slate-700">Gözetim verisi saklama süresi</span>
                    <div className="flex items-center gap-2">
                      <input type="number" value={settings.gozetimVerisiSaklamaSuresi} onChange={(e) => setSettings({...settings, gozetimVerisiSaklamaSuresi: parseInt(e.target.value)})} className="w-16 px-2 py-1 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-indigo-500 outline-none" />
                      <span className="text-[10px] text-slate-600">gün</span>
                    </div>
                    <p className="text-[9px] text-slate-400">KVKK kapsamında kamera/mikrofon verileri bu süre sonunda otomatik silinir.</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
