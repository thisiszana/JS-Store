const validateUsername = (username) => {
  const regex = /^[a-zA-Z\d_]{4,16}$/;
  const result = regex.test(username);

  return result;
};

const validatePassword = (password) => {
  const regex = /^.{4,20}$/;
  const result = regex.test(password);

  return result;
};

const validateForm = (username, password) => {
  const usernameResult = validatePassword(username);
  const passwordResult = validateUsername(password);

  if (usernameResult && passwordResult) {
    return true;
  } else if (!passwordResult) {
    alert("Pasword must be between 4 and 20 characters");
  } else if (!usernameResult) {
    alert("Please enter valid username");
  }
};

export default validateForm;
