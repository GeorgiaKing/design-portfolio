// Tabs
function switchTab(tabName) {
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
        btn.setAttribute('aria-selected', 'false');
    });
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));

    // event aus globalem Kontext (für inline onclick)
    const evt = window.event;
    if (evt && evt.target) {
        evt.target.classList.add('active');
        evt.target.setAttribute('aria-selected', 'true');
    }

    const target = document.getElementById(tabName);
    if (target) {
        target.classList.add('active');
        document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' });
    }
}

// Carousels
$(document).ready(function () {
    // Testimonials
    const $carousel = $('.testimonials-carousel');

    if ($carousel.length) {
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

        // Pfeile
        $('.testimonial-wrapper .nav-arrow.prev').click(function () {
            $carousel.trigger('prev.owl.carousel');
        });

        $('.testimonial-wrapper .nav-arrow.next').click(function () {
            $carousel.trigger('next.owl.carousel');
        });

        // Tastatursteuerung (links/rechts)
        $(document).keydown(function (e) {
            if (e.keyCode === 37) {
                $carousel.trigger('prev.owl.carousel');
            } else if (e.keyCode === 39) {
                $carousel.trigger('next.owl.carousel');
            }
        });
    }

    // Optional: Projects-Slider
    $('.projects-slider').owlCarousel({
        // deine Settings hier
    });
});
