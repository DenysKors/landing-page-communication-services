import './style.css';

import { gsap } from 'gsap';

import { ScrollTrigger, SplitText } from 'gsap/all';

// const headerRef = document.querySelector('.header');
const themeBtnRef = document.getElementById('theme-switch');
const svgSunIconRef = document.getElementById('icon-sun');
const svgMoonIconRef = document.getElementById('icon-moon');
const mobMenuBtnRef = document.getElementById('mobile-menu');
const mobMenuRef = document.querySelector('[data-modal-open]');
const mobMenuBackdrop = document.getElementById('mobile-backdrop');
const svgMenuIconRef = document.getElementById('icon-menu');
const svgCloseIconRef = document.getElementById('icon-close');
const sectionsRef = document.querySelectorAll('section');

const sectionIDRef = [];

sectionsRef.forEach(section => {
  if (section.hasAttribute('id')) sectionIDRef.push(`#${section.id}`);
});

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

gsap.registerPlugin(ScrollTrigger, SplitText);

window.addEventListener('load', function () {
  gsapInit();
});

ScrollTrigger.create({
  start: 'top -50',
  end: 99999,
  toggleClass: {
    className: 'levitate',
    targets: '.header',
  },
});

sectionIDRef.forEach(section => {
  let navLink = document.querySelector(`header nav a[href='${section}']`);
  ScrollTrigger.create({
    trigger: section,
    start: 'top 40%',
    end: 'bottom 40%',
    onToggle: self => {
      if (self.isActive) {
        navLink.classList.add('nav-link-active');
      } else {
        navLink.classList.remove('nav-link-active');
      }
    },
  });
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

/* TEXT OPASITY ON SCROLL*/

function gsapInit() {
  const splitT = SplitText.create('.wrapper p', {
    type: 'words',
  });

  gsap
    .timeline({
      scrollTrigger: {
        trigger: '#textSection',
        start: '-10%',
        end: '+100%',
        pin: true,
        scrub: 0.75,
        // markers: true,
      },
    })
    .from(splitT.words, {
      opacity: 0.2,
      stagger: 0.1,
    })
    .to(splitT.words, {
      opacity: 1,
      stagger: 0.1,
    });

  /* SPLIT TEXT */

  let split = SplitText.create('.split', { type: 'words, chars' });

  const splitTl = gsap.timeline({ repeat: -1 });

  splitTl
    .from(split.chars, {
      duration: 0.5,
      opacity: 0,
      stagger: 0.125,
      ease: 'power1. In',
    })
    .to(
      split.chars,
      { duration: 0.25, opacity: 0, stagger: 0.125, ease: 'power3. inOut' },
      '+=3'
    );
}
