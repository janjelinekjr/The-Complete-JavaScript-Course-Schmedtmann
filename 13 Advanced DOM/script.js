'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// button scrolling
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

btnScrollTo.addEventListener('click', function (e) {
  const s1coords = section1.getBoundingClientRect();

  console.log(e.target.getBoundingClientRect());
  console.log('Current scroll (X/Y)', window.pageXOffset, window.pageYOffset);
  console.log(
    'Height/width viewport',
    document.documentElement.clientHeight,
    document.documentElement.clientWidth
  );

  // scrolling
  // window.scrollTo(
  //   s1coords.left + window.pageXOffset,
  //   s1coords.top + window.pageYOffset
  // );

  // scrolling by passing object
  // window.scrollTo({
  //   left: s1coords.left + window.pageXOffset,
  //   top: s1coords.top + window.pageYOffset,
  //   behavior: 'smooth',
  // });

  // more modern way to scroll
  section1.scrollIntoView({
    behavior: 'smooth',
  });
});

// Page navigation

// document.querySelectorAll('.nav__link').forEach(function(el){
//   el.addEventListener('click', function(e){
//     e.preventDefault()

//     const id = this.getAttribute('href')
//     console.log(id);
//     document.querySelector(id).scrollIntoView({behavior: 'smooth'})
//   })
// })

// Add event listener to common parent element
// Determine what element originated the event

document.querySelector('.nav__links').addEventListener('click', function (e) {
  // console.log(e.target);

  // matching strategy
  if (e.target.classList.contains('nav__link')) {
    e.preventDefault();

    const id = e.target.getAttribute('href');
    // console.log(id);
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

// Tabbbed component
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

// tabs.forEach(tab => tab.addEventListener('click', function(e){
// }))

// better way to use event delegation due to perforamnce
tabsContainer.addEventListener('click', function (e) {
  const click = e.target.closest('.operations__tab');
  // console.log(click);

  // Guard clause
  if (!click) return;

  // Remove active
  tabs.forEach(tab => tab.classList.remove('operations__tab--active'));
  tabsContent.forEach(con =>
    con.classList.remove('operations__content--active')
  );

  // Active tab
  click.classList.add('operations__tab--active');

  // Active content area
  document
    .querySelector(`.operations__content--${click.dataset.tab}`)
    .classList.add('operations__content--active');
});

// Menu fade animation
const nav = document.querySelector('.nav');

const handleHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const sibling = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    sibling.forEach(el => {
      if (el !== link) {
        el.style.opacity = this;
      }
    });
    logo.style.opacity = this;
  }
};

// nav.addEventListener('mouseover', function(e){
//   handleHover(e, 0.5)
// });

// or with bind() Passing "argument" into handler
nav.addEventListener('mouseover', handleHover.bind(0.5));

// nav.addEventListener('mouseout', function(e){
//   handleHover(e, 1)
// });

// or with bind() Passing "argument" into handler
nav.addEventListener('mouseout', handleHover.bind(1));

// Sticky navigation
// first way: (bad for performance) with event scroll
// const initaialCoords = section1.getBoundingClientRect();
// console.log(initaialCoords);

// window.addEventListener('scroll', function (e) {
//   console.log(window.scrollY);

//   if (window.scrollY > initaialCoords.top) {
//     nav.classList.add('sticky');
//   } else {
//     nav.classList.remove('sticky');
//   }
// });

// better way: Intersection Observer API
// const obsCallback = function (entries, observer) {
//   entries.forEach(entry => {
//     console.log(entry);
//   });
// };

// const obsOptions = {
//   root: null,
//   threshold: [0, 0.2], // %
// };

// const observer = new IntersectionObserver(obsCallback, obsOptions);

// observer.observe(section1);

const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;
  // console.log(entry);
  if (!entry.isIntersecting) {
    nav.classList.add('sticky');
  } else {
    nav.classList.remove('sticky');
  }
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});
headerObserver.observe(header);

// Reveal sections
const allSections = document.querySelectorAll('.section');

const revealSection = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  // section.classList.add('section--hidden');
});

// Lazy loading imgs
const imgTargets = document.querySelectorAll('img[data-src]');

const loadImg = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  // Replace src with data-src
  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load', function (e) {
    entry.target.classList.remove('lazy-img');
  });

  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});

imgTargets.forEach(img => imgObserver.observe(img));

