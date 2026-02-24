"use strict";

gsap.registerPlugin(ScrollTrigger);

gsap.set("#mapIcon", {
  opacity: 0,
  scale: 0.5,
});

gsap.to("#mapIcon", {
  opacity: 1,
  duration: 1.5,
  repeat: -1,
  yoyo: true,
  scale: 0.7,
});

// for gender dropdown
function createGenderDropdown() {
  var dropdown = document.getElementById("genderDropdown");
  var gender = {
    male: "Male",
    female: "Female",
    other: "Other",
  };
  for (var value in gender) {
    if (gender.hasOwnProperty(value)) {
      var option = document.createElement("option");
      option.value = value;
      option.text = gender[value];
      dropdown?.appendChild(option);
    }
  }
}
document.addEventListener("DOMContentLoaded", createGenderDropdown);

// form validation

async function validateForm() {
  // Get form inputs
  var movieTitle = document.getElementById("movieTitle").value;
  var movieDesc = document.getElementById("movieDesc").value;
  var fullName = document.getElementById("fullName").value;
  var userEmail = document.getElementById("userEmail").value;
  var userPhone = document.getElementById("userPhone").value;
  var userDOB = document.getElementById("userDOB").value;
  var genderDropdown = document.getElementById("genderDropdown").value;
  var checkBox = document.getElementById("checkBox").checked;
  var movieLink = document.getElementById("movieLink").value;
  var successMSG = document.getElementById("success-MSG");
  var errorMessage = document.querySelector(".error-submit");
  var errorUserEmail = document.querySelector("#errorUserEmail");
  var loading = document.querySelector(".loading");
  var submitButton = document.getElementById("submitForm");
  var subBtn = document.querySelector(".sub-btn");

  resetErrorMessages();

  if (movieTitle.trim() === "") {
    showError("errorMovieTitle", "Movie Title is required");
    return;
  }

  if (movieDesc.trim() === "") {
    showError("errorMovieDesc", "Movie Description is required");
    return;
  }

  if (fullName.trim() === "") {
    showError("errorFullName", "Full Name is required");
    return;
  }

  if (userEmail.trim() === "") {
    showError("errorUserEmail", "Email is required");
    return;
  } else if (!validateEmail(userEmail)) {
    showError("errorUserEmail", "Invalid Email format");
    return;
  }

  if (userPhone.trim() === "") {
    showError("errorUserPhone", "Phone Number is required");
    return;
  } else if (!validatePhoneNumber(userPhone)) {
    showError("errorUserPhone", "Invalid Phone Number format");
    return;
  }

  if (userDOB.trim() === "") {
    showError("errorUserDOB", "Date of Birth is required");
    return;
  }

  if (genderDropdown === "") {
    showError("errorGender", "Please select a gender");
    return;
  }

  if (movieLink === "") {
    showError("errorURL", "Please paste the URL");
    return;
  } else if (!isValidURL(movieLink)) {
    showError("errorURL", "Invalid Url");
  }

  if (!checkBox) {
    showError("errorCheckBox", "You must agree to the terms and conditions");
    return;
  } else {
    checkBox.checked = false;
    submitButton.disabled = true;
  }

  if (!hasErrors()) {
    loading.style.display = "block";
    submitButton.style.display = "none";

    console.log("Registration successful!");
    // API
    let baseURL = "https://talentflicks.com/api/web/movie-registration";

    var formData = {
      user_name: fullName,
      email: userEmail,
      phone_number: userPhone,
      date_of_birth: userDOB,
      gender: genderDropdown,
      movie_title: movieTitle,
      movie_description: movieDesc,
      movie_link_url: movieLink,
      is_paid: 0,
    };

    await fetch(baseURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        submitButton.style.display = "block";
        loading.style.display = "none";
        checkBox.checked = false;
        if (data.success == 1) {
          localStorage.setItem("user", JSON.stringify(formData));
          window.location.href = "Payment.html";
          document.getElementById("movieTitle").value = "";
          document.getElementById("movieDesc").value = "";
          document.getElementById("fullName").value = "";
          document.getElementById("userEmail").value = "";
          document.getElementById("userPhone").value = "";
          document.getElementById("userDOB").value = "";
          document.getElementById("genderDropdown").value = "";
          document.getElementById("movieLink").value = "";
          document.getElementById("checkBox").value = "";
          checkBox.checked = false;
        } else {
          successMSG.innerHTML = data.message;
          successMSG.style.color = "#ffd200";
          successMSG.style.textAlign = "center";
          successMSG.style.fontSize = "20px";
          setTimeout(() => {
            successMSG.innerHTML = " ";
          }, 4000);
          loading.style.display = "none";
          submitButton.style.display = "block";
        }
      })
      .catch((error) => {
        errorMessage.innerHTML = "Server busy ,pLease try again later";
        errorMessage.style.color = "#ffd200";
        errorMessage.style.textAlign = "center";
        errorMessage.style.fontSize = "20px";
        setTimeout(() => {
          errorMessage.innerHTML = " ";
        }, 4000);
        loading.style.display = "none";
        submitButton.style.display = "block";
        checkBox.checked = false;
      });
  } else {
    successMSG.innerHTML = "Registration Unsuccessfull";
    successMSG.style.color = "#ffd200";
    successMSG.style.textAlign = "center";
    successMSG.style.fontSize = "20px";
    setTimeout(() => {
      successMSG.innerHTML = " ";
    }, 4000);
    loading.style.display = "none";
    submitButton.style.display = "block";
  }
}
function showError(elementId, message) {
  var errorElement = document.getElementById(elementId);
  errorElement.textContent = message;
}

function resetErrorMessages() {
  var errorMessages = document.getElementsByClassName("error-message");
  for (var i = 0; i < errorMessages.length; i++) {
    errorMessages[i].textContent = "";
  }
}

function hasErrors() {
  return (
    document.getElementById("errorMovieTitle").innerHTML !== "" ||
    document.getElementById("errorMovieDesc").innerHTML !== "" ||
    document.getElementById("errorFullName").innerHTML !== "" ||
    document.getElementById("errorUserEmail").innerHTML !== "" ||
    document.getElementById("errorUserPhone").innerHTML !== "" ||
    document.getElementById("errorUserDOB").innerHTML !== "" ||
    document.getElementById("errorGender").innerHTML !== "" ||
    document.getElementById("errorURL").innerHTML !== "" ||
    document.getElementById("errorCheckBox").innerHTML !== ""
  );
}

function validateEmail(email) {
  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validatePhoneNumber(phoneNumber) {
  var phoneRegex = /^[7896]\d{9}$/;
  return phoneRegex.test(phoneNumber);
}

function isValidURL(movieLink) {
  // Regular expression for URL validation
  var pattern = new RegExp(
    "^(https?:\\/\\/)?" + // protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$",
    "i",
  ); // fragment locator

  return !!pattern.test(movieLink);
}

const checkbox = document.getElementById("checkBox");
const submitButton = document.getElementById("submitForm");
const formInputs = document.getElementById("formInputs");

checkbox?.addEventListener("change", function () {
  submitButton.disabled = !this.checked;
});

function movDescription() {
  var movieDesc = document.getElementById("movieDesc").value;
  var description = document.querySelector(".description");
  if (movieDesc.length > 400) {
    description.style.display = "block";
  } else {
    description.style.display = "none";
  }
}

// contact form validation

async function contactForm() {
  resetErrorMessages1();
  var contactName = document.getElementById("contactName").value;
  var contactEmail = document.getElementById("contactEmail").value;
  var feedbackInput = document.getElementById("feedback-input").value;
  var contactError = document.querySelector(".contactError");
  var contactSuccess = document.querySelector("#contactSuccess");
  var loading = document.querySelector(".loading");
  var submitForm = document.querySelector(".submitForm");

  if (contactName.trim() === "") {
    showError1("errorContactName", "Full Name is required");
    return;
  }

  if (contactEmail.trim() === "") {
    showError1("errorContactEmail", "Email is required");
    return;
  } else if (!validateEmail1(contactEmail)) {
    showError1("errorContactEmail", "Invalid Email format");
    return;
  }

  if (feedbackInput.trim() === "") {
    showError1("errorContactFeedback", "Please fill out the field");
    return;
  }

  if (contactName !== "" && contactEmail !== "" && feedbackInput !== "") {
    console.log("success");

    submitForm.style.display = "none";
    loading.style.display = "block";
    // API
    let baseURL = "https://talentflicks.com/api/web/contactus";

    var formData = {
      name: contactName,
      email: contactEmail,
      message: feedbackInput,
    };

    await fetch(baseURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        // contactSuccess.innerHTML = "We will reach you back shortly";
        contactSuccess.style.color = "#ffd200";
        contactSuccess.style.marginBottom = "10px";
        document.getElementById("contactName").value = "";
        document.getElementById("contactEmail").value = "";
        document.getElementById("feedback-input").value = "";
        setTimeout(function () {
          // Show the modal
          var myModal = new bootstrap.Modal(
            document.getElementById("exampleModal"),
          );
          myModal.show();
        }, 1000);
        setTimeout(() => {
          contactSuccess.innerHTML = "";
        }, 700);
        loading.style.display = "none";
        submitForm.style.display = "block";
        // You can add logic here to handle success or failure
      })
      .catch((error) => {
        contactError.innerHTML = "Server busy ,please contact us later";
        contactError.style.color = "red";
        loading.style.display = "none";
        submitForm.style.display = "block";
        document.getElementById("contactName").value = "";
        document.getElementById("contactEmail").value = "";
        document.getElementById("feedback-input").value = "";
        setTimeout(() => {
          contactError.innerHTML = "";
        }, 3000);
      });
  } else {
    contactError.innerHTML = "Please enter details";
    contactError.style.color = "red";
  }
}

function showError1(elementId1, message1) {
  var errorElement = document.getElementById(elementId1);
  errorElement.innerHTML = message1;
}

function resetErrorMessages1() {
  var errorMessages = document.getElementsByClassName("error-message1");
  for (var i = 0; i < errorMessages.length; i++) {
    errorMessages[i].textContent = "";
  }
}

function validateEmail1(email) {
  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function feedbackLength() {
  var feedbackInput = document.getElementById("feedback-input").value;
  var constrain = document.querySelector(".constrant");

  if (feedbackInput.length > 200) {
    constrain.style.display = "block";
  } else {
    constrain.style.display = "none";
  }
}

// Interest form

async function interestForm() {
  resetErrorMessages2();

  var interestName = document.getElementById("interestName").value;
  var interestEmail = document.getElementById("interestEmail").value;
  var interestPhone = document.getElementById("interestPhone").value;
  var interestError = document.querySelector(".interestError");
  var interestSuccess = document.querySelector("#interestSuccess");
  var interestBox = document.querySelector(".interest-box");
  var thanksReg = document.querySelector(".thanksReg");
  var intrtBtn = document.querySelector("#intrtBtn");
  var loading = document.querySelector(".loading");

  if (interestName.trim() === "") {
    showError2("errorInterestName", "Full Name is required");
    return;
  }

  if (interestEmail.trim() === "") {
    showError2("errorInterestEmail", "Email is required");
    return;
  } else if (!validateEmail1(interestEmail)) {
    showError2("errorInterestEmail", "Invalid Email format");
    return;
  }

  if (interestPhone.trim() === "") {
    showError2("errorInterestPhone", "Phone Number is required");
    return;
  } else if (!validatePhoneNumber2(interestPhone)) {
    showError2("errorInterestPhone", "Invalid Phone Number format");
    return;
  }

  if (interestName !== "" && interestEmail !== "" && interestPhone !== "") {
    console.log("success");

    intrtBtn.style.display = "none";
    loading.style.display = "block";

    // API
    let baseURL = "https://talentflicks.com/api/web/interested";

    var formData = {
      user_name: interestName,
      email: interestEmail,
      mobile_number: interestPhone,
    };

    await fetch(baseURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        interestSuccess.innerHTML = "Interest Noted";
        interestSuccess.style.color = "#ffd200";
        interestSuccess.style.marginBottom = "10px";
        document.getElementById("interestName").value = "";
        document.getElementById("interestEmail").value = "";
        document.getElementById("interestPhone").value = "";
        interestBox.style.display = "none";
        thanksReg.style.display = "block";
        loading.style.display = "none";
        intrtBtn.style.display = "block";
        setTimeout(() => {
          interestSuccess.innerHTML = "";
        }, 4000);
      })
      .catch((error) => {
        interestError.innerHTML = "Server busy ,please contact us later";
        interestError.style.color = "red";
        interestError.style.textAlign = "center";
        loading.style.display = "none";
        document.getElementById("interestName").value = "";
        document.getElementById("interestEmail").value = "";
        document.getElementById("interestPhone").value = "";
        intrtBtn.style.display = "block";
        setTimeout(() => {
          interestError.innerHTML = "";
        }, 4000);
      });
  } else {
    interestError.innerHTML = "Please enter details";
    interestError.style.color = "red";
  }
}

function showError2(elementId2, message2) {
  var errorElement = document.getElementById(elementId2);
  errorElement.innerHTML = message2;
}

function resetErrorMessages2() {
  var errorMessages = document.getElementsByClassName("error-message2");
  for (var i = 0; i < errorMessages.length; i++) {
    errorMessages[i].textContent = "";
  }
}

function validateEmail2(email) {
  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validatePhoneNumber2(phoneNumber) {
  var phoneRegex = /^[7896]\d{9}$/;
  return phoneRegex.test(phoneNumber);
}

// ////////////////////////////////////////

//Navigation to Interested  page

function submitPage2() {
  var newURL = "/Talentflicks-Main/Page/Interest.html";
  window.location.href = newURL;
}

// side bar navigation to Interested page

function submitPage3() {
  var newURL = "/Talentflicks-Main/Page/Interest.html";
  window.location.href = newURL;
}

function Quiz() {
  window.location.href = "https://talentflicks.com/api/auth/google";
}

// var countdown = document.getElementById("countdown");

// var interestFilm = document.getElementById("interestFilm");

// var quizBtn = document.querySelector(".quizBtn");

// var datas = new Date();

// var date = datas.getDate();

// var hour = datas.getHours();

// var min = datas.getMinutes();

// var sec = datas.getSeconds();

// var time = datas.toUTCString();

// let startTime;

// let endTime;

// let compDATE;

// let baseURL = "https://talentflicks.com/";

// async function fetchComp() {
//   const apiEndpoint = `${baseURL}api/comp-details`; // Replace with your API endpoint
//   try {
//     const tk = sessionStorage.getItem("tok");

//     // const header = {
//     //   apitoken: `${tk}`,
//     // };

//     const response = await fetch(apiEndpoint);
//     if (!response.ok) {
//       throw new Error("Network response was not ok");
//     }

//     const responseData = await response.json(); // Get the data from the response

//     if (responseData.success) {
//       // If the API call is successful, set the questions
//       // displayQuestionOrAd();
//       startTime = responseData.data.items[0].Comp_Start_Time;
//       endTime = responseData.data.items[0].Comp_End_Time;
//       compDATE = responseData.data.items[0].comp_START_DATE;
//       // Now that we have the data, we can display the first question
//     } else {
//       console.error("Failed to fetch quiz data:", responseData.message);
//     }
//   } catch (error) {
//     console.error("Error fetching quiz data:", error);
//   }
// }

// // Call the function to fetch data when the page loads
// document.addEventListener("DOMContentLoaded", () => {
//   fetchComp();
// });

// if (date === 13 && min > 30) {
//   interestFilm.style.display = "none";
//   countdown.style.display = "block";
//   countdown.style.fontSize = "24px";
//   countdown.style.color = "#fff";
//   startCountdown();
// } else {
//   interestFilm.style.display = "none";
//   countdown.style.display = "block";
//   quizBtn.style.display = "none";
// }

// if (date === 14 && hour < 12) {
//   interestFilm.style.display = "block";
// } else if (date === 14 && hour >= 12 && hour <= 13) {
//   interestFilm.style.display = "none";
//   countdown.style.display = "block";
//   countdown.style.fontSize = "24px";
//   countdown.style.color = "#fff";
//   startCountdown();
// } else if (date === 14 && hour > 13 && min >= 0 && min <= 3) {
//   countdown.style.display = "none";
//   quizBtn.style.display = "block";
// } else if (date === 14 && hour > 13 && min > 3) {
//   quizBtn.style.display = "none";
//   interestFilm.style.display = "block";
// }

// function startCountdown() {
//   var now = new Date(); // Get current date and time
//   var targetTime = new Date(now); // Create a new date object with the current date and time
//   targetTime.setHours(13, 40, 0, 0); // Set the target time to 7:00 PM

//   var timeDifference = targetTime - now; // Calculate the difference in milliseconds

//   var timer = setInterval(function () {
//     // Calculate remaining time
//     var hours = Math.floor((timeDifference / (1000 * 60 * 60)) % 24);
//     var minutes = Math.floor((timeDifference / 1000 / 60) % 60);
//     var seconds = Math.floor((timeDifference / 1000) % 60);

//     // Display remaining time in HH:MM:SS format
//     var displayTime =
//       ("0" + hours).slice(-2) +
//       ":" +
//       ("0" + minutes).slice(-2) +
//       ":" +
//       ("0" + seconds).slice(-2);
//     document.getElementById("countdown").innerText = displayTime;

//     // Decrease remaining time by 1 second
//     timeDifference -= 1000;

//     // If countdown reaches zero, stop the timer
//     // if (timeDifference < 0) {
//     //   clearInterval(timer);
//     //   countdown.style.display = "none";
//     //   // document.getElementById("countdown").innerText = "Time's up!";
//     //   // interestFilm.style.display = "block"
//     //   quizBtn.style.display = "block";
//     // }
//   }, 1000); // Update every second
// }
