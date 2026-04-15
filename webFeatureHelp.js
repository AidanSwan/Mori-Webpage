
function setActiveNav() {
    const path = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.button').forEach(btn => {
        const href = (btn.getAttribute('href') || '').split('/').pop();
        if (href === path) btn.classList.add('active');
    });
}

function initScrollAnimations() {
    if (!('IntersectionObserver' in window)) {
        
        document.querySelectorAll('.fade-in').forEach(el => el.classList.add('visible'));
        return;
    }
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.08 });

    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
}


function initLightbox() {
    const images = document.querySelectorAll('.gallery-img');
    const lightbox = document.getElementById('lightbox');
    if (!images.length || !lightbox) return;

    const lbImg     = document.getElementById('lightbox-img');
    const lbCaption = document.getElementById('lightbox-caption');
    const lbClose   = document.getElementById('lightbox-close');
    const lbPrev    = document.getElementById('lightbox-prev');
    const lbNext    = document.getElementById('lightbox-next');

    const imgArray = Array.from(images);
    let current = 0;

    function open(index) {
        current = index;
        lbImg.src = imgArray[current].src;
        lbImg.alt = imgArray[current].alt;
        lbCaption.textContent = imgArray[current].alt;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function close() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
        lbImg.src = '';
    }

    function prev() { open((current - 1 + imgArray.length) % imgArray.length); }
    function next() { open((current + 1) % imgArray.length); }

    imgArray.forEach((img, i) => {
        img.style.cursor = 'pointer';
        img.addEventListener('click', () => open(i));
    });

    lbClose.addEventListener('click', close);
    lbPrev.addEventListener('click', prev);
    lbNext.addEventListener('click', next);
    lightbox.addEventListener('click', e => { if (e.target === lightbox) close(); });

    document.addEventListener('keydown', e => {
        if (!lightbox.classList.contains('active')) return;
        if (e.key === 'Escape')      close();
        if (e.key === 'ArrowLeft')   prev();
        if (e.key === 'ArrowRight')  next();
    });
}


function initScrollTop() {
    const btn = document.getElementById('scroll-top');
    if (!btn) return;
    window.addEventListener('scroll', () => {
        btn.classList.toggle('visible', window.scrollY > 400);
    });
    btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

document.addEventListener('DOMContentLoaded', () => {
    setActiveNav();
    initScrollAnimations();
    initLightbox();
    initScrollTop();
});
