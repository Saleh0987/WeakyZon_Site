window.onpageshow = function () {
  Swal.fire({
      position: "center",
      icon: "success",
      title: "Welcome to Weakyzon Store! <br> Enjoy your shopping!",
      showConfirmButton: false,
      timer: 1000
    });
};

let username = document.querySelector("#username");
let email = document.querySelector("#email");
let password = document.querySelector("#password");

let registerBtn = document.querySelector("#sign_up");

registerBtn.addEventListener("click", register);

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPassword(password) {
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);
}

function isValidUsername(username) {
  return /^[a-zA-Z0-9_-]{4,}$/.test(username);
}


let togglePassword = document.getElementById("toggle-password");
let passwordInput = document.getElementById("password");
togglePassword.addEventListener("click", function () {
  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    togglePassword.style.background = 'hsl(0, 100%, 70%)';
  } else {
    passwordInput.type = "password";
    togglePassword.style.background = ' hsl(152, 51%, 52%)';
  }
});

function register(e) {
  e.preventDefault();

  if (username.value === "" || email.value === "" || password.value === "") {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: "Please Fill All Fields!"
    });
  } else if (!isValidEmail(email.value)) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: "Please Enter a Valid Email Address!"
    });
  } else if (!isValidPassword(password.value)) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character!"
    });
  } else {
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Successfully registered",
      showConfirmButton: false,
      timer: 2000
    });

    localStorage.setItem('username', username.value);
    localStorage.setItem('email', email.value);
    localStorage.setItem('password', password.value);

    setTimeout(() => {
      window.location = "login.html";
    }, 2000);
  }
}




