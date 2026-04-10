(function () {
    "use strict";

    document.addEventListener("DOMContentLoaded", function () {
        const swiperContainer = document.querySelector(".listings-swiper");

        if (!swiperContainer || typeof Swiper === "undefined") return;

        new Swiper(".listings-swiper", {
            slidesPerView: 1,
            spaceBetween: 20,
            loop: true,
            navigation: {
                nextEl: ".listings-swiper-button-next",
                prevEl: ".listings-swiper-button-prev",
            },
            breakpoints: {
                640: { slidesPerView: 1.5 },
                1024: { slidesPerView: 3 },
            },
            watchSlidesProgress: true,
            wrapperClass: "listings-swiper-wrapper",
            slideClass: "listings-swiper-slide",
        });
    });
})();
