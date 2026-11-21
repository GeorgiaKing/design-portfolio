import { useEffect, useState } from 'react';
import { MotionConfig } from 'framer-motion';
import OriginalBird from './OriginalBird';
import type { Language } from '../i18n';

/** Original Wabiy artwork/behaviour, reduced to its default variant like Bitboulevard. */
export default function WabiyBird({lang='de',compact=false}:{lang?:Language;compact?:boolean}) {
 const en=lang==='en';
 const [reduced,setReduced]=useState(true);
 const [paused,setPaused]=useState(false);
 const [greeted,setGreeted]=useState(false);
 useEffect(()=>{const q=matchMedia('(prefers-reduced-motion: reduce)');const update=()=>setReduced(q.matches);update();q.addEventListener('change',update);return()=>q.removeEventListener('change',update);},[]);
 const label=en?'Say hello to Wabiy the bird':'Wabiy den Vogel begrüßen';
 return <div className={`wabiy-mascot ${compact?'mascot-compact':''}`}>
  <div className="wabiy-mascot-stage" onClickCapture={()=>setGreeted(true)}>
   {paused||reduced?<button type="button" className="wabiy-bird-art" aria-label={label}><img src="/images/wabiy-original.svg" alt="" width="200" height="200"/>{greeted&&<span className="still-heart" aria-hidden="true">♥</span>}</button>:<MotionConfig reducedMotion="user"><OriginalBird label={label}/></MotionConfig>}
  </div>
  <span className="bird-instruction">{en?'A little hello? Click on Wabiy.':'Ein kleines Hallo? Klick auf Wabiy.'}</span>
  {!reduced&&<button type="button" className="bird-pause" aria-pressed={paused} onClick={()=>setPaused(!paused)}>{paused?(en?'Resume animation':'Animation fortsetzen'):(en?'Pause animation':'Animation pausieren')} <span aria-hidden="true">{paused?'▷':'Ⅱ'}</span></button>}
  <span className="sr-only" role="status">{greeted?(en?'Wabiy says hello!':'Wabiy sagt Hallo!'):''}</span>
 </div>;
}
