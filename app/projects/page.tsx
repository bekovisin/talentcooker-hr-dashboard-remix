'use client';

import { Sidebar } from '@/components/Sidebar';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Toaster, toast } from 'sonner';
import {
  MoreVertical, Users, Layers, Calendar, Plus,
  Trash2, Archive, Copy, Edit2, Check,
  ChevronDown, Play, Pause, CheckCircle2, AlertTriangle, X,
  Bell, Globe, LogOut, Clock, AlertCircle
} from 'lucide-react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import * as Dialog from '@radix-ui/react-dialog';
import * as Checkbox from '@radix-ui/react-checkbox';
import Image from 'next/image';
import { NewProjectModal } from '@/components/NewProjectModal';
import { ProjectDetailModal } from '@/components/ProjectDetailModal';

// Define types and initial data
type ProjectStatus = 'Aktif' | 'Durduruldu' | 'Tamamlandı' | 'Arşiv';

interface Project {
  id: string;
  title: string;
  status: ProjectStatus;
  description: string;
  candidates: number;
  stages: number;
  date1: string;
  date2: string;
  progress: number;
  completed: number;
  total: number;
}

const initialProjects: Project[] = [
  {
    id: '1',
    title: "Mono Sigorta - Sağlık Sigortaları Danışmanı",
    status: "Aktif",
    description: "Dijital kanallardan gelen müşterilere sağlık sigortaları hakkında bilgi vermek, ihtiyaç analizi yaparak uygun poliçe önerileri sunmak ve...",
    candidates: 16,
    stages: 3,
    date1: "02.03.2026",
    date2: "02.03.2026 — 10.03.2026",
    progress: 38,
    completed: 6,
    total: 16
  },
  {
    id: '2',
    title: "TechNova Solutions - Senior Frontend Developer",
    status: "Aktif",
    description: "Modern web teknolojileri kullanarak kullanıcı dostu arayüzler geliştirmek, mevcut projelerin bakımını yapmak ve yeni özellikler eklemek...",
    candidates: 24,
    stages: 4,
    date1: "15.03.2026",
    date2: "15.03.2026 — 25.03.2026",
    progress: 85,
    completed: 20,
    total: 24
  },
  {
    id: '3',
    title: "Global Logistics - Operasyon Sorumlusu",
    status: "Durduruldu",
    description: "Günlük lojistik operasyonlarını planlamak, takip etmek ve raporlamak, müşteri taleplerini karşılamak ve süreç iyileştirmeleri yapmak...",
    candidates: 12,
    stages: 2,
    date1: "20.03.2026",
    date2: "20.03.2026 — 30.03.2026",
    progress: 15,
    completed: 2,
    total: 12
  }
];

// Helper for status badge colors
const getStatusColor = (status: ProjectStatus) => {
  switch (status) {
    case 'Aktif': return 'text-emerald-700 bg-emerald-100';
    case 'Durduruldu': return 'text-amber-700 bg-amber-100';
    case 'Tamamlandı': return 'text-indigo-700 bg-indigo-100';
    case 'Arşiv': return 'text-slate-700 bg-slate-100';
    default: return 'text-slate-700 bg-slate-100';
  }
};

