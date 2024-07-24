
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

// shop

let shop = document.getElementById("shop");
let basket = JSON.parse(localStorage.getItem("data")) || [];

let generateShop = (filteredItems = shopItemsData) => {
  return (shop.innerHTML = filteredItems
    .map((x) => {
      let { id, name, price, img } = x;
      let search = basket.find((x) => x.id === id) || [];
      return `
        <div class="box" id="product-id-${id}">
          <div class="image">
            <img src="${img}" alt=${name} />
            <a class="fas fa-heart"></a>
          </div>

          <div class="content">
            <div class="stars">
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star-half-alt"></i>
            </div>

            <div class="detail">
              <a class="title">${name}</a>
              <p class="price">$${price}</p>
            </div>

            <div class="buttons">
              <i onclick="decrement(${id})" class="fa-solid fa-minus"></i>
              <div class="quantity" id="${id}">
                ${search.item === undefined ? 0 : search.item}
              </div>
              <i onclick="increment(${id})" class="fa-solid fa-plus"></i>
            </div>
          </div>
        </div>
      `;
    })
    .join(""));
};

generateShop();


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

  localStorage.setItem("data", JSON.stringify(basket));
};

let update = (id) => {
  let search = basket.find((x) => x.id === id);
  document.getElementById(id).innerHTML = search.item;

  calculation();
};

let calculation = () => {
  let cartIcon = document.getElementById("cartAmount");
  cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
};

calculation();


// Search
let input = document.getElementById("item-search");
input.addEventListener("input", function () {
  let searchTerm = input.value.toLowerCase(); 

  let filteredItems = shopItemsData.filter((item) =>
    item.name.toLowerCase().includes(searchTerm)
  );

  let shopContainer = document.getElementById("shop");

  if (filteredItems.length === 0) {
    shopContainer.innerHTML = "<h1 style='text-align: center;'>No items available</h1>";
  } else {
    generateShop(filteredItems);
  }
});


// fillter
let categoryFilter = document.getElementById("category-filter");
categoryFilter.addEventListener("change", function () {
  let selectedCategory = categoryFilter.value;

  if (selectedCategory === "all") {
    generateShop(shopItemsData);
  } else {
    let filteredItems = shopItemsData.filter((item) =>
      item.category === selectedCategory
    );

    generateShop(filteredItems);
  }
});