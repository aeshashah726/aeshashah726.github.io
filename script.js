// header clock updater
function updateLocalTime() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  const el = document.getElementById('local-time');
  if (el) el.textContent = `${hours}:${minutes}:${seconds}`;
}

setInterval(updateLocalTime, 1000);
window.addEventListener('DOMContentLoaded', () => {
  updateLocalTime();
  updateThemeText();
});

// update theme button text
function updateThemeText() {
  const themeText = document.getElementById('themeText');
  if (!themeText) return;
  const isDark = document.documentElement.classList.contains('dark');
  themeText.textContent = isDark ? 'toggle to light mode' : 'toggle to dark mode';
}
window.updateThemeText = updateThemeText;

// toggle theme between dark and light mode
function theme() {
  var element = document.documentElement;
  var checkbox = document.querySelector('input[type="checkbox"]');
  if (checkbox.checked) {
    element.setAttribute('data-theme', 'dark');
    element.classList.add('dark');
    element.classList.remove('light');
  } else {
    element.setAttribute('data-theme', 'one');
    element.classList.remove('dark');
    element.classList.add('light');
  }
  if (window.updateThemeText) window.updateThemeText();
  var themeText = document.getElementById('themeText');
  if (themeText) {
    themeText.style.color = checkbox.checked ? 'whitesmoke' : '#222';
  }
}

// switcher for previewing home page layout and font options
function switchLayout(n) {
  [1, 2, 3].forEach(i => {
    const el = document.getElementById('layout-' + i);
    const btn = document.getElementById('btn-layout-' + i);
    if (el) {
      if (i === n) {
        el.classList.remove('hidden');
      } else {
        el.classList.add('hidden');
      }
    }
    if (btn) {
      if (i === n) {
        btn.className = 'px-3.5 py-1.5 rounded-full transition-all bg-white dark:bg-white/[0.15] text-neutral-900 dark:text-white shadow-sm font-semibold';
      } else {
        btn.className = 'px-3.5 py-1.5 rounded-full transition-all text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white font-medium';
      }
    }
  });
}
window.switchLayout = switchLayout;

// cleanup stale service workers if any exist
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations().then(registrations => {
    for (const registration of registrations) {
      registration.unregister();
    }
  });
}

