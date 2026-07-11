const root = document.documentElement;
const nav = document.querySelector('.site-nav');
const themeToggle = document.querySelector('.theme-toggle');
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = [...document.querySelectorAll('.site-nav a[href^="#"]')];
const sections = [...document.querySelectorAll('main section[id]')];

const savedTheme = localStorage.getItem('theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
root.dataset.theme = savedTheme || (prefersDark ? 'dark' : 'light');

function updateThemeButton() {
  if (!themeToggle) return;
  const isDark = root.dataset.theme === 'dark';
  themeToggle.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
  themeToggle.setAttribute('title', isDark ? 'Switch to light mode' : 'Switch to dark mode');
}

updateThemeButton();

themeToggle?.addEventListener('click', () => {
  root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
  localStorage.setItem('theme', root.dataset.theme);
  updateThemeButton();
});

menuToggle?.addEventListener('click', () => {
  const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!isOpen));
  nav?.classList.toggle('open', !isOpen);
});

[...document.querySelectorAll('.site-nav a')].forEach((link) => {
  link.addEventListener('click', () => {
    nav?.classList.remove('open');
    menuToggle?.setAttribute('aria-expanded', 'false');
  });
});

if (sections.length && navLinks.length) {
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navLinks.forEach((link) => {
          link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
        });
      });
    },
    { rootMargin: '-35% 0px -55% 0px', threshold: 0 }
  );
  sections.forEach((section) => sectionObserver.observe(section));
}

async function loadChunkedImage(image) {
  const chunkPaths = image.dataset.imageChunks?.split(',').map((item) => item.trim()).filter(Boolean);
  if (!chunkPaths?.length) return;

  try {
    const chunks = await Promise.all(
      chunkPaths.map(async (path) => {
        const response = await fetch(path);
        if (!response.ok) throw new Error(`Unable to load ${path}`);
        return response.text();
      })
    );
    image.src = `data:image/webp;base64,${chunks.join('')}`;
    image.hidden = false;
    image.parentElement?.classList.add('is-loaded');
  } catch (error) {
    console.error(error);
    const loadingText = image.parentElement?.querySelector('.media-loading');
    if (loadingText) loadingText.textContent = 'Figure unavailable';
  }
}

document.querySelectorAll('[data-image-chunks]').forEach(loadChunkedImage);

const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();
