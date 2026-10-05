import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Brain, Camera, Watch, Activity, AlertTriangle, CheckCircle, TrendingUp, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { base44 } from '@/api/base44Client';

const metrics = [
  { label: 'Пульс', value: '72 уд/мин', status: 'normal', icon: Activity },
  { label: 'HRV', value: '38 мс', status: 'warning', icon: Activity },
  { label: 'Качество сна', value: '76%', status: 'normal', icon: CheckCircle },
  { label: 'Уровень стресса', value: 'Умеренный', status: 'warning', icon: AlertTriangle },
  { label: 'Активность', value: '4 200 шагов', status: 'normal', icon: TrendingUp },
  { label: 'Сатурация O₂', value: '98%', status: 'normal', icon: Zap },
];

const wearables = ['Apple Watch', 'Garmin', 'Samsung Galaxy Watch', 'Fitbit', 'Polar'];

const emotionData = [
  { emotion: 'Спокойствие', value: 55, color: 'bg-emerald-500' },
  { emotion: 'Тревожность', value: 20, color: 'bg-amber-500' },
  { emotion: 'Усталость', value: 18, color: 'bg-blue-500' },
  { emotion: 'Грусть', value: 7, color: 'bg-slate-400' },
];

export default function AiMonitoring() {
  const [cameraActive, setCameraActive] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [activeWearable, setActiveWearable] = useState(null);

  const startAnalysis = async () => {
    setAnalyzing(true);
    setCameraActive(true);
    await new Promise(r => setTimeout(r, 3000));
    setAnalysisResult({
      dominantEmotion: 'Спокойствие',
      anxietyLevel: 20,
      crisisRisk: 'low',
      recommendation: 'Состояние стабильное. Продолжайте дыхательные практики для поддержания текущего уровня.'
    });
    setAnalyzing(false);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-display font-bold text-foreground mb-1">AI-мониторинг состояния</h1>
        <p className="text-muted-foreground">Интеллектуальный анализ эмоционального и физиологического состояния</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        {/* Camera Analysis */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-card rounded-2xl border border-border p-6">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center">
              <Camera className="w-5 h-5 text-purple-500" />
            </div>
            <div>
              <h2 className="font-semibold text-foreground">Анализ через камеру</h2>
              <p className="text-xs text-muted-foreground">Мимика, эмоции, признаки тревожности</p>
            </div>
          </div>

          <div className={`relative aspect-video rounded-xl overflow-hidden mb-4 ${cameraActive ? 'bg-slate-900' : 'bg-muted'} flex items-center justify-center`}>
            {!cameraActive && (
              <div className="text-center">
                <Camera className="w-10 h-10 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">Камера не активна</p>
              </div>
            )}
            {cameraActive && (
              <div className="text-center">
                {analyzing ? (
                  <>
                    <div className="w-16 h-16 rounded-full border-4 border-purple-500/30 border-t-purple-500 animate-spin mx-auto mb-3" />
                    <p className="text-white/80 text-sm">Анализ мимики...</p>
                  </>
                ) : analysisResult ? (
                  <div className="p-4">
                    <CheckCircle className="w-10 h-10 text-emerald-400 mx-auto mb-2" />
                    <p className="text-white font-semibold">{analysisResult.dominantEmotion}</p>
                    <p className="text-white/60 text-xs mt-1">Анализ завершён</p>
                  </div>
                ) : null}
              </div>
            )}
            {cameraActive && (
              <div className="absolute top-2 right-2 flex items-center gap-1.5 bg-red-500/90 rounded-full px-2 py-1">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                <span className="text-white text-xs font-medium">LIVE</span>
              </div>
            )}
          </div>

          {analysisResult && (
            <div className="mb-4 space-y-2">
              {emotionData.map((e, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="text-xs text-muted-foreground w-24">{e.emotion}</span>
                  <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                    <motion.div className={`h-full rounded-full ${e.color}`} initial={{ width: 0 }} animate={{ width: `${e.value}%` }} transition={{ delay: i * 0.1 }} />
                  </div>
                  <span className="text-xs font-semibold text-muted-foreground w-8">{e.value}%</span>
                </div>
              ))}
            </div>
          )}

          {analysisResult && (
            <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 rounded-xl">
              <p className="text-sm text-emerald-800">{analysisResult.recommendation}</p>
            </div>
          )}

          <Button onClick={startAnalysis} disabled={analyzing} className="w-full rounded-xl">
            {analyzing ? 'Анализ...' : cameraActive ? 'Повторить анализ' : 'Запустить анализ'}
          </Button>
          <p className="text-xs text-muted-foreground text-center mt-2">Интеграция с Computer Vision API. Заглушка для демонстрации.</p>
        </motion.div>

        {/* Wearables */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-card rounded-2xl border border-border p-6">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
              <Watch className="w-5 h-5 text-blue-500" />
            </div>
            <div>
              <h2 className="font-semibold text-foreground">Носимые устройства</h2>
              <p className="text-xs text-muted-foreground">Пульс, HRV, сон, стресс, активность</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-5">
            {wearables.map(w => (
              <button key={w} onClick={() => setActiveWearable(activeWearable === w ? null : w)}
                className={`text-xs px-3 py-1.5 rounded-full border transition-all ${activeWearable === w ? 'bg-primary text-primary-foreground border-primary' : 'border-border hover:border-primary/50'}`}>
                {w}
              </button>
            ))}
          </div>

          {activeWearable ? (
            <div className="space-y-3">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-sm font-medium text-foreground">{activeWearable} подключён</span>
              </div>
              {metrics.map((m, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
                  className="flex items-center justify-between p-3 bg-muted/30 rounded-xl">
                  <div className="flex items-center gap-2.5">
                    <m.icon className={`w-4 h-4 ${m.status === 'normal' ? 'text-emerald-500' : 'text-amber-500'}`} />
                    <span className="text-sm text-muted-foreground">{m.label}</span>
                  </div>
                  <span className="font-semibold text-sm text-foreground">{m.value}</span>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Watch className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
              <p className="text-muted-foreground text-sm">Выберите устройство для подключения</p>
              <p className="text-xs text-muted-foreground mt-1">API-интеграция. Демо-режим.</p>
            </div>
          )}
        </motion.div>
      </div>

      {/* AI Score Overview */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-card rounded-2xl border border-border p-6">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <Brain className="w-5 h-5 text-primary" />
          </div>
          <h2 className="font-semibold text-foreground">AI Crisis Score — история</h2>
        </div>
        <div className="grid grid-cols-7 gap-2">
          {[28, 32, 45, 38, 55, 42, 28].map((s, i) => (
            <div key={i} className="flex flex-col items-center gap-2">
              <div className="w-full bg-muted rounded-lg overflow-hidden" style={{ height: 80 }}>
                <motion.div
                  className={`w-full rounded-lg ${s < 35 ? 'bg-emerald-500' : s < 60 ? 'bg-amber-500' : 'bg-red-500'}`}
                  initial={{ height: 0 }}
                  animate={{ height: `${s}%` }}
                  transition={{ delay: i * 0.1 }}
                  style={{ marginTop: `${100 - s}%` }}
                />
              </div>
              <span className="text-xs font-bold text-foreground">{s}</span>
              <span className="text-xs text-muted-foreground">{['Пн','Вт','Ср','Чт','Пт','Сб','Вс'][i]}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}