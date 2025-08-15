const menuItems = [
    {
        id: 1,
        name: "Súper Deliciosa Hamburguesa",
        description: "Hamburguesa con carne jugosa, lechuga, tomate, cebolla y nuestra salsa especial",
        price: 10.50,
        category: "burgers",
        image: "img/b1.png"
    },
    {
        id: 2,
        name: "Arepa Burger",
        description: "Fusión venezolana: hamburguesa servida en arepa con queso y aguacate",
        price: 12.00,
        category: "burgers",
        image: "img/b2.png"
    },
    {
        id: 3,
        name: "Pepito Especial",
        description: "Pan francés con carne mechada, queso amarillo, aguacate y salsas",
        price: 9.50,
        category: "burgers",
        image: "img/b3.png"
    },
    {
        id: 4,
        name: "Patacones",
        description: "Plátano verde frito con queso rallado y hogao",
        price: 6.00,
        category: "sides",
        image: "img/b4.png"
    },
    {
        id: 5,
        name: "Yuca Frita",
        description: "Yuca dorada y crujiente con ajo y cilantro",
        price: 5.50,
        category: "sides",
        image: "img/b5.png"
    },
    {
        id: 6,
        name: "Tequeños",
        description: "Palitos de queso envueltos en masa y fritos hasta dorar",
        price: 8.00,
        category: "sides",
        image: "img/b6.png"
    },
    {
        id: 7,
        name: "Chicha de Arroz",
        description: "Bebida tradicional venezolana cremosa y refrescante",
        price: 4.00,
        category: "drinks",
        image: "img/b7.png"
    },
    {
        id: 9,
        name: "Jugo Natural",
        description: "Jugos frescos de frutas tropicales: mango, parchita, guayaba",
        price: 4.50,
        category: "drinks",
        image: "img/jugofrut.png"
    },
    {
        id: 10,
        name: "Pollo a la Parrilla",
        description: "Jugoso pollo asado con especias tradicionales",
        price: 11.00,
        category: "chicken",
        image: "img/topcard3.png" 
    },
    {
        id: 11,
        name: "Alitas Picantes",
        description: "Alitas de pollo bañadas en nuestra salsa picante especial",
        price: 9.00,
        category: "chicken",
        image: "img/p2.png"
    },
    // Nuevos items de pizza
    {
        id: 12,
        name: "Pizza Hawaiana",
        description: "Clásica pizza con piña, jamón y queso mozzarella",
        price: 14.00,
        category: "pizza",
        image: "img/topcard2.png"
    },
    {
        id: 13,
        name: "Pizza Especial",
        description: "Pizza con pepperoni, champiñones, pimientos y queso",
        price: 15.50,
        category: "pizza",
        image: "img/p1.png"
    }
];

// Carrito de compras
let cart = [];

// Elementos del DOM
const menuGrid = document.getElementById('menuGrid');
const cartSidebar = document.getElementById('cartSidebar');
const cartOverlay = document.getElementById('cartOverlay');
const cartItems = document.getElementById('cartItems');
const cartCount = document.getElementById('cartCount');
const cartTotal = document.getElementById('cartTotal');

// Inicializar la aplicación
document.addEventListener('DOMContentLoaded', function() {
    renderMenuItems('all');
    setupCategoryButtons();
    setupMobileMenu();
    updateCartUI();
});

