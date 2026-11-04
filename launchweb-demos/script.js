(() => {
  const showMessage = (element, message) => {
    if (!element) return;
    element.textContent = message;
    element.classList.add('is-visible');
  };

  document.querySelectorAll('[data-demo-form]').forEach((form) => {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      showMessage(form.querySelector('.form-message'), 'Thanks — this is a demo, so no appointment was sent.');
    });
  });

  let basket = [];
  const count = document.querySelector('.basket-count');
  const items = document.querySelector('.basket-items');
  document.querySelectorAll('[data-add]').forEach((button) => {
    button.addEventListener('click', () => {
      basket.push(button.dataset.add);
      if (count) count.textContent = String(basket.length);
      if (items) items.textContent = basket.join(' · ');
      button.innerHTML = 'Added <span>✓</span>';
      button.classList.add('added');
      window.setTimeout(() => { button.innerHTML = 'Add to box <span>＋</span>'; button.classList.remove('added'); }, 1400);
    });
  });
  document.querySelector('[data-checkout]')?.addEventListener('click', () => {
    const message = document.querySelector('.basket-items');
    showMessage(message, basket.length ? 'Sample basket ready — no order or payment was sent.' : 'Add something from the counter first.');
  });

  const dayContent = {
    mon: [['09:00', 'Slow flow', 'All levels · Maya'], ['18:30', 'Steady strength', 'All levels · Nabil']],
    wed: [['07:30', 'Morning mobility', 'All levels · Aina'], ['19:00', 'Slow flow', 'All levels · Maya']],
    sat: [['08:30', 'Sunday reset', 'Gentle · Nabil'], ['10:00', 'Slow flow', 'All levels · Aina']]
  };
  const classList = document.querySelector('.class-list');
  document.querySelectorAll('[data-day]').forEach((button) => {
    button.addEventListener('click', () => {
      document.querySelectorAll('[data-day]').forEach((day) => day.classList.toggle('active', day === button));
      const classes = dayContent[button.dataset.day];
      if (!classList || !classes) return;
      classList.querySelectorAll('.class-row').forEach((row, index) => {
        const [time, title, detail] = classes[index];
        row.querySelector('.class-time').textContent = time;
        row.querySelector('h3').textContent = title;
        row.querySelector('p').textContent = detail;
        row.querySelector('.class-join').dataset.class = title;
      });
      showMessage(classList.querySelector('.schedule-message'), `Sample timetable for ${button.textContent.trim().split('\n')[0]}. Choose a class to continue.`);
    });
  });
  document.querySelectorAll('[data-class]').forEach((button) => {
    button.addEventListener('click', () => showMessage(classList?.querySelector('.schedule-message'), `${button.dataset.class} selected — this demo does not send a booking.`));
  });

  document.querySelectorAll('.menu-toggle').forEach((button) => {
    button.addEventListener('click', () => {
      const nav = button.closest('.demo-nav')?.querySelector('nav');
      const expanded = button.getAttribute('aria-expanded') === 'true';
      button.setAttribute('aria-expanded', String(!expanded));
      button.setAttribute('aria-label', expanded ? 'Open navigation' : 'Close navigation');
      nav?.classList.toggle('is-open', !expanded);
    });
  });
})();
