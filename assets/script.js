const root = document.documentElement;
const nav = document.querySelector('.site-nav');

// Add the CV item to the main navigation until a full CV is uploaded.
if (nav && !nav.querySelector('[data-cv-link]')) {
  const cvLink = document.createElement('a');
  cvLink.href = 'cv.html';
  cvLink.textContent = 'CV';
  cvLink.dataset.cvLink = 'true';

  const contactLink = [...nav.querySelectorAll('a')].find(
    (link) => link.textContent.trim().toLowerCase() === 'contact'
  );

  if (contactLink) {
    nav.insertBefore(cvLink, contactLink);
  } else {
    nav.appendChild(cvLink);
  }
}

const themeToggle = document.querySelector('.theme-toggle');
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = [...document.querySelectorAll('.site-nav a')];
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

navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    nav?.classList.remove('open');
    menuToggle?.setAttribute('aria-expanded', 'false');
  });
});

if (sections.length > 0) {
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navLinks.forEach((link) => {
          const href = link.getAttribute('href');
          if (href?.startsWith('#')) {
            link.classList.toggle('active', href === `#${entry.target.id}`);
          }
        });
      });
    },
    { rootMargin: '-35% 0px -55% 0px', threshold: 0 }
  );

  sections.forEach((section) => sectionObserver.observe(section));
}

const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();
