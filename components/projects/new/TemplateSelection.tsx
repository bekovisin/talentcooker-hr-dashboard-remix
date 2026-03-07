import React, { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { Search, X, User, Brain, Wrench, MessageCircle } from 'lucide-react';
import { Template, TemplateStage } from '../NewProjectModal';

const getTypeStyles = (type: TemplateStage['type']) => {
  switch (type) {
    case 'Kişilik':
      return { bg: 'bg-[#FFF3E0]', text: 'text-[#E65100]', icon: <User size={12} className="mr-1.5" /> };
    case 'Bilişsel Yetenekler':
      return { bg: 'bg-[#F3E5F5]', text: 'text-[#6A1B9A]', icon: <Brain size={12} className="mr-1.5" /> };
    case 'Teknik Beceriler':
      return { bg: 'bg-[#E3F2FD]', text: 'text-[#1565C0]', icon: <Wrench size={12} className="mr-1.5" /> };
    case 'Sosyal Beceriler':
      return { bg: 'bg-[#E0F7FA]', text: 'text-[#00838F]', icon: <MessageCircle size={12} className="mr-1.5" /> };
  }
};

interface TemplateSelectionProps {
  templates: Template[];
  onClose: () => void;
}

export function TemplateSelection({ templates, onClose }: TemplateSelectionProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>(templates[1].id);

  const filteredTemplates = templates.filter(t => 
    t.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedTemplate = templates.find(t => t.id === selectedTemplateId);

  return (
    <div className="flex flex-col md:flex-row h-full w-full bg-white overflow-hidden">
      {/* Left Side: Templates Grid */}
      <div className="flex-1 flex flex-col h-1/2 md:h-full overflow-hidden border-b md:border-b-0 md:border-r border-slate-100">
        <div className="p-6 pb-4 shrink-0">
          <h2 className="text-xl font-bold text-[#1E1B4B] text-center mb-6">Tüm Şablonlar</h2>
          
          <div className="relative max-w-[700px] mx-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input 
              type="text" 
              placeholder="Şablon ara" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 bg-[#F8F9FA] border-none rounded-lg text-slate-700 focus:ring-2 focus:ring-indigo-500 outline-none text-sm"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 pt-2">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 max-w-[700px] mx-auto">
            {filteredTemplates.map((template) => {
              const isSelected = selectedTemplateId === template.id;
              const totalDuration = template.stages.reduce((acc, stage) => acc + stage.duration, 0);
              
              return (
                <button
                  key={template.id}
                  onClick={() => setSelectedTemplateId(template.id)}
                  className={`relative flex flex-col items-center justify-center p-4 rounded-lg border transition-all aspect-[4/3] overflow-hidden group ${
                    isSelected 
                      ? 'border-indigo-600 shadow-[0_0_0_1px_rgba(79,70,229,1)] bg-white' 
                      : 'border-slate-200 bg-white hover:border-indigo-300 hover:shadow-sm'
                  }`}
                >
                  <div className="absolute inset-0 opacity-[0.02] pointer-events-none" 
                       style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)', backgroundSize: '24px 24px' }} />
                  
                  <h3 className={`text-center font-bold text-sm leading-snug relative z-10 ${isSelected ? 'text-indigo-600' : 'text-[#1E1B4B]'}`}>
                    {template.title}
                  </h3>
                  <p className={`text-[11px] font-medium mt-1.5 relative z-10 ${isSelected ? 'text-indigo-500' : 'text-slate-500'}`}>
                    {template.stages.length} Aşama • {totalDuration} dk
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Right Side: Template Details */}
      <div className="w-full md:w-[360px] shrink-0 flex flex-col h-1/2 md:h-full bg-slate-50 relative">
        <Dialog.Close className="absolute right-4 top-4 w-7 h-7 flex items-center justify-center rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-500 transition-colors z-10 shadow-sm">
          <X size={14} />
        </Dialog.Close>

        {selectedTemplate ? (
          <div className="flex-1 overflow-y-auto p-6 pb-24 flex flex-col">
            <div className="flex flex-col items-center text-center mb-8 mt-2">
              <div className="w-10 h-10 rounded-lg bg-[#E0F2F1] flex items-center justify-center text-xl mb-3">
                {selectedTemplate.icon}
              </div>
              <h2 className="text-lg font-bold text-[#1E1B4B] mb-1">{selectedTemplate.title}</h2>
              <p className="text-slate-400 text-xs font-medium">Değerlendirme Önizlemesi</p>
            </div>

            <div className="flex flex-col gap-3">
              {selectedTemplate.stages.map((stage, index) => {
                const typeStyle = getTypeStyles(stage.type);
                return (
                  <div key={stage.id} className="bg-white p-3.5 rounded-lg border border-slate-200 flex items-start gap-3">
                    <div className="w-6 h-6 rounded-md bg-slate-100 text-slate-500 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-[#1E1B4B] text-sm leading-tight mb-2">{stage.title}</h4>
                      <div className="flex items-center gap-3">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold ${typeStyle.bg} ${typeStyle.text}`}>
                          {typeStyle.icon}
                          {stage.type}
                        </span>
                        <span className="text-[11px] font-medium text-slate-500">{stage.duration} dk</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center text-slate-400 text-sm">
            Detayları görmek için bir şablon seçin
          </div>
        )}

        {/* Fixed Bottom Action */}
        <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-slate-50 via-slate-50 to-transparent">
          <button 
            onClick={() => onClose()}
            className="w-full py-3 bg-[#312E81] hover:bg-[#1E1B4B] text-white rounded-lg font-medium text-sm transition-colors shadow-md"
          >
            Bu şablonu kullan
          </button>
        </div>
      </div>
    </div>
  );
}
