import React from 'react';
import * as Checkbox from '@radix-ui/react-checkbox';
import { Check, X, LayoutTemplate } from 'lucide-react';

interface Step2InventoryProps {
  mockInventories: any[];
  selectedInventories: Set<string>;
  toggleInventory: (id: string) => void;
}

export default function Step2Inventory({
  mockInventories,
  selectedInventories,
  toggleInventory
}: Step2InventoryProps) {
  return (
    <div className="flex flex-col lg:flex-row h-full gap-6">
      {/* Left Panel: Available Inventories */}
      <div className="flex-1 bg-white rounded-xl border border-slate-200 flex flex-col overflow-hidden">
        <div className="p-5 border-b border-slate-100 bg-slate-50/50">
          <h3 className="font-bold text-slate-900">Mevcut Envanterler</h3>
          <p className="text-xs text-slate-500 mt-1">Projeye eklemek istediğiniz envanterleri seçin (opsiyonel)</p>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {mockInventories.map(inv => {
            const isSelected = selectedInventories.has(inv.id);
            return (
              <div key={inv.id} className={`p-3.5 rounded-xl border transition-all ${isSelected ? 'border-indigo-300 bg-indigo-50/50' : 'border-slate-200 hover:border-indigo-200'}`}>
                <div className="flex justify-between items-start mb-1.5">
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-slate-900 text-sm">{inv.title}</h4>
                    <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${inv.typeColor}`}>{inv.type}</span>
                  </div>
                  <button 
                    onClick={() => toggleInventory(inv.id)}
                    className={`px-3 py-1 rounded-md text-[10px] font-bold transition-colors ${
                      isSelected 
                        ? 'bg-rose-50 text-rose-600 hover:bg-rose-100' 
                        : 'bg-indigo-50 text-indigo-600 hover:bg-indigo-100'
                    }`}
                  >
                    {isSelected ? 'Kaldır' : 'Ekle'}
                  </button>
                </div>
                <p className="text-[11px] text-slate-500 leading-relaxed mb-2.5 line-clamp-2">{inv.desc}</p>
                <div className="flex items-center gap-3 text-[10px] font-medium text-slate-400">
                  <span>{inv.items} madde</span>
                  <span>{inv.time} dk</span>
                  <span>{inv.scales} ölçek</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Right Panel: Selected Inventories */}
      <div className="flex-1 bg-white rounded-xl border border-slate-200 flex flex-col overflow-hidden">
        <div className="p-5 border-b border-slate-100 bg-slate-50/50">
          <h3 className="font-bold text-slate-900">Seçilen Envanterler ({selectedInventories.size})</h3>
        </div>
        <div className="flex-1 overflow-y-auto p-5">
          {selectedInventories.size === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center">
              <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center mb-4">
                <LayoutTemplate size={24} className="text-slate-300" />
              </div>
              <p className="text-sm font-medium text-slate-600 mb-1">Henüz envanter seçilmedi</p>
              <p className="text-xs text-slate-400">Sol panelden envanter seçin veya bu adımı atlayabilirsiniz</p>
            </div>
          ) : (
            <div className="space-y-3">
              {Array.from(selectedInventories).map((id, index) => {
                const inv = mockInventories.find(i => i.id === id)!;
                return (
                  <div key={id} className="p-4 rounded-xl border border-slate-200 bg-white">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-6 h-6 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <h4 className="font-bold text-slate-900 text-sm">{inv.title}</h4>
                          <button onClick={() => toggleInventory(id)} className="text-slate-400 hover:text-rose-500 transition-colors p-1">
                            <X size={14} />
                          </button>
                        </div>
                        <p className="text-xs text-slate-500 mt-1">{inv.items} madde • {inv.time} dk</p>
                      </div>
                    </div>
                    <div className="pl-9">
                      <label className="flex items-center gap-2 cursor-pointer group">
                        <Checkbox.Root className="w-4 h-4 rounded border border-slate-300 flex items-center justify-center bg-white data-[state=checked]:bg-indigo-600 data-[state=checked]:border-indigo-600 transition-colors">
                          <Checkbox.Indicator>
                            <Check size={10} className="text-white" strokeWidth={3} />
                          </Checkbox.Indicator>
                        </Checkbox.Root>
                        <span className="text-xs font-medium text-slate-600 group-hover:text-slate-900 transition-colors">Adaya raporu göster</span>
                      </label>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
