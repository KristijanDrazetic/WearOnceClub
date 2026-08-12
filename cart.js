let orderSum 
let productsHTML = ""
let cartQuantityDisplay = document.getElementById("cartQuantity")
import { addToCart } from './orders.js';
import { dressesDataBase } from './orders.js';
import { removeFromCart } from './orders.js';

if(JSON.parse(localStorage.getItem("itemsInCart")) !== null){
  
  function displayProductsInCart(){

  let productsHTML = ""

  const uniqueItemsInCart = [...new Map(JSON.parse(localStorage.getItem("itemsInCart")).map(item => [item.Name, item])).values()];

 
  
  
  uniqueItemsInCart.forEach((dress) => {

 
 let result = JSON.parse(localStorage.getItem("itemsInCart")).filter(cartItemsStorage => cartItemsStorage.Name === dress.Name);


let uniqueProductAmountInCart = localStorage.setItem("cartAmountProduct", result.length)


for(let i = 0; i < JSON.parse(localStorage.getItem("itemsInCart")).length; i++){


}

   document.querySelector(".order___sum").innerHTML = `Total: ${localStorage.getItem("cartSum")},00$ `

  productsHTML = productsHTML += `<div class="product__container2" >
         <div class="product__picture"><img  class="img__a2" src= "${dress.Img}"></div>
            <div class="product__name">Dress: ${dress.Name}</div>
          <div class="product__color">Color: ${dress.Color}</div>
          <div class="product__size">Size: ${dress.Size}</div>
           <div class="product__price">Renting Price: ${dress.Price},00$</div>
           <div class="product__amount" >Amount: <button class="removeItemInCartBtn" id="minusBtn" type="button">-</button> <span id = "productAmountInCartDisplay"> ${result.length}</span> <button class="addBtn" id= "plusBtn" type="button">+</button><span id = "available" class = "available" hidden>
No more product available in stock!</span></div>
           <div class="product__price" hidden> ${dress.value}</div>
           <div class="product__price"  hidden> In Stock: ${dress.Available}</div>
           
           `
          productsHTML = productsHTML +=`<div class ="add__product" id = "pp"><button class="removeBtn" type="button">Remove from Cart</button></div><br></div>
  `
  
    })

  document.querySelector(".hero2").innerHTML = productsHTML

  }

  displayProductsInCart()
}


if(JSON.parse(localStorage.getItem("itemsInCart")) === null || JSON.parse(localStorage.getItem("itemsInCart")).length === 0 ){
  
    document.querySelector(".order___sum").innerHTML = ""

    document.getElementById("hero2").innerHTML = `<p>It's pretty empty here.</p>
                                                    <a href="./reservation.html">
  Let yourself be inspired</a>`

  document.getElementById("checkoutBtn").style.display ="none"
}



addToCart()

removeFromCart()






