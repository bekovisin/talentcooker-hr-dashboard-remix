import React from 'react';
import * as Popover from '@radix-ui/react-popover';
import * as Select from '@radix-ui/react-select';
import * as RadioGroup from '@radix-ui/react-radio-group';
import { DayPicker } from 'react-day-picker';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';
import { Calendar, Clock, LayoutTemplate, ChevronDown, Check } from 'lucide-react';

interface Step1BasicInfoProps {
  startDate: Date | undefined;
  setStartDate: (date: Date | undefined) => void;
  endDate: Date | undefined;
  setEndDate: (date: Date | undefined) => void;
  sector: string;
  setSector: (sector: string) => void;
  positionLevel: string;
  setPositionLevel: (level: string) => void;
}

export default function Step1BasicInfo({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  sector,
  setSector,
  positionLevel,
  setPositionLevel
}: Step1BasicInfoProps) {
  return (
    <div className="w-full max-w-3xl mx-auto bg-transparent sm:bg-white sm:rounded-xl sm:border sm:border-slate-200 p-0 sm:p-8 h-fit mt-2 sm:mt-4 mb-8">
      <div className="space-y-6">
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5">Proje Adı *</label>
          <input type="text" className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all" />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5">Açıklama</label>
          <textarea rows={3} className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all resize-none"></textarea>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">Başlangıç Tarihi</label>
            <Popover.Root>
              <Popover.Trigger asChild>
                <button className="w-full flex items-center justify-between px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-slate-600 text-left">
                  <span className="flex items-center gap-2">
                    <Calendar size={16} className="text-slate-400" />
                    {startDate ? format(startDate, 'dd MMM yyyy HH:mm', { locale: tr }) : 'Tarih Seçin'}
                  </span>
                </button>
              </Popover.Trigger>
              <Popover.Portal>
                <Popover.Content className="bg-white p-3 rounded-xl shadow-lg border border-slate-100 z-50" sideOffset={5} align="start">
                  <div className="flex flex-col gap-3">
                    <div>
                      <DayPicker mode="single" selected={startDate} onSelect={setStartDate} locale={tr} className="rdp-p-2" />
                    </div>
                    <div className="flex items-center gap-2 px-3 pt-3 border-t border-slate-100">
                      <Clock size={16} className="text-slate-400" />
                      <input
                        type="time"
                        className="flex-1 px-2 py-1 text-sm border border-slate-200 rounded outline-none focus:border-indigo-500"
                        onChange={(e) => {
                          if (startDate) {
                            const [hours, minutes] = e.target.value.split(':');
                            const newDate = new Date(startDate);
                            newDate.setHours(parseInt(hours, 10), parseInt(minutes, 10));
                            setStartDate(newDate);
                          }
                        }}
                        value={startDate ? format(startDate, 'HH:mm') : ''}
                      />
                    </div>
                  </div>
                </Popover.Content>
              </Popover.Portal>
            </Popover.Root>
            <p className="text-[11px] text-slate-400 mt-1">Projenin başlayacağı tarih</p>
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">Bitiş Tarihi</label>
            <Popover.Root>
              <Popover.Trigger asChild>
                <button className="w-full flex items-center justify-between px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-slate-600 text-left">
                  <span className="flex items-center gap-2">
                    <Calendar size={16} className="text-slate-400" />
                    {endDate ? format(endDate, 'dd MMM yyyy HH:mm', { locale: tr }) : 'Tarih Seçin'}
                  </span>
                </button>
              </Popover.Trigger>
              <Popover.Portal>
                <Popover.Content className="bg-white p-3 rounded-xl shadow-lg border border-slate-100 z-50" sideOffset={5} align="start">
                  <div className="flex flex-col gap-3">
                    <div>
                      <DayPicker mode="single" selected={endDate} onSelect={setEndDate} locale={tr} className="rdp-p-2" />
                    </div>
                    <div className="flex items-center gap-2 px-3 pt-3 border-t border-slate-100">
                      <Clock size={16} className="text-slate-400" />
                      <input
                        type="time"
                        className="flex-1 px-2 py-1 text-sm border border-slate-200 rounded outline-none focus:border-indigo-500"
                        onChange={(e) => {
                          if (endDate) {
                            const [hours, minutes] = e.target.value.split(':');
                            const newDate = new Date(endDate);
                            newDate.setHours(parseInt(hours, 10), parseInt(minutes, 10));
                            setEndDate(newDate);
                          }
                        }}
                        value={endDate ? format(endDate, 'HH:mm') : ''}
                      />
                    </div>
                  </div>
                </Popover.Content>
              </Popover.Portal>
            </Popover.Root>
            <p className="text-[11px] text-slate-400 mt-1">Projenin sona ereceği tarih</p>
          </div>
        </div>

        <div className="pt-6 mt-2 border-t border-slate-100">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-6 h-6 rounded bg-indigo-50 flex items-center justify-center text-indigo-600">
              <LayoutTemplate size={14} />
            </div>
            <h4 className="font-bold text-slate-900">Pozisyon Bilgileri</h4>
          </div>
          <p className="text-xs text-slate-500 mb-5 ml-0 sm:ml-8">Test sorularının sektöre ve pozisyona uyarlanması için gereklidir</p>

          <div className="space-y-5 ml-0 sm:ml-8">
            <div className="w-full sm:w-1/2">
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Sektör *</label>
              <Select.Root value={sector} onValueChange={setSector}>
                <Select.Trigger className="w-full flex items-center justify-between px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-slate-700">
                  <Select.Value placeholder="Sektör Seçin" />
                  <Select.Icon>
                    <ChevronDown size={16} className="text-slate-400" />
                  </Select.Icon>
                </Select.Trigger>
                <Select.Portal>
                  <Select.Content className="bg-white rounded-lg shadow-lg border border-slate-100 overflow-hidden z-50 w-[var(--radix-select-trigger-width)]" position="popper" sideOffset={5}>
                    <Select.Viewport className="p-1 w-full">
                      {['Üretim & Sanayi', 'Bilişim & Teknoloji', 'Finans & Bankacılık'].map(item => (
                        <Select.Item key={item} value={item} className="relative flex items-center px-8 py-2 text-sm text-slate-700 hover:bg-indigo-50 hover:text-indigo-700 cursor-pointer outline-none rounded-md select-none data-[highlighted]:bg-indigo-50 data-[highlighted]:text-indigo-700">
                          <Select.ItemText>{item}</Select.ItemText>
                          <Select.ItemIndicator className="absolute left-2 flex items-center justify-center">
                            <Check size={14} className="text-indigo-600" />
                          </Select.ItemIndicator>
                        </Select.Item>
                      ))}
                    </Select.Viewport>
                  </Select.Content>
                </Select.Portal>
              </Select.Root>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Pozisyon Seviyesi *</label>
              <RadioGroup.Root value={positionLevel} onValueChange={setPositionLevel} className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { id: 'yonetici', title: 'Yönetici', desc: 'Üst düzey yönetim pozisyonları' },
                  { id: 'orta', title: 'Orta Kademe', desc: 'Müdür, şef, birim yöneticisi' },
                  { id: 'uzman', title: 'Uzman', desc: 'Konu uzmanı, analist, mühendis' },
                  { id: 'ekip', title: 'Ekip Lideri', desc: 'Takım lideri, proje yöneticisi' },
                  { id: 'mavi', title: 'Mavi Yaka', desc: 'Saha, üretim, operasyon' },
                ].map(level => (
                  <RadioGroup.Item
                    key={level.id}
                    value={level.id}
                    className="relative flex items-start gap-3 p-3.5 rounded-xl border border-slate-200 cursor-pointer transition-all duration-200 data-[state=checked]:border-indigo-600 data-[state=checked]:bg-indigo-50/30 hover:border-indigo-300 outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 text-left"
                  >
                    <div className="w-5 h-5 rounded-full border border-slate-300 flex items-center justify-center transition-colors mt-0.5 shrink-0 group-data-[state=checked]:border-indigo-600 group-data-[state=checked]:bg-indigo-600">
                      <RadioGroup.Indicator className="flex items-center justify-center w-full h-full relative after:content-[''] after:block after:w-2.5 after:h-2.5 after:rounded-full after:bg-indigo-600" />
                    </div>
                    <div>
                      <span className="block text-sm font-bold text-slate-900 transition-colors">{level.title}</span>
                      <span className="block text-[11px] text-slate-500 mt-0.5 leading-tight">{level.desc}</span>
                    </div>
                  </RadioGroup.Item>
                ))}
              </RadioGroup.Root>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">İş Unvanı *</label>
              <input type="text" className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all" />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Rol Tanımı *</label>
              <textarea rows={3} className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all resize-none"></textarea>
              <div className="text-right text-[10px] text-slate-400 mt-1">0/300</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
