/* =========================================
   DW33PY OS - KINETIC ENGINE v4
   ========================================= */

// --- PRELOADER ---
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
    setTimeout(() => {
        clearInterval(iv);
        if(bar) bar.style.width = '100%';
        if(loader) loader.classList.add('done');
        document.body.classList.remove('loading');
    }, 1200);
}

// --- CUSTOM CURSOR ---
const cursorDot = document.getElementById('cursorDot');
const cursorRing = document.getElementById('cursorRing');
let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX; mouseY = e.clientY;
    if(cursorDot) { cursorDot.style.left = mouseX + 'px'; cursorDot.style.top = mouseY + 'px'; }
});

function animateCursor() {
    ringX += (mouseX - ringX) * 0.15;
    ringY += (mouseY - ringY) * 0.15;
    if(cursorRing) { cursorRing.style.left = ringX + 'px'; cursorRing.style.top = ringY + 'px'; }
    requestAnimationFrame(animateCursor);
}
animateCursor();

document.querySelectorAll('a, button, .cap-acc-item, .work-card, .pkg-card').forEach(el => {
    el.addEventListener('mouseenter', () => cursorRing && cursorRing.classList.add('hovering'));
    el.addEventListener('mouseleave', () => cursorRing && cursorRing.classList.remove('hovering'));
});

// --- MAGNETIC BUTTONS ---
document.querySelectorAll('.magnetic').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
    });
    btn.addEventListener('mouseleave', () => btn.style.transform = 'translate(0, 0)');
});

// --- NAVIGATION ---
window.go = function(id) {
    const el = document.getElementById(id);
    if(el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    if(header) header.classList.toggle('scrolled', window.scrollY > 50);
}, { passive: true });

// --- HERO TERMINAL TYPING ---
const terminalBody = document.getElementById('terminalBody');
const commands = [
    { text: "$ npm install dw33py-studio", delay: 20 },
    { text: "> Fetching full-service capabilities...", delay: 10, class: "term-line" },
    { text: "> Wiring M-Pesa Daraja API...", delay: 10, class: "term-line" },
    { text: "> Generating high-converting copy...", delay: 10, class: "term-line" },
    { text: "> Deploying to global CDN...", delay: 10, class: "term-line" },
    { text: "✔ Build successful. Business is live.", delay: 20, class: "term-cmd" }
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
        const cursor = document.createElement('span');
        cursor.className = 'term-cursor';
        terminalBody.appendChild(cursor);
    }
}
setTimeout(typeTerminal, 1400);

// --- CAPABILITIES (Expanding Accordion) ---
const CAPABILITIES = [
    {
        num: '01', title: 'Custom Web Architecture & SPAs',
        desc: 'Tailor-coded websites built from the ground up. No templates, no bloated page builders—just pure, high-performance code designed to scale with your business. We build Single Page Apps (SPAs) and Server-Side Rendered (SSR) sites for lightning-fast route transitions.',
        tags: ['React/Next.js', 'SSR/SSG', 'TypeScript', 'Webflow', 'Framer']
    },
    {
        num: '02', title: 'Headless E-Commerce Engineering',
        desc: 'Next-generation online stores using headless architecture. We decouple the frontend from the backend (Shopify/Medusa) to deliver lightning-fast cart experiences that convert visitors into loyal customers without the lag of traditional themes.',
        tags: ['Shopify Hydrogen', 'Medusa.js', 'Custom Carts', 'Inventory Sync', 'Abandoned Cart Logic']
    },
    {
        num: '03', title: 'M-Pesa Daraja & Payment APIs',
        desc: 'Frictionless local and global payments. Deep integration with the Safaricom Daraja API for STK Push, C2B, and B2B flows, including automated webhooks and reconciliation. Plus global card gateways like Stripe.',
        tags: ['Daraja STK Push', 'C2B/B2C APIs', 'Stripe Integration', 'Automated Webhooks', 'Recurring Billing']
    },
    {
        num: '04', title: 'Graphic Design & Brand Identity',
        desc: 'A beautiful website needs a beautiful brand. We handle your entire visual identity—from logo design and color palettes to typography systems and social media assets. We ensure your brand looks premium everywhere.',
        tags: ['Logo Design', 'Brand Guidelines', 'Social Media Assets', 'Typography', 'Visual Systems']
    },
    {
        num: '05', title: 'Website Copywriting & Content',
        desc: 'Words sell. We write high-converting, SEO-optimized copy for your website. From punchy headlines to engaging "About Us" stories and product descriptions, we ensure your message connects with your audience and ranks on Google.',
        tags: ['SEO Copywriting', 'Brand Voice', 'Product Descriptions', 'Storytelling', 'Content Strategy']
    },
    {
        num: '06', title: 'SEO & Core Web Vitals Mastery',
        desc: 'Technical dominance on Google. We ensure your site hits perfect 100/100 Lighthouse scores. Structured data, semantic HTML, and flawless performance metrics to ensure you rank and convert.',
        tags: ['Lighthouse Optimization', 'Schema Markup', 'Semantic HTML', 'Meta Strategy', 'Site Speed Audits']
    },
    {
        num: '07', title: 'Custom Backend & Automations',
        desc: 'Robust server-side architecture. Node.js, Express, and Supabase setups tailored to your specific data and automation requirements. Connecting your digital stack to remove manual work.',
        tags: ['Node.js/Express', 'Supabase/Firebase', 'REST/GraphQL', 'WhatsApp Bots', 'CRM API Syncing']
    },
    {
        num: '08', title: 'Hosting, Maintenance & Support',
        desc: 'Launch day is just the beginning. We provide ongoing hosting management, security updates, daily backups, and priority support. We monitor your site 24/7 so you can focus on running your business.',
        tags: ['Managed Hosting', 'Security Patching', 'Daily Backups', 'Uptime Monitoring', 'Priority Support']
    }
];

