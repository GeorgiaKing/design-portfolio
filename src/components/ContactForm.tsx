import { useState, useRef, useId, useEffect } from 'react';

interface ContactFormProps {
  lang?: 'de' | 'en';
  idPrefix?: string;
  className?: string;
}

function renderReadingAid(text: string): React.ReactNode {
  const regex = /(^|[\s\-_/("„'»«\p{Ps}])(\p{L})/gu;
  const elements: (string | React.ReactNode)[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    const [fullMatch, prefix, letter] = match;
    const matchStart = match.index;
    if (matchStart > lastIndex) {
      elements.push(text.slice(lastIndex, matchStart));
    }
    if (prefix) {
      elements.push(prefix);
    }
    elements.push(
      <b key={matchStart} className="b-char">
        {letter}
      </b>
    );
    lastIndex = matchStart + fullMatch.length;
  }

  if (lastIndex < text.length) {
    elements.push(text.slice(lastIndex));
  }

  return elements.length > 0 ? elements : text;
}

export default function ContactForm({
  lang = 'de',
  idPrefix: customPrefix,
  className = '',
}: ContactFormProps) {
  const generatedId = useId();
  const idPrefix = customPrefix || `gk-form-${generatedId.replace(/:/g, '')}`;
  const isEn = lang === 'en';

  const t = {
    legend: isEn ? 'Send a message' : 'Nachricht senden',
    intro: isEn
      ? 'Fill out the form below and I will get back to you promptly.'
      : 'Fülle das Formular aus und ich melde mich zeitnah bei dir.',
    nameLabel: isEn ? 'Your name' : 'Dein Name',
    namePlaceholder: isEn ? 'e.g. Alex Miller' : 'z. B. Alex Müller',
    nameError: isEn
      ? 'Please enter your name (at least 2 characters).'
      : 'Bitte gib deinen Namen ein (mindestens 2 Zeichen).',
    emailLabel: isEn ? 'Email address' : 'E-Mail-Adresse',
    emailPlaceholder: isEn ? 'name@company.com' : 'name@unternehmen.de',
    emailError: isEn
      ? 'Please enter a valid email address.'
      : 'Bitte gib eine gültige E-Mail-Adresse ein.',
    phoneLabel: isEn ? 'Phone number' : 'Telefonnummer',
    phoneOptional: isEn ? '(optional)' : '(freiwillig)',
    phonePlaceholder: '+49 ...',
    topicLabel: isEn ? 'What is your inquiry about?' : 'Worum geht es?',
    topicOptions: [
      {
        value: 'erstgespraech',
        badge: isEn ? 'Free' : 'Kostenlos',
        label: isEn
          ? 'Free initial accessibility consultation'
          : 'Kostenloses Erstgespräch Barrierefreiheit',
        desc: isEn
          ? '30 min non-binding introductory session'
          : '30 Min. unverbindliches Kennenlernen & Bedarfsanalyse',
      },
      {
        value: 'audit',
        badge: 'WCAG 2.2',
        label: isEn
          ? 'Accessibility audit / WCAG evaluation'
          : 'Barrierefreiheits-Audit / WCAG-Prüfung',
        desc: isEn
          ? 'Detailed audit according to WCAG 2.2, BFSG & BITV'
          : 'Detaillierter Prüfbericht nach WCAG 2.2, BFSG & BITV',
      },
      {
        value: 'ux',
        badge: 'Design',
        label: isEn
          ? 'UX & UI design project'
          : 'UX & UI Design Projekt',
        desc: isEn
          ? 'Accessible user experiences & design systems'
          : 'Nutzerzentrierte Interfaces & barrierefreie Design-Systeme',
      },
      {
        value: 'webentwicklung',
        badge: 'Code',
        label: isEn
          ? 'Web development & accessible coding'
          : 'Webentwicklung & Barrierefreie Umsetzung',
        desc: isEn
          ? 'Modern accessible frontends with Astro & React'
          : 'Moderne Webseiten & Apps nach höchsten Standards',
      },
      {
        value: 'allgemein',
        badge: isEn ? 'Inquiry' : 'Anfrage',
        label: isEn ? 'General inquiry / other' : 'Allgemeine Anfrage / Sonstiges',
        desc: isEn
          ? 'Workshops, talks, or individual questions'
          : 'Workshops, Vorträge oder sonstige persönliche Fragen',
      },
    ],
    messageLabel: isEn ? 'Your message' : 'Deine Nachricht',
    messagePlaceholder: isEn
      ? 'Briefly describe your project, website or questions...'
      : 'Beschreibe kurz dein Vorhaben, deine Website oder deine Fragen...',
    messageError: isEn
      ? 'Please enter your message (at least 10 characters).'
      : 'Bitte gib eine Nachricht ein (mindestens 10 Zeichen).',
    privacyTextPre: isEn
      ? 'I have read the '
      : 'Ich habe die ',
    privacyLinkText: isEn ? 'privacy policy' : 'Datenschutzerklärung',
    privacyTextPost: isEn
      ? ' and consent to the transmission and processing of my data to answer this inquiry.'
      : ' zur Kenntnis genommen und willige ein, dass meine Angaben zur Bearbeitung meiner Anfrage übermittelt und verarbeitet werden.',
    privacyError: isEn
      ? 'Please agree to the privacy policy to continue.'
      : 'Bitte bestätige die Datenschutzerklärung, um fortzufahren.',
    requiredNote: isEn
      ? 'Fields marked with * are required.'
      : 'Mit * gekennzeichnete Felder sind Pflichtfelder.',
    submitIdle: isEn ? 'Send message' : 'Nachricht absenden',
    submitSending: isEn ? 'Sending...' : 'Wird gesendet...',
    successTitle: isEn
      ? 'Thank you for your message!'
      : 'Vielen Dank für deine Nachricht!',
    successText: isEn
      ? 'Your inquiry has been received. I will review it carefully and get back to you within 24 to 48 hours.'
      : 'Deine Nachricht wurde erfolgreich übermittelt. Ich melde mich in der Regel innerhalb von 24 bis 48 Stunden persönlich bei dir.',
    sendAnother: isEn ? 'Send another message' : 'Weitere Nachricht senden',
    errorTitle: isEn
      ? 'Message could not be sent'
      : 'Nachricht konnte nicht gesendet werden',
    errorText: isEn
      ? 'There was a connection issue while sending. You can try again or reach out directly:'
      : 'Beim Senden ist leider ein Verbindungsfehler aufgetreten. Du kannst es erneut versuchen oder mir direkt schreiben:',
    tryAgain: isEn ? 'Try again' : 'Erneut versuchen',
    directEmail: 'kontakt@georgia-koenig.de',
    directPhone: '+49 1515 0242 010',
  };

  const privacyHref = isEn ? '/en/privacy/' : '/datenschutz/';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    topic: 'erstgespraech',
    message: '',
    privacy: false,
  });

  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [serverError, setServerError] = useState('');

  const successRef = useRef<HTMLDivElement>(null);
  const errorRef = useRef<HTMLDivElement>(null);

  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);

  const selectContainerRef = useRef<HTMLDivElement>(null);
  const triggerButtonRef = useRef<HTMLButtonElement>(null);
  const listboxRef = useRef<HTMLUListElement>(null);

  const currentOption =
    t.topicOptions.find((opt) => opt.value === formData.topic) || t.topicOptions[0];

  useEffect(() => {
    if (!isSelectOpen) return;

    const handlePointerDown = (event: MouseEvent | TouchEvent) => {
      if (
        selectContainerRef.current &&
        !selectContainerRef.current.contains(event.target as Node)
      ) {
        setIsSelectOpen(false);
      }
    };

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('touchstart', handlePointerDown);

    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('touchstart', handlePointerDown);
    };
  }, [isSelectOpen]);

  useEffect(() => {
    if (isSelectOpen && listboxRef.current && highlightedIndex >= 0) {
      const activeItem = listboxRef.current.children[highlightedIndex] as HTMLElement | undefined;
      activeItem?.scrollIntoView({ block: 'nearest' });
    }
  }, [highlightedIndex, isSelectOpen]);

  const handleSelectKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    const total = t.topicOptions.length;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (!isSelectOpen) {
        const curIdx = t.topicOptions.findIndex((opt) => opt.value === formData.topic);
        setHighlightedIndex(curIdx >= 0 ? curIdx : 0);
        setIsSelectOpen(true);
      } else {
        setHighlightedIndex((prev) => (prev + 1) % total);
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (!isSelectOpen) {
        const curIdx = t.topicOptions.findIndex((opt) => opt.value === formData.topic);
        setHighlightedIndex(curIdx >= 0 ? curIdx : 0);
        setIsSelectOpen(true);
      } else {
        setHighlightedIndex((prev) => (prev - 1 + total) % total);
      }
    } else if (e.key === 'Home') {
      if (isSelectOpen) {
        e.preventDefault();
        setHighlightedIndex(0);
      }
    } else if (e.key === 'End') {
      if (isSelectOpen) {
        e.preventDefault();
        setHighlightedIndex(total - 1);
      }
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (isSelectOpen) {
        const chosen = t.topicOptions[highlightedIndex];
        if (chosen) {
          setFormData((prev) => ({ ...prev, topic: chosen.value }));
        }
        setIsSelectOpen(false);
        triggerButtonRef.current?.focus();
      } else {
        const curIdx = t.topicOptions.findIndex((opt) => opt.value === formData.topic);
        setHighlightedIndex(curIdx >= 0 ? curIdx : 0);
        setIsSelectOpen(true);
      }
    } else if (e.key === 'Escape') {
      if (isSelectOpen) {
        e.preventDefault();
        setIsSelectOpen(false);
        triggerButtonRef.current?.focus();
      }
    } else if (e.key === 'Tab') {
      if (isSelectOpen) {
        setIsSelectOpen(false);
      }
    } else if (e.key.length === 1 && !e.ctrlKey && !e.altKey && !e.metaKey) {
      const char = e.key.toLowerCase();
      const matchIdx = t.topicOptions.findIndex(
        (opt, idx) => idx > highlightedIndex && opt.label.toLowerCase().startsWith(char)
      );
      const fallbackIdx = t.topicOptions.findIndex((opt) =>
        opt.label.toLowerCase().startsWith(char)
      );
      const targetIdx = matchIdx >= 0 ? matchIdx : fallbackIdx;
      if (targetIdx >= 0) {
        setHighlightedIndex(targetIdx);
        if (!isSelectOpen) {
          setFormData((prev) => ({ ...prev, topic: t.topicOptions[targetIdx].value }));
        }
      }
    }
  };

  const handleSelectOption = (value: string) => {
    setFormData((prev) => ({ ...prev, topic: value }));
    setIsSelectOpen(false);
    triggerButtonRef.current?.focus();
  };

  const validateField = (field: string, value: string | boolean) => {
    let err = '';
    if (field === 'name') {
      if (!String(value).trim() || String(value).trim().length < 2) {
        err = t.nameError;
      }
    } else if (field === 'email') {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!String(value).trim() || !emailPattern.test(String(value).trim())) {
        err = t.emailError;
      }
    } else if (field === 'message') {
      if (!String(value).trim() || String(value).trim().length < 10) {
        err = t.messageError;
      }
    } else if (field === 'privacy') {
      if (!value) {
        err = t.privacyError;
      }
    }
    return err;
  };

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const err = validateField(field, formData[field as keyof typeof formData]);
    setErrors((prev) => ({ ...prev, [field]: err }));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    const val = type === 'checkbox' ? checked : value;

    setFormData((prev) => ({ ...prev, [name]: val }));

    if (touched[name]) {
      const err = validateField(name, val);
      setErrors((prev) => ({ ...prev, [name]: err }));
    }
  };

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    const nameErr = validateField('name', formData.name);
    const emailErr = validateField('email', formData.email);
    const messageErr = validateField('message', formData.message);
    const privacyErr = validateField('privacy', formData.privacy);

    const newErrors: Record<string, string> = {};
    if (nameErr) newErrors.name = nameErr;
    if (emailErr) newErrors.email = emailErr;
    if (messageErr) newErrors.message = messageErr;
    if (privacyErr) newErrors.privacy = privacyErr;

    setTouched({ name: true, email: true, message: true, privacy: true });
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      const firstInvalidId = `${idPrefix}-${Object.keys(newErrors)[0]}`;
      const el = document.getElementById(firstInvalidId);
      el?.focus();
      return;
    }

    setStatus('submitting');
    setServerError('');

    try {
      const formEl = e.currentTarget;
      const data = new FormData(formEl);
      data.append('access_key', '5c26b8ea-7d61-4eb3-b0c2-efd11ddfa1d3');
      data.append('from_name', 'Georgia König – Website Kontakt');
      data.append('replyto', formData.email);
      data.append(
        'subject',
        `Neue Anfrage von ${formData.name} (${currentOption?.label || formData.topic})`
      );

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: data,
      });

      const result = await response.json();

      if (result.success) {
        setStatus('success');
        setTimeout(() => {
          successRef.current?.focus();
        }, 50);
      } else {
        setStatus('error');
        setServerError(result.message || t.errorText);
        setTimeout(() => {
          errorRef.current?.focus();
        }, 50);
      }
    } catch {
      setStatus('error');
      setServerError(t.errorText);
      setTimeout(() => {
        errorRef.current?.focus();
      }, 50);
    }
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      topic: 'erstgespraech',
      message: '',
      privacy: false,
    });
    setTouched({});
    setErrors({});
    setStatus('idle');
    setServerError('');
    setIsSelectOpen(false);
    setTimeout(() => {
      document.getElementById(`${idPrefix}-name`)?.focus();
    }, 50);
  };

  return (
    <div className={`contact-form-container ${className}`}>
      {/* Live Region for Screen Readers */}
      <div role="status" aria-live="polite" className="sr-only">
        {status === 'submitting' && t.submitSending}
        {status === 'success' && t.successTitle + ' ' + t.successText}
        {status === 'error' && t.errorTitle + ' ' + (serverError || t.errorText)}
      </div>

      {status === 'success' ? (
        <div
          ref={successRef}
          tabIndex={-1}
          className="form-success-card"
          aria-labelledby={`${idPrefix}-success-title`}
        >
          <div className="form-success-icon" aria-hidden="true">
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <h3 id={`${idPrefix}-success-title`}>{t.successTitle}</h3>
          <p>{t.successText}</p>
          <button
            type="button"
            onClick={handleReset}
            className="button button-mint"
          >
            {t.sendAnother}
          </button>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          noValidate
          className="contact-form"
          aria-labelledby={`${idPrefix}-legend`}
        >
          <h3 id={`${idPrefix}-legend`} className="sr-only">
            {t.legend}
          </h3>

          {status === 'error' && (
            <div
              ref={errorRef}
              tabIndex={-1}
              role="alert"
              className="form-error-alert"
            >
              <strong>{t.errorTitle}</strong>
              <p>{serverError || t.errorText}</p>
              <div style={{ marginTop: '12px', display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
                <a href={`mailto:${t.directEmail}`} style={{ textDecoration: 'underline' }}>
                  {t.directEmail}
                </a>
                <a href={`tel:${t.directPhone.replace(/\s/g, '')}`} style={{ textDecoration: 'underline' }}>
                  {t.directPhone}
                </a>
              </div>
            </div>
          )}

          {/* Web3Forms Honeypot for spam bot trap without user friction */}
          <input
            type="checkbox"
            name="botcheck"
            style={{ display: 'none' }}
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
          />

          <div className="form-row">
            {/* Name Field */}
            <div className="form-group">
              <label htmlFor={`${idPrefix}-name`} className="form-label">
                <span>
                  {renderReadingAid(t.nameLabel)}
                  <span className="required-star" aria-hidden="true">
                    *
                  </span>
                  <span className="sr-only"> ({isEn ? 'required' : 'Pflichtfeld'})</span>
                </span>
              </label>
              <input
                type="text"
                id={`${idPrefix}-name`}
                name="name"
                value={formData.name}
                onChange={handleChange}
                onBlur={() => handleBlur('name')}
                placeholder={t.namePlaceholder}
                autoComplete="name"
                required
                aria-required="true"
                aria-invalid={touched.name && !!errors.name ? 'true' : undefined}
                aria-describedby={
                  touched.name && errors.name ? `${idPrefix}-name-err` : undefined
                }
                className="form-input"
              />
              {touched.name && errors.name && (
                <div id={`${idPrefix}-name-err`} className="form-error" role="alert">
                  <span aria-hidden="true">⚠</span>
                  <span>{errors.name}</span>
                </div>
              )}
            </div>

            {/* Email Field */}
            <div className="form-group">
              <label htmlFor={`${idPrefix}-email`} className="form-label">
                <span>
                  {renderReadingAid(t.emailLabel)}
                  <span className="required-star" aria-hidden="true">
                    *
                  </span>
                  <span className="sr-only"> ({isEn ? 'required' : 'Pflichtfeld'})</span>
                </span>
              </label>
              <input
                type="email"
                id={`${idPrefix}-email`}
                name="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={() => handleBlur('email')}
                placeholder={t.emailPlaceholder}
                autoComplete="email"
                autoCapitalize="off"
                autoCorrect="off"
                spellCheck={false}
                required
                aria-required="true"
                aria-invalid={touched.email && !!errors.email ? 'true' : undefined}
                aria-describedby={
                  touched.email && errors.email ? `${idPrefix}-email-err` : undefined
                }
                className="form-input"
              />
              {touched.email && errors.email && (
                <div id={`${idPrefix}-email-err`} className="form-error" role="alert">
                  <span aria-hidden="true">⚠</span>
                  <span>{errors.email}</span>
                </div>
              )}
            </div>
          </div>

          {/* Phone Field (Optional) */}
          <div className="form-group">
            <label htmlFor={`${idPrefix}-phone`} className="form-label">
              <span>{renderReadingAid(t.phoneLabel)}</span>
              <span className="optional-hint">{t.phoneOptional}</span>
            </label>
            <input
              type="tel"
              id={`${idPrefix}-phone`}
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder={t.phonePlaceholder}
              autoComplete="tel"
              className="form-input"
            />
          </div>

          {/* Topic Select (Modern Accessible Custom Select) */}
          <div className="form-group">
              <label
                id={`${idPrefix}-topic-label`}
                htmlFor={`${idPrefix}-topic-button`}
                className="form-label"
              >
                <span>{renderReadingAid(t.topicLabel)}</span>
              </label>

              {/* Hidden field for form data submission */}
              <input type="hidden" name="topic" value={formData.topic} />

              <div className="modern-select-container" ref={selectContainerRef}>
                <button
                  type="button"
                  ref={triggerButtonRef}
                  id={`${idPrefix}-topic-button`}
                  aria-haspopup="listbox"
                  aria-expanded={isSelectOpen}
                  aria-controls={`${idPrefix}-topic-listbox`}
                  aria-labelledby={`${idPrefix}-topic-label ${idPrefix}-topic-button`}
                  onClick={() => {
                    if (isSelectOpen) {
                      setIsSelectOpen(false);
                    } else {
                      const curIdx = t.topicOptions.findIndex(
                        (opt) => opt.value === formData.topic
                      );
                      setHighlightedIndex(curIdx >= 0 ? curIdx : 0);
                      setIsSelectOpen(true);
                    }
                  }}
                  onKeyDown={handleSelectKeyDown}
                  className={`modern-select-trigger ${isSelectOpen ? 'is-open' : ''}`}
                >
                  <span className="modern-select-trigger-content">
                    {currentOption?.badge && (
                      <span className="modern-select-badge" aria-hidden="true">
                        {currentOption.badge}
                      </span>
                    )}
                    <span className="modern-select-trigger-text">
                      {renderReadingAid(currentOption?.label || '')}
                    </span>
                  </span>
                  <span className="modern-select-arrow" aria-hidden="true">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </span>
                </button>

                {isSelectOpen && (
                  <ul
                    id={`${idPrefix}-topic-listbox`}
                    ref={listboxRef}
                    role="listbox"
                    aria-labelledby={`${idPrefix}-topic-label`}
                    tabIndex={-1}
                    aria-activedescendant={
                      highlightedIndex >= 0
                        ? `${idPrefix}-topic-opt-${t.topicOptions[highlightedIndex]?.value}`
                        : undefined
                    }
                    className="modern-select-menu"
                  >
                    {t.topicOptions.map((opt, idx) => {
                      const isSelected = formData.topic === opt.value;
                      const isHighlighted = highlightedIndex === idx;
                      return (
                        <li
                          key={opt.value}
                          id={`${idPrefix}-topic-opt-${opt.value}`}
                          role="option"
                          aria-selected={isSelected}
                          onClick={() => handleSelectOption(opt.value)}
                          onMouseEnter={() => setHighlightedIndex(idx)}
                          className={`modern-select-option ${
                            isSelected ? 'is-selected' : ''
                          } ${isHighlighted ? 'is-highlighted' : ''}`}
                        >
                          <div className="modern-select-option-main">
                            <div className="modern-select-option-head">
                              {opt.badge && (
                                <span className="modern-select-badge" aria-hidden="true">
                                  {opt.badge}
                                </span>
                              )}
                              <span className="modern-select-option-title">
                                {renderReadingAid(opt.label)}
                              </span>
                            </div>
                            {opt.desc && (
                              <span className="modern-select-option-desc">
                                {renderReadingAid(opt.desc)}
                              </span>
                            )}
                          </div>
                          {isSelected && (
                            <span className="modern-select-check" aria-hidden="true">
                              <svg
                                width="18"
                                height="18"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <polyline points="20 6 9 17 4 12" />
                              </svg>
                            </span>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            </div>

          {/* Message Field */}
          <div className="form-group">
            <label htmlFor={`${idPrefix}-message`} className="form-label">
              <span>
                {renderReadingAid(t.messageLabel)}
                <span className="required-star" aria-hidden="true">
                  *
                </span>
                <span className="sr-only"> ({isEn ? 'required' : 'Pflichtfeld'})</span>
              </span>
            </label>
            <textarea
              id={`${idPrefix}-message`}
              name="message"
              rows={4}
              value={formData.message}
              onChange={handleChange}
              onBlur={() => handleBlur('message')}
              placeholder={t.messagePlaceholder}
              required
              aria-required="true"
              aria-invalid={touched.message && !!errors.message ? 'true' : undefined}
              aria-describedby={
                touched.message && errors.message ? `${idPrefix}-message-err` : undefined
              }
              className="form-textarea"
            />
            {touched.message && errors.message && (
              <div id={`${idPrefix}-message-err`} className="form-error" role="alert">
                <span aria-hidden="true">⚠</span>
                <span>{errors.message}</span>
              </div>
            )}
          </div>

          {/* Privacy Consent Checkbox */}
          <div className="form-group">
            <div className="checkbox-group">
              <input
                type="checkbox"
                id={`${idPrefix}-privacy`}
                name="privacy"
                checked={formData.privacy}
                onChange={handleChange}
                onBlur={() => handleBlur('privacy')}
                required
                aria-required="true"
                aria-invalid={touched.privacy && !!errors.privacy ? 'true' : undefined}
                aria-describedby={
                  touched.privacy && errors.privacy ? `${idPrefix}-privacy-err` : undefined
                }
                className="checkbox-input"
              />
              <label htmlFor={`${idPrefix}-privacy`} className="checkbox-label">
                <span>
                  {renderReadingAid(t.privacyTextPre)}
                  <a href={privacyHref} target="_blank" rel="noopener noreferrer">
                    {renderReadingAid(t.privacyLinkText)}
                  </a>
                  {renderReadingAid(t.privacyTextPost)}
                  <span className="required-star" aria-hidden="true">
                    *
                  </span>
                  <span className="sr-only"> ({isEn ? 'required' : 'Pflichtfeld'})</span>
                </span>
              </label>
            </div>
            {touched.privacy && errors.privacy && (
              <div id={`${idPrefix}-privacy-err`} className="form-error" role="alert">
                <span aria-hidden="true">⚠</span>
                <span>{errors.privacy}</span>
              </div>
            )}
          </div>

          {/* Submit Row */}
          <div className="form-submit-row">
            <button
              type="submit"
              disabled={status === 'submitting'}
              aria-busy={status === 'submitting' ? 'true' : undefined}
              className="button button-mint form-submit-btn"
            >
              {status === 'submitting' ? (
                <>
                  <svg
                    className="animate-spin"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    aria-hidden="true"
                    style={{ animation: 'spin 1s linear infinite' }}
                  >
                    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                  </svg>
                  <span>{t.submitSending}</span>
                </>
              ) : (
                <>
                  <span>{renderReadingAid(t.submitIdle)}</span>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    aria-hidden="true"
                  >
                    <path d="M6 18 18 6M6 6h12v12" />
                  </svg>
                </>
              )}
            </button>
            <p className="contact-note" style={{ margin: 0, textAlign: 'center' }}>
              {t.requiredNote}
            </p>
          </div>
        </form>
      )}
    </div>
  );
}
