// bagItems.forEach(itemId => {
//     displayBagItems(itemId);
// });
let deleteItemId;
let productDetail;
let convenienceFee = 99;
let totalMRP = 0;
let discountMRP = 0;
let totalAmountToPay = 0;
onBagLoad();

function onBagLoad() {
  returnItemsObject();
  displayBagItems();
  totalPriceAndDiscountPrice();
  generateBillOfItems();
}

function returnItemsObject() {
  productDetail = bagItems.map((itemId) => {
    for (let i = 0; i < items.length; i++) {
      if (itemId == items[i].id) {
        return items[i];
      }
    }
  });
  console.log(productDetail);
}

function displayBagItems() {
  let bagElementIs = document.querySelector("#bag-container");
  let newHTML = "";
  productDetail.forEach((item) => {
    newHTML += returningHttmlOfProduct(item);
  });
  bagElementIs.innerHTML = newHTML;
}

function returningHttmlOfProduct(item) {
  return `
    <div
            class="flex flex-row  justify-left gap-5 mx-2 my-2 px-10 py-3 h-[250px] col-span-2 border rounded-md relative max-[610px]:h-[420px] max-[610px]:flex-col max-[610px]:items-center"
          >
            <!-- delete symbol -->
            <i
            onclick="deleteItemFromCart(${item.id})"
              class="js-delete-Icon fa-solid fa-x absolute right-5 top-5 cursor-pointer text-[20px] transition-all delay-200 hover:scale-110"
            ></i>
            <!-- image of product -->
            <div>
              <img
                class="h-[100%] border rounded-2xl max-[610px]:h-[200px]"
                src="${item.item_image}"
                alt=""
              />
            </div>
            <!-- product info -->
            <div class=" h-[80%] px-2 py-4">
              <div class="mb-4 leading-5">
                <span class="font-semibold text-gray-700">${item.company_name}</span>
                <br />
                <span class="text-[14px] text-gray-600"
                  >${item.item_name}</span
                >
                <br />
                <span>${item.current_price}</span>
                <span class="text-[13px] line-through">${item.original_price}</span>
                <span class="text-[14px] text-orange-500">(${item.discount}% OFF)</span>
              </div>
              <!-- delivery date and return policy info -->
              <div>
                <b>14 days</b>
                <span class="text-[14px] text-gray-600">
                  returns avaliable</span
                >
                <br />
                <span class="text-[14px] text-gray-600">delivery by</span
                ><b> 6 set 2024</b>
              </div>
              <div class="mt-2">
                <span>Count = <span class="font-bold">0</span></span>
              </div>
            </div>
          </div>
`;
  return newHTML;
}

function deleteItemFromCart(item) {
  for (let i = 0; i < bagItems.length; i++) {
    if (item == bagItems[i]) {
      bagItems.splice(i, 1);
      priceAfterRemoveItem(productDetail[i]);
      productDetail.splice(i, 1);
      localStorage.setItem("product", JSON.stringify(bagItems));
      bagElementCount();
    }
  }
  displayBagItems();
}

function generateBillOfItems() {
  if (bagItems.length == 0) {
    totalAmountToPay = 0;
  } else {
  totalAmountToPay = convenienceFee + totalMRP - discountMRP;
  }
  let billContainer = document.querySelector("#bill-generator");
  billContainer.innerHTML = returnHtmlOfBill();
}

function returnHtmlOfBill() {
  return `
      <h5 class="text-[12px] text-gray-600 font-semibold">PRICE DETAILS(${productDetail.length} items)</h5>
      <!-- grid -->
      <div class="grid grid-cols-2 place-items-center text-gray-600">
        <span >Total MRP</span>
        <span">Rs ${totalMRP}</span>             
      </div>           
      <div class=" grid grid-cols-2 place-items-center text-gray-600">
        <span >Discount on MRP</span>
        <span class="text-orange-600">-Rs ${discountMRP}</span>             
      </div>
      <div class=" grid grid-cols-2 place-items-center text-gray-600">
        <span >Convenience Fee</span>
        <span">Rs ${convenienceFee}</span>             
      </div>
      <div class=" grid grid-cols-2 place-items-center text-gray-600">
        <span class="text-black font-semibold text-[15px]">Total</span>
        <span class="text-black font-semibold text-[15px]">Rs ${totalAmountToPay} </span>    
      </div>
      <button class="bg-pink-600 text-white font-semibold py-1 mx-12 border rounded-md text-[15px] mt-3">PLACE ORDER</button>
    </div>
`;
}

function totalPriceAndDiscountPrice() {
  for (let i = 0; i < productDetail.length; i++) {
    totalMRP += productDetail[i].original_price;
    discountMRP += productDetail[i].original_price-productDetail[i].current_price;

  }
  // console.log(totalMRP);
  // console.log(discountMRP);
}

function priceAfterRemoveItem(item) {
  totalMRP -= item.original_price;
  discountMRP -=  item.original_price-item.current_price;;
  generateBillOfItems();
}
