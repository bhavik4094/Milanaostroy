(function() {
    "use strict";

    document.addEventListener("DOMContentLoaded", function() {
        const section = document.querySelector(".testimonial-section");
        const swiperContainer = document.querySelector(".testimonial-swiper");

        if (!section || !swiperContainer || typeof Swiper === "undefined") return;

        // Initialize Swiper for testimonial section only
        const testimonialSwiper = new Swiper(".testimonial-swiper", {
            slidesPerView: 1.2,
            spaceBetween: 20,
            navigation: {
                nextEl: ".testimonial-swiper-button-next",
                prevEl: ".testimonial-swiper-button-prev",
            },
            breakpoints: {
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
                1200: { slidesPerView: 4 },
            },
            watchSlidesProgress: true,
            wrapperClass: "testimonial-swiper-wrapper",
            slideClass: "testimonial-swiper-slide",
        });

        const allVideos = section.querySelectorAll("video");

        // Stop all videos helper
        function stopAllVideos(reset = true) {
            allVideos.forEach((video) => {
                video.pause();
                if (reset) video.currentTime = 0;
                video.removeAttribute("controls");

                const slide = video.closest(".testimonial-swiper-slide");
                if (!slide) return;

                const content = slide.querySelector(".card-content");
                const playBtn = slide.querySelector(".play-btn");

                if (content) content.classList.remove("hidden");
                if (playBtn) playBtn.style.display = "flex";
            });
        }

        // Play button click
        section.addEventListener("click", function(e) {
            const playBtn = e.target.closest(".play-btn");
            if (!playBtn) return;

            const slide = playBtn.closest(".testimonial-swiper-slide");
            const video = slide.querySelector("video");
            const content = slide.querySelector(".card-content");

            if (!video) return;

            stopAllVideos(true);

            video.play();
            video.setAttribute("controls", true);

            playBtn.style.display = "none";
            if (content) content.classList.add("hidden");
        });

        // Handle pause to restore overlay
        allVideos.forEach((video) => {
            video.addEventListener("pause", function() {
                const slide = video.closest(".testimonial-swiper-slide");
                if (!slide) return;

                const content = slide.querySelector(".card-content");
                const playBtn = slide.querySelector(".play-btn");

                if (content) content.classList.remove("hidden");
                if (playBtn) playBtn.style.display = "flex";

                video.removeAttribute("controls");
            });
        });

        // Click outside section: stop videos (pause only)
        document.addEventListener("click", function(e) {
            if (!section.contains(e.target)) {
                stopAllVideos(false);
            }
        });

        // On slide change also pause videos
        testimonialSwiper.on("slideChange", function() {
            stopAllVideos(false);
        });
    });
})();