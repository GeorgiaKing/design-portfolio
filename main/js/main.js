(function ($) {
    "use strict";

    // Loader
    var loader = function () {
        setTimeout(function () {
            if ($('#loader').length > 0) {
                $('#loader').removeClass('show');
            }
        }, 1);
    };
    loader();

    // Initiate WOW.js
    new WOW().init();

    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 200) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });

    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 0) {
            $('.navbar').addClass('nav-sticky');
        } else {
            $('.navbar').removeClass('nav-sticky');
        }
    });

    // Smooth scrolling
    $(".navbar-nav a").on('click', function (event) {
        if (this.hash !== "") {
            event.preventDefault();
            $('html, body').animate({
                scrollTop: $(this.hash).offset().top - 45
            }, 1500, 'easeInOutExpo');

            if ($(this).parents('.navbar-nav').length) {
                $('.navbar-nav .active').removeClass('active');
                $(this).closest('a').addClass('active');
            }
        }
    });

    // Typed.js
    if ($('.hero .hero-text h2').length === 1) {
        var typed = new Typed('.hero .hero-text h2', {
            strings: $('.hero .hero-text .typed-text').text().split(', '),
            typeSpeed: 100,
            backSpeed: 20,
            smartBackspace: false,
            loop: true
        });
    }

    // Skills
    $('.skills').waypoint(function () {
        $('.progress .progress-bar').each(function () {
            $(this).css("width", $(this).attr("aria-valuenow") + '%');
        });
    }, {offset: '80%'});

    // Testimonials & Portfolio carousel (wie gehabt)
    $(".testimonials-carousel").owlCarousel({
        center: true, autoplay: true, dots: true, loop: true,
        responsive: {0: {items: 1}}
    });

    // Portfolio-Isotope NUR auf der Startseite im #portfolio-Bereich
    var $portfolioContainer = $('#portfolio .portfolio-container');
    if ($portfolioContainer.length) {
        var portfolioIsotope = $portfolioContainer.isotope({
            itemSelector: '.portfolio-item',
            layoutMode: 'fitRows'
        });

        $('#portfolio-filter li').on('click', function () {
            $("#portfolio-filter li").removeClass('filter-active');
            $(this).addClass('filter-active');
            portfolioIsotope.isotope({ filter: $(this).data('filter') });
        });
    }


})(jQuery);

// =============================================================
// DROP CAPS
// =============================================================
function applyDropcaps() {
    document.querySelectorAll('.dropcap-text').forEach(el => {
        if (!el.classList.contains('dropcaps-applied') && el.textContent.trim()) {
            const words = el.textContent.trim().split(/\s+/);
            const newHTML = words.map(word => {
                if (word.length > 0) {
                    return `<span class="bold-first-letter">${word[0]}</span>${word.slice(1)}`;
                }
                return word;
            }).join(' ');
            el.innerHTML = newHTML;
            el.classList.add('dropcaps-applied');
        }
    });
}
document.addEventListener('DOMContentLoaded', applyDropcaps);
setTimeout(applyDropcaps, 5000);
const dropcapObserver = new MutationObserver(applyDropcaps);
dropcapObserver.observe(document.body, { childList: true, subtree: true });

// =============================================================
// DARK / LIGHT MODE
// =============================================================
function toggleMode() {
    const body = document.body;
    const newTheme = body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    const icon = document.querySelector('.mode-toggle i');
    if (icon) {
        icon.classList.toggle('fa-sun', newTheme === 'light');
        icon.classList.toggle('fa-moon', newTheme === 'dark');
    }
}
document.addEventListener('DOMContentLoaded', () => {
    const saved = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    document.body.setAttribute('data-theme', saved);
    const icon = document.querySelector('.mode-toggle i');
    if (icon) icon.classList.add(saved === 'dark' ? 'fa-moon' : 'fa-sun');
});

