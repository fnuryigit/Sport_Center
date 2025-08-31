// NAVBAR: scroll rengi
const header = document.querySelector('.navbar');
function onScroll() {
  if (window.scrollY > 10) header.classList.add('scrolled');
  else header.classList.remove('scrolled');
}
window.addEventListener('scroll', onScroll);
onScroll();

// NAVBAR: aktif link 
const sections = [...document.querySelectorAll('section[id]')];
const links = [...document.querySelectorAll('.nav-links a')];

function setActiveLink() {
  const y = window.scrollY + 120; 
  let current = sections[0].id;
  sections.forEach(sec => {
    const top = sec.offsetTop;
    if (y >= top) current = sec.id;
  });
  links.forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === `#${current}`);
  });
}
window.addEventListener('scroll', setActiveLink);
setActiveLink();

// NAVBAR: mobil menü
const toggleBtn = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
toggleBtn.addEventListener('click', () => navLinks.classList.toggle('show'));
links.forEach(a => a.addEventListener('click', () => navLinks.classList.remove('show')));

// CLASSES: filtre
const filterBtns = [...document.querySelectorAll('.class-filters button')];
const classCards = [...document.querySelectorAll('.class-card')];

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const f = btn.dataset.filter;
    classCards.forEach(card => {
      card.style.display = (f === 'all' || card.dataset.category === f) ? 'grid' : 'none';
    });
  });
});

// BMI: hesapla
const kgInput = document.getElementById('kg');
const cmInput = document.getElementById('cm');
const bmiBtn  = document.getElementById('bmiBtn');
const bmiOut  = document.getElementById('bmiResult');
const arrowEl = document.getElementById('bmiArrow');


function toNumber(v) {
  return parseFloat(String(v).replace(',', '.'));
}

function categorize(bmi) {
  if (bmi < 18.5) return 'Underweight';
  if (bmi < 25)   return 'Normal';
  if (bmi < 30)   return 'Overweight';
  if (bmi < 35)   return 'Obese';
  return 'Extremely Obese';
}


function arrowLeftPercent(bmi) {
  if (bmi < 18.5) return '10%';  
  if (bmi < 25)   return '30%'; 
  if (bmi < 30)   return '50%';  
  if (bmi < 35)   return '70%';  
  return '90%';                  
}

bmiBtn?.addEventListener('click', () => {
  const kg = toNumber(kgInput.value);
  const cm = toNumber(cmInput.value);

  if (!kg || !cm || kg <= 0 || cm <= 0) {
    bmiOut.textContent = 'Lütfen geçerli kilo ve boy girin.';
    return;
  }

  const m = cm / 100;
  const bmi = kg / (m * m);

  bmiOut.textContent = `BMI: ${bmi.toFixed(1)} (${categorize(bmi)})`;
  arrowEl.style.left = arrowLeftPercent(bmi);
});

// CLASSES: yoga/group/solo/stretching butonları
const buttons = document.querySelectorAll(".class-btn");
const contents = document.querySelectorAll(".class-section");

buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
   
    contents.forEach((content) => content.classList.remove("active"));

  
    const target = btn.getAttribute("data-target");
    const targetSection = document.getElementById(target);
    if (targetSection) targetSection.classList.add("active");
  });
});


