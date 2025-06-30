import $ from "jquery";
import Swiper from "swiper";
import { dropdown } from "./components/dropdown";
import { dropdownSimple } from "./components/dropdown-simple";

$(document).ready(function () {
    $(".header__theme").click(function (event) {
        $("body").toggleClass("light");
    });
    $(document).on("keydown", function (event) {
        if (event.key === "t" || event.key === "T") {
            $("body").toggleClass("light");
        }
    });

    $(".header__arrow").click(function (event) {
        $(".header__nav").toggleClass("active");
    });
    $(".calc__content_months > span").click(function (event) {
        $(".calc__content_months > span").removeClass("active");
        $(this).addClass("active");
    });
    $(".calc__tarifs > .calc__tarifs_item").click(function (event) {
        $(".calc__tarifs > .calc__tarifs_item").removeClass("active");
        $(this).addClass("active");
    });
    $(".faq-item").click(function (event) {
        $(this).toggleClass("active");
    });

    //READ MORE
    $(".story__slide_text > span").on("click", function () {
        $(this).siblings("p").css("-webkit-line-clamp", "unset");
        $(this).hide();
    });
    //READ MORE

    $(window).scroll(function() {
        var $header = $('header');
        
        if ($(window).scrollTop() > 100) {
            $header.addClass('scrolled');
        } else {
            $header.removeClass('scrolled');
        }
    });

    dropdown();
    dropdownSimple();
    if ($(window).width() < 1080) {
        const swiper = new Swiper(
            ".cta__top_container, .cta__bottom_container",
            {
                slidesPerView: 1,
                spaceBetween: 10,
            }
        );
    }

    if ($(window).width() < 1080) {
        new Swiper(".story__swiper", {
            spaceBetween: 10,
            breakpoints: {
                0: {
                    slidesPerView: 1,
                },
                768: {
                    slidesPerView: 2,
                },
            },
        });
    }

    //COPYING FORM INPUTS

    new Swiper(".advan__grid_swiper", {
        slidesPerView: 2,
        breakpoints: {
            0: {
                slidesPerView: 1,
                spaceBetween: 10,
            },
            1080: {
                slidesPerView: 2,
                spaceBetween: 20,
            },
        },
    });

    new Swiper(".consult__cards_container", {
        breakpoints: {
            0: {
                slidesPerView: 1,
                spaceBetween: 30,
            },
            767: {
                slidesPerView: 2,
                spaceBetween: 20,
            },
            1080: {
                slidesPerView: 4,
                spaceBetween: 20,
            },
        },
    });

    new Swiper(".latest__swiper", {
        breakpoints: {
            0: {
                slidesPerView: 1,
                spaceBetween: 30,
            },
            767: {
                slidesPerView: 2,
                spaceBetween: 20,
            },
            1080: {
                slidesPerView: 4,
                spaceBetween: 20,
            },
        },
    });

    new Swiper(".partners__swiper", {
        breakpoints: {
            0: {
                slidesPerView: 1,
                spaceBetween: 30,
            },
            767: {
                slidesPerView: 2,
                spaceBetween: 20,
            },
            1080: {
                slidesPerView: 3,
                spaceBetween: 20,
            },
        },
    });

    new Swiper(".trust__swiper", {
        slidesPerView: 5,
        breakpoints: {
            0: {
                slidesPerView: 1,
                spaceBetween: 50,
            },
            767: {
                slidesPerView: 3,
                spaceBetween: 50,
            },
            1080: {
                slidesPerView: 5,
                spaceBetween: 110,
            },
        },
    });

    $(".calc__inputs_clear a:last-child").on("click", function (e) {
        e.preventDefault();

        // Get dropdown values (selected text from dropdown links) and trim whitespace
        var formOwnership =
            $(
                ".calc__inputs_box:first .calc__inputs_box-input:first-child .dropdown-simple > a"
            )
                .text()
                .trim() || "Не выбрано";
        var organizationForm =
            $(
                ".calc__inputs_box:first .calc__inputs_box-input:last-child .dropdown-simple > a"
            )
                .text()
                .trim() || "Не выбрано";
        var activityType =
            $(".calc__inputs_form .dropdown-simple > a").text().trim() ||
            "Не выбрано";

        // Get input values
        var employeeCount =
            $(
                '.calc__inputs_box--2 .calc__inputs_box-item:first-child input[type="number"]'
            ).val() || "0";
        var monthlyTurnover =
            $(
                '.calc__inputs_box--2 .calc__inputs_box-item:last-child input[type="number"]'
            ).val() || "0";

        // Format the text to copy
        var textToCopy = `1: Форма собственности: ${formOwnership}
2: Организационная форма: ${organizationForm}
3: Основной вид деятельности: ${activityType}
4: Кол-во сотрудников: ${employeeCount}
5: Оборот в месяц: ${monthlyTurnover} UZS`;

        // Copy to clipboard
        if (navigator.clipboard && window.isSecureContext) {
            // Use modern clipboard API
            navigator.clipboard
                .writeText(textToCopy)
                .then(function () {
                    showCopySuccess();
                })
                .catch(function (err) {
                    console.error("Failed to copy: ", err);
                    fallbackCopyTextToClipboard(textToCopy);
                });
        } else {
            // Fallback for older browsers
            fallbackCopyTextToClipboard(textToCopy);
        }
    });

    // Fallback copy method for older browsers
    function fallbackCopyTextToClipboard(text) {
        var textArea = document.createElement("textarea");
        textArea.value = text;

        // Avoid scrolling to bottom
        textArea.style.top = "0";
        textArea.style.left = "0";
        textArea.style.position = "fixed";

        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();

        try {
            var successful = document.execCommand("copy");
            if (successful) {
                showCopySuccess();
            } else {
                showCopyError();
            }
        } catch (err) {
            console.error("Fallback: Oops, unable to copy", err);
            showCopyError();
        }

        document.body.removeChild(textArea);
    }

    // Show success message
    function showCopySuccess() {
        // Change button text temporarily
        var $button = $(".calc__inputs_clear a:last-child span");
        var originalText = $button.text();
        $button.text("Скопировано!");
        $button.parent().addClass("copied");

        setTimeout(function () {
            $button.text(originalText);
            $button.parent().removeClass("copied");
        }, 2000);
    }

    // Show error message
    function showCopyError() {
        var $button = $(".calc__inputs_clear a:last-child span");
        var originalText = $button.text();
        $button.text("Ошибка копирования");
        $button.parent().addClass("copy-error");

        setTimeout(function () {
            $button.text(originalText);
            $button.parent().removeClass("copy-error");
        }, 2000);
    }

    //CLEARING FORM INPUTS

    // Handle clear button click
    $(".calc__inputs_clear a:first-child").on("click", function (e) {
        e.preventDefault(); // Prevent default link behavior

        // Clear all number inputs and set them to 0
        $('.calc__inputs_production input[type="number"]').val("0");

        // Clear textarea
        $(".calc__inputs_textarea textarea").val("");

        // Reset all dropdowns to default "ИП"
        $(".dropdown-simple span").text("ИП");

        // Close any open dropdown menus
        $(".dropdown-simple_list").hide();

        // Optional: Add visual feedback (you can customize this)
        $(this).addClass("clearing");
        setTimeout(() => {
            $(this).removeClass("clearing");
        }, 200);

        // Update price after clearing
        updatePrice();
    });

    // UNIFIED DROPDOWN HANDLING - Ensures only one dropdown can be open at a time

    // Handle dropdown toggle - close others when opening one
    $(".dropdown-simple > a").on("click", function (e) {
        e.preventDefault();
        e.stopPropagation();

        const $currentDropdown = $(this).siblings(".dropdown-simple_list");
        const isCurrentlyOpen = $currentDropdown.is(":visible");

        // Close all dropdowns first
        $(".dropdown-simple_list").hide();

        // If the clicked dropdown wasn't open, open it
        if (!isCurrentlyOpen) {
            $currentDropdown.show();
        }
    });

    // Handle dropdown item selection
    $(".dropdown-simple_list li a").on("click", function (e) {
        e.preventDefault();
        e.stopPropagation();

        const selectedText = $(this).text();
        $(this).closest(".dropdown-simple").find("span").text(selectedText);

        // Close all dropdowns after selection
        $(".dropdown-simple_list").hide();

        // Update price if this is a calculator dropdown
        if (
            $(this).closest(
                ".calc__inputs_production, .calc__inputs_box, .calc__inputs_form"
            ).length
        ) {
            updatePrice();
        }
    });

    // Close all dropdowns when clicking outside
    $(document).on("click", function (e) {
        if (!$(e.target).closest(".dropdown-simple").length) {
            $(".dropdown-simple_list").hide();
        }
    });

    // Close dropdowns on ESC key
    $(document).on("keydown", function (e) {
        if (e.key === "Escape") {
            $(".dropdown-simple_list").hide();
        }
    });

    // FORM
    const botToken = "8025593472:AAGfwJG1NL5nwWmB2L1DJK7pu4Z5xUaKa7E";
    const chatId = "-1002710037990";
    let alreadySent = false;

    // Формат номера телефона
    $("#userPhone").on("input", function () {
        let input = $(this).val().replace(/\D/g, "");
        if (input.startsWith("998")) input = input.slice(3);

        let formatted = "+998";
        if (input.length > 0) formatted += " " + input.substring(0, 2);
        if (input.length > 2) formatted += " " + input.substring(2, 5);
        if (input.length > 5) formatted += " " + input.substring(5, 7);
        if (input.length > 7) formatted += " " + input.substring(7, 9);

        $(this).val(formatted);
    });

    // Проверка номера Узбекистана
    function isValidUzbekPhone(phone) {
        const cleaned = phone.replace(/\s/g, "");
        return /^\+998\d{9}$/.test(cleaned);
    }

    function sendToBot(actionType) {
        if (alreadySent) return;

        const name = $("#userName").val().trim();
        const email = $("#userEmail").val().trim();
        const phone = $("#userPhone").val().trim();
        const autoRenew = $("#autoRenew").is(":checked") ? "Да" : "Нет";

        // Новый код: получаем выбранный срок
        const selectedPeriod = $(".calc__content_months span.active")
            .text()
            .trim();

        if (!isValidUzbekPhone(phone)) {
            alert(
                "❗ Пожалуйста, введите корректный номер телефона в формате +998 XX XXX XX XX"
            );
            return;
        }

        const message = `
    💬 Новая заявка (${actionType}):
    
    👤 Имя: ${name}
    📧 Email: ${email}
    📱 Телефон: ${phone}
    📆 Период оплаты: ${selectedPeriod}
    🔁 Автопродление: ${autoRenew}
        `;

        $.ajax({
            url: `https://api.telegram.org/bot${botToken}/sendMessage`,
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify({
                chat_id: chatId,
                text: message,
                parse_mode: "HTML",
            }),
            success: function () {
                alert("✅ Данные успешно отправлены!");

                $("#userName").val("");
                $("#userEmail").val("");
                $("#userPhone").val("+998");
                $("#autoRenew").prop("checked", false);

                alreadySent = true;
                setTimeout(() => {
                    alreadySent = false;
                }, 3000);
            },
            error: function () {
                alert("⚠️ Ошибка при отправке. Попробуйте позже.");
            },
        });
    }

    $(document).ready(function () {
        $("#payNow").on("click", function (e) {
            e.preventDefault();
            sendToBot("Оплата");
        });

        $("#needHelp").on("click", function (e) {
            e.preventDefault();
            sendToBot("Консультация");
        });
    });

    // Свяжитесь с нами
    function formatPhone(input) {
        let cleaned = input.replace(/\D/g, "").slice(0, 12);
        let formatted = "+998 ";
        if (cleaned.length > 3) formatted += cleaned.slice(3, 5) + " ";
        if (cleaned.length > 5) formatted += cleaned.slice(5, 8) + " ";
        if (cleaned.length > 8) formatted += cleaned.slice(8, 10) + " ";
        if (cleaned.length > 10) formatted += cleaned.slice(10, 12);
        return formatted.trim();
    }

    // Валидации
    function isValidUzbekPhone(phone) {
        return /^\+998 \d{2} \d{3} \d{2} \d{2}$/.test(phone);
    }
    function showError(input, message) {
        alert(message);
        input.focus();
    }

    // Отправка в Telegram
    function sendToTelegram(data, form) {
        const message = `
📨 Новое сообщение с формы "Свяжитесь с нами":

👤 Имя: ${data.name}
👥 Фамилия: ${data.surname}
📱 Телефон: ${data.phone}
📧 Email: ${data.email}
    `;

        $.ajax({
            url: `https://api.telegram.org/bot${botToken}/sendMessage`,
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify({
                chat_id: chatId,
                text: message,
                parse_mode: "HTML",
            }),
            success: function () {
                alert("Сообщение успешно отправлено!");
                form.find("input").val(""); // очистка формы
                $("#contactPhone").val("+998 ");
            },
            error: function () {
                alert("Произошла ошибка при отправке.");
            },
        });
    }

    $(document).ready(function () {
        // Автоформат номера
        $("#contactPhone").on("input", function () {
            this.value = formatPhone(this.value);
        });

        // Обработка клика
        $("#contactSend").on("click", function (e) {
            e.preventDefault();

            const $form = $(this).closest(".support__columns_inputs");
            const name = $("#contactName").val().trim();
            const surname = $("#contactSurname").val().trim();
            const phone = $("#contactPhone").val().trim();
            const email = $("#contactEmail").val().trim();

            if (!name) return showError($("#contactName"), "Введите имя");
            if (!surname)
                return showError($("#contactSurname"), "Введите фамилию");
            if (!isValidUzbekPhone(phone))
                return showError($("#contactPhone"), "Неверный номер телефона");

            sendToTelegram({ name, surname, phone, email }, $form);
        });
    });

    // Add this code to your existing JavaScript file

    $(document).ready(function () {
        // Phone formatting for three form
        $(".three__form input[type='tel']").on("input", function () {
            let input = $(this).val().replace(/\D/g, "");
            if (input.startsWith("998")) input = input.slice(3);

            let formatted = "+998";
            if (input.length > 0) formatted += " " + input.substring(0, 2);
            if (input.length > 2) formatted += " " + input.substring(2, 5);
            if (input.length > 5) formatted += " " + input.substring(5, 7);
            if (input.length > 7) formatted += " " + input.substring(7, 9);

            $(this).val(formatted);
        });

        // Validation function for three form
        function isValidUzbekPhoneThree(phone) {
            const cleaned = phone.replace(/\s/g, "");
            return /^\+998\d{9}$/.test(cleaned);
        }

        function showThreeFormError(input, message) {
            alert(message);
            input.focus();
        }

        // Send three form data to Telegram
        function sendThreeFormToTelegram(data) {
            const message = `
📋 Новая заявка с формы "Три шага":

👤 Имя: ${data.name}
👥 Фамилия: ${data.surname}
📱 Телефон: ${data.phone}
🏢 Тип организации: ${data.orgType}
📧 Email: ${data.email || "Не указан"}
        `;

            $.ajax({
                url: `https://api.telegram.org/bot${botToken}/sendMessage`,
                method: "POST",
                contentType: "application/json",
                data: JSON.stringify({
                    chat_id: chatId,
                    text: message,
                    parse_mode: "HTML",
                }),
                success: function () {
                    alert(
                        "✅ Заявка успешно отправлена! Мы свяжемся с вами в ближайшее время."
                    );

                    // Clear form after successful submission
                    $(".three__form input[type='text']").val("");
                    $(".three__form input[type='tel']").val("+998");
                    $(".three__form input[type='email']").val("");
                    $(".three__form .dropdown-simple span").text("ООО");
                    $(".dropdown-simple_list").hide();
                },
                error: function () {
                    alert(
                        "⚠️ Ошибка при отправке заявки. Пожалуйста, попробуйте позже."
                    );
                },
            });
        }

        // Handle three form submission
        $(".three__submit").on("click", function (e) {
            e.preventDefault();

            const $form = $(".three__form");
            const name = $form.find(".three__inputs input:first").val().trim();
            const surname = $form
                .find(".three__inputs input:last")
                .val()
                .trim();
            const phone = $form.find("input[type='tel']").val().trim();
            const orgType = $form.find(".dropdown-simple span").text().trim();
            const email = $form.find("input[type='email']").val().trim();

            // Validation
            if (!name) {
                return showThreeFormError(
                    $form.find(".three__inputs input:first"),
                    "Пожалуйста, введите имя"
                );
            }

            if (!surname) {
                return showThreeFormError(
                    $form.find(".three__inputs input:last"),
                    "Пожалуйста, введите фамилию"
                );
            }

            if (!phone || phone === "+998") {
                return showThreeFormError(
                    $form.find("input[type='tel']"),
                    "Пожалуйста, введите номер телефона"
                );
            }

            if (!isValidUzbekPhoneThree(phone)) {
                return showThreeFormError(
                    $form.find("input[type='tel']"),
                    "Неверный формат номера телефона. Используйте формат: +998 XX XXX XX XX"
                );
            }

            // Optional email validation
            if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                return showThreeFormError(
                    $form.find("input[type='email']"),
                    "Неверный формат email-адреса"
                );
            }

            // Send data to Telegram
            sendThreeFormToTelegram({
                name: name,
                surname: surname,
                phone: phone,
                orgType: orgType,
                email: email,
            });
        });

        // Initialize phone field with +998 prefix
        $(".three__form input[type='tel']").val("+998");
    });

    // Add this code to your existing JavaScript file

    $(document).ready(function () {
        // Phone formatting for form--form
        $(".form--form input[type='tel']").on("input", function () {
            let input = $(this).val().replace(/\D/g, "");
            if (input.startsWith("998")) input = input.slice(3);

            let formatted = "+998";
            if (input.length > 0) formatted += " " + input.substring(0, 2);
            if (input.length > 2) formatted += " " + input.substring(2, 5);
            if (input.length > 5) formatted += " " + input.substring(5, 7);
            if (input.length > 7) formatted += " " + input.substring(7, 9);

            $(this).val(formatted);
        });

        // Validation function for form--form
        function isValidUzbekPhoneForm(phone) {
            const cleaned = phone.replace(/\s/g, "");
            return /^\+998\d{9}$/.test(cleaned);
        }

        function showFormError(input, message) {
            alert(message);
            input.focus();
        }

        // Send form--form data to Telegram
        function sendFormToTelegram(data) {
            const message = `
❓ Новый вопрос с формы "Остались вопросы?":

👤 Имя: ${data.name}
👥 Фамилия: ${data.surname}
📧 Email: ${data.email || "Не указан"}
📱 Телефон: ${data.phone}

💬 Пользователь хочет задать вопрос и получить консультацию.
        `;

            $.ajax({
                url: `https://api.telegram.org/bot${botToken}/sendMessage`,
                method: "POST",
                contentType: "application/json",
                data: JSON.stringify({
                    chat_id: chatId,
                    text: message,
                    parse_mode: "HTML",
                }),
                success: function () {
                    alert(
                        "✅ Ваш вопрос успешно отправлен! Мы свяжемся с вами в ближайшее время для консультации."
                    );

                    // Clear form after successful submission
                    $(".form--form input[type='text']").val("");
                    $(".form--form input[type='email']").val("");
                    $(".form--form input[type='tel']").val("+998");
                },
                error: function () {
                    alert(
                        "⚠️ Ошибка при отправке вопроса. Пожалуйста, попробуйте позже."
                    );
                },
            });
        }

        // Handle form--form submission
        $(".form__form_submit").on("click", function (e) {
            e.preventDefault();

            const $form = $(".form--form");
            const name = $form.find(".form__form-box input:first").val().trim();
            const surname = $form
                .find(".form__form-box input:last")
                .val()
                .trim();
            const email = $form.find("input[type='email']").val().trim();
            const phone = $form.find("input[type='tel']").val().trim();

            // Validation - required fields marked with *
            if (!name) {
                return showFormError(
                    $form.find(".form__form-box input:first"),
                    "Пожалуйста, введите имя (обязательное поле)"
                );
            }

            if (!surname) {
                return showFormError(
                    $form.find(".form__form-box input:last"),
                    "Пожалуйста, введите фамилию (обязательное поле)"
                );
            }

            if (!phone || phone === "+998") {
                return showFormError(
                    $form.find("input[type='tel']"),
                    "Пожалуйста, введите номер телефона (обязательное поле)"
                );
            }

            if (!isValidUzbekPhoneForm(phone)) {
                return showFormError(
                    $form.find("input[type='tel']"),
                    "Неверный формат номера телефона. Используйте формат: +998 XX XXX XX XX"
                );
            }

            // Optional email validation (only if provided)
            if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                return showFormError(
                    $form.find("input[type='email']"),
                    "Неверный формат email-адреса"
                );
            }

            // Send data to Telegram
            sendFormToTelegram({
                name: name,
                surname: surname,
                email: email,
                phone: phone,
            });
        });

        // Initialize phone field with +998 prefix
        $(".form--form input[type='tel']").val("+998");
    });

    //CALCULATOR LOGIC
    let selectedMonths = 3; // по умолчанию 3 месяца

    function parseMonths(text) {
        if (text.includes("год")) return 12;
        let m = text.match(/\d+/);
        return m ? parseInt(m[0]) : 3;
    }

    function updatePrice() {
        let formaSobst = $(".calc__inputs_box-input")
            .eq(0)
            .find(".dropdown-simple > a > span")
            .text()
            .trim();
        let orgForma = $(".calc__inputs_box-input")
            .eq(1)
            .find(".dropdown-simple > a > span")
            .text()
            .trim();
        let vidDeyat = $(".calc__inputs_form .dropdown-simple > a > span")
            .text()
            .trim();

        let kolSotrudnikov =
            parseInt(
                $(".calc__inputs_box--2").find("input[type=number]").eq(0).val()
            ) || 0;
        let oborot =
            parseInt(
                $(".calc__inputs_box--2").find("input[type=number]").eq(1).val()
            ) || 0;

        let basePrice = 500000;

        let formaCoef = 1;
        switch (formaSobst) {
            case "ИП":
                formaCoef = 0.8;
                break;
            case "ООО":
                formaCoef = 1;
                break;
            case "АО":
                formaCoef = 1.2;
                break;
            case "НКО":
                formaCoef = 0.9;
                break;
        }

        let orgCoef = 1;
        switch (orgForma) {
            case "УСН":
                orgCoef = 0.85;
                break;
            case "ОСНО":
                orgCoef = 1;
                break;
            case "ПАТЕНТ":
                orgCoef = 0.7;
                break;
        }

        let vidCoef = 1;
        switch (vidDeyat) {
            case "Услуги и ИТ":
                vidCoef = 0.9;
                break;
            case "Торговля":
                vidCoef = 1;
                break;
            case "Производство":
                vidCoef = 1.3;
                break;
            case "Строительство":
                vidCoef = 1.2;
                break;
            case "Управляющие компании и ТСЖ":
                vidCoef = 1;
                break;
            case "Общепит":
                vidCoef = 1.1;
                break;
            case "Мини-кафе, пекарни, вендинг":
                vidCoef = 1.05;
                break;
        }

        let pricePerMonth = basePrice + kolSotrudnikov * 100000 + oborot * 0.05;
        pricePerMonth = pricePerMonth * formaCoef * orgCoef * vidCoef;

        let totalPrice = pricePerMonth * selectedMonths;

        let priceFormatted = pricePerMonth
            .toFixed(0)
            .replace(/\B(?=(\d{3})+(?!\d))/g, " ");
        let totalFormatted = totalPrice
            .toFixed(0)
            .replace(/\B(?=(\d{3})+(?!\d))/g, " ");

        $(".calc__content_content-price span").text(priceFormatted + " сум");
        $(".calc__content_content-price p").text("в месяц при оплате");
        $(".calc__content_content-price div").text(
            totalFormatted +
                " сум за " +
                (selectedMonths === 12 ? "год" : selectedMonths + " месяца")
        );
    }

    // Выбор месяца
    $(".calc__content_months span").on("click", function () {
        $(".calc__content_months span").removeClass("active");
        $(this).addClass("active");

        selectedMonths = parseMonths($(this).text());
        updatePrice();
    });

    // Ввод чисел
    $(".calc__inputs_box--2 input[type=number]").on("input", function () {
        updatePrice();
    });

    // Инициалный запуск
    updatePrice();
});
