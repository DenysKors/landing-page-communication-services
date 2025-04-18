import './style.css';

import { gsap } from 'gsap';

import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';

// const headerRef = document.querySelector('.header');
const themeBtnRef = document.getElementById('theme-switch');
const svgSunIconRef = document.getElementById('icon-sun');
const svgMoonIconRef = document.getElementById('icon-moon');
const mobMenuBtnRef = document.getElementById('mobile-menu');
const mobMenuRef = document.querySelector('[data-modal-open]');
const mobMenuBackdrop = document.getElementById('mobile-backdrop');
const svgMenuIconRef = document.getElementById('icon-menu');
const svgCloseIconRef = document.getElementById('icon-close');

document.addEventListener('DOMContentLoaded', () => {
  const userColorSchemeDark = window.matchMedia('(prefers-color-scheme: dark)');

  if (
    userColorSchemeDark.matches &&
    !document.body.classList.contains('dark-theme')
  ) {
    document.body.classList.toggle('dark-theme');
    svgMoonIconRef.classList.add('sun-theme');
    svgSunIconRef.classList.add('moon-theme');
    themeBtnRef.classList.add('back-moon');
  }
});

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
    document.body.style.overflow = 'scroll';
  } else {
    mobMenuRef.dataset.modalOpen = 'true';
    mobMenuBackdrop.classList.remove('hide');
    document.body.style.overflow = 'hidden';
  }
  toggleMenuIcon();
};

const mobNavControl = evt => {
  if (mobMenuRef.dataset.modalOpen === 'false') {
    return;
  } else if (evt.target === evt.currentTarget) {
    return;
  }
  mobMenuRef.dataset.modalOpen = 'false';
  mobMenuBackdrop.classList.add('hide');
  document.body.style.overflow = 'scroll';
  toggleMenuIcon();
};

themeBtnRef.addEventListener('click', toggleTheme);
mobMenuBtnRef.addEventListener('click', mobMenuControl);
mobMenuRef.addEventListener('click', mobNavControl);

/* HEADER LEVITATE WITHOUT GSAP */

// window.onscroll = () => {
//   headerRef.classList.toggle('levitate', window.scrollY > 100);
// };

/* SECTION ANIMATIONS */

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(TextPlugin);

ScrollTrigger.create({
  start: 'top -50',
  end: 99999,
  toggleClass: {
    className: 'levitate',
    targets: '.header',
  },
});

const reveal = document.querySelectorAll('h2');

reveal.forEach(el => {
  let tl = gsap.timeline().from(el, {
    y: 50,
    stagger: 0.2,
    opacity: 0,
    duration: 0.8,
    ease: 'power3.out',
  });

  ScrollTrigger.create({
    trigger: el,
    start: '3% 85%',
    end: '20% 90%',
    // markers: true,
    animation: tl,
  });
});

const images = document.querySelectorAll('img');

images.forEach(el => {
  let tl = gsap.timeline().from(el, {
    scale: 0.8,
    opacity: 0,
    duration: 0.6,
    ease: 'power2.out',
  });

  ScrollTrigger.create({
    trigger: el,
    start: '3% 85%',
    end: '20% 90%',
    // markers: true,
    animation: tl,
  });
});

const section = document.querySelector('.section-animate');
const text = document.querySelector('.questions-text');
const bgColors = ['#e4f5fc', '#313131', '#f3f4f6'];
const textColors = ['#1d2329', '#e6e6e6', '#454b52'];
const texts = [
  'Залишились питання? Телефонуйте!',
  'Просте та швидке підключення',
  'Наші спеціалісти завжди на зв&#39;язку',
];

const tl = gsap.timeline({
  repeat: -1,
});

for (let i = 0; i < texts.length; i += 1) {
  tl.to(section, { duration: 0.5, backgroundColor: bgColors[i] });
  if (i) {
    tl.fromTo(
      text,
      { text: texts[i - 1], opacity: 0, color: textColors[i - 1] },
      { text: '', opacity: 1, ease: 'none' },
      '<'
    ).to(text, {
      text: texts[i],
      duration: 7,
      opacity: 1,
      color: textColors[i],
    });
  } else {
    tl.fromTo(
      text,
      {
        text: texts[texts.length - 1],
        opacity: 0,
        color: textColors[textColors.length - 1],
      },
      { text: '', opacity: 1 },
      '<'
    ).to(text, {
      text: texts[i],
      duration: 7,
      opacity: 1,
      color: textColors[i],
    });
  }
}
