// Script para funcionalidades interactivas

document.addEventListener('DOMContentLoaded', function() {
    // Botón de contacto flotante
    const floatingBtn = document.querySelector('.floating-contact-btn');
    floatingBtn.addEventListener('click', function() {
        document.querySelector('#contacto').scrollIntoView({ 
            behavior: 'smooth' 
        });
    });

    // Botón de contacto en navegación
    const navContactBtn = document.querySelector('.nav-contact-btn');
    if (navContactBtn) {
        navContactBtn.addEventListener('click', function() {
            document.querySelector('#contacto').scrollIntoView({ 
                behavior: 'smooth' 
            });
        });
    }

    // Formulario de contacto
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Obtener valores del formulario
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // Validación simple
            if (!name || !email || !message) {
                showNotification('Por favor, completa todos los campos.', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('Por favor, introduce un email válido.', 'error');
                return;
            }
            
            // Simular envío (en un caso real, aquí iría una petición AJAX)
            showNotification(`¡Gracias ${name}! Tu mensaje ha sido enviado. Te responderé pronto a ${email}.`, 'success');
            
            // Resetear formulario
            contactForm.reset();
        });
    }

    // Animación de elementos al hacer scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observar elementos para animación
    document.querySelectorAll('.skill-category, .stat-card, .social-link').forEach(el => {
        observer.observe(el);
    });

    // Efecto de navegación activa al hacer scroll
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
        
        // Efecto en navbar al hacer scroll
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
            navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
        } else {
            navbar.style.boxShadow = 'var(--shadow-sm)';
            navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        }
    });

    // Funciones auxiliares
    function isValidEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    function showNotification(message, type) {
        // Crear elemento de notificación
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        // Estilos para la notificación
        notification.style.position = 'fixed';
        notification.style.top = '20px';
        notification.style.right = '20px';
        notification.style.padding = '16px 24px';
        notification.style.borderRadius = '8px';
        notification.style.color = 'white';
        notification.style.fontWeight = '500';
        notification.style.zIndex = '10000';
        notification.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
        notification.style.transform = 'translateX(120%)';
        notification.style.transition = 'transform 0.3s ease';
        
        if (type === 'success') {
            notification.style.backgroundColor = '#10B981';
        } else {
            notification.style.backgroundColor = '#EF4444';
        }
        
        document.body.appendChild(notification);
        
        // Animar entrada
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 10);
        
        // Remover después de 4 segundos
        setTimeout(() => {
            notification.style.transform = 'translateX(120%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 4000);
    }

    // Añadir clase activa al primer enlace de navegación
    if (navLinks.length > 0) {
        navLinks[0].classList.add('active');
    }
    
    // Añadir estilos para animación de entrada
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            animation: fadeInUp 0.6s ease forwards;
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .nav-link.active {
            color: var(--primary-color);
        }
        
        .nav-link.active::after {
            width: 100%;
        }
        
        .skill-category, .stat-card, .social-link {
            opacity: 0;
        }
    `;
    document.head.appendChild(style);
});