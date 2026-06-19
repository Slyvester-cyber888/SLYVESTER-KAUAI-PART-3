/**
 * Kauai Website - Part 3 Functionality & SEO
 * Main Javascript Controller
 */

document.addEventListener("DOMContentLoaded", () => {
    // -----------------------------------------
    // 1. Initializations
    // -----------------------------------------
    initFAQs();
    initLightbox();
    initLeafletMap();
    initDynamicMenu();
    initEnquiryForm();
    initContactForm();
});

// -----------------------------------------
// 2. FAQ Accordion (inquiry.html)
// -----------------------------------------
function initFAQs() {
    const accordionHeaders = document.querySelectorAll(".accordion-header");
    if (accordionHeaders.length === 0) return;

    accordionHeaders.forEach(header => {
        header.addEventListener("click", () => {
            const item = header.parentElement;
            const content = item.querySelector(".accordion-content");
            const icon = header.querySelector(".accordion-icon");

            // Toggle active state
            const isActive = item.classList.contains("active");

            // Close all other items for a cleaner look
            document.querySelectorAll(".accordion-item").forEach(otherItem => {
                otherItem.classList.remove("active");
                otherItem.querySelector(".accordion-content").style.maxHeight = null;
                const otherIcon = otherItem.querySelector(".accordion-icon");
                if (otherIcon) otherIcon.textContent = "+";
            });

            if (!isActive) {
                item.classList.add("active");
                content.style.maxHeight = content.scrollHeight + "px";
                if (icon) icon.textContent = "−";
            } else {
                item.classList.remove("active");
                content.style.maxHeight = null;
                if (icon) icon.textContent = "+";
            }
        });
    });
}

// -----------------------------------------
// 3. Image Lightbox Gallery (about.html)
// -----------------------------------------
let currentGalleryIndex = 0;
let galleryImages = [];

function initLightbox() {
    const galleryItems = document.querySelectorAll(".gallery-item img");
    if (galleryItems.length === 0) return;

    // Create Lightbox DOM elements dynamically
    const lightbox = document.createElement("div");
    lightbox.id = "lightbox-modal";
    lightbox.className = "lightbox-modal";
    lightbox.innerHTML = `
        <span class="lightbox-close">&times;</span>
        <div class="lightbox-content-wrapper">
            <img class="lightbox-image" id="lightbox-img" src="" alt="Enlarged view">
            <div class="lightbox-caption" id="lightbox-caption"></div>
        </div>
        <a class="lightbox-prev">&#10094;</a>
        <a class="lightbox-next">&#10095;</a>
    `;
    document.body.appendChild(lightbox);

    const lightboxImg = document.getElementById("lightbox-img");
    const lightboxCaption = document.getElementById("lightbox-caption");
    const closeBtn = lightbox.querySelector(".lightbox-close");
    const prevBtn = lightbox.querySelector(".lightbox-prev");
    const nextBtn = lightbox.querySelector(".lightbox-next");

    // Populate images array
    galleryImages = Array.from(galleryItems).map(img => ({
        src: img.getAttribute("data-full") || img.src,
        caption: img.alt || "Kauai Fresh Wholesome Ingredients"
    }));

    galleryItems.forEach((img, index) => {
        img.style.cursor = "zoom-in";
        img.addEventListener("click", () => {
            currentGalleryIndex = index;
            openLightbox(lightbox, lightboxImg, lightboxCaption);
        });
    });

    closeBtn.addEventListener("click", () => {
        lightbox.classList.remove("show");
    });

    // Close when clicking background (not image/controls)
    lightbox.addEventListener("click", (e) => {
        if (e.target === lightbox || e.target === lightbox.querySelector(".lightbox-content-wrapper")) {
            lightbox.classList.remove("show");
        }
    });

    prevBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        navigateLightbox(-1, lightboxImg, lightboxCaption);
    });

    nextBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        navigateLightbox(1, lightboxImg, lightboxCaption);
    });

    // Keyboard navigation
    document.addEventListener("keydown", (e) => {
        if (!lightbox.classList.contains("show")) return;
        if (e.key === "Escape") lightbox.classList.remove("show");
        if (e.key === "ArrowLeft") navigateLightbox(-1, lightboxImg, lightboxCaption);
        if (e.key === "ArrowRight") navigateLightbox(1, lightboxImg, lightboxCaption);
    });
}

