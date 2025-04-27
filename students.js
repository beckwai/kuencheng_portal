// Filter students by class
document.getElementById('classFilter').addEventListener('change', function() {
    const classValue = this.value;
    const rows = document.querySelectorAll('.student-table tbody tr');
    
    rows.forEach(row => {
        const rowClass = row.querySelector('td:nth-child(3)').textContent.toLowerCase();
        
        if (classValue === 'all' || rowClass.includes(classValue)) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
});

// Filter students by house
document.getElementById('houseFilter').addEventListener('change', function() {
    const houseValue = this.value;
    const rows = document.querySelectorAll('.student-table tbody tr');
    
    rows.forEach(row => {
        const houseTag = row.querySelector('.house-tag').textContent.toLowerCase();
        
        if (houseValue === 'all' || houseTag.includes(houseValue)) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
});

// Search functionality
document.querySelector('.search-box input').addEventListener('input', function() {
    const searchTerm = this.value.toLowerCase();
    const rows = document.querySelectorAll('.student-table tbody tr');
    
    rows.forEach(row => {
        const studentName = row.querySelector('td:nth-child(2) span').textContent.toLowerCase();
        const studentId = row.querySelector('td:nth-child(1)').textContent.toLowerCase();
        
        if (studentName.includes(searchTerm) || studentId.includes(searchTerm)) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
});

// Add student button
document.querySelector('.add-student-btn').addEventListener('click', () => {
    alert('Add student form would open here');
});

// View/Edit buttons
document.querySelectorAll('.action-btn.view').forEach(btn => {
    btn.addEventListener('click', function() {
        const studentId = this.closest('tr').querySelector('td:first-child').textContent;
        alert(`Viewing student: ${studentId}`);
    });
});

document.querySelectorAll('.action-btn.edit').forEach(btn => {
    btn.addEventListener('click', function() {
        const studentId = this.closest('tr').querySelector('td:first-child').textContent;
        alert(`Editing student: ${studentId}`);
    });
});