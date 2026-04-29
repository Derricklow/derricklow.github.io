let wordIndex = 0;
let letterIndex = 0;
let isDeleting = false;
let typingSpeed = 120;
let deletingSpeed = 60;
let pauseBetweenWords = 1500;
let body = document.body;

const dynamicText = document.getElementById('dynamic-text');
const counterList = document.getElementById('counter-list');
const words = ["Low Jin Hui", "Full Stack Developer", "Junior Web Developer"];

window.addEventListener('scroll', function(e) {
    const header = document.getElementById('sticky-header');
    if (window.scrollY > 200) {
        header.classList.remove('-translate-y-full');
    } else {
        if(!header.classList.contains('-translate-y-full')){
            header.classList.add('-translate-y-full');
        }
    }
});

let projectTriggers = document.querySelectorAll('.project-trigger');
let projectModal = document.getElementById('project-modal');
let closeProjectModalBtn = document.getElementById('project-modal-close');
let modalBackdrop = document.getElementById('modal-backdrop');

projectTriggers.forEach((btn) => {
    btn.addEventListener('click', () => openProjectModal(btn));
});

closeProjectModalBtn.addEventListener('click', closeProjectModal);
modalBackdrop.addEventListener('click', closeProjectModal);

let mobileMenu = document.getElementById('mobile-menu');
let menuIcons = document.querySelectorAll('.menu-icon');
let mobileMenuLinks = document.querySelectorAll('.mobile-menu-link');
let isMobileMenuOpen = false;

menuIcons.forEach((icon) => icon.addEventListener('click', toggleMobileMenu));
mobileMenuLinks.forEach((link) => link.addEventListener('click', closeMobileMenu));

type();
initFadeInObserver();
initCountObserver();

function type() {
    const currentWord = words[wordIndex];

    if (!isDeleting) {
        dynamicText.textContent = currentWord.slice(0, letterIndex + 1);
        letterIndex++;

        if (letterIndex === currentWord.length) {
            isDeleting = true;
            setTimeout(type, pauseBetweenWords);
            return;
        }
    } else {
        dynamicText.textContent = currentWord.slice(0, letterIndex - 1);
        letterIndex--;

        if (letterIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
        }
    }

    setTimeout(type, isDeleting ? deletingSpeed : typingSpeed);
}

function initFadeInObserver() {
    var observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
        });
    });

    document.querySelectorAll('.fadeIn-observer, .fadeInUp-observer').forEach(function(ele) { 
        observer.observe(ele); 
    });
}

function initCountObserver() {
    let observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if(entry.isIntersecting){
                countUpdate(entry.target);
                observer.unobserve(entry.target);
            }
        });
    },{ threshold: 0.7 });

    counterList.querySelectorAll('.counter-observer').forEach(function(ele) { 
        observer.observe(ele); 
    });
}

function countUpdate(ele) {
    let target = parseFloat(ele.dataset.target ?? "0");
    let start = parseFloat(ele.dataset.start ?? "0");
    let duration = parseInt(ele.dataset.duration ?? "3000", 10);
    let prefix = ele.dataset.preffix ?? "";
    let suffix = ele.dataset.suffix ?? "";

    let counter_ele = ele.getElementsByClassName('counter')[0];
    let bar_ele = ele.getElementsByClassName('progress')[0];

    let decimals = Math.max(
        (ele.dataset.target?.split(".")[1]?.length ?? 0),
        (ele.dataset.start?.split(".")[1]?.length ?? 0)
    );

    let startTs = null;

    function frame(ts) {
        if (!startTs) startTs = ts;
        let elapsed = ts - startTs;
        let t = Math.min(1, (elapsed / duration));
        let eased = easeOutCubic(t);
        let value = start + (target - start) * eased;

        let text = decimals > 0
            ? value.toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals })
            : Math.round(value).toLocaleString();

        counter_ele.textContent = prefix + text + suffix;
        bar_ele.style = "stroke-dasharray: 100, 100; stroke-dashoffset: " + (100 - text) + ";";

        if (t < 1) {
            requestAnimationFrame(frame);
        } else {
            let finalText = null;
            if(decimals > 0){
                finalText = target.toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
            } else {
                finalText = Math.round(target).toLocaleString();
            }

            counter_ele.textContent = prefix + finalText + suffix;
            bar_ele.style = "stroke-dasharray: 100, 100; stroke-dashoffset: " + (100 - text) + ";";
        }
    }

    requestAnimationFrame(frame);
}

