const register = e => {
  e.preventDefault();
  clearErrors();
  data = getData();
  validation_result = validateData(data);
  updateErrors(validation_result);
}

const originalBorderColor = "#558d3d";

function clearData() {
  for (const [field_id, _] of Object.entries(errorMessages)) {
    field = document.getElementById(field_id)
    field.value = "";
  }
}

function clearErrors() {
  succmsg = document.getElementById("success-message");
  if (succmsg != null) {
    succmsg.remove();
  }
  for (const [field_id, _] of Object.entries(errorMessages)) {
    field = document.getElementById(field_id)
    error_field = document.getElementById(field_id + "-error");
    if (error_field == null) {
      continue
    }
    error_field.remove();
    field.classList.remove("form-input-invalid");
    field.classList.add("form-input");
  }
}

const errorMessages = {
  "username-field": "Невалидно потребителско име",
  "password-field":  "Невалидна парола",
  "phone-field": "Невалиден телефонен номер",
  "email-field": "Невалиден имейл",
  "apartmentno-field": "Невалиден номер на апартамента",
}

function getData() {
  return {
    "username-field": document.getElementById("username-field").value.trim(),
    "password-field": document.getElementById("password-field").value.trim(),
    "phone-field": document.getElementById("phone-field").value.trim(),
    "email-field": document.getElementById("email-field").value.trim(),
    "apartmentno-field": document.getElementById("apartmentno-field").value.trim(),
    "role-field": document.getElementById("role-field").value.trim(),
  }
}

function validateData(data) {
  validation_results = {
    "username-field": validateUsername(data["username-field"]),
    "password-field": validatePassword(data["password-field"]),
    "phone-field": validatePhoneNumber(data["phone-field"]),
    "email-field": validateEmail(data["email-field"]),
    "apartmentno-field": validateApartmentNumber(data["apartmentno-field"]),
  }
  return validation_results
}

function validateUsername(username) {
  regex = RegExp("^\\S{3,10}$");
  return regex.test(username);
}

function validateEmail(email) {
 regex = RegExp(("^\\S+@\\S+\\.\\S+$"));

 return regex.test(email);
}

function validatePassword(password) {
  fullMatch = RegExp("^\\S{6,10}$");
  digit = RegExp("\\d")
  lowercase = RegExp("[a-z]")
  uppercase = RegExp("[A-Z]")

  return fullMatch.test(password) && lowercase.test(password) && uppercase.test(password) && digit.test(password);
}


function validatePhoneNumber(phone_number) {
  regex = RegExp("^\\d{10}$");
  return regex.test(phone_number);
}

function validateApartmentNumber(apartment_number) {
  regex = RegExp("^\\d+$");
  return regex.test(apartment_number);
}

function updateErrors(validation_data) {
  no_errors = true;
  for (const [field_id, is_valid] of Object.entries(validation_data)) {
    if (!is_valid) {
      no_errors = false;
      invalid_field = document.getElementById(field_id)
      invalid_field.classList.remove("form-input");
      invalid_field.classList.add("form-input-invalid");

      errorNode = document.createElement("div")
      errorNode.id = field_id + "-error";
      // errorNode.classList.add("form-input-invalid")
      errorNode.classList.add("error-message")
      errorNode.innerText = errorMessages[field_id]
      invalid_field.parentNode.insertBefore(errorNode, invalid_field.nextSibling)
    }
  }

  if (no_errors) {
    clearData();
    element = document.createElement("p");
    element.id = "success-message";
    element.classList.add("success-message-class");
    element.innerText = "Успешно се регистрирахте!"
    document.getElementById("registration-form").appendChild(element);
  }

}


function isEmpty(obj) {
  for(var key in obj) {
      if(obj.hasOwnProperty(key))
          return false;
  }
  return true;
}

function removeElement(elementId) {
  var element = document.getElementById(elementId);
  element.parentNode.removeChild(element);
}

(function () {
  document.getElementById("submit-btn").addEventListener("click", register);
})();

(function() {
  document.getElementById("username-field").value = "";
  document.getElementById("password-field").value = "randoM96";
  document.getElementById("phone-field").value = "0888128109";
  document.getElementById("email-field").value = "geosteffanov@gmail.com";
  document.getElementById("apartmentno-field").value = "159";
  document.getElementById("role-field").value = "renter";
}) ();