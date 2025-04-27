// DOM Elements
const themeToggle = document.getElementById('themeToggle');
const themeStyle = document.getElementById('theme-style');
const sidebarToggle = document.getElementById('toggleSidebar');
const sidebar = document.querySelector('.sidebar');

// Initialize theme from localStorage
const savedTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', savedTheme);
if(savedTheme === 'dark') {
    themeStyle.href = 'css/dark-mode.css';
    themeToggle.innerHTML = '<i class="fas fa-sun"></i> <span>Light Mode</span>';
}

// Theme Toggle
themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    themeStyle.href = newTheme === 'light' ? 'css/styles.css' : 'css/dark-mode.css';
    
    themeToggle.innerHTML = newTheme === 'light' 
        ? '<i class="fas fa-moon"></i> <span>Dark Mode</span>' 
        : '<i class="fas fa-sun"></i> <span>Light Mode</span>';
    
    localStorage.setItem('theme', newTheme);
});

// Sidebar Toggle
sidebarToggle.addEventListener('click', () => {
    sidebar.classList.toggle('collapsed');
    sidebarToggle.innerHTML = sidebar.classList.contains('collapsed') 
        ? '<i class="fas fa-chevron-right"></i>' 
        : '<i class="fas fa-chevron-left"></i>';
});

// Countdown Timer
function updateCountdown() {
    const examDate = new Date('2024-05-05T08:00:00').getTime();
    const now = new Date().getTime();
    const distance = examDate - now;
    
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    document.getElementById('days').textContent = days.toString().padStart(2, '0');
    document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
    document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
    document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
    
    setTimeout(updateCountdown, 1000);
}

// Initialize
updateCountdown();

// Check authentication
if(localStorage.getItem('isAuthenticated') !== 'true') {
    window.location.href = 'index.html';
} else {
    document.querySelector('header h1 span').textContent = localStorage.getItem('username');
}