function openLightbox(lightbox, imgElement, captionElement) {
    const current = galleryImages[currentGalleryIndex];
    imgElement.src = current.src;
    captionElement.textContent = current.caption;
    lightbox.classList.add("show");
}

function navigateLightbox(direction, imgElement, captionElement) {
    currentGalleryIndex = (currentGalleryIndex + direction + galleryImages.length) % galleryImages.length;
    const current = galleryImages[currentGalleryIndex];
    
    // Smooth transition between slides
    imgElement.style.opacity = 0;
    setTimeout(() => {
        imgElement.src = current.src;
        captionElement.textContent = current.caption;
        imgElement.style.opacity = 1;
    }, 150);
}

// -----------------------------------------
// 4. Leaflet.js Interactive Map (contacts.html)
// -----------------------------------------
function initLeafletMap() {
    const mapContainer = document.getElementById("leaflet-map");
    if (!mapContainer) return;

    // Center in South Africa (Rosebank Mall / Centurion area approximately)
    const southAfricaCoords = [-28.4793, 24.6727]; 
    const map = L.map('leaflet-map', {
        scrollWheelZoom: false
    }).setView([-29.0000, 24.0000], 5); // Focused to show major parts of South Africa

    // Load beautiful cartography tiles
    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 20
    }).addTo(map);

    // Custom pins definitions
    const locations = [
        {
            name: "Kauai V&A Waterfront",
            coords: [-33.9030, 18.4200],
            address: "V&A Waterfront Food Market, Cape Town, 8001",
            hours: "Mon - Sun: 08:00 - 21:00",
            phone: "021 418 0111"
        },
        {
            name: "Kauai Rosebank Mall",
            coords: [-26.1457, 28.0374],
            address: "Rosebank Mall, Rosebank, Johannesburg, 2196",
            hours: "Mon - Sun: 07:00 - 19:00",
            phone: "011 447 0222"
        },
        {
            name: "Kauai Walmer Park",
            coords: [-33.9995, 25.5786],
            address: "Walmer Park Shopping Centre, Gqeberha, 6070",
            hours: "Mon - Sun: 08:00 - 18:00",
            phone: "041 367 0333"
        }
    ];

    // Add markers with customized popups
    locations.forEach(loc => {
        const marker = L.marker(loc.coords).addTo(map);
        
        const popupContent = `
            <div class="map-popup-card">
                <h4 style="margin:0 0 5px 0; color: #388e3c; font-family: 'Aptos', sans-serif;">&#127811; ${loc.name}</h4>
                <p style="margin:0 0 5px 0; font-size:12px; color:#555;"><strong>Address:</strong> ${loc.address}</p>
                <p style="margin:0 0 5px 0; font-size:12px; color:#555;"><strong>Hours:</strong> ${loc.hours}</p>
                <p style="margin:0; font-size:12px; color:#555;"><strong>Phone:</strong> ${loc.phone}</p>
            </div>
        `;
        
        marker.bindPopup(popupContent);
    });

    // Adjust zoom levels dynamically to fit all markers
    const group = new L.featureGroup(locations.map(loc => L.marker(loc.coords)));
    map.fitBounds(group.getBounds().pad(0.1));
}

