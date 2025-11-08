// small ui script: clock display and theme toggle helpers for the site header

// updateLocalTime: refresh the header clock every second in hh:mm:ss 24-hour form
function updateLocalTime() {
  const now = new Date(); // read current time from the browser clock
  const hours = String(now.getHours()).padStart(2, '0'); // format hours to two digits
  const minutes = String(now.getMinutes()).padStart(2, '0'); // format minutes to two digits
  const seconds = String(now.getSeconds()).padStart(2, '0'); // format seconds to two digits
  const timeString = `${hours}:${minutes}:${seconds}`; // build display string hh:mm:ss
  const el = document.getElementById('local-time'); // locate the small header time element
  if (el) el.textContent = timeString; // update the element only if present
}

// schedule the clock to tick every 1 second and seed it once on initial load
setInterval(updateLocalTime, 1000);
window.addEventListener('DOMContentLoaded', () => {
  updateLocalTime(); // immediate seed so time shows without waiting 1s
  updateThemeText(); // ensure the theme label reflects initial theme state
});

// updateThemeText: change the small label next to the toggle to reflect current theme
function updateThemeText() {
  const themeText = document.getElementById('themeText');
  if (!themeText) return; // nothing to do when the label is missing
  const isDark = document.documentElement.classList.contains('dark');
  themeText.textContent = isDark ? 'dark mode' : 'light mode';
}
// expose updateThemeText globally so other scripts can refresh the label after changing classes
window.updateThemeText = updateThemeText;

// theme: toggle classes and data attributes on <html> to switch site colors
function theme() {
    var element = document.documentElement; // root element controls theme classes and css vars
    var checkbox = document.querySelector('input[type="checkbox"]'); // the hidden checkbox used as control
    if (checkbox.checked) {
      // checkbox checked means enable dark theme variables and classes
      element.setAttribute('data-theme', 'dark');
      element.classList.add('dark');
      element.classList.remove('light');
    } else {
      // checkbox unchecked means fall back to the light theme
      element.setAttribute('data-theme', 'one');
      element.classList.remove('dark');
      element.classList.add('light');
    }
    // refresh the small label text so it matches the new state
    if (window.updateThemeText) window.updateThemeText();
    // tweak the label color for contrast depending on the selected theme
    var themeText = document.getElementById('themeText');
    if (themeText) {
      if (checkbox.checked) {
        themeText.style.color = 'whitesmoke'; // light label on dark background
      } else {
        themeText.style.color = '#222'; // dark label on light background
      }
    }
}