// Mostrar productos del menú
function renderMenuItems(category) {
    const filteredItems = category === 'all' ? menuItems : menuItems.filter(item => item.category === category);
    
    menuGrid.innerHTML = filteredItems.map(item => `
        <div class="menu-item" data-category="${item.category}">
            <img src="${item.image}" alt="${item.name}" class="menu-item-image">
            <div class="menu-item-content">
                <h3 class="menu-item-title">${item.name}</h3>
                <p class="menu-item-description">${item.description}</p>
                <div class="menu-item-footer">
                    <span class="menu-item-price">$${item.price.toFixed(2)}</span>
                    <button class="add-to-cart-btn" onclick="addToCart(${item.id})">
                        <i class="fas fa-plus"></i> Agregar
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// Botones de categorías
function setupCategoryButtons() {
    const categoryButtons = document.querySelectorAll('.category-btn');
    
    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Quitar clase activa de todos los botones
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            // Agregar clase activa al botón clicado
            button.classList.add('active');
            
            // Filtrar productos
            const category = button.getAttribute('data-category');
            renderMenuItems(category);
        });
    });
}

// Menú móvil
function setupMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
    
    // Cerrar menú móvil al hacer clic en un enlace
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });
}

// Agregar producto al carrito
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
    
    updateCartUI();
    showAddToCartAnimation();
    
    // Notificación de ítem agregado
    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: '¡Agregado al carrito!',
        text: item.name,
        showConfirmButton: false,
        timer: 1500,
        toast: true,
        background: 'var(--white)',
        color: 'var(--text-color)'
    });
}

// Quitar producto del carrito
function removeFromCart(itemId) {
    const item = cart.find(item => item.id === itemId);
    
    Swal.fire({
        title: '¿Eliminar producto?',
        text: `¿Estás seguro de que quieres eliminar ${item.name} del carrito?`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: 'var(--primary-color)',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            cart = cart.filter(item => item.id !== itemId);
            updateCartUI();
            
            Swal.fire({
                icon: 'success',
                title: 'Producto eliminado',
                text: `${item.name} ha sido removido del carrito`,
                timer: 1500,
                showConfirmButton: false,
                toast: true,
                position: 'top-end'
            });
        }
    });
}

// Cambiar cantidad de producto
function updateQuantity(itemId, change) {
    const item = cart.find(cartItem => cartItem.id === itemId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(itemId);
        } else {
            updateCartUI();
        }
    }
}

// Actualizar interfaz del carrito
function updateCartUI() {
    // Actualizar contador
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    cartCount.style.display = totalItems > 0 ? 'flex' : 'none';
    
    // Actualizar total
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = total.toFixed(2);
    
    // Mostrar productos del carrito
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-cart" style="font-size: 3rem; margin-bottom: 1rem; opacity: 0.3;"></i>
                <p>Tu carrito está vacío</p>
                <p style="font-size: 0.9rem; margin-top: 0.5rem;">Agrega algunos productos deliciosos</p>
            </div>
        `;
    } else {
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                <div class="cart-item-details">
                    <div class="cart-item-title">${item.name}</div>
                    <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                    <div class="quantity-controls">
                        <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">
                            <i class="fas fa-minus"></i>
                        </button>
                        <span class="quantity">${item.quantity}</span>
                        <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">
                            <i class="fas fa-plus"></i>
                        </button>
                    </div>
                </div>
                <button class="remove-item" onclick="removeFromCart(${item.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `).join('');
    }
}

// Mostrar/ocultar carrito
function toggleCart() {
    cartSidebar.classList.toggle('open');
    cartOverlay.classList.toggle('open');
    document.body.style.overflow = cartSidebar.classList.contains('open') ? 'hidden' : 'auto';
}

function login(){
    window.location.href = "login.html";
}

// Animación al agregar al carrito
function showAddToCartAnimation() {
    const cartBtn = document.querySelector('.cart-btn');
    cartBtn.style.transform = 'scale(1.2)';
    cartBtn.style.color = 'var(--primary-color)';
    
    setTimeout(() => {
        cartBtn.style.transform = 'scale(1)';
        cartBtn.style.color = '';
    }, 200);
}

// Finalizar compra
function checkout() {
    if (cart.length === 0) {
        Swal.fire({
            icon: 'info',
            title: 'Carrito vacío',
            text: 'Tu carrito está vacío',
            confirmButtonText: 'Entendido',
            confirmButtonColor: 'var(--primary-color)'
        });
        return;
    }
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    Swal.fire({
        icon: 'success',
        title: '¡Gracias por tu pedido!',
        html: `
            <div style="text-align: left; margin: 1rem 0;">
                <p><strong>Resumen:</strong></p>
                <p>${itemCount} productos</p>
                <p>Total: $${total.toFixed(2)}</p>
            </div>
            <p>En breve nos pondremos en contacto contigo para confirmar tu pedido.</p>
        `,
        confirmButtonText: '¡Genial!',
        confirmButtonColor: 'var(--primary-color)'
    }).then(() => {
        // Vaciar carrito
        cart = [];
        updateCartUI();
        toggleCart();
    });
}

// Ir a la sección del menú
function scrollToMenu() {
    document.getElementById('menu').scrollIntoView({
        behavior: 'smooth'
    });
}

// Desplazamiento suave para los enlaces de navegación
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Efecto de scroll en el encabezado
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.background = 'var(--white)';
        header.style.backdropFilter = 'none';
    }
});

// Animación de carga para los productos del menú
function addLoadingAnimation() {
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            item.style.transition = 'all 0.5s ease';
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// Llamar animación de carga después de cargar el DOM
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(addLoadingAnimation, 100);
});