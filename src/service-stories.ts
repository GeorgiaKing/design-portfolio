import type {Language} from './i18n';

export function serviceStory(slug:string,lang:Language) {
 const t=(de:string,en:string)=>lang==='en'?en:de;
 const stories={
  'digitale-barrierefreiheit':{
   headline:[t('Mehr Menschen erreichen.','Reach more people.'),t('Weniger Hürden schaffen.','Create fewer barriers.')],
   intro:t('Ich helfe dir, digitale Barrieren zu verstehen und gezielt abzubauen. Vom ersten Blick auf deine Website bis zur Begleitung konkreter Verbesserungen.','I help you understand and reduce digital barriers. From an initial look at your website to supporting practical improvements.'),
   audience:[t('Bestehende Website','Existing website'),t('Relaunch','Relaunch'),t('Digitale Anwendung','Digital application')],
   benefits:[
    {icon:'access',title:t('Menschen einbeziehen','Include people'),text:t('Unterschiedliche Wahrnehmung und Bedienweisen von Anfang an berücksichtigen.','Consider different ways of perceiving and interacting from the start.')},
    {icon:'design',title:t('Barrieren verstehen','Understand barriers'),text:t('Befunde mit Nutzungssituationen verbinden, statt nur eine Fehlerliste abzuarbeiten.','Connect findings with real usage situations, rather than just working through an error list.')},
    {icon:'code',title:t('Gezielt verbessern','Improve with purpose'),text:t('Nachvollziehbare Empfehlungen für Design, Inhalt und technische Umsetzung.','Clear recommendations for design, content and implementation.')},
   ],
   changes:[
    [t('Ein Symbol ohne erkennbaren Zweck','An icon with no clear purpose'),t('Eine verständliche Beschriftung','A meaningful label')],
    [t('Orientierung nur über Farbe','Orientation based only on colour'),t('Zusätzliche Texte und klare Zustände','Text and clearly identified states')],
    [t('Unklarer nächster Schritt','An unclear next step'),t('Nachvollziehbare Wege durch die Seite','Understandable paths through the page')],
   ],
   steps:[
    {title:t('Kontext verstehen','Understand the context'),text:t('Wir klären Zielgruppen, wichtige Seiten und zentrale Nutzungspfade.','We clarify audiences, important pages and key user journeys.'),output:t('Ein gemeinsamer Prüffokus','A shared evaluation focus')},
    {title:t('Barrieren untersuchen','Explore barriers'),text:t('Struktur, Kontraste und Bedienung werden im vereinbarten Umfang betrachtet.','Structure, contrast and interaction are examined within the agreed scope.'),output:t('Befunde mit nachvollziehbarem Kontext','Findings with understandable context')},
    {title:t('Maßnahmen priorisieren','Prioritise improvements'),text:t('Wir übersetzen die Erkenntnisse in verständliche Aufgaben für dein Team.','We translate insights into understandable tasks for your team.'),output:t('Konkrete nächste Schritte','Practical next steps')},
    {title:t('Umsetzung begleiten','Support implementation'),text:t('Bei Bedarf begleite ich Verbesserungen und die erneute Prüfung.','Where needed, I support improvements and follow-up evaluation.'),output:t('Rückmeldung zu den Änderungen','Feedback on the changes')},
   ],
   deliverables:[
    {title:t('Befunde mit Kontext','Findings with context'),text:t('Was fällt auf, wen betrifft es und warum ist es relevant?','What stands out, who is affected and why does it matter?'),rows:[t('Betroffene Seite','Affected page'),t('Nutzungssituation','Usage situation'),t('Bezug zu WCAG','WCAG reference')]},
    {title:t('Ein klarer Maßnahmenplan','A clear action plan'),text:t('Aus Beobachtungen werden verständliche Aufgaben.','Turn observations into understandable tasks.'),rows:[t('Priorität','Priority'),t('Empfehlung','Recommendation'),t('Nächster Schritt','Next step')]},
    {title:t('Begleitung für dein Team','Support for your team'),text:t('Rückfragen und Umsetzung gemeinsam weiterdenken.','Work through questions and implementation together.'),rows:[t('Design & Inhalt','Design & content'),t('Entwicklung','Development'),t('Erneute Prüfung','Follow-up evaluation')]},
   ],
   faqs:[
    {q:t('Ist eine automatisierte Prüfung genug?','Is an automated check enough?'),a:t('Nein. Automatisierte Werkzeuge liefern hilfreiche Hinweise. Eine umfassende Bewertung braucht zusätzlich manuelle Prüfung und die Perspektive der Menschen, die das Angebot nutzen.','No. Automated tools provide useful insights. A comprehensive evaluation also needs manual assessment and the perspectives of the people using the service.')},
    {q:t('Muss ich mit einem großen Projekt starten?','Do I need to start with a large project?'),a:t('Nein. Wir können zunächst eine wichtige Seite oder einen zentralen Ablauf betrachten und daraus sinnvolle nächste Schritte ableiten. Den Umfang stimmen wir gemeinsam ab.','No. We can begin with an important page or key workflow and use the findings to identify useful next steps. We agree on the scope together.')},
    {q:t('Ist das eine rechtliche Zertifizierung?','Is this a legal certification?'),a:t('Nein. Ich unterstütze bei technischen und gestalterischen Fragen der Zugänglichkeit. Eine individuelle Rechtsberatung oder amtliche Zertifizierung ist damit nicht verbunden.','No. I support technical and design questions around accessibility. This does not constitute individual legal advice or official certification.')},
   ],
  },
  'ux-design':{
   headline:[t('Komplexität raus.','Less complexity.'),t('Klarheit rein.','More clarity.')],
   intro:t('Ich übersetze die Bedürfnisse deiner Nutzer:innen in verständliche digitale Erlebnisse. Von den richtigen Fragen bis zu einer greifbaren Oberfläche.','I translate your users’ needs into understandable digital experiences. From asking the right questions to creating a tangible interface.'),
   audience:[t('Neue Produktidee','New product idea'),t('Unübersichtliche Anwendung','Complex application'),t('Weiterentwicklung','Product improvement')],
   benefits:[
    {icon:'access',title:t('Bedürfnisse erkennen','Understand needs'),text:t('Mit User Research nachvollziehen, was Menschen erreichen möchten.','Use user research to understand what people want to achieve.')},
    {icon:'design',title:t('Orientierung schaffen','Create orientation'),text:t('Inhalte und Abläufe so strukturieren, dass nächste Schritte klar werden.','Structure content and journeys so that next steps become clear.')},
    {icon:'strategy',title:t('Ideen überprüfbar machen','Make ideas testable'),text:t('Mit Prototypen und Feedback Annahmen früh hinterfragen.','Use prototypes and feedback to question assumptions early.')},
   ],
   changes:[
    [t('Viele Funktionen ohne klare Richtung','Many features without a clear direction'),t('Ein erkennbares Ziel pro Nutzungspfad','A recognisable goal for each journey')],
    [t('Entscheidungen nach Bauchgefühl','Decisions based on intuition alone'),t('Gestaltung aus Erkenntnissen ableiten','Design based on insights')],
    [t('Details gestalten, bevor der Ablauf steht','Polishing details before the journey is clear'),t('Erst Struktur, dann Oberfläche','Structure first, then the interface')],
   ],
   steps:[
    {title:t('Zuhören','Listen'),text:t('Wir klären Ziele, Nutzungskontext und die Fragen an dein Produkt.','We clarify goals, context and the questions surrounding your product.'),output:t('Verständnis für die Ausgangslage','An understanding of the starting point')},
    {title:t('Struktur entwickeln','Develop structure'),text:t('Erkenntnisse werden zu nachvollziehbaren Wegen und einer Informationsarchitektur.','Insights become understandable journeys and information architecture.'),output:t('Nutzungspfade und Wireframes','User journeys and wireframes')},
    {title:t('Erlebbar gestalten','Make it tangible'),text:t('Die Idee wird als Oberfläche oder interaktiver Prototyp greifbar.','The idea becomes tangible as an interface or interactive prototype.'),output:t('Ein konkretes Designkonzept','A tangible design concept')},
    {title:t('Mit Feedback schärfen','Refine with feedback'),text:t('Wir hinterfragen Annahmen und verbessern das Konzept mit Nutzerfeedback.','We question assumptions and improve the concept with user feedback.'),output:t('Begründete nächste Entscheidungen','Informed next decisions')},
   ],
   deliverables:[
    {title:t('Erkenntnisse statt Annahmen','Insights over assumptions'),text:t('Eine gemeinsame Grundlage für Designentscheidungen.','A shared foundation for design decisions.'),rows:[t('Zielgruppen','Audiences'),t('Bedürfnisse','Needs'),t('Zentrale Fragestellungen','Key questions')]},
    {title:t('Eine klare Struktur','A clear structure'),text:t('Den Weg zum Ziel sichtbar und besprechbar machen.','Make the path to a goal visible and discussable.'),rows:[t('Informationsarchitektur','Information architecture'),t('Nutzungspfade','User journeys'),t('Wireframes','Wireframes')]},
    {title:t('Ein greifbares Konzept','A tangible concept'),text:t('So wird aus einer Idee eine überprüfbare Gestaltung.','Turn an idea into a design that can be evaluated.'),rows:[t('UI-Entwurf','Interface design'),t('Interaktiver Prototyp','Interactive prototype'),t('Feedback & Iteration','Feedback & iteration')]},
   ],
   faqs:[
    {q:t('Muss es schon ein fertiges Produkt geben?','Do I need an existing product?'),a:t('Nein. Wir können mit einer Idee beginnen oder eine bestehende Anwendung weiterentwickeln. Entscheidend ist, welche Fragen du klären möchtest.','No. We can begin with an idea or improve an existing application. What matters is which questions you want to answer.')},
    {q:t('Warum erst Wireframes und dann visuelles Design?','Why start with wireframes before visual design?'),a:t('Wireframes helfen uns, Struktur und Abläufe zu besprechen, ohne uns zu früh an Farben oder Details zu binden. Der passende Umfang hängt von deinem Projekt ab.','Wireframes help us discuss structure and journeys without committing too early to colours or details. The appropriate scope depends on your project.')},
    {q:t('Wie fließt Barrierefreiheit ein?','How is accessibility included?'),a:t('Ich denke Zugänglichkeit bei Struktur, Beschriftungen und Bedienung mit. Welche Prüfungen und Ausarbeitungen Teil des Projekts sind, vereinbaren wir gemeinsam.','I consider accessibility in structure, labels and interaction. We agree together which evaluations and deliverables are part of the project.')},
   ],
  },
  'webentwicklung':{
   headline:[t('Dein Angebot.','Your offer.'),t('Ein klarer digitaler Auftritt.','A clear digital presence.')],
   intro:t('Ich begleite deine Website von der ersten Idee bis zur Umsetzung. Individuell gestaltet, responsiv aufgebaut und verständlich für die Menschen, die sie besuchen.','I support your website from the first idea to implementation. Individually designed, responsive and understandable for the people visiting it.'),
   audience:[t('Erster Webauftritt','First website'),t('Website-Relaunch','Website relaunch'),t('Neues Angebot','New offer')],
   benefits:[
    {icon:'design',title:t('Dein Profil sichtbar machen','Show your identity'),text:t('Eine eigenständige Gestaltung, die dein Angebot verständlich präsentiert.','Distinctive design that presents your offer clearly.')},
    {icon:'code',title:t('Auf Geräten mitdenken','Think across devices'),text:t('Inhalte und Bedienung passen sich unterschiedlichen Bildschirmgrößen an.','Content and interaction adapt to different screen sizes.')},
    {icon:'access',title:t('Eine gute Basis schaffen','Build a strong foundation'),text:t('Zugängliche Strukturen und technische Grundlagen für Suchmaschinen.','Accessible structures and technical foundations for search engines.')},
   ],
   changes:[
    [t('Ein Angebot, das online schwer greifbar ist','An offer that is hard to understand online'),t('Eine klare Geschichte und passende Inhalte','A clear story and relevant content')],
    [t('Eine Oberfläche für nur ein Bildschirmformat','An interface for just one screen size'),t('Ein flexibles Layout für verschiedene Geräte','A flexible layout for different devices')],
    [t('Unsicherheit bei der späteren Pflege','Uncertainty about ongoing maintenance'),t('Eine verständliche Einführung in die Inhalte','A clear introduction to managing content')],
   ],
   steps:[
    {title:t('Angebot verstehen','Understand your offer'),text:t('Wir klären Ziele, Inhalte und die Menschen, die du erreichen möchtest.','We clarify goals, content and the people you want to reach.'),output:t('Ein klarer Seitenplan','A clear page plan')},
    {title:t('Auftritt gestalten','Design your presence'),text:t('Struktur und Gestaltung werden passend zu deinem Profil entwickelt.','Structure and design are developed around your identity.'),output:t('Ein individueller Entwurf','An individual design')},
    {title:t('Responsiv umsetzen','Build responsively'),text:t('Die Seite wird für verschiedene Ansichten und Bedienweisen aufgebaut.','The site is built for different viewports and ways of interacting.'),output:t('Eine nutzbare Website','A usable website')},
    {title:t('Prüfen & übergeben','Review & hand over'),text:t('Wir betrachten zentrale Abläufe und besprechen die Pflege der Inhalte.','We review key interactions and discuss content maintenance.'),output:t('Klarheit für den weiteren Betrieb','Clarity for ongoing operation')},
   ],
   deliverables:[
    {title:t('Inhalt mit Richtung','Content with direction'),text:t('Dein Angebot und die nächsten Schritte werden verständlich.','Make your offer and next steps understandable.'),rows:[t('Seitenstruktur','Page structure'),t('Inhaltsplanung','Content planning'),t('Klare Kontaktwege','Clear contact options')]},
    {title:t('Gestaltung mit Charakter','Design with character'),text:t('Ein Auftritt, der sich an deinem Profil orientiert.','A presence built around your identity.'),rows:[t('Visuelle Gestaltung','Visual design'),t('Responsive Ansichten','Responsive layouts'),t('Zugängliche Bedienelemente','Accessible controls')]},
    {title:t('Eine durchdachte Grundlage','A considered foundation'),text:t('Technik und spätere Nutzung gehören zusammen.','Connect the technology with ongoing use.'),rows:[t('Semantische Struktur','Semantic structure'),t('SEO-Grundlagen','SEO foundations'),t('Einführung in die Pflege','Content maintenance guidance')]},
   ],
   faqs:[
    {q:t('Kannst du meine vorhandenen Inhalte übernehmen?','Can you use my existing content?'),a:t('Ja. Wir schauen gemeinsam, was weiterhin passt, was verständlicher werden sollte und welche Inhalte fehlen.','Yes. We review what still fits, what could become clearer and which content is missing.')},
    {q:t('Kann ich Inhalte später selbst pflegen?','Can I maintain content myself?'),a:t('Wie die Pflege organisiert wird, klären wir bei der Planung. Ich erkläre dir die vereinbarte Lösung verständlich.','We clarify content maintenance during planning. I explain the agreed solution in an understandable way.')},
    {q:t('Sind Suchmaschinen und Barrierefreiheit berücksichtigt?','Are search engines and accessibility considered?'),a:t('Ja, als Teil der technischen und gestalterischen Grundlagen. Sichtbarkeit und vollständige Konformität lassen sich dadurch nicht pauschal garantieren. Der genaue Umfang wird vereinbart.','Yes, as part of the technical and design foundations. This cannot guarantee search visibility or full conformance. We agree on the precise scope.')},
   ],
  },
  'strategie-testing':{
   headline:[t('Bessere Fragen.','Better questions.'),t('Sicherere Entscheidungen.','More informed decisions.')],
   intro:t('Ich verbinde digitale Strategie mit einem Blick für Softwarequalität. Damit dein Team erkennt, was wichtig ist, was geprüft werden sollte und welcher Schritt als Nächstes sinnvoll ist.','I connect digital strategy with a focus on software quality, helping your team understand what matters, what needs testing and which next step makes sense.'),
   audience:[t('Unklare Prioritäten','Unclear priorities'),t('Kritische Abläufe','Critical workflows'),t('Produktentwicklung','Product development')],
   benefits:[
    {icon:'strategy',title:t('Richtung klären','Clarify direction'),text:t('Ziele und Herausforderungen aus der Nutzerperspektive einordnen.','Understand goals and challenges from the user’s perspective.')},
    {icon:'code',title:t('Abläufe hinterfragen','Question workflows'),text:t('Kritische Wege betrachten und mögliche Fehlerquellen erkennen.','Review critical journeys and identify potential sources of error.')},
    {icon:'check',title:t('Qualität mitdenken','Consider quality'),text:t('Testing und nächste Verbesserungen bewusst in die Planung einbeziehen.','Include testing and improvements deliberately in planning.')},
   ],
   changes:[
    [t('Viele Ideen, aber keine gemeinsame Richtung','Many ideas without a shared direction'),t('Ziele und nächste Schritte gemeinsam priorisieren','Prioritise goals and next steps together')],
    [t('Annahmen über die Nutzung','Assumptions about usage'),t('Anforderungen aus konkreten Nutzungspfaden ableiten','Derive requirements from specific user journeys')],
    [t('Fehler erst am Ende eines Ablaufs bemerken','Discovering problems only at the end of a journey'),t('Kritische Stellen bewusst in den Blick nehmen','Focus deliberately on critical steps')],
   ],
   steps:[
    {title:t('Ausgangslage klären','Clarify the starting point'),text:t('Wir ordnen Ziele, aktuelle Herausforderungen und Nutzungssituationen ein.','We explore goals, current challenges and usage situations.'),output:t('Ein gemeinsames Problemverständnis','A shared understanding of the problem')},
    {title:t('Anforderungen schärfen','Refine requirements'),text:t('Wir betrachten, was Menschen in wichtigen Abläufen erreichen müssen.','We examine what people need to achieve in important journeys.'),output:t('Greifbare Nutzungspfade','Tangible user journeys')},
    {title:t('Qualität betrachten','Explore quality'),text:t('Mögliche Fehlerquellen und passende Prüfungen werden besprochen.','We discuss potential sources of error and appropriate checks.'),output:t('Ein bewusster Prüffokus','A deliberate testing focus')},
    {title:t('Nächste Schritte ordnen','Organise next steps'),text:t('Wir priorisieren Verbesserungen passend zu deinem Vorhaben.','We prioritise improvements around your project.'),output:t('Eine nachvollziehbare Richtung','A clear direction')},
   ],
   deliverables:[
    {title:t('Ein gemeinsames Zielbild','A shared direction'),text:t('Damit dein Team über dasselbe Problem spricht.','Help your team talk about the same problem.'),rows:[t('Ziele','Goals'),t('Nutzungskontext','Usage context'),t('Offene Fragen','Open questions')]},
    {title:t('Prüfbare Anforderungen','Testable requirements'),text:t('Abläufe werden konkret und besprechbar.','Make journeys concrete and discussable.'),rows:[t('Kritische Wege','Critical journeys'),t('Erwartetes Verhalten','Expected behaviour'),t('Mögliche Fehlerquellen','Possible sources of error')]},
    {title:t('Priorisierte Schritte','Prioritised steps'),text:t('Vom Überblick zur nächsten sinnvollen Verbesserung.','From an overview to the next useful improvement.'),rows:[t('Handlungsfelder','Areas for action'),t('Qualitätssicherung','Quality assurance'),t('Weiterentwicklung','Further development')]},
   ],
   faqs:[
    {q:t('Brauche ich bereits konkrete Anforderungen?','Do I need detailed requirements?'),a:t('Nein. Wir können zunächst Ordnung in offene Fragen bringen. Vorhandene Anforderungen und Erkenntnisse sind eine hilfreiche Grundlage.','No. We can begin by organising open questions. Existing requirements and insights are a useful starting point.')},
    {q:t('Geht es nur um das Finden von Fehlern?','Is this only about finding defects?'),a:t('Nein. Qualität beginnt beim Verständnis der Ziele und der erwarteten Nutzung. Testing ist ein Baustein neben klaren Anforderungen und bewussten Entscheidungen.','No. Quality starts with understanding goals and expected usage. Testing is one part alongside clear requirements and considered decisions.')},
    {q:t('Kannst du ein bestehendes Team unterstützen?','Can you support an existing team?'),a:t('Ja. Wir können an eurem aktuellen Stand ansetzen und gemeinsam klären, welche Fragen und Aufgaben ich sinnvoll begleiten kann.','Yes. We can start from your team’s current position and agree which questions and tasks I can meaningfully support.')},
   ],
  },
 };
 return stories[slug as keyof typeof stories] || stories['digitale-barrierefreiheit'];
}
