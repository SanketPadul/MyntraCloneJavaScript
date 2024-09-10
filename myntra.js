let bagItems;
// creating array of object(containing info about product)
let items = [
  {
    id: "001",
    item_image: "./Images/1.jpg",
    rating: {
      stars: 4.5,
      noOfReviews: 1400,
    },
    company_name: "Carlton London",
    item_name: "Rhodium-Plated CZ Floral Studs",
    current_price: 606,
    original_price: 1045,
    discount: 42,
  },
  {
    id: "002",
    item_image: "./Images/2.jpg",
    rating: {
      stars: 4.3,
      noOfReviews: 2400,
    },
    company_name: "CUKOO",
    item_name: "Women Padded Halter Neck Swi",
    current_price: 1507,
    original_price: 2599,
    discount: 42,
  },
  {
    id: "003",
    item_image: "./Images/3.jpg",
    rating: {
      stars: 4.1,
      noOfReviews: 249,
    },
    company_name: "NUEVOSDAMAS",
    item_name: "Women Red & White Printed A-Li",
    current_price: 495,
    original_price: 1599,
    discount: 69,
  },
  {
    id: "004",
    item_image: "./Images/4.jpg",
    rating: {
      stars: 5,
      noOfReviews: 10,
    },
    company_name: "ADIDAS",
    item_name: "Indian Cricket ODI Jersey",
    current_price: 999,
    original_price: 999,
    discount: 0,
  },
  {
    id: "005",
    item_image: "./Images/5.jpg",
    rating: {
      stars: 4.2,
      noOfReviews: 3500,
    },
    company_name: "Roadster",
    item_name: "Pure Cotton T-shirt",
    current_price: 489,
    original_price: 1399,
    discount: 65,
  },
  {
    id: "006",
    item_image: "./Images/6.jpg",
    rating: {
      stars: 0.0,
      noOfReviews: 0,
    },
    company_name: "Nike",
    item_name: "Men ReactX Running Shoes",
    current_price: 14995,
    original_price: 14995,
    discount: 0,
  },
  {
    id: "007",
    item_image: "./Images/7.jpg",
    rating: {
      stars: 4.2,
      noOfReviews: 388,
    },
    company_name: "The Indian Garage Co",
    item_name: "Men Slim Fit Regular Shorts",
    current_price: 639,
    original_price: 1599,
    discount: 60,
  },
  {
    id: "008",
    item_image: "./Images/8.jpg",
    rating: {
      stars: 4.2,
      noOfReviews: 5200,
    },
    company_name: "Nivea",
    item_name: "Men Fresh Deodrant 150ml",
    current_price: 142,
    original_price: 285,
    discount: 14,
  },
];
onPageLoad();
// console.log(items);
function onPageLoad() {
  // fetching bag/caet icon
  let localString = localStorage.getItem("product");
  bagItems = localString ? JSON.parse(localString) : [];
  displayItemToContainer();
  bagElementCount();
}

// display product item to main container or webpage
function displayItemToContainer() {
  // Fetchinf items-contianer
  let itemsContainerElement = document.querySelector("#items-container");

  // console.log(itemsContainerElement);
  if (itemsContainerElement == null) return;
  let newHTML = "";
  items.forEach((item) => {
    newHTML += `
          <div class="flex flex-col gap-2">

            <!-- Image and rating -->
            <div>
              <img
                class="w-[100%] border rounded-xl"
                src="${item.item_image}"
                alt="Ear-Rings"
              />
                <div class="font-bold text-[12px] mt-1">
                        ${item.rating.stars}⭐|${item.rating.noOfReviews}
                </div>
            </div>

            <!-- Company or product name -->
            <div>
              <span class="font-semibold text-gray-700">${item.company_name}</span>
              <br />
              <span class="text-[14px] text-gray-600 line-clamp-1"
                >${item.item_name}</span
              >
            </div>

            <!-- Pricing -->
            <div>
              <span>Rs${item.current_price}</span>
              <span class="text-[13px] line-through">Rs${item.original_price}</span>
              <span class="text-[14px] text-orange-500">(${item.discount}% OFF)</span>
            </div>

            <!-- Button -->
            <div class="beforeAddedToBag">
              <button
                class="bg-green-600 border rounded-xl py-1 text-[18px] w-[100%] update-css-btn "
                onclick="addToBag(${item.id})"
              >
                Add to Bag
              </button>
              <!-- Button after item added to bad --> 
            
            </div>
          </div>
  `;
  });

  itemsContainerElement.innerHTML = newHTML;
}

// Function for Button Add to bag
function addToBag(itemId) {
  bagItems.push(itemId);
  localStorage.setItem("product", JSON.stringify(bagItems));
  bagElementCount();
  // alert("item added successfully");
}

function bagElementCount() {
  // fetching bag/cart count (sup)
  let bagCount = document.querySelector("#bag-count");
  console.log(bagItems);
  bagCount.innerHTML = bagItems.length;
}


