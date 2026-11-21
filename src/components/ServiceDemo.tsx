import {useState} from 'react';

export default function ServiceDemo({kind,en=false}:{kind:string;en?:boolean}) {
 const [active,setActive]=useState(kind==='access'?1:0);
 const t=(de:string,english:string)=>en?english:de;
 const options=kind==='access'?[t('Ausgangslage','Starting point'),t('Klarer gestaltet','Clearer design')]:kind==='design'?[t('Verstehen','Understand'),t('Strukturieren','Structure'),t('Gestalten','Design')]:kind==='code'?[t('Desktop','Desktop'),t('Tablet','Tablet'),t('Mobil','Mobile')]:[t('Einstieg','Start'),t('Eingabe','Input'),t('Rückmeldung','Feedback')];
 const captions=kind==='access'?[
  t('Ein unbeschriftetes Symbol lässt offen, was als Nächstes passiert. Die Markierung zeigt, wo eine Barriere entstehen kann.','An unlabelled icon leaves the next step unclear. The annotation highlights a potential barrier.'),
  t('Ein eindeutiger Text erklärt die Aktion. Sichtbare Zustände und eine klare Reihenfolge unterstützen die Orientierung.','A meaningful label explains the action. Visible states and a clear sequence support orientation.')
 ]:kind==='design'?[
  t('Zuerst zählt das Ziel der Menschen. Beobachtungen und Fragen bilden die Grundlage für den Entwurf.','Start with people’s goals. Observations and questions inform the design.'),
  t('Ein Wireframe ordnet Inhalte und Schritte. So lässt sich der Ablauf besprechen, bevor Details ausgearbeitet werden.','A wireframe organises content and steps. It makes the journey discussable before refining the details.'),
  t('Aus der Struktur wird eine greifbare Oberfläche. Feedback hilft, den Entwurf gezielt weiterzuentwickeln.','The structure becomes a tangible interface. Feedback helps refine the design.')
 ]:kind==='code'?[
  t('Auf großen Bildschirmen stehen Inhalt und visuelle Orientierung nebeneinander.','On larger screens, content and visual orientation sit side by side.'),
  t('Auf mittleren Breiten rücken die Elemente zusammen. Der Inhalt behält eine klare Hierarchie.','At medium widths, elements move closer together while retaining a clear hierarchy.'),
  t('Auf dem Smartphone folgen die Inhalte einer Spalte. Schrift und Bedienelemente bleiben gut lesbar.','On a smartphone, content follows a single column. Text and controls remain easy to read.')
 ]:[
  t('Prüffrage: Ist der erste Schritt verständlich und auch per Tastatur erreichbar?','Test question: Is the first step understandable and reachable with a keyboard?'),
  t('Prüffrage: Sind Pflichtangaben klar? Was passiert, wenn eine Eingabe fehlt?','Test question: Are required fields clear? What happens when an input is missing?'),
  t('Prüffrage: Erfahren Menschen verständlich, ob ihre Anfrage angekommen ist?','Test question: Do people receive a clear explanation of whether their request arrived?')
 ];
 return <div className={`service-demo demo-${kind}`}>
  <div className="demo-top"><span className="demo-live" aria-hidden="true"/><span>{t('Ideen sichtbar machen','Making ideas visible')}</span><span aria-hidden="true">↗</span></div>
  <div className="demo-switch" role="group" aria-label={t('Visualisierung auswählen','Choose a visualisation')}>
   {options.map((option,i)=><button key={option} type="button" aria-pressed={active===i} onClick={()=>setActive(i)}>{option}</button>)}
  </div>
  <div className="demo-stage" aria-hidden="true">
   {kind==='access'&&<div key={active} className="demo-enter access-example">
    <span className="demo-small-label">{t('BEISPIEL: NÄCHSTER SCHRITT','EXAMPLE: NEXT STEP')}</span>
    <div className="example-path"><span>01</span><i/><span>02</span><i/><span className={active?'path-current':''}>03</span></div>
    <div className="example-heading">{t('Dein Anliegen.','Your request.')}</div><div className="skeleton wide"/><div className="skeleton"/>
    <div className={active?'example-action clear':'example-action'}>{active?t('Anfrage vorbereiten →','Prepare enquiry →'):'→'}</div>
    <div className="example-annotation"><span>{active?'✓':'?'}</span>{active?t('Zweck erkennbar','Purpose is clear'):t('Was passiert hier?','What happens here?')}</div>
   </div>}
   {kind==='design'&&<div key={active} className={`demo-enter design-example design-step-${active}`}>
    {active===0?<><div className="research-centre">{t('Was möchte ich erreichen?','What do I want to achieve?')}</div><div className="research-note note-a">{t('Ziele verstehen','Understand goals')}</div><div className="research-note note-b">{t('Fragen stellen','Ask questions')}</div><div className="research-note note-c">{t('Hürden erkennen','Identify obstacles')}</div></>:<div className={`design-canvas ${active===1?'wireframe':''}`}><div className="canvas-nav"><span>g.</span><span>—— &nbsp; ——</span></div><div className="canvas-content"><span className="demo-small-label">{t('KLARER ABLAUF','A CLEAR JOURNEY')}</span><div className="example-heading">{t('Ein Ziel.','One goal.')}<br/>{t('Ein nächster Schritt.','One next step.')}</div><div className="skeleton wide"/><div className="example-action clear">{t('Kontakt aufnehmen ↗','Get in touch ↗')}</div><div className="canvas-tiles"><span>01</span><span>02</span><span>03</span></div></div></div>}
   </div>}
   {kind==='code'&&<div className={`responsive-browser device-${active}`}><div className="browser-chrome"><span>● ● ●</span><span>deine-website.de</span></div><div key={active} className="demo-enter responsive-content"><div><span className="demo-small-label">{t('DEIN ANGEBOT','YOUR OFFER')}</span><div className="example-heading">{t('Klar.','Clear.')}<br/>{t('Auf jedem Gerät.','On every device.')}</div><div className="skeleton wide"/><div className="skeleton"/></div><div className="responsive-art"><span>g.</span><i/><i/></div></div></div>}
   {kind==='strategy'&&<div className="strategy-example"><div className="test-flow">{options.map((o,i)=><div className={active===i?'flow-node selected':'flow-node'} key={o}><span>{'0'+(i+1)}</span><strong>{o}</strong></div>)}</div><div key={active} className="demo-enter test-detail"><span className="test-crosshair"/><span className="demo-small-label">{t('GENAUER HINSEHEN','TAKING A CLOSER LOOK')}</span><div className="example-heading">{[t('Wo geht’s los?','Where do I start?'),t('Was wird gebraucht?','What is needed?'),t('Hat es geklappt?','Did it work?')][active]}</div><div className="skeleton wide"/><div className="skeleton"/><div className="test-pill">{t('Beobachten → Einordnen → Verbessern','Observe → Assess → Improve')}</div></div></div>}
  </div>
  <p className="demo-caption" role="status" aria-live="polite" aria-atomic="true">{captions[active]}</p>
  <p className="demo-footnote">{t('Interaktive Illustration · kein Kundenprojekt','Interactive illustration · not a client project')}</p>
 </div>;
}
