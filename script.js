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