// -----------------------------------------
// 5. Dynamic Menu, Search & Filters (service.html)
// -----------------------------------------
const menuData = [
    // Smoothies
    {
        id: "pb-bomb",
        name: "Peanut Butter Bomb",
        category: "smoothies",
        description: "Whey protein, sugar-free peanut butter, banana, raw cacao, fat-free milk. South Africa's most loved post-workout protein blend.",
        price: 75,
        badge: "Fitness Cult-Classic",
        badgeType: "accent"
    },
    {
        id: "strawberry-stinger",
        name: "Strawberry Stinger",
        category: "smoothies",
        description: "Strawberries, banana, apple juice, frozen yoghurt. The legendary sweet-and-creamy smoothie that started the craze in 1996.",
        price: 68,
        badge: "All-Time Classic",
        badgeType: "primary"
    },
    {
        id: "gem-smoothie",
        name: "GEM (Green Energy Machine)",
        category: "smoothies",
        description: "Spinach, apple, cucumber, celery, hemp seeds. Packed with active greens for full-body replenishment.",
        price: 65
    },
    {
        id: "mango-berry",
        name: "Mango Berry Cold-Press",
        category: "smoothies",
        description: "Mango, strawberries, organic mint, fresh apple juice. Pressed daily for maximum vitamin C retention.",
        price: 58
    },
    
    // Wraps & Salads
    {
        id: "princess-wrap",
        name: "Princess Wrap",
        category: "wraps",
        description: "Free-range chicken, fresh avocado, feta, tomatoes, carrot, celery & onion mayo. Our iconic, most-ordered signature wrap since the beginning.",
        price: 89,
        badge: "Best Seller",
        badgeType: "accent"
    },
    {
        id: "harvest-salad",
        name: "Harvest Salad Bowl",
        category: "wraps",
        description: "Roasted butternut, baby spinach, feta, cherry tomatoes, and a light vinaigrette. Rich in nutrients and flavor.",
        price: 79
    },
    {
        id: "caesar-wrap",
        name: "Spiced Chicken Caesar",
        category: "wraps",
        description: "Warm chicken breast strips, parmesan shavings, crispy croutons, baby cos lettuce, creamy Caesar dressing.",
        price: 85
    },
    
    // Warm Bowls
    {
        id: "mexi-bowl",
        name: "Mexi Bowl",
        category: "warm-bowls",
        description: "Spicy chicken breast, brown rice, black beans, corn, warm salsa, and avocado.",
        price: 95
    },
    {
        id: "thai-crunch",
        name: "Thai Crunch Bowl",
        category: "warm-bowls",
        description: "Seared tofu, edamame, shredded cabbage, carrots, chili peanut dressing, and sesame seeds.",
        price: 85
    },
    
    // Breakfast
    {
        id: "smashed-avo",
        name: "Smashed Avo Toast",
        category: "breakfast",
        description: "Smashed avocado on sourdough with a squeeze of lemon and chili flakes.",
        price: 59
    },
    {
        id: "sunrise-wrap",
        name: "Sunrise Breakfast Wrap",
        category: "breakfast",
        description: "Scrambled free-range eggs, premium back bacon, cheddar cheese, baby spinach, grilled tomato salsa.",
        price: 69
    }
];

function initDynamicMenu() {
    const menuContainer = document.getElementById("dynamic-menu-container");
    if (!menuContainer) return;

    // Render initial menu
    renderMenuItems(menuData);

    // Setup filtering tabs
    const filterPills = document.querySelectorAll(".filter-pill");
    filterPills.forEach(pill => {
        pill.addEventListener("click", () => {
            // Update active pill
            filterPills.forEach(p => p.classList.remove("active"));
            pill.classList.add("active");

            // Filter and render
            applyMenuFilters();
        });
    });

    // Setup keyword search input
    const searchInput = document.getElementById("menu-search");
    if (searchInput) {
        searchInput.addEventListener("input", () => {
            applyMenuFilters();
        });
    }

    // Setup sort selector
    const sortSelect = document.getElementById("menu-sort");
    if (sortSelect) {
        sortSelect.addEventListener("change", () => {
            applyMenuFilters();
        });
    }
}

function applyMenuFilters() {
    const activePill = document.querySelector(".filter-pill.active");
    const category = activePill ? activePill.getAttribute("data-category") : "all";
    const searchQuery = document.getElementById("menu-search").value.toLowerCase().trim();
    const sortBy = document.getElementById("menu-sort") ? document.getElementById("menu-sort").value : "default";

    let filtered = menuData;

    // Filter by Category
    if (category !== "all") {
        filtered = filtered.filter(item => item.category === category);
    }

    // Filter by Search Query
    if (searchQuery) {
        filtered = filtered.filter(item => 
            item.name.toLowerCase().includes(searchQuery) || 
            item.description.toLowerCase().includes(searchQuery)
        );
    }

    // Sort Results
    if (sortBy === "price-low") {
        filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
        filtered.sort((a, b) => b.price - a.price);
    } else if (sortBy === "alphabetical") {
        filtered.sort((a, b) => a.name.localeCompare(b.name));
    }

    renderMenuItems(filtered);
}

