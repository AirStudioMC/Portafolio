import React, { useState, useEffect } from 'react';
import { Play, RotateCcw, ShieldCheck, Activity, CheckCircle2 } from 'lucide-react';

export const FailoverSimulator: React.FC = () => {
  const [activeProxy, setActiveProxy] = useState<'proxy-01' | 'proxy-02'>('proxy-01');
  const [proxy1Status, setProxy1Status] = useState<'healthy' | 'crashed' | 'restarted'>('healthy');
  const [isSimulating, setIsSimulating] = useState(false);
  const [failoverTime, setFailoverTime] = useState(74);
  const [logs, setLogs] = useState<string[]>([
    "[00:00:01] [Velocity/Proxy-01] Escuchando en :25565 - 128 sesiones activas.",
    "[00:00:02] [Redis-Sync] Sincronización continua de handshakes OK (latencia: 0.8ms).",
    "[00:00:03] [Clustering] Proxy-02 en Standby caliente listo para failover.",
  ]);

  const runFailover = () => {
    if (isSimulating) return;
    setIsSimulating(true);

    const randomLatency = Math.floor(65 + Math.random() * 20);
    setFailoverTime(randomLatency);

    setProxy1Status('crashed');
    setLogs(prev => [
      ...prev,
      `[ALERTA] ¡Caída repentina detectada en Proxy-01! Latido no respondido.`,
      `[Redis Pub/Sub] Emitiendo evento 'cluster.failover.trigger' a nodos secundarios...`,
    ]);

    setTimeout(() => {
      setActiveProxy('proxy-02');
      setLogs(prev => [
        ...prev,
        `[Failover Engine] 128 sesiones re-enrutadas transparentemente hacia Proxy-02 en ${randomLatency}ms.`,
        `[Netty/Velocity] Sockets preservados sin reinicio de cliente. KICKS REGISTRADOS: 0.`,
      ]);
      setIsSimulating(false);
    }, 450);
  };

  const resetState = () => {
    setActiveProxy('proxy-01');
    setProxy1Status('healthy');
    setIsSimulating(false);
    setLogs([
      "[00:00:01] [Velocity/Proxy-01] Escuchando en :25565 - 128 sesiones activas.",
      "[00:00:02] [Redis-Sync] Sincronización continua de handshakes OK (latencia: 0.8ms).",
      "[00:00:03] [Clustering] Proxy-02 en Standby caliente listo para failover.",
    ]);
  };

  return (
    <div className="bg-[#100707] border border-orange-950/80 rounded-xl p-5 md:p-6 shadow-xl">
      {/* Simulation Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-orange-950/60">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-orange-400 font-semibold">
            <Activity className="w-4 h-4 text-orange-500" />
            <span>BENCHMARK EN TIEMPO REAL · PROXY CLUSTER</span>
          </div>
          <h3 className="text-lg font-bold text-white mt-1">
            Demostración de Failover sin Desconexión (0 Kicks)
          </h3>
        </div>

        <div className="flex items-center gap-2">
          {proxy1Status === 'crashed' ? (
            <button
              onClick={resetState}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-stone-300 hover:text-white bg-[#1a0e0e] hover:bg-[#281414] border border-orange-900/60 rounded-lg transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5 text-orange-400" />
              <span>Restablecer Clúster</span>
            </button>
          ) : (
            <button
              onClick={runFailover}
              disabled={isSimulating}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold text-white bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500 rounded-lg transition-all cursor-pointer shadow-md shadow-red-950/60 disabled:opacity-50"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Simular Caída de Proxy-01</span>
            </button>
          )}
        </div>
      </div>

      {/* Network Nodes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-5">
        {/* Node 1: Proxy-01 */}
        <div className={`p-4 rounded-lg border transition-all ${
          proxy1Status === 'crashed'
            ? 'border-red-600/50 bg-red-950/30 text-stone-300'
            : activeProxy === 'proxy-01'
            ? 'border-orange-500/50 bg-orange-950/20 text-stone-100'
            : 'border-stone-800 bg-stone-900/40 text-stone-400'
        }`}>
          <div className="flex items-center justify-between mb-2">
            <span className="font-mono text-xs text-stone-400">NODE // VELOCITY-01</span>
            <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
              proxy1Status === 'crashed'
                ? 'bg-red-900/80 text-red-200'
                : 'bg-emerald-950/70 text-emerald-400 border border-emerald-500/30'
            }`}>
              {proxy1Status === 'crashed' ? "CAÍDA / OFFLINE" : "ACTIVO PRIMARIO"}
            </span>
          </div>
          <div className="text-2xl font-bold font-mono tabular-nums text-white">
            {activeProxy === 'proxy-01' ? '128' : '0'}
          </div>
          <div className="text-xs text-stone-400 mt-1">
            Jugadores asignados al socket
          </div>
        </div>

        {/* Node 2: Redis Pub/Sub Session Sync */}
        <div className="p-4 rounded-lg border border-orange-950/80 bg-[#160b0b] flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="font-mono text-xs text-orange-400 font-bold">IN-MEMORY // REDIS</span>
            <span className="text-xs font-mono text-stone-400">PUB/SUB</span>
          </div>
          <div className="space-y-1">
            <div className="flex justify-between text-xs">
              <span className="text-stone-400">Latencia sync:</span>
              <span className="font-mono text-white tabular-nums font-semibold">0.8 ms</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-stone-400">Sesiones vivas:</span>
              <span className="font-mono text-white tabular-nums font-semibold">128</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-stone-400">Tiempo failover:</span>
              <span className="font-mono text-orange-400 tabular-nums font-bold">{failoverTime} ms</span>
            </div>
          </div>
          <div className="text-xs text-emerald-400 font-mono mt-2 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
            <span>Persistencia en tiempo real</span>
          </div>
        </div>

        {/* Node 3: Proxy-02 */}
        <div className={`p-4 rounded-lg border transition-all ${
          activeProxy === 'proxy-02'
            ? 'border-orange-500/60 bg-orange-950/25 text-stone-100 shadow-md shadow-orange-950/30'
            : 'border-orange-950/60 bg-[#140a0a] text-stone-400'
        }`}>
          <div className="flex items-center justify-between mb-2">
            <span className="font-mono text-xs text-stone-400">NODE // VELOCITY-02</span>
            <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
              activeProxy === 'proxy-02'
                ? 'bg-orange-600/80 text-white'
                : 'bg-stone-900 text-stone-400'
            }`}>
              {activeProxy === 'proxy-02' ? "ACTIVO POR FAILOVER" : "STANDBY CALIENTE"}
            </span>
          </div>
          <div className="text-2xl font-bold font-mono tabular-nums text-white">
            {activeProxy === 'proxy-02' ? '128' : '0'}
          </div>
          <div className="text-xs text-stone-400 mt-1">
            Jugadores asignados al socket
          </div>
        </div>
      </div>

      {/* Outcome Metric Banner in Orange/Red */}
      <div className="bg-[#180d0d] border border-orange-950/80 rounded-lg p-3.5 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-md bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-400 shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-medium text-stone-400">
              Resultado de retención de jugadores
            </div>
            <div className="text-sm font-semibold text-white">
              0 Jugadores desconectados (100% Retención de partida)
            </div>
          </div>
        </div>

        <div className="flex items-center gap-6 font-mono text-xs">
          <div>
            <span className="text-stone-400">KICKS: </span>
            <span className="text-emerald-400 font-bold tabular-nums">0</span>
          </div>
          <div>
            <span className="text-stone-400">FAILOVER: </span>
            <span className="text-orange-400 font-bold tabular-nums">{failoverTime}ms</span>
          </div>
        </div>
      </div>

      {/* Terminal Log Stream */}
      <div className="mt-4 bg-[#080404] border border-orange-950/60 rounded-lg p-3">
        <div className="flex items-center justify-between text-xs text-stone-400 mb-2 border-b border-orange-950/40 pb-1.5 font-mono">
          <span>CONSOLE // VELOCITY CLUSTER TELEMETRY</span>
          <span className="text-stone-400">STDOUT</span>
        </div>
        <div className="font-mono text-xs space-y-1 text-stone-300 max-h-32 overflow-y-auto">
          {logs.slice(-5).map((log, index) => (
            <div 
              key={index} 
              className={`leading-relaxed ${
                log.includes("ALERTA")
                  ? "text-red-400 font-bold"
                  : log.includes("0") && (log.includes("KICKS") || log.includes("re-enrutadas"))
                  ? "text-emerald-400 font-medium"
                  : "text-stone-300"
              }`}
            >
              {log}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
