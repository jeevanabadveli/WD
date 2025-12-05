document.addEventListener('DOMContentLoaded', function() {
    // Screen navigation
    const navItems = document.querySelectorAll('.nav-item');
    const screens = document.querySelectorAll('.screen');
    
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            const screenName = this.getAttribute('data-screen');
            if (!screenName) return; // Skip if no data-screen attribute (like scan button)
            
            // Update active nav item
            navItems.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');
            
            // Show corresponding screen
            screens.forEach(screen => screen.classList.remove('active-screen'));
            document.querySelector(`.${screenName}-screen`).classList.add('active-screen');
        });
    });
    
    // Back button functionality
    const backButtons = document.querySelectorAll('.back-btn');
    backButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Go back to home screen
            screens.forEach(screen => screen.classList.remove('active-screen'));
            document.querySelector('.home-screen').classList.add('active-screen');
            
            // Update nav
            navItems.forEach(nav => nav.classList.remove('active'));
            document.querySelector('.nav-item[data-screen="home"]').classList.add('active');
        });
    });
    
    // Quick action buttons
    const actionItems = document.querySelectorAll('.action-item');
    actionItems.forEach(item => {
        item.addEventListener('click', function() {
            const service = this.getAttribute('data-service');
            
            // Update payment screen title
            const paymentTitle = document.querySelector('.payment-title');
            let title = '';
            
            switch(service) {
                case 'mobile':
                    title = 'Mobile Recharge';
                    break;
                case 'electricity':
                    title = 'Electricity Bill';
                    break;
                case 'dth':
                    title = 'DTH Recharge';
                    break;
                case 'metro':
                    title = 'Metro Card Recharge';
                    break;
                case 'credit':
                    title = 'Credit Card Payment';
                    break;
                case 'loan':
                    title = 'Loan Payment';
                    break;
                case 'insurance':
                    title = 'Insurance Payment';
                    break;
                case 'education':
                    title = 'Education Fee';
                    break;
                default:
                    title = 'Payment';
            }
            
            paymentTitle.textContent = title;
            
            // Show payment screen
            screens.forEach(screen => screen.classList.remove('active-screen'));
            document.querySelector('.payment-screen').classList.add('active-screen');
        });
    });
    
    // Amount option selection
    const amountOptions = document.querySelectorAll('.amount-option');
    amountOptions.forEach(option => {
        option.addEventListener('click', function() {
            amountOptions.forEach(opt => opt.style.backgroundColor = '#f5f5f5');
            this.style.backgroundColor = '#e0e0e0';
            document.getElementById('amount').value = this.textContent.replace('₹', '');
        });
    });
    
    // Payment method selection
    const paymentMethods = document.querySelectorAll('.payment-method');
    paymentMethods.forEach(method => {
        method.addEventListener('click', function() {
            paymentMethods.forEach(m => m.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Pay now button
    const payNowBtn = document.querySelector('.pay-now-btn');
    if (payNowBtn) {
        payNowBtn.addEventListener('click', function() {
            const amount = document.getElementById('amount').value;
            const mobileNumber = document.getElementById('mobile-number').value;
            const operator = document.getElementById('operator').value;
            
            if (!amount) {
                alert('Please enter an amount');
                return;
            }
            
            if (!mobileNumber || mobileNumber.length !== 10) {
                alert('Please enter a valid 10-digit mobile number');
                return;
            }
            
            if (!operator) {
                alert('Please select an operator');
                return;
            }
            
            // Update success message
            const successMessage = document.querySelector('.success-message');
            successMessage.textContent = `Your ${document.querySelector('.payment-title').textContent.toLowerCase()} of ₹${amount} for ${mobileNumber} was successful.`;
            
            // Show success screen
            screens.forEach(screen => screen.classList.remove('active-screen'));
            document.querySelector('.success-screen').classList.add('active-screen');
        });
    }
    
    // Done button on success screen
    const doneBtn = document.querySelector('.done-btn');
    if (doneBtn) {
        doneBtn.addEventListener('click', function() {
            // Go back to home screen
            screens.forEach(screen => screen.classList.remove('active-screen'));
            document.querySelector('.home-screen').classList.add('active-screen');
            
            // Update nav
            navItems.forEach(nav => nav.classList.remove('active'));
            document.querySelector('.nav-item[data-screen="home"]').classList.add('active');
        });
    }
    
    // Passbook tab switching
    const tabBtns = document.querySelectorAll('.tab-btn');
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            tabBtns.forEach(tab => tab.classList.remove('active'));
            this.classList.add('active');
            // Here you would typically load different transaction data based on tab
        });
    });
    
    // Profile item clicks
    const profileItems = document.querySelectorAll('.profile-item');
    profileItems.forEach(item => {
        item.addEventListener('click', function() {
            const text = this.querySelector('.profile-content span:first-child').textContent;
            alert(`${text} screen would open here in a full app`);
        });
    });
    
    // Logout button
    const logoutBtn = document.querySelector('.logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            if (confirm('Are you sure you want to logout?')) {
                alert('Logged out successfully');
                // In a real app, you would redirect to login screen
                screens.forEach(screen => screen.classList.remove('active-screen'));
                document.querySelector('.home-screen').classList.add('active-screen');
                navItems.forEach(nav => nav.classList.remove('active'));
                document.querySelector('.nav-item[data-screen="home"]').classList.add('active');
            }
        });
    }
    
    // Offers carousel
    const offerSlides = document.querySelectorAll('.offer-slide');
    const dots = document.querySelectorAll('.dot');
    let currentSlide = 0;
    
    function showSlide(n) {
        offerSlides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        currentSlide = (n + offerSlides.length) % offerSlides.length;
        offerSlides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }
    
    function nextSlide() {
        showSlide(currentSlide + 1);
    }
    
    // Auto rotate offers
    let slideInterval = setInterval(nextSlide, 3000);
    
    // Pause on hover
    const carousel = document.querySelector('.offers-carousel');
    if (carousel) {
        carousel.addEventListener('mouseenter', () => clearInterval(slideInterval));
        carousel.addEventListener('mouseleave', () => slideInterval = setInterval(nextSlide, 3000));
    }
    
    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            clearInterval(slideInterval);
            showSlide(index);
            slideInterval = setInterval(nextSlide, 3000);
        });
    });
    
    // Scan button functionality
    const scanBtn = document.querySelector('.scan-item');
    if (scanBtn) {
        scanBtn.addEventListener('click', function() {
            alert('QR Scanner would open here');
        });
    }
    
    // Wallet action buttons
    const walletActionBtns = document.querySelectorAll('.wallet-btn, .action-btn');
    walletActionBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const action = this.textContent.trim();
            alert(`${action} functionality would be implemented here`);
        });
    });
});