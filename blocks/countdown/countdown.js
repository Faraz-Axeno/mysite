export default function decorate(block) {
 
  const dateCell = block.firstElementChild?.firstElementChild;
  if (!dateCell) return;
  
  const targetDateStr = dateCell.textContent.trim();
  const targetDate = new Date(targetDateStr).getTime();

  block.innerHTML = '';

  const timerDisplay = document.createElement('div');
  timerDisplay.classList.add('jsw-timer-container');

  const timeUnits = ['days', 'hours', 'minutes', 'seconds'];
  const elements = {};

  timeUnits.forEach((unit, index) => {
    const span = document.createElement('span');
    span.classList.add('jsw-timer-number');
    span.textContent = '00';
    elements[unit] = span;
    timerDisplay.appendChild(span);

    if (index < timeUnits.length - 1) {
      const separator = document.createElement('span');
      separator.classList.add('jsw-timer-separator');
      separator.textContent = ':';
      timerDisplay.appendChild(separator);
    }
  });

  block.appendChild(timerDisplay);

  const updateTimer = () => {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance < 0) {
      clearInterval(interval);
      return; 
    }

    const d = Math.floor(distance / (1000 * 60 * 60 * 24));
    const h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((distance % (1000 * 60)) / 1000);

    elements.days.textContent = String(d).padStart(2, '0');
    elements.hours.textContent = String(h).padStart(2, '0');
    elements.minutes.textContent = String(m).padStart(2, '0');
    elements.seconds.textContent = String(s).padStart(2, '0');
  };

  updateTimer(); 
  const interval = setInterval(updateTimer, 1000);
}