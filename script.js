/* =========================================
   DW33PY OS — KINETIC ENGINE v5
   Copy overhaul per Sell Like Crazy by Sabri Suby
   ========================================= */

// --- PRELOADER — fires on DOMContentLoaded with 1.2s fallback ---
document.addEventListener('DOMContentLoaded', initLoader);
if (document.readyState !== 'loading') initLoader();

function initLoader() {
    const bar = document.getElementById('lbar');
    const loader = document.getElementById('loader');
    let p = 0;
    const iv = setInterval(() => {
        p += Math.random() * 15;
        if (p >= 95) { p = 95; clearInterval(iv); }
        if(bar) bar.style.width = p + '%';
    }, 100);
    // Hard fallback — always hides loader after 1.2s even if assets are slow
    setTimeout(() => {
        clearInterval(iv);
        if(bar) bar.style.width = '100%';
        if(loader) loader.classList.add('done');
        document.body.classList.remove('loading');
    }, 1200);
}

// --- CUSTOM CURSOR — follows mouse with lerp on the ring for smooth trailing ---
const cursorDot = document.getElementById('cursorDot');
const cursorRing = document.getElementById('cursorRing');
let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX; mouseY = e.clientY;
    if(cursorDot) { cursorDot.style.left = mouseX + 'px'; cursorDot.style.top = mouseY + 'px'; }
});

// Lerp animation loop — ring trails behind dot for cinematic feel
function animateCursor() {
    ringX += (mouseX - ringX) * 0.15;
    ringY += (mouseY - ringY) * 0.15;
    if(cursorRing) { cursorRing.style.left = ringX + 'px'; cursorRing.style.top = ringY + 'px'; }
    requestAnimationFrame(animateCursor);
}
animateCursor();

// Add hovering class to cursor ring when over interactive elements
document.querySelectorAll('a, button, .cap-acc-item, .work-card, .pkg-card').forEach(el => {
    el.addEventListener('mouseenter', () => cursorRing && cursorRing.classList.add('hovering'));
    el.addEventListener('mouseleave', () => cursorRing && cursorRing.classList.remove('hovering'));
});

// --- MAGNETIC BUTTONS — translates toward cursor on hover for tactile feel ---
document.querySelectorAll('.magnetic').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
    });
    btn.addEventListener('mouseleave', () => btn.style.transform = 'translate(0, 0)');
});

// --- NAVIGATION — smooth scroll to section by ID ---
window.go = function(id) {
    const el = document.getElementById(id);
    if(el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

// Add scrolled class to header on scroll for background blur
window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    if(header) header.classList.toggle('scrolled', window.scrollY > 50);
}, { passive: true });

// --- HERO TERMINAL TYPING — credible messages per copy doc (no fabricated metrics) ---
const terminalBody = document.getElementById('terminalBody');
const commands = [
    { text: "$ dw33py start", delay: 20 },
    { text: "Understanding the business.", delay: 15, class: "term-line" },
    { text: "Mapping the customer journey.", delay: 15, class: "term-line" },
    { text: "Designing the experience.", delay: 15, class: "term-line" },
    { text: "Building for real-world use.", delay: 15, class: "term-line" },
    { text: "✔ Ready to discuss your project.", delay: 20, class: "term-cmd" }
];

let cmdIndex = 0, charIndex = 0;
function typeTerminal() {
    if (cmdIndex < commands.length) {
        const cmd = commands[cmdIndex];
        if (charIndex <= cmd.text.length) {
            const lineId = `term-line-${cmdIndex}`;
            let line = document.getElementById(lineId);
            if (!line) {
                line = document.createElement('div');
                line.id = lineId;
                line.className = cmd.class || '';
                terminalBody.appendChild(line);
            }
            line.textContent = cmd.text.substring(0, charIndex);
            charIndex++;
            setTimeout(typeTerminal, cmd.delay);
        } else {
            cmdIndex++;
            charIndex = 0;
            setTimeout(typeTerminal, 150);
        }
    } else {
        // Add blinking cursor at the end
        const cursor = document.createElement('span');
        cursor.className = 'term-cursor';
        terminalBody.appendChild(cursor);
    }
}
// Start typing after preloader fades
setTimeout(typeTerminal, 1400);

