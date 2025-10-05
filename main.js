// main.js

// ========== Nebula 3D Background ==========
let scene, camera, renderer, stars;
function initNebula() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
  camera.position.z = 5;

  renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('nebula-canvas'), antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);

  const starGeometry = new THREE.BufferGeometry();
  const starCount = 10000;
  const positions = [];
  for(let i=0; i<starCount; i++){
    positions.push((Math.random()-0.5)*200);
    positions.push((Math.random()-0.5)*200);
    positions.push((Math.random()-0.5)*200);
  }
  starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(positions,3));

  const starMaterial = new THREE.PointsMaterial({ color: 0xa259ff, size: 0.1, transparent: true, opacity: 0.8 });
  stars = new THREE.Points(starGeometry, starMaterial);
  scene.add(stars);

  window.addEventListener('resize', onWindowResize, false);
  animate();
}

function animate(){
  requestAnimationFrame(animate);
  stars.rotation.y += 0.0005;
  renderer.render(scene,camera);
}

function onWindowResize(){
  camera.aspect = window.innerWidth/window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

// ========== Smooth Counters ==========
const counters = document.querySelectorAll('.count');
counters.forEach(counter=>{
  const updateCount = () => {
    const target = +counter.getAttribute('data-target');
    const count = +counter.innerText;
    const increment = target/200;
    if(count < target){
      counter.innerText = Math.ceil(count + increment);
      setTimeout(updateCount, 20);
    } else counter.innerText = target;
  }
  updateCount();
});

// ========== Lightbox Gallery ==========
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.querySelector('.lightbox-img');
const galleryItems = document.querySelectorAll('.gallery-item');
const lightboxClose = document.querySelector('.lightbox-close');

galleryItems.forEach(item=>{
  item.addEventListener('click',()=>{
    lightboxImg.src = item.getAttribute('data-src');
    lightbox.style.display = 'flex';
    lightbox.setAttribute('aria-hidden','false');
  });
});

lightboxClose.addEventListener('click',()=>{
  lightbox.style.display = 'none';
  lightbox.setAttribute('aria-hidden','true');
});

// ========== Accordion ==========
const accordionToggles = document.querySelectorAll('.accordion-toggle');
accordionToggles.forEach(toggle=>{
  toggle.addEventListener('click', ()=>{
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', !expanded);
  });
});

// ========== Mobile Nav Toggle ==========
const navToggle = document.getElementById('nav-toggle');
const navList = document.getElementById('nav-list');
navToggle.addEventListener('click',()=>{
  const expanded = navToggle.getAttribute('aria-expanded') === 'true';
  navToggle.setAttribute('aria-expanded', !expanded);
  navList.style.display = expanded ? 'none' : 'flex';
});

// ========== Dark / Neon Mode Toggle ==========
const modeToggle = document.getElementById('mode-toggle');
modeToggle.addEventListener('click',()=>{
  document.body.classList.toggle('dark');
  const pressed = modeToggle.getAttribute('aria-pressed') === 'true';
  modeToggle.setAttribute('aria-pressed', !pressed);
});

// ========== Form Validation Hint ==========
const admissionForm = document.getElementById('admission-form');
admissionForm.addEventListener('submit', e=>{
  e.preventDefault();
  // Here you can plug backend endpoint: e.g., fetch('/api/admissions', { method:'POST', body: FormData })
  alert('Form submitted! (This is front-end only placeholder)');
});

// Initialize Nebula
initNebula();