// =============================================================
// SPRACHWECHSEL – NUR data-i18n (kein lang="de/en" mehr!)
// =============================================================
// Lokalisierungsdaten
const translations = {
    de: {
        "nav-home": "Start",
        "nav-about": "Über mich",
        "nav-service": "Dienstleistungen",
        "nav-experience": "Werdegang",
        "nav-portfolio": "Portfolio",
        "nav-review": "Referenzen",
        "nav-blog": "Blog",
        "nav-contact": "Kontakt",
        "nav-insights": "Insights",
        "hero-subtitle": "Hallo, ich bin",
        "hero-title": "Georgia König",
        "hero-typed": "UX Designerin, Digitale Teilhabeberatung, Accessibility Consultant, IT Master",
        "hero-meta": "Stuttgart | 12+ Jahre Erfahrung in barrierefreiem Design",
        "btn-portfolio": "Portfolio entdecken",
        "btn-contact": "Kontakt",
        "about-header": "Was ich mitbringe",
        "about-title": "12 Jahre in der Informatik",
        "about-text1": "Die Informatik hat mich schon als Kind fasziniert. Sieben Jahre Studium und vier Jahre Arbeitserfahrung später will ich mich - als Selbständige - nun spannenden und barrierearmen Projekten widmen.",
        "about-text2": "Ist deins vielleicht eines davon? Melde dich und wir finden es heraus!",
        "about-btn": "Lass uns reden",
        "service-header": "Was ich mache",
        "service-title": "Meine Dienstleistungen",
        "service-ux": "User Experience Design",
        "service-ux-desc": "Bist du bereit, digitale Erlebnisse zu schaffen, die einfach überzeugen?",
        "service-ux-impact": "+40% Usability-Boost",
        "service-web": "Webseitenbau",
        "service-web-desc": "Bist du bereit, deine Ideen endlich ins Netz zu bringen?",
        "service-web-impact": "Responsive & SEO-optimiert",
        "service-access": "Digitale Barrierefreiheit",
        "service-access-desc": "Bist du bereit, deine digitalen Inhalte für alle Nutzer:innen zu öffnen?",
        "service-access-impact": "WCAG-AA konform",
        "service-strategy": "Digitale Strategie",
        "service-strategy-desc": "Bist du bereit, zu erfahren, was deine Nutzer:innen wirklich denken und brauchen?",
        "service-strategy-impact": "User Research integriert",
        "banner-header": "Kostenlose Analyse deiner Webseite",
        "banner-title": "Digitale Barrierefreiheit beginnt mit einem Gespräch",
        "banner-text": "Du möchtest erfahren, wie zugänglich deine Webseite wirklich ist? In einem kostenlosen Erstgespräch analysiere ich eine Seite deiner Wahl und zeige dir zentrale Barrieren auf. Du erhältst konkrete Hinweise zur Optimierung – damit deine Inhalte für alle Menschen erreichbar werden. Weniger Barrieren bedeutet mehr Gewinn für alle.",
        "banner-btn": "Jetzt Gespräch vereinbaren",
        "experience-header": "Mein Weg",
        "experience-title": "Werdegang – Von Studium zur Expertin",
        "exp-tab-pro": "Beruflich",
        "exp-tab-edu": "Schulisch",
        "portfolio-header": "Was ich kann",
        "portfolio-title": "Mein Portfolio",
        "portfolio-cv": "Mein Lebenslauf",
        "portfolio-cv-desc": "Überblick über meinen beruflichen Weg, Qualifikationen und Erfolge – perfekt für erste Eindrücke.",
        "portfolio-cv-btn": "Download PDF",
        "portfolio-qual": "Qualifikationsprofil",
        "portfolio-qual-desc": "Detaillierte Übersicht meiner Skills in UX, Accessibility und Digitalstrategie – mit Beispielen und Impact.",
        "portfolio-qual-btn": "Download PDF",
        "review-header": "Was Klient:innen sagen",
        "review-title": "Referenzen",
        "insights-header": "Wissen teilen",
        "insights-title": "Insights & Inspiration",
        "insights-barrier": "Barrierefreiheit in der Praxis",
        "insights-barrier-desc": "Lerne, wie du Websites für alle zugänglich machst – Schritt-für-Schritt-Anleitung.",
        "insights-barrier-btn": "Lesen",
        "insights-trends": "Trends im UX-Design 2025",
        "insights-trends-desc": "Die neuesten Entwicklungen, die dein Design auf das nächste Level bringen.",
        "insights-trends-btn": "Lesen",
        "insights-tools": "Accessibility-Tools",
        "insights-tools-desc": "Die besten Tools, um deine Projekte barrierefrei zu gestalten.",
        "insights-tools-btn": "Lesen",
        "contact-header": "Lass uns verbinden",
        "contact-title": "Kontakt",
        "contact-form-name": "Dein Name",
        "contact-form-email": "Deine E-Mail",
        "contact-form-subject": "Betreff",
        "contact-form-message": "Deine Nachricht",
        "contact-form-btn": "Nachricht senden",
        "footer-about": "Über mich",
        "footer-contact": "Kontakt",
        "footer-links": "Schnelllinks",
        "footer-social": "Social Media",
        "footer-legal-1": "Impressum",
        "footer-legal-2": "Datenschutz",
        "footer-copyright": "© 2025 Georgia König. Alle Rechte vorbehalten.",
        "impressum-title": "Impressum",
        "impressum-angaben": "Angaben gemäß § 5 TMG",
        "impressum-contact": "Kontakt",
        "impressum-address": "Georgia König<br>Neue Straße 5<br>74523 Schwäbisch Hall",
        "impressum-email": "E-Mail: <a href=\"mailto:kontakt@georgia-koenig.de\">kontakt@georgia-koenig.de</a>",
        "impressum-disclaimer": "Haftungsausschluss (Disclaimer)",
        "impressum-liability-content": "Haftung für Inhalte",
        "impressum-liability-content-text": "Die Inhalte meiner Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte kann ich jedoch keine Gewähr übernehmen. Gemäß § 7 Abs. 1 TMG bin ich als Diensteanbieter für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG bin ich jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen. Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werde ich diese Inhalte umgehend entfernen.",
        "impressum-liability-links": "Haftung für Links",
        "impressum-liability-links-text": "Mein Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte ich keinen Einfluss habe. Deshalb kann ich für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar. Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werde ich derartige Links umgehend entfernen.",
        "impressum-dispute": "Streitschlichtung",
        "impressum-dispute-text": "Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: <a href=\"https://ec.europa.eu/consumers/odr\" target=\"_blank\" rel=\"noopener\">https://ec.europa.eu/consumers/odr</a>.<br>Meine E-Mail-Adresse finden Sie oben im Kontaktbereich.<br>Ich bin weder bereit noch verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.",
        "privacy-title": "Datenschutzerklärung",
        "privacy-intro": "Einleitung",
        "privacy-intro-text": "Vielen Dank für Ihr Interesse an meiner Website. Der Schutz Ihrer personenbezogenen Daten ist mir ein besonderes Anliegen. Ich verarbeite Ihre Daten ausschließlich auf Grundlage der gesetzlichen Bestimmungen (DSGVO, BDSG). In diesen Datenschutzinformationen informiere ich Sie über die wichtigsten Aspekte der Datenverarbeitung im Rahmen meiner Website.",
        "privacy-responsible": "Verantwortlicher",
        "privacy-responsible-text": "Georgia König<br>Neue Straße 5<br>74523 Schwäbisch Hall<br>E-Mail: <a href=\"mailto:kontakt@georgia-koenig.de\">kontakt@georgia-koenig.de</a>",
        "privacy-data-collection": "Erfassung von Daten",
        "privacy-data-collection-text": "Beim Besuch dieser Website werden keine personenbezogenen Daten automatisch erhoben. Es werden keine Cookies, keine Tracking-Tools und keine Analysetools eingesetzt.",
        "privacy-contact-form": "Kontaktformular",
        "privacy-contact-form-text": "Wenn Sie mir über das Kontaktformular eine Anfrage zukommen lassen, werden Ihre Angaben aus dem Formular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei mir gespeichert. Diese Daten gebe ich nicht ohne Ihre Einwilligung weiter.",
        "privacy-rights": "Ihre Rechte",
        "privacy-rights-text": "Sie haben jederzeit das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit sowie Widerruf und Widerspruch. Wenn Sie glauben, dass die Verarbeitung Ihrer Daten gegen das Datenschutzrecht verstößt, haben Sie das Recht, sich bei der zuständigen Aufsichtsbehörde zu beschweren.",            
    "blog-page-title": "Blog – Georgia König",
        "blog-hero-title": "Mein Blog",
        "blog-hero-subtitle": "Aktuelle Insights zu Barrierefreiheit, UX-Design und digitaler Teilhabe",
        "blog-latest": "Neueste Beiträge",
        "blog-read-more": "Lesen",

        "blog-1-title": "Barrierefreiheit in der Praxis: So machst du deine Website inklusiv",
        "blog-1-excerpt": "Von Kontrast bis Tastaturbedienung – die wichtigsten WCAG-Regeln verständlich erklärt...",

        "blog-2-title": "UX-Design Trends 2025: Was kommt als Nächstes?",
        "blog-2-excerpt": "Voice UI, AI-gestützte Personalisierung und emotionale Interfaces...",

        "blog-3-title": "Die 7 größten Accessibility-Fehler – und wie du sie vermeidest",
        "blog-3-excerpt": "Diese Fallen sehen 90 % der Websites – aber du nicht mehr...",
            "blog-1-title": "Barrierefreiheit in der Praxis: So machst du deine Website inklusiv",
    "blog-date-1": "15. März 2025",
    "blog-author": "von Georgia König",
    "blog-1-content": `
        <p>Barrierefreiheit ist kein Nice-to-have – sie ist ein Muss. In diesem Artikel zeige ich dir Schritt für Schritt, wie du deine Website inklusiver gestalten kannst.</p>
        <h2>Warum Barrierefreiheit?</h2>
        <p>Menschen mit Einschränkungen müssen digitale Angebote genauso nutzen können wie alle anderen. Barrierefreiheit ist außerdem in vielen Fällen rechtlich vorgeschrieben – und sie verbessert die Usability für <i>alle</i> Nutzer:innen.</p>
        <h2>Typische Barrieren auf Websites</h2>
        <p>Zu geringe Kontraste, fehlende Alternativtexte, nicht erreichbare Inhalte per Tastatur, unklare Fokuszustände – die Liste ist lang. Die gute Nachricht: Mit ein paar gezielten Anpassungen lassen sich viele Probleme schnell beheben.</p>
        <h2>Wie du starten kannst</h2>
        <ul>
            <li>Prüfe Kontraste nach WCAG.</li>
            <li>Füge sinnvolle Alternativtexte zu Bildern hinzu.</li>
            <li>Stelle sicher, dass alle interaktiven Elemente per Tastatur erreichbar sind.</li>
            <li>Nutze klare Überschriften-Strukturen (h1–h3).</li>
        </ul>
        <p>Wenn du magst, unterstütze ich dich gerne bei einer ersten Analyse deiner Website.</p>
    `,
    "blog-back": "← Zurück zum Blog",
    },
    en: {
        "nav-home": "Home",
        "nav-about": "About Me",
        "nav-service": "Services",
        "nav-experience": "Experience",
        "nav-portfolio": "Portfolio",
        "nav-review": "Testimonials",
        "nav-blog": "Blog",
        "nav-contact": "Contact",
        "nav-insights": "Insights",
        "hero-subtitle": "Hello, I am",
        "hero-title": "Georgia König",
        "hero-typed": "UX Designer, Digital Inclusion Consultant, Accessibility Expert, IT Master",
        "hero-meta": "Stuttgart | 12+ Years of Experience in Accessible Design",
        "btn-portfolio": "Discover Portfolio",
        "btn-contact": "Contact",
        "about-header": "What I Bring",
        "about-title": "12 Years in IT",
        "about-text1": "I’ve been fascinated by IT since childhood. After seven years of study and four years of professional experience, I now want to dedicate myself—as a freelancer—to exciting and accessible projects.",
        "about-text2": "Could yours be one of them? Get in touch, and let’s find out!",
        "about-btn": "Let’s Talk",
        "service-header": "What I Do",
        "service-title": "My Services",
        "service-ux": "User Experience Design",
        "service-ux-desc": "Ready to create digital experiences that simply convince?",
        "service-ux-impact": "+40% Usability Boost",
        "service-web": "Web Development",
        "service-web-desc": "Ready to finally bring your ideas online?",
        "service-web-impact": "Responsive & SEO-Optimized",
        "service-access": "Digital Accessibility",
        "service-access-desc": "Ready to open your digital content to all users?",
        "service-access-impact": "WCAG-AA Compliant",
        "service-strategy": "Digital Strategy",
        "service-strategy-desc": "Ready to understand what your users really think and need?",
        "service-strategy-impact": "User Research Integrated",
        "banner-header": "Free Website Analysis",
        "banner-title": "Digital Accessibility Starts with a Conversation",
        "banner-text": "Want to know how accessible your website really is? In a free initial consultation, I’ll analyze a page of your choice and highlight key barriers. You’ll receive concrete optimization tips—making your content accessible to everyone. Fewer barriers mean more benefits for all.",
        "banner-btn": "Book a Consultation Now",
        "experience-header": "My Journey",
        "experience-title": "Experience – From Studies to Expert",
        "exp-tab-pro": "Professional",
        "exp-tab-edu": "Education",
        "portfolio-header": "What I Can Do",
        "portfolio-title": "My Portfolio",
        "portfolio-cv": "My Resume",
        "portfolio-cv-desc": "Overview of my professional journey, qualifications, and successes—perfect for first impressions.",
        "portfolio-cv-btn": "Download PDF",
        "portfolio-qual": "Qualification Profile",
        "portfolio-qual-desc": "Detailed overview of my skills in UX, Accessibility, and Digital Strategy—with examples and impact.",
        "portfolio-qual-btn": "Download PDF",
        "review-header": "What Clients Say",
        "review-title": "Testimonials",
        "insights-header": "Sharing Knowledge",
        "insights-title": "Insights & Inspiration",
        "insights-barrier": "Accessibility in Practice",
        "insights-barrier-desc": "Learn how to make websites accessible to all—step-by-step guide.",
        "insights-barrier-btn": "Read",
        "insights-trends": "UX Design Trends 2025",
        "insights-trends-desc": "The latest developments to take your design to the next level.",
        "insights-trends-btn": "Read",
        "insights-tools": "Accessibility Tools",
        "insights-tools-desc": "The best tools to make your projects accessible.",
        "insights-tools-btn": "Read",
        "contact-header": "Let’s Connect",
        "contact-title": "Contact",
        "contact-form-name": "Your Name",
        "contact-form-email": "Your Email",
        "contact-form-subject": "Subject",
        "contact-form-message": "Your Message",
        "contact-form-btn": "Send Message",
        "footer-about": "About Me",
        "footer-contact": "Contact",
        "footer-links": "Quick Links",
        "footer-social": "Social Media",
        "footer-legal-1": "Imprint",
        "footer-legal-2": "Privacy",
        "footer-copyright": "© 2025 Georgia König. All Rights Reserved.",
        "impressum-title": "Imprint",
        "impressum-angaben": "Information pursuant to § 5 TMG",
        "impressum-contact": "Contact",
        "impressum-address": "Georgia König<br>Neue Straße 5<br>74523 Schwäbisch Hall",
        "impressum-email": "Email: <a href=\"mailto:kontakt@georgia-koenig.de\">kontakt@georgia-koenig.de</a>",
        "impressum-disclaimer": "Disclaimer",
        "impressum-liability-content": "Liability for Content",
        "impressum-liability-content-text": "The contents of my pages have been created with the utmost care. However, I cannot guarantee the accuracy, completeness, and timeliness of the content. As a service provider, I am responsible for my own content on these pages in accordance with § 7 para. 1 TMG and general laws. According to §§ 8 to 10 TMG, however, I am not obliged to monitor transmitted or stored third-party information or to investigate circumstances indicating illegal activity. Obligations to remove or block the use of information under general laws remain unaffected. Liability in this respect is only possible from the time of knowledge of a concrete infringement. Upon becoming aware of such infringements, I will remove the content immediately.",
        "impressum-liability-links": "Liability for Links",
        "impressum-liability-links-text": "My offer contains links to external websites of third parties, on whose contents I have no influence. Therefore, I cannot assume any liability for these external contents. The respective provider or operator of the pages is always responsible for the contents of the linked pages. The linked pages were checked for possible legal violations at the time of linking. Illegal contents were not recognizable at the time of linking. However, a permanent control of the contents of the linked pages is not reasonable without concrete evidence of a violation of the law. As soon as I become aware of any legal infringements, I will remove such links immediately.",
        "impressum-dispute": "Dispute Resolution",
        "impressum-dispute-text": "The European Commission provides a platform for online dispute resolution (OS): <a href=\"https://ec.europa.eu/consumers/odr\" target=\"_blank\" rel=\"noopener\">https://ec.europa.eu/consumers/odr</a>.<br>You can find my e-mail address above in the contact section.<br>I am neither willing nor obliged to participate in dispute resolution proceedings before a consumer arbitration board.",
        "privacy-title": "Privacy Policy",
        "privacy-intro": "Introduction",
        "privacy-intro-text": "Thank you for your interest in my website. The protection of your personal data is particularly important to me. I process your data exclusively on the basis of the statutory provisions (GDPR, BDSG). In this privacy policy I inform you about the most important aspects of data processing within the framework of my website.",
        "privacy-responsible": "Controller",
        "privacy-responsible-text": "Georgia König<br>Neue Straße 5<br>74523 Schwäbisch Hall<br>Email: <a href=\"mailto:kontakt@georgia-koenig.de\">kontakt@georgia-koenig.de</a>",
        "privacy-data-collection": "Data Collection",
        "privacy-data-collection-text": "When visiting this website, no personal data is collected automatically. No cookies, tracking tools or analytics tools are used.",
        "privacy-contact-form": "Contact Form",
        "privacy-contact-form-text": "If you send me an inquiry via the contact form, your details from the form, including the contact details you provided there, will be stored by me for the purpose of processing the inquiry and in the event of follow-up questions. This data will not be passed on without your consent.",
        "privacy-rights": "Your Rights",
        "privacy-rights-text": "You have the right at any time to access, rectification, deletion, restriction of processing, data portability, revocation and objection. If you believe that the processing of your data violates data protection law, you have the right to lodge a complaint with the competent supervisory authority.",
        "blog-page-title": "Blog – Georgia König",
        "blog-hero-title": "My Blog",
        "blog-hero-subtitle": "Latest insights on accessibility, UX design and digital inclusion",
        "blog-latest": "Latest posts",
        "blog-read-more": "Read",

        "blog-1-title": "Accessibility in practice: How to make your website inclusive",
        "blog-1-excerpt": "From contrast to keyboard navigation – the most important WCAG rules explained in simple terms...",

        "blog-2-title": "UX design trends 2025: What’s next?",
        "blog-2-excerpt": "Voice UI, AI-powered personalization and emotional interfaces...",

        "blog-3-title": "The 7 biggest accessibility mistakes – and how to avoid them",
        "blog-3-excerpt": "These pitfalls affect 90% of websites – but no longer yours...",
            "blog-1-title": "Accessibility in practice: How to make your website inclusive",
    "blog-date-1": "15 March 2025",
    "blog-author": "by Georgia König",
    "blog-1-content": `
        <p>Accessibility is not a nice-to-have – it is a must. In this article, I’ll walk you through how to make your website more inclusive step by step.</p>
        <h2>Why accessibility?</h2>
        <p>People with disabilities must be able to use digital products just like everyone else. In many cases, accessibility is also a legal requirement – and it improves usability for <i>all</i> users.</p>
        <h2>Typical barriers on websites</h2>
        <p>Low contrast, missing alternative texts, content that is not keyboard accessible, unclear focus states – the list is long. The good news: with a few targeted changes, many issues can be fixed quickly.</p>
        <h2>How to get started</h2>
        <ul>
            <li>Check color contrast against WCAG.</li>
            <li>Add meaningful alternative text to images.</li>
            <li>Ensure all interactive elements are keyboard accessible.</li>
            <li>Use a clear heading structure (h1–h3).</li>
        </ul>
        <p>If you like, I’m happy to support you with an initial accessibility review of your website.</p>
    `,
    "blog-back": "← Back to blog",
    }
};