// ====== CAPABILITIES DATA — rewritten per Sell Like Crazy: benefit-first, no jargon ======
const CAPABILITIES = [
    {
        num: '01',
        title: 'Website Design & Development',
        heading: 'Websites that work for your business.',
        desc: 'Give your business a professional home online. We design and build responsive websites that communicate your value clearly, showcase what makes you different, and guide visitors toward useful next steps.',
        benefits: [
            'Responsive layouts for phones, tablets, and desktops',
            'Clear navigation and purposeful page structure',
            'Brand-aligned visual design',
            'Thoughtful calls to action',
            'An experience designed around your customers'
        ],
        cta: 'Discuss Your Website'
    },
    {
        num: '02',
        title: 'E-commerce Development',
        heading: 'Make the path from browsing to buying clearer.',
        desc: 'Give customers a more organized way to explore your products, understand what you offer, and move toward purchasing. We create e-commerce experiences around your catalogue, brand, and operational needs.',
        benefits: [
            'Clear product presentation',
            'Intuitive browsing and navigation',
            'Responsive shopping experiences',
            'Appropriate payment and checkout integrations',
            'A structure that supports your business requirements'
        ],
        cta: 'Explore E-commerce'
    },
    {
        num: '03',
        title: 'M-Pesa & Payment Integrations',
        heading: 'Make paying more convenient for your customers.',
        desc: 'Where your business requires it, we can integrate suitable payment solutions to support a smoother customer journey. The implementation is planned around your workflow, provider requirements, and operational needs.',
        benefits: [
            'Appropriate payment-provider integration',
            'Clear payment-flow planning',
            'Integration testing and error handling',
            'Practical implementation guidance'
        ],
        cta: 'Discuss Payment Integration'
    },
    {
        num: '04',
        title: 'SEO & Website Optimization',
        heading: 'Build a stronger foundation for being found online.',
        desc: 'Help search engines understand your website and give visitors a better experience. We focus on relevant technical foundations, clear page structure, useful metadata, and appropriate on-page optimization.',
        benefits: [
            'Search-friendly page titles and descriptions',
            'Logical headings and content structure',
            'Technical SEO fundamentals',
            'Relevant internal linking',
            'Performance and mobile-usability considerations'
        ],
        cta: 'Improve My Website'
    },
    {
        num: '05',
        title: 'Branding & Graphic Design',
        heading: 'Make your business recognizable and consistent.',
        desc: 'Build a more cohesive visual identity across your website and digital touchpoints. We help align the presentation of your business with the impression you want customers to remember.',
        benefits: [
            'Brand-aligned visual direction',
            'Appropriate graphic assets',
            'Consistent use of typography and visual elements',
            'Digital design that supports your message'
        ],
        cta: 'Discuss My Brand'
    },
    {
        num: '06',
        title: 'Website Copywriting',
        heading: 'Give customers a clearer reason to choose you.',
        desc: 'Explain what your business does, who it serves, and why it matters. We structure website messaging around your customers\' needs, your actual strengths, and the action you want visitors to take.',
        benefits: [
            'Clearer headlines and descriptions',
            'Customer-focused messaging',
            'Benefit-led service pages',
            'Purposeful calls to action',
            'Consistent communication across the website'
        ],
        cta: 'Improve My Website Copy'
    },
    // Retained extra services — rewritten with benefit-first approach per copy doc
    {
        num: '07',
        title: 'Custom Backend & Automations',
        heading: 'Connect your tools and remove manual work.',
        desc: 'Where your business relies on systems working together, we can build appropriate backend logic and automations. The goal is to reduce repetitive tasks and help your website work alongside the tools you already use.',
        benefits: [
            'Backend architecture planned around your needs',
            'API connections where relevant',
            'Automated workflows to reduce manual work',
            'Practical implementation guidance'
        ],
        cta: 'Discuss Custom Solutions'
    },
    {
        num: '08',
        title: 'Hosting, Maintenance & Support',
        heading: 'Keep your website running smoothly after launch.',
        desc: 'A website needs ongoing attention to stay secure and functional. Where agreed, we provide hosting management, security updates, and practical support so your website remains dependable over time.',
        benefits: [
            'Managed hosting setup where agreed',
            'Security updates applied as needed',
            'Practical ongoing support',
            'Clear guidance for maintaining your site'
        ],
        cta: 'Discuss Ongoing Support'
    }
];

