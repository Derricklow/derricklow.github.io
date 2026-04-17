/* Variable Declaration */
let wordIndex = 0;
let letterIndex = 0;
let isDeleting = false;
let typingSpeed = 120;
let deletingSpeed = 60;
let pauseBetweenWords = 1500;

/* Element References */
const dynamicText = document.getElementById('dynamic-text');
const counterList = document.getElementById('counter-list');
const words = ["Low Jin Hui", "Full Stack Developer", "Junior Web Developer"];

/* Event Listeners */
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

/* Initialize */
type();
initFadeInObserver();
initCountObserver();

/* Functions */
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

/* Support Functions */
function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
}