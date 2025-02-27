import './style.css';

const headerRef = document.querySelector('.header');
const themeBtnRef = document.getElementById('theme-switch');
const svgLightIconRef = document.getElementById('icon-light');
const svgDarkIconRef = document.getElementById('icon-dark');
const mobMemuBtnRef = document.getElementById('mobile-menu');
const mobMenuRef = document.querySelector('[data-modal-open]');
const mobMenuBackdrop = document.getElementById('mobile-backdrop');
const svgMenuIconRef = document.getElementById('icon-menu');
const svgCloseIconRef = document.getElementById('icon-close');

const toggleTheme = () => {
  document.body.classList.toggle('dark-theme');

  if (document.body.classList.contains('dark-theme')) {
    svgLightIconRef.classList.add('hide');
    svgDarkIconRef.classList.remove('hide');
  } else {
    svgLightIconRef.classList.remove('hide');
    svgDarkIconRef.classList.add('hide');
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

// headerRef.classList.toggle('sticky', window.scrollY > 100);

// const elDistanceToTop = window.scrollY + headerRef.getBoundingClientRect().top;

// console.log(elDistanceToTop);