function openProjectModal(data) {
    let modalTitle = document.getElementById('project-modal-title');
    let modalDesc = document.getElementById('project-modal-desc');
    let modalImage = document.getElementById('project-modal-image');
    let modalCompanyName = document.getElementById('project-modal-company-name');
    let modalCompanyImg = document.getElementById('project-modal-company-img');
    let modalTech = document.getElementById('project-modal-tech');
    let modalLearn = document.getElementById('project-modal-learn');
    let modalFunction = document.getElementById('project-modal-function');

    let company_filter = {
        "WEPOST SDN BHD": "./img/wepost.jpg",
        "ASJ COMPONENTS (M) SDN BHD": "./img/ASJ.png",
        "NEWPAGES SDN BHD": "./img/newpages.png"
    };

    let tech_stack = {
        "laravel": { type: "i", src: "<i class='fab fa-laravel text-3xl' style='color: #FF2D20;'></i>" },
        "bootstrap": { type: "i", src: "<i class='fab fa-bootstrap text-3xl' style='color: #7952B3;'></i>" },
        "javascript": { type: "i", src: "<i class='fab fa-js-square text-3xl' style='color: #F7DF1E;'></i>" },
        "reactjs": { type: "i", src: "<i class='fab fa-react text-3xl' style='color: #61DAFB;'></i>" },
        "html5": { type: "i", src: "<i class='fab fa-html5 text-3xl' style='color: #E34F26;'></i>" },
        "css3": { type: "i", src: "<i class='fab fa-css3-alt text-3xl' style='color: #1572B6;'></i>" },
        "vuejs": { type: "i", src: "<i class='fab fa-vuejs text-3xl' style='color: #42b883;'></i>" },
        "sass": { type: "i", src: "<i class='fab fa-sass text-3xl' style='color: #CC6699;'></i>" },
        "npm": { type: "i", src: "<i class='fab fa-npm text-3xl' style='color: #CB3837;'></i>" },
        "nodejs": { type: "i", src: "<i class='fab fa-node text-3xl' style='color: #339933;'></i>" },
        "sourcetree": { type: "i", src: "<i class='fab fa-sourcetree text-3xl' style='color:#0052CC;'></i>" },
        "bitbucket": { type: "i", src: "<i class='fab fa-bitbucket text-3xl' style='color:#2684FF;'></i>" },
        "github": { type: "i", src: "<i class='fab fa-github text-3xl' style='color:#333;'></i>" },
        "git": { type: "i", src: "<i class='fab fa-git-alt text-3xl' style='color:#F05033;'></i>" },
        "php": { type: "i", src: "<i class='fab fa-php text-3xl' style='color: #777BB4;'></i>" },
        "cordova": { type: "img", src: "./img/cordova-icon.png", alt: "Apache Cordova Logo", style: "object-fit: contain; width: 80px; height: 40px; background: var(--color-gray-500); border-radius: 6px;" },
        "mysql": { type: "img", src: "./img/mysql-icon.png", alt: "MySQL Logo", style: "object-fit: cover; width: 70px; height: 50px;" },
        "vba": { type: "img", src: "./img/vba-icon.png", alt: "VBA Logo", style: "object-fit: contain; width: 70px; height: 40px;" },
        "wordpress": { type: "i", src: "<i class='fab fa-wordpress text-3xl' style='color: #21759B;'></i>" },
        "elementor": { type: "i", src: "<i class='fab fa-elementor text-3xl' style='color: #7952B3;'></i>" }
    };
    
    modalTech.innerHTML = '';
    modalLearn.innerHTML = '';
    modalFunction.innerHTML = '';

    modalImage.src = data.dataset.image;
    modalImage.alt = data.dataset.imageAlt;
    modalTitle.textContent = data.dataset.title;
    modalCompanyName.innerHTML = "Learning in <span class='text-emerald-500 uppercase'>" + data.dataset.company + "</span>";
    modalCompanyImg.src = company_filter[(data.dataset.company).toUpperCase()] || "";
    modalCompanyImg.alt = data.dataset.company + " Logo";
    modalDesc.textContent = data.dataset.description;

    let techs = data.dataset.tech.split(',');
    let learns = data.dataset.learn.split(',');
    let functions = data.dataset.function.split(',');
    techs.forEach(tech => {
        let tech_key = tech.trim().toLowerCase();
        if(tech_stack[tech_key]){
            let tech_ele = document.createElement(tech_stack[tech_key].type);
            if(tech_stack[tech_key].type === "img"){
                tech_ele.src = tech_stack[tech_key].src;
                tech_ele.alt = tech_stack[tech_key].alt;
                tech_ele.style = tech_stack[tech_key].style;
            } else {
                tech_ele.innerHTML = tech_stack[tech_key].src;
            }
            modalTech.appendChild(tech_ele);
        }
    });

    learns.forEach(learn => {
        let li = document.createElement('li');
        li.classList.add("text-gray-400", "capitalize");
        li.textContent = learn.trim();
        modalLearn.appendChild(li);
    });

    functions.forEach(f => {
        let li = document.createElement('li');
        li.classList.add("text-gray-400", "capitalize");
        li.textContent = f.trim();
        modalFunction.appendChild(li);
    });

    body.classList.add('overflow-hidden');
    projectModal.classList.replace('opacity-0', 'opacity-100');
    projectModal.classList.replace('invisible', 'visible');
    modalBackdrop.classList.replace('opacity-0', 'opacity-80');
    modalBackdrop.classList.replace('invisible', 'visible');
}

