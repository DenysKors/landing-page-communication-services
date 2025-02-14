import './style.css';

const themeBtnRef = document.getElementById('theme-switch');
// const mobMemuBtnRef = document.getElementById('#menu');
console.log(themeBtnRef);

const toggleTheme = () => {
  document.body.classList.toggle('dark-theme');
};

themeBtnRef.addEventListener('click', toggleTheme);
