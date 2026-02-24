"use strict";
// NavBar active

// document.addEventListener("DOMContentLoaded", () => {
//   const menuItems = document.querySelectorAll(".nav-list li");
//   function setActiveMenuItem() {
//     const currentURL = window.location.href;

//     menuItems.forEach((item) => {
//       const menuItemLink = item.querySelector("a");
//       if (currentURL === menuItemLink.href ) {
//         item.classList.add("active");
//       } else {
//         item.classList.remove("active");
//       }
//     });
//   }
//   // Initially set the active menu item
//   setActiveMenuItem();
// });

// document.addEventListener("DOMContentLoaded", () => {
//   const menuItems = document.querySelectorAll(".nav-list li");
//   function setActiveMenuItem() {
//     const currentURL = window.location.href;
//     const baseURL = window.location.origin + "/"; // Get the base URL including the protocol and hostname

//     menuItems.forEach((item) => {
//       const menuItemLink = item.querySelector("a");
//       const menuItemURL = menuItemLink.href;
//       const menuItemPath = new URL(menuItemURL).pathname;

//       // Check if the current URL is the base URL and the menu item URL corresponds to the homepage
//       if (currentURL === baseURL && menuItemPath === "/Homepage.html") {
//         item.classList.add("active");
//       }
//       // Otherwise, check if the current URL matches the menu item URL
//       else if (currentURL === menuItemURL) {
//         item.classList.add("active");
//       } else {
//         item.classList.remove("active");
//       }
//     });
//   }
//   // Initially set the active menu item
//   setActiveMenuItem();
// });

document.addEventListener("DOMContentLoaded", () => {
  const menuItems = document.querySelectorAll(".nav-list li > a"); // Select only <li> elements with direct child <a> tags

  function setActiveMenuItem() {
    const currentURL = window.location.href;
    const baseURL = window.location.origin + "/"; // Get the base URL including the protocol and hostname

    menuItems.forEach((menuItemLink) => {
      const menuItemURL = menuItemLink.href;
      const menuItemPath = new URL(menuItemURL).pathname;

      // Check if the current URL is the base URL and the menu item URL corresponds to the homepage
      if (currentURL === baseURL && menuItemPath === "index.html") {
        menuItemLink.parentElement.classList.add("active");
      }
      // Otherwise, check if the current URL matches the menu item URL
      else if (currentURL === menuItemURL) {
        menuItemLink.parentElement.classList.add("active");
      } else {
        menuItemLink.parentElement.classList.remove("active");
      }
    });
  }
  // Initially set the active menu item
  setActiveMenuItem();
});

// burger menu
let showSidebar = () => {
  const sidebar = document.querySelector(".side-bar");
  sidebar.style.display = "flex";
  sidebar.style.opacity = "1";
  document.addEventListener("click", closeSidebarOutside);
};

let hideSidebar = () => {
  const sidebar = document.querySelector(".side-bar");
  sidebar.style.opacity = "0";
  setTimeout(() => {
    sidebar.style.display = "none";
  }, 500);
};

let closeSidebarOutside = (e) => {
  const sidebar = document.querySelector(".side-bar");
  const burgerIcon = document.getElementById("burgerIcon");

  if (
    !sidebar.contains(e.target) &&
    e.target !== burgerIcon &&
    e.target !== sidebar
  ) {
    sidebar.style.opacity = "0";
    setTimeout(() => {
      sidebar.style.display = "none";
    }, 500);

    document.removeEventListener("click", closeSidebarOutside);
  }
};

// submission guideline

document.addEventListener("DOMContentLoaded", function () {
  var myGuides = document.querySelectorAll(".guide");
  myGuides.forEach(function (myGuide) {
    myGuide.addEventListener("click", function () {
      var num = myGuide.querySelector("button").className.substring(3);
      var ruleElements = document.querySelectorAll(".submission-rules > div");
      ruleElements.forEach(function (element) {
        element.classList.remove("active");
      });
      var imageElements = document.querySelectorAll(".protoype-images > div");
      imageElements.forEach(function (element) {
        element.classList.remove("active1");
        element.style.display = "none";
      });
      var ruleElement = document.querySelector(".rule" + num);
      if (ruleElement) {
        ruleElement.classList.add("active");
      }
      var imageElement = document.querySelector(".protoype" + num);
      if (imageElement) {
        imageElement.style.display = "block";
      }
    });
  });
});

//Navigation to competion page

var button = document.getElementById("submitFilm");
button?.addEventListener("click", submitPage);

function submitPage() {
  var newURL = "Competition.html";
  window.location.href = newURL;
}

// side bar navigation to competion page
var button1 = document.querySelector(".submit-film");
button1?.addEventListener("click", submitPage1);

function submitPage1() {
  var newURL = "Competition.html";
  window.location.href = newURL;
}

var button2 = document.querySelector(".submit-Film");
button2?.addEventListener("click", submitPage5);

function submitPage5() {
  var newURL = "Competition.html";
  window.location.href = newURL;
}