function closeProjectModal() {
    body.classList.remove('overflow-hidden');
    modalBackdrop.classList.replace('opacity-80', 'opacity-0');
    modalBackdrop.classList.replace('visible', 'invisible');
    projectModal.classList.replace('opacity-100', 'opacity-0');
    projectModal.classList.replace('visible', 'invisible');
}

function toggleMobileMenu() {
    isMobileMenuOpen ? closeMobileMenu() : openMobileMenu();
}

function openMobileMenu() {
    mobileMenu.classList.add('opacity-100', 'visible', 'translate-y-0');
    mobileMenu.classList.remove('opacity-0', 'invisible', '-translate-y-4');
    menuIcons.forEach((icon) => icon.classList.replace('fa-bars', 'fa-times'));
    isMobileMenuOpen = true;
}

function closeMobileMenu() {
    mobileMenu.classList.add('opacity-0', 'invisible', '-translate-y-4');
    mobileMenu.classList.remove('opacity-100', 'visible', 'translate-y-0');
    menuIcons.forEach((icon) => icon.classList.replace('fa-times', 'fa-bars'));
    isMobileMenuOpen = false;
}


const carousel = document.querySelector('.carousel');
const carouselCards = carousel ? carousel.querySelectorAll('.card') : [];
const CARD_STEP = 220;
const DRAG_THRESHOLD = 60;
let carouselIndex = 0;
let dragStartX = 0;
let dragOffset = 0;
let isDragging = false;

if (carouselCards.length > 0) {
    updateCarousel();
    carousel.addEventListener('pointerdown', onDragStart);
    carousel.addEventListener('pointermove', onDragMove);
    carousel.addEventListener('pointerup', onDragEnd);
    carousel.addEventListener('pointercancel', onDragEnd);
}

function onDragStart(e) {
    isDragging = true;
    dragStartX = e.clientX;
    dragOffset = 0;
    carousel.classList.add('is-dragging');
    carousel.setPointerCapture(e.pointerId);
}

function onDragMove(e) {
    if (!isDragging) return;
    dragOffset = e.clientX - dragStartX;
    updateCarousel();
}

function onDragEnd() {
    if (!isDragging) return;
    isDragging = false;
    carousel.classList.remove('is-dragging');

    let n = carouselCards.length;
    if (Math.abs(dragOffset) >= DRAG_THRESHOLD) {
        let move = Math.round(-dragOffset / CARD_STEP);
        if (move === 0) move = dragOffset > 0 ? -1 : 1;
        carouselIndex = ((carouselIndex + move) % n + n) % n;
    }

    dragOffset = 0;
    updateCarousel();
}

function updateCarousel() {
    let n = carouselCards.length;
    let dragShift = dragOffset / CARD_STEP;

    carouselCards.forEach((card, i) => {
        let offset = (i - carouselIndex) + dragShift;
        if (offset > n / 2) offset -= n;
        if (offset < -n / 2) offset += n;
        let abs = Math.abs(offset);
        let translateX = offset * CARD_STEP;
        let rotateY = offset * -25;
        let scale = Math.max(0.4, 1 - abs * 0.15);

        card.style.transform = `translate(-50%, -50%) translateX(${translateX}px) rotateY(${rotateY}deg) scale(${scale})`;
        card.style.zIndex = 10 - Math.round(abs);
        card.style.pointerEvents = abs > 2 ? 'none' : 'auto';
        card.classList.toggle('is-active', i === carouselIndex && !isDragging);
    });
}

function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
}