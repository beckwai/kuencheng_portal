// Filter resources by category
function filterResources(category) {
    const resources = document.querySelectorAll('.resource-card');
    const sectionTitle = document.querySelector('.section-title');
    
    resources.forEach(resource => {
        const resourceType = resource.querySelector('.resource-type').classList;
        
        if (category === 'all') {
            resource.style.display = 'block';
            sectionTitle.textContent = 'All Resources';
        } else if (
            (category === 'textbooks' && resourceType.contains('textbook')) ||
            (category === 'papers' && resourceType.contains('paper')) ||
            (category === 'guides' && resourceType.contains('guide')) ||
            (category === 'videos' && resourceType.contains('video'))
        ) {
            resource.style.display = 'block';
        } else {
            resource.style.display = 'none';
        }
    });
    
    // Update section title based on filter
    if (category !== 'all') {
        sectionTitle.textContent = `${category.charAt(0).toUpperCase() + category.slice(1)} Resources`;
    }
}

// Search functionality
document.querySelector('.search-bar input').addEventListener('input', function() {
    const searchTerm = this.value.toLowerCase();
    const resources = document.querySelectorAll('.resource-card');
    
    resources.forEach(resource => {
        const title = resource.querySelector('h3').textContent.toLowerCase();
        const description = resource.querySelector('p').textContent.toLowerCase();
        const subject = resource.querySelector('.resource-subject').textContent.toLowerCase();
        
        if (title.includes(searchTerm) || description.includes(searchTerm) || subject.includes(searchTerm)) {
            resource.style.display = 'block';
        } else {
            resource.style.display = 'none';
        }
    });
});

// Category dropdown filter
document.querySelector('.search-bar select').addEventListener('change', function() {
    const category = this.value.toLowerCase().replace(' ', '');
    if (category === 'allcategories') {
        filterResources('all');
    } else {
        filterResources(category);
    }
});
