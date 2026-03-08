'use client';

import React, { useState } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';

const initialTrackingData = [
  { name: "Selin Yılmaz", time: "2dk", step: 0, status: "Aşama 0: Değerlendirme" },
  { name: "Mehmet Akif", time: "14dk", step: 2, status: "Aşama 2: İK Mülakatı" },
  { name: "Canan Öztürk", time: "45dk", step: 4, status: "Aşama 4: Teklif İletildi" },
  { name: "Ali Veli", time: "1s", step: 1, status: "Aşama 1: Teknik Test" },
  { name: "Ayşe Fatma", time: "2s", step: 3, status: "Aşama 3: Yönetici Mülakatı" },
];

const stepColors = [
  'bg-slate-400',
  'bg-sky-500',
  'bg-indigo-500',
  'bg-purple-500',
  'bg-emerald-500',
  'bg-green-600'
];

const stepRingColors = [
  'ring-slate-200',
  'ring-sky-200',
  'ring-indigo-200',
  'ring-purple-200',
  'ring-emerald-200',
  'ring-green-200'
];

function TrackingItem({ name, time, step, status }: { name: string, time: string, step: number, status: string }) {
  const activeColor = stepColors[step] || 'bg-slate-400';
  const activeRing = stepRingColors[step] || 'ring-slate-200';
  const progressPercent = (step / 5) * 100;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-4 hover:bg-slate-50 rounded-lg transition-colors border-b border-slate-50 last:border-0 group cursor-pointer"
    >
      <div className="flex justify-between items-start mb-4">
        <span className="font-bold text-slate-900 text-xs">{name}</span>
        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{time}</span>
      </div>
      
      <div className="mb-3">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Değerlendirme Aşaması</span>
      </div>
      
      <div className="relative flex items-center justify-between w-full px-2">
        <div className="absolute left-2 right-2 h-1 bg-slate-100 rounded-full top-1/2 -translate-y-1/2" />
        <div 
          className={`absolute left-2 h-1 ${activeColor} rounded-full top-1/2 -translate-y-1/2 transition-all duration-1000 ease-out`} 
          style={{ width: `calc(${progressPercent}% - 16px)` }}
        />
        
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <div 
            key={i} 
            className={`w-3 h-3 rounded-full relative z-10 transition-all duration-500 ${
              i <= step ? `${activeColor} ring-4 ${activeRing}` : 'bg-slate-200'
            }`}
          />
        ))}
      </div>
      
      <div className="mt-4 flex justify-between items-center">
        <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md bg-slate-50 border border-slate-100 ${
          step === 5 ? 'text-green-600' : 
          step >= 3 ? 'text-emerald-600' : 
          step >= 1 ? 'text-indigo-600' : 'text-slate-500'
        }`}>
          {status}
        </span>
        <ArrowRight size={14} className="text-slate-300 group-hover:text-indigo-500 transition-colors transform group-hover:translate-x-1" />
      </div>
    </motion.div>
  );
}

function Pagination({ page, totalPages, onPageChange, rowsPerPage, onRowsChange, rowsOptions }: any) {
  return (
    <div className="flex items-center justify-between px-4 py-3 border-t border-slate-100 bg-white shrink-0">
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

export function ProjectLiveTracking() {
  const [trackingPage, setTrackingPage] = useState(1);
  const [trackingRowsPerPage, setTrackingRowsPerPage] = useState(5);

  const paginatedTracking = initialTrackingData.slice(
    (trackingPage - 1) * trackingRowsPerPage,
    trackingPage * trackingRowsPerPage
  );

  return (
    <div className="bg-white border border-slate-200 rounded-lg shadow-sm flex flex-col h-full min-h-[500px]">
      <div className="p-5 border-b border-slate-100 flex justify-between items-center shrink-0 bg-slate-50/50 rounded-t-lg">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Anlık Aday Takibi</h3>
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
        </div>
        <button className="flex items-center gap-1 text-[10px] font-bold text-indigo-600 hover:text-indigo-700 transition-colors uppercase tracking-wider">
          Tümünü Gör
          <ArrowRight size={12} />
        </button>
      </div>
      <div className="flex-1 overflow-y-auto p-2 flex flex-col">
        {paginatedTracking.map((item, i) => (
          <TrackingItem key={i} name={item.name} time={item.time} step={item.step} status={item.status} />
        ))}
      </div>
      <Pagination 
        page={trackingPage} 
        totalPages={Math.ceil(initialTrackingData.length / trackingRowsPerPage)} 
        onPageChange={setTrackingPage} 
        rowsPerPage={trackingRowsPerPage} 
        onRowsChange={(val: number) => { setTrackingRowsPerPage(val); setTrackingPage(1); }} 
        rowsOptions={[5, 10, 20]} 
      />
    </div>
  );
}
