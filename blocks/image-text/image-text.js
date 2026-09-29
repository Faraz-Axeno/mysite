// export default function decorate(block) {
//   [...block.children].forEach((row) => {
//     row.classList.add('image-text-card');

//     const imageWrapper = row.firstElementChild;
//     if (imageWrapper) {
//       imageWrapper.classList.add('image-text-img-wrapper');

//       const img = imageWrapper.querySelector('img');
//       if (img) img.classList.add('image-text-img');
//     }

//     const textWrapper = row.lastElementChild;
//     if (textWrapper) {
//       textWrapper.classList.add('image-text-content');

//       const paragraphs = textWrapper.querySelectorAll('p');
//       paragraphs.forEach((p) => p.classList.add('image-text-desc'));
//     }
//   });
// }

export default function decorate(block) {
  const cards = [...block.children];

  cards.forEach((row) => {
    row.classList.add('image-text-card');
    const imageWrapper = row.firstElementChild;
    if (imageWrapper) {
      imageWrapper.classList.add('image-text-img-wrapper');
      const img = imageWrapper.querySelector('img');
      if (img) {
        img.classList.add('image-text-img');
      }

      const textWrapper = row.lastElementChild;
      if (textWrapper) {
        textWrapper.classList.add('image-text-content');
        const paragraphs = textWrapper.querySelectorAll('p');
        paragraphs.forEach((p) => p.classList.add('image-text-desc'));
      }
    }
  });

  const track = document.createElement('div');
  track.classList.add('carousel-track');

  cards.forEach((card) => track.appendChild(card));

  block.appendChild(track);

  const prevButton = document.createElement('button');
  prevButton.classList.add('carousel-btn', 'carousel-prev');
  prevButton.innerHTML = '<';

  const nextButton = document.createElement('button');
  nextButton.classList.add('carousel-btn', 'carousel-next');
  nextButton.innerHTML = '>';

  block.appendChild(prevButton);
  block.appendChild(nextButton);

  nextButton.addEventListener('click', () => {
    const cardWidth = cards[0].offsetWidth;
    track.scrollBy({ left: cardWidth + 32, behavior: 'smooth' });
  });

  prevButton.addEventListener('click', () => {
    const cardWidth = cards[0].offsetWidth;
    track.scrollBy({ left: -(cardWidth + 32), behavior: 'smooth' });
  });
}
