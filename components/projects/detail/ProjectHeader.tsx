'use client';

import React from 'react';
import { Mail, MoreVertical, Edit2, PauseCircle, Trash2, Copy, Archive } from 'lucide-react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

export function ProjectHeader({ projectId }: { projectId: string }) {
  return (
    <div className="bg-white border-b border-slate-200 px-4 lg:px-8 pt-16 pb-6 lg:py-6 shrink-0">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-3 mb-1">
            <h1 className="text-xl font-bold text-slate-900">TechNova Solutions - Senior Frontend Developer</h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700">
              Aktif
            </span>
          </div>
          <p className="text-sm text-slate-500 max-w-2xl line-clamp-2 sm:line-clamp-1">
            Modern web teknolojileri kullanarak kullanıcı dostu arayüzler geliştirmek, mevcut projelerin bakımını yapmak...
          </p>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 rounded-lg text-sm font-medium transition-colors">
            <Mail size={16} />
            <span className="inline">E-posta Gönder</span>
          </button>

          <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
              <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
                <MoreVertical size={20} />
              </button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Portal>
              <DropdownMenu.Content 
                className="min-w-[200px] bg-white rounded-xl shadow-lg border border-slate-100 p-1 z-50 animate-in fade-in-80 zoom-in-95"
                align="end"
              >
                <DropdownMenu.Item className="flex items-center gap-2 px-3 py-2 text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg cursor-pointer outline-none">
                  <Edit2 size={16} /> Düzenle
                </DropdownMenu.Item>
                <DropdownMenu.Item className="flex items-center gap-2 px-3 py-2 text-sm text-amber-600 hover:text-amber-700 hover:bg-amber-50 rounded-lg cursor-pointer outline-none">
                  <PauseCircle size={16} /> Projeyi Durdur
                </DropdownMenu.Item>
                <DropdownMenu.Item className="flex items-center gap-2 px-3 py-2 text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg cursor-pointer outline-none">
                  <Copy size={16} /> Çoğalt
                </DropdownMenu.Item>
                <DropdownMenu.Item className="flex items-center gap-2 px-3 py-2 text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg cursor-pointer outline-none">
                  <Archive size={16} /> Arşivle
                </DropdownMenu.Item>
                <DropdownMenu.Separator className="h-px bg-slate-100 my-1" />
                <DropdownMenu.Item className="flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg cursor-pointer outline-none">
                  <Trash2 size={16} /> Sil
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>
        </div>
      </div>
    </div>
  );
}
