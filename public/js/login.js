document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const togglePassword = document.getElementById('togglePassword');
    const passwordInput = document.getElementById('password');
    const loadingSpinner = document.getElementById('loadingSpinner');
    const btnText = document.querySelector('.btn-text');
    const successModal = document.getElementById('successModal');

    // Toggle password visibility
    togglePassword.addEventListener('click', function() {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        
        // Change icon
        const icon = type === 'password' ? 
            '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle>' :
            '<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line>';
        
        togglePassword.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">${icon}</svg>`;
    });

    // Form validation
    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email) || email.length >= 3; // Allow username or email
    }

    function validatePassword(password) {
        return password.length >= 6;
    }

    function showError(fieldId, message) {
        const errorElement = document.getElementById(fieldId + 'Error');
        const inputElement = document.getElementById(fieldId);
        
        errorElement.textContent = message;
        errorElement.style.display = 'block';
        inputElement.style.borderColor = '#dc3545';
        inputElement.style.boxShadow = '0 0 0 3px rgba(220, 53, 69, 0.1)';
    }

    function clearError(fieldId) {
        const errorElement = document.getElementById(fieldId + 'Error');
        const inputElement = document.getElementById(fieldId);
        
        errorElement.style.display = 'none';
        inputElement.style.borderColor = '#e9ecef';
        inputElement.style.boxShadow = 'none';
    }

    // Real-time validation
    document.getElementById('email').addEventListener('input', function() {
        if (this.value.trim() === '') {
            clearError('email');
        } else if (!validateEmail(this.value)) {
            showError('email', 'Ingresa un email válido o usuario de al menos 3 caracteres');
        } else {
            clearError('email');
        }
    });

    document.getElementById('password').addEventListener('input', function() {
        if (this.value === '') {
            clearError('password');
        } else if (!validatePassword(this.value)) {
            showError('password', 'La contraseña debe tener al menos 6 caracteres');
        } else {
            clearError('password');
        }
    });

    // Form submission
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;
        const remember = document.getElementById('remember').checked;
        
        let isValid = true;

        // Validate email
        if (!email) {
            showError('email', 'Este campo es requerido');
            isValid = false;
        } else if (!validateEmail(email)) {
            showError('email', 'Ingresa un email válido o usuario de al menos 3 caracteres');
            isValid = false;
        } else {
            clearError('email');
        }

        // Validate password
        if (!password) {
            showError('password', 'Este campo es requerido');
            isValid = false;
        } else if (!validatePassword(password)) {
            showError('password', 'La contraseña debe tener al menos 6 caracteres');
            isValid = false;
        } else {
            clearError('password');
        }

        if (isValid) {
            // Show loading state
            btnText.style.display = 'none';
            loadingSpinner.style.display = 'block';
            loginForm.querySelector('.login-btn').disabled = true;

            // Simulate API call
            setTimeout(() => {
                console.log('[v0] Login attempt:', { email, password, remember });
                
                // Simulate successful login
                if (email && password) {
                    // Store login state if remember is checked
                    if (remember) {
                        localStorage.setItem('rememberedUser', email);
                    }
                    
                    // Hide loading state
                    btnText.style.display = 'block';
                    loadingSpinner.style.display = 'none';
                    loginForm.querySelector('.login-btn').disabled = false;
                    
                    // Show success modal
                    successModal.style.display = 'flex';
                    
                    // Reset form
                    loginForm.reset();
                } else {
                    // Handle error case
                    btnText.style.display = 'block';
                    loadingSpinner.style.display = 'none';
                    loginForm.querySelector('.login-btn').disabled = false;
                    
                    showError('password', 'Credenciales incorrectas');
                }
            }, 2000);
        }
    });

    // Social login buttons
    document.querySelector('.google-btn').addEventListener('click', function() {
        console.log('[v0] Google login clicked');
        alert('Funcionalidad de Google login en desarrollo');
    });

    document.querySelector('.facebook-btn').addEventListener('click', function() {
        console.log('[v0] Facebook login clicked');
        alert('Funcionalidad de Facebook login en desarrollo');
    });

    // Load remembered user
    const rememberedUser = localStorage.getItem('rememberedUser');
    if (rememberedUser) {
        document.getElementById('email').value = rememberedUser;
        document.getElementById('remember').checked = true;
    }

    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }
});

// Close modal function
function closeModal() {
    const successModal = document.getElementById('successModal');
    successModal.style.display = 'none';
    
    // Redirect to main page or dashboard
    console.log('[v0] Redirecting to main page');
    // window.location.href = 'index.html';
}

// Close modal when clicking outside
window.addEventListener('click', function(e) {
    const successModal = document.getElementById('successModal');
    if (e.target === successModal) {
        closeModal();
    }
});