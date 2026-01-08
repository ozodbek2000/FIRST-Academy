import $ from "jquery";

$(document).ready(function () {
    $(".header__burger").click(function (event) {
        $(this).toggleClass("active");
        $('.header__nav').toggleClass("active");
        $("body").toggleClass("lock");
    });
});
