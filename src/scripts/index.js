import 'regenerator-runtime';
import '../styles/main.css';
import swRegister from './utils/sw-register';
import App from './view/app';

const app = new App({
  button: document.querySelector('#hamburgerButton'),
  drawer: document.querySelector('#navigationDrawer'),
  content: document.querySelector('#mainContent'),
});

const mainNav = document.getElementById('navigationDrawer');
const navBarToggle = document.getElementById('hamburgerButton');

navBarToggle.addEventListener('click', () => {
  mainNav.classList.toggle('active');
});

window.addEventListener('hashchange', () => {
  app.renderPage();
});

window.addEventListener('load', () => {
  app.renderPage();
  swRegister();
});
