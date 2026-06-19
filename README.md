# Kauai Brand Website - WEDE5020 Portfolio of Evidence

## Student Information
- **Student Name:** Slyvester
- **Student Number:** ST10522997
- **Institution:** Rosebank College — Nelson Mandela Bay
- **Module Name:** Web Development (Introduction)
- **Module Code:** WEDE5020
- **Lecturer:** Mzimasi Mbongwe
- **Date:** June 2026
- **GitHub Repository:** [https://github.com/Slyvester-cyber888/SLYVESTER-KAUAI-PART-3](https://github.com/Slyvester-cyber888/SLYVESTER-KAUAI-PART-3)
- **Live Website Deployment:** [https://slyvester-kauai-part3.netlify.app/](https://slyvester-kauai-part-3.netlify.app/) *(Alternative placeholder URL)*

---

## Project Overview
This project is a premium, fully responsive, and SEO-optimised brand website developed for **Kauai South Africa** as part of the WEDE5020 Portfolio of Evidence (PoE). Kauai is South Africa's leading healthy fast-casual brand, pioneering the wellness and clean-eating movement since 1996. The website consists of 5 pages: Homepage, About Us, Menu, Franchise & Enquiry, and Contact, built from scratch using clean Semantic HTML5, custom Vanilla CSS3 (with oklch, CSS nesting, and premium transitions), and Vanilla JavaScript ES6.

---

## Website Goals and Objectives
- **Increase Brand Awareness**: Showcase Kauai's rich history, starting from its Hawaiian roots in 1995 to opening in Cape Town in 1996 and growing to over 170 locations today.
- **Interactive Menu Discovery**: Allow users to browse Kauai's healthy meals, filter by product category, and search by keywords dynamically.
- **Facilitate Franchising & Catering Enquiries**: Guide prospective business partners or catering clients through a custom, validated form with tailored instant estimates.
- **Drive Store Visits**: Provide store locations details with a fully interactive map showing primary locations (Cape Town, Johannesburg, Gqeberha).
- **Asynchronous Communication**: Enable general inquiries to send direct emails to Kauai's team asynchronously using client-side AJAX/EmailJS.

---

## Website Structure and Sitemap
```
Root/
├── index.html                  (Homepage: Hero, Favorites Highlight, Philosophy)
├── about.html                  (Our Story: History, Mission, Values, Lightbox Gallery)
├── service.html                (Menu: Dynamic Search, Sorting, Categories Filter)
├── inquiry.html                (Enquiry Form: Validation, Response Estimator, FAQ Accordion)
├── contacts.html               (Contact & Locator: Details, Contact Form, Leaflet Map)
├── robots.txt                  (SEO crawler directives)
├── sitemap.xml                 (XML sitemap for indexing engines)
├── css/
│   └── style.css               (CSS Design System: variables, dark mode, component styles)
├── js/
│   └── main.js                 (JS Controller: Map, Lightbox, FAQs, Search, Forms/EmailJS)
└── images/                     (Image assets)
    ├── hero-banner.jpg
    ├── about-hero.jpg
    ├── kauai_team_v2.png
    ├── smoothie.jpg
    ├── wrap.jpg
    ├── bowl.jpg
    └── breakfast.png
```

---

## Timeline and Milestones
- **Part 1 (Planning & Structure)**: Project planning, competitor analysis, file organization, wireframing, and basic HTML5 structure setup.
- **Part 2 (Visuals & Responsiveness)**: Designing the CSS custom design tokens, layout grids, animations, dark mode support, and testing responsiveness.
- **Part 3 (Functionality & SEO)**: Adding interactive map elements, image gallery lightboxes, dynamic filtering, EmailJS contact mail system, robots.txt, sitemap.xml, and final Netlify deployment.

---

## Part Details

### Part 1: Building the Foundation
- Designed visual sitemaps and wireframes.
- Set up a clean, modular folder hierarchy.
- Authored the core Semantic HTML files (`index.html`, `about.html`, `service.html`, `inquiry.html`, `contacts.html`) using HTML5 landmarks (`<header>`, `<nav>`, `<main>`, `<footer>`, `<section>`).

### Part 2: Designing the Visuals
- Built a custom responsive CSS design system in `style.css` using modern techniques like:
  - HSL/OKLCH color-mixing for high-fidelity dark-mode support.
  - Sticky premium header with visual scroll indicators.
  - Flexbox and Grid cards for menu sections.
  - Premium smooth scrolling integration (Lenis library support).

### Part 3: Adding Functionality and SEO
- **Interactive Leaflet.js Map**: Replaced static iframes on `contacts.html` with a single, highly performant Leaflet Map displaying custom markers for Cape Town V&A, Rosebank Mall (JHB), and Walmer Park (Gqeberha) with custom popups.
- **Image Lightbox Gallery**: Implemented a responsive food showcase on `about.html`. Clicking images opens a full-screen blurred glassmorphic overlay modal with image transition animations and left/right arrows.
- **FAQ Accordion**: Added a modern interactive accordion to the FAQ section on `inquiry.html` with smooth height transitions.
- **Dynamic Menu Loading & Search**: Migrated menu data into a JSON array in `js/main.js`. Implemented category filtering pills and live keyword search inputs.
- **Form Validation & Modals**: Added HTML5 and custom JS regex validation to the forms. The Enquiry form generates immediate response calculations (e.g. setup costs for franchises, availability slots for catering).
- **EmailJS SDK Integration**: The Contact form on `contacts.html` is linked directly to the EmailJS SDK, sending messages asynchronously (AJAX) to the customer service inbox.
- **SEO Optimization**: Integrated keywords, titles, descriptions, canonical URLs, and Open Graph cards across all pages. Created `robots.txt` and `sitemap.xml` for crawler guidance.

---

## Development Changelog

### Version 3.0.0 (Part 3 Release)
- **Feature (SEO)**: Added keywords, descriptive meta descriptions, and Open Graph schema to every page. Created standard `robots.txt` and `sitemap.xml`.
- **Feature (Map)**: Added Leaflet.js map script and stylesheet inside `contacts.html`. Removed static Google Maps iframes. Added custom interactive pins.
- **Feature (Lightbox)**: Developed a glassmorphic gallery lightbox inside `js/main.js` and hooked it to images on `about.html`.
- **Feature (Accordion)**: Added interactive FAQ accordion items in `inquiry.html` for franchise/catering inquiries.
- **Feature (Search & Filter)**: Programmed `service.html` menu cards to render dynamically. Added keyword text search and category select pills.
- **Feature (EmailJS)**: Implemented AJAX contact submission with EmailJS SDK. Set up clear API credentials placeholder variables.
- **Feature (Feedback)**: Coded shake-animation validation alerts for invalid inputs, and a custom estimation modal on form submit.

### Version 2.0.0 (Part 2 Release)
- Converted plain HTML pages into a themed premium brand website.
- Created `style.css` with a responsive design tokens system.
- Added support for dark/light mode themes automatically.
- Integrated Lenis smooth scroll script.

---

## Reference List (Harvard Style - Adapted for the IIE)

- CartoDB. (2026). *CartoDB Voyager Map Tiles*. Retrieved from https://carto.com/attributions (Accessed 19 June 2026).
- EmailJS. (2026). *EmailJS Complete SDK Integration Guide*. Retrieved from https://www.emailjs.com/docs/ (Accessed 19 June 2026).
- Franchise Association of South Africa (FASA). (2023). *Kauai franchise profile*. Retrieved from https://www.fasa.co.za (Accessed 19 June 2026).
- Google Fonts. (2026). *Outfit and DM Sans Web Fonts*. Retrieved from https://fonts.google.com (Accessed 19 June 2026).
- Kauai. (2026). *Official brand website and menu assets*. Retrieved from https://www.kauai.co.za (Accessed 19 June 2026).
- Leaflet.js. (2026). *Leaflet Interactive Map Library Documentation*. Retrieved from https://leafletjs.com/reference.html (Accessed 19 June 2026).
- Nielsen Norman Group. (2023). *Mobile UX: Design best practices*. Retrieved from https://www.nngroup.com (Accessed 19 June 2026).
- Studio Freight. (2024). *Lenis Smooth Scroll Engine*. Retrieved from https://github.com/studio-freight/lenis (Accessed 19 June 2026).
- Unsplash. (2026). *Free high-resolution food photography*. Retrieved from https://www.unsplash.com (Accessed 19 June 2026).
