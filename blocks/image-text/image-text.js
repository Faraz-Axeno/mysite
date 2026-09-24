export default function decorate(block) {
  [...block.children].forEach((row) => {
    row.classList.add('image-text-card');

    const imageWrapper = row.firstElementChild;
    if (imageWrapper) {
      imageWrapper.classList.add('image-text-img-wrapper');
      
      const img = imageWrapper.querySelector('img');
      if (img) img.classList.add('image-text-img');
    }

    const textWrapper = row.lastElementChild;
    if (textWrapper) {
      textWrapper.classList.add('image-text-content');
      
      const paragraphs = textWrapper.querySelectorAll('p');
      paragraphs.forEach((p) => p.classList.add('image-text-desc'));
    }
  });
}