// --- Render Capabilities Accordion ---
const capAccordion = document.getElementById('capAccordion');
CAPABILITIES.forEach((c, i) => {
    const item = document.createElement('div');
    item.className = 'cap-acc-item reveal';
    if(i === 0) item.classList.add('open'); // Open first item by default
    item.setAttribute('role', 'button');
    item.setAttribute('tabindex', '0');
    item.setAttribute('aria-expanded', i === 0 ? 'true' : 'false');

    // WhatsApp link for this service's CTA — uses general project discussion message
    const waMsg = encodeURIComponent("Hi Dw33pY! I'd like to discuss a website project for my business. Could we talk about the requirements, options, and pricing?");

    item.innerHTML = `
        <div class="cap-acc-header">
            <div class="cap-acc-left">
                <span class="cap-num">${c.num}</span>
                <span class="cap-title">${c.title}</span>
            </div>
            <span class="cap-toggle">+</span>
        </div>
        <div class="cap-acc-content">
            <div class="cap-content-inner">
                <div>
                    <h3 style="font-family: var(--font-display); font-size: 24px; font-weight: 600; margin-bottom: 16px; color: var(--c-acid);">${c.heading}</h3>
                    <p class="cap-desc">${c.desc}</p>
                    <a href="https://wa.me/254112271833?text=${waMsg}" target="_blank" rel="noopener" class="cap-cta btn-ghost" style="margin-top: 24px; display: inline-block;">${c.cta} →</a>
                </div>
                <ul class="cap-benefits" style="list-style: none; display: flex; flex-direction: column; gap: 12px;">
                    ${c.benefits.map(b => `<li style="display: flex; align-items: flex-start; gap: 10px; font-size: 16px; color: var(--text-muted);"><span style="color: var(--c-acid); font-weight: 700; flex-shrink: 0;">✓</span> ${b}</li>`).join('')}
                </ul>
            </div>
        </div>
    `;

    // Toggle accordion open/close on click
    item.addEventListener('click', (e) => {
        // Don't toggle if clicking the CTA link inside
        if(e.target.closest('.cap-cta')) return;
        item.classList.toggle('open');
        item.setAttribute('aria-expanded', item.classList.contains('open'));
    });

    // Keyboard accessibility — Enter/Space toggles
    item.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            item.click();
        }
    });
    capAccordion.appendChild(item);
});

