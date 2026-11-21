import { useState, useRef, useEffect, useId } from 'react';
import WabiyBird from './WabiyBird';

export interface QuickAuditProps {
  lang?: 'de' | 'en';
  className?: string;
  defaultUrl?: string;
  storyHref?: string;
}

export interface QuickAuditResult {
  success: boolean;
  version?: number;
  cached?: boolean;
  language?: string;
  direction?: string;
  url?: string;
  title?: string;
  scannedAt?: string;
  durationMs?: number;
  scope?: {
    pages?: number;
    viewport?: string;
    standard?: string;
    engine?: string;
    automaticOnly?: boolean;
  };
  summary?: {
    issueTypes: number;
    affectedElements: number;
    critical: number;
    serious: number;
    moderate: number;
    minor: number;
    needsManualReview?: boolean;
    incompleteChecks?: number;
  };
  highlights?: Array<{
    id: string;
    title: string;
    impact: 'critical' | 'serious' | 'moderate' | 'minor';
    impactLabel: string;
    wcag: string[];
    affectedElements: number;
  }>;
  hiddenIssueTypes?: number;
  notice?: string;
  ui?: {
    noIssues?: string;
    labels?: Record<string, string>;
    cta?: {
      heading: string;
      description: string;
      action: string;
    };
  };
  error?: {
    code: string;
    message: string;
  };
}

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: string | HTMLElement,
        options: {
          sitekey: string;
          action?: string;
          theme?: 'light' | 'dark' | 'auto';
          callback?: (token: string) => void;
          'error-callback'?: (code?: string) => void;
          'expired-callback'?: () => void;
        }
      ) => string;
      reset: (widgetId?: string) => void;
      remove: (widgetId?: string) => void;
      getResponse: (widgetId?: string) => string | undefined;
    };
  }
}

const TURNSTILE_SITEKEY = '0x4AAAAAAF8K-Ez6pN4rwYRO';

