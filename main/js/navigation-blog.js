// =============================================================
// NAVIGATION VON ANDEREN SEITEN ZUR INDEX + SCROLLEN
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

// Scrollen bei Hash (z.B. nach Weiterleitung)
document.addEventListener('DOMContentLoaded', function() {
    if (window.location.hash) {
        setTimeout(() => {
            const target = document.querySelector(window.location.hash);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });

                // Optional: Active-Klasse setzen
                document.querySelectorAll('.navbar-nav .nav-link').forEach(l => l.classList.remove('active'));
                const activeLink = document.querySelector(`.navbar-nav .nav-link[href$="${window.location.hash}"]`);
                if (activeLink) activeLink.classList.add('active');
            }
        }, 600);
    }
});

// =============================================================
// "Blog" in Navbar aktiv markieren – auf blog.html + Blog-Artikeln
// =============================================================
document.addEventListener('DOMContentLoaded', function() {
    const path = window.location.pathname;

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