// Slider
const slider = function () {
  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const dotContainer = document.querySelector('.dots');

  let currentSlide = 0;
  const maxSlides = slides.length - 1;

  // const slider = document.querySelector('.slider');
  // slider.style.transform = 'scale(0.4) translateX(-800px)';
  // slider.style.overflow = 'visible';

  // Functions
  const createDots = function () {
    slides.forEach((slide, i) => {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class='dots__dot' data-slide='${i}'></button>`
      );
    });
  };

  const activateDot = function (slide) {
    document
      .querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active'));
    document
      .querySelector(`.dots__dot[data-slide='${slide}']`)
      .classList.add('dots__dot--active');
  };

  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  // go to the next/prev sliede
  const nextSlide = function () {
    if (currentSlide === maxSlides) {
      currentSlide = 0;
    } else {
      currentSlide++;
    }
    goToSlide(currentSlide);
    activateDot(currentSlide);
  };

  const prevSlide = function () {
    if (currentSlide > 0) {
      currentSlide--;
    } else {
      currentSlide = maxSlides;
    }
    goToSlide(currentSlide);
    activateDot(currentSlide);
  };

  const init = function () {
    goToSlide(0);
    createDots();
    activateDot(0);
  };
  init();

  // Event Handlers
  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);

  document.addEventListener('keydown', function (e) {
    // console.log(e);
    if (e.key === 'ArrowLeft') {
      prevSlide();
    } else if (e.key === 'ArrowRight') {
      nextSlide();
    }
  });

  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      const slide = e.target.dataset.slide;
      goToSlide(slide);
      activateDot(slide);
    }
  });
};
slider();

///////////////////////////////////////////////////////////////////////////////////////////////////////
// Selecting elemnts
/*
console.log(document.documentElement); // all html
console.log(document.head);
console.log(document.body);

const btns = document.getElementsByTagName('button')
console.log(btns);
console.log(document.getElementsByClassName('btn'))

// Creating and inseritng elements
// .insertAdjecentHTML

// .prepend(element) // add as a first child
// .append(element) // add as a last child
// .append(element.cloneNode(true)) // clone

const message = document.createElement('div')
message.innerHTML = `We use cookies for improved functionality and analytics <button class='btn btn--close-cookie'>Got it!</button>`
document.querySelector('header').append(message)
message.classList.add('cookie-message')

// .before(element) // add before (sibling)
// .after(element) // add after (sibling)

// Delete elements
// .remove()


// Styles
// inline styles
message.style.backgroundColor = '#37383d'
message.style.width = '120%'

console.log(message.style.color); // will not show value
console.log(message.style.backgroundColor); // inline style we added, so it will show value

console.log(getComputedStyle(message).color); // now we can get the computed value

message.style.height = Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px'

// change all css variables/root
document.documentElement.style.setProperty('--color-primary', 'orangered')

// Attributes
const logo = document.querySelector('.nav__logo')
console.log(logo.alt);
console.log(logo.src); // absolute
console.log(logo.getAttribute('src')); // relative (written in html)

// for Non-standard
console.log(logo.designer); // is undefined bcs its not standard attribute
console.log(logo.getAttribute('designer')); // now it works

// Add attributes
logo.setAttribute('company', 'Bankist')

// Data Attributes
console.log(logo.dataset.versionNumber);

// Classes
logo.classList.add('c')
logo.classList.remove('c')
logo.classList.toggle('c')
logo.classList.contains('c')
*/

// Events
/*
const h1 = document.querySelector('h1');
// mouseenter

const alertH1 = function (e) {
  alert('addEventListener mouseentre test');
  // h1.removeEventListener('mouseenter', alertH1)
};

h1.addEventListener('mouseenter', alertH1);

setTimeout(() => h1.removeEventListener('mouseenter', alertH1), 3000); // remove after 3 seconds
*/

// other way
// h1.onmouseenter = function(e){
//   alert('addEventListener mouseentre test')
// }

// Event bubling
/*
// rgb(255, 255, 255)
const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min)
const randomColor = () => `rgb(${randomInt(0, 255)}, ${randomInt(0, 255)}, ${randomInt(0, 255)})`

// console.log(randomColor());

document.querySelector('.nav__link').addEventListener('click', function(e){
  this.style.backgroundColor = randomColor()

  // stop propagation
  // e.stopPropagation()
})

document.querySelector('.nav__links').addEventListener('click', function(e){
  this.style.backgroundColor = randomColor()
})

document.querySelector('.nav').addEventListener('click', function(e){
  this.style.backgroundColor = randomColor()
})
*/

// DOM traversing
/*
const h1 = document.querySelector('h1')

// going downwards: child
h1.querySelectorAll('.highlight')

console.log(h1.childNodes);
console.log(h1.children);
h1.firstElementChild.style.color = 'white'
h1.lastElementChild.style.color = 'orangered'

// going upwards: parents
console.log(h1.parentNode);
console.log(h1.parentElement);

h1.closest('header').style.background = 'var(--gradient-secondary)'

// going sideways: siblings
console.log(h1.previousElementSibling)
console.log(h1.nextElementSibling)
console.log(h1.previousSibling)
console.log(h1.nextSibling)

console.log(h1.parentElement.children); // all siblings

[...h1.parentElement.children].forEach(function(el){
  if(el !== h1){
    el.style.transform = 'scale(0.5)'
  }
})
*/

// DOM tree loded event
document.addEventListener('DOMContentLoaded', function (e) {
  console.log('html parse and dom tree build', e);
});

// event for fully loaded page
window.addEventListener('load', function (e) {
  console.log('fully loaded', e);
});

// event when leaving the page
// window.addEventListener('beforeunload', function (e) {
//   // e.preventDefault();
//   console.log(e);
//   e.returnValue = '';
// });


