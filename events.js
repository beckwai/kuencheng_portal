// Initialize calendar
function initCalendar() {
    const now = new Date();
    const currentMonth = document.getElementById('currentMonth');
    const calendarGrid = document.getElementById('calendarGrid');
    
    // Set current month display
    const monthNames = ["January", "February", "March", "April", "May", "June",
                       "July", "August", "September", "October", "November", "December"];
    currentMonth.textContent = `${monthNames[now.getMonth()]} ${now.getFullYear()}`;
    
    // Generate calendar days
    calendarGrid.innerHTML = '';
    
    // Add day headers
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    dayNames.forEach(day => {
        const dayElement = document.createElement('div');
        dayElement.className = 'calendar-day-header';
        dayElement.textContent = day;
        calendarGrid.appendChild(dayElement);
    });
    
    // Get first day of month and total days
    const firstDay = new Date(now.getFullYear(), now.getMonth(), 1).getDay();
    const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
    
    // Add empty cells for days before first day
    for (let i = 0; i < firstDay; i++) {
        const emptyCell = document.createElement('div');
        emptyCell.className = 'calendar-day empty';
        calendarGrid.appendChild(emptyCell);
    }
    
    // Add days of month
    for (let day = 1; day <= daysInMonth; day++) {
        const dayElement = document.createElement('div');
        dayElement.className = 'calendar-day';
        dayElement.textContent = day;
        
        // Highlight today
        if (day === now.getDate() && new Date().getMonth() === now.getMonth()) {
            dayElement.classList.add('today');
        }
        
        // Mark days with events (example: 5th, 15th, 20th)
        if ([5, 15, 20].includes(day)) {
            dayElement.classList.add('event');
        }
        
        calendarGrid.appendChild(dayElement);
    }
}

// Navigation between months
document.getElementById('prevMonth').addEventListener('click', () => {
    // In a real app, this would change the month view
    alert('Previous month would be shown here');
});

document.getElementById('nextMonth').addEventListener('click', () => {
    // In a real app, this would change the month view
    alert('Next month would be shown here');
});

// Initialize on load
document.addEventListener('DOMContentLoaded', initCalendar);
