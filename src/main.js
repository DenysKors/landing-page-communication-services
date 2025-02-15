import './style.css';

const themeBtnRef = document.getElementById('theme-switch');
const svgLightIconRef = document.getElementById('icon-light');
const svgDarkIconRef = document.getElementById('icon-dark');
// const mobMemuBtnRef = document.getElementById('#menu');

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

themeBtnRef.addEventListener('click', toggleTheme);
