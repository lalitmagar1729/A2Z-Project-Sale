    // ============================================
    // PROFESSIONAL ERROR HANDLING & STATE MANAGEMENT
    // ============================================
    
    // Toast initialization (Bootstrap 5)
    let toastInstance = null;
    
    document.addEventListener('DOMContentLoaded', function() {
        // Initialize Bootstrap Toast
        const toastElement = document.getElementById('premiumLiveToast');
        if (toastElement) {
            toastInstance = new bootstrap.Toast(toastElement, {
                autohide: true,
                delay: 3000
            });
        }
        
        // Load badges from localStorage (persistent state)
        loadBadgeCounts();
        
        // Attach search input event listener for live search simulation
        const searchInput = document.getElementById('navSearchInput');
        if (searchInput) {
            searchInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    const query = this.value.trim();
                    if (query) {
                        showPremiumToast(`🔎 Searching for: "${query}" — results will appear here`);
                    } else {
                        showPremiumToast('Please enter a search term');
                    }
                }
            });
        }
    });
    
    /**
     * Professional navigation handler with validation
     * @param {Event} event - Click event
     * @param {string|null} url - Target URL
     * @param {string|null} toastMessage - Optional toast message for placeholder links
     */
    function handleLinkClick(event, url = null, toastMessage = null) {
        if (url && url !== '#') {
            // Validate URL format
            try {
                const isValidUrl = url.startsWith('/') || url.startsWith('http');
                if (isValidUrl) {
                    window.location.href = url;
                } else {
                    throw new Error('Invalid URL format');
                }
            } catch (error) {
                console.error('Navigation error:', error);
                showPremiumToast('⚠️ Navigation error. Please try again.');
                if (event) event.preventDefault();
            }
        } else {
            // Placeholder links show toast notification
            if (event) event.preventDefault();
            const message = toastMessage || 'This feature is under development — stay tuned!';
            showPremiumToast(message);
        }
    }
    
    /**
     * Direct navigation without validation (for logo)
     * @param {string} url 
     */
    function handleNavigation(url) {
        if (url && typeof url === 'string') {
            window.location.href = url;
        } else {
            showPremiumToast('Navigation unavailable');
        }
    }
    
    /**
     * Premium toast notification system
     * @param {string} message 
     */
    function showPremiumToast(message) {
        if (!message || typeof message !== 'string') {
            console.warn('Invalid toast message');
            return;
        }
        
        const toastBody = document.getElementById('toastMessage');
        if (toastBody) {
            toastBody.textContent = message;
        }
        
        if (toastInstance) {
            toastInstance.show();
        } else {
            // Fallback alert only in extreme cases
            console.log('[Toast]', message);
        }
    }
    
    /**
     * Load wishlist and cart badge counts from localStorage
     * Implements persistent state across sessions
     */
    function loadBadgeCounts() {
        try {
            const wishlistCount = localStorage.getItem('codecanvas_wishlist_count');
            const cartCount = localStorage.getItem('codecanvas_cart_count');
            
            const wishlistBadge = document.getElementById('wishlistBadge');
            const cartBadge = document.getElementById('cartBadge');
            
            if (wishlistBadge) {
                const count = wishlistCount ? parseInt(wishlistCount, 10) : 0;
                wishlistBadge.textContent = isNaN(count) ? 0 : count;
            }
            
            if (cartBadge) {
                const count = cartCount ? parseInt(cartCount, 10) : 0;
                cartBadge.textContent = isNaN(count) ? 0 : count;
            }
        } catch (error) {
            console.error('Failed to load badge counts from localStorage:', error);
            // Graceful fallback — set defaults
            if (document.getElementById('wishlistBadge')) document.getElementById('wishlistBadge').textContent = '0';
            if (document.getElementById('cartBadge')) document.getElementById('cartBadge').textContent = '0';
        }
    }
    
    /**
     * Utility to update badge counts (exposed for future cart/wishlist integration)
     * @param {string} type - 'wishlist' or 'cart'
     * @param {number} count 
     */
    function updateBadgeCount(type, count) {
        if (!type || typeof count !== 'number' || count < 0) return;
        
        const badgeId = type === 'wishlist' ? 'wishlistBadge' : 'cartBadge';
        const storageKey = type === 'wishlist' ? 'codecanvas_wishlist_count' : 'codecanvas_cart_count';
        
        const badge = document.getElementById(badgeId);
        if (badge) {
            badge.textContent = count;
            try {
                localStorage.setItem(storageKey, count.toString());
            } catch (e) {
                console.warn('localStorage unavailable');
            }
        }
    }
    
    // Expose global functions for future modules (professional API surface)
    window.showPremiumToast = showPremiumToast;
    window.updateBadgeCount = updateBadgeCount;
    window.handleLinkClick = handleLinkClick;
    window.handleNavigation = handleNavigation;






    
    // ---------- MOCK DATA (same as original, color theme preserved) ----------
    const categories = [
      { name: "Web Development", icon: "fas fa-code", count: 45 },
      { name: "AI & Machine Learning", icon: "fas fa-brain", count: 32 },
      { name: "Blockchain", icon: "fas fa-link", count: 18 },
      { name: "Mobile Apps", icon: "fas fa-mobile-alt", count: 27 }
    ];

    const featuredProjects = [
      { id: 1, name: "AI Resume Parser Pro", price: 4499, rating: 4.9, reviews: 187, category: "AI" },
      { id: 2, name: "MarketFlow E‑commerce", price: 5299, rating: 4.8, reviews: 243, category: "Web" },
      { id: 3, name: "CryptoVault DEX", price: 7499, rating: 5.0, reviews: 112, category: "Blockchain" },
      { id: 4, name: "FitJourney Mobile", price: 3899, rating: 4.7, reviews: 201, category: "Mobile" }
    ];

    const testimonials = [
      { name: "Rahul Sharma", role: "Tech Lead", text: "The source code quality is outstanding. Saved us months of development time!", rating: 5 },
      { name: "Priya Mehta", role: "Freelancer", text: "Excellent documentation and support. The certificate feature is a great bonus.", rating: 5 },
      { name: "Amit Kumar", role: "Startup Founder", text: "Best investment for our MVP. Live demo helped us decide instantly.", rating: 4.9 }
    ];

    // Render categories using Bootstrap grid columns (col-sm-6 col-md-3)
    function renderCategories() {
      const grid = document.getElementById('categoriesGrid');
      if (!grid) return;
      grid.innerHTML = categories.map(cat => `
        <div class="col-sm-6 col-md-3">
          <div class="category-card-custom" onclick="showToast('Browse ${cat.name} projects')">
            <i class="${cat.icon}"></i>
            <h3 class="h5 fw-semibold mt-2">${cat.name}</h3>
            <p class="small mb-0" style="color: var(--text-muted);">${cat.count}+ Projects</p>
          </div>
        </div>
      `).join('');
    }

    // Render featured projects with Bootstrap columns (col-md-6 col-lg-3)
    function renderFeatured() {
      const grid = document.getElementById('featuredGrid');
      if (!grid) return;
      grid.innerHTML = featuredProjects.map(p => `
        <div class="col-md-6 col-lg-3 d-flex">
          <div class="project-card-custom w-100">
            <div class="card-img-custom"><i class="fas fa-cube"></i></div>
            <div class="card-content p-3 flex-grow-1 d-flex flex-column">
              <div class="project-title fw-bold" style="color: var(--text-dark);">${p.name}</div>
              <div class="price fs-4 fw-bold text-custom-accent mt-2">₹${p.price}</div>
              <div class="rating small mb-2" style="color: #F4B942;">${'★'.repeat(Math.floor(p.rating))} ${p.rating} (${p.reviews} reviews)</div>
              <button class="btn-cart-custom mt-auto" onclick="showToast('Added to cart: ${p.name}')">Add to Cart</button>
            </div>
          </div>
        </div>
      `).join('');
    }

    // Render testimonials using Bootstrap columns
    function renderTestimonials() {
      const grid = document.getElementById('testimonialsGrid');
      if (!grid) return;
      grid.innerHTML = testimonials.map(t => `
        <div class="col-md-6 col-lg-4 d-flex">
          <div class="testimonial-card-custom w-100">
            <i class="fas fa-quote-left"></i>
            <p class="mt-2">${t.text}</p>
            <h4 class="h6 fw-bold mt-2" style="color: var(--primary);">${t.name}</h4>
            <div class="stars-custom mb-1">${'★'.repeat(Math.floor(t.rating))} ${t.rating}</div>
            <small class="text-muted">${t.role}</small>
          </div>
        </div>
      `).join('');
    }

    // Toast notification (same original functionality but matches theme)
    function showToast(msg) {
      const toastDiv = document.createElement('div');
      toastDiv.className = 'toast-notify';
      toastDiv.innerHTML = msg;
      document.body.appendChild(toastDiv);
      setTimeout(() => {
        if (toastDiv && toastDiv.remove) toastDiv.remove();
      }, 2500);
    }

    // Smooth scroll to featured projects
    function scrollToProjects() {
      const featuredSection = document.getElementById('featuredGrid');
      if (featuredSection) {
        featuredSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }

    // Initialize all dynamic content
    renderCategories();
    renderFeatured();
    renderTestimonials();

    // Expose functions globally for onclick handlers
    window.showToast = showToast;
    window.scrollToProjects = scrollToProjects;
  