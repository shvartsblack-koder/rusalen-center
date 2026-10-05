import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, AlertTriangle, Shield, Download, Search, CheckCircle, Clock, XCircle, Eye } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';

const severityColors = { low: 'bg-blue-500/10 text-blue-700', medium: 'bg-amber-500/10 text-amber-700', high: 'bg-orange-500/10 text-orange-700', critical: 'bg-red-500/10 text-red-700' };
const statusColors = { active: 'bg-red-500/10 text-red-700', assigned: 'bg-amber-500/10 text-amber-700', in_progress: 'bg-blue-500/10 text-blue-700', resolved: 'bg-emerald-500/10 text-emerald-700', closed: 'bg-muted text-muted-foreground' };

export default function Admin() {
  const [tab, setTab] = useState('incidents');
  const [search, setSearch] = useState('');
  const qc = useQueryClient();

  const { data: incidents = [] } = useQuery({
    queryKey: ['admin-incidents'],
    queryFn: () => base44.entities.CrisisIncident.list('-created_date', 100),
  });

  const { data: auditLogs = [] } = useQuery({
    queryKey: ['audit-logs'],
    queryFn: () => base44.entities.AuditLog.list('-created_date', 50),
  });

  const updateIncident = useMutation({
    mutationFn: ({ id, data }) => base44.entities.CrisisIncident.update(id, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['admin-incidents'] }),
  });

  const filteredIncidents = incidents.filter(i =>
    i.user_name?.toLowerCase().includes(search.toLowerCase()) ||
    i.type?.toLowerCase().includes(search.toLowerCase())
  );

  const tabs = [
    { id: 'incidents', label: 'Инциденты', icon: AlertTriangle },
    { id: 'users', label: 'Пользователи', icon: Users },
    { id: 'audit', label: 'Аудит', icon: Shield },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground mb-1">Администрирование</h1>
          <p className="text-muted-foreground">CRM-панель управления платформой</p>
        </div>
        <Button variant="outline" className="rounded-xl">
          <Download className="w-4 h-4 mr-2" />Экспорт
        </Button>
      </div>

      {/* KPI */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Активных инцидентов', value: incidents.filter(i => i.status === 'active').length, color: 'text-red-500', bg: 'bg-red-500/10' },
          { label: 'В обработке', value: incidents.filter(i => i.status === 'in_progress').length, color: 'text-blue-500', bg: 'bg-blue-500/10' },
          { label: 'Решено сегодня', value: incidents.filter(i => i.status === 'resolved').length, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
          { label: 'Всего инцидентов', value: incidents.length, color: 'text-primary', bg: 'bg-primary/10' },
        ].map((k, i) => (
          <div key={i} className="bg-card rounded-xl border border-border p-4">
            <div className={`text-2xl font-display font-bold ${k.color}`}>{k.value}</div>
            <div className="text-xs text-muted-foreground mt-1">{k.label}</div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-5 border-b border-border pb-1">
        {tabs.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)}
            className={`flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-t-lg border-b-2 transition-colors ${tab === t.id ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'}`}>
            <t.icon className="w-4 h-4" />{t.label}
          </button>
        ))}
      </div>

      {tab === 'incidents' && (
        <>
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input value={search} onChange={e => setSearch(e.target.value)} placeholder="Поиск инцидентов..." className="pl-9 rounded-xl" />
          </div>
          <div className="bg-card rounded-2xl border border-border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-muted/50">
                  <tr>
                    {['Пользователь', 'Тип', 'Тяжесть', 'Статус', 'Назначен', 'Действия'].map(h => (
                      <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredIncidents.length === 0 ? (
                    <tr><td colSpan={6} className="px-4 py-8 text-center text-muted-foreground">Инциденты не найдены</td></tr>
                  ) : filteredIncidents.map(inc => (
                    <tr key={inc.id} className="border-t border-border hover:bg-muted/20 transition-colors">
                      <td className="px-4 py-3 font-medium">{inc.user_name || 'Аноним'}</td>
                      <td className="px-4 py-3 text-muted-foreground capitalize">{inc.type}</td>
                      <td className="px-4 py-3"><span className={`px-2 py-0.5 rounded-full text-xs font-medium ${severityColors[inc.severity]}`}>{inc.severity}</span></td>
                      <td className="px-4 py-3"><span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusColors[inc.status]}`}>{inc.status}</span></td>
                      <td className="px-4 py-3 text-muted-foreground text-xs">{inc.assigned_specialist_name || '—'}</td>
                      <td className="px-4 py-3">
                        <div className="flex gap-1">
                          <button title="Принять" onClick={() => updateIncident.mutate({ id: inc.id, data: { status: 'in_progress' } })}
                            className="p-1.5 rounded-lg hover:bg-blue-500/10 text-muted-foreground hover:text-blue-500 transition-colors">
                            <Clock className="w-4 h-4" />
                          </button>
                          <button title="Решить" onClick={() => updateIncident.mutate({ id: inc.id, data: { status: 'resolved' } })}
                            className="p-1.5 rounded-lg hover:bg-emerald-500/10 text-muted-foreground hover:text-emerald-500 transition-colors">
                            <CheckCircle className="w-4 h-4" />
                          </button>
                          <button title="Закрыть" onClick={() => updateIncident.mutate({ id: inc.id, data: { status: 'closed' } })}
                            className="p-1.5 rounded-lg hover:bg-red-500/10 text-muted-foreground hover:text-red-400 transition-colors">
                            <XCircle className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {tab === 'users' && (
        <div className="bg-card rounded-2xl border border-border p-6 text-center">
          <Users className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
          <p className="text-muted-foreground text-sm mb-4">Управление пользователями и специалистами</p>
          <p className="text-xs text-muted-foreground">Используйте системную панель для управления учётными записями</p>
        </div>
      )}

      {tab === 'audit' && (
        <div className="bg-card rounded-2xl border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted/50">
                <tr>
                  {['Пользователь', 'Действие', 'Сущность', 'IP', 'Время'].map(h => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {auditLogs.length === 0 ? (
                  <tr><td colSpan={5} className="px-4 py-8 text-center text-muted-foreground">Журнал пустой</td></tr>
                ) : auditLogs.map(log => (
                  <tr key={log.id} className="border-t border-border hover:bg-muted/20">
                    <td className="px-4 py-3 font-medium">{log.user_name || 'Система'}</td>
                    <td className="px-4 py-3 text-muted-foreground">{log.action}</td>
                    <td className="px-4 py-3 text-muted-foreground">{log.entity_type}</td>
                    <td className="px-4 py-3 text-muted-foreground font-mono text-xs">{log.ip_address || '—'}</td>
                    <td className="px-4 py-3 text-muted-foreground text-xs">{new Date(log.created_date).toLocaleString('ru')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}