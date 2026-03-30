// Main site behavior (testimonials slider, navigation, contact form, and element SDK).
/* global lucide */

// ===== Default Config =====
const defaultConfig = {
  // Colors
  background_color: '#1A1A2E',
  surface_color: '#16213E',
  text_color: '#E5E7EB',
  primary_action_color: '#F97316',
  secondary_action_color: '#0D9488',
  // Font
  font_family: 'Sora',
  font_size: 16,
  // Edit panel text
  hero_title: 'KELUU Driving School',
  hero_subtitle: 'Learn to Drive from the Professionals',
  cta_text: 'Book a Class Today',
  location_text: 'KVDA Plaza, Eldoret',
  phone_text: '0707899202',
  footer_description:
    'Your trusted partner on the road to driving excellence. Licensed and accredited driving school in Eldoret, Kenya.'
};

// ===== Testimonials Data =====
const testimonials = [
  {
    name: 'Grace Wanjiku',
    text: 'KELUU made me feel so confident behind the wheel. I passed my test on the first try! The instructors are patient and professional.',
    rating: 5
  },
  {
    name: 'Brian Kiprop',
    text: 'Excellent school! The defensive driving course was eye-opening. I now feel much safer on Kenyan roads. Highly recommended!',
    rating: 5
  },
  {
    name: 'Faith Chebet',
    text: 'I was terrified of driving but KELUU\'s approach is so supportive. Within weeks I was driving confidently around Eldoret.',
    rating: 5
  },
  {
    name: 'Kevin Otieno',
    text: 'Great value for money. The vehicles are modern and well-maintained. The theory support helped me ace the written test.',
    rating: 4
  }
];

let currentTestimonial = 0;

function renderTestimonials() {
  const track = document.getElementById('testimonialTrack');
  const dots = document.getElementById('testimonialDots');
  if (!track || !dots) return;

  track.innerHTML = '';
  dots.innerHTML = '';

  testimonials.forEach((t, i) => {
    const card = document.createElement('div');
    card.className = 'w-full shrink-0';
    card.innerHTML = `
      <div class="max-w-2xl mx-auto bg-dark/60 border border-white/5 rounded-2xl p-8 sm:p-10 text-center">
        <div class="flex justify-center gap-1 mb-4">
          ${Array(5)
            .fill(0)
            .map((_, j) => {
              const filled = j < t.rating;
              return `<i data-lucide="star" class="w-5 h-5 ${filled ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'}"></i>`;
            })
            .join('')}
        </div>
        <p class="text-gray-300 text-lg leading-relaxed italic mb-6">"${t.text}"</p>
        <div class="w-12 h-12 rounded-full bg-brand/20 flex items-center justify-center mx-auto mb-3">
          <span class="font-display font-700 text-brand text-lg">${t.name[0]}</span>
        </div>
        <p class="font-display font-700 text-white">${t.name}</p>
        <p class="text-gray-500 text-sm">Student</p>
      </div>
    `;

    track.appendChild(card);

    const dot = document.createElement('button');
    dot.className = `w-3 h-3 rounded-full transition-all duration-300 ${i === 0 ? 'bg-brand w-8' : 'bg-white/20'}`;
    dot.addEventListener('click', () => goToTestimonial(i));
    dots.appendChild(dot);
  });

  if (window.lucide && typeof window.lucide.createIcons === 'function') {
    lucide.createIcons();
  }
  updateTestimonialPosition();
}

function goToTestimonial(index) {
  currentTestimonial = index;
  updateTestimonialPosition();
}

function updateTestimonialPosition() {
  const track = document.getElementById('testimonialTrack');
  const dotsWrap = document.getElementById('testimonialDots');
  if (!track || !dotsWrap) return;

  track.style.transform = `translateX(-${currentTestimonial * 100}%)`;

  const dots = dotsWrap.children;
  for (let i = 0; i < dots.length; i++) {
    dots[i].className =
      `h-3 rounded-full transition-all duration-300 ${i === currentTestimonial ? 'bg-brand w-8' : 'bg-white/20 w-3'}`;
  }
}

// ===== Testimonials Controls =====
const prevBtn = document.getElementById('prevTest');
const nextBtn = document.getElementById('nextTest');
if (prevBtn) prevBtn.addEventListener('click', () => {
  currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
  updateTestimonialPosition();
});
if (nextBtn) nextBtn.addEventListener('click', () => {
  currentTestimonial = (currentTestimonial + 1) % testimonials.length;
  updateTestimonialPosition();
});

