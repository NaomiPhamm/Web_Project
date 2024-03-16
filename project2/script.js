
 // show a message with a type of the input
 function showMessage(input, message, type) {
    // get the small element and set the message
    const msg = input.parentNode.querySelector("small");
    msg.innerText = message;
    // update the class for the input
    input.className = type ? "success" : "error";
    return type;
}

function showError(input, message) {
    return showMessage(input, message, false);
}

function showSuccess(input) {
    return showMessage(input, "", true);
}

function hasValue(input, message) {
    if (input.value.trim() === "") {
        return showError(input, message);
    }
    return showSuccess(input);
}

function validateEmail(input, requiredMsg, invalidMsg) {
    // check if the value is not empty
    if (!hasValue(input, requiredMsg)) {
        return false;
    }
    // validate email format
    const emailRegex =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
    const email = input.value.trim();
    if (!emailRegex.test(email)) {
        return showError(input, invalidMsg);
    }
    return true;
}

function validatePassword(input, requiredMsg, invalidMsg) {
    const errors = [];

    if (!hasValue(input, requiredMsg)) {
        return false;
    }
    // const passwordRegex = /^(?=.*\d)(?=.*[A-Z])(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{6,}$/;
    const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,}$/;
    const password = input.value.trim();
    if (!passwordRegex.test(password)) {
        return showError(input, invalidMsg);
    }
    return true;
}
// valiadte Password
function validateRetypePassword(input, originalPasswordInput, requiredMsg, invalidMsg) {
    if (!hasValue(input, requiredMsg)) {
        return false;
    }

    const retypePassword = input.value.trim();
    const originalPassword = originalPasswordInput.value.trim();

    if (retypePassword !== originalPassword) {
        return showError(input, invalidMsg);
    }

    return showSuccess(input);
}
function validatePostalCode(input, requiredMsg, invalidMsg) {
    if (!hasValue(input, requiredMsg)) {
        return false;
    }

    const postalCodeRegex = /^[A-Za-z]\d[A-Za-z] \d[A-Za-z]\d$/;
    const postalCode = input.value.trim();

    if (!postalCodeRegex.test(postalCode)) {
        return showError(input, invalidMsg);
    }
    return true;
} 
// password
const togglePassword = document.querySelector("#toggleVisibility");
const password = document.querySelector("#password");

togglePassword.addEventListener("click", function() {
    // Toggle the type attribute
    const type = password.getAttribute("type") === "password" ? "text" : "password";
    password.setAttribute("type", type);

    // Toggle the icon
    this.classList.toggle("bi-eye-slash");
    this.classList.toggle("bi-eye");
});
const togglePassword2 = document.querySelector("#toggleVisibility2");
//retypepassword
const retypePassword = document.querySelector("#retypePassword");

togglePassword2.addEventListener("click", function() {
    // Toggle the type attribute
    const type = retypePassword.getAttribute("type") === "retypePassword" ? "text" : "retypePassword";
    retypePassword.setAttribute("type", type);

    // Toggle the icon
    this.classList.toggle("bi-eye-slash");
    this.classList.toggle("bi-eye");
});

function exportFormDataToPDF(email, password, postalCode) {
    
    console.log("Email: " + email);
    console.log("Password: " + password);
    console.log("Postal Code: " + postalCode);
}

// remove button
const cityList = document.getElementById("city");
const removeCityButton = document.getElementById("removeCityButton");
function removeSelectedCity() {
    for (let i = 0; i < cityList.selectedOptions.length; i++) {
        cityList.removeChild(cityList.selectedOptions[i]);
    }

    removeCityButton.style.display = "none";
}


removeCityButton.addEventListener("click", removeSelectedCity);


cityList.addEventListener("change", function() {

    if (cityList.selectedOptions.length > 0) {
        removeCityButton.style.display = "block";
    } else {

        removeCityButton.style.display = "none";
    }
});


function downloadFormData() {

    const username = form.elements["username"].value;
    const email = form.elements["email"].value;
    const password = form.elements["password"].value;
    const postalCode = form.elements["postalCode"].value;
    const city = form.elements["city"].value; 
    
    const text = ` Name: ${username}\nEmail:${email}\nPassword:${password}\nCity:${city} \nPostal Code:${postalCode}`;
 
    var file = new Blob([text],{type:"text"});
    var link = document.createElement("a");
    link.href= window.URL.createObjectURL(file);
    link.download = "save.text";
    link.click();
    window.URL.revokeObjectURL(file);
}

const form = document.querySelector("#form");
const NAME_REQUIRED = "Please enter your name";
const EMAIL_REQUIRED = "Please enter your email";
const EMAIL_INVALID = "Please enter a correct email address format";
const PASSWORD_REQUIRED = "Please enter a Password";
const PASSWORD_INVALID = "Please enter a correct Password and format- The password must be AT LEAST 8 characters, at least one number, one capital and one special character";
const RETYPEPASSWORD_REQUIRED= "Please retype your password";
const RETYPEPASSWORD_INVALID= "Passwords do not match";
const POSTALCODE_REQUIRED = "Please enter a Postal Code";
const POSTALCODE_INVALID = "Please enter a correct Canadian Postal Code format (e.g., A1A 1A1)";

form.addEventListener("submit", function (event) {
    // stop form submission
    event.preventDefault();

    // validate the form
    let nameValid = hasValue(form.elements["username"], NAME_REQUIRED);
    let emailValid = validateEmail(form.elements["email"], EMAIL_REQUIRED, EMAIL_INVALID);
    let passwordValid = validatePassword(form.elements["password"], PASSWORD_REQUIRED, PASSWORD_INVALID);
    let retypePasswordValid = validateRetypePassword(form.elements["retypePassword"], form.elements["password"], RETYPEPASSWORD_REQUIRED, RETYPEPASSWORD_INVALID);
    let postalCodeValid = validatePostalCode(form.elements["postalCode"], POSTALCODE_REQUIRED, POSTALCODE_INVALID);
    // if valid, submit the form.
    if (nameValid && emailValid && passwordValid && retypePasswordValid && postalCodeValid) {
        const confirmation = confirm("Please confirm your information:\n\n" +
        "Username: " + form.elements["username"].value + "\n" +
        "Email: " + form.elements["email"].value + "\n" +
        "Password: " + form.elements["password"].value + "\n" +
        "Postal Code: " + form.elements["postalCode"].value + "\n\n" +
        "Do you want to save.text?");
     if (confirmation) {
       
             downloadFormData();
        alert("Form data exported successfully!");
    }else 
     {
            return;
        }
    }
    
});
