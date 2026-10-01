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
    span.dataset.value = '00';

    const inner = document.createElement('span');
    inner.classList.add('current');
    inner.textContent = '00';
    span.appendChild(inner);

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

  let interval;

  const updateUnit = (unit, value) => {
    const strVal = String(value).padStart(2, '0');
    const el = elements[unit];
    
    if (el.dataset.value === strVal) return;
    el.dataset.value = strVal;

    const newSpan = document.createElement('span');
    newSpan.textContent = strVal;
    newSpan.classList.add('next');
    el.appendChild(newSpan);

    const oldSpan = el.querySelector('.current');
    if (oldSpan) {
      oldSpan.classList.remove('current');
      oldSpan.classList.add('prev');
      
      // Remove old number after the fade transition completes
      setTimeout(() => {
        if (oldSpan.parentNode === el) el.removeChild(oldSpan);
      }, 400); 
    }

    // Trigger fade in
    setTimeout(() => {
      newSpan.classList.remove('next');
      newSpan.classList.add('current');
    }, 20);
  };

  const updateTimer = () => {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance < 0) {
      clearInterval(interval);
      updateUnit('days', 0);
      updateUnit('hours', 0);
      updateUnit('minutes', 0);
      updateUnit('seconds', 0);
      return;
    }

    const d = Math.floor(distance / (1000 * 60 * 60 * 24));
    const h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((distance % (1000 * 60)) / 1000);

    updateUnit('days', d);
    updateUnit('hours', h);
    updateUnit('minutes', m);
    updateUnit('seconds', s);
  };

  updateTimer();
  interval = setInterval(updateTimer, 1000);
}