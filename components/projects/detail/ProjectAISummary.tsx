'use client';

import React from 'react';
import { Sparkles, ArrowRight, TrendingUp, AlertCircle, CheckCircle2 } from 'lucide-react';

export function ProjectAISummary({ onReview }: { onReview: () => void }) {
  return (
    <div className="relative h-full rounded-2xl overflow-hidden p-[2px] flex flex-col min-h-[320px] group">
      {/* Animated Border Background */}
      <div className="absolute inset-0 bg-indigo-50" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-[conic-gradient(from_0deg,transparent_0_270deg,#6366f1_360deg)] animate-[spin_8s_linear_infinite]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-[conic-gradient(from_180deg,transparent_0_270deg,#a855f7_360deg)] animate-[spin_8s_linear_infinite]" />
      
      {/* Inner Content */}
      <div className="relative flex-1 bg-white/95 backdrop-blur-sm rounded-xl p-5 flex flex-col justify-between z-10">
        <div>
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center shadow-lg shadow-indigo-500/20 shrink-0">
              <Sparkles size={20} className="text-white" />
            </div>
            <h2 className="text-lg font-bold text-slate-900 leading-tight">AI Yönetici Özeti</h2>
          </div>
          
          {/* Compact Data Points */}
          <div className="grid grid-cols-2 gap-3 mb-5">
            <div className="bg-indigo-50/50 rounded-lg p-3 border border-indigo-100/50">
              <div className="flex items-center gap-1.5 text-indigo-600 mb-1">
                <TrendingUp size={14} />
                <span className="text-[10px] font-bold uppercase tracking-wider">Genel Uyum</span>
              </div>
              <div className="text-2xl font-black text-slate-900">%84</div>
            </div>
            <div className="bg-emerald-50/50 rounded-lg p-3 border border-emerald-100/50">
              <div className="flex items-center gap-1.5 text-emerald-600 mb-1">
                <CheckCircle2 size={14} />
                <span className="text-[10px] font-bold uppercase tracking-wider">Geçme Oranı</span>
              </div>
              <div className="text-2xl font-black text-slate-900">%62</div>
            </div>
          </div>
          
          {/* Insights List */}
          <div className="space-y-3">
            <div className="flex items-start gap-2.5">
              <div className="mt-0.5 w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                <CheckCircle2 size={12} />
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                <strong className="text-slate-900">Ayşe Yılmaz</strong> ve <strong className="text-slate-900">Caner Demir</strong> teknik testlerde ortalamanın %30 üzerinde performans gösterdi.
              </p>
            </div>
            <div className="flex items-start gap-2.5">
              <div className="mt-0.5 w-5 h-5 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">
                <AlertCircle size={12} />
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Adayların genelinde <strong className="text-slate-900">İletişim Becerileri</strong> skoru beklenen hedefin altında kaldı.
              </p>
            </div>
          </div>
        </div>
        
        <button 
          onClick={onReview}
          className="mt-5 w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-sm font-bold transition-all border border-indigo-100 group-hover:shadow-[0_0_20px_rgba(99,102,241,0.15)]"
        >
          Detaylı Raporu İncele <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}
