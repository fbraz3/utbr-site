/**
 * MODERN UTBR SITE - JavaScript
 * Modern, performant and accessible JavaScript for UTBR community site
 */

class UTBRSite {
    constructor() {
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupScrollEffects();
        this.setupNavigation();
        this.setupLoader();
        this.setupLazyLoading();
        this.setupAnimations();
        this.setupServerTracking();
        this.setupPerformanceOptimizations();
    }

    setupEventListeners() {
        // DOM Content Loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.onDOMReady());
        } else {
            this.onDOMReady();
        }

        // Window events
        window.addEventListener('scroll', this.throttle(this.onScroll.bind(this), 16));
        window.addEventListener('resize', this.debounce(this.onResize.bind(this), 250));
        window.addEventListener('load', () => this.onWindowLoad());

        // Back to top button
        const backToTopBtn = document.getElementById('back-to-top');
        if (backToTopBtn) {
            backToTopBtn.addEventListener('click', () => this.scrollToTop());
        }

        // Mobile navigation toggle
        const navToggle = document.getElementById('nav-toggle');
        const navMenu = document.getElementById('nav-menu');
        
        if (navToggle && navMenu) {
            navToggle.addEventListener('click', () => this.toggleMobileMenu());
        }

        // Smooth scroll for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => this.handleSmoothScroll(e));
        });

        // Game card interactions
        document.querySelectorAll('.game-card').forEach(card => {
            card.addEventListener('mouseenter', () => this.onGameCardHover(card));
            card.addEventListener('mouseleave', () => this.onGameCardLeave(card));
        });

        // Error handling for images
        document.querySelectorAll('img').forEach(img => {
            img.addEventListener('error', (e) => this.handleImageError(e));
        });

        // Sponsor link tracking
        document.querySelectorAll('[href*="github.com/sponsors"]').forEach(link => {
            link.addEventListener('click', () => this.trackSponsorClick(link));
        });
    }

    onDOMReady() {
        console.log('🎮 UTBR Site initialized');
        this.setupAccessibility();
        this.preloadCriticalImages();
    }

    onWindowLoad() {
        this.hideLoader();
        this.revealElements();
    }

    onScroll() {
        this.updateNavbarOnScroll();
        this.updateBackToTopButton();
        this.revealElementsOnScroll();
    }

    onResize() {
        this.updateViewportHeight();
        this.closeMobileMenuOnResize();
    }

    // Navigation
    setupNavigation() {
        this.updateActiveNavLink();
        window.addEventListener('scroll', this.throttle(() => {
            this.updateActiveNavLink();
        }, 100));
    }

    updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let currentSection = '';
        const scrollPosition = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }

    updateNavbarOnScroll() {
        const navbar = document.querySelector('.navbar');
        if (!navbar) return;

        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    toggleMobileMenu() {
        const navToggle = document.getElementById('nav-toggle');
        const navMenu = document.getElementById('nav-menu');
        
        if (navToggle && navMenu) {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Prevent body scroll when menu is open
            if (navMenu.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        }
    }

    closeMobileMenuOnResize() {
        if (window.innerWidth > 768) {
            const navToggle = document.getElementById('nav-toggle');
            const navMenu = document.getElementById('nav-menu');
            
            if (navToggle && navMenu) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        }
    }

    handleSmoothScroll(e) {
        const href = e.currentTarget.getAttribute('href');
        
        if (href.startsWith('#')) {
            e.preventDefault();
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                const navMenu = document.getElementById('nav-menu');
                const navToggle = document.getElementById('nav-toggle');
                if (navMenu && navMenu.classList.contains('active')) {
                    navToggle.classList.remove('active');
                    navMenu.classList.remove('active');
                    document.body.style.overflow = '';
                }
            }
        }
    }

    // Loader
    setupLoader() {
        const loader = document.getElementById('page-loader');
        if (loader) {
            // Minimum loading time for smooth UX
            setTimeout(() => {
                if (document.readyState === 'complete') {
                    this.hideLoader();
                }
            }, 1000);
        }
    }

    hideLoader() {
        const loader = document.getElementById('page-loader');
        if (loader) {
            loader.classList.add('hidden');
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        }
    }

    // Scroll Effects
    setupScrollEffects() {
        this.updateViewportHeight();
    }

    updateViewportHeight() {
        // Fix for mobile viewport height
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }

    updateBackToTopButton() {
        const backToTopBtn = document.getElementById('back-to-top');
        if (!backToTopBtn) return;

        if (window.scrollY > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    }

    scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    // Lazy Loading
    setupLazyLoading() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        const src = img.dataset.src;
                        
                        if (src) {
                            img.src = src;
                            img.classList.add('loaded');
                            observer.unobserve(img);
                        }
                    }
                });
            });

            document.querySelectorAll('img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });
        } else {
            // Fallback for older browsers
            document.querySelectorAll('img[data-src]').forEach(img => {
                img.src = img.dataset.src;
            });
        }
    }

    // Animations
    setupAnimations() {
        if ('IntersectionObserver' in window) {
            const revealObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('active');
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            });

            document.querySelectorAll('.reveal').forEach(el => {
                revealObserver.observe(el);
            });
        }
    }

    revealElements() {
        // Add reveal class to elements that should animate on scroll
        const elementsToReveal = [
            '.game-card',
            '.server-card',
            '.community-card',
            '.tip-card'
        ];

        elementsToReveal.forEach(selector => {
            document.querySelectorAll(selector).forEach((el, index) => {
                el.classList.add('reveal');
                el.style.transitionDelay = `${index * 0.1}s`;
            });
        });
    }

    revealElementsOnScroll() {
        const reveals = document.querySelectorAll('.reveal:not(.active)');
        
        reveals.forEach(reveal => {
            const windowHeight = window.innerHeight;
            const elementTop = reveal.getBoundingClientRect().top;
            const elementVisible = 150;

            if (elementTop < windowHeight - elementVisible) {
                reveal.classList.add('active');
            }
        });
    }

    // Game Card Interactions
    onGameCardHover(card) {
        // Add subtle glow effect
        card.style.boxShadow = '0 20px 40px rgba(255, 107, 53, 0.3)';
    }

    onGameCardLeave(card) {
        // Remove glow effect
        card.style.boxShadow = '';
    }

    // Error Handling
    handleImageError(e) {
        const img = e.target;
        const fallbackSrc = 'img/pageload-spinner.gif';
        
        if (img.src !== fallbackSrc) {
            img.src = fallbackSrc;
            img.alt = 'Image not available';
        }
    }

    // Accessibility
    setupAccessibility() {
        // Add focus indicators for keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                document.body.classList.add('keyboard-navigation');
            }
        });

        document.addEventListener('mousedown', () => {
            document.body.classList.remove('keyboard-navigation');
        });

        // Add ARIA labels where needed
        this.improveAccessibility();
    }

    improveAccessibility() {
        // Add aria-current to active nav link
        const activeNavLink = document.querySelector('.nav-link.active');
        if (activeNavLink) {
            activeNavLink.setAttribute('aria-current', 'page');
        }

        // Add loading states for server banners
        document.querySelectorAll('.server-banner img').forEach(img => {
            img.setAttribute('aria-label', 'Server status banner');
        });
    }

    // Performance Optimizations
    setupPerformanceOptimizations() {
        // Preload critical resources
        this.preloadCriticalResources();
        
        // Setup resource hints
        this.setupResourceHints();
        
        // Monitor performance
        this.monitorPerformance();
    }

    preloadCriticalImages() {
        const criticalImages = [
            'img/Character_Samael01a-937x900-1131282575-937x900-1585229315.png',
            'img/5ea7a9b9c479e.png'
        ];

        criticalImages.forEach(src => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'image';
            link.href = src;
            document.head.appendChild(link);
        });
    }

    preloadCriticalResources() {
        // Preload fonts
        const fontLink = document.createElement('link');
        fontLink.rel = 'preload';
        fontLink.as = 'font';
        fontLink.href = 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiJ-Ek-_EeA.woff2';
        fontLink.crossOrigin = 'anonymous';
        document.head.appendChild(fontLink);
    }

    setupResourceHints() {
        // DNS prefetch for external resources
        const dnsHints = [
            'https://fonts.googleapis.com',
            'https://fonts.gstatic.com',
            'https://kit.fontawesome.com',
            'https://cache.gametracker.com'
        ];

        dnsHints.forEach(url => {
            const link = document.createElement('link');
            link.rel = 'dns-prefetch';
            link.href = url;
            document.head.appendChild(link);
        });
    }

    monitorPerformance() {
        // Web Vitals monitoring
        if ('web-vital' in window) {
            // This would be implemented with a proper web vitals library
            console.log('🔍 Performance monitoring active');
        }

        // Log load time
        window.addEventListener('load', () => {
            const loadTime = performance.now();
            console.log(`⚡ Site loaded in ${Math.round(loadTime)}ms`);
        });
    }

    // Utility Functions
    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    debounce(func, wait, immediate) {
        let timeout;
        return function() {
            const context = this;
            const args = arguments;
            const later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    }

    // Service Worker Registration
    registerServiceWorker() {
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                navigator.serviceWorker.register('/sw.js')
                    .then(registration => {
                        console.log('📱 Service Worker registered:', registration);
                    })
                    .catch(error => {
                        console.log('❌ Service Worker registration failed:', error);
                    });
            });
        }
    }

    // Dark/Light Mode Toggle (for future implementation)
    setupThemeToggle() {
        const savedTheme = localStorage.getItem('utbr-theme');
        if (savedTheme) {
            document.documentElement.setAttribute('data-theme', savedTheme);
        }
    }

    // Analytics (Privacy-focused)
    trackEvent(event, data = {}) {
        // Simple privacy-focused analytics
        if (window.gtag) {
            window.gtag('event', event, data);
        }
    }

    // Sponsor link tracking
    trackSponsorClick(link) {
        console.log('💖 Thank you for supporting UTBR!');
        this.trackEvent('sponsor_click', {
            location: link.classList.contains('sponsor-link') ? 'navbar' : 'footer'
        });
    }

    // Easter Eggs for the gaming community
    setupServerTracking() {
        // Track server banner clicks for analytics
        const serverLinks = document.querySelectorAll('.server-banner a');
        
        serverLinks.forEach((link, index) => {
            link.addEventListener('click', (e) => {
                const serverName = link.closest('.server-card')?.querySelector('h3')?.textContent || `Server ${index + 1}`;
                
                // Optional: Send to analytics (Google Analytics, etc.)
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'server_click', {
                        event_category: 'engagement',
                        event_label: serverName,
                        value: 1
                    });
                }
                
                // Console log for debugging
                console.log(`🎮 Server clicked: ${serverName}`);
                
                // Add visual feedback for mobile
                this.addClickFeedback(link);
            });
        });
    }

    addClickFeedback(element) {
        // Add temporary visual feedback for better UX
        element.style.transform = 'scale(0.95)';
        element.style.opacity = '0.8';
        
        setTimeout(() => {
            element.style.transform = '';
            element.style.opacity = '';
        }, 150);
    }

    setupEasterEggs() {
        // Konami Code
        let konamiCode = [];
        const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // ↑↑↓↓←→←→BA
        
        document.addEventListener('keydown', (e) => {
            konamiCode.push(e.keyCode);
            if (konamiCode.length > konamiSequence.length) {
                konamiCode.shift();
            }
            
            if (JSON.stringify(konamiCode) === JSON.stringify(konamiSequence)) {
                this.activateEasterEgg();
                konamiCode = [];
            }
        });
    }

    activateEasterEgg() {
        // Show "GODLIKE!" message or similar UT reference
        const message = document.createElement('div');
        message.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(45deg, #ff6b35, #f39c12);
            color: white;
            padding: 20px 40px;
            border-radius: 15px;
            font-family: 'Orbitron', monospace;
            font-size: 2rem;
            font-weight: bold;
            text-shadow: 0 0 20px rgba(255, 107, 53, 0.8);
            box-shadow: 0 0 40px rgba(255, 107, 53, 0.6);
            z-index: 10000;
            animation: pulseGlow 2s ease-in-out;
        `;
        message.textContent = 'GODLIKE!';
        
        // Add pulse animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes pulseGlow {
                0%, 100% { transform: translate(-50%, -50%) scale(1); }
                50% { transform: translate(-50%, -50%) scale(1.1); }
            }
        `;
        document.head.appendChild(style);
        
        document.body.appendChild(message);
        
        // Remove after 3 seconds
        setTimeout(() => {
            message.remove();
            style.remove();
        }, 3000);
        
        console.log('🎮 GODLIKE! Easter egg activated!');
    }
}

// Initialize the site
const utbrSite = new UTBRSite();

// Additional modern features
document.addEventListener('DOMContentLoaded', () => {
    // Setup modern browser features
    if ('requestIdleCallback' in window) {
        requestIdleCallback(() => {
            utbrSite.setupEasterEggs();
        });
    } else {
        setTimeout(() => {
            utbrSite.setupEasterEggs();
        }, 1000);
    }
});

// Export for module usage (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = UTBRSite;
}
