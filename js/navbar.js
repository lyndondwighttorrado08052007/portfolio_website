const navbar = document.querySelector(".navbar");

const menuToggle =
    document.querySelector(".menu-toggle");

const navMenu =
    document.querySelector(".nav-menu");

const navLinks =
    document.querySelectorAll(".nav-link");


window.addEventListener("scroll", () => {

    if(window.scrollY > 50){

        navbar.classList.add("scrolled");

    }
    else{

        navbar.classList.remove("scrolled");

    }

});


const currentPage =
    window.location.pathname.split("/").pop();

navLinks.forEach(link => {

    const linkPage =
        link.getAttribute("href");

    if(linkPage === currentPage){

        link.classList.add("active");

    }

});


menuToggle.addEventListener("click", () => {

    navMenu.classList.toggle("active");

});