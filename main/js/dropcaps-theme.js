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
    const saved = localStorage.getItem('theme') ||
        (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    document.body.setAttribute('data-theme', saved);
    const icon = document.querySelector('.mode-toggle i');
    if (icon) icon.classList.add(saved === 'dark' ? 'fa-moon' : 'fa-sun');
});
