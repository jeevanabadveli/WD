document.addEventListener('DOMContentLoaded', function() {
    // Loading animation
    setTimeout(function() {
        document.querySelector('.loader').style.opacity = '0';
        setTimeout(function() {
            document.querySelector('.loader').style.display = 'none';
        }, 500);
    }, 1500);

    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const mobileNav = document.querySelector('.mobile-nav');
    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    document.body.appendChild(overlay);

    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        mobileNav.classList.toggle('active');
        overlay.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    });

    overlay.addEventListener('click', function() {
        hamburger.classList.remove('active');
        mobileNav.classList.remove('active');
        this.classList.remove('active');
        document.body.classList.remove('no-scroll');
    });

    // Back to top button
    const backToTopBtn = document.querySelector('.back-to-top');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });

    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Header scroll effect
    const header = document.getElementById('main-header');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 50) {
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            header.style.padding = '10px 5%';
            document.querySelector('.logo img').style.height = '30px';
        } else {
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            header.style.padding = '15px 5%';
            document.querySelector('.logo img').style.height = '40px';
        }
    });

    // Scroll animations
    const fadeElements = document.querySelectorAll('.fade-in');
    
    function checkScroll() {
        fadeElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', checkScroll);
    window.addEventListener('load', checkScroll);

    // Testimonial carousel
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.dot');
    let currentSlide = 0;
    
    function showSlide(n) {
        testimonialSlides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        currentSlide = (n + testimonialSlides.length) % testimonialSlides.length;
        testimonialSlides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }
    
    document.querySelector('.carousel-prev').addEventListener('click', function() {
        showSlide(currentSlide - 1);
    });
    
    document.querySelector('.carousel-next').addEventListener('click', function() {
        showSlide(currentSlide + 1);
    });
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            showSlide(index);
        });
    });
    
    // Auto slide change
    setInterval(function() {
        showSlide(currentSlide + 1);
    }, 5000);

    // Horizontal scroll for product grid
    const productGrid = document.querySelector('.product-grid');
    let isProductDown = false;
    let productStartX;
    let productScrollLeft;

    productGrid.addEventListener('mousedown', (e) => {
        isProductDown = true;
        productStartX = e.pageX - productGrid.offsetLeft;
        productScrollLeft = productGrid.scrollLeft;
    });

    productGrid.addEventListener('mouseleave', () => {
        isProductDown = false;
    });

    productGrid.addEventListener('mouseup', () => {
        isProductDown = false;
    });

    productGrid.addEventListener('mousemove', (e) => {
        if(!isProductDown) return;
        e.preventDefault();
        const x = e.pageX - productGrid.offsetLeft;
        const walk = (x - productStartX) * 2;
        productGrid.scrollLeft = productScrollLeft - walk;
    });

    // Touch events for product grid
    productGrid.addEventListener('touchstart', (e) => {
        isProductDown = true;
        productStartX = e.touches[0].pageX - productGrid.offsetLeft;
        productScrollLeft = productGrid.scrollLeft;
    });

    productGrid.addEventListener('touchend', () => {
        isProductDown = false;
    });

    productGrid.addEventListener('touchmove', (e) => {
        if(!isProductDown) return;
        const x = e.touches[0].pageX - productGrid.offsetLeft;
        const walk = (x - productStartX) * 2;
        productGrid.scrollLeft = productScrollLeft - walk;
    });

    // Instagram horizontal scroll functionality
    const instagramGrid = document.querySelector('.instagram-grid');
    const scrollLeftBtn = document.createElement('div');
    const scrollRightBtn = document.createElement('div');
    
    // Create scroll buttons
    scrollLeftBtn.className = 'instagram-arrow left';
    scrollLeftBtn.innerHTML = '<i class="fas fa-chevron-left"></i>';
    scrollRightBtn.className = 'instagram-arrow right';
    scrollRightBtn.innerHTML = '<i class="fas fa-chevron-right"></i>';
    
    // Insert buttons into DOM
    instagramGrid.parentNode.insertBefore(scrollLeftBtn, instagramGrid);
    instagramGrid.parentNode.insertBefore(scrollRightBtn, instagramGrid.nextSibling);
    
    // Scroll functions
    function scrollInstagramLeft() {
        instagramGrid.scrollBy({
            left: -300,
            behavior: 'smooth'
        });
    }
    
    function scrollInstagramRight() {
        instagramGrid.scrollBy({
            left: 300,
            behavior: 'smooth'
        });
    }
    
    // Event listeners for buttons
    scrollLeftBtn.addEventListener('click', scrollInstagramLeft);
    scrollRightBtn.addEventListener('click', scrollInstagramRight);
    
    // Touch/swipe functionality for instagram
    let isInstagramDown = false;
    let instagramStartX;
    let instagramScrollLeft;
    
    instagramGrid.addEventListener('mousedown', (e) => {
        isInstagramDown = true;
        instagramStartX = e.pageX - instagramGrid.offsetLeft;
        instagramScrollLeft = instagramGrid.scrollLeft;
    });
    
    instagramGrid.addEventListener('mouseleave', () => {
        isInstagramDown = false;
    });
    
    instagramGrid.addEventListener('mouseup', () => {
        isInstagramDown = false;
    });
    
    instagramGrid.addEventListener('mousemove', (e) => {
        if(!isInstagramDown) return;
        e.preventDefault();
        const x = e.pageX - instagramGrid.offsetLeft;
        const walk = (x - instagramStartX) * 2;
        instagramGrid.scrollLeft = instagramScrollLeft - walk;
    });
    
    // Touch events for instagram
    instagramGrid.addEventListener('touchstart', (e) => {
        isInstagramDown = true;
        instagramStartX = e.touches[0].pageX - instagramGrid.offsetLeft;
        instagramScrollLeft = instagramGrid.scrollLeft;
    });
    
    instagramGrid.addEventListener('touchend', () => {
        isInstagramDown = false;
    });
    
    instagramGrid.addEventListener('touchmove', (e) => {
        if(!isInstagramDown) return;
        const x = e.touches[0].pageX - instagramGrid.offsetLeft;
        const walk = (x - instagramStartX) * 2;
        instagramGrid.scrollLeft = instagramScrollLeft - walk;
    });
    
    // Show/hide arrows based on scroll position
    function checkInstagramScrollPosition() {
        if (instagramGrid.scrollLeft > 10) {
            scrollLeftBtn.style.display = 'flex';
        } else {
            scrollLeftBtn.style.display = 'none';
        }
        
        if (instagramGrid.scrollLeft < (instagramGrid.scrollWidth - instagramGrid.clientWidth - 10)) {
            scrollRightBtn.style.display = 'flex';
        } else {
            scrollRightBtn.style.display = 'none';
        }
    }
    
    instagramGrid.addEventListener('scroll', checkInstagramScrollPosition);
    window.addEventListener('resize', checkInstagramScrollPosition);
    
    // Initial check
    checkInstagramScrollPosition();

    // Add to cart functionality
    let cartCount = 0;
    const cartCountElement = document.querySelector('.cart-count');
    
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('add-to-cart')) {
            cartCount++;
            cartCountElement.textContent = cartCount;
            
            // Add animation
            const cartIcon = document.querySelector('.cart-icon');
            cartIcon.classList.add('animate');
            setTimeout(() => {
                cartIcon.classList.remove('animate');
            }, 500);
            
            // Show added to cart message
            const addedMessage = document.createElement('div');
            addedMessage.className = 'added-message';
            addedMessage.textContent = 'Added to cart!';
            document.body.appendChild(addedMessage);
            
            setTimeout(() => {
                addedMessage.classList.add('show');
            }, 10);
            
            setTimeout(() => {
                addedMessage.classList.remove('show');
                setTimeout(() => {
                    document.body.removeChild(addedMessage);
                }, 300);
            }, 2000);
        }
    });

    // Newsletter form submission
    const newsletterForm = document.querySelector('.newsletter-form');
    
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const emailInput = this.querySelector('input[type="email"]');
        
        // Simple validation
        if (emailInput.value && emailInput.value.includes('@')) {
            // Show success message
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.textContent = 'Thanks for subscribing!';
            document.body.appendChild(successMessage);
            
            setTimeout(() => {
                successMessage.classList.add('show');
            }, 10);
            
            setTimeout(() => {
                successMessage.classList.remove('show');
                setTimeout(() => {
                    document.body.removeChild(successMessage);
                }, 300);
            }, 3000);
            
            // Reset form
            this.reset();
        } else {
            // Show error message
            emailInput.style.borderColor = 'red';
            setTimeout(() => {
                emailInput.style.borderColor = '#ddd';
            }, 2000);
        }
    });

    // Hover effects for category items
    const categoryItems = document.querySelectorAll('.category-item');
    
    categoryItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.querySelector('.category-btn').style.backgroundColor = '#ff2d7f';
            this.querySelector('.category-btn').style.color = 'white';
        });
        
        item.addEventListener('mouseleave', function() {
            this.querySelector('.category-btn').style.backgroundColor = 'transparent';
            this.querySelector('.category-btn').style.color = '#ff2d7f';
        });
    });
});