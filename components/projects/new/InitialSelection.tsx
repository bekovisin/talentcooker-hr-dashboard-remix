import React from 'react';
import { useRouter } from 'next/navigation';
import * as Dialog from '@radix-ui/react-dialog';
import { X, LayoutTemplate, PenTool } from 'lucide-react';

interface InitialSelectionProps {
  onClose: () => void;
  onSelectTemplates: () => void;
}

export function InitialSelection({ onClose, onSelectTemplates }: InitialSelectionProps) {
  const router = useRouter();

  return (
    <>
      <div className="flex justify-between items-center mb-4 pb-4 border-b border-slate-200">
        <Dialog.Title className="text-lg font-bold text-slate-900">Yeni Proje Oluştur</Dialog.Title>
        <Dialog.Close className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 text-slate-500 transition-colors">
          <X size={18} />
        </Dialog.Close>
      </div>
      
      <Dialog.Description className="text-sm text-slate-500 mb-6">
        Projenizi nasıl oluşturmak istersiniz? Hazır şablonlarımızdan birini seçebilir veya sıfırdan kendi projenizi tasarlayabilirsiniz.
      </Dialog.Description>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <button 
          onClick={onSelectTemplates}
          className="flex flex-col items-start gap-3 p-5 rounded-lg border-2 border-slate-200 hover:border-indigo-600 hover:bg-indigo-50/50 transition-all text-left group"
        >
          <div className="w-10 h-10 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
            <LayoutTemplate size={20} />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 mb-1 group-hover:text-indigo-700 transition-colors">Şablon Seçimi</h3>
            <p className="text-xs text-slate-500 leading-relaxed">Önceden hazırlanmış, sektöre özel test ve envanter şablonlarıyla hızlıca başlayın.</p>
          </div>
        </button>

        <button 
          onClick={() => {
            onClose();
            router.push('/projects/new');
          }}
          className="flex flex-col items-start gap-3 p-5 rounded-lg border-2 border-slate-200 hover:border-indigo-600 hover:bg-indigo-50/50 transition-all text-left group"
        >
          <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
            <PenTool size={20} />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 mb-1 group-hover:text-indigo-700 transition-colors">Özel Proje Oluştur</h3>
            <p className="text-xs text-slate-500 leading-relaxed">Tüm aşamaları, testleri ve değerlendirme kriterlerini kendiniz belirleyin.</p>
          </div>
        </button>
      </div>
    </>
  );
}
