// Teacher Data Storage
let teachers = [
    {
        id: 'TEA-001',
        name: 'Mr. Lim Chen Wei',
        email: 'limchenwei@kuencheng.edu',
        subject: 'Mathematics',
        classes: ['Form 4A', '5B', '5C'],
        status: 'online',
        photo: 'images/avatar.jpg'
    },
    {
        id: 'TEA-002',
        name: 'Ms. Sarah Johnson',
        email: 'sarahj@kuencheng.edu',
        subject: 'English Literature',
        classes: ['Form 3A', '4B', '5A'],
        status: 'busy',
        photo: 'images/avatar.jpg'
    }
];

// DOM Elements
const teacherGrid = document.getElementById('teacherGrid');
const addTeacherBtn = document.getElementById('addTeacherBtn');
const teacherForm = document.getElementById('teacherForm');
const modal = document.getElementById('addTeacherModal');
const closeModal = document.querySelector('.close-modal');
const teacherSearch = document.getElementById('teacherSearch');
const teacherSelect = document.getElementById('teacherSelect');
const exportTeachersBtn = document.getElementById('exportTeachers');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderTeacherCards();
    populateTeacherSelect();
    initTimetable();
    
    // Load from localStorage if available
    const savedTeachers = localStorage.getItem('teachers');
    if (savedTeachers) {
        teachers = JSON.parse(savedTeachers);
        renderTeacherCards();
    }
});

// Render teacher cards
function renderTeacherCards(filteredTeachers = null) {
    teacherGrid.innerHTML = '';
    const teachersToRender = filteredTeachers || teachers;
    
    teachersToRender.forEach(teacher => {
        const card = document.createElement('div');
        card.className = 'teacher-card';
        card.innerHTML = `
            <div class="teacher-header">
                <img src="${teacher.photo}" class="teacher-avatar">
                <div class="teacher-status ${teacher.status}"></div>
            </div>
            <div class="teacher-info">
                <h3>${teacher.name}</h3>
                <p class="teacher-subject">${teacher.subject}</p>
                <p class="teacher-classes">${teacher.classes.join(', ')}</p>
            </div>
            <div class="teacher-contacts">
                <a href="mailto:${teacher.email}"><i class="fas fa-envelope"></i></a>
                <a href="#"><i class="fas fa-phone"></i></a>
                <a href="#"><i class="fas fa-calendar"></i></a>
            </div>
            <div class="teacher-footer">
                <span class="teacher-id">${teacher.id}</span>
                <div class="teacher-actions">
                    <button class="action-btn view" data-id="${teacher.id}"><i class="fas fa-eye"></i></button>
                    <button class="action-btn edit" data-id="${teacher.id}"><i class="fas fa-edit"></i></button>
                    <button class="action-btn delete" data-id="${teacher.id}"><i class="fas fa-trash"></i></button>
                </div>
            </div>
        `;
        teacherGrid.appendChild(card);
    });

    // Add event listeners to action buttons
    document.querySelectorAll('.action-btn.view').forEach(btn => {
        btn.addEventListener('click', viewTeacher);
    });
    
    document.querySelectorAll('.action-btn.edit').forEach(btn => {
        btn.addEventListener('click', editTeacher);
    });
    
    document.querySelectorAll('.action-btn.delete').forEach(btn => {
        btn.addEventListener('click', deleteTeacher);
    });
}

// Add Teacher Modal
addTeacherBtn.addEventListener('click', () => {
    modal.style.display = 'block';
});

closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// Handle form submission
teacherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const newTeacher = {
        id: 'TEA-' + (teachers.length + 1).toString().padStart(3, '0'),
        name: document.getElementById('teacherName').value,
        email: document.getElementById('teacherEmail').value,
        subject: document.getElementById('teacherSubject').value,
        classes: Array.from(document.querySelectorAll('input[name="teacherClasses"]:checked')).map(cb => cb.value),
        status: 'online',
        photo: 'images/avatar.jpg' // Default photo
    };
    
    // Handle photo upload if available
    const photoInput = document.getElementById('teacherPhoto');
    if (photoInput.files.length > 0) {
        const reader = new FileReader();
        reader.onload = function(e) {
            newTeacher.photo = e.target.result;
            addTeacherToSystem(newTeacher);
        };
        reader.readAsDataURL(photoInput.files[0]);
    } else {
        addTeacherToSystem(newTeacher);
    }
});