// ====== PORTFOLIO DATA — static mockup cards (no iframes), accurate descriptions ======
// Each project has a themed gradient for the visual instead of a heavy live iframe
const PROJECTS = [
    {
        name: 'Nomadique',
        url: 'https://nomadique-gray.vercel.app/',
        category: 'Travel & Storytelling',
        label: 'Demo Project',
        emoji: '🌍',
        gradient: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 50%, #FFD700 100%)',
        desc: 'Designed to help a travel-focused brand present its destinations more clearly, establish a consistent online identity, and guide visitors toward exploring available experiences.'
    },
    {
        name: 'Asili',
        url: 'https://asili-lovat.vercel.app/',
        category: 'Eco-Friendly Brand',
        label: 'Demo Project',
        emoji: '🌿',
        gradient: 'linear-gradient(135deg, #2D6A4F 0%, #52B788 50%, #95D5B2 100%)',
        desc: 'Designed to help an eco-conscious brand present its products and values more clearly, build trust through a consistent visual identity, and guide visitors toward learning more.'
    },
    {
        name: 'PrimeShield',
        url: 'https://primeshield-iota.vercel.app/',
        category: 'Security & Technology',
        label: 'Demo Project',
        emoji: '🛡️',
        gradient: 'linear-gradient(135deg, #1A1A2E 0%, #16213E 50%, #0F3460 100%)',
        desc: 'Designed to help a security-focused business present its services more clearly, communicate credibility through structure, and guide visitors toward making an enquiry.'
    },
    {
        name: 'Kofi',
        url: 'https://kofi-beta.vercel.app/',
        category: 'Personal & Lifestyle',
        label: 'Demo Project',
        emoji: '☕',
        gradient: 'linear-gradient(135deg, #6F4E37 0%, #A0826D 50%, #D4A373 100%)',
        desc: 'Designed to help a personal brand present its story and offerings more clearly, create a warm and approachable online presence, and guide visitors toward connecting.'
    },
    // --- New projects added per user request ---
    {
        name: 'Travel Tribe',
        url: 'https://traveltribe-phi.vercel.app/',
        category: 'Travel & Community',
        label: 'Demo Project',
        emoji: '✈️',
        gradient: 'linear-gradient(135deg, #006994 0%, #0099CC 50%, #66CCFF 100%)',
        desc: 'Designed to help a travel community present its destinations and experiences more clearly, build a sense of connection among members, and guide visitors toward joining or exploring available trips.'
    },
    {
        name: 'Langat Nail Lounge',
        url: 'https://langatanaillounge.vercel.app/',
        category: 'Beauty & Salon',
        label: 'Demo Project',
        emoji: '💅',
        gradient: 'linear-gradient(135deg, #C71585 0%, #FF1493 50%, #FF69B4 100%)',
        desc: 'Designed to help a beauty and nail lounge present its services more clearly, showcase its work visually, and guide visitors toward booking an appointment.'
    },
    {
        name: 'Sereni Fries',
        url: 'https://serenifries.vercel.app/',
        category: 'Food & Restaurant',
        label: 'Demo Project',
        emoji: '🍟',
        gradient: 'linear-gradient(135deg, #FF8C00 0%, #FFA500 50%, #FFD700 100%)',
        desc: 'Designed to help a food business present its menu more clearly, create an appetite-appealing online presence, and guide visitors toward placing an order or visiting the location.'
    },
    {
        name: 'Nest',
        url: 'https://nest-xi-lime.vercel.app/',
        category: 'Hospitality & Lifestyle',
        label: 'Demo Project',
        emoji: '🏡',
        gradient: 'linear-gradient(135deg, #2C3E50 0%, #5D6D7E 50%, #AEB6BF 100%)',
        desc: 'Designed to help a hospitality or lifestyle brand present its offerings more clearly, create a welcoming online identity, and guide visitors toward making a booking or enquiry.'
    },
    {
        name: 'Njia',
        url: 'https://njia-puce.vercel.app/services.html',
        category: 'Services & Consulting',
        label: 'Demo Project',
        emoji: '🛣️',
        gradient: 'linear-gradient(135deg, #1B5E20 0%, #388E3C 50%, #81C784 100%)',
        desc: 'Designed to help a services business present its offerings more clearly, communicate its expertise, and guide visitors toward understanding the solutions available to them.'
    }
];

