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

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
            entry.target.classList.add('active');
            entry.target.classList.remove('fadeIn-observer');

            if(entry.target.classList.contains('counter-observer')){
                let counter = entry.target;
                let counter_result = counter.getAttribute('data-target');
                let bar_result = 100 - counter_result;

                let count_ele = counter.getElementsByClassName('counter')[0];
                let bar_ele = counter.getElementsByClassName('progress')[0];

                count_ele.innerText = counter_result + '%';
            }

            observer.unobserve(entry.target);
    })
});

document.querySelectorAll('.fadeIn-observer').forEach((ele) => observer.observe(ele));
document.querySelectorAll('.fadeInUp-observer').forEach((ele) => observer.observe(ele));
document.querySelectorAll('.counter-observer').forEach((ele) => observer.observe(ele));
