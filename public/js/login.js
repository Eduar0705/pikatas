document.addEventListener("DOMContentLoaded", () => {
  // Elements
  const loginForm = document.getElementById("loginForm")
  const emailInput = document.getElementById("email")
  const passwordInput = document.getElementById("password")
  const togglePassword = document.getElementById("togglePassword")
  const loginBtn = document.getElementById("loginBtn")
  const successModal = document.getElementById("successModal")
  const closeModal = document.getElementById("closeModal")
  const hamburger = document.querySelector(".hamburger")
  const navMenu = document.querySelector(".nav-menu")

  // Mobile menu toggle
  hamburger?.addEventListener("click", () => {
    navMenu.classList.toggle("active")
    hamburger.classList.toggle("active")
  })

  // Toggle password visibility
  togglePassword.addEventListener("click", function () {
    const type = passwordInput.getAttribute("type") === "password" ? "text" : "password"
    passwordInput.setAttribute("type", type)

    const icon = this.querySelector("i")
    icon.classList.toggle("fa-eye")
    icon.classList.toggle("fa-eye-slash")
  })

  // Form validation
  function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  function validatePassword(password) {
    return password.length >= 6
  }

  function showError(input, message) {
    const errorElement = document.getElementById(input.id + "Error")
    input.classList.add("error")
    errorElement.textContent = message
    errorElement.classList.add("show")
  }

  function clearError(input) {
    const errorElement = document.getElementById(input.id + "Error")
    input.classList.remove("error")
    errorElement.textContent = ""
    errorElement.classList.remove("show")
  }

  // Real-time validation
  emailInput.addEventListener("input", function () {
    if (this.value && !validateEmail(this.value)) {
      showError(this, "Por favor ingresa un email válido")
    } else {
      clearError(this)
    }
  })

  passwordInput.addEventListener("input", function () {
    if (this.value && !validatePassword(this.value)) {
      showError(this, "La contraseña debe tener al menos 6 caracteres")
    } else {
      clearError(this)
    }
  })

  // Form submission
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault()

    const email = emailInput.value.trim()
    const password = passwordInput.value.trim()
    let isValid = true

    // Clear previous errors
    clearError(emailInput)
    clearError(passwordInput)

    // Validate email
    if (!email) {
      showError(emailInput, "El email es requerido")
      isValid = false
    } else if (!validateEmail(email)) {
      showError(emailInput, "Por favor ingresa un email válido")
      isValid = false
    }

    // Validate password
    if (!password) {
      showError(passwordInput, "La contraseña es requerida")
      isValid = false
    } else if (!validatePassword(password)) {
      showError(passwordInput, "La contraseña debe tener al menos 6 caracteres")
      isValid = false
    }

    if (isValid) {
      // Show loading state
      loginBtn.classList.add("loading")

      // Simulate API call
      setTimeout(() => {
        loginBtn.classList.remove("loading")

        // Store user session (in real app, this would be handled by backend)
        localStorage.setItem("userLoggedIn", "true")
        localStorage.setItem("userEmail", email)

        // Show success modal
        successModal.classList.add("show")
      }, 2000)
    }
  })

  // Close modal and redirect
  closeModal.addEventListener("click", () => {
    successModal.classList.remove("show")

    // Redirect to main page after a short delay
    setTimeout(() => {
      window.location.href = "index.html"
    }, 300)
  })

  // Social login buttons
  document.querySelector(".google-btn").addEventListener("click", () => {
    console.log("[v0] Google login clicked")
    alert("Funcionalidad de Google login en desarrollo")
  })

  document.querySelector(".facebook-btn").addEventListener("click", () => {
    console.log("[v0] Facebook login clicked")
    alert("Funcionalidad de Facebook login en desarrollo")
  })

  // Signup link
  document.getElementById("signupLink").addEventListener("click", (e) => {
    e.preventDefault()
    console.log("[v0] Signup link clicked")
    alert("Página de registro en desarrollo")
  })

  // Forgot password link
  document.querySelector(".forgot-password").addEventListener("click", (e) => {
    e.preventDefault()
    console.log("[v0] Forgot password clicked")
    alert("Funcionalidad de recuperar contraseña en desarrollo")
  })

  // Check if user is already logged in
  if (localStorage.getItem("userLoggedIn") === "true") {
    console.log("[v0] User already logged in")
  }

  // Add smooth animations on page load
  setTimeout(() => {
    document.querySelector(".login-card").style.opacity = "1"
    document.querySelector(".login-card").style.transform = "translateY(0)"
  }, 100)
})
