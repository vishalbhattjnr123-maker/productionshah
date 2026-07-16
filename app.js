/* Shah Productions - Premium Cinematic JS */

document.addEventListener('DOMContentLoaded', () => {
  
  // ==========================================
  // 1. CINEMATIC PRELOADER
  // ==========================================
  const preloader = document.getElementById('preloader');
  const progressBar = document.getElementById('loader-progress');
  const percentText = document.getElementById('loader-percent');
  
  let progress = 0;
  const loadDuration = 2000; // 2 seconds
  const intervalTime = 20;
  const increment = 100 / (loadDuration / intervalTime);

  const loaderInterval = setInterval(() => {
    progress += increment;
    if (progress >= 100) {
      progress = 100;
      clearInterval(loaderInterval);
      
      // Fade out preloader
      setTimeout(() => {
        preloader.classList.add('fade-out');
        // Trigger GSAP hero animations once preloader is gone
        initHeroAnimations();
      }, 500);
    }
    progressBar.style.width = `${progress}%`;
    percentText.textContent = `${Math.floor(progress)}%`;
  }, intervalTime);

  // ==========================================
  // 2. SMOOTH SCROLLING (LENIS)
  // ==========================================
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Custom out-quart
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    mouseMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
    infinite: false,
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  // Connect GSAP ScrollTrigger to Lenis
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);

  // ==========================================
  // 3. CUSTOM CURSOR & FOLLOWER
  // ==========================================
  const cursor = document.getElementById('cursor');
  const follower = document.getElementById('cursor-follower');

  let mouseX = 0, mouseY = 0;
  let followerX = 0, followerY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Immediately place the small core cursor
    if (cursor) {
      cursor.style.left = `${mouseX}px`;
      cursor.style.top = `${mouseY}px`;
    }
  });

  // Smoothly interpolate the follower cursor
  function animateFollower() {
    const ease = 0.15;
    followerX += (mouseX - followerX) * ease;
    followerY += (mouseY - followerY) * ease;

    if (follower) {
      follower.style.left = `${followerX}px`;
      follower.style.top = `${followerY}px`;
    }
    requestAnimationFrame(animateFollower);
  }
  animateFollower();

  // Add hover states for interactive elements
  const hoverables = document.querySelectorAll('a, button, select, input, textarea, .faq-btn, .portfolio-item');
  hoverables.forEach(item => {
    item.addEventListener('mouseenter', () => {
      cursor?.classList.add('active');
      follower?.classList.add('active');
    });
    item.addEventListener('mouseleave', () => {
      cursor?.classList.remove('active');
      follower?.classList.remove('active');
    });
  });

  // ==========================================
  // 4. STICKY NAVBAR & SCROLL PROGRESS
  // ==========================================
  const navbar = document.getElementById('navbar');
  const scrollProgressBar = document.getElementById('scroll-progress');

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    
    if (scrollProgressBar) {
      scrollProgressBar.style.width = `${scrollPercent}%`;
    }

    if (scrollTop > 50) {
      navbar?.classList.add('bg-luxuryBg/85', 'backdrop-blur-md', 'py-4', 'border-white/5');
      navbar?.classList.remove('py-6', 'border-transparent');
    } else {
      navbar?.classList.remove('bg-luxuryBg/85', 'backdrop-blur-md', 'py-4', 'border-white/5');
      navbar?.classList.add('py-6', 'border-transparent');
    }
  });

  // ==========================================
  // 5. MOBILE DRAWER NAVIGATION
  // ==========================================
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  if (mobileMenuBtn && mobileDrawer) {
    mobileMenuBtn.addEventListener('click', () => {
      const isOpen = mobileDrawer.style.transform === 'translateY(0%)';
      
      if (isOpen) {
        // Close
        mobileDrawer.style.transform = 'translateY(-100%)';
        mobileMenuBtn.children[0].style.transform = 'none';
        mobileMenuBtn.children[1].style.opacity = '1';
        mobileMenuBtn.children[2].style.transform = 'none';
      } else {
        // Open
        mobileDrawer.style.transform = 'translateY(0%)';
        mobileMenuBtn.children[0].style.transform = 'rotate(45deg) translate(3px, 2px)';
        mobileMenuBtn.children[1].style.opacity = '0';
        mobileMenuBtn.children[2].style.transform = 'rotate(-45deg) translate(2px, -1px)';
      }
    });

    // Close menu when links are clicked
    mobileNavLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.style.transform = 'translateY(-100%)';
        mobileMenuBtn.children[0].style.transform = 'none';
        mobileMenuBtn.children[1].style.opacity = '1';
        mobileMenuBtn.children[2].style.transform = 'none';
      });
    });
  }

  // ==========================================
  // 6. HERO FINE PARTICLES CANVAS
  // ==========================================
  const canvas = document.getElementById('particles-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let particlesArray = [];
    
    // Set Canvas Size
    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Particle Object
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 1.5 + 0.5;
        this.speedX = Math.random() * 0.3 - 0.15;
        this.speedY = Math.random() * 0.3 - 0.15;
        this.alpha = Math.random() * 0.5 + 0.1;
      }
      
      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Wrap around boundaries
        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;
      }

      draw() {
        ctx.fillStyle = `rgba(212, 175, 55, ${this.alpha})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Initialize Particles
    function initParticles() {
      const count = Math.min(60, Math.floor(window.innerWidth / 20));
      particlesArray = [];
      for (let i = 0; i < count; i++) {
        particlesArray.push(new Particle());
      }
    }
    initParticles();
    window.addEventListener('resize', initParticles);

    // Animation Loop
    function animateParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particlesArray.forEach(p => {
        p.update();
        p.draw();
      });
      requestAnimationFrame(animateParticles);
    }
    animateParticles();
  }

  // ==========================================
  // 7. GSAP SCROLLTRIGGER ANIMATIONS
  // ==========================================
  gsap.registerPlugin(ScrollTrigger);

  // Hero Intro Animation (Called after preloader fades)
  function initHeroAnimations() {
    const tl = gsap.timeline();
    tl.to('.hero-reveal', {
      opacity: 1,
      y: 0,
      duration: 1.2,
      stagger: 0.25,
      ease: 'power4.out'
    });
  }

  // Fade Reveal Generic Selector
  gsap.utils.toArray('section').forEach((section) => {
    // Exclude hero which animates on loader finish
    if (section.id === 'hero') return;

    // Simple subtle trigger fade-in
    gsap.from(section, {
      opacity: 0,
      y: 30,
      duration: 1.2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        toggleActions: 'play none none none',
      }
    });
  });

  // Stats Counters Animation
  const counters = document.querySelectorAll('.counter');
  counters.forEach(counter => {
    const target = parseInt(counter.getAttribute('data-target'));
    
    gsap.fromTo(counter, {
      textContent: 0
    }, {
      textContent: target,
      duration: 2.5,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: counter,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
      snap: { textContent: 1 },
      onUpdate: function() {
        counter.textContent = Math.floor(counter.textContent);
      }
    });
  });

  // ==========================================
  // 8. 3D CARD HOVER TILT EFFECT
  // ==========================================
  const cards = document.querySelectorAll('.tilt-card');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      // Mouse coordinate relative to the center of card
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      // Cap max tilt values
      const tiltX = -(y / rect.height) * 15;
      const tiltY = (x / rect.width) * 15;
      
      card.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.03, 1.03, 1.03)`;
      
      // Metallic Reflection Glow Effect
      const inner = card.querySelector('.tilt-card-inner');
      if (inner) {
        inner.style.transform = `translateZ(40px)`;
      }
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = `rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
      const inner = card.querySelector('.tilt-card-inner');
      if (inner) {
        inner.style.transform = `translateZ(0px)`;
      }
    });
  });

  // ==========================================
  // 9. MAGNETIC BUTTONS (LUXURY HOVER)
  // ==========================================
  const magneticButtons = document.querySelectorAll('.magnetic-btn');
  magneticButtons.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      // Magnetic pull strength (offset by 0.3)
      btn.style.transform = `translate(${x * 0.35}px, ${y * 0.35}px)`;
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'translate(0px, 0px)';
    });
  });

  // ==========================================
  // 10. SERVICES CATEGORY FILTERING
  // ==========================================
  window.filterServices = (category) => {
    // Update active tab styles
    const tabs = document.querySelectorAll('.service-tab-btn');
    tabs.forEach(tab => {
      if (tab.getAttribute('onclick').includes(category)) {
        tab.classList.add('bg-luxuryGold', 'text-black', 'border-luxuryGold');
        tab.classList.remove('text-white', 'border-white/10', 'hover:bg-luxuryGold/5');
      } else {
        tab.classList.remove('bg-luxuryGold', 'text-black', 'border-luxuryGold');
        tab.classList.add('text-white', 'border-white/10', 'hover:bg-luxuryGold/5');
      }
    });

    // Animate Cards Reveal
    const cards = document.querySelectorAll('.service-card');
    cards.forEach(card => {
      const cardCategory = card.getAttribute('data-category');
      if (category === 'all' || cardCategory === category) {
        gsap.to(card, {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          display: 'flex',
          ease: 'power2.out'
        });
      } else {
        gsap.to(card, {
          opacity: 0,
          scale: 0.9,
          duration: 0.5,
          display: 'none',
          ease: 'power2.out'
        });
      }
    });
    
    // Refresh ScrollTrigger values
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 600);
  };

  // ==========================================
  // 11. PORTFOLIO FILTERING
  // ==========================================
  window.filterPortfolio = (category) => {
    // Update active tab styles
    const tabs = document.querySelectorAll('.portfolio-filter-btn');
    tabs.forEach(tab => {
      if (tab.getAttribute('onclick').includes(category)) {
        tab.classList.add('bg-luxuryGold', 'text-black', 'border-luxuryGold');
        tab.classList.remove('text-white', 'border-white/10', 'hover:bg-luxuryGold/5');
      } else {
        tab.classList.remove('bg-luxuryGold', 'text-black', 'border-luxuryGold');
        tab.classList.add('text-white', 'border-white/10', 'hover:bg-luxuryGold/5');
      }
    });

    // Grid animation
    const items = document.querySelectorAll('.portfolio-item');
    items.forEach(item => {
      const itemCategory = item.getAttribute('data-category');
      if (category === 'all' || itemCategory === category) {
        gsap.to(item, {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          display: 'block',
          ease: 'power3.out'
        });
      } else {
        gsap.to(item, {
          opacity: 0,
          scale: 0.9,
          duration: 0.6,
          display: 'none',
          ease: 'power3.out'
        });
      }
    });
    
    // Refresh ScrollTrigger layouts
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 700);
  };

  // ==========================================
  // 12. SHOWREEL CUSTOM PLAYER OVERLAY
  // ==========================================
  const showreelVideo = document.getElementById('main-showreel-video');
  const videoPoster = document.getElementById('video-poster');

  if (videoPoster && showreelVideo) {
    videoPoster.addEventListener('click', () => {
      videoPoster.style.opacity = 0;
      setTimeout(() => {
        videoPoster.style.display = 'none';
      }, 700);
      showreelVideo.play();
    });

    // If video is paused, show poster overlay back (optional)
    showreelVideo.addEventListener('pause', () => {
      videoPoster.style.display = 'flex';
      setTimeout(() => {
        videoPoster.style.opacity = 1;
      }, 50);
    });
  }

  // ==========================================
  // 13. TESTIMONIALS SLIDER (SWIPER)
  // ==========================================
  const swiper = new Swiper('.testimonials-slider', {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    breakpoints: {
      768: {
        slidesPerView: 2,
      }
    }
  });

  // ==========================================
  // 14. FAQ ACCORDION HANDLER
  // ==========================================
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const btn = item.querySelector('.faq-btn');
    const content = item.querySelector('.faq-content');
    const icon = item.querySelector('.faq-icon');

    btn.addEventListener('click', () => {
      const isOpen = content.style.maxHeight && content.style.maxHeight !== '0px';
      
      // Close all other items
      faqItems.forEach(otherItem => {
        const otherContent = otherItem.querySelector('.faq-content');
        const otherIcon = otherItem.querySelector('.faq-icon');
        otherContent.style.maxHeight = '0px';
        otherIcon.style.transform = 'rotate(0deg)';
        otherItem.classList.remove('border-luxuryGold/30');
      });

      if (isOpen) {
        content.style.maxHeight = '0px';
        icon.style.transform = 'rotate(0deg)';
        item.classList.remove('border-luxuryGold/30');
      } else {
        content.style.maxHeight = `${content.scrollHeight}px`;
        icon.style.transform = 'rotate(180deg)';
        item.classList.add('border-luxuryGold/30');
      }
      
      // Smooth trigger refresh
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 500);
    });
  });

  // ==========================================
  // 15. CONTACT FORM SUBMISSION HANDLING
  // ==========================================
  const bookingForm = document.getElementById('booking-form');
  const formStatus = document.getElementById('form-status');

  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      if (formStatus) {
        formStatus.textContent = 'TRANSMITTING REQUEST...';
        formStatus.classList.remove('hidden', 'text-emerald-500');
        formStatus.classList.add('text-luxuryGold');
      }

      // Simulate network request
      setTimeout(() => {
        if (formStatus) {
          formStatus.textContent = 'CINEMATIC INQUIRY TRANSMITTED SUCCESSFULLY. DAKSH SHAH WILL CONTACT YOU SHORTLY.';
          formStatus.classList.remove('text-luxuryGold');
          formStatus.classList.add('text-emerald-500');
          bookingForm.reset();
        }
      }, 1500);
    });
  }

  // Newsletter Submit simulation
  const newsletterForm = document.getElementById('newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Thank you for subscribing to Shah Productions newsletters.');
      newsletterForm.reset();
    });
  }

  // ==========================================
  // 16. THREE.JS 3D CONCENTRIC GOLDEN LENS RINGS
  // ==========================================
  function init3DScene() {
    const container = document.getElementById('canvas3d-container');
    if (!container) return;

    const width = container.clientWidth || 500;
    const height = container.clientHeight || 500;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 8;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xd4af37, 2.5, 50);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    const ringsGroup = new THREE.Group();
    const material = new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      metalness: 0.9,
      roughness: 0.1,
      wireframe: true
    });

    const ringGeom1 = new THREE.TorusGeometry(2, 0.05, 16, 100);
    const ring1 = new THREE.Mesh(ringGeom1, material);
    ringsGroup.add(ring1);

    const ringGeom2 = new THREE.TorusGeometry(1.5, 0.03, 16, 100);
    const ring2 = new THREE.Mesh(ringGeom2, material);
    ring2.rotation.x = Math.PI / 2;
    ringsGroup.add(ring2);

    const ringGeom3 = new THREE.TorusGeometry(1.0, 0.02, 16, 100);
    const ring3 = new THREE.Mesh(ringGeom3, material);
    ring3.rotation.y = Math.PI / 4;
    ringsGroup.add(ring3);

    const sphereGeom = new THREE.SphereGeometry(0.5, 16, 16);
    const sphere = new THREE.Mesh(sphereGeom, material);
    ringsGroup.add(sphere);

    scene.add(ringsGroup);

    let mouseX = 0, mouseY = 0;
    let targetX = 0, targetY = 0;

    window.addEventListener('mousemove', (e) => {
      mouseX = (e.clientX / window.innerWidth) - 0.5;
      mouseY = (e.clientY / window.innerHeight) - 0.5;
    });

    function animate() {
      requestAnimationFrame(animate);

      targetX = mouseX * 0.8;
      targetY = mouseY * 0.8;

      ringsGroup.rotation.y += 0.005;
      ring1.rotation.y += 0.002;
      ring2.rotation.x += 0.003;
      ring3.rotation.z += 0.005;

      ringsGroup.rotation.x += (targetY - ringsGroup.rotation.x) * 0.05;
      ringsGroup.rotation.y += (targetX - ringsGroup.rotation.y) * 0.05;

      renderer.render(scene, camera);
    }
    animate();

    window.addEventListener('resize', () => {
      const w = container.clientWidth || 500;
      const h = container.clientHeight || 500;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    });
  }
  init3DScene();

  // ==========================================
  // 17. HERO FLOATING SPEC BADGES (GSAP)
  // ==========================================
  gsap.to('.hero-floating-card', {
    y: -15,
    rotation: 2,
    duration: 4,
    repeat: -1,
    yoyo: true,
    ease: 'power1.inOut',
    stagger: {
      amount: 1.5,
      each: 0.5
    }
  });

  // ==========================================
  // 18. MOUSE MOVEMENT PARALLAX IN HERO
  // ==========================================
  const heroEl = document.getElementById('hero');
  if (heroEl) {
    heroEl.addEventListener('mousemove', (e) => {
      const depth = 25;
      const moveX = (e.clientX - window.innerWidth / 2) / depth;
      const moveY = (e.clientY - window.innerHeight / 2) / depth;
      
      gsap.to('.hero-reveal', {
        x: moveX,
        y: moveY,
        duration: 0.8,
        ease: 'power2.out',
        stagger: 0.01
      });
    });
  }

  // ==========================================
  // 19. FIXED BACK TO TOP BUTTON
  // ==========================================
  const backToTopBtn = document.getElementById('back-to-top-btn');
  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        backToTopBtn.classList.remove('opacity-0', 'translate-y-10', 'pointer-events-none');
        backToTopBtn.classList.add('opacity-100', 'translate-y-0');
      } else {
        backToTopBtn.classList.add('opacity-0', 'translate-y-10', 'pointer-events-none');
        backToTopBtn.classList.remove('opacity-100', 'translate-y-0');
      }
    });

    backToTopBtn.addEventListener('click', () => {
      if (typeof lenis !== 'undefined') {
        lenis.scrollTo('#hero', { duration: 1.5 });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  }

  // ==========================================
  // 20. FOOTER DYNAMIC PARTICLES CANVAS
  // ==========================================
  const footerCanvas = document.getElementById('footer-particles-canvas');
  if (footerCanvas) {
    const fctx = footerCanvas.getContext('2d');
    let footerParticlesArray = [];

    function resizeFooterCanvas() {
      footerCanvas.width = footerCanvas.parentElement.clientWidth || window.innerWidth;
      footerCanvas.height = footerCanvas.parentElement.clientHeight || 400;
    }
    resizeFooterCanvas();
    window.addEventListener('resize', resizeFooterCanvas);

    class FooterParticle {
      constructor() {
        this.x = Math.random() * footerCanvas.width;
        this.y = Math.random() * footerCanvas.height;
        this.size = Math.random() * 1.2 + 0.4;
        this.speedX = Math.random() * 0.2 - 0.1;
        this.speedY = Math.random() * 0.2 - 0.1;
        this.alpha = Math.random() * 0.4 + 0.1;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0) this.x = footerCanvas.width;
        if (this.x > footerCanvas.width) this.x = 0;
        if (this.y < 0) this.y = footerCanvas.height;
        if (this.y > footerCanvas.height) this.y = 0;
      }

      draw() {
        fctx.fillStyle = `rgba(212, 175, 55, ${this.alpha})`;
        fctx.beginPath();
        fctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        fctx.fill();
      }
    }

    function initFooterParticles() {
      footerParticlesArray = [];
      const count = Math.min(30, Math.floor(footerCanvas.width / 50));
      for (let i = 0; i < count; i++) {
        footerParticlesArray.push(new FooterParticle());
      }
    }
    initFooterParticles();
    window.addEventListener('resize', initFooterParticles);

    function animateFooterParticles() {
      fctx.clearRect(0, 0, footerCanvas.width, footerCanvas.height);
      footerParticlesArray.forEach(p => {
        p.update();
        p.draw();
      });
      requestAnimationFrame(animateFooterParticles);
    }
    animateFooterParticles();
  }

});

