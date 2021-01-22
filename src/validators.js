export function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

export function validatePassword(email) {
  //Minimum eight characters, at least one letter and one number
  const re = /^(?=.*[A-Za-z])(?=.*d)[A-Za-zd]{8,}$/;
  return re.test(String(email).toLowerCase());
}

export function validateSignUpForm(payload) {
  const errors = {};
  let message = "";
  let isFormValid = true;

  if (
    !payload ||
    typeof payload.username !== "string" ||
    payload.username.trim().length === 0
  ) {
    isFormValid = false;
    errors.username = "Please provide a user name.";
  }
  if (
    !payload ||
    typeof payload.firstName !== "string" ||
    payload.firstName.trim().length === 0
  ) {
    isFormValid = false;
    errors.firstName = "Please provide a First name.";
  }

  if (
    !payload ||
    typeof payload.lastName !== "string" ||
    payload.lastName.trim().length === 0
  ) {
    isFormValid = false;
    errors.lastName = "Please provide a last name.";
  }

  if (
    !payload ||
    typeof payload.email !== "string" ||
    !validateEmail(payload.email.trim())
  ) {
    isFormValid = false;
    errors.email = "Please provide a correct email address.";
  }

  if (
    !payload ||
    typeof payload.password !== "string" ||
    validatePassword(payload.password.trim())
  ) {
    isFormValid = false;
    errors.password = "Password must have at least 8 characters.";
  }

  if (!isFormValid) {
    message = "Check the form for errors.";
  }

  return {
    isFormValid,
    message,
    errors,
  };
}
