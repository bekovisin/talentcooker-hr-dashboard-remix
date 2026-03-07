'use client';
import { Bell, Globe, LogOut, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import { useState } from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import Image from 'next/image';

export function DashboardHeader() {
  const [lang, setLang] = useState('TR');

  return (
    <header className="h-16 lg:h-20 pr-4 pl-16 lg:px-8 flex items-center justify-between bg-white border-b border-slate-200 shrink-0">
      <div className="flex flex-col">
        <h1 className="text-lg lg:text-xl font-bold text-slate-900">Dashboard</h1>
        <p className="text-xs lg:text-sm text-slate-500 font-medium hidden sm:block">Hoş geldiniz, Tamer Bolat</p>
      </div>
      
      <div className="flex items-center gap-3 lg:gap-6">
        {/* Language Selector */}
        <div className="relative group">
          <button className="flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-slate-900">
            <Globe size={16} />
            {lang}
          </button>
          <div className="absolute right-0 top-full mt-2 w-24 bg-white border border-slate-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
            <button onClick={() => setLang('TR')} className="w-full text-left px-4 py-2 text-sm hover:bg-slate-50 text-slate-700 rounded-t-lg">Türkçe</button>
            <button onClick={() => setLang('EN')} className="w-full text-left px-4 py-2 text-sm hover:bg-slate-50 text-slate-700 rounded-b-lg">English</button>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-semibold">
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

                <DropdownMenu.Item className="flex gap-3 p-4 hover:bg-slate-50 outline-none cursor-pointer transition-colors group opacity-60">
                  <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center shrink-0 mt-0.5">
                    <AlertCircle size={16} />
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="text-sm font-medium text-slate-900 leading-tight">Sistem Bakımı</p>
                    <p className="text-xs text-slate-500">Planlı sistem bakımı bu gece 03:00&apos;da yapılacaktır.</p>
                    <span className="text-[10px] font-bold text-slate-400 mt-1">DÜN</span>
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
        </div>
      </div>
    </header>
  );
}
