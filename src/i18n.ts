export type Language = 'de' | 'en';
export const routePairs: Record<string,string> = {
 '/':'/en/', '/ueber-mich/':'/en/about/', '/wabiy/':'/en/wabiy/',
 '/kontakt/':'/en/contact/',
 '/termin/':'/en/book-appointment/',
 '/impressum/':'/en/legal-notice/', '/datenschutz/':'/en/privacy/',
 '/barrierefreiheit/':'/en/accessibility/', '/agb/':'/en/terms/',
 '/impulse/':'/en/insights/', '/impulse/barrierefreiheit-im-alltag/':'/en/insights/accessibility-in-practice/',
 '/impulse/willkommen/':'/en/insights/welcome/',
 '/leistungen/digitale-barrierefreiheit/':'/en/services/digital-accessibility/',
 '/leistungen/ux-design/':'/en/services/ux-design/', '/leistungen/webentwicklung/':'/en/services/web-development/',
 '/leistungen/strategie-testing/':'/en/services/strategy-testing/',
};
export function language(path:string): Language { return path.startsWith('/en/') ? 'en' : 'de'; }
export function germanPath(path:string) { return Object.entries(routePairs).find(([,en])=>en===path)?.[0] || path; }
export function href(path:string,lang:Language) {
 const [base,hash] = path.split('#');
 return (lang==='en' ? routePairs[base]||base : germanPath(base))+(hash?'#'+hash:'');
}
