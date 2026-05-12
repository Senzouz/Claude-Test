/* ── Nav: scroll state & mobile toggle ── */
const nav    = document.getElementById('nav');
const burger = document.getElementById('burger');
const links  = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

burger.addEventListener('click', () => {
  burger.classList.toggle('open');
  links.classList.toggle('open');
});

links.querySelectorAll('.nav__link').forEach(link => {
  link.addEventListener('click', () => {
    burger.classList.remove('open');
    links.classList.remove('open');
  });
});

/* ── Hero parallax ── */
const heroImg = document.getElementById('heroImg');

window.addEventListener('scroll', () => {
  const y = window.scrollY;
  if (y < window.innerHeight) {
    heroImg.style.transform = `translateY(${y * 0.35}px) scale(1.06)`;
  }
}, { passive: true });

/* ── Experience parallax ── */
const parallaxImg = document.getElementById('parallaxImg');
const experience  = document.querySelector('.experience');

if (parallaxImg && experience) {
  window.addEventListener('scroll', () => {
    const rect   = experience.getBoundingClientRect();
    const center = rect.top + rect.height / 2 - window.innerHeight / 2;
    parallaxImg.style.transform = `translateY(${center * 0.25}px)`;
  }, { passive: true });
}

/* ── Scroll reveal (IntersectionObserver) ── */
const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

revealEls.forEach(el => observer.observe(el));

/* Stagger pillar cards */
document.querySelectorAll('.pillar').forEach((el, i) => {
  el.style.setProperty('--i', i);
  el.style.transitionDelay = `${i * 0.12}s`;
});

/* ── Guests counter ── */
const guestsVal  = document.getElementById('guestsVal');
const guestsIn   = document.getElementById('guests');
const guestsDown = document.getElementById('guestsDown');
const guestsUp   = document.getElementById('guestsUp');

if (guestsVal) {
  let count = 2;

  guestsDown.addEventListener('click', () => {
    if (count > 1) { count--; update(); }
  });
  guestsUp.addEventListener('click', () => {
    if (count < 20) { count++; update(); }
  });

  function update() {
    guestsVal.textContent = count;
    guestsIn.value = count;
    guestsVal.animate(
      [{ transform: 'scale(1.5)', color: '#c9a84c' }, { transform: 'scale(1)', color: '#c9a84c' }],
      { duration: 200, easing: 'cubic-bezier(.34,1.56,.64,1)' }
    );
  }
}

/* ── Reserve form ── */
const form        = document.getElementById('reserveForm');
const submitBtn   = document.getElementById('submitBtn');
const formSuccess = document.getElementById('formSuccess');

if (form) {
  /* Set min date to today */
  const dateInput = document.getElementById('date');
  if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.min = today;
  }

  form.addEventListener('submit', e => {
    e.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    submitBtn.textContent = 'Enviando…';
    submitBtn.disabled = true;

    /* Simulate async submit */
    setTimeout(() => {
      form.reset();
      if (guestsVal) { guestsVal.textContent = '2'; guestsIn.value = 2; }
      submitBtn.textContent = 'Confirmar Reserva';
      submitBtn.disabled = false;
      formSuccess.classList.add('visible');
      formSuccess.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

      setTimeout(() => formSuccess.classList.remove('visible'), 6000);
    }, 1400);
  });
}

/* ── Newsletter form ── */
const newsletterForm = document.getElementById('newsletterForm');

if (newsletterForm) {
  newsletterForm.addEventListener('submit', e => {
    e.preventDefault();
    const btn   = newsletterForm.querySelector('button');
    const input = newsletterForm.querySelector('input');
    btn.textContent = '✓';
    btn.style.background = '#5a8a5a';
    input.value = '';
    input.placeholder = '¡Gracias por suscribirte!';
    setTimeout(() => {
      btn.textContent = '→';
      btn.style.background = '';
      input.placeholder = 'tu@correo.com';
    }, 3500);
  });
}

/* ── Smooth scroll for anchor links ── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = parseInt(getComputedStyle(document.documentElement)
      .getPropertyValue('--nav-h')) || 76;
    window.scrollTo({
      top: target.getBoundingClientRect().top + window.scrollY - offset,
      behavior: 'smooth'
    });
  });
});

/* ── Scroll hint: hide on first scroll ── */
const scrollHint = document.getElementById('scrollHint');
if (scrollHint) {
  window.addEventListener('scroll', function hideHint() {
    scrollHint.style.opacity = '0';
    scrollHint.style.pointerEvents = 'none';
    window.removeEventListener('scroll', hideHint);
  }, { passive: true, once: true });
}

/* ── Hero content initial animation ── */
document.querySelectorAll('.hero__content .reveal').forEach(el => {
  el.classList.add('revealed');
});
