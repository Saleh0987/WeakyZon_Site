let email = document.querySelector("#email");
let password = document.querySelector("#password");
let loginBtn = document.querySelector("#sign_in");

let geteEmail = localStorage.getItem("email");
let getPassword = localStorage.getItem("password");

loginBtn.addEventListener("click", login);

function login(e) {
  e.preventDefault();

  if (email.value === "" || password.value === ""){
        
    Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
        })
    
  } else { if (
      geteEmail &&
      geteEmail.trim() === email.value.trim() &&
      getPassword &&
      getPassword === password.value)
  {
   Swal.fire({
      position: "center",
      icon: "success",
      title: "Login Successfully",
      showConfirmButton: false,
      timer: 2000
    }); 
    setTimeout(() => {
      window.location = "home.html";
    }, 2000);
    
  } else {

  Swal.fire({
  icon: 'error',
  title: 'Oops...',
  text: 'Something went wrong!',
  footer: '<a href="">Why do I have this issue?</a>'
})
    }
  }
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