// competiton

// const slider = document.querySelector(".rules");
// const slides = document.querySelectorAll(".prnt-1");
// const prevButton = document.getElementById("prevBtn");
// const nextButton = document.getElementById("nextBtn");
// const arrowIcon = document.querySelector(".arrow-icon");
// let currentIndex = 0;

// nextButton.addEventListener("click", (e) => {
//   e.preventDefault();
//   currentIndex = (currentIndex + 1) % slides.length;
//   updateSlider();
//   console.log("1");
// });

// prevButton.addEventListener("click", (e) => {
//   e.preventDefault();
//   currentIndex = (currentIndex - 1 + slides.length) % slides.length;
//   updateSlider();
// });

// arrowIcon.addEventListener("click", (e) => {
//   e.preventDefault();
//   currentIndex = (currentIndex - 1 + slides.length) % slides.length;
//   updateSlider();
// });

// function updateSlider() {
//   slides.forEach((slide, index) => {
//     if (index === currentIndex) {
//       slide.style.display = "block";
//     } else {
//       slide.style.display = "none";
//     }
//   });
//   if (currentIndex === 0) {
//     prevButton.style.display = "none";
//   } else {
//     prevButton.style.display = "block";
//   }

// Check if we are on the last slide and hide the Next button
//   if (currentIndex === slides.length - 1) {
//     nextButton.style.display = "none";
//     prevButton.style.display = "none";
//     arrowIcon.style.display = "block";
//   } else {
//     nextButton.style.display = "block";
//   }
// }

// Initially, display the first slide
// updateSlider();

// dropdown for state

// const countryDropdown = document.getElementById("countryDropdown");

// function populateCountryDropdown() {
//   fetch("https://restcountries.com/v3.1/all")
//     .then((response) => response.json())
//     .then((data) => {
//       data.forEach((country) => {
//         const option = document.createElement("option");
//         option.value = country.name.common; // Set the value of the option
//         option.textContent = country.name.common; // Set the text displayed for the option
//         countryDropdown.appendChild(option);
//         option.style.backgroundColor = "#2b2b226e";
//       });
//     })
//     .catch((error) => {
//       console.error("Error fetching data:", error);
//     });
// }

// populateCountryDropdown();

// progress step content:

// const stepContent = [
//   `Step 1 :
//    Project Information`,
//   `Step 2 :
//    Subject Information`,
//   `Step 3 :
//    Credits`,
//   `Step 4 :
//    Specifications`,
//   `Step 5 :
//    Payments`,
// ];

// submission

// document.getElementById("agreeBtn").addEventListener("click", () => {
//   document.getElementById("comp-rules").style.display = "none";
//   document.querySelector(".form-outer").style.display = "block";
//   document.querySelector(".progress-bar").style.display = "block";
//   // document.querySelector(".process-heading").style.display = "none";
//   document.querySelector(".competition-rules").style.height = "auto";
//   updateSubmission();
// });

// function updateProgressBar() {
//   const progressContainer = document.querySelector(".progress-container");
//   const progress = document.querySelector(".progress");
//   const icon = document.querySelector("#movie-clap");
//   const totalSteps = pages.length;
//   const currentStep = currentPage + 1; // Adding 1 because currentPage is zero-based

//   const percentComplete = (currentStep / totalSteps) * 100;
//   progress.style.width = percentComplete + "%";
// }

// const fromouter = document.querySelector(".form-outer");
// const pages = document.querySelectorAll(".page");
// const prevBtn = document.querySelector(".prev-1");
// const nextBtn = document.querySelector(".next-1");
// const arrow = document.querySelector(".arrow");
// let currentPage = 0;

// nextBtn.addEventListener("click", (e) => {
//   e.preventDefault();
//   currentPage = (currentPage + 1) % pages.length;
//   updateSubmission();
// });

// prevBtn.addEventListener("click", (e) => {
//   e.preventDefault();
//   currentPage = (currentPage - 1 + pages.length) % pages.length;
//   updateSubmission();
// });

// arrow.addEventListener("click", (e) => {
//   e.preventDefault();
//   currentPage = (currentPage - 1 + pages.length) % pages.length;
//   updateSubmission();
// });

// function updateSubmission() {
//   pages.forEach((page, index) => {
//     if (index === currentPage) {
//       page.style.display = "block";
//     } else {
//       page.style.display = "none";
//     }
//   });

//   updateProgressBar();

//   if (currentPage === 0) {
//     prevBtn.style.display = "none";
//   } else {
//     prevBtn.style.display = "block";
//   }
//   if (currentPage === pages.length - 1) {
//     nextBtn.style.display = "none";
//     prevBtn.style.display = "none";
//     arrow.style.display = "block";
//   } else {
//     nextBtn.style.display = "block";
//   }
//   const stepContentElement = document.querySelector(".step-content");
//   stepContentElement.textContent = stepContent[currentPage];
// }

/////////////////////////////////////////////////////////////////////////////////////////////