function renderMenuItems(items) {
    const menuContainer = document.getElementById("dynamic-menu-container");
    if (!menuContainer) return;

    if (items.length === 0) {
        menuContainer.innerHTML = `
            <div class="no-results-message">
                <p>&#128065; No menu items found matching your filters. Try search keywords like "peanut", "wrap", or "avo".</p>
            </div>
        `;
        return;
    }

    // Generate list items HTML
    let html = '<ul class="menu-list-grid">';
    items.forEach(item => {
        const badgeHTML = item.badge 
            ? `<span class="badge badge-${item.badgeType || 'primary'}">${item.badge}</span>` 
            : '';

        html += `
            <li class="menu-item-card" data-category="${item.category}">
                <div class="menu-item-details">
                    <div class="menu-item-title-row">
                        <h4>${item.name} ${badgeHTML}</h4>
                        <span class="menu-item-price">R${item.price}</span>
                    </div>
                    <p class="menu-item-desc">${item.description}</p>
                </div>
            </li>
        `;
    });
    html += '</ul>';

    menuContainer.innerHTML = html;
}

// -----------------------------------------
// 6. Enquiry Form Validation & Modals (inquiry.html)
// -----------------------------------------
function initEnquiryForm() {
    const form = document.querySelector("#enquiry-form-section form");
    if (!form) return;

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        // Retrieve field values
        const fullName = document.getElementById("fullName").value.trim();
        const email = document.getElementById("email").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const type = document.getElementById("enquiryType").value;
        const message = document.getElementById("message").value.trim();

        // Perform basic validations
        if (!fullName || !email || !type || !message) {
            alert("Please fill in all required fields.");
            return;
        }

        if (phone && !/^[0-9]{10}$/.test(phone)) {
            alert("Phone number must be exactly 10 digits.");
            return;
        }

        // Show a premium response modal / card to display cost and availability details
        let title = "";
        let responseContent = "";

        if (type === "franchise") {
            title = "&#128188; Franchise Enquiry Received!";
            responseContent = `
                <p>Hello <strong>${fullName}</strong>,</p>
                <p>Thank you for your interest in bringing a Kauai franchise to your community!</p>
                <p><strong>Catering & Setup Information:</strong></p>
                <ul>
                    <li><strong>Average Store Capital:</strong> R1.2M - R1.8M (depending on location format)</li>
                    <li><strong>Availability:</strong> Prime locations available in Gauteng, KZN, and Western Cape.</li>
                    <li><strong>Next Step:</strong> We have sent our full Franchise Prospectus and application documents to <strong>${email}</strong>.</li>
                </ul>
                <p>Our Franchise Development team will contact you within 2 business days.</p>
            `;
        } else if (type === "catering") {
            title = "&#129379; Corporate Catering Request Received!";
            responseContent = `
                <p>Hello <strong>${fullName}</strong>,</p>
                <p>We are excited to fuel your event with Kauai's clean food!</p>
                <p><strong>Catering & Estimate Details:</strong></p>
                <ul>
                    <li><strong>Platters:</strong> Average R350 - R480 (serves 6-8 people).</li>
                    <li><strong>Availability:</strong> Bookings require at least 24 hours notice. Delivery available nationwide.</li>
                    <li><strong>Customization:</strong> Glute-free, Vegan, and Keto options are fully supported.</li>
                </ul>
                <p>We have sent our catering order catalog to <strong>${email}</strong>. A store manager will follow up to finalize details.</p>
            `;
        } else {
            title = "&#127811; Request Received!";
            responseContent = `
                <p>Hello <strong>${fullName}</strong>,</p>
                <p>Thank you for reaching out to Kauai South Africa.</p>
                <p>We have successfully logged your enquiry under category: <strong>${type}</strong>. A customer support agent will review your request and get back to you at <strong>${email}</strong> within 24 hours.</p>
            `;
        }

        displayResponseModal(title, responseContent);
        form.reset();
    });
}

