document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form');
    
    loginForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const formData = new FormData(loginForm);
        const username = formData.get('inputEmail');
        const password = formData.get('inputPassword');
        
        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });
            
            if (response.ok) {
                window.location.href = '/api/dashboard';  
            } else {
                
                const errorText = await response.text();
                const errorContainer = document.getElementById('error-container');
                errorContainer.innerHTML = errorText; 
                errorContainer.style.display = 'block'; 
            }
        } catch (error) {
            console.error('Login failed:', error);
        }
    });
});
