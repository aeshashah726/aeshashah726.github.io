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
  