// --- Render Portfolio Cards (static mockup, no iframes) ---
const workTrack = document.getElementById('workTrack');
PROJECTS.forEach(p => {
    const card = document.createElement('div');
    card.className = 'work-card reveal';
    card.innerHTML = `
        <div class="browser-mockup">
            <div class="browser-bar">
                <span class="dot red"></span><span class="dot yellow"></span><span class="dot green"></span>
                <div class="browser-url">${p.url}</div>
            </div>
            <div class="browser-viewport" style="background: ${p.gradient};">
                <div class="mockup-content">
                    <span class="mockup-emoji">${p.emoji}</span>
                    <span class="mockup-name">${p.name}</span>
                </div>
            </div>
        </div>
        <div class="work-info">
            <div class="work-label">${p.label}</div>
            <div class="work-name">${p.name}</div>
            <div class="work-category">${p.category}</div>
            <p class="work-desc">${p.desc}</p>
            <a href="${p.url}" target="_blank" rel="noopener" class="work-link">View Live Site →</a>
        </div>
    `;
    workTrack.appendChild(card);
});

// --- DRAG TO SCROLL — desktop only, with inertia for smooth momentum ---
let isDown = false, startX = 0, scrollLeft = 0, velocity = 0, momentumID = null;

workTrack.addEventListener('mousedown', (e) => {
    if (window.innerWidth > 768) {
        isDown = true;
        workTrack.classList.add('active');
        startX = e.pageX - workTrack.offsetLeft;
        scrollLeft = workTrack.scrollLeft;
        velocity = 0;
        cancelAnimationFrame(momentumID);
    }
});
workTrack.addEventListener('mouseleave', () => { isDown = false; workTrack.classList.remove('active'); beginInertia(); });
workTrack.addEventListener('mouseup', () => { isDown = false; workTrack.classList.remove('active'); beginInertia(); });
workTrack.addEventListener('mousemove', (e) => {
    if (!isDown || window.innerWidth <= 768) return;
    e.preventDefault();
    const x = e.pageX - workTrack.offsetLeft;
    const walk = (x - startX) * 1.5;
    velocity = walk - (scrollLeft - workTrack.scrollLeft);
    scrollLeft = workTrack.scrollLeft - walk;
    workTrack.scrollLeft = scrollLeft;
});

// Inertia — keeps scrolling after mouse release, decelerates gradually
function beginInertia() {
    if (Math.abs(velocity) > 0.5) {
        workTrack.scrollLeft -= velocity;
        velocity *= 0.92; // Friction coefficient — higher = stops faster
        momentumID = requestAnimationFrame(beginInertia);
    }
}

// ====== PROCESS DATA — new section per copy doc ======
const PROCESS = [
    { num: '1', title: 'Understand', desc: 'We discuss your business, audience, services, goals, and what your website needs to accomplish.' },
    { num: '2', title: 'Plan', desc: 'We agree on the proposed solution, scope, deliverables, timeline, and price before moving forward.' },
    { num: '3', title: 'Build', desc: 'We design and develop the website, review the experience across relevant devices, and work through the agreed refinement process.' },
    { num: '4', title: 'Launch', desc: 'We prepare the website for launch and provide the agreed deliverables and guidance for using or maintaining it.' }
];

// --- Render Process Steps ---
const processGrid = document.getElementById('processGrid');
PROCESS.forEach(p => {
    const step = document.createElement('div');
    step.className = 'process-step reveal';
    step.innerHTML = `
        <div class="process-num">${p.num}</div>
        <h3 class="process-title">${p.title}</h3>
        <p class="process-desc">${p.desc}</p>
    `;
    processGrid.appendChild(step);
});

