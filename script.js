document.addEventListener('DOMContentLoaded', () => {

  // --- 1. تصفية الأقسام التفاعلية ---
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const cardCat = card.getAttribute('data-cat');
        if (filterValue === 'all' || cardCat === filterValue) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 10);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.96)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 250);
        }
      });
    });
  });

  // --- 2. محرك النجوم والفضاء التفاعلي في الخلفية ---
  const canvas = document.getElementById('space-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    const stars = [];
    const count = 95; // عدد النجوم

    for (let i = 0; i < count; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.6 + 0.4,
        speedX: (Math.random() - 0.5) * 0.25,
        speedY: (Math.random() - 0.5) * 0.25,
        alpha: Math.random() * 0.8 + 0.2,
        twinkle: Math.random() * 0.02 + 0.005
      });
    }

    function animateStars() {
      ctx.clearRect(0, 0, width, height);

      // تدرج لوني فلكي ناعم وعميق
      const bgGrad = ctx.createRadialGradient(width / 2, height / 2, width / 6, width / 2, height / 2, Math.max(width, height));
      bgGrad.addColorStop(0, '#0d1124');
      bgGrad.addColorStop(1, '#070913');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // رسم النجوم وتحريكها
      stars.forEach(star => {
        star.x += star.speedX;
        star.y += star.speedY;

        if (star.x < 0) star.x = width;
        if (star.x > width) star.x = 0;
        if (star.y < 0) star.y = height;
        if (star.y > height) star.y = 0;

        star.alpha += star.twinkle;
        if (star.alpha > 0.95 || star.alpha < 0.2) {
          star.twinkle = -star.twinkle;
        }

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = rgba(0, 240, 255, ${star.alpha});
        ctx.shadowBlur = star.radius > 1.2 ? 8 : 0;
        ctx.shadowColor = '#00f0ff';
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      requestAnimationFrame(animateStars);
    }

    animateStars();
  }

});