// Auto-slide testimonials
setInterval(() => {
  currentTestimonial = (currentTestimonial + 1) % testimonials.length;
  updateTestimonialPosition();
}, 5000);

// ===== Mobile Menu =====
const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');
let menuOpen = false;

if (menuToggle && mobileMenu) {
  menuToggle.addEventListener('click', () => {
    menuOpen = !menuOpen;
    mobileMenu.classList.toggle('hidden', !menuOpen);
    const menuIcon = document.getElementById('menuIcon');
    if (menuIcon) menuIcon.setAttribute('data-lucide', menuOpen ? 'x' : 'menu');
    if (window.lucide && typeof window.lucide.createIcons === 'function') lucide.createIcons();
  });

  document.querySelectorAll('.mobile-link').forEach((link) => {
    link.addEventListener('click', () => {
      menuOpen = false;
      mobileMenu.classList.add('hidden');
      const menuIcon = document.getElementById('menuIcon');
      if (menuIcon) menuIcon.setAttribute('data-lucide', 'menu');
      if (window.lucide && typeof window.lucide.createIcons === 'function') lucide.createIcons();
    });
  });
}

// ===== Sticky Nav + Scroll Reveal =====
const navbar = document.getElementById('navbar');
const appWrapper = document.getElementById('app-wrapper');

if (appWrapper && navbar) {
  appWrapper.addEventListener('scroll', () => {
    navbar.classList.toggle('nav-scrolled', appWrapper.scrollTop > 50);
  });
}

function checkReveal() {
  const reveals = document.querySelectorAll('.reveal:not(.visible)');
  reveals.forEach((el) => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.88) el.classList.add('visible');
  });
}

if (appWrapper) {
  appWrapper.addEventListener('scroll', checkReveal);
}
window.addEventListener('load', () => setTimeout(checkReveal, 200));

