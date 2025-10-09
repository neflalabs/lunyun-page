document.addEventListener('DOMContentLoaded', () => {
  // Safe element lookups with guards
  const lunaCardImageContainer = document.getElementById('luna-card-image-container');
  const yunaCardImageContainer = document.getElementById('yuna-card-image-container');
  const lunaImage = document.getElementById('luna-image');
  const yunaImage = document.getElementById('yuna-image');

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Image lists (unchanged)
  const lunaImages = ['resource/img/luna.jpg', 'resource/img/lunav2.png', 'resource/img/lunav3.png'];
  const yunaImages = ['resource/img/yuna.jpg', 'resource/img/yunav2.png', 'resource/img/yunav3.png'];
  let currentLunaImageIndex = 0;
  let currentYunaImageIndex = 0;

  if (lunaImage) lunaImage.src = lunaImages[0];
  if (yunaImage) yunaImage.src = yunaImages[0];

  // Helper to perform a smooth image transition using CSS classes (less layout thrash)
  function smoothSwapImage(imgEl, nextSrc) {
    if (!imgEl) return;
    imgEl.classList.remove('is-visible');
    // wait for the fade-out transition to finish
    const onTransitionEnd = () => {
      imgEl.removeEventListener('transitionend', onTransitionEnd);
      imgEl.src = nextSrc;
      // allow the browser to paint the src change then fade in
      requestAnimationFrame(() => imgEl.classList.add('is-visible'));
    };
    imgEl.addEventListener('transitionend', onTransitionEnd);
    // trigger fade-out
    requestAnimationFrame(() => imgEl.classList.remove('is-visible'));
  }

  if (lunaImage) lunaImage.classList.add('is-visible');
  if (yunaImage) yunaImage.classList.add('is-visible');

  // Avoid animations for users who prefer reduced motion
  if (!prefersReducedMotion) {
    const intervalMs = 5000;
    setInterval(() => {
      currentLunaImageIndex = (currentLunaImageIndex + 1) % lunaImages.length;
      smoothSwapImage(lunaImage, lunaImages[currentLunaImageIndex]);
    }, intervalMs);

    setInterval(() => {
      currentYunaImageIndex = (currentYunaImageIndex + 1) % yunaImages.length;
      smoothSwapImage(yunaImage, yunaImages[currentYunaImageIndex]);
    }, intervalMs);
  }

  // Fullscreen overlay toggle with safety checks
  function toggleFullscreen(containerElement) {
    if (!containerElement) return;
    const existing = document.querySelector('.fullscreen-image');
    if (existing) {
      existing.remove();
      return;
    }

    const originalImage = containerElement.querySelector('img');
    if (!originalImage) return;

    const overlay = document.createElement('div');
    overlay.className = 'fullscreen-image';
    const img = document.createElement('img');
    img.src = originalImage.src;
    img.alt = originalImage.alt || '';
    overlay.appendChild(img);
    overlay.addEventListener('click', () => overlay.remove(), { once: true });
    document.body.appendChild(overlay);
  }

  if (lunaCardImageContainer) {
    lunaCardImageContainer.addEventListener('click', () => toggleFullscreen(lunaCardImageContainer));
  }
  if (yunaCardImageContainer) {
    yunaCardImageContainer.addEventListener('click', () => toggleFullscreen(yunaCardImageContainer));
  }

  // Falling items: limit count on small screens and avoid layout thrash
  const fallingItemsContainer = document.getElementById('falling-items-container');
  if (fallingItemsContainer && !prefersReducedMotion) {
    const isSmall = window.innerWidth < 640;
    const numItems = isSmall ? 12 : 40; // fewer items on mobile
    const emojis = ['338', '366'];

    const fragment = document.createDocumentFragment();
    for (let i = 0; i < numItems; i++) {
      const item = document.createElement('div');
      const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
      item.textContent = randomEmoji;
      item.className = 'falling-item';
      item.style.left = Math.random() * 100 + 'vw';
      item.style.top = -(Math.random() * 20 + 5) + 'vh';
      const size = Math.random() * 20 + 20;
      item.style.fontSize = size + 'px';
      const duration = Math.random() * 7 + 8;
      item.style.animationDuration = duration + 's';
      const delay = Math.random() * -(duration / 2);
      item.style.animationDelay = delay + 's';
      const driftAmount = (Math.random() - 0.5) * 50;
      item.style.setProperty('--item-drift', driftAmount + 'vw');
      fragment.appendChild(item);
    }
    fallingItemsContainer.appendChild(fragment);
  }
});