const capAccordion = document.getElementById('capAccordion');
CAPABILITIES.forEach((c, i) => {
    const item = document.createElement('div');
    item.className = 'cap-acc-item reveal';
    if(i === 0) item.classList.add('open');
    item.setAttribute('role', 'button');
    item.setAttribute('tabindex', '0');
    item.setAttribute('aria-expanded', i === 0 ? 'true' : 'false');
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
                <p class="cap-desc">${c.desc}</p>
                <div class="cap-tags">
                    ${c.tags.map(t => `<span class="cap-tag">${t}</span>`).join('')}
                </div>
            </div>
        </div>
    `;
    item.addEventListener('click', () => {
        item.classList.toggle('open');
        item.setAttribute('aria-expanded', item.classList.contains('open'));
    });
    item.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            item.click();
        }
    });
    capAccordion.appendChild(item);
});

// --- DEPLOYMENTS (Optimized iFrame Loading) ---
const PROJECTS = [
    {name:'Nomadique', url:'https://nomadique-gray.vercel.app/'},
    {name:'Asili', url:'https://asili-lovat.vercel.app/'},
    {name:'PrimeShield', url:'https://primeshield-iota.vercel.app/'},
    {name:'Kofi', url:'https://kofi-beta.vercel.app/'}
];

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
            <div class="browser-viewport">
                <div class="w-overlay"></div>
                <div class="iframe-skeleton"></div>
                <iframe data-src="${p.url}" loading="lazy" title="${p.name} Live Preview"></iframe>
            </div>
        </div>
    `;
    workTrack.appendChild(card);
});

// Intersection Observer to load iFrames only when scrolled near
const iframeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const iframe = entry.target.querySelector('iframe');
            const skeleton = entry.target.querySelector('.iframe-skeleton');
            if (iframe && !iframe.src) {
                iframe.src = iframe.dataset.src;
                iframe.onload = () => {
                    if(skeleton) skeleton.style.display = 'none';
                };
            }
            iframeObserver.unobserve(entry.target);
        }
    });
}, { rootMargin: '200px 0px' });

document.querySelectorAll('.work-card').forEach(card => iframeObserver.observe(card));

// --- DRAG TRACK WITH INERTIA ---
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

function beginInertia() {
    if (Math.abs(velocity) > 0.5) {
        workTrack.scrollLeft -= velocity;
        velocity *= 0.92;
        momentumID = requestAnimationFrame(beginInertia);
    }
}

// --- PRICING (3D Tilt) ---
const PRICING = [
    {name:'The Starter', desc:'Rapid, high-impact landing pages for campaigns or product launches.', price:'PoR', features:['Single-page architecture', 'GSAP Micro-interactions', 'Mobile-first optimization', 'Netlify Deployment', 'WhatsApp integration', 'Basic SEO Setup'], featured:false},
    {name:'The Business', desc:'Full multi-page business architecture designed to scale and dominate.', price:'PoR', features:['Multi-section architecture', 'Advanced scroll storytelling', 'Booking / Order systems', 'M-Pesa STK Push wiring', 'Website Copywriting (5 pages)', 'Graphic Design Assets'], featured:true},
    {name:'The Empire', desc:'Headless e-commerce, PWAs, and full-service creative for serious retailers.', price:'PoR', features:['Full PWA (Android + iOS)', 'Headless E-commerce cart', 'Admin dashboard & inventory', 'Stripe + M-Pesa bundle', 'Full Brand Identity Package', 'Ongoing Maintenance & Hosting'], featured:false}
];

const pricingGrid = document.getElementById('pricingGrid');
PRICING.forEach(p => {
    const col = document.createElement('div');
    col.className = `pkg-card reveal ${p.featured ? 'featured' : ''}`;
    col.innerHTML = `
        ${p.featured ? '<div class="pkg-badge">Most Popular</div>' : ''}
        <div class="pkg-name">${p.name}</div>
        <div class="pkg-desc">${p.desc}</div>
        <div class="pkg-price">${p.price} <span>(Quote on Request)</span></div>
        <ul class="pkg-features">
            ${p.features.map(f => `<li>${f}</li>`).join('')}
        </ul>
        <a href="https://wa.me/254112271833?text=Hey%20Dw33pY!%20I'm%20interested%20in%20${p.name}." target="_blank" rel="noopener" class="pkg-btn">Request Quote →</a>
    `;
    pricingGrid.appendChild(col);
});

// 3D Tilt logic for pricing cards
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

// --- CONTACT INFO ---
const CONTACTS = [
    {label:'WhatsApp', val:'+254 112 271 833', href:'https://wa.me/254112271833'},
    {label:'Email', val:'dwaynemwaniki3@gmail.com', href:'mailto:dwaynemwaniki3@gmail.com'},
    {label:'Phone', val:'+254 112 271 833', href:'tel:+254112271833'}
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

// --- SCROLL REVEAL ---
const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            obs.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
document.getElementById('yr').textContent = new Date().getFullYear();