export default function ProjectsPage() {
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [filter, setFilter] = useState<'Tümü' | ProjectStatus>('Tümü');
  const [isSelectMode, setIsSelectMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [isNewProjectModalOpen, setIsNewProjectModalOpen] = useState(false);
  const [lang, setLang] = useState('TR');
  const [selectedProjectDetail, setSelectedProjectDetail] = useState<Project | null>(null);

  // Modal state
  const [modalConfig, setModalConfig] = useState<{
    isOpen: boolean;
    title: string;
    description: string;
    actionLabel: string;
    actionType: 'danger' | 'primary';
    onConfirm: () => void;
  }>({
    isOpen: false,
    title: '',
    description: '',
    actionLabel: '',
    actionType: 'primary',
    onConfirm: () => { }
  });

  const openModal = (config: Omit<typeof modalConfig, 'isOpen'>) => {
    setModalConfig({ ...config, isOpen: true });
  };

  const closeModal = () => {
    setModalConfig(prev => ({ ...prev, isOpen: false }));
  };

  // Actions
  const handleBulkDelete = () => {
    openModal({
      title: 'Projeleri Sil',
      description: `${selectedIds.size} projeyi silmek istediğinize emin misiniz? Bu işlem geri alınamaz.`,
      actionLabel: 'Sil',
      actionType: 'danger',
      onConfirm: () => {
        setProjects(projects.filter(p => !selectedIds.has(p.id)));
        setSelectedIds(new Set());
        setIsSelectMode(false);
        toast.success(`${selectedIds.size} proje başarıyla silindi.`);
        closeModal();
      }
    });
  };

  const handleBulkStatusChange = (newStatus: ProjectStatus) => {
    openModal({
      title: 'Durum Güncelle',
      description: `${selectedIds.size} projenin durumunu "${newStatus}" olarak değiştirmek istediğinize emin misiniz?`,
      actionLabel: 'Güncelle',
      actionType: 'primary',
      onConfirm: () => {
        setProjects(projects.map(p => selectedIds.has(p.id) ? { ...p, status: newStatus } : p));
        setSelectedIds(new Set());
        setIsSelectMode(false);
        toast.success(`Projelerin durumu "${newStatus}" olarak güncellendi.`);
        closeModal();
      }
    });
  };

  const handleSingleDelete = (id: string) => {
    openModal({
      title: 'Projeyi Sil',
      description: `Bu projeyi silmek istediğinize emin misiniz? Bu işlem geri alınamaz.`,
      actionLabel: 'Sil',
      actionType: 'danger',
      onConfirm: () => {
        setProjects(projects.filter(p => p.id !== id));
        toast.success(`Proje başarıyla silindi.`);
        closeModal();
      }
    });
  };

  const handleSingleStatusChange = (id: string, newStatus: ProjectStatus) => {
    openModal({
      title: 'Durum Güncelle',
      description: `Projenin durumunu "${newStatus}" olarak değiştirmek istediğinize emin misiniz?`,
      actionLabel: 'Güncelle',
      actionType: 'primary',
      onConfirm: () => {
        setProjects(projects.map(p => p.id === id ? { ...p, status: newStatus } : p));
        toast.success(`Proje durumu "${newStatus}" olarak güncellendi.`);
        closeModal();
      }
    });
  };

  const handleDuplicate = (project: Project) => {
    openModal({
      title: 'Projeyi Çoğalt',
      description: `Bu projeyi çoğaltmak istediğinize emin misiniz?`,
      actionLabel: 'Çoğalt',
      actionType: 'primary',
      onConfirm: () => {
        const newProject = { ...project, id: Math.random().toString(), title: `${project.title} (Kopya)` };
        setProjects([...projects, newProject]);
        toast.success(`Proje başarıyla çoğaltıldı.`);
        closeModal();
      }
    });
  };

  const handleArchive = (id: string) => {
    openModal({
      title: 'Projeyi Arşivle',
      description: `Bu projeyi arşivlemek istediğinize emin misiniz?`,
      actionLabel: 'Arşivle',
      actionType: 'primary',
      onConfirm: () => {
        setProjects(projects.map(p => p.id === id ? { ...p, status: 'Arşiv' } : p));
        toast.success(`Proje başarıyla arşivlendi.`);
        closeModal();
      }
    });
  };

  const toggleSelection = (id: string) => {
    const newSet = new Set(selectedIds);
    if (newSet.has(id)) newSet.delete(id);
    else newSet.add(id);
    setSelectedIds(newSet);
  };

  const toggleSelectAll = () => {
    if (selectedIds.size === filteredProjects.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(filteredProjects.map(p => p.id)));
    }
  };

  const filteredProjects = projects.filter(p => filter === 'Tümü' || p.status === filter);

  return (
    <div className="flex h-screen bg-slate-50 text-slate-900 font-sans overflow-hidden">
      <Sidebar />
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Fixed Header & Tabs */}
        <div className="bg-white border-b border-slate-200 shrink-0">
          {/* Top Navbar matching DashboardHeader */}
          <header className="h-16 lg:h-20 pr-4 pl-16 lg:px-8 flex items-center justify-between border-b border-slate-200">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center">
                <Layers size={18} className="lg:w-5 lg:h-5" />
              </div>
              <div className="flex flex-col">
                <h1 className="text-lg lg:text-xl font-bold text-slate-900 leading-tight">Projeler</h1>
                <p className="text-[10px] lg:text-xs text-slate-500 hidden sm:block">Tüm işe alım projelerinizi buradan yönetin.</p>
              </div>
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

          {/* Tabs Menu & Controls */}
          <div className="pr-4 pl-16 lg:px-8 pt-3 flex items-end justify-between overflow-x-auto no-scrollbar">
            <div className="flex gap-6 -mb-[1px]">
              {['Tümü', 'Aktif', 'Durduruldu', 'Tamamlandı', 'Arşiv'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setFilter(tab as any)}
                  className={`pb-3 text-base font-medium border-b-2 transition-colors whitespace-nowrap ${filter === tab ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'}`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Controls */}
            <div className="flex items-center gap-3 pb-3">
              {/* Sorting */}
              <DropdownMenu.Root>
                <DropdownMenu.Trigger asChild>
                  <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors">
                    Sırala: Yeniden Eskiye
                    <ChevronDown size={14} className="text-slate-400" />
                  </button>
                </DropdownMenu.Trigger>
                <DropdownMenu.Portal>
                  <DropdownMenu.Content align="end" className="z-50 min-w-[180px] bg-white rounded-lg shadow-lg border border-slate-200 p-1 animate-in fade-in-80 zoom-in-95">
                    <DropdownMenu.Item className="px-3 py-2 text-sm text-slate-700 hover:bg-slate-100 rounded-md cursor-pointer outline-none">Yeniden Eskiye</DropdownMenu.Item>
                    <DropdownMenu.Item className="px-3 py-2 text-sm text-slate-700 hover:bg-slate-100 rounded-md cursor-pointer outline-none">Eskiden Yeniye</DropdownMenu.Item>
                    <DropdownMenu.Item className="px-3 py-2 text-sm text-slate-700 hover:bg-slate-100 rounded-md cursor-pointer outline-none">A-Z</DropdownMenu.Item>
                    <DropdownMenu.Item className="px-3 py-2 text-sm text-slate-700 hover:bg-slate-100 rounded-md cursor-pointer outline-none">Z-A</DropdownMenu.Item>
                  </DropdownMenu.Content>
                </DropdownMenu.Portal>
              </DropdownMenu.Root>

              {/* Select Mode Toggle */}
              {!isSelectMode ? (
                <button
                  onClick={() => setIsSelectMode(true)}
                  className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  Seç
                </button>
              ) : (
                <div className="flex items-center gap-2">
                  <button
                    onClick={toggleSelectAll}
                    className="px-3 py-1.5 rounded-lg border border-indigo-200 bg-indigo-50 text-sm font-medium text-indigo-700 hover:bg-indigo-100 transition-colors"
                  >
                    {selectedIds.size === filteredProjects.length ? 'Seçimi Temizle' : 'Tümünü Seç'}
                  </button>
                  <button
                    onClick={() => {
                      setIsSelectMode(false);
                      setSelectedIds(new Set());
                    }}
                    className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
                  >
                    İptal
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Scrollable Main Area */}
        <div className="flex-1 overflow-y-auto w-full relative">
          <div className="w-full max-w-[1400px] mx-auto p-4 lg:px-8">

            {/* Bulk Actions Bar */}
            {isSelectMode && selectedIds.size > 0 && (
              <div className="sticky top-0 z-20 bg-white border-b border-slate-200 shadow-sm animate-in slide-in-from-top-2">
                <div className="w-full max-w-[1400px] mx-auto py-3 flex justify-between items-center">
                  <span className="text-sm font-bold text-slate-700">{selectedIds.size} proje seçildi</span>
                  <div className="flex items-center gap-2">
                    <DropdownMenu.Root>
                      <DropdownMenu.Trigger asChild>
                        <button className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-sm font-medium transition-colors flex items-center gap-2">
                          Durum Değiştir
                          <ChevronDown size={14} />
                        </button>
                      </DropdownMenu.Trigger>
                      <DropdownMenu.Portal>
                        <DropdownMenu.Content align="end" className="z-50 min-w-[160px] bg-white rounded-lg shadow-lg border border-slate-200 p-1 animate-in fade-in-80 zoom-in-95">
                          <DropdownMenu.Item onClick={() => handleBulkStatusChange('Aktif')} className="px-3 py-2 text-sm text-slate-700 hover:bg-slate-100 rounded-md cursor-pointer outline-none flex items-center gap-2">
                            <Play size={14} className="text-emerald-500" /> Aktif Yap
                          </DropdownMenu.Item>
                          <DropdownMenu.Item onClick={() => handleBulkStatusChange('Durduruldu')} className="px-3 py-2 text-sm text-slate-700 hover:bg-slate-100 rounded-md cursor-pointer outline-none flex items-center gap-2">
                            <Pause size={14} className="text-amber-500" /> Durdur
                          </DropdownMenu.Item>
                          <DropdownMenu.Item onClick={() => handleBulkStatusChange('Tamamlandı')} className="px-3 py-2 text-sm text-slate-700 hover:bg-slate-100 rounded-md cursor-pointer outline-none flex items-center gap-2">
                            <CheckCircle2 size={14} className="text-indigo-500" /> Tamamlandı İşaretle
                          </DropdownMenu.Item>
                        </DropdownMenu.Content>
                      </DropdownMenu.Portal>
                    </DropdownMenu.Root>

                    <button
                      onClick={handleBulkDelete}
                      className="px-3 py-1.5 rounded-lg border border-rose-200 bg-rose-50 hover:bg-rose-100 text-rose-700 text-sm font-medium transition-colors flex items-center gap-2"
                    >
                      <Trash2 size={14} />
                      Sil
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Grid Area */}
            <div className="w-full max-w-[1400px] mx-auto py-4 lg:py-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">

                {/* Create New Project Card */}
                {filter === 'Tümü' && (
                  <button
                    onClick={() => setIsNewProjectModalOpen(true)}
                    className="bg-white border-2 border-dashed border-slate-300 rounded-xl flex flex-col items-center justify-center text-slate-500 hover:text-indigo-600 hover:border-indigo-300 hover:bg-indigo-50/50 transition-all h-full min-h-[320px] group"
                  >
                    <div className="w-12 h-12 rounded-full bg-slate-100 group-hover:bg-indigo-100 flex items-center justify-center mb-4 transition-colors">
                      <Plus size={24} className="text-slate-400 group-hover:text-indigo-600" />
                    </div>
                    <span className="font-bold text-lg">Yeni Proje Oluştur</span>
                    <span className="text-sm mt-1 opacity-70">Sıfırdan veya şablondan</span>
                  </button>
                )}

                {/* Project Cards */}
                {filteredProjects.map((p) => {
                  let progressColor = "bg-emerald-500";
                  if (p.progress < 40) progressColor = "bg-rose-500";
                  else if (p.progress < 70) progressColor = "bg-amber-400";

                  const isSelected = selectedIds.has(p.id);

                  return (
                    <div
                      key={p.id}
                      className={`bg-white border rounded-lg flex flex-col transition-all overflow-hidden h-full min-h-[300px] relative cursor-pointer ${isSelected ? 'border-indigo-500 ring-1 ring-indigo-500 bg-indigo-50/10' : 'border-slate-200 hover:border-indigo-300'
                        }`}
                      onClick={() => isSelectMode ? toggleSelection(p.id) : router.push(`/projects/${p.id}`)}
                    >
                      {/* Selection Overlay/Checkbox */}
                      {isSelectMode && (
                        <div className={`absolute top-3 left-3 z-10 w-5 h-5 rounded border flex items-center justify-center transition-colors ${isSelected ? 'bg-indigo-600 border-indigo-600 text-white' : 'bg-white border-slate-300'
                          }`}>
                          {isSelected && <CheckCircle2 size={14} />}
                        </div>
                      )}

                      <div className="p-4 flex flex-col flex-1">
                        <div className="flex items-start justify-between gap-3 mb-2">
                          <div className={`flex items-start justify-between gap-3 mb-2 ${isSelectMode ? 'ml-7' : ''}`}>
                            <span className={`px-2 py-0.5 rounded-full text-[10px] sm:text-[11px] font-medium shrink-0 ${getStatusColor(p.status)}`}>
                              {p.status}
                            </span>
                          </div>

                          <DropdownMenu.Root>
                            <DropdownMenu.Trigger asChild>
                              <button
                                className="text-slate-400 hover:text-slate-600 transition-colors p-1 -m-1"
                                onClick={(e) => { e.stopPropagation(); }}
                              >
                                <MoreVertical size={16} />
                              </button>
                            </DropdownMenu.Trigger>
                            <DropdownMenu.Portal>
                              <DropdownMenu.Content
                                align="end"
                                className="z-50 min-w-[180px] bg-white rounded-lg shadow-lg border border-slate-200 p-1 animate-in fade-in-80 zoom-in-95"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <DropdownMenu.Item
                                  className="px-3 py-2 text-sm text-slate-700 hover:bg-slate-100 rounded-md cursor-pointer outline-none flex items-center gap-2"
                                  onClick={() => {
                                    if (p.status === 'Aktif') handleSingleStatusChange(p.id, 'Durduruldu');
                                    else handleSingleStatusChange(p.id, 'Aktif');
                                  }}
                                >
                                  {p.status === 'Aktif' ? <><Pause size={14} className="text-amber-500" /> Durdur</> : <><Play size={14} className="text-emerald-500" /> Aktif Yap</>}
                                </DropdownMenu.Item>
                                <DropdownMenu.Item
                                  className="px-3 py-2 text-sm text-slate-700 hover:bg-slate-100 rounded-md cursor-pointer outline-none flex items-center gap-2"
                                  onClick={() => handleDuplicate(p)}
                                >
                                  <Copy size={14} /> Çoğalt
                                </DropdownMenu.Item>
                                {p.status !== 'Tamamlandı' && p.status !== 'Arşiv' && (
                                  <DropdownMenu.Item
                                    className="px-3 py-2 text-sm text-slate-700 hover:bg-slate-100 rounded-md cursor-pointer outline-none flex items-center gap-2"
                                    onClick={() => handleSingleStatusChange(p.id, 'Tamamlandı')}
                                  >
                                    <CheckCircle2 size={14} className="text-indigo-500" /> Tamamlandı İşaretle
                                  </DropdownMenu.Item>
                                )}
                                <DropdownMenu.Separator className="h-px bg-slate-100 my-1" />
                                {p.status !== 'Arşiv' && (
                                  <DropdownMenu.Item
                                    className="px-3 py-2 text-sm text-slate-700 hover:bg-slate-100 rounded-md cursor-pointer outline-none flex items-center gap-2"
                                    onClick={() => handleArchive(p.id)}
                                  >
                                    <Archive size={14} /> Arşivle
                                  </DropdownMenu.Item>
                                )}
                                <DropdownMenu.Item
                                  className="px-3 py-2 text-sm text-rose-600 hover:bg-rose-50 rounded-md cursor-pointer outline-none flex items-center gap-2"
                                  onClick={() => handleSingleDelete(p.id)}
                                >
                                  <Trash2 size={14} /> Sil
                                </DropdownMenu.Item>
                              </DropdownMenu.Content>
                            </DropdownMenu.Portal>
                          </DropdownMenu.Root>
                        </div>

                        <h3 className="font-bold text-slate-900 text-[13px] sm:text-[14px] mb-1.5 line-clamp-2 md:line-clamp-1 xl:line-clamp-2 group-hover:text-indigo-600 transition-colors pr-4">{p.title}</h3>
                        <p className="text-[11.5px] sm:text-[12px] text-slate-500 mb-3 line-clamp-3 md:line-clamp-2 xl:line-clamp-3 leading-relaxed flex-1">
                          {p.description}
                        </p>

                        <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[10px] text-slate-500 font-medium mb-4">
                          <div className="flex items-center gap-1">
                            <Users size={10} />
                            <span>{p.candidates} aday</span>
                          </div>
                          <div className="w-1 h-1 rounded-full bg-slate-300" />
                          <div className="flex items-center gap-1">
                            <Layers size={10} />
                            <span>{p.stages} aşama</span>
                          </div>
                          <div className="w-1 h-1 rounded-full bg-slate-300" />
                          <div className="flex items-center gap-1">
                            <Calendar size={10} />
                            <span className="line-clamp-1">{p.date1}</span>
                          </div>
                        </div>

                        <div className="w-full pt-4 border-t border-slate-100">
                          <div className="flex justify-between items-end mb-2">
                            <div className="text-xs text-slate-500 font-medium">
                              {p.completed}/{p.total} tamamlandı
                            </div>
                            <span className="text-lg font-bold text-slate-700">%{p.progress}</span>
                          </div>
                          <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden mb-4">
                            <div className={`h-full rounded-full ${progressColor}`} style={{ width: `${p.progress}%` }} />
                          </div>

                          {!isSelectMode && (
                            <div className="flex gap-2">
                              <button
                                className="flex-1 py-1.5 bg-slate-50 hover:bg-slate-100 text-slate-700 text-[11.5px] font-bold rounded-lg border border-slate-200 transition-colors"
                                onClick={(e) => { e.stopPropagation(); setSelectedProjectDetail(p); }}
                              >
                                İlerleme Durumu
                              </button>
                              <button className="flex-1 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-[11.5px] font-bold rounded-lg border border-indigo-100 transition-colors">
                                İncele
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Warning Modal */}
      <Dialog.Root open={modalConfig.isOpen} onOpenChange={(open) => !open && closeModal()}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 animate-in fade-in-0" />
          <Dialog.Content className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-md translate-x-[-50%] translate-y-[-50%] gap-4 border border-slate-200 bg-white p-6 shadow-xl rounded-xl animate-in fade-in-0 zoom-in-95 slide-in-from-left-1/2 slide-in-from-top-[48%]">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${modalConfig.actionType === 'danger' ? 'bg-rose-100 text-rose-600' : 'bg-indigo-100 text-indigo-600'}`}>
                <AlertTriangle size={24} />
              </div>
              <div>
                <Dialog.Title className="text-lg font-bold text-slate-900">{modalConfig.title}</Dialog.Title>
                <Dialog.Description className="text-sm text-slate-500 mt-2">
                  {modalConfig.description}
                </Dialog.Description>
              </div>
            </div>

            <div className="flex gap-3 mt-4">
              <button
                onClick={closeModal}
                className="flex-1 py-2.5 bg-white border border-slate-200 text-slate-700 text-sm font-bold rounded-lg hover:bg-slate-50 transition-colors"
              >
                İptal
              </button>
              <button
                onClick={modalConfig.onConfirm}
                className={`flex-1 py-2.5 text-white text-sm font-bold rounded-lg transition-colors ${modalConfig.actionType === 'danger'
                  ? 'bg-rose-600 hover:bg-rose-700'
                  : 'bg-indigo-600 hover:bg-indigo-700'
                  }`}
              >
                {modalConfig.actionLabel}
              </button>
            </div>
            <Dialog.Close className="absolute right-4 top-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none">
              <X className="h-4 w-4" />
              <span className="sr-only">Kapat</span>
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      <Toaster position="top-right" richColors />

      <NewProjectModal
        isOpen={isNewProjectModalOpen}
        onClose={() => setIsNewProjectModalOpen(false)}
      />
    </div>
  );
}
