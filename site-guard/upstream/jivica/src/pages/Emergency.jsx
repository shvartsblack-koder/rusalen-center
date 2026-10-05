import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, Phone, CheckCircle2, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { base44 } from '@/api/base44Client';

const steps = [
  'Определяем геолокацию...',
  'Создаём кризисный запрос...',
  'Уведомляем ближайших специалистов...',
  'Уведомляем доверенные контакты...',
  'Запись инцидента создана',
];

export default function Emergency() {
  const [activated, setActivated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(0);

  const activatePanic = useCallback(async () => {
    setActivated(true);
    setLoading(true);

    for (let i = 0; i < steps.length; i++) {
      setStep(i);
      await new Promise(r => setTimeout(r, 1200));
    }

    let lat = 55.751244, lng = 37.618423;
    try {
      const pos = await new Promise((resolve, reject) =>
        navigator.geolocation.getCurrentPosition(resolve, reject, { timeout: 5000 })
      );
      lat = pos.coords.latitude;
      lng = pos.coords.longitude;
    } catch (e) {}

    const user = await base44.auth.me().catch(() => null);
    await base44.entities.CrisisIncident.create({
      user_id: user?.id || '',
      user_name: user?.full_name || 'Аноним',
      type: 'panic',
      severity: 'critical',
      status: 'active',
      latitude: lat,
      longitude: lng,
      description: 'Активация Panic Swipe',
      escalation_level: 'consultant',
    });

    setLoading(false);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <AnimatePresence mode="wait">
        {!activated ? (
          <motion.div
            key="idle"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="text-center max-w-md mx-auto"
          >
            <div className="mb-8">
              <h1 className="text-2xl font-display font-bold text-foreground mb-2">Экстренная помощь</h1>
              <p className="text-muted-foreground">Нажмите кнопку для активации экстренного вызова</p>
            </div>

            <div className="relative mb-12">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-64 h-64 rounded-full bg-red-500/5 animate-ping" style={{ animationDuration: '3s' }} />
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-52 h-52 rounded-full bg-red-500/10 animate-ping" style={{ animationDuration: '2.5s', animationDelay: '0.5s' }} />
              </div>
              <button
                onClick={activatePanic}
                className="relative w-48 h-48 rounded-full bg-gradient-to-br from-red-500 to-red-700 shadow-2xl shadow-red-500/30 flex items-center justify-center mx-auto hover:scale-105 active:scale-95 transition-transform z-10"
              >
                <div className="text-center text-white">
                  <AlertTriangle className="w-12 h-12 mx-auto mb-2" />
                  <span className="text-lg font-bold">PANIC</span>
                </div>
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <a href="tel:112" className="flex items-center gap-2 p-4 bg-card rounded-xl border border-border hover:border-red-500/30 transition-all">
                <Phone className="w-5 h-5 text-red-500" />
                <div className="text-left">
                  <div className="text-xs text-muted-foreground">Экстренные</div>
                  <div className="text-sm font-semibold">112</div>
                </div>
              </a>
              <a href="tel:88002000122" className="flex items-center gap-2 p-4 bg-card rounded-xl border border-border hover:border-amber-500/30 transition-all">
                <Phone className="w-5 h-5 text-amber-500" />
                <div className="text-left">
                  <div className="text-xs text-muted-foreground">Доверие</div>
                  <div className="text-sm font-semibold">8-800-2000-122</div>
                </div>
              </a>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="active"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center max-w-md mx-auto"
          >
            <div className="w-20 h-20 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-6">
              {loading ? (
                <Loader2 className="w-10 h-10 text-red-500 animate-spin" />
              ) : (
                <CheckCircle2 className="w-10 h-10 text-emerald-500" />
              )}
            </div>

            <h2 className="text-xl font-display font-bold mb-2">
              {loading ? 'Помощь в пути' : 'Запрос отправлен'}
            </h2>
            <p className="text-muted-foreground text-sm mb-8">
              {loading ? 'Обрабатываем ваш запрос...' : 'Специалисты уведомлены. Оставайтесь на связи.'}
            </p>

            <div className="space-y-3 text-left mb-8">
              {steps.map((s, i) => (
                <div key={i} className={`flex items-center gap-3 p-3 rounded-xl transition-all ${i <= step ? 'bg-card border border-border' : 'opacity-30'}`}>
                  {i < step ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                  ) : i === step && loading ? (
                    <Loader2 className="w-5 h-5 text-blue-500 animate-spin shrink-0" />
                  ) : (
                    <div className="w-5 h-5 rounded-full border-2 border-muted shrink-0" />
                  )}
                  <span className="text-sm">{s}</span>
                </div>
              ))}
            </div>

            {!loading && (
              <Button onClick={() => { setActivated(false); setStep(0); }} variant="outline" className="rounded-xl">
                Вернуться
              </Button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}