/*
=========================================================
* MeMenu - Mega Menu in Bootstrap v5
=========================================================
* Product Page: https://candrawaskito.com/
* Copyright 2024 NEXT UI DESIGN (https://candrawaskito.com/)
* Designed and coded by https://candrawaskito.com/
========================================================= */

// (c) 2020-2023 Written by Simon Köhler in Panama
// simonkoehler.com

// Wait for the DOM (Document Object Model) to be fully loaded
// document.addEventListener('DOMContentLoaded', function(event) {
//
//     // Hamburger menu
//     var navbarToggler = document.querySelectorAll('.navbar-toggler')[0];
//     navbarToggler.addEventListener('click', function(e) {
//         e.target.children[0].classList.toggle('active');
//     });
//
//     // Select the <html> element
//     var html = document.querySelectorAll('html')[0];
//
//     // Select the first element with the attribute 'data-bs-toggle-theme'
//     var themeToggle = document.querySelectorAll('*[data-bs-toggle-theme]')[0];
//
//     // Set the default theme to 'dark' for the <html> element
//     html.setAttribute('data-bs-theme', 'dark');
//
//     // Check if a themeToggle element is found
//     if (themeToggle) {
//         // Add a click event listener to the themeToggle element
//         themeToggle.addEventListener('click', function(event) {
//             // Prevent the default behavior of the click event
//             event.preventDefault();
//
//             // Check the current theme attribute value of the <html> element
//             if (html.getAttribute('data-bs-theme') === 'dark') {
//                 // If the current theme is 'dark', change it to 'light'
//                 html.setAttribute('data-bs-theme', 'light');
//             } else {
//                 // If the current theme is not 'dark', change it back to 'dark'
//                 html.setAttribute('data-bs-theme', 'dark');
//             }
//         });
//     }
// });

const menu = document.querySelector(".menu");
const menuInner = menu.querySelector(".menu__inner");
const menuArrow = menu.querySelector(".menu__arrow");
const menuTitle = menu.querySelector(".menu__title");
const burger = document.querySelector(".navbar-toggler");
const overlay = document.querySelector(".overlay");

// Navbar Menu Toggle Function
function toggleMenu() {
    menu.classList.toggle("is-active");
    overlay.classList.toggle("is-active");
}

// Show Mobile Submenu Function
function showSubMenu(children) {
    subMenu = children.querySelector(".submenu");
    subMenu.classList.add("is-active");
    subMenu.style.animation = "slideLeft 0.35s ease forwards";
    const menuTitle = children.querySelector("i").parentNode.childNodes[0]
        .textContent;
    menu.querySelector(".menu__title").textContent = menuTitle;
    menu.querySelector(".menu__header").classList.add("is-active");
}

// Hide Mobile Submenu Function
function hideSubMenu() {
    subMenu.style.animation = "slideRight 0.35s ease forwards";
    setTimeout(() => {
        subMenu.classList.remove("is-active");
    }, 300);

    menu.querySelector(".menu__title").textContent = "";
    menu.querySelector(".menu__header").classList.remove("is-active");
}

// Toggle Mobile Submenu Function
function toggleSubMenu(e) {
    if (!menu.classList.contains("is-active")) {
        return;
    }
    if (e.target.closest(".menu__dropdown")) {
        const children = e.target.closest(".menu__dropdown");
        showSubMenu(children);
    }
}

// Fixed Navbar Menu on Window Resize
window.addEventListener("resize", () => {
    if (window.innerWidth >= 768) {
        if (menu.classList.contains("is-active")) {
            toggleMenu();
        }
    }
});

// Dark and Light Mode with localStorage
(function () {
    let darkMode = localStorage.getItem("darkMode");
    const darkSwitch = document.getElementById("switch");

    // Enable and Disable Darkmode
    const enableDarkMode = () => {
        document.body.classList.add("darkmode");
        localStorage.setItem("darkMode", "enabled");
    };

    const disableDarkMode = () => {
        document.body.classList.remove("darkmode");
        localStorage.setItem("darkMode", null);
    };

    // User Already Enable Darkmode
    if (darkMode === "enabled") {
        enableDarkMode();
    }

    // User Clicks the Darkmode Toggle
    darkSwitch.addEventListener("click", () => {
        darkMode = localStorage.getItem("darkMode");
        if (darkMode !== "enabled") {
            enableDarkMode();
        } else {
            disableDarkMode();
        }
    });
})();

// Initialize All Event Listeners
burger.addEventListener("click", toggleMenu);
overlay.addEventListener("click", toggleMenu);
menuArrow.addEventListener("click", hideSubMenu);
menuTitle.addEventListener("click", hideSubMenu);
menuInner.addEventListener("click", toggleSubMenu);
