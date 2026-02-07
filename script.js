

// small JS: year in footer, mobile nav toggle, smooth scroll + active link

document.addEventListener('DOMContentLoaded', function () {
  // year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // mobile nav toggle
  const toggle = document.querySelector('.nav-toggle');
  const navList = document.querySelector('.nav-list');
  toggle && toggle.addEventListener('click', () => {
    navList.classList.toggle('show');
  });

  // smooth scroll and active highlighting
  const links = document.querySelectorAll('.nav-link');
  links.forEach(a => {
    a.addEventListener('click', (e) => {
      e.preventDefault();
      const href = a.getAttribute('href');
      if(href && href.startsWith('#')){
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        // close mobile menu if open
        navList.classList.remove('show');
        // update active
        links.forEach(x => x.classList.remove('active'));
        a.classList.add('active');
      }
    });
  });

  // optional: highlight nav item on scroll
  const sections = Array.from(document.querySelectorAll('main > section'));
  function onScroll(){
    const y = window.scrollY + 100;
    for (let s of sections) {
      if (s.offsetTop <= y && s.offsetTop + s.offsetHeight > y) {
        const id = s.id;
        if (!id) continue;
        links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + id));
      }
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
});