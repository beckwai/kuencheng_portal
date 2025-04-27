// Theme Switcher (save to localStorage)
function setTheme(theme) {
  document.body.className = theme;
  localStorage.setItem("userTheme", theme);
}

// Load saved theme on startup
window.onload = function() {
  const savedTheme = localStorage.getItem("userTheme") || "light";
  setTheme(savedTheme);
};

// Layout Toggler (example)
function toggleLayout() {
  document.getElementById("dashboard").classList.toggle("grid-layout");
}
