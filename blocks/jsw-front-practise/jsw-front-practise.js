import { loadScript } from '../../scripts/aem.js';

export default async function decorate(block) {
  window.addEventListener('wheel', (e) => e.preventDefault(), { passive: false });
  window.addEventListener('touchmove', (e) => e.preventDefault(), { passive: false });
  window.addEventListener('keydown', (e) => {
    if (["Space", "ArrowUp", "ArrowDown", "PageUp", "PageDown"].includes(e.code)) {
      e.preventDefault();
    }
  }, { passive: false });

  const sectionWrapper = block.closest('.section');
  if (sectionWrapper) {
    sectionWrapper.style.padding = '0';
    sectionWrapper.style.margin = '0';
    sectionWrapper.style.maxWidth = '100%';
  }
  
  const row = block.firstElementChild;
  if (!row) return;

  row.classList.add('jsw-hero-row');
  const imageCol = row.firstElementChild;
  const textCol = row.lastElementChild;

  if (imageCol) {
    imageCol.classList.add('jsw-hero-media');
    const img = imageCol.querySelector('img');
    if (img) img.classList.add('jsw-hero-bg-img');
  }

  let button; 

  if (textCol) {
    textCol.classList.add('jsw-hero-content');

    const title = textCol.querySelector('h1, h2, h3');
    if (title) title.classList.add('jsw-hero-title');

    const desc = textCol.querySelector('p');
    if (desc) desc.classList.add('jsw-hero-desc');

    button = document.createElement('button');
    button.classList.add('jsw-hero-btn');
 
    const btnText = document.createElement('span');
    btnText.textContent = 'REGISTER INTEREST';
    
    const btnIcon = document.createElement('span');
    btnIcon.textContent = '+';
    
    button.appendChild(btnText);
    button.appendChild(btnIcon);
    
    textCol.appendChild(button);
  }

  await loadScript('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js');
  await loadScript('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollToPlugin.min.js');

  const { gsap } = window;
  gsap.registerPlugin(window.ScrollToPlugin);

  setTimeout(() => {
    const sections = document.querySelectorAll('main .section');
    if (sections.length === 0) return;

    let isAnimating = false;
    let currentIndex = 0; 

    const goToSection = (index) => {
     
      if (index < 0 || index >= sections.length || isAnimating) return;
      
      isAnimating = true;
      currentIndex = index;

      gsap.to(window, {
        scrollTo: sections[currentIndex],
        duration: 1.2,
        ease: "power3.inOut",
        onComplete: () => {
          setTimeout(() => { isAnimating = false; }, 400);
        }
      });
    };

    if (button) {
      button.addEventListener('click', () => {
        goToSection(1);
      });
    }

    window.addEventListener('wheel', (e) => {
      if (isAnimating) return;

      if (e.deltaY > 15) {
        goToSection(currentIndex + 1); 
      } else if (e.deltaY < -15) {
        goToSection(currentIndex - 1); 
      }
    });

    let touchStartY = 0;
    window.addEventListener('touchstart', (e) => {
      touchStartY = e.touches[0].clientY;
    });

    window.addEventListener('touchmove', (e) => {
      if (isAnimating) return;
      
      const touchEndY = e.touches[0].clientY;
      const swipeDistance = touchStartY - touchEndY;

      if (Math.abs(swipeDistance) > 30) { 
        if (swipeDistance > 0) {
          goToSection(currentIndex + 1); 
        } else {
          goToSection(currentIndex - 1); 
        }
      }
    });

  }, 500); 
}