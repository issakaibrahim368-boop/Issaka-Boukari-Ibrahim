// main.js - Script principal pour Quartet Store

// Menu mobile
const menuBtn = document.getElementById('menuBtn');
const mainNav = document.getElementById('mainNav');

if (menuBtn && mainNav) {
    menuBtn.addEventListener('click', () => {
        mainNav.classList.toggle('open');
        menuBtn.classList.toggle('active');
       
        // Créer ou supprimer l'overlay
        let overlay = document.querySelector('.nav-overlay');
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.className = 'nav-overlay';
            document.body.appendChild(overlay);
        }
       
        overlay.classList.toggle('active');
       
        // Fermer le menu en cliquant sur l'overlay
        overlay.addEventListener('click', () => {
            mainNav.classList.remove('open');
            menuBtn.classList.remove('active');
            overlay.classList.remove('active');
        });
    });
}

// Mettre à jour l'année dans le footer
const yearElement = document.getElementById('year');
if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}

// Animation au scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observer les éléments à animer
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.product-card, .hero-text, .hero-image');
   
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Gestion des boutons de filtre (au cas où)
document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const products = document.querySelectorAll('.product-card');
   
    if (filterButtons.length > 0 && products.length > 0) {
        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const category = btn.getAttribute('data-category');
               
                // Retirer la classe active de tous les boutons
                filterButtons.forEach(b => b.classList.remove('active'));
                // Ajouter la classe active au bouton cliqué
                btn.classList.add('active');
               
                products.forEach(product => {
                    if (category === 'all' || product.getAttribute('data-category') === category) {
                        product.style.display = 'block';
                        setTimeout(() => {
                            product.style.opacity = '1';
                            product.style.transform = 'translateY(0)';
                        }, 50);
                    } else {
                        product.style.opacity = '0';
                        product.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            product.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }
});

// Smooth scroll pour les ancres
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

// Chargement progressif des images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}