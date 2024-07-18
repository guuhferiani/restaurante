/**
* Template Name: Restaurante
* Updated: Jul 27 2023 with Bootstrap v5.3.1
*/

(function () {
  "use strict";

  const select = (el, all = false) => all ? [...document.querySelectorAll(el.trim())] : document.querySelector(el.trim());
  const on = (type, el, listener, all = false) => {
    let elements = select(el, all);
    (all ? elements : [elements]).forEach(e => e.addEventListener(type, listener));
  };
  const onscroll = (el, listener) => el.addEventListener('scroll', listener);

  const navbarlinks = select('#navbar .scrollto', true);
  const navbarlinksActive = () => {
    let position = window.scrollY + 200;
    navbarlinks.forEach(link => {
      if (!link.hash) return;
      let section = select(link.hash);
      section && position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)
        ? link.classList.add('active')
        : link.classList.remove('active');
    });
  };
  window.addEventListener('load', navbarlinksActive);
  onscroll(document, navbarlinksActive);

  const scrollto = (el) => {
    let offset = select('#header').offsetHeight;
    window.scrollTo({ top: select(el).offsetTop - offset, behavior: 'smooth' });
  };

  let header = select('#header');
  let topbar = select('#topbar');
  if (header) {
    const headerScrolled = () => {
      let action = window.scrollY > 100 ? 'add' : 'remove';
      header.classList[action]('header-scrolled');
      topbar && topbar.classList[action]('topbar-scrolled');
    };
    window.addEventListener('load', headerScrolled);
    onscroll(document, headerScrolled);
  }

  let backtotop = select('.back-to-top');
  if (backtotop) {
    const toggleBacktotop = () => backtotop.classList.toggle('active', window.scrollY > 100);
    window.addEventListener('load', toggleBacktotop);
    onscroll(document, toggleBacktotop);
  }

  on('click', '.mobile-nav-toggle', function () {
    select('#navbar').classList.toggle('navbar-mobile');
    this.classList.toggle('bi-list');
    this.classList.toggle('bi-x');
  });

  on('click', '.navbar .dropdown > a', function (e) {
    if (select('#navbar').classList.contains('navbar-mobile')) {
      e.preventDefault();
      this.nextElementSibling.classList.toggle('dropdown-active');
    }
  }, true);

  on('click', '.scrollto', function (e) {
    if (select(this.hash)) {
      e.preventDefault();
      let navbar = select('#navbar');
      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile');
        select('.mobile-nav-toggle').classList.toggle('bi-list');
        select('.mobile-nav-toggle').classList.toggle('bi-x');
      }
      scrollto(this.hash);
    }
  }, true);

  window.addEventListener('load', () => window.location.hash && select(window.location.hash) && scrollto(window.location.hash));

  let preloader = select('#preloader');
  preloader && window.addEventListener('load', () => preloader.remove());

  window.addEventListener('load', () => {
    let menuContainer = select('.menu-container');
    if (menuContainer) {
      let menuIsotope = new Isotope(menuContainer, { itemSelector: '.menu-item', layoutMode: 'fitRows' });
      on('click', '#menu-filters li', function (e) {
        e.preventDefault();
        select('#menu-filters .filter-active', true).forEach(el => el.classList.remove('filter-active'));
        this.classList.add('filter-active');
        menuIsotope.arrange({ filter: this.getAttribute('data-filter') });
        menuIsotope.on('arrangeComplete', () => AOS.refresh());
      }, true);
    }
  });

  GLightbox({ selector: '.glightbox' });

  new Swiper('.events-slider', {
    speed: 600,
    loop: true,
    autoplay: { delay: 5000, disableOnInteraction: false },
    slidesPerView: 'auto',
    pagination: { el: '.swiper-pagination', type: 'bullets', clickable: true }
  });

  new Swiper('.testimonials-slider', {
    speed: 600,
    loop: true,
    autoplay: { delay: 5000, disableOnInteraction: false },
    slidesPerView: 'auto',
    pagination: { el: '.swiper-pagination', type: 'bullets', clickable: true },
    breakpoints: {
      320: { slidesPerView: 1, spaceBetween: 20 },
      1200: { slidesPerView: 3, spaceBetween: 20 }
    }
  });

  GLightbox({ selector: '.gallery-lightbox' });

  window.addEventListener('load', () => AOS.init({ duration: 1000, easing: 'ease-in-out', once: true, mirror: false }));

})();