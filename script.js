// ===============================
// RK Enterprises Website Script
// ===============================


// ===== Mobile Menu =====

const menuToggle = document.getElementById("menuToggle");
const navbar = document.getElementById("navbar");

if (menuToggle && navbar) {

    menuToggle.addEventListener("click", () => {
        navbar.classList.toggle("active");
    });

}


// ===== Premium Hero Slider =====

const heroSlides = document.querySelectorAll(".hero-slide");
const heroDots = document.querySelectorAll(".dot");

const prevSlideBtn = document.getElementById("prevSlide");
const nextSlideBtn = document.getElementById("nextSlide");

let heroCurrentSlide = 0;
let heroSlideTimer;


// Show Slide

function showHeroSlide(index) {

    if (heroSlides.length === 0) return;

    heroSlides.forEach((slide) => {
        slide.classList.remove("active");
    });

    heroDots.forEach((dot) => {
        dot.classList.remove("active");
    });

    heroSlides[index].classList.add("active");

    if (heroDots[index]) {
        heroDots[index].classList.add("active");
    }

    heroCurrentSlide = index;
}


// Next Slide

function nextHeroSlide() {

    if (heroSlides.length === 0) return;

    heroCurrentSlide++;

    if (heroCurrentSlide >= heroSlides.length) {
        heroCurrentSlide = 0;
    }

    showHeroSlide(heroCurrentSlide);
}


// Previous Slide

function previousHeroSlide() {

    if (heroSlides.length === 0) return;

    heroCurrentSlide--;

    if (heroCurrentSlide < 0) {
        heroCurrentSlide = heroSlides.length - 1;
    }

    showHeroSlide(heroCurrentSlide);
}


// Auto Slide

function startHeroSlider() {

    if (heroSlides.length <= 1) return;

    clearInterval(heroSlideTimer);

    heroSlideTimer = setInterval(() => {
        nextHeroSlide();
    }, 5000);
}


// Arrow Buttons

if (nextSlideBtn) {

    nextSlideBtn.addEventListener("click", () => {
        nextHeroSlide();
        startHeroSlider();
    });

}


if (prevSlideBtn) {

    prevSlideBtn.addEventListener("click", () => {
        previousHeroSlide();
        startHeroSlider();
    });

}


// Dots

heroDots.forEach((dot, index) => {

    dot.addEventListener("click", () => {

        showHeroSlide(index);
        startHeroSlider();

    });

});


// Start Slider

if (heroSlides.length > 0) {
    showHeroSlide(0);
    startHeroSlider();
}



// ===== Smooth Fade Animation =====

const observer = new IntersectionObserver((entries) => {

    entries.forEach((entry) => {

        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }

    });

});


document
    .querySelectorAll(".card, .section")
    .forEach((el) => {

        observer.observe(el);

    });



// ===== Scroll To Top =====

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

// ===== Animated Stats Counter =====

const counters = document.querySelectorAll(".counter");

const counterObserver = new IntersectionObserver((entries, observer) => {

    entries.forEach((entry) => {

        if (!entry.isIntersecting) return;

        const counter = entry.target;
        const target = Number(counter.dataset.target);

        let current = 0;
        const duration = 1800;
        const increment = target / (duration / 20);

        const updateCounter = () => {

            current += increment;

            if (current < target) {

                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);

            } else {

                counter.textContent = target;

            }

        };

        updateCounter();

        observer.unobserve(counter);

    });

}, {
    threshold: 0.5
});


counters.forEach((counter) => {
    counterObserver.observe(counter);
});

/* =================================
   PREMIUM GALLERY LIGHTBOX
================================= */

const galleryItems = document.querySelectorAll(".gallery-item");
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxClose = document.getElementById("lightboxClose");
const lightboxPrev = document.getElementById("lightboxPrev");
const lightboxNext = document.getElementById("lightboxNext");

let galleryIndex = 0;

function openGallery(index){

    galleryIndex = index;

    const image = galleryItems[galleryIndex].querySelector("img");

    lightboxImage.src = image.src;
    lightboxImage.alt = image.alt;

    lightbox.classList.add("active");

    document.body.style.overflow = "hidden";
}

function closeGallery(){

    lightbox.classList.remove("active");

    document.body.style.overflow = "";
}

function nextGallery(){

    galleryIndex++;

    if(galleryIndex >= galleryItems.length){
        galleryIndex = 0;
    }

    openGallery(galleryIndex);
}

function previousGallery(){

    galleryIndex--;

    if(galleryIndex < 0){
        galleryIndex = galleryItems.length - 1;
    }

    openGallery(galleryIndex);
}


galleryItems.forEach((item,index)=>{

    item.addEventListener("click",()=>{
        openGallery(index);
    });

});


lightboxClose.addEventListener("click",closeGallery);

lightboxNext.addEventListener("click",nextGallery);

lightboxPrev.addEventListener("click",previousGallery);


/* Close by clicking outside image */

lightbox.addEventListener("click",(e)=>{

    if(e.target === lightbox){
        closeGallery();
    }

});


/* Keyboard */

document.addEventListener("keydown",(e)=>{

    if(!lightbox.classList.contains("active")){
        return;
    }

    if(e.key === "Escape"){
        closeGallery();
    }

    if(e.key === "ArrowRight"){
        nextGallery();
    }

    if(e.key === "ArrowLeft"){
        previousGallery();
    }

});
