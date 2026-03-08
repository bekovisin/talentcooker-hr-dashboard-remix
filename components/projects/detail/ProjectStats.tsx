'use client';

import React from 'react';
import { Users, CheckCircle2, Clock, TrendingUp, Minus } from 'lucide-react';
import { AreaChart, Area, ResponsiveContainer, Tooltip } from 'recharts';

const data1 = [
  { date: '1', value: 10 }, { date: '2', value: 25 }, { date: '3', value: 15 }, { date: '4', value: 30 }, { date: '5', value: 20 }, { date: '6', value: 40 }, { date: '7', value: 35 }
];

const data2 = [
  { date: '1', value: 20 }, { date: '2', value: 15 }, { date: '3', value: 35 }, { date: '4', value: 25 }, { date: '5', value: 45 }, { date: '6', value: 30 }, { date: '7', value: 50 }
];

const data3 = [
  { date: '1', value: 30 }, { date: '2', value: 32 }, { date: '3', value: 28 }, { date: '4', value: 31 }, { date: '5', value: 29 }, { date: '6', value: 30 }, { date: '7', value: 25 }
];

const data4 = [
  { date: '1', value: 10 }, { date: '2', value: 15 }, { date: '3', value: 20 }, { date: '4', value: 25 }, { date: '5', value: 30 }, { date: '6', value: 35 }, { date: '7', value: 40 }
];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-800 text-white text-xs font-bold px-2.5 py-1.5 rounded-md shadow-md">
        {`${payload[0].value}`}
      </div>
    );
  }
  return null;
};

export function ProjectStats() {
  const stats = [
    {
      title: 'Toplam Aday',
      value: '124',
      change: '+12',
      trend: 'up',
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      chartData: data1,
      chartColor: '#2563eb',
      badgeColor: 'bg-blue-50 text-blue-700',
    },
    {
      title: 'Tamamlayan',
      value: '86',
      change: '69%',
      trend: 'neutral',
      icon: CheckCircle2,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      chartData: data2,
      chartColor: '#10b981',
      badgeColor: 'bg-slate-100 text-slate-600',
    },
    {
      title: 'Ortalama Süre',
      value: '42 dk',
      change: '-3 dk',
      trend: 'down',
      icon: Clock,
      color: 'text-amber-600',
      bgColor: 'bg-amber-50',
      chartData: data3,
      chartColor: '#d97706',
      badgeColor: 'bg-emerald-50 text-emerald-700',
    },
    {
      title: 'Ortalama Skor',
      value: '78.4',
      change: '+2.1',
      trend: 'up',
      icon: TrendingUp,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      chartData: data4,
      chartColor: '#9333ea',
      badgeColor: 'bg-purple-50 text-purple-700',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-[0_1px_3px_rgb(0_0_0/0.02)] flex flex-col justify-between group">
          <div className="flex justify-between items-start mb-4">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${stat.bgColor} ${stat.color}`}>
              <stat.icon size={20} />
            </div>
            <div className="w-24 h-12">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={stat.chartData}>
                  <defs>
                    <linearGradient id={`color-${index}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={stat.chartColor} stopOpacity={0.3} />
                      <stop offset="95%" stopColor={stat.chartColor} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <Tooltip content={<CustomTooltip />} />
                  <Area type="monotone" dataKey="value" stroke={stat.chartColor} strokeWidth={2} fillOpacity={1} fill={`url(#color-${index})`} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="flex items-end justify-between">
            <div>
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">{stat.title}</h3>
              <p className="text-3xl font-black text-slate-900">{stat.value}</p>
            </div>
            <span className={`text-xs font-semibold px-2 py-1 rounded flex items-center gap-1 mb-1 ${stat.badgeColor}`}>
              {stat.change}
              {stat.trend === 'up' && <TrendingUp size={14} />}
              {stat.trend === 'down' && <TrendingUp size={14} className="transform rotate-180" />}
              {stat.trend === 'neutral' && <Minus size={14} />}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
