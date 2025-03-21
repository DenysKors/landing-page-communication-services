import './style.css';

import { gsap } from 'gsap';

import { ScrollTrigger } from 'gsap/ScrollTrigger';

// const headerRef = document.querySelector('.header');
const themeBtnRef = document.getElementById('theme-switch');
const svgSunIconRef = document.getElementById('icon-sun');
const svgMoonIconRef = document.getElementById('icon-moon');
const mobMemuBtnRef = document.getElementById('mobile-menu');
const mobMenuRef = document.querySelector('[data-modal-open]');
const mobMenuBackdrop = document.getElementById('mobile-backdrop');
const svgMenuIconRef = document.getElementById('icon-menu');
const svgCloseIconRef = document.getElementById('icon-close');

const toggleTheme = () => {
  document.body.classList.toggle('dark-theme');

  if (document.body.classList.contains('dark-theme')) {
    svgMoonIconRef.classList.add('sun-theme');
    svgSunIconRef.classList.add('moon-theme');
    themeBtnRef.classList.add('back-moon');
  } else {
    svgMoonIconRef.classList.remove('sun-theme');
    svgSunIconRef.classList.remove('moon-theme');
    themeBtnRef.classList.remove('back-moon');
  }
};

const toggleMenuIcon = () => {
  if (mobMenuRef.dataset.modalOpen === 'true') {
    svgMenuIconRef.classList.add('hide');
    svgCloseIconRef.classList.remove('hide');
  } else {
    svgMenuIconRef.classList.remove('hide');
    svgCloseIconRef.classList.add('hide');
  }
};

const mobMenuControl = () => {
  if (mobMenuRef.dataset.modalOpen === 'true') {
    mobMenuRef.dataset.modalOpen = 'false';
    mobMenuBackdrop.classList.add('hide');
  } else {
    mobMenuRef.dataset.modalOpen = 'true';
    mobMenuBackdrop.classList.remove('hide');
  }
  toggleMenuIcon();
};

themeBtnRef.addEventListener('click', toggleTheme);
mobMemuBtnRef.addEventListener('click', mobMenuControl);

/* HEADER LEVITATE WITHOUT GSAP */

// window.onscroll = () => {
//   headerRef.classList.toggle('levitate', window.scrollY > 100);
// };

/* SECTION ANIMATIONS */

gsap.registerPlugin(ScrollTrigger);

ScrollTrigger.create({
  start: 'top -80',
  end: 99999,
  toggleClass: {
    className: 'levitate',
    targets: '.header',
  },
});

const reveal = document.querySelectorAll('.reveal');

reveal.forEach(el => {
  let headings = el.querySelectorAll('h2');
  let images = el.querySelectorAll('img');

  let tl = gsap
    .timeline()
    .from(headings, {
      y: 50,
      stagger: 0.2,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
    })
    .from(images, {
      scale: 0.8,
      opacity: 0,
      duration: 0.6,
      ease: 'power2.out',
    });

  ScrollTrigger.create({
    trigger: el,
    start: '10% 80%',
    end: '20% 90%',
    // markers: true,
    animation: tl,
  });
});
