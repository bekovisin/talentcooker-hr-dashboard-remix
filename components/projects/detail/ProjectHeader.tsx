'use client';

import React, { useState } from 'react';
import { Layers, Globe, Bell, CheckCircle2, Clock, LogOut } from 'lucide-react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export function ProjectHeader({ projectId }: { projectId: string }) {
  const [lang, setLang] = useState('TR');

  return (
    <div className="bg-white shrink-0">
      <header className="h-16 lg:h-20 pr-4 pl-16 lg:px-8 flex items-center justify-between border-b border-slate-200">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center">
            <Layers size={18} className="lg:w-5 lg:h-5" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2 text-[10px] lg:text-xs text-slate-500 mb-0.5">
              <Link href="/projects" className="hover:text-indigo-600 transition-colors">Projeler</Link>
              <ChevronRight size={12} />
              <span className="text-slate-900 font-medium truncate max-w-[120px] sm:max-w-[200px]">TechNova Solutions - Senior Frontend Developer</span>
            </div>
            <div className="flex items-center gap-2">
              <h1 className="text-sm lg:text-lg font-bold text-slate-900 leading-tight truncate max-w-[200px] sm:max-w-[300px] lg:max-w-md">TechNova Solutions - Senior Frontend Developer</h1>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-emerald-100 text-emerald-700 hidden sm:inline-block">
                Aktif
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 lg:gap-6">
          {/* Language Selector */}
          <div className="relative group hidden sm:block">
            <button className="flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-slate-900">
              <Globe size={16} />
              {lang}
            </button>
            <div className="absolute right-0 top-full mt-2 w-24 bg-white border border-slate-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
              <button onClick={() => setLang('TR')} className="w-full text-left px-4 py-2 text-sm hover:bg-slate-50 text-slate-700 rounded-t-lg">Türkçe</button>
              <button onClick={() => setLang('EN')} className="w-full text-left px-4 py-2 text-sm hover:bg-slate-50 text-slate-700 rounded-b-lg">English</button>
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-semibold">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Live Systems: Active
          </div>

          {/* Notifications Dropdown */}
          <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
              <button className="relative p-2 text-slate-400 hover:text-slate-600 transition-colors outline-none focus:ring-2 focus:ring-indigo-500 rounded-lg">
                <Bell size={20} />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
              </button>
            </DropdownMenu.Trigger>

            <DropdownMenu.Portal>
              <DropdownMenu.Content
                className="w-80 bg-white rounded-xl shadow-xl border border-slate-200 z-50 animate-in fade-in-80 zoom-in-95 data-[side=bottom]:slide-in-from-top-2 overflow-hidden"
                sideOffset={8}
                align="end"
              >
                <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                  <h3 className="font-bold text-slate-900 text-sm">Bildirimler</h3>
                  <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">2 Yeni</span>
                </div>

                <div className="max-h-[300px] overflow-y-auto flex flex-col">
                  <DropdownMenu.Item className="flex gap-3 p-4 border-b border-slate-50 hover:bg-slate-50 outline-none cursor-pointer transition-colors group">
                    <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 size={16} />
                    </div>
                    <div className="flex flex-col gap-1">
                      <p className="text-sm font-medium text-slate-900 leading-tight group-hover:text-indigo-600 transition-colors">Selin Yılmaz mülakatı tamamladı</p>
                      <p className="text-xs text-slate-500">TechNova Solutions projesi için değerlendirme raporu hazır.</p>
                      <span className="text-[10px] font-bold text-slate-400 mt-1">2 DAKİKA ÖNCE</span>
                    </div>
                  </DropdownMenu.Item>

                  <DropdownMenu.Item className="flex gap-3 p-4 border-b border-slate-50 hover:bg-slate-50 outline-none cursor-pointer transition-colors group">
                    <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center shrink-0 mt-0.5">
                      <Clock size={16} />
                    </div>
                    <div className="flex flex-col gap-1">
                      <p className="text-sm font-medium text-slate-900 leading-tight group-hover:text-indigo-600 transition-colors">Yeni aday başvurusu</p>
                      <p className="text-xs text-slate-500">Mono Sigorta projesi için 3 yeni aday havuza eklendi.</p>
                      <span className="text-[10px] font-bold text-slate-400 mt-1">1 SAAT ÖNCE</span>
                    </div>
                  </DropdownMenu.Item>
                </div>

                <div className="p-2 border-t border-slate-100 bg-slate-50/50">
                  <button className="w-full py-2 text-xs font-bold text-slate-600 hover:text-indigo-600 transition-colors text-center">
                    Tüm Bildirimleri Gör
                  </button>
                </div>
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>

          <div className="hidden sm:block w-px h-8 bg-slate-200" />

          <div className="flex items-center gap-3">
            <DropdownMenu.Root>
              <DropdownMenu.Trigger asChild>
                <button className="outline-none focus:ring-2 focus:ring-indigo-500 rounded-lg relative w-8 h-8 lg:w-9 lg:h-9">
                  <Image
                    src="https://i.pravatar.cc/150?u=tamer"
                    alt="Profile"
                    fill
                    className="rounded-lg border border-slate-200 object-cover cursor-pointer hover:opacity-80 transition-opacity"
                    referrerPolicy="no-referrer"
                  />
                </button>
              </DropdownMenu.Trigger>

              <DropdownMenu.Portal>
                <DropdownMenu.Content
                  className="min-w-[200px] bg-white rounded-lg p-1 shadow-lg border border-slate-200 z-50 animate-in fade-in-80 zoom-in-95 data-[side=bottom]:slide-in-from-top-2"
                  sideOffset={8}
                  align="end"
                >
                  <DropdownMenu.Item className="flex items-center gap-2 px-3 py-2 text-sm text-slate-700 font-medium rounded-md hover:bg-slate-50 hover:text-slate-900 outline-none cursor-pointer">
                    Profilim
                  </DropdownMenu.Item>
                  <DropdownMenu.Item className="flex items-center gap-2 px-3 py-2 text-sm text-slate-700 font-medium rounded-md hover:bg-slate-50 hover:text-slate-900 outline-none cursor-pointer">
                    Hesap Ayarları
                  </DropdownMenu.Item>
                  <DropdownMenu.Separator className="h-px bg-slate-100 my-1" />
                  <DropdownMenu.Item className="flex items-center gap-2 px-3 py-2 text-sm text-rose-600 font-medium rounded-md hover:bg-rose-50 outline-none cursor-pointer">
                    <LogOut size={16} />
                    Çıkış Yap
                  </DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu.Portal>
            </DropdownMenu.Root>
            {/* Initials fallback like in design TB */}
            <div className="hidden sm:flex w-8 h-8 lg:w-9 lg:h-9 rounded-lg bg-indigo-600 text-white items-center justify-center text-xs font-bold">
              TB
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}