export default function QuickAudit({
  lang = 'de',
  className = '',
  defaultUrl = '',
  storyHref = '',
}: QuickAuditProps) {
  const isEn = lang === 'en';
  const componentId = useId().replace(/:/g, '');

  const [url, setUrl] = useState(defaultUrl);
  const [turnstileToken, setTurnstileToken] = useState('');
  const [status, setStatus] = useState<'idle' | 'scanning' | 'results' | 'error'>('idle');
  const [scanStep, setScanStep] = useState(0);
  const [auditResult, setAuditResult] = useState<QuickAuditResult | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  const turnstileContainerRef = useRef<HTMLDivElement>(null);
  const turnstileWidgetIdRef = useRef<string | null>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  const t = {
    engineBadge: 'WABIY AUDIT ENGINE v1.0',
    engineSpecs: 'WCAG 2.2 A/AA COMPLIANCE',
    headingMain: isEn ? 'Live Quick Audit.' : 'Live Quick Audit.',
    headingSub: isEn ? 'Instant Accessibility Check.' : 'Direkter Barriere-Check.',
    lead: isEn
      ? 'Test any public website against WCAG 2.2 A/AA standards in seconds. Free, automated, and directly in your browser.'
      : 'Prüfe eine beliebige öffentlich erreichbare Website in Sekunden nach WCAG 2.2 A/AA. Kostenlos, automatisiert und direkt im Browser.',
    urlLabel: isEn ? 'Website URL to audit' : 'Zu prüfende Website-Adresse',
    urlPlaceholder: isEn ? 'e.g. your-website.com' : 'z. B. deine-website.de',
    submitIdle: isEn ? 'Quick Audit starten' : 'Quick Audit starten',
    submitScanning: isEn ? 'Website wird geprüft...' : 'Website wird geprüft...',
    trustStandard: isEn ? 'Standard: WCAG 2.2 A/AA' : 'Standard: WCAG 2.2 A/AA',
    trustPrivacy: isEn ? 'GDPR-compliant · Zero storage' : '100% DSGVO-konform · Keine Speicherung',
    turnstileHint: isEn
      ? 'Completing security check...'
      : 'Sicherheitsprüfung wird vorbereitet...',
    turnstileRequired: isEn
      ? 'Please complete the security check above.'
      : 'Bitte bestätige kurz die Sicherheitsprüfung oben.',
    invalidUrl: isEn
      ? 'Please enter a valid website address (e.g. example.com).'
      : 'Bitte gib eine gültige Website-Adresse ein (z. B. beispiel.de).',
    scopes: isEn
      ? [
          { icon: '🔤', title: 'Color Contrast & Text', sub: 'WCAG 1.4.3 / 1.4.6' },
          { icon: '⌨', title: 'Keyboard & Focus', sub: 'WCAG 2.1.1 / 2.4.7' },
          { icon: '🏷', title: 'Forms & ARIA Markup', sub: 'WCAG 1.3.1 / 3.3.2' },
          { icon: '🖼', title: 'Images & Alt Attributes', sub: 'WCAG 1.1.1' },
        ]
      : [
          { icon: '🔤', title: 'Farbkontraste & Text', sub: 'WCAG 1.4.3 / 1.4.6' },
          { icon: '⌨', title: 'Tastatur & Fokus', sub: 'WCAG 2.1.1 / 2.4.7' },
          { icon: '🏷', title: 'Formulare & ARIA', sub: 'WCAG 1.3.1 / 3.3.2' },
          { icon: '🖼', title: 'Bilder & Alternativtexte', sub: 'WCAG 1.1.1' },
        ],
    scanningSteps: isEn
      ? [
          'Establishing secure connection...',
          'Loading DOM and document hierarchy...',
          'Evaluating WCAG 2.2 accessibility rules...',
          'Compiling high-tech audit findings...',
        ]
      : [
          'Sichere Verbindung aufbauen...',
          'DOM-Struktur & Seitenhierarchie laden...',
          'WCAG 2.2 Barrierefreiheits-Regeln prüfen...',
          'High-Tech Audit-Befunde aufbereiten...',
        ],
    tableStatus: isEn ? 'AUDIT REPORT LOG' : 'PRÜFPROTOKOLL & BEFUNDE',
    tableThSeverity: isEn ? 'SEVERITY' : 'SCHWEREGRAD',
    tableThWcag: isEn ? 'STANDARD' : 'KRITERIUM',
    tableThFinding: isEn ? 'RULE & ACCESSIBILITY FINDING' : 'PRÜFREGEL & BEFUND',
    tableThElements: isEn ? 'AFFECTED' : 'BETROFFEN',
    cachedBadge: isEn ? 'CACHE HIT' : 'CACHE HIT',
    issueTypesLabel: isEn ? 'Issue Types' : 'Fehlertypen',
    issueTypesSub: isEn ? 'distinct barrier categories' : 'erkannte Problemkategorien',
    affectedLabel: isEn ? 'Affected Elements' : 'Betroffene Stellen',
    affectedSub: isEn ? 'DOM elements with findings' : 'HTML-Elemente mit Befunden',
    severityLabel: isEn ? 'Severity Matrix' : 'Schweregrad-Matrix',
    critical: isEn ? 'Critical' : 'Kritisch',
    serious: isEn ? 'Serious' : 'Schwerwiegend',
    moderate: isEn ? 'Moderate' : 'Mittel',
    minor: isEn ? 'Minor' : 'Gering',
    elementsCount: (count: number) =>
      isEn
        ? `${count} node${count === 1 ? '' : 's'}`
        : `${count} Stelle${count === 1 ? '' : 'n'}`,
    hiddenIssuesText: (count: number) =>
      isEn
        ? `[SYSTEM] + ${count} more issue types available in the full platform audit.`
        : `[SYSTEM] + ${count} weitere Fehlertypen im erweiterten Plattform-Scan verfügbar.`,
    noIssuesDefault: isEn
      ? 'No automated barriers detected in this desktop snapshot. Please note that automated tools cover only a portion of the WCAG criteria.'
      : 'Keine Auffälligkeiten im begrenzten Schnellcheck gefunden. Das bedeutet nicht automatisch, dass die Seite vollständig barrierefrei ist.',
    noticeDefault: isEn
      ? 'Automated quick check of a desktop viewport. Not a certificate of full WCAG compliance. Mobile views, screen reader testing, and manual review require an in-depth audit.'
      : 'Automatischer Schnellcheck einer Desktop-Ansicht. Kein vollständiger WCAG-Konformitätsnachweis. Mobile Ansichten, Screenreader-Tests und manuelle Prüfungen erfordern einen vollständigen Audit.',
    ctaFullAudit: isEn ? 'Unlock Full Analysis on Wabiy' : 'Vollständige Analyse auf Wabiy freischalten',
    ctaConsultation: isEn
      ? 'Discuss Findings with Georgia (30 Min.)'
      : 'Befunde im Erstgespräch mit Georgia besprechen',
    ctaReset: isEn ? 'Run new audit' : 'Neuen Scan starten',
    storyBadge: 'COLLABORATION / WABIY',
    storyText: isEn
      ? 'Co-founded with Karam Hayani. Automated code evaluation meets human expertise.'
      : 'Gemeinsam mit Karam Hayani. Automatisierte Code-Prüfung verbunden mit menschlicher Expertise.',
    storyLink: isEn ? 'The idea behind Wabiy' : 'Die Idee hinter Wabiy',
    birdIdle: isEn
      ? 'Enter your URL – I will inspect the code for accessibility barriers!'
      : 'Gib deine URL ein – ich schaue mir den Quellcode auf Barrieren an!',
    birdScanning: isEn
      ? 'Looking through the markup and evaluating WCAG 2.2 criteria...'
      : 'Ich durchleuchte den Quellcode und prüfe WCAG 2.2 Regeln...',
    birdResultsIssues: isEn
      ? 'Here are the findings! Let’s remove these barriers step by step.'
      : 'Hier sind die ersten Befunde! Lass uns Barrieren Schritt für Schritt abbauen.',
    birdResultsClean: isEn
      ? 'Looking great! No obvious automated barriers found in this check. 🎉'
      : 'Klasse! Keine offensichtlichen Barrieren im Schnellcheck gefunden. 🎉',
  };

  // Mount Cloudflare Turnstile explicitly
  useEffect(() => {
    let isMounted = true;

    const renderWidget = () => {
      if (!isMounted || !turnstileContainerRef.current || !window.turnstile) return;
      if (turnstileWidgetIdRef.current) return;

      try {
        const isDark = document.documentElement.dataset.theme === 'dark';
        const widgetId = window.turnstile.render(turnstileContainerRef.current, {
          sitekey: TURNSTILE_SITEKEY,
          action: 'quick_audit',
          theme: isDark ? 'dark' : 'light',
          callback: (token: string) => {
            if (isMounted) setTurnstileToken(token);
          },
          'error-callback': () => {
            if (isMounted) setTurnstileToken('');
          },
          'expired-callback': () => {
            if (isMounted) setTurnstileToken('');
          },
        });
        turnstileWidgetIdRef.current = widgetId;
      } catch (err) {
        console.warn('Turnstile render notice:', err);
      }
    };

    if (window.turnstile) {
      renderWidget();
    } else {
      const existingScript = document.querySelector(
        'script[src*="challenges.cloudflare.com/turnstile"]'
      );
      if (!existingScript) {
        const script = document.createElement('script');
        script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
        script.async = true;
        script.defer = true;
        script.onload = () => {
          setTimeout(renderWidget, 100);
        };
        document.head.appendChild(script);
      } else {
        const interval = setInterval(() => {
          if (window.turnstile) {
            clearInterval(interval);
            renderWidget();
          }
        }, 150);
        return () => clearInterval(interval);
      }
    }

    return () => {
      isMounted = false;
      if (turnstileWidgetIdRef.current && window.turnstile) {
        try {
          window.turnstile.remove(turnstileWidgetIdRef.current);
        } catch {}
        turnstileWidgetIdRef.current = null;
      }
    };
  }, []);

  // Animate scanning progress steps
  useEffect(() => {
    if (status !== 'scanning') return;
    setScanStep(0);
    const interval = setInterval(() => {
      setScanStep((prev) => (prev < t.scanningSteps.length - 1 ? prev + 1 : prev));
    }, 900);
    return () => clearInterval(interval);
  }, [status]);

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    let cleanUrl = url.trim();
    if (!cleanUrl) {
      setErrorMessage(t.invalidUrl);
      return;
    }

    if (!/^https?:\/\//i.test(cleanUrl)) {
      cleanUrl = `https://${cleanUrl}`;
      setUrl(cleanUrl);
    }

    try {
      new URL(cleanUrl);
    } catch {
      setErrorMessage(t.invalidUrl);
      return;
    }

    // Attempt to obtain Turnstile token if available
    let token = turnstileToken;
    if (!token && window.turnstile && turnstileWidgetIdRef.current) {
      token = window.turnstile.getResponse(turnstileWidgetIdRef.current) || '';
    }

    if (!token) {
      setErrorMessage(t.turnstileRequired);
      return;
    }

    setErrorMessage('');
    setStatus('scanning');

    const payload = {
      url: cleanUrl,
      lang: isEn ? 'en' : 'de',
      turnstileToken: token,
    };

    try {
      // 1. Try local/pages proxy route (hides target API domain)
      let data: QuickAuditResult | null = null;
      try {
        const proxyRes = await fetch('/api/quick-audit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify(payload),
        });

        if (proxyRes.ok) {
          data = await proxyRes.json();
        } else if (proxyRes.status !== 404) {
          data = await proxyRes.json();
        }
      } catch {
        // Fallback to direct API if proxy cannot be reached
      }

      // 2. Direct fallback if proxy was 404 or unhandled
      if (!data) {
        const directRes = await fetch('https://api.wabiy.com/audit/public/quick', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify(payload),
        });
        data = await directRes.json();
      }

      if (data && data.success) {
        setAuditResult(data);
        setStatus('results');
        setTimeout(() => {
          resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      } else {
        setStatus('error');
        setErrorMessage(
          data?.error?.message ||
            (isEn
              ? 'The audit could not be performed. Please verify the URL and try again.'
              : 'Die Prüfung konnte nicht durchgeführt werden. Bitte überprüfe die URL und versuche es erneut.')
        );
      }
    } catch (err: any) {
      setStatus('error');
      setErrorMessage(
        err?.message ||
          (isEn
            ? 'Connection failed. Please check your internet connection and try again.'
            : 'Verbindung fehlgeschlagen. Bitte prüfe deine Internetverbindung und versuche es erneut.')
      );
    }
  };

  const handleReset = () => {
    setStatus('idle');
    setErrorMessage('');
    setAuditResult(null);
    setTurnstileToken('');
    if (window.turnstile && turnstileWidgetIdRef.current) {
      try {
        window.turnstile.reset(turnstileWidgetIdRef.current);
      } catch {}
    }
  };

  const currentBirdMessage = () => {
    if (status === 'scanning') return t.birdScanning;
    if (status === 'results') {
      const issueCount = auditResult?.summary?.issueTypes || 0;
      return issueCount > 0 ? t.birdResultsIssues : t.birdResultsClean;
    }
    return t.birdIdle;
  };

  return (
    <div
      id="quick-audit"
      className={`quick-audit-enterprise-suite ${className}`}
      aria-labelledby={`${componentId}-heading`}
    >
      <div className="quick-audit-grid">
        {/* Main Content Column (Audit Tool & Findings) */}
        <div className="quick-audit-content">
          <div className="engine-header-row">
            <span className="engine-badge mono">
              <span className="engine-dot" aria-hidden="true"></span>
              {t.engineBadge}
            </span>
            <span className="engine-specs mono">{t.engineSpecs}</span>
          </div>

          <h3 id={`${componentId}-heading`} className="quick-audit-title">
            {t.headingMain} <span className="muted-heading">{t.headingSub}</span>
          </h3>

          <p className="quick-audit-lead">{t.lead}</p>

          {/* Form View (Idle or Scanning) */}
          {status !== 'results' && (
            <form onSubmit={handleSubmit} noValidate className="quick-audit-form">
              <div className="audit-input-bar">
                <label htmlFor={`${componentId}-url`} className="sr-only">
                  {t.urlLabel}
                </label>
                <div className="audit-input-wrapper">
                  <span className="input-prefix-icon" aria-hidden="true">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <line x1="2" y1="12" x2="22" y2="12" />
                      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                    </svg>
                  </span>
                  <input
                    type="url"
                    id={`${componentId}-url`}
                    name="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder={t.urlPlaceholder}
                    autoComplete="url"
                    autoCapitalize="none"
                    autoCorrect="off"
                    spellCheck={false}
                    required
                    disabled={status === 'scanning'}
                    className="audit-input"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'scanning'}
                  className="button button-mint audit-submit-btn"
                >
                  <span>{status === 'scanning' ? t.submitScanning : t.submitIdle}</span>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <line x1="7" y1="17" x2="17" y2="7" />
                    <polyline points="7 7 17 7 17 17" />
                  </svg>
                </button>
              </div>

              {/* Turnstile Container */}
              <div className="audit-turnstile-wrapper">
                <div ref={turnstileContainerRef} className="turnstile-slot"></div>
              </div>

              {/* Error Banner */}
              {errorMessage && (
                <div className="audit-error-banner" role="alert">
                  <span className="error-icon" aria-hidden="true">
                    ⚠
                  </span>
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Scanning Live State */}
              {status === 'scanning' && (
                <div className="audit-scanning-card" role="status" aria-live="polite">
                  <div className="scanning-radar" aria-hidden="true">
                    <div className="radar-circle circle-1"></div>
                    <div className="radar-circle circle-2"></div>
                    <div className="radar-core"></div>
                  </div>
                  <div className="scanning-details">
                    <strong>{t.submitScanning}</strong>
                    <p>{t.scanningSteps[scanStep]}</p>
                  </div>
                </div>
              )}

              {/* Enterprise Scope Grid (4 Core Areas) - Fills height perfectly with zero empty space */}
              <div className="audit-scope-grid">
                {t.scopes.map((scope, idx) => (
                  <div key={idx} className="scope-card">
                    <span className="scope-icon" aria-hidden="true">
                      {scope.icon}
                    </span>
                    <div className="scope-info">
                      <strong className="scope-title">{scope.title}</strong>
                      <span className="scope-sub mono">{scope.sub}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Trust Signals */}
              <div className="audit-trust-signals">
                <span>
                  <span className="status-dot"></span>
                  {t.trustStandard}
                </span>
                <span>
                  <span className="status-dot"></span>
                  {t.trustPrivacy}
                </span>
              </div>
            </form>
          )}

          {/* High-Tech Results Dashboard & Table */}
          {status === 'results' && auditResult && (
            <div ref={resultsRef} className="hightech-results-dashboard" aria-live="polite">
              {/* Terminal HUD Header */}
              <div className="hightech-hud-bar">
                <div className="hud-status">
                  <span className="hud-beacon" aria-hidden="true">
                    <span className="hud-beacon-core"></span>
                    <span className="hud-beacon-ring"></span>
                  </span>
                  <span className="mono hud-status-text">SCAN_COMPLETE</span>
                </div>

                <div className="hud-target-info">
                  <span className="hud-url mono">{auditResult.url}</span>
                  {auditResult.title && (
                    <span className="hud-title">· {auditResult.title}</span>
                  )}
                </div>

                <div className="hud-pills mono">
                  {auditResult.durationMs && (
                    <span className="hud-pill">
                      ⏱ {(auditResult.durationMs / 1000).toFixed(1)}s
                    </span>
                  )}
                  {auditResult.cached && (
                    <span className="hud-pill hud-cache">
                      ✓ {t.cachedBadge}
                    </span>
                  )}
                </div>
              </div>

              {/* HUD Metric Tiles */}
              <div className="hightech-metrics-row">
                <div className="hightech-metric-tile">
                  <span className="metric-glow-number">
                    {auditResult.summary?.issueTypes ?? 0}
                  </span>
                  <div className="metric-meta">
                    <strong className="metric-label">{t.issueTypesLabel}</strong>
                    <span className="metric-desc mono">{t.issueTypesSub}</span>
                  </div>
                </div>

                <div className="hightech-metric-tile">
                  <span className="metric-glow-number">
                    {auditResult.summary?.affectedElements ?? 0}
                  </span>
                  <div className="metric-meta">
                    <strong className="metric-label">{t.affectedLabel}</strong>
                    <span className="metric-desc mono">{t.affectedSub}</span>
                  </div>
                </div>

                <div className="hightech-metric-tile tile-matrix">
                  <span className="matrix-title mono">{t.severityLabel}</span>
                  <div className="hightech-matrix-chips">
                    <span className="ht-chip ht-chip-critical mono">
                      <strong>{auditResult.summary?.critical ?? 0}</strong> {t.critical}
                    </span>
                    <span className="ht-chip ht-chip-serious mono">
                      <strong>{auditResult.summary?.serious ?? 0}</strong> {t.serious}
                    </span>
                    <span className="ht-chip ht-chip-moderate mono">
                      <strong>{auditResult.summary?.moderate ?? 0}</strong> {t.moderate}
                    </span>
                    <span className="ht-chip ht-chip-minor mono">
                      <strong>{auditResult.summary?.minor ?? 0}</strong> {t.minor}
                    </span>
                  </div>
                </div>
              </div>

              {/* High-Tech Results Table */}
              <div className="hightech-table-card">
                <div className="table-top-bar">
                  <span className="mono table-bar-title">
                    <span className="terminal-cursor">$</span> {t.tableStatus} ({auditResult.highlights?.length ?? 0})
                  </span>
                  <span className="table-bar-tag mono">WCAG 2.2 EVALUATION</span>
                </div>

                {(!auditResult.highlights || auditResult.highlights.length === 0) ? (
                  <div className="hightech-clean-slate">
                    <div className="clean-slate-radar" aria-hidden="true">✓</div>
                    <strong className="mono">[STATUS: ZERO DETECTED BARRIERS]</strong>
                    <p>{auditResult.ui?.noIssues || t.noIssuesDefault}</p>
                  </div>
                ) : (
                  <div className="hightech-table-scroll">
                    <table className="hightech-audit-table">
                      <thead>
                        <tr>
                          <th scope="col" className="col-status mono">{t.tableThSeverity}</th>
                          <th scope="col" className="col-standard mono">{t.tableThWcag}</th>
                          <th scope="col" className="col-desc">{t.tableThFinding}</th>
                          <th scope="col" className="col-count mono">{t.tableThElements}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {auditResult.highlights.map((issue) => (
                          <tr key={issue.id} className={`table-row-impact-${issue.impact}`}>
                            <td className="col-status">
                              <span className={`ht-table-badge badge-${issue.impact} mono`}>
                                <span className="status-micro-dot" aria-hidden="true"></span>
                                {issue.impactLabel || issue.impact}
                              </span>
                            </td>
                            <td className="col-standard">
                              <div className="wcag-cluster">
                                {issue.wcag && issue.wcag.length > 0 ? (
                                  issue.wcag.map((crit) => (
                                    <span key={crit} className="ht-wcag-badge mono">
                                      WCAG {crit}
                                    </span>
                                  ))
                                ) : (
                                  <span className="ht-wcag-badge mono">WCAG A/AA</span>
                                )}
                              </div>
                            </td>
                            <td className="col-desc">
                              <span className="finding-title">{issue.title}</span>
                            </td>
                            <td className="col-count mono">
                              <span className="count-pill">
                                {t.elementsCount(issue.affectedElements)}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {auditResult.hiddenIssueTypes && auditResult.hiddenIssueTypes > 0 && (
                  <div className="hightech-terminal-banner mono">
                    <span className="terminal-prefix">&gt;</span> {t.hiddenIssuesText(auditResult.hiddenIssueTypes)}
                  </div>
                )}
              </div>

              {/* Disclaimer Notice */}
              <div className="results-notice mono">
                <span className="notice-icon" aria-hidden="true">i</span>
                <p>{auditResult.notice || t.noticeDefault}</p>
              </div>

              {/* Action Buttons */}
              <div className="results-actions">
                <a
                  href="https://wabiy.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="button button-mint"
                >
                  <span>{auditResult.ui?.cta?.action || t.ctaFullAudit}</span>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <line x1="7" y1="17" x2="17" y2="7" />
                    <polyline points="7 7 17 7 17 17" />
                  </svg>
                </a>

                <a
                  href={isEn ? '/en/book-appointment/' : '/termin/'}
                  className="button button-outline"
                >
                  <span>{t.ctaConsultation}</span>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <line x1="7" y1="17" x2="17" y2="7" />
                    <polyline points="7 7 17 7 17 17" />
                  </svg>
                </a>

                <button
                  type="button"
                  onClick={handleReset}
                  className="button button-ghost"
                >
                  <span>{t.ctaReset}</span>
                  <span aria-hidden="true">↺</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Unified Enterprise Companion Card */}
        <div className="quick-audit-companion">
          <div className="companion-card">
            <div className="companion-halo" aria-hidden="true"></div>

            {/* Top Row: Collaboration Badge & Wordmark */}
            <div className="companion-header">
              <span className="project-status mono">
                <span className="status-dot" aria-hidden="true" />
                {t.storyBadge}
              </span>
              <span className="wabiy-wordmark">
                wabiy<span>.</span>
              </span>
            </div>

            {/* Short Mission note */}
            <p className="companion-desc">{t.storyText}</p>

            {/* Reactive Speech Bubble */}
            <div className="companion-bubble" aria-live="polite">
              <span className="bubble-arrow" aria-hidden="true"></span>
              <p>{currentBirdMessage()}</p>
            </div>

            {/* Interactive Bird Mascot */}
            <div className="companion-bird-box">
              <WabiyBird lang={lang} compact={true} />
            </div>

            {/* Bottom Row: Story CTA + Ultra High-Tech Powered by Wabiy Badge */}
            <div className="companion-footer-row">
              {storyHref && (
                <a className="button button-outline companion-story-btn" href={storyHref}>
                  <span>{t.storyLink}</span>
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <line x1="7" y1="17" x2="17" y2="7" />
                    <polyline points="7 7 17 7 17 17" />
                  </svg>
                </a>
              )}

              {/* High-Tech Modern Powered By Wabiy Badge */}
              <div className="hightech-powered-badge" aria-label="powered by wabiy">
                <span className="hightech-dot" aria-hidden="true" />
                <span className="mono hightech-powered-text">
                  POWERED BY <strong className="wabiy-glitch-brand">wabiy</strong>
                </span>
                <span className="hightech-star" aria-hidden="true">✳</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
