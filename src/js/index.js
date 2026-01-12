import $ from "jquery";
import Swiper from "swiper/bundle";

$(document).ready(function () {
    $(".header__burger").click(function (event) {
        $(this).toggleClass("active");
        $(".header__nav").toggleClass("active");
        $("body").toggleClass("lock");
    });
    $(".faq__item").click(function (event) {
        $(this).toggleClass("active");
        $('.faq__item').not(this).removeClass("active");
    });
    const teacherSwiper = new Swiper(".teacher__swiper", {
        spaceBetween: 20,
        navigation: {
            nextEl: ".teacher__nav_right",
            prevEl: ".teacher__nav_left",
        },
        breakpoints: {
            0: {
                slidesPerView: 1,
                spaceBetween: 30,
            },
            1024: {
                slidesPerView: 2,
                spaceBetween: 40,
            },
        },
    });
    const studentSwiper = new Swiper(".student__swiper", {
        spaceBetween: 20,
        breakpoints: {
            0: {
                slidesPerView: 1,
                spaceBetween: 30,
            },
            1024: {
                slidesPerView: 2,
                spaceBetween: 20,
            },
        },
        pagination: {
            el: ".student__pagination",
            clickable: true,
            enabled: window.innerWidth < 768,
        },
    });
    const courseSwiper = new Swiper(".course__swiper", {
        spaceBetween: 20,
        autoplay: true,
        navigation: {
            nextEl: ".course__navigaton_right",
            prevEl: ".course__navigaton_left",
        },
        breakpoints: {
            0: {
                slidesPerView: 1,
                spaceBetween: 30,
            },
            767: {
                slidesPerView: 2,
                spaceBetween: 20,
            },
            1024: {
                slidesPerView: 3,
                spaceBetween: 20,
            },
        },
    });
});
