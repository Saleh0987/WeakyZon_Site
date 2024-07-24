let userDom = document.querySelector("#user");
let nameDom = document.querySelector("#name");
let logOutBtn = document.querySelector("#logout");


let username = localStorage.getItem("username");
if (username) {
  userDom.innerHTML = "Hello " + username;
}

logOutBtn.addEventListener("click", function () {
  
  Swal.fire({
    title: "Would you like to logout?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Logout"
  }).then((result) => {
    if (result.isConfirmed) {
      basket = [];
      localStorage.setItem("data", JSON.stringify(basket));
      Swal.fire({
      position: "center",
      icon: "success",
      title: "Logout Successfully",
      showConfirmButton: false,
      timer: 2000
      });

      setTimeout(() => {
        window.location = "index.html";
      }, 2000);
    }
  });

});