// =============================================================
// SPRACHWECHSEL – FUNKTIONIERT JETZT ÜBERALL (auch blog.html!)
// =============================================================



let currentLang = localStorage.getItem('lang') || 'de';

// DIE EINE FUNKTION, DIE ALLES MACHT
function switchLang(lang) {
    currentLang = lang;
    localStorage.setItem('lang', lang);

    // 1. Aktiven Button markieren
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.textContent.trim().toUpperCase() === lang.toUpperCase());
    });

    // 2. Alle Texte übersetzen
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[currentLang][key] !== undefined) {
            el.textContent = translations[currentLang][key];
        }
    });

        // 2b. HTML-Inhalte übersetzen (z.B. Impressum, Blog-Artikel)
    document.querySelectorAll('[data-i18n-html]').forEach(el => {
        const key = el.getAttribute('data-i18n-html');
        if (translations[currentLang][key] !== undefined) {
            el.innerHTML = translations[currentLang][key];
            el.classList.remove('dropcaps-applied');
        }
    });

    // 3. Titel der Seite übersetzen (wichtig für blog.html!)
    const titleEl = document.querySelector('title[data-i18n]');
    if (titleEl) {
        const key = titleEl.getAttribute('data-i18n');
        if (translations[currentLang][key]) {
            document.title = translations[currentLang][key];
        }
    }

    // 4. Dropcaps neu anwenden
    applyDropcaps();
}

// BEIM LADEN: richtige Sprache setzen
document.addEventListener('DOMContentLoaded', () => {
    switchLang(currentLang);
});

// KLICK AUF SPRACHBUTTON → WECHSELN
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('lang-btn')) {
        const lang = e.target.textContent.trim().toLowerCase();
        if (lang === 'de' || lang === 'en') {
            switchLang(lang);
        }
    }
});

// =============================================================
// REST (Tabs, Carousel, etc.) – unverändert
// =============================================================
function switchTab(tabName) {
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
        btn.setAttribute('aria-selected', 'false');
    });
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    event.target.classList.add('active');
    event.target.setAttribute('aria-selected', 'true');
    document.getElementById(tabName).classList.add('active');
    document.getElementById('experience').scrollIntoView({ behavior: 'smooth' });
}

$(document).ready(function() {
    $('.testimonials-carousel, .projects-slider').owlCarousel({ /* deine Settings */ });
});

// TESTIMONIAL CAROUSEL – Autoplay + Pfeile funktionieren perfekt
$(document).ready(function () {
    const $carousel = $('.testimonials-carousel');

    $carousel.owlCarousel({
        items: 1,
        loop: true,
        autoplay: true,
        autoplayTimeout: 6000,
        autoplayHoverPause: true,
        nav: false,
        dots: true,
        animateOut: 'fadeOut',
        animateIn: 'fadeIn',
        smartSpeed: 800
    });

    // Pfeil links
    $('.testimonial-wrapper .nav-arrow.prev').click(function () {
        $carousel.trigger('prev.owl.carousel');
    });

    // Pfeil rechts
    $('.testimonial-wrapper .nav-arrow.next').click(function () {
        $carousel.trigger('next.owl.carousel');
    });

    // Bonus: Tastatursteuerung (Pfeiltasten links/rechts)
    $(document).keydown(function (e) {
        if (e.keyCode === 37) { // Pfeil links
            $carousel.trigger('prev.owl.carousel');
        } else if (e.keyCode === 39) { // Pfeil rechts
            $carousel.trigger('next.owl.carousel');
        }
    });
});

// =============================================================
// NAVIGATION VON ANDEREN SEITEN ZUR INDEX + SCROLLEN (ENDGÜLTIGE LÖSUNG)
// =============================================================
document.addEventListener('click', function(e) {
    const link = e.target.closest('.navbar-nav a[href^="index.html#"], .footer-links a[href^="#"]');
    if (!link) return;

    const href = link.getAttribute('href');

    if (href.includes('index.html#')) {
        e.preventDefault();
        const hash = href.split('#')[1];
        window.location.href = 'index.html#' + hash;
    } else if (href.startsWith('#') && href.length > 1) {
        const currentPage = window.location.pathname.split('/').pop();
        if (currentPage !== 'index.html' && currentPage !== '') {
            e.preventDefault();
            const hash = href.substring(1);
            window.location.href = 'index.html#' + hash;
        }
    }
});

// Scrollt zum Abschnitt, wenn Hash in URL (nach Weiterleitung von anderer Seite)
document.addEventListener('DOMContentLoaded', function() {
    if (window.location.hash) {
        setTimeout(() => {
            const target = document.querySelector(window.location.hash);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                // Optional: active setzen
                document.querySelectorAll('.navbar-nav .nav-link').forEach(l => l.classList.remove('active'));
                const activeLink = document.querySelector(`.navbar-nav-link[href$="${window.location.hash}"]`);
                if (activeLink) activeLink.classList.add('active');
            }
        }, 600);
    }
});

// =============================================================
// "Blog" in Navbar aktiv markieren – auf blog.html und allen Blog-Artikel-Seiten
// =============================================================
document.addEventListener('DOMContentLoaded', function() {
    const path = window.location.pathname;
    ;
    if (path.includes('blog.html') || path.includes('/blog-')) {
        document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
            link.classList.remove('active');
        });
        const blogLink = document.querySelector('.navbar-nav a[href="blog.html"]');
        if (blogLink) {
            blogLink.classList.add('active');
        }
    }
});