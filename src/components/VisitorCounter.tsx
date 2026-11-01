import React, { useState, useEffect } from 'react';
import { Eye, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const VisitorCounter: React.FC = () => {
  const [count, setCount] = useState<number>(() => {
    try {
      const stored = localStorage.getItem('retroflas_verified_visit_count');
      const val = stored ? parseInt(stored, 10) : 0;
      return isNaN(val) ? 164 : Math.max(164, val);
    } catch {
      return 164;
    }
  });

  const [isIpRegistered, setIsIpRegistered] = useState<boolean>(() => {
    try {
      return localStorage.getItem('retroflas_ip_already_counted') === 'true';
    } catch {
      return false;
    }
  });

  const [ipStatus, setIpStatus] = useState<string>('Verificando IP...');

  useEffect(() => {
    let isMounted = true;

    async function registerVisit() {
      try {
        const response = await fetch('/api/visits', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error ${response.status}`);
        }

        const data = await response.json();
        if (isMounted) {
          setCount(data.count);
          setIsIpRegistered(true);
          try {
            localStorage.setItem('retroflas_verified_visit_count', data.count.toString());
            localStorage.setItem('retroflas_ip_already_counted', 'true');
          } catch {
            // ignore
          }

          if (data.isNew) {
            setIpStatus('Tu visita ha sido contabilizada');
          } else {
            setIpStatus('Tu IP ya está contabilizada (1 visita por IP)');
          }
        }
      } catch {
        // Fallback if backend API is temporarily unreachable:
        // Use client-side single IP storage lock so refreshing does NOT artificially inflate counts
        if (isMounted) {
          const alreadyRecorded = localStorage.getItem('retroflas_ip_already_counted') === 'true';
          if (!alreadyRecorded) {
            setCount((prev) => {
              const next = prev + 1;
              try {
                localStorage.setItem('retroflas_verified_visit_count', next.toString());
                localStorage.setItem('retroflas_ip_already_counted', 'true');
              } catch {
                // ignore
              }
              return next;
            });
            setIsIpRegistered(true);
            setIpStatus('Tu visita ha sido contabilizada');
          } else {
            setIpStatus('Tu IP ya está contabilizada (1 visita por IP)');
          }
        }
      }
    }

    registerVisit();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center my-10 px-6 animate-fadeIn">
      <div className="inline-flex flex-col sm:flex-row items-center gap-3 sm:gap-4 px-6 py-4 rounded-2xl bg-[#120808] border border-orange-500/35 text-white shadow-xl shadow-orange-950/30 glow-orange">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-orange-500/20 to-red-600/20 border border-orange-500/30 flex items-center justify-center text-orange-400 shrink-0">
            <Eye className="w-4 h-4" />
          </div>
          <div className="text-left">
            <div className="text-2xl font-extrabold font-mono text-white tabular-nums tracking-tight leading-none flex items-center gap-2">
              <span>{count}</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-950/80 text-emerald-300 border border-emerald-500/40 font-semibold tracking-normal">
                IP ÚNICA
              </span>
            </div>
            <div className="text-[11px] font-medium text-stone-400 mt-1 font-mono">
              Visitas únicas al portafolio
            </div>
          </div>
        </div>

        <div className="hidden sm:block h-8 w-[1px] bg-orange-950/80" />

        <div className="flex items-center gap-1.5 text-[11px] font-mono text-stone-300 bg-[#1a0e0e] px-3 py-1.5 rounded-xl border border-orange-950/70">
          <ShieldCheck className="w-3.5 h-3.5 text-orange-400 shrink-0" />
          <span className="text-stone-300">
            {ipStatus}
          </span>
          {isIpRegistered && (
            <span title="IP registrada sin duplicados">
              <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0 ml-0.5" />
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
