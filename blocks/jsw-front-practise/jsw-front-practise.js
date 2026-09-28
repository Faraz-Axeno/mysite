export default function decorate(block) {

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

  if (textCol) {
    textCol.classList.add('jsw-hero-content');

    const title = textCol.querySelector('h1, h2, h3');

    if (title) title.classList.add('jsw-hero-title');

    const desc = textCol.querySelector('p');

    if (desc) desc.classList.add('jsw-hero-desc');

    const button = document.createElement('button');
    button.classList.add('jsw-hero-btn');
 
    const btnText = document.createElement('span');
    btnText.textContent = 'REGISTER INTEREST';
    
    const btnIcon = document.createElement('span');
    btnIcon.textContent = '+';
    
    button.appendChild(btnText);
    button.appendChild(btnIcon);
    
    button.addEventListener('click', () => {
      console.log('Register Interest clicked');
    });

    textCol.appendChild(button);
  }
}