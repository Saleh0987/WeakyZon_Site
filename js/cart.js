
// HEADER 
let menu = document.querySelector('#menu-bars');
let navbar = document.querySelector('.navbar');

menu.onclick = () =>{
  menu.classList.toggle('fa-times');
  navbar.classList.toggle('active');
}

let section = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header .navbar a');

window.onscroll = () =>{
  menu.classList.remove('fa-times');
  navbar.classList.remove('active');


  section.forEach(sec => {

    let top = window.scrollY;
    let height = sec.offsetHeight;
    let offset = sec.offsetTop -150;
    let id = sec.getAttribute("id");

    if (top >= offset && top < offset + height) {
      navLinks.forEach(links => {
        links.classList.remove('active');
        document.querySelector('header .navbar a[href*='+id+']').classList.add('active');
      });
    };

  });
};


let label = document.getElementById("label");
let shoppingCart = document.getElementById("item-cart");
let cart = document.getElementById("cart");

let basket = JSON.parse(localStorage.getItem("data")) || [];

let calculation = () => {
  let cartIcon = document.getElementById("cartAmount");
  cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
};
calculation();


let generateCartItems = () => {
  if (basket.length !== 0) {
    return (shoppingCart.innerHTML = basket
      .map((x) => {
        let { id, item } = x;
        let search = shopItemsData.find((y) => y.id === id) || [];
        let { img, name, price } = search;
        return `
      <div class="cart-item">
      <div class="details">

      <img class="image" src=${img} alt=${name} />

      <div class="title-price">
      <p class="title">${name}</p>
      <p class="cart-item-price">$ ${price}</p>
      
      <div class="buttons">
      <i onclick="decrement(${id})" class="fa-solid fa-minus"></i>
      <div id=${id} class="quantity">${item}</div>
    
      <i onclick="increment(${id})" class="fa-solid fa-plus"></i>
      </div>

      </div>
      
      <p class="total">Total: $${item * search.price}</p>
      <i onclick="removeItem(${id})" class="fa-solid fa-x"></i>

      </div>
      </div>
      </div>
      `;
      })
      .join(""));
  } else {
    cart.innerHTML = `
    <div class="noitem">
    <h2>Cart is Empty</h2>
    <a href="home.html">
    <button class="HomeBtn">Back to Home</button>
    </a>
    </div>
    `;
  }
};
generateCartItems();

let increment = (id) => {
  let selectedItem = id;
  let search = basket.find((x) => x.id === selectedItem.id);

  if (search === undefined) {
    basket.push({
      id: selectedItem.id,
      item: 1,
    });
  } else {
    search.item += 1;
  }

  generateCartItems();
  update(selectedItem.id);

  localStorage.setItem("data", JSON.stringify(basket));
};

let decrement = (id) => {
  let selectedItem = id;
  let search = basket.find((x) => x.id === selectedItem.id);

  if (search === undefined) return;

  if (search.item === 0) return;
  else {
    search.item -= 1;
  }

  update(selectedItem.id);

  basket = basket.filter((x) => x.item !== 0);
  generateCartItems();

  localStorage.setItem("data", JSON.stringify(basket));
};

let update = (id) => {
  let search = basket.find((x) => x.id === id);
  document.getElementById(id).innerHTML = search.item;

  calculation();
  TotalAmount();
};


let removeItem = (id) => {
  let selectedItem = id;
  Swal.fire({
    title: "Are you sure?",
    text: "You will not be able to recover this item!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, delete it!",
    cancelButtonText: "No, cancel it!",
  }).then((result) => {
    if (result.isConfirmed) {
      basket = basket.filter((x) => x.id !== selectedItem.id);
      generateCartItems();
      TotalAmount();
      calculation();
      localStorage.setItem("data", JSON.stringify(basket));
      Swal.fire({
      position: "center",
      icon: "success",
      title: "Your item has been deleted.",
      showConfirmButton: false,
      timer: 1000
    });
    }
  });
};


let clearCart = () => {
  Swal.fire({
    title: "Are you sure?",
    text: "You will not be able to recover your items!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, clear it!",
    cancelButtonText: "No, keep it!",
  }).then((result) => {
    if (result.isConfirmed) {
      basket = [];
      generateCartItems();
      calculation();
      localStorage.setItem("data", JSON.stringify(basket));
      Swal.fire({
      position: "center",
      icon: "success",
      title: "Your cart has been cleared.",
      showConfirmButton: false,
      timer: 1000
    });
    }
  });
};


let TotalAmount = () => {
  if (basket.length !== 0) {
    let amount = basket
      .map((x) => {
        let { item, id } = x;
        let search = shopItemsData.find((y) => y.id === id) || [];
        return item * search.price;
      })
      .reduce((x, y) => x + y, 0);
    label.innerHTML = `
    <!-- order section  -->
    <section class="order" id="order">
      <form id="form">
        <div class="inputBox">
          <div class="input">
            <span>your name</span>
            <input type="text" placeholder="enter your name" required/>
          </div>
          <div class="input">
            <span>your number</span>
            <input type="text" placeholder="enter your number" required/>
          </div>
        </div>

        <div class="inputBox">
          <div class="input">
            <span>your address</span>
            <textarea
              name=""
              placeholder="enter your address"
              id=""
              cols="30"
              rows="10"
              required
            ></textarea>
          </div>
          <div class="input">
            <span>your message</span>
            <textarea
              name=""
              placeholder="enter your message"
              id=""
              cols="30"
              rows="10"
              required
            ></textarea>
          </div>
        </div>
        <div class="amount">
        <h2 class="total-amount">Total Bill : $${amount}</h2>
        <button onclick="clearCart()" class="removeAll">Clear Cart</button>
        </div>
        <input type="submit" value="Checkout" class="btn" id="submit-btn">
      </form>
    </section>
    `;
  } else return;
};

TotalAmount();

  let submitBtn = document.getElementById("submit-btn");

  submitBtn.addEventListener("click", function (e) {
    e.preventDefault();
    let form = document.getElementById("form");
    if (form.checkValidity()) {
      Swal.fire({
        title: "Order confirmed!",
        text: "Your order has been activated.",
        icon: "success",
        confirmButtonText: "OK",
      }).then((result) => {
        if (result.isConfirmed) {
          basket = [];
          localStorage.setItem("data", JSON.stringify(basket));
          setTimeout(() => {
        window.location = "home.html";
      }, 500);
        }
      });
    } else {
      Swal.fire({
        title: "Order failed!",
        text: "Please fill in all the required data.",
        icon: "error",
        showConfirmButton: false,
        timer: 1000
      });
    }
  });
