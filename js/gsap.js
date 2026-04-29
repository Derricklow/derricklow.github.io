
gsap.registerPlugin(ScrollTrigger);

gsap.to("#timeline-progress", {
    height: "100%",
    ease: "none",
    scrollTrigger: {
        trigger: "#timeline-container",
        start: "top 60%",
        end: "bottom 60%",
        scrub: true,
    }
});

let rows = document.querySelectorAll('.timeline-row');
rows.forEach(function(row) {
    let dot = row.querySelector('.timeline-dot');
    let card = row.querySelector('.company-card');

    ScrollTrigger.create({
        trigger: dot,
        start: "top 60%",
        toggleClass: { targets: dot, className: "active" },
        onEnter: function() {
            if (card) card.classList.add("active");
        },
        onLeaveBack: function() {
            if (card) card.classList.remove("active");
        },
    });
});
