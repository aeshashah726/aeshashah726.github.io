// this script controls the local time display and theme toggle for the website

// function to update the local time every second
// shows time in 24-hour (military) format in the #local-time span
function updateLocalTime() {
  const now = new Date(); // get current date and time
  const hours = String(now.getHours()).padStart(2, '0'); // get hours, pad with zero
  const minutes = String(now.getMinutes()).padStart(2, '0'); // get minutes, pad with zero
  const seconds = String(now.getSeconds()).padStart(2, '0'); // get seconds, pad with zero
  const timeString = `${hours}:${minutes}:${seconds}`; // format as hh:mm:ss
  const el = document.getElementById('local-time'); // find the element to update
  if (el) el.textContent = timeString; // set the text if element exists
}

// call updateLocalTime every 1000ms (1 second) to keep time updated
setInterval(updateLocalTime, 1000);
// also update time as soon as the page loads
window.addEventListener('DOMContentLoaded', () => {
  updateLocalTime();
  updateThemeText();
});

// function to update the theme label text ("light mode" or "dark mode")
function updateThemeText() {
  const themeText = document.getElementById('themeText');
  if (!themeText) return;
  const isDark = document.documentElement.classList.contains('dark');
  themeText.textContent = isDark ? 'Dark mode' : 'Light mode';
}
// make updateThemeText available globally for theme toggle
window.updateThemeText = updateThemeText;

// function to toggle between light and dark theme
function theme() {
    var element = document.documentElement; // get the root html element
    var checkbox = document.querySelector('input[type="checkbox"]'); // get the theme toggle checkbox
    if (checkbox.checked) {
      // if checked, switch to dark mode
      element.setAttribute('data-theme', 'dark');
      element.classList.add('dark');
      element.classList.remove('light');
    } else {  
      // if not checked, switch to light mode
      element.setAttribute('data-theme', 'one');
      element.classList.remove('dark');
      element.classList.add('light');
    }
    // update the theme label text ("light mode" or "dark mode")
    if (window.updateThemeText) window.updateThemeText();
    // also update themeText color for contrast with background
    var themeText = document.getElementById('themeText');
    if (themeText) {
      if (checkbox.checked) {
        // use light text for dark background
        themeText.style.color = 'whitesmoke';
      } else {
        // use dark text for light background
        themeText.style.color = '#222';
      }
    }
}
