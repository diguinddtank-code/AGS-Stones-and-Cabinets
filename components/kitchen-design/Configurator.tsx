'use client';

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { useProgress } from '@react-three/drei';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Camera, Check, ChevronRight, Expand, Info, LayoutGrid, Layers, Moon, MousePointer2, Palette, SlidersHorizontal, Sparkles, Sun,
} from 'lucide-react';
import {
  CABINET_FINISHES, DESIGNS, EDGES, HARDWARE, STONES, SURFACE_FINISHES, configFromDesign, designById, finishById, hardwareById,
  stoneById, stoneSwatch, type KitchenConfig, type StoneCategory,
} from '@/lib/kitchenDesign/catalog';
import type { Quality, SceneHandle } from './three/KitchenScene';
import { EdgeIcon, PlanIcon } from './icons';
import DesignQuoteForm from './DesignQuoteForm';

const KitchenScene = dynamic(() => import('./three/KitchenScene'), { ssr: false });

type Tab = 'layout' | 'stone' | 'cabinets' | 'details';
const TABS: { id: Tab; label: string; icon: React.ElementType }[] = [
  { id: 'layout', label: 'Layout', icon: LayoutGrid },
  { id: 'stone', label: 'Stone', icon: Layers },
  { id: 'cabinets', label: 'Cabinets', icon: Palette },
  { id: 'details', label: 'Details', icon: SlidersHorizontal },
];

const tierLabel = (t: number) => '$'.repeat(t);

