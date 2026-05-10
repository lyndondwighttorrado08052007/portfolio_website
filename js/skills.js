document.addEventListener("DOMContentLoaded", () => {

    const fills = document.querySelectorAll(".fill");

    const observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {
                entry.target.classList.add("animate");
                observer.unobserve(entry.target);
            }

        });

    }, { threshold: 0.5 });

    fills.forEach(fill => observer.observe(fill));

});