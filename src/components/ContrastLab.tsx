import { useState } from 'react';
export default function ContrastLab({lang='de'}:{lang?:'de'|'en'}) {
 const en=lang==='en';
 const [accessible, setAccessible] = useState(true);
 return <div className="contrast-lab">
  <div className="lab-toolbar"><span><span className="status-dot"/> {en?'DESIGN IN PRACTICE':'DESIGN IN DER PRAXIS'}</span><span>{en?'01 / CONTRAST':'01 / KONTRAST'}</span></div>
  <div className={'lab-example '+(accessible ? 'lab-pass' : 'lab-fail')}><span>{en?'Good design is for everyone.':'Gutes Design ist für alle da.'}</span><span className="lab-cursor" aria-hidden="true">↖</span></div>
  <div className="lab-controls"><div><span className="mono">{en?'SMALL CHANGE. BIG DIFFERENCE.':'KLEINE ÄNDERUNG. GROSSE WIRKUNG.'}</span><p id="contrast-description">{en?'See the difference a readable contrast makes.':'Erlebe, was ein lesbarer Kontrast verändert.'}</p></div>
  <button type="button" className="contrast-switch" role="switch" aria-checked={accessible} aria-describedby="contrast-description" onClick={()=>setAccessible(!accessible)}><span className="switch-track"><span/></span>{en?'Readable contrast':'Lesbarer Kontrast'}</button></div>
  <p className="sr-only" role="status">{accessible ? (en?'The preview shows readable dark text on a light background.':'Die Vorschau zeigt gut lesbaren, dunklen Text auf hellem Hintergrund.') : (en?'The preview deliberately shows low contrast as an example of a barrier. Enable the switch for readable contrast.':'Die Vorschau zeigt absichtlich kontrastarmen Text als Beispiel einer Barriere. Aktiviere den Schalter für lesbaren Kontrast.')}</p>
 </div>;
}