function Loader() {
  const { active, progress } = useProgress();
  const [shown, setShown] = useState(true);
  useEffect(() => {
    // useProgress reports 0% when nothing is queued, so hide on "not active"
    if (!active) { const id = setTimeout(() => setShown(false), 900); return () => clearTimeout(id); }
    setShown(true);
  }, [active, progress]);
  return (
    <AnimatePresence>
      {shown && (
        <motion.div initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.6 }} className="pointer-events-none absolute inset-0 z-20 flex flex-col items-center justify-center bg-[#ebe7e1]">
          <div className="relative h-14 w-14">
            <div className="absolute inset-0 rounded-full border-2 border-primary/10" />
            <div className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-secondary" />
          </div>
          <p className="mt-5 font-serif text-lg text-primary">Building your kitchen</p>
          <p className="mt-1 text-xs tracking-wide text-stone-500">{Math.round(progress)}% · loading slabs and finishes</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function SectionTitle({ children, hint }: { children: React.ReactNode; hint?: string }) {
  return (
    <div className="mb-3 flex items-baseline justify-between gap-3">
      <h3 className="font-sans text-[11px] font-bold uppercase tracking-[0.18em] text-stone-500">{children}</h3>
      {hint && <span className="text-[11px] text-stone-400">{hint}</span>}
    </div>
  );
}

export default function Configurator() {
  const [config, setConfig] = useState<KitchenConfig>(() => configFromDesign(DESIGNS[0]));
  const [tab, setTab] = useState<Tab>('layout');
  const [evening, setEvening] = useState(false);
  const [viewId, setViewId] = useState('overview');
  const [viewNonce, setViewNonce] = useState(0);
  const [hotspots, setHotspots] = useState(true);
  const [quality, setQuality] = useState<Quality>('high');
  const [interacted, setInteracted] = useState(false);
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [filter, setFilter] = useState<'All' | StoneCategory>('All');
  const [toast, setToast] = useState<string | null>(null);
  const handleRef = useRef<SceneHandle | null>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const low = window.innerWidth < 768 || (navigator.hardwareConcurrency ?? 8) <= 4;
    if (low) setQuality('low');
  }, []);
  useEffect(() => {
    if (!toast) return;
    const id = setTimeout(() => setToast(null), 2200);
    return () => clearTimeout(id);
  }, [toast]);

  const design = designById(config.design);
  const stone = stoneById(config.stone);
  const set = <K extends keyof KitchenConfig>(k: K, v: KitchenConfig[K]) => setConfig((c) => ({ ...c, [k]: v }));
  const goView = (id: string) => { setViewId(id); setViewNonce((n) => n + 1); };
  const chooseDesign = (id: KitchenConfig['design']) => {
    if (id === config.design) return;
    setConfig(configFromDesign(designById(id)));
    goView('overview');
  };
  const chooseStone = (id: string) => {
    set('stone', id);
    // jump to a close shot of the island so the change is obvious
    if (viewId === 'overview' && interacted === false) goView(design.views.find((v) => v.id === 'island') ? 'island' : 'overview');
  };

  const summary = useMemo(() => [
    { label: 'Kitchen', value: `${design.name} (${design.style})` },
    { label: 'Countertop', value: `${stone.name} ${stone.category}` },
    { label: 'Finish & edge', value: `${SURFACE_FINISHES.find((f) => f.id === config.finish)?.name} · ${EDGES.find((e) => e.id === config.edge)?.name}${config.edge === 'mitered' ? '' : ` · ${config.thickness} cm`}` },
    { label: 'Perimeter cabinets', value: finishById(config.perimeter).name },
    { label: 'Island cabinets', value: finishById(config.island).name },
    { label: 'Hardware', value: hardwareById(config.hardware).name },
  ], [design, stone, config]);

  const capture = () => handleRef.current?.capture() ?? null;
  const saveImage = () => {
    const url = capture();
    if (!url) return;
    const a = document.createElement('a');
    a.href = url;
    a.download = `ags-${config.design}-${config.stone}.jpg`;
    a.click();
    setToast('Image saved');
  };
  const openQuote = () => { setPreview(capture()); setQuoteOpen(true); };
  const fullscreen = () => {
    const el = stageRef.current;
    if (!el) return;
    if (document.fullscreenElement) document.exitFullscreen?.();
    else el.requestFullscreen?.().catch(() => {});
  };
  const onInteract = useCallback(() => setInteracted(true), []);

  const stones = STONES.filter((s) => filter === 'All' || s.category === filter);

  // ---------------- panel content ----------------
  const panel = (
    <AnimatePresence mode="wait">
      <motion.div key={tab} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.22 }}>
        {tab === 'layout' && (
          <div className="space-y-3">
            <SectionTitle hint="3 signature kitchens">Choose a layout</SectionTitle>
            {DESIGNS.map((d) => {
              const on = d.id === config.design;
              return (
                <button key={d.id} onClick={() => chooseDesign(d.id)}
                  className={`group w-full rounded-2xl border p-3 text-left transition ${on ? 'border-secondary bg-amber-50/60 shadow-md shadow-secondary/10' : 'border-stone-200 bg-white hover:border-stone-300 hover:shadow-sm'}`}>
                  <div className="flex gap-3">
                    <div className={`flex h-[72px] w-[100px] shrink-0 items-center justify-center rounded-xl ${on ? 'bg-white text-primary' : 'bg-stone-50 text-stone-500'}`}>
                      <PlanIcon id={d.id} className="h-full w-full p-1.5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-secondary">{d.style}</p>
                        {on && <Check className="h-4 w-4 text-secondary" />}
                      </div>
                      <p className="font-serif text-lg font-semibold leading-tight text-primary">{d.name}</p>
                      <p className="mt-0.5 text-xs text-stone-500">{d.tagline}</p>
                    </div>
                  </div>
                  {on && (
                    <ul className="mt-3 grid grid-cols-1 gap-1.5 border-t border-amber-200/60 pt-3 text-xs text-stone-600 sm:grid-cols-2">
                      {d.highlights.map((h) => <li key={h} className="flex gap-1.5"><Sparkles className="mt-0.5 h-3 w-3 shrink-0 text-secondary" />{h}</li>)}
                    </ul>
                  )}
                </button>
              );
            })}
            <button onClick={() => setTab('stone')} className="mt-2 flex w-full items-center justify-center gap-1 rounded-full border border-primary/15 py-2.5 text-sm font-semibold text-primary hover:bg-primary hover:text-white">
              Next: choose your stone <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        )}

        {tab === 'stone' && (
          <div>
            <div className="mb-4 rounded-2xl bg-stone-50 p-3 ring-1 ring-stone-200/70">
              <div className="flex gap-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={stoneSwatch(stone.id)} alt="" className="h-16 w-24 shrink-0 rounded-lg object-cover ring-1 ring-black/5" />
                <div className="min-w-0">
                  <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-secondary">{stone.category} · {stone.origin}</p>
                  <p className="font-serif text-lg font-semibold leading-tight text-primary">{stone.name}</p>
                  <p className="text-xs text-stone-500">Price level <span className="font-semibold text-stone-700">{tierLabel(stone.tier)}</span><span className="text-stone-300">{tierLabel(4 - stone.tier)}</span></p>
                </div>
              </div>
              <p className="mt-2 text-xs leading-relaxed text-stone-600">{stone.blurb}</p>
            </div>
            <div className="mb-3 flex gap-1.5 overflow-x-auto pb-1 [scrollbar-width:none]">
              {(['All', 'Quartz', 'Quartzite', 'Granite'] as const).map((f) => (
                <button key={f} onClick={() => setFilter(f)} className={`shrink-0 rounded-full px-3.5 py-1.5 text-xs font-semibold transition ${filter === f ? 'bg-primary text-white' : 'bg-stone-100 text-stone-600 hover:bg-stone-200'}`}>{f}</button>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3">
              {stones.map((s) => {
                const on = s.id === config.stone;
                return (
                  <button key={s.id} onClick={() => chooseStone(s.id)} className={`group overflow-hidden rounded-xl border text-left transition ${on ? 'border-secondary ring-2 ring-secondary/30' : 'border-stone-200 hover:border-stone-300'}`}>
                    <div className="relative aspect-[2/1] overflow-hidden bg-stone-100">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={stoneSwatch(s.id)} alt={`${s.name} ${s.category}`} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-110" />
                      {on && <span className="absolute right-1.5 top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-secondary text-white shadow"><Check className="h-3 w-3" /></span>}
                    </div>
                    <div className="px-2 py-1.5">
                      <p className="truncate text-[12px] font-semibold text-primary">{s.name}</p>
                      <p className="text-[10px] text-stone-500">{s.category} · {tierLabel(s.tier)}</p>
                    </div>
                  </button>
                );
              })}
            </div>
            <p className="mt-4 flex gap-1.5 text-[11px] leading-relaxed text-stone-400"><Info className="mt-0.5 h-3 w-3 shrink-0" />On-screen colors are digital renderings. Natural stone varies from slab to slab, so come pick your exact slab at our Duluth showroom.</p>
          </div>
        )}

        {tab === 'cabinets' && (
          <div className="space-y-6">
            {(['perimeter', 'island'] as const).map((k) => (
              <div key={k}>
                <SectionTitle hint={finishById(config[k]).name}>{k === 'perimeter' ? 'Perimeter cabinets' : 'Island cabinets'}</SectionTitle>
                <div className="flex flex-wrap gap-2.5">
                  {CABINET_FINISHES.map((f) => {
                    const on = config[k] === f.id;
                    return (
                      <button key={f.id} onClick={() => set(k, f.id)} title={f.name} aria-label={f.name}
                        className={`relative h-11 w-11 overflow-hidden rounded-full ring-offset-2 transition ${on ? 'ring-2 ring-secondary' : 'ring-1 ring-stone-200 hover:ring-stone-400'}`}
                        style={f.texture ? { backgroundImage: `url(${f.texture})`, backgroundSize: '220%', backgroundPosition: 'center' } : { background: f.color }}>
                        {on && <Check className={`absolute inset-0 m-auto h-4 w-4 ${['warm-white', 'greige', 'rift-oak'].includes(f.id) ? 'text-primary' : 'text-white'}`} />}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
            <div>
              <SectionTitle hint={hardwareById(config.hardware).name}>Hardware & fixtures</SectionTitle>
              <div className="grid grid-cols-3 gap-2">
                {HARDWARE.map((h) => {
                  const on = config.hardware === h.id;
                  const grad = h.id === 'brass' ? 'linear-gradient(135deg,#f1d79b,#b98d43 55%,#e2c37e)' : h.id === 'black' ? 'linear-gradient(135deg,#4a4a4c,#141415 60%,#2b2b2d)' : 'linear-gradient(135deg,#ffffff,#b9bcbf 55%,#eef0f1)';
                  return (
                    <button key={h.id} onClick={() => set('hardware', h.id)} className={`rounded-xl border p-2 text-center transition ${on ? 'border-secondary bg-amber-50/60' : 'border-stone-200 hover:border-stone-300'}`}>
                      <span className="mx-auto block h-3 w-14 rounded-full shadow-inner" style={{ background: grad }} />
                      <span className="mt-2 block text-[11px] font-semibold text-primary">{h.name}</span>
                    </button>
                  );
                })}
              </div>
              <p className="mt-2 text-[11px] text-stone-400">Applies to pulls, the faucet{config.design === 'buckhead' ? ', pendants and the hood band' : config.design === 'estate' ? ', pot filler and pendants' : ''}.</p>
            </div>
          </div>
        )}

        {tab === 'details' && (
          <div className="space-y-6">
            <div>
              <SectionTitle>Edge profile</SectionTitle>
              <div className="grid grid-cols-2 gap-2">
                {EDGES.map((e) => {
                  const on = config.edge === e.id;
                  return (
                    <button key={e.id} onClick={() => { set('edge', e.id); goView('detail'); }} className={`flex items-center gap-2.5 rounded-xl border p-2.5 text-left transition ${on ? 'border-secondary bg-amber-50/60 text-primary' : 'border-stone-200 text-stone-500 hover:border-stone-300'}`}>
                      <EdgeIcon id={e.id} className="h-8 w-10 shrink-0" />
                      <span><span className="block text-xs font-semibold text-primary">{e.name}</span><span className="block text-[10px] leading-tight text-stone-500">{e.note}</span></span>
                    </button>
                  );
                })}
              </div>
            </div>
            <div>
              <SectionTitle hint={config.edge === 'mitered' ? 'Built up to 2½"' : undefined}>Slab thickness</SectionTitle>
              <div className="grid grid-cols-2 gap-2">
                {([2, 3] as const).map((t) => (
                  <button key={t} disabled={config.edge === 'mitered'} onClick={() => set('thickness', t)}
                    className={`rounded-xl border px-3 py-2.5 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-40 ${config.thickness === t && config.edge !== 'mitered' ? 'border-secondary bg-amber-50/60 text-primary' : 'border-stone-200 text-stone-600 hover:border-stone-300'}`}>
                    {t} cm <span className="font-normal text-stone-400">({t === 2 ? '¾"' : '1¼"'})</span>
                  </button>
                ))}
              </div>
            </div>
            <div>
              <SectionTitle>Surface finish</SectionTitle>
              <div className="grid grid-cols-3 gap-2">
                {SURFACE_FINISHES.map((f) => {
                  const on = config.finish === f.id;
                  return (
                    <button key={f.id} onClick={() => { set('finish', f.id); goView('detail'); }} className={`rounded-xl border p-2.5 text-left transition ${on ? 'border-secondary bg-amber-50/60' : 'border-stone-200 hover:border-stone-300'}`}>
                      <span className="block text-xs font-semibold text-primary">{f.name}</span>
                      <span className="block text-[10px] leading-tight text-stone-500">{f.note}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );

  const tabBar = (
    <div className="grid grid-cols-4 gap-1 rounded-2xl bg-stone-100 p-1">
      {TABS.map((t) => {
        const on = tab === t.id;
        const Icon = t.icon;
        return (
          <button key={t.id} onClick={() => setTab(t.id)} className={`flex flex-col items-center gap-0.5 rounded-xl py-2 text-[11px] font-semibold transition sm:flex-row sm:justify-center sm:gap-1.5 sm:text-xs ${on ? 'bg-white text-primary shadow-sm' : 'text-stone-500 hover:text-stone-800'}`}>
            <Icon className="h-4 w-4" />{t.label}
          </button>
        );
      })}
    </div>
  );

  const toolBtn = 'flex h-10 w-10 items-center justify-center rounded-full bg-white/85 text-primary shadow-md ring-1 ring-black/5 backdrop-blur transition hover:bg-white';

  return (
    <section id="studio" className="relative bg-[#f5f3ef] lg:flex lg:h-[calc(100svh-var(--kd-header,96px))] lg:min-h-[640px]">
      {/* ---------------- 3D stage ---------------- */}
      <div ref={stageRef} className="sticky top-[var(--kd-header,72px)] z-10 h-[56svh] min-h-[320px] w-full overflow-hidden bg-[#ebe7e1] lg:relative lg:top-0 lg:h-full lg:flex-1">
        <KitchenScene
          config={config} evening={evening} viewId={viewId} viewNonce={viewNonce} showHotspots={hotspots}
          quality={quality} onQuality={setQuality} onInteract={onInteract} handleRef={handleRef}
        />
        <Loader />

        {/* top-left: design label */}
        <div className="pointer-events-none absolute left-3 top-3 z-10 sm:left-5 sm:top-5">
          <div className="rounded-2xl bg-white/85 px-3.5 py-2 shadow-md ring-1 ring-black/5 backdrop-blur">
            <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-secondary sm:text-[10px]">{design.style}</p>
            <p className="font-serif text-sm font-semibold text-primary sm:text-base">{design.name}</p>
            <p className="hidden text-[11px] text-stone-500 sm:block">{stone.name} {stone.category} · {finishById(config.perimeter).name}</p>
          </div>
        </div>

        {/* top-right: tools */}
        <div className="absolute right-3 top-3 z-10 flex flex-col gap-2 sm:right-5 sm:top-5">
          <button className={toolBtn} onClick={() => setEvening((e) => !e)} aria-label={evening ? 'Switch to daylight' : 'Switch to evening lighting'} title={evening ? 'Daylight' : 'Evening'}>
            {evening ? <Sun className="h-[18px] w-[18px]" /> : <Moon className="h-[18px] w-[18px]" />}
          </button>
          <button className={`${toolBtn} ${hotspots ? '!bg-primary !text-white' : ''}`} onClick={() => setHotspots((h) => !h)} aria-label="Toggle design notes" title="Design notes">
            <Info className="h-[18px] w-[18px]" />
          </button>
          <button className={toolBtn} onClick={saveImage} aria-label="Save image" title="Save image"><Camera className="h-[18px] w-[18px]" /></button>
          <button className={`${toolBtn} hidden sm:flex`} onClick={fullscreen} aria-label="Fullscreen" title="Fullscreen"><Expand className="h-[18px] w-[18px]" /></button>
        </div>

        {/* bottom: camera views */}
        <div className="absolute inset-x-0 bottom-3 z-10 flex justify-center px-3 sm:bottom-5">
          <div className="flex max-w-full gap-1 overflow-x-auto rounded-full bg-white/85 p-1 shadow-lg ring-1 ring-black/5 backdrop-blur [scrollbar-width:none]">
            {design.views.map((v) => (
              <button key={v.id} onClick={() => goView(v.id)} className={`shrink-0 rounded-full px-3 py-1.5 text-[11px] font-semibold transition sm:px-4 sm:text-xs ${viewId === v.id ? 'bg-primary text-white' : 'text-stone-600 hover:bg-stone-100'}`}>{v.label}</button>
            ))}
          </div>
        </div>

        <AnimatePresence>
          {!interacted && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ delay: 1.2 }} className="pointer-events-none absolute bottom-16 left-1/2 z-10 -translate-x-1/2 sm:bottom-20">
              <div className="flex items-center gap-2 whitespace-nowrap rounded-full bg-primary/80 px-3.5 py-1.5 text-[11px] font-medium text-white backdrop-blur">
                <MousePointer2 className="h-3.5 w-3.5" /> Drag to look around · pinch or scroll to zoom
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {toast && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="absolute left-1/2 top-5 z-20 -translate-x-1/2 rounded-full bg-primary px-4 py-2 text-xs font-semibold text-white shadow-lg">{toast}</motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ---------------- control panel ---------------- */}
      <aside className="relative z-0 flex flex-col bg-white lg:h-full lg:w-[420px] lg:shrink-0 lg:border-l lg:border-stone-200 xl:w-[460px]">
        <div className="border-b border-stone-100 px-4 pb-3 pt-4 sm:px-6">
          <div className="mb-3 hidden lg:block">
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-secondary">AGS Kitchen Design Studio</p>
            <h2 className="font-serif text-2xl font-bold text-primary">Design your kitchen</h2>
          </div>
          {tabBar}
        </div>
        <div className="flex-1 px-4 py-5 sm:px-6 lg:overflow-y-auto">{panel}</div>
        <div className="sticky bottom-0 z-20 border-t border-stone-200 bg-white/95 px-4 py-3 backdrop-blur sm:px-6 lg:static">
          <div className="flex items-center gap-3">
            <div className="hidden min-w-0 flex-1 sm:block">
              <p className="truncate text-xs text-stone-500">{design.name} · {stone.name}</p>
              <p className="truncate text-[11px] text-stone-400">{finishById(config.perimeter).name} / {finishById(config.island).name} · {hardwareById(config.hardware).name}</p>
            </div>
            <button onClick={openQuote} className="flex flex-1 items-center justify-center gap-2 rounded-full bg-secondary px-5 py-3 text-sm font-bold text-white shadow-lg shadow-secondary/30 transition hover:brightness-110 sm:flex-none">
              Get pricing for this design <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </aside>

      <DesignQuoteForm open={quoteOpen} onClose={() => setQuoteOpen(false)} summary={summary} previewUrl={preview} />
    </section>
  );
}