// ===== Contact Form =====
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('contactName')?.value.trim() || '';
    const phone = document.getElementById('contactPhone')?.value.trim() || '';
    const course = document.getElementById('contactCourse')?.value || '';
    const message = document.getElementById('contactMessage')?.value.trim() || '';

    const subject = encodeURIComponent(`Driving inquiry from ${name || 'Website Visitor'}`);
    const body = encodeURIComponent(
      `Name: ${name}\nPhone: ${phone}\nPreferred course: ${course}\n\nMessage:\n${message}`
    );

    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=edisonkipkemoi319@gmail.com&su=${subject}&body=${body}`;
    const mailtoUrl = `mailto:edisonkipkemoi319@gmail.com?subject=${subject}&body=${body}`;

    const newWindow = window.open(gmailUrl, '_blank');
    if (!newWindow) window.location.href = mailtoUrl;
  });
}

// ===== Element SDK =====
function applyConfig(config) {
  const bg = config.background_color || defaultConfig.background_color;
  const surface = config.surface_color || defaultConfig.surface_color;
  const text = config.text_color || defaultConfig.text_color;
  const primary = config.primary_action_color || defaultConfig.primary_action_color;
  const secondary = config.secondary_action_color || defaultConfig.secondary_action_color;
  const fontFamily = config.font_family || defaultConfig.font_family;
  const fontSize = config.font_size || defaultConfig.font_size;

  // Apply background
  document.body.style.backgroundColor = bg;
  document.querySelectorAll('.bg-dark').forEach((el) => (el.style.backgroundColor = bg));
  document.querySelectorAll('.bg-darkCard').forEach((el) => (el.style.backgroundColor = surface));

  // Apply text color to gray text elements
  document.querySelectorAll('.text-gray-300, .text-gray-400').forEach((el) => (el.style.color = text));

  // Apply primary action color
  document.querySelectorAll('.bg-brand').forEach((el) => {
    if (!el.closest('.whatsapp-btn')) el.style.backgroundColor = primary;
  });
  document.querySelectorAll('.text-brand').forEach((el) => (el.style.color = primary));

  // Apply secondary
  document.querySelectorAll('.text-teal').forEach((el) => (el.style.color = secondary));

  // Font
  const baseFontStack = 'Sora, sans-serif';
  document.body.style.fontFamily = `${fontFamily}, ${baseFontStack}`;

  // Font size scaling
  const base = fontSize;
  document.querySelectorAll('h1').forEach((el) => (el.style.fontSize = `${base * 2.5}px`));
  document.querySelectorAll('h2').forEach((el) => (el.style.fontSize = `${base * 2}px`));
  document.querySelectorAll('h3').forEach((el) => (el.style.fontSize = `${base * 1.25}px`));
  document.querySelectorAll('p, span, a, li, label, option').forEach((el) => {
    if (!el.closest('h1, h2, h3, h4')) el.style.fontSize = `${base}px`;
  });

  // Edit panel text
  const heroTitleEl = document.getElementById('heroTitle');
  if (heroTitleEl) {
    const titleText = config.hero_title || defaultConfig.hero_title;
    const parts = titleText.split(' ');
    if (parts.length >= 2) {
      heroTitleEl.innerHTML = `<span class="text-white" style="color: ${text}">${parts[0]}</span><br><span class="text-brand" style="color: ${primary}">${parts[1]}</span> <span class="text-white" style="color: ${text}">${parts.slice(2).join(' ')}</span>`;
    } else {
      heroTitleEl.innerHTML = `<span style="color: ${primary}">${titleText}</span>`;
    }
  }

  const heroSubtitleEl = document.getElementById('heroSubtitle');
  if (heroSubtitleEl) heroSubtitleEl.textContent = config.hero_subtitle || defaultConfig.hero_subtitle;

  const heroCtaEl = document.getElementById('heroCta');
  if (heroCtaEl) {
    heroCtaEl.innerHTML = `${config.cta_text || defaultConfig.cta_text} <i data-lucide="arrow-right" class="w-5 h-5 group-hover:translate-x-1 transition-transform"></i>`;
  }

  const locationTextEl = document.getElementById('locationText');
  if (locationTextEl) locationTextEl.textContent = config.location_text || defaultConfig.location_text;

  const phoneTextEl = document.getElementById('phoneText');
  if (phoneTextEl) phoneTextEl.textContent = config.phone_text || defaultConfig.phone_text;

  const footerDescEl = document.getElementById('footerDesc');
  if (footerDescEl) footerDescEl.textContent = config.footer_description || defaultConfig.footer_description;

  if (window.lucide && typeof window.lucide.createIcons === 'function') lucide.createIcons();
}

if (window.elementSdk) {
  window.elementSdk.init({
    defaultConfig,
    onConfigChange: async (config) => {
      applyConfig(config);
    },
    mapToCapabilities: (config) => ({
      recolorables: [
        {
          get: () => config.background_color || defaultConfig.background_color,
          set: (v) => {
            config.background_color = v;
            window.elementSdk.setConfig({ background_color: v });
          }
        },
        {
          get: () => config.surface_color || defaultConfig.surface_color,
          set: (v) => {
            config.surface_color = v;
            window.elementSdk.setConfig({ surface_color: v });
          }
        },
        {
          get: () => config.text_color || defaultConfig.text_color,
          set: (v) => {
            config.text_color = v;
            window.elementSdk.setConfig({ text_color: v });
          }
        },
        {
          get: () => config.primary_action_color || defaultConfig.primary_action_color,
          set: (v) => {
            config.primary_action_color = v;
            window.elementSdk.setConfig({ primary_action_color: v });
          }
        },
        {
          get: () => config.secondary_action_color || defaultConfig.secondary_action_color,
          set: (v) => {
            config.secondary_action_color = v;
            window.elementSdk.setConfig({ secondary_action_color: v });
          }
        }
      ],
      borderables: [],
      fontEditable: {
        get: () => config.font_family || defaultConfig.font_family,
        set: (v) => {
          config.font_family = v;
          window.elementSdk.setConfig({ font_family: v });
        }
      },
      fontSizeable: {
        get: () => config.font_size || defaultConfig.font_size,
        set: (v) => {
          config.font_size = v;
          window.elementSdk.setConfig({ font_size: v });
        }
      }
    }),
    mapToEditPanelValues: (config) =>
      new Map([
        ['hero_title', config.hero_title || defaultConfig.hero_title],
        ['hero_subtitle', config.hero_subtitle || defaultConfig.hero_subtitle],
        ['cta_text', config.cta_text || defaultConfig.cta_text],
        ['location_text', config.location_text || defaultConfig.location_text],
        ['phone_text', config.phone_text || defaultConfig.phone_text],
        ['footer_description', config.footer_description || defaultConfig.footer_description]
      ])
  });
}

// ===== Init =====
renderTestimonials();
if (window.lucide && typeof window.lucide.createIcons === 'function') lucide.createIcons();