function displayResponseModal(title, bodyHTML) {
    // Check if modal already exists
    let modal = document.getElementById("enquiry-modal");
    if (!modal) {
        modal = document.createElement("div");
        modal.id = "enquiry-modal";
        modal.className = "response-modal";
        modal.innerHTML = `
            <div class="modal-card">
                <span class="modal-close">&times;</span>
                <div class="modal-header">
                    <h3 id="modal-title"></h3>
                </div>
                <div class="modal-body" id="modal-body"></div>
                <div class="modal-footer">
                    <button class="btn-cta modal-btn-close">Close</button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);

        const closeX = modal.querySelector(".modal-close");
        const closeBtn = modal.querySelector(".modal-btn-close");
        
        const closeModal = () => modal.classList.remove("show");
        closeX.addEventListener("click", closeModal);
        closeBtn.addEventListener("click", closeModal);
        modal.addEventListener("click", (e) => {
            if (e.target === modal) closeModal();
        });
    }

    document.getElementById("modal-title").innerHTML = title;
    document.getElementById("modal-body").innerHTML = bodyHTML;
    modal.classList.add("show");
}

// -----------------------------------------
// 7. Contact Form & EmailJS (contacts.html)
// -----------------------------------------
function initContactForm() {
    const form = document.querySelector("#general-contact-form form");
    if (!form) return;

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        // Retrieve field values
        const name = document.getElementById("contactName").value.trim();
        const email = document.getElementById("contactEmail").value.trim();
        const message = document.getElementById("contactMessage").value.trim();

        // Form Validation Feedback
        if (!name || !email || !message) {
            showFormFeedback(form, "error", "Please fill in all fields.");
            return;
        }

        // Email regex check
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            showFormFeedback(form, "error", "Please enter a valid email address.");
            return;
        }

        // Message minimum length
        if (message.length < 10) {
            showFormFeedback(form, "error", "Message must be at least 10 characters long.");
            return;
        }

        // Add visual loading state
        const submitBtn = form.querySelector("button[type='submit']");
        const originalText = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = `Sending... <span class="spinner"></span>`;

        // Clear previous alert messages
        clearFormFeedback(form);

        // -------------------------------------------------------------
        // EmailJS Integration
        // -------------------------------------------------------------
        // IMPORTANT: Swap placeholders with actual dashboard credentials
        const EMAILJS_SERVICE_ID = "service_abc123xyz"; // Example Service ID
        const EMAILJS_TEMPLATE_ID = "template_def456uvw"; // Example Template ID
        const EMAILJS_PUBLIC_KEY = "user_ghijkl789mno"; // Example Public Key

        // Check if emailjs is loaded
        if (typeof emailjs !== "undefined") {
            // Check if user set their own credentials
            const isDefaultKey = EMAILJS_PUBLIC_KEY.startsWith("user_");
            
            if (isDefaultKey) {
                // If developer hasn't set their key, fallback to a local mock send with a warning
                console.warn("EmailJS: Using placeholder API keys. Simulating AJAX submission...");
                setTimeout(() => {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalText;
                    
                    showFormFeedback(form, "success", `Success! Message simulated. To enable live sending, replace the API keys in js/main.js!`);
                    form.reset();
                }, 1200);
            } else {
                // Initialize with Public Key
                emailjs.init(EMAILJS_PUBLIC_KEY);

                // Send using Form Element directly
                emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, form)
                    .then(() => {
                        submitBtn.disabled = false;
                        submitBtn.innerHTML = originalText;
                        showFormFeedback(form, "success", "Thank you! Your message has been sent successfully.");
                        form.reset();
                    })
                    .catch((err) => {
                        submitBtn.disabled = false;
                        submitBtn.innerHTML = originalText;
                        console.error("EmailJS Error: ", err);
                        showFormFeedback(form, "error", "Oops! Failed to send email. Check API configurations.");
                    });
            }
        } else {
            // Fallback mock send if EmailJS SDK fails to load
            console.error("EmailJS script not loaded. Simulating local mock post...");
            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
                showFormFeedback(form, "success", "Message received! (Local simulation complete).");
                form.reset();
            }, 1000);
        }
    });
}

function showFormFeedback(formElement, type, message) {
    clearFormFeedback(formElement);
    
    const feedbackDiv = document.createElement("div");
    feedbackDiv.className = `form-feedback-alert feedback-${type}`;
    feedbackDiv.innerHTML = type === "success" 
        ? `&#9989; ${message}` 
        : `&#9888; ${message}`;
        
    // Insert feedback alert at top of form
    formElement.insertBefore(feedbackDiv, formElement.firstChild);

    // If it's an error, apply shake effect to form
    if (type === "error") {
        formElement.classList.add("shake-animation");
        setTimeout(() => formElement.classList.remove("shake-animation"), 500);
    }
}

function clearFormFeedback(formElement) {
    const existing = formElement.querySelector(".form-feedback-alert");
    if (existing) existing.remove();
}
