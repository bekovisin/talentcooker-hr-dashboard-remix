'use client';
import { useState } from 'react';
import { LayoutGrid, Layers, Users, UsersRound, Receipt, Settings, Palette, Menu, X, Plus, Coins } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { icon: <LayoutGrid size={18} />, label: 'Dashboard', href: '/' },
    { icon: <Layers size={18} />, label: 'Projeler', href: '/projects' },
    { icon: <Users size={18} />, label: 'Anlık Takip', href: '#' },
    { icon: <UsersRound size={18} />, label: 'Aday Havuzu', href: '#' },
  ];

  const bottomNavItems = [
    { icon: <Receipt size={18} />, label: 'Faturalandırma', href: '#' },
    { icon: <Settings size={18} />, label: 'Ayarlar', href: '#' },
    { icon: <Palette size={18} />, label: 'Tasarım', href: '/tasarim' },
  ];

  return (
    <>
      {/* Mobile Toggle */}
      {!isOpen && (
        <button 
          className="lg:hidden fixed top-[13px] left-4 z-50 p-2 bg-white rounded-lg shadow-sm border border-slate-200 flex items-center justify-center"
          onClick={() => setIsOpen(true)}
        >
          <Menu size={20} />
        </button>
      )}

      {/* Overlay */}
      {isOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-slate-900/20 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside className={`
        fixed lg:static inset-y-0 left-0 z-40
        w-60 bg-white border-r border-slate-200 flex flex-col h-screen shrink-0
        transform transition-transform duration-200 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="h-16 lg:h-20 px-6 flex items-center justify-between border-b border-slate-200 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-indigo-600 text-white flex items-center justify-center font-bold rounded-lg shadow-sm">
              P
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-sm tracking-tight text-slate-900 uppercase">Psikometrik</span>
            </div>
          </div>
          <button 
            className="lg:hidden p-2 text-slate-500 hover:bg-slate-100 rounded-md -mr-2"
            onClick={() => setIsOpen(false)}
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-4 flex flex-col gap-1 px-3">
          {navItems.map((item, i) => {
            const active = item.href === '/' 
              ? pathname === '/' 
              : pathname === item.href || (item.href !== '#' && pathname.startsWith(item.href));
            return (
              <Link 
                key={i} 
                href={item.href} 
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  active 
                    ? 'bg-slate-50 text-indigo-600 shadow-sm border border-slate-100' 
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
                onClick={() => setIsOpen(false)}
              >
                {item.icon}
                {item.label}
              </Link>
            );
          })}

          <div className="h-px bg-slate-100 my-2 mx-2" />

          {bottomNavItems.map((item, i) => {
            const active = item.href === '/' 
              ? pathname === '/' 
              : pathname === item.href || (item.href !== '#' && pathname.startsWith(item.href));
            return (
              <Link 
                key={`bottom-${i}`} 
                href={item.href} 
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  active 
                    ? 'bg-slate-50 text-indigo-600 shadow-sm border border-slate-100' 
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
                onClick={() => setIsOpen(false)}
              >
                {item.icon}
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-200 flex flex-col gap-3">
          <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg p-4 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-white opacity-10 rounded-full -mr-8 -mt-8 blur-xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white opacity-10 rounded-full -ml-8 -mb-8 blur-xl pointer-events-none" />
            <div className="flex items-center gap-2 mb-2 relative z-10">
              <div className="w-6 h-6 rounded bg-white/20 backdrop-blur-sm flex items-center justify-center text-white">
                <Coins size={14} />
              </div>
              <span className="text-[10px] font-bold text-emerald-50 tracking-wider">KREDİ BAKİYE</span>
            </div>
            <div className="relative z-10">
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-bold text-white">5.830</span>
              </div>
              <div className="text-[10px] font-medium text-emerald-100/80">
                ≈ 29.150 ₺
              </div>
            </div>
          </div>
          <button className="w-full flex items-center justify-center gap-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors shadow-sm">
            <Plus size={16} />
            Kredi Yükle
          </button>
        </div>
      </aside>
    </>
  );
}
