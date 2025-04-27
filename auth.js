document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    // Simple validation (replace with real authentication)
    if(username === 'teacher' && password === 'kuencheng123') {
        // Show loading state
        const button = e.target.querySelector('button');
        button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Logging in...';
        button.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            // Store user session
            localStorage.setItem('isAuthenticated', 'true');
            localStorage.setItem('username', username);
            
            // Redirect to dashboard
            window.location.href = 'dashboard.html';
        }, 1500);
    } else {
        alert('Invalid credentials! Try:\nUsername: teacher\nPassword: kuencheng123');
    }
});

// Check if user is already logged in
if(localStorage.getItem('isAuthenticated') === 'true') {
    window.location.href = 'dashboard.html';
}