function addTeacherToSystem(teacher) {
    teachers.push(teacher);
    localStorage.setItem('teachers', JSON.stringify(teachers));
    renderTeacherCards();
    populateTeacherSelect();
    modal.style.display = 'none';
    teacherForm.reset();
    alert('Teacher added successfully!');
}

// View Teacher Details
function viewTeacher(e) {
    const teacherId = e.target.closest('button').dataset.id;
    const teacher = teachers.find(t => t.id === teacherId);
    
    alert(`Viewing Teacher:\n\nName: ${teacher.name}\nEmail: ${teacher.email}\nSubject: ${teacher.subject}\nClasses: ${teacher.classes.join(', ')}`);
}

// Edit Teacher
function editTeacher(e) {
    const teacherId = e.target.closest('button').dataset.id;
    const teacher = teachers.find(t => t.id === teacherId);
    
    // In a real app, this would open an edit form
    const newName = prompt("Edit teacher name:", teacher.name);
    if (newName && newName !== teacher.name) {
        teacher.name = newName;
        localStorage.setItem('teachers', JSON.stringify(teachers));
        renderTeacherCards();
        populateTeacherSelect();
    }
}

// Delete Teacher
function deleteTeacher(e) {
    if (confirm('Are you sure you want to delete this teacher?')) {
        const teacherId = e.target.closest('button').dataset.id;
        teachers = teachers.filter(t => t.id !== teacherId);
        localStorage.setItem('teachers', JSON.stringify(teachers));
        renderTeacherCards();
        populateTeacherSelect();
    }
}

// Search Teachers
teacherSearch.addEventListener('input', () => {
    const searchTerm = teacherSearch.value.toLowerCase();
    const filtered = teachers.filter(teacher => 
        teacher.name.toLowerCase().includes(searchTerm) || 
        teacher.subject.toLowerCase().includes(searchTerm) ||
        teacher.classes.some(c => c.toLowerCase().includes(searchTerm))
    );
    renderTeacherCards(filtered);
});

// Populate teacher select dropdown
function populateTeacherSelect() {
    teacherSelect.innerHTML = '<option value="">Select Teacher</option>';
    teachers.forEach(teacher => {
        const option = document.createElement('option');
        option.value = teacher.id;
        option.textContent = teacher.name;
        teacherSelect.appendChild(option);
    });
}

// Export Teachers
exportTeachersBtn.addEventListener('click', () => {
    const csvContent = "data:text/csv;charset=utf-8," +
        "ID,Name,Email,Subject,Classes\n" +
        teachers.map(t => 
            `${t.id},${t.name},${t.email},${t.subject},"${t.classes.join(', ')}"`
        ).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "kuencheng_teachers.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
});

// Timetable Functions
function initTimetable() {
    const timetableRows = document.getElementById('timetableRows');
    timetableRows.innerHTML = '';
    
    const times = ['8:00', '9:00', '10:00', '11:00', '12:00', '1:00', '2:00', '3:00'];
    
    times.forEach(time => {
        const timeSlot = document.createElement('div');
        timeSlot.className = 'timetable-time';
        timeSlot.textContent = time;
        timetableRows.appendChild(timeSlot);
        
        for (let i = 0; i < 5; i++) {
            const slot = document.createElement('div');
            slot.className = 'timetable-slot';
            slot.textContent = 'Free';
            timetableRows.appendChild(slot);
        }
    });
}

// Update timetable when teacher is selected
teacherSelect.addEventListener('change', function() {
    if (this.value) {
        const teacher = teachers.find(t => t.id === this.value);
        alert(`Timetable for ${teacher.name} would load here`);
        // In a real app, this would fetch the teacher's timetable
    }
});