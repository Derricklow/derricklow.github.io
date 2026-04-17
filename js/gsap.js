
gsap.registerPlugin(ScrollTrigger);

// 进度条：跟随滚动
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

// 每个节点：用 timeline-dot 作为 trigger（不是 row）
// 这样 dot 到达视窗中心时才触发，不会提前亮
let rows = document.querySelectorAll('.timeline-row');
rows.forEach(function(row) {
    let dot = row.querySelector('.timeline-dot');
    let card = row.querySelector('.company-card');

    ScrollTrigger.create({
        trigger: dot,
        start: "top 60%",
        // end: "bottom 40%",
        toggleClass: { targets: dot, className: "active" },
        onEnter: function() {
            if (card) card.classList.add("active");
        },
        onLeaveBack: function() {
            if (card) card.classList.remove("active");
        },
    });
});
