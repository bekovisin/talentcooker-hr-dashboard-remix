import React, { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { InitialSelection } from './projects/new/InitialSelection';
import { TemplateSelection } from './projects/new/TemplateSelection';

export interface TemplateStage {
  id: string;
  title: string;
  type: 'Kişilik' | 'Bilişsel Yetenekler' | 'Teknik Beceriler' | 'Sosyal Beceriler';
  duration: number;
}

export interface Template {
  id: string;
  title: string;
  icon: string;
  stages: TemplateStage[];
}

const templates: Template[] = [
  {
    id: '1',
    title: 'Arayüz (UI) Tasarımcısı',
    icon: '🎨',
    stages: [
      { id: 's1', title: '5 Faktör Kişilik Envanteri', type: 'Kişilik', duration: 5 },
      { id: 's2', title: 'Figma', type: 'Teknik Beceriler', duration: 5 },
      { id: 's3', title: 'Görsel Tasarım', type: 'Teknik Beceriler', duration: 10 },
    ]
  },
  {
    id: '2',
    title: 'Ürün Tasarımcısı',
    icon: '🎨',
    stages: [
      { id: 's1', title: '5 Faktör Kişilik Envanteri', type: 'Kişilik', duration: 5 },
      { id: 's2', title: 'Uyumluluk', type: 'Bilişsel Yetenekler', duration: 5 },
      { id: 's3', title: 'Figma', type: 'Teknik Beceriler', duration: 5 },
      { id: 's4', title: 'Adobe After Effects', type: 'Teknik Beceriler', duration: 5 },
      { id: 's5', title: 'Neden tasarımcı olmak istiyorsunuz?', type: 'Sosyal Beceriler', duration: 5 },
    ]
  },
  {
    id: '3',
    title: 'Hizmet Tasarımcısı',
    icon: '🤝',
    stages: [
      { id: 's1', title: 'Empati ve İletişim', type: 'Sosyal Beceriler', duration: 10 },
      { id: 's2', title: 'Problem Çözme', type: 'Bilişsel Yetenekler', duration: 15 },
    ]
  },
  {
    id: '4',
    title: 'Pazarlama Asistanı',
    icon: '📱',
    stages: [
      { id: 's1', title: 'Sosyal Medya Yönetimi', type: 'Teknik Beceriler', duration: 10 },
      { id: 's2', title: 'Detay Odaklılık', type: 'Bilişsel Yetenekler', duration: 5 },
    ]
  },
  {
    id: '5',
    title: 'Satış Direktörü',
    icon: '💼',
    stages: [
      { id: 's1', title: 'Liderlik', type: 'Sosyal Beceriler', duration: 15 },
      { id: 's2', title: 'Stratejik Düşünme', type: 'Bilişsel Yetenekler', duration: 20 },
      { id: 's3', title: 'Satış Sunumu', type: 'Teknik Beceriler', duration: 10 },
    ]
  },
  {
    id: '6',
    title: 'Pazarlama Koordinatörü',
    icon: '📢',
    stages: [
      { id: 's1', title: 'Kampanya Planlama', type: 'Teknik Beceriler', duration: 15 },
      { id: 's2', title: 'Takım Çalışması', type: 'Sosyal Beceriler', duration: 10 },
    ]
  },
  {
    id: '7',
    title: 'Web Tasarımcısı',
    icon: '💻',
    stages: [
      { id: 's1', title: 'HTML/CSS Temelleri', type: 'Teknik Beceriler', duration: 15 },
      { id: 's2', title: 'UI/UX Prensipleri', type: 'Teknik Beceriler', duration: 10 },
    ]
  },
  {
    id: '8',
    title: 'Köpek Eğitmeni',
    icon: '🐕',
    stages: [
      { id: 's1', title: 'Hayvan Davranışları', type: 'Teknik Beceriler', duration: 15 },
      { id: 's2', title: 'Sabır ve Empati', type: 'Sosyal Beceriler', duration: 10 },
    ]
  },
  {
    id: '9',
    title: 'Hemşire Asistanı',
    icon: '⚕️',
    stages: [
      { id: 's1', title: 'Hasta Bakımı', type: 'Teknik Beceriler', duration: 20 },
      { id: 's2', title: 'Empati', type: 'Sosyal Beceriler', duration: 10 },
    ]
  },
  {
    id: '10',
    title: 'Tıbbi Asistan',
    icon: '🏥',
    stages: [
      { id: 's1', title: 'Tıbbi Terminoloji', type: 'Teknik Beceriler', duration: 15 },
      { id: 's2', title: 'Detay Odaklılık', type: 'Bilişsel Yetenekler', duration: 10 },
    ]
  }
];

interface NewProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function NewProjectModal({ isOpen, onClose }: NewProjectModalProps) {
  const [step, setStep] = useState<'initial' | 'templates'>('initial');

  React.useEffect(() => {
    if (isOpen) {
      setStep('initial');
    }
  }, [isOpen]);

  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 animate-in fade-in-0" />
        <Dialog.Content 
          className={`fixed left-[50%] top-[50%] z-50 translate-x-[-50%] translate-y-[-50%] bg-white shadow-2xl rounded-lg animate-in fade-in-0 zoom-in-95 slide-in-from-left-1/2 slide-in-from-top-[48%] overflow-hidden flex flex-col ${
            step === 'initial' ? 'w-[95vw] sm:w-full max-w-2xl p-4 sm:p-6' : 'w-[95vw] sm:w-full max-w-[1100px] h-[90vh] md:h-[85vh]'
          }`}
        >
          {step === 'initial' ? (
            <InitialSelection 
              onClose={onClose} 
              onSelectTemplates={() => setStep('templates')} 
            />
          ) : (
            <TemplateSelection 
              templates={templates} 
              onClose={onClose} 
            />
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