// ====== PRICING DATA — benefit-focused descriptions, existing prices retained ======
const PRICING = [
    {
        name: 'The Starter',
        bestFor: 'For businesses that need a clear, professional single-page website.',
        desc: 'A focused starting point for businesses that need a professional online presence without a complex multi-page structure.',
        price: 'PoR',
        priceSub: 'Quote on Request',
        features: [
            'Single-page website design',
            'Responsive layout for all devices',
            'Clear calls to action',
            'WhatsApp contact integration',
            'Basic SEO setup',
            'Deployment included'
        ],
        featured: false
    },
    {
        name: 'The Business',
        bestFor: 'For businesses that want to present their services clearly and guide visitors toward useful next steps.',
        desc: 'A complete multi-page website for businesses that want to present their services clearly, build credibility, and make it easier for customers to take the next step.',
        price: 'PoR',
        priceSub: 'Quote on Request',
        features: [
            'Multi-page website architecture',
            'Clear navigation and page structure',
            'Booking or enquiry system where needed',
            'M-Pesa payment integration where applicable',
            'Website copywriting for up to 5 pages',
            'Graphic design assets included'
        ],
        featured: true
    },
    {
        name: 'The Empire',
        bestFor: 'For businesses that need e-commerce functionality, more advanced features, or a more tailored approach.',
        desc: 'A more complete online experience for businesses that need e-commerce functionality, product catalogues, or more advanced features to support their operations.',
        price: 'PoR',
        priceSub: 'Quote on Request',
        features: [
            'Full e-commerce functionality',
            'Product catalogue and cart',
            'Admin dashboard where applicable',
            'M-Pesa and card payment options',
            'Full brand identity package',
            'Ongoing maintenance where agreed'
        ],
        featured: false
    }
];

// --- Render Pricing Cards ---
const pricingGrid = document.getElementById('pricingGrid');
PRICING.forEach(p => {
    const col = document.createElement('div');
    col.className = `pkg-card reveal ${p.featured ? 'featured' : ''}`;
    // WhatsApp link — general project discussion message
    const waMsg = encodeURIComponent("Hi Dw33pY! I'd like to discuss a website project for my business. Could we talk about the requirements, options, and pricing?");
    col.innerHTML = `
        ${p.featured ? '<div class="pkg-badge">Most Popular</div>' : ''}
        <div class="pkg-name">${p.name}</div>
        <div class="pkg-desc">${p.bestFor}</div>
        <div class="pkg-price">${p.price}</div>
        <div class="pkg-price-sub">${p.priceSub}</div>
        <ul class="pkg-features">
            ${p.features.map(f => `<li>${f}</li>`).join('')}
        </ul>
        <a href="https://wa.me/254112271833?text=${waMsg}" target="_blank" rel="noopener" class="pkg-btn">Find the Right Fit →</a>
    `;
    pricingGrid.appendChild(col);
});

// --- 3D Tilt logic for pricing cards — desktop only ---
document.querySelectorAll('.pkg-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const xRatio = (x / rect.width - 0.5);
        const yRatio = (y / rect.height - 0.5);

        card.style.transform = `translateY(-8px) rotateY(${xRatio * 5}deg) rotateX(${-yRatio * 5}deg)`;
    });
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) rotateY(0) rotateX(0)';
    });
});

// ====== CONTACT INFO — accurate details ======
const CONTACTS = [
    { label: 'WhatsApp', val: '+254 112 271 833', href: 'https://wa.me/254112271833' },
    { label: 'Email', val: 'dwaynemwaniki3@gmail.com', href: 'mailto:dwaynemwaniki3@gmail.com' },
    { label: 'Phone', val: '+254 112 271 833', href: 'tel:+254112271833' }
];

const contactGrid = document.getElementById('contactGrid');
CONTACTS.forEach(c => {
    const item = document.createElement('a');
    item.href = c.href;
    if (c.href.startsWith('http')) item.target = '_blank';
    item.rel = 'noopener';
    item.className = 'contact-item reveal';
    item.innerHTML = `<div class="contact-label">${c.label}</div><div class="contact-val">${c.val}</div>`;
    contactGrid.appendChild(item);
});

// --- SCROLL REVEAL — IntersectionObserver fades elements in as they enter viewport ---
const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            obs.unobserve(entry.target); // Only reveal once
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => obs.observe(el));

// Update copyright year automatically
document.getElementById('yr').textContent = new Date().getFullYear();
