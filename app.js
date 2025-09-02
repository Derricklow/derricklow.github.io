window.addEventListener('scroll', function(e) {
    const header = document.getElementById('sticky-header');
    if (window.scrollY > 200) {
        header.classList.remove('-translate-y-full');
    } else {
        if(!header.classList.contains('-translate-y-full')){
            header.classList.add('-translate-y-full');
        }
    }
})

const fadein_observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('active');
        fadein_observer.unobserve(entry.target);
    })
});

const count_observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        countUpdate(entry.target);
        count_observer.unobserve(entry.target);
    });
},{ threshold: 0.7 });

const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

const countUpdate = (ele) => {
    let target = parseFloat(ele.dataset.target ?? "0");
    let start = parseFloat(ele.dataset.start ?? "0");
    let duration = parseInt(ele.dataset.duration ?? "3000", 10);
    let prefix = ele.dataset.preffix ?? ""; // The unit before the amount: RM10
    let suffix = ele.dataset.suffix ?? ""; // The unit after the amount like: 10kg

    let counter_ele = ele.getElementsByClassName('counter')[0];
    let bar_ele = ele.getElementsByClassName('progress')[0];

    const decimals = Math.max(
        (ele.dataset.target?.split(".")[1]?.length ?? 0), 
        (ele.dataset.start?.split(".")[1]?.length ?? 0)
    );

    let startTs = null;

    const frame = (ts) => {
        if (!startTs) startTs = ts;
        const elapsed = ts - startTs;
        const t = Math.min(1, (elapsed / duration));
        const eased = easeOutCubic(t);
        const value = start + (target - start) * eased;

        // Format (thousands separators + decimals if needed)
        const text = decimals > 0
            ? value.toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals })
            : Math.round(value).toLocaleString();

        counter_ele.textContent = `${prefix}${text}${suffix}`;
        bar_ele.style = `stroke-dasharray: 100, 100; stroke-dashoffset: ${100 - text};`;

        if (t < 1) {
            requestAnimationFrame(frame);
        } else {
            // Snap exactly to the final value at the end
            let finalText = null;
            if(decimals > 0){
                finalText = target.toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
            } else {
                finalText = Math.round(target).toLocaleString();
            }

            counter_ele.textContent = `${prefix}${finalText}${suffix}`;
            bar_ele.style = `stroke-dasharray: 100, 100; stroke-dashoffset: ${100 - text};`;
        }
    }

    requestAnimationFrame(frame);
}

document.querySelectorAll('.fadeIn-observer, .fadeInUp-observer').forEach((ele) => fadein_observer.observe(ele));
document.querySelectorAll('.counter-observer').forEach((ele) => count_observer.observe(ele));

// here
const cards = [...document.querySelectorAll('.card')];
    let current = 2; // Start with center card

    function updateCarousel() {
      cards.forEach((card, i) => {
        const offset = i - current;

        if (offset === 0) {
          // center card
          card.style.width = "80%";
          card.style.transform = `translateX(0) rotateY(0) scale(1)`;
          card.style.opacity = 1;
          card.style.zIndex = 3;
          card.querySelectorAll("h2, p").forEach(el => el.style.opacity = 1);
        } else if (offset === -1) {
          // left card
          card.style.width = "15%";
          card.style.transform = `translateX(-250px) rotateY(40deg) scale(0.9)`;
          card.style.opacity = 1;
          card.style.zIndex = 2;
          card.querySelectorAll("h2, p").forEach(el => el.style.opacity = 0);
        } else if (offset === 1) {
          // right card
          card.style.width = "15%";
          card.style.transform = `translateX(250px) rotateY(-40deg) scale(0.9)`;
          card.style.opacity = 1;
          card.style.zIndex = 2;
          card.querySelectorAll("h2, p").forEach(el => el.style.opacity = 0);
        } else {
          // far cards (keep thin borders at ends)
          card.style.width = "15%";
          card.style.transform = `translateX(${offset * 250}px) scale(0.8) rotateY(${offset > 0 ? -40 : 40}deg)`;
          card.style.opacity = 0.5;
          card.style.zIndex = 1;
          card.querySelectorAll("h2, p").forEach(el => el.style.opacity = 0);
        }
      });
    }

    document.getElementById('next').addEventListener('click', () => {
      current = (current + 1) % cards.length;
      updateCarousel();
    });

    document.getElementById('prev').addEventListener('click', () => {
      current = (current - 1 + cards.length) % cards.length;
      updateCarousel();
    });

    updateCarousel();
