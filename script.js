// Display local time in 24-hour format (military time) in #local-time
function updateLocalTime() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  const timeString = `${hours}:${minutes}:${seconds}`;
  const el = document.getElementById('local-time');
  if (el) el.textContent = timeString;
}

setInterval(updateLocalTime, 1000);
window.addEventListener('DOMContentLoaded', updateLocalTime);
function theme() {
    var element = document.documentElement; 
    var checkbox = document.querySelector('input[type="checkbox"]'); 
  
    if (checkbox.checked) {
      element.setAttribute('data-theme', 'dark'); // Switch to dark mode
      document.getElementById("themeLabel").innerHTML = "Dark mode (toggle to switch)";
    } else {  
      element.setAttribute('data-theme', 'one'); // Switch to light mode
      document.getElementById("themeLabel").innerHTML = "Light mode (toggle to switch)";
    }
  }
  