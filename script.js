// Reveal on scroll
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
reveals.forEach(el => observer.observe(el));

// Carousel
const carousel = document.getElementById('carousel');
if (carousel) {
  const imgs = carousel.querySelectorAll('.carousel-img');
  const dots = document.querySelectorAll('.dot');
  let current = 0;
  let autoInterval;

  function showSlide(i) {
    imgs.forEach(img => img.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    imgs[i].classList.add('active');
    dots[i].classList.add('active');
    current = i;
  }

  function startAuto() {
    autoInterval = setInterval(() => showSlide((current + 1) % imgs.length), 3500);
  }

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      clearInterval(autoInterval);
      showSlide(parseInt(dot.dataset.index));
      startAuto();
    });
  });

  startAuto();
}

// Mobile nav
const navToggle = document.querySelector('.nav-toggle');
const navUl = document.querySelector('nav ul');
if (navToggle) {
  navToggle.addEventListener('click', () => {
    navUl.classList.toggle('open');
  });
  navUl.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => navUl.classList.remove('open'));
  });
}
