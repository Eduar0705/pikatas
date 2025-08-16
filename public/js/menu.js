// Menu data
const menuItems = [
    {
        id: 1,
        name: "Súper Deliciosa Hamburguesa",
        description: "Hamburguesa con carne jugosa, lechuga, tomate, cebolla y nuestra salsa especial",
        price: 10.50,
        category: "burgers",
        image: "img/burger.png"
    },
    {
        id: 2,
        name: "Pepito Especial",
        description: "Pan francés con carne mechada, queso amarillo, aguacate y salsas",
        price: 9.50,
        category: "burgers",
        image: "img/pepito.png"
    },
    {
        id: 3,
        name: "Patacones",
        description: "Plátano verde frito con queso rallado y hogao",
        price: 6.00,
        category: "sides",
        image: "img/patacones.png"
    },
    {
        id: 4,
        name: "Yuca Frita",
        description: "Yuca dorada y crujiente con ajo y cilantro",
        price: 5.50,
        category: "sides",
        image: "img/yuca.png"
    },
    {
        id: 5,
        name: "Tequeños",
        description: "Palitos de queso envueltos en masa y fritos hasta dorar",
        price: 8.00,
        category: "sides",
        image: "img/tequeño.png"
    },
    {
        id: 6,
        name: "Jugo Natural",
        description: "Jugos frescos de frutas tropicales: mango, parchita, guayaba",
        price: 4.50,
        category: "drinks",
        image: "img/jugofrut.png"
    },
    {
        id: 7,
        name: "Pollo a la Parrilla",
        description: "Jugoso pollo asado con especias tradicionales",
        price: 11.00,
        category: "chicken",
        image: "img/topcard3.png" 
    },
    {
        id: 8,
        name: "Alitas Picantes",
        description: "Alitas de pollo bañadas en nuestra salsa picante especial",
        price: 9.00,
        category: "chicken",
        image: "img/p2.png"
    },
    {
        id: 9,
        name: "Pizza Hawaiana",
        description: "Clásica pizza con piña, jamón y queso mozzarella",
        price: 14.00,
        category: "pizza",
        image: "img/topcard2.png"
    },
    {
        id: 10,
        name: "Pizza Especial",
        description: "Pizza con pepperoni, champiñones, pimientos y queso",
        price: 15.50,
        category: "pizza",
        image: "img/p1.png"
    }
];

// Cart functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let currentCategory = 'all';

// DOM elements
const menuGrid = document.getElementById('menuGrid');
const cartCount = document.getElementById('cartCount');
const cartSidebar = document.getElementById('cartSidebar');
const cartOverlay = document.getElementById('cartOverlay');
const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');
const successModal = document.getElementById('successModal');
const successMessage = document.getElementById('successMessage');

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    renderMenuItems();
    updateCartUI();
    setupEventListeners();
    setupAnimations();
});


// Setup event listeners
function setupEventListeners() {
    // Category filters
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            currentCategory = this.dataset.category;
            renderMenuItems();
        });
    });

    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }
}

// Render menu items
function renderMenuItems() {
    const filteredItems = currentCategory === 'all' 
        ? menuItems 
        : menuItems.filter(item => item.category === currentCategory);

    menuGrid.innerHTML = filteredItems.map(item => `
        <div class="menu-card" data-category="${item.category}">
            ${item.badge ? `<div class="card-badge">${item.badge}</div>` : ''}
            <img src="${item.image}" alt="${item.name}" class="card-image">
            <div class="card-content">
                <h3 class="card-title">${item.name}</h3>
                <p class="card-description">${item.description}</p>
                <div class="card-footer">
                    <span class="card-price">$${item.price.toFixed(2)}</span>
                    <button class="add-to-cart" onclick="addToCart(${item.id})">
                        <i class="fas fa-plus"></i>
                        Agregar
                    </button>
                </div>
            </div>
        </div>
    `).join('');

    // Trigger animations
    setTimeout(() => {
        const cards = document.querySelectorAll('.menu-card');
        cards.forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('visible');
            }, index * 100);
        });
    }, 100);
}

// Add to cart
function addToCart(itemId) {
    const item = menuItems.find(item => item.id === itemId);
    const existingItem = cart.find(cartItem => cartItem.id === itemId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...item,
            quantity: 1
        });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartUI();
    showSuccessModal(item.name);
}

// Remove from cart
function removeFromCart(itemId) {
    const item = cart.find(item => item.id === itemId);
    
    Swal.fire({
        title: '¿Estás seguro?',
        text: `¿Quieres eliminar ${item.name} del carrito?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            cart = cart.filter(item => item.id !== itemId);
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartUI();
            
            Swal.fire(
                'Eliminado',
                'El artículo ha sido eliminado del carrito.',
                'success'
            );
        }
    });
}

// Update quantity
function updateQuantity(itemId, change) {
    const item = cart.find(cartItem => cartItem.id === itemId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(itemId);
        } else {
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartUI();
        }
    }
}

// Update cart UI
function updateCartUI() {
    // Update cart count
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;

    // Update cart items
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-cart"></i>
                <p>Tu carrito está vacío</p>
            </div>
        `;
    } else {
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                <div class="cart-item-details">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                    <div class="quantity-controls">
                        <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">
                            <i class="fas fa-minus"></i>
                        </button>
                        <span class="quantity">${item.quantity}</span>
                        <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">
                            <i class="fas fa-plus"></i>
                        </button>
                        <button class="remove-item" onclick="removeFromCart(${item.id})">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
    }

    // Update total
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = total.toFixed(2);
}

// Toggle cart
function toggleCart() {
    cartSidebar.classList.toggle('active');
    cartOverlay.classList.toggle('active');
    document.body.style.overflow = cartSidebar.classList.contains('active') ? 'hidden' : 'auto';
}

// Show success modal
function showSuccessModal(itemName) {
    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: `${itemName} ha sido agregado al carrito`,
        showConfirmButton: false,
        timer: 1500,
        toast: true
    });
}

// Close modal
function closeModal() {
    successModal.classList.remove('active');
}

// Checkout
function checkout() {
    if (cart.length === 0) {
        Swal.fire({
            icon: 'info',
            title: 'Carrito vacío',
            text: 'Tu carrito está vacío. Agrega algunos artículos antes de continuar.',
            confirmButtonColor: '#3085d6',
        });
        return;
    }
    
    Swal.fire({
        title: '¿Confirmar pedido?',
        text: '¿Estás listo para realizar tu pedido?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, confirmar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            cart = [];
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartUI();
            toggleCart();
            
            Swal.fire(
                '¡Pedido realizado!',
                'Gracias por tu compra. Te contactaremos pronto para confirmar tu orden.',
                'success'
            );
        }
    });
}

// Setup animations
function setupAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.fade-in');
    animatedElements.forEach(el => observer.observe(el));
}

// Close cart when clicking outside
document.addEventListener('click', function(e) {
    if (!cartSidebar.contains(e.target) && !e.target.closest('.cart-toggle')) {
        if (cartSidebar.classList.contains('active')) {
            toggleCart();
        }
    }
});

// Close modal when clicking outside
successModal.addEventListener('click', function(e) {
    if (e.target === successModal) {
        closeModal();
    }
});