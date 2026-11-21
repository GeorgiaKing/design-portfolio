import type { Language } from './i18n';
export function career(lang:Language) {
 const en=lang==='en';
 return {
  work:[
   {date:en?'Since January 2026':'Seit Januar 2026',title:en?'Accessibility Engineer & UX Designer':'Accessibility Engineer & UX-Designerin',place:en?'Independent · Georgia König – Barrierefreie Software':'Selbstständig · Georgia König – Barrierefreie Software',text:en?'Bringing together accessible technology, user-centred design and personal consulting.':'Ich verbinde zugängliche Technologie, nutzerzentriertes Design und persönliche Beratung.',tags:['Accessibility','UX Design'],current:true},
   {date:'2024 – 2025',title:'UX Designer',place:'Novatec Consulting GmbH · Stuttgart',text:en?'A new focus in consulting: supporting client projects with UX design and a strong user perspective.':'Ein neuer Schwerpunkt in meiner Beratungstätigkeit: UX-Design und die Nutzerperspektive in unterschiedlichen Kundenprojekten.',tags:['User Experience','Consulting']},
   {date:'2023 – 2024',title:'IT Consultant',place:'Novatec Consulting GmbH · Stuttgart',text:en?'Growing experience and responsibility in diverse IT consulting projects.':'Mit der ersten Beförderung habe ich meine Erfahrungen und Verantwortung in verschiedenen IT-Projekten ausgebaut.',tags:['IT Consulting','Projects']},
   {date:'2020 – 2022',title:'Junior IT Consultant',place:'Novatec Consulting GmbH · Stuttgart',text:en?'Starting my full-time IT career after completing my master’s degree in Human-centered Computing.':'Nach dem Master in Human-centered Computing startete ich meine IT-Karriere in Festanstellung.',tags:['Consulting','Software']},
   {date:'2017 – 2020',title:en?'Working student':'Werkstudentin',place:'Novatec Consulting GmbH · Stuttgart',text:en?'Combining academic study with professional practice and writing both my bachelor’s and master’s theses in an applied setting.':'Parallel zum Studium begann mein beruflicher Weg bei Novatec. Dort entstanden auch meine praxisnahen Bachelor- und Masterarbeiten.',tags:['DevOps',en?'Research':'Forschung']},
   {date:'2016',title:en?'Working student · Quality assurance':'Werkstudentin · Qualitätssicherung',place:'TeamViewer GmbH · Göppingen',text:en?'A practical semester exploring software testing and test automation in the quality assurance department.':'Mein Praxissemester in der Qualitätssicherung: Software Testing und Testautomatisierung aus erster Hand.',tags:['Software Testing','QA']},
  ],
  education:[
   {date:'2017 – 2020',title:'M.Sc. Human-centered Computing',place:en?'Reutlingen University':'Hochschule Reutlingen',text:en?'Master’s thesis: “DevOps-o-Mate” – designing a system for continuous improvement in the context of DevOps.':'Masterthesis: „DevOps-o-Mate“ – Konzeption eines Systems für Continuous Improvement im Kontext von DevOps.',tags:['Master of Science','DevOps']},
   {date:'2013 – 2017',title:en?'B.Sc. Media & Communication Informatics':'B.Sc. Medien- und Kommunikationsinformatik',place:en?'Reutlingen University':'Hochschule Reutlingen',text:en?'Bachelor’s thesis: developing a didactic concept for teaching DevOps topics.':'Bachelorthesis: Entwicklung eines didaktischen Konzepts für die Vermittlung von DevOps-Inhalten.',tags:['Bachelor of Science',en?'Computer science':'Informatik']},
   {date:'2010 – 2013',title:en?'University of applied sciences entrance qualification':'Fachhochschulreife',place:'Richard-von-Weizsäcker-Schule · Öhringen',text:en?'Social sciences upper secondary school.':'Sozialwissenschaftliches Gymnasium.',tags:[]},
   {date:'2006 – 2010',title:en?'Intermediate school certificate':'Mittlere Reife',place:'Georg-Wagner-Realschule · Künzelsau',text:en?'The foundations of my educational journey.':'Die Grundlagen meines Bildungswegs.',tags:[]},
  ]
 };
}
