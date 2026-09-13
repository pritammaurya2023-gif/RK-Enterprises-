// ===============================
// RK Enterprises Website Script
// ===============================

// Hero Image Slider
const slides = document.querySelectorAll(".slider img");
let currentSlide = 0;

if (slides.length > 0) {
    setInterval(() => {
        slides[currentSlide].classList.remove("active");
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add("active");
    }, 4000);
}

// Smooth Fade Animation
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }
    });
});

document.querySelectorAll(".card,.section").forEach((el) => {
    observer.observe(el);
});

// Scroll To Top Button
const topBtn = document.getElementById("topBtn");

if (topBtn) {

    window.addEventListener("scroll", () => {

        if (window.scrollY > 300) {
            topBtn.style.display = "flex";
        } else {
            topBtn.style.display = "none";
        }

    });

    topBtn.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });

}

const menuToggle=document.getElementById("menuToggle");
const navbar=document.getElementById("navbar");

menuToggle.onclick=function(){
    navbar.classList.toggle("active");
}

/* ===== Premium Hero Slider ===== */

const heroSlides = document.querySelectorAll(".hero-slide");
const heroDots = document.querySelectorAll(".dot");

const prevSlide = document.getElementById("prevSlide");
const nextSlide = document.getElementById("nextSlide");

let currentSlide = 0;
let slideTimer;


function showSlide(index){

    heroSlides.forEach((slide) => {
        slide.classList.remove("active");
    });

    heroDots.forEach((dot) => {
        dot.classList.remove("active");
    });

    heroSlides[index].classList.add("active");
    heroDots[index].classList.add("active");

    currentSlide = index;
}


function nextHeroSlide(){

    let next = currentSlide + 1;

    if(next >= heroSlides.length){
        next = 0;
    }

    showSlide(next);
}


function previousHeroSlide(){

    let previous = currentSlide - 1;

    if(previous < 0){
        previous = heroSlides.length - 1;
    }

    showSlide(previous);
}


/* Auto Slider */

function startSlider(){

    clearInterval(slideTimer);

    slideTimer = setInterval(
        nextHeroSlide,
        5000
    );
}

nextSlide.addEventListener("click", () => {
    nextHeroSlide();
    startSlider();
});

prevSlide.addEventListener("click", () => {
    previousHeroSlide();
    startSlider();
});


/* Dots */

heroDots.forEach((dot, index) => {

    dot.addEventListener("click", () => {

        showSlide(index);
        startSlider();

    });

});


startSlider();
