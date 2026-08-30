import { getDataFromDatabase } from './main.js';
import { reduceQuantityDirectly } from './main.js';
import {addQuantityDirectly} from './main.js'
import {addQuantityDirectlyMultipleItems} from './main.js'
import {getitemAvailable} from './main.js'
import { getitemPrice } from './main.js';
export let dressesDataBase = []
/* let dresses = dressesDataBase.sort((a, b) => a.Name.localeCompare(b.Name)) */
let productsHTML = ""
let orderSum = localStorage.getItem("cartSum")
let cartQuantityDisplay = document.getElementById("cartQuantity")
let sortDresses = document.getElementById("mySelect");
let lastClick = 0;


function displayProducts(){

  let productsHTML = ""

  dressesDataBase.forEach((dress) => {

  productsHTML = productsHTML += `<div class="product__container">
         <div class="product__picture"><img  class="img__a" src= "${dress.Img}" referrerpolicy="no-referrer"></div>
            <div class="product__name">Dress: ${dress.Name}</div>
          <div class="product__color">Color: ${dress.Color}</div>
          <div class="product__size">Size: ${dress.Size}</div>
           <div class="product__price">Renting Price: ${dress.Price},00$</div>
           <div class="product__price" hidden> ${dress.value}</div>
           <div class="product__price" id ="stock__display"  > In Stock: ${dress.Available}<span id= " available" visibility: hidden> Out of Stock</span></div>
           `
         
      if(dress.Available !== 0){
        
  productsHTML = productsHTML +=`<div class ="add__product" id = "pp"><button class="addBtn" id = "addBtnReservation" title = "${dress.Name}" type="button">Add to Cart</button></div></div>`

      }else if(dress.Available === 0){
  productsHTML = productsHTML +=`<div class ="add__product" ><p>Out of Stock</p></div></div>`
   
}
  
  })


  let heroElement = document.querySelector(".hero");

  if(heroElement){
  document.querySelector(".hero").innerHTML = productsHTML

    let loadingBox = document.getElementById('render-loading-status');
    if (loadingBox) {
        loadingBox.style.display = 'none';
    } 
  }
}





/* function sortFunction() {
  
  let x = sortDresses.value;

  if (x === "price__ascending") {
    dresses.sort((a, b) => parseFloat(a.Price) - parseFloat(b.Price));
  } 
  else if (x === "price__descending") {
    dresses.sort((a, b) => parseFloat(b.Price) - parseFloat(a.Price));
  } 
  else if (x === "size") {
    dresses.sort((a, b) => parseFloat(a.Size_index) - parseFloat(b.Size_index));
  } 
  else if (x === "color") {
    dresses.sort((a, b) => a.Color.localeCompare(b.Color));
  } 
  else if (x === "occasion") {
    dresses.sort((a, b) => a.Occasion.localeCompare(b.Occasion));
  } 
  else if (x === "standard") {
    dresses.sort((a, b) => a.Name.localeCompare(b.Name));
  }

  
  displayProducts();
  addToCart();
}

if (sortDresses) {
   sortDresses.addEventListener("change", sortFunction);
} */

function preventDoubleClicks(){

  const now = Date.now();
      if (now - lastClick < 500) return true; 
      lastClick = now;

}


function dressAvailabilityDisplay(dressAvailable, btn){

  let productContainer = btn.closest(".product__container")
  if(!productContainer) return
  let stockDisplayContainer = productContainer.querySelector("#stock__display")
  stockDisplayContainer.innerHTML =   ` In Stock: ${dressAvailable - 1}`
    
}


function numberDisplayItemsInCart(btn){
 
  let productContainerCart = btn.closest(".product__container2")
  if(!productContainerCart) return
  let itemsFromCart = JSON.parse(localStorage.getItem("itemsInCart"))
  let numberOfUniqueItemsInCart = itemsFromCart.filter(element => element.Name === btn.title).length;
  let uniqueDressDisplayCart = productContainerCart.querySelector("#productAmountInCartDisplay")
  uniqueDressDisplayCart.innerHTML = numberOfUniqueItemsInCart
    
}

function dressOutOfStockReservation( btn){

  let productContainer = btn.closest(".product__container")
  if(!productContainer) return
  let stockDisplayContainer = productContainer.querySelector("#pp")
  stockDisplayContainer.innerHTML =   `<p> Out of stock</p>`
    
}

function dressOutOfStockCart( btn){

  let productContainerCart2 = btn.closest(".product__container2")
  if(!productContainerCart2) return
  let stockDisplayContainer2 = productContainerCart2.querySelector("#available")
  stockDisplayContainer2.style.color = "red"
  stockDisplayContainer2.style.display = "unset"
   
    
}

function dressOutOfStockCartHide( btn){

  let productContainerCart2 = btn.closest(".product__container2")
  if(!productContainerCart2) return
  let stockDisplayContainer2 = productContainerCart2.querySelector("#available")
  stockDisplayContainer2.style.display = "none"
   
}


function displaySumInCart(){

  if( document.querySelector(".order___sum")){
  document.querySelector(".order___sum").innerHTML = `Total: ${localStorage.getItem("cartSum")},00$`
    }

}


function addSumToCart(dressPrice){

  let cartSum = localStorage.getItem("cartSum")
  localStorage.setItem("cartSum", Number(cartSum) + dressPrice)
  displaySumInCart()
 
}


function updateCartIconQuantity() {
  
  if (cartQuantityDisplay && localStorage.getItem("itemsInCart") !== null && JSON.parse(localStorage.getItem("itemsInCart")).length !== 0) {
    cartQuantityDisplay.innerHTML = `(${JSON.parse(localStorage.getItem("itemsInCart")).length})`;
    cartQuantityDisplay.style.visibility = "visible";
  }else if (localStorage.getItem("itemsInCart") !==null && localStorage.getItem("itemsInCart").length === 2  ){
    cartQuantityDisplay.style.visibility = "hidden";
  }

}

updateCartIconQuantity()



export function addToCart(){

 document.querySelectorAll(".addBtn").forEach(function(btn){

  btn.addEventListener("click" ,async function(event){

      let buttonClicked = btn

    if (preventDoubleClicks()) {
        
        return; 
      }

  let dressAvailabilityDatabase = await getitemAvailable(`${btn.title}`)
  let dressPriceDatabase = await getitemPrice(`${btn.title}`)
  let dressesDataBase = await getDataFromDatabase();
  let obj = dressesDataBase.find(o => o.Name === `${btn.title}`);


  if (dressAvailabilityDatabase === 0){
    
     dressAvailabilityDisplay(1, buttonClicked)
     updateCartIconQuantity()
     numberDisplayItemsInCart(buttonClicked)
     displaySumInCart()
     dressOutOfStockReservation(buttonClicked)
     dressOutOfStockCart(buttonClicked)
   
    return

  } 

  
  if(localStorage.getItem("itemsInCart") === null){

    localStorage.setItem("itemsInCart", JSON.stringify([obj]))
  
  }else {

    let itemsFromCartStorage = JSON.parse(localStorage.getItem("itemsInCart"))
    
    let items = [...itemsFromCartStorage, obj]
    
    localStorage.setItem("itemsInCart", JSON.stringify(items))
  }
 

  addSumToCart(dressPriceDatabase)
  reduceQuantityDirectly(btn.title)
  dressAvailabilityDisplay(dressAvailabilityDatabase, buttonClicked)
  updateCartIconQuantity()
  numberDisplayItemsInCart(buttonClicked)
  
  })
    
})
  
}



function subtractSumFromCart(dressPrice, quantity){

  let cartSum = localStorage.getItem("cartSum")
  localStorage.setItem("cartSum", Number(cartSum) - dressPrice * quantity)
  displaySumInCart()
 
}



function ifEmptyCart(){


    if(localStorage.getItem("cartSum") === null || +localStorage.getItem("cartSum") === 0){

      
  document.querySelector(".order___sum").innerHTML = ""

    document.getElementById("hero2").innerHTML = `<p>It's pretty empty here.</p>
                                                    <a href="./reservation.html">
    Let yourself be inspired</a>`

    document.getElementById("checkoutBtn").style.display ="none"
    document.getElementById("cartQuantity").style.display ="none"
    }
 
 
}



export function removeFromCart(){

 document.querySelectorAll(".removeItemInCartBtn, .removeBtn").forEach(function(btn){

  btn.addEventListener("click" ,async function(event){

    let buttonClicked = btn
    let dressPriceDatabase = await getitemPrice(`${btn.title}`)
    let cartItems = JSON.parse(localStorage.getItem("itemsInCart"))
      
      
      if(event.target.className === "removeBtn"){
        
        let productContainer = btn.closest(".product__container2")
        productContainer.remove()
        
        let sameDressesInCart = cartItems.filter(element => element.Name ===  btn.title);
        addQuantityDirectlyMultipleItems(`${btn.title}`, sameDressesInCart.length)

        let updatedCart = cartItems.filter(element => element.Name !== btn.title);
        localStorage.setItem("itemsInCart", JSON.stringify(updatedCart));

       updateCartIconQuantity()
       subtractSumFromCart(dressPriceDatabase, sameDressesInCart.length )
       ifEmptyCart()
       
      }


    if(event.target.className === "removeItemInCartBtn"){

    let dressToRemove = `${btn.title}`;
    let firstDressOccurance = cartItems.findIndex(item => item.Name === dressToRemove);


    console.log(+localStorage.getItem("cartSum"))

      if(+localStorage.getItem("cartSum") === 0){
         ifEmptyCart()
      }

      if (firstDressOccurance === -1 ){

        let productContainer = btn.closest(".product__container2")
        productContainer.remove()

      }


      if (firstDressOccurance !== -1) {
  
        cartItems.splice(firstDressOccurance, 1);
        localStorage.setItem("itemsInCart", JSON.stringify(cartItems));
        addQuantityDirectlyMultipleItems(`${btn.title}`, 1)
        updateCartIconQuantity()
        subtractSumFromCart(dressPriceDatabase, 1 )
        ifEmptyCart()
        numberDisplayItemsInCart(buttonClicked)
        dressOutOfStockCartHide( btn)


let isAtLeastOneDressInCart = cartItems.some(item => item.Name === `${btn.title}`);


      if(!isAtLeastOneDressInCart){
  
        let productContainer = btn.closest(".product__container2")
        productContainer.remove()

      }

}}})})

}




async function fetchDresses() {
    let heroElement = document.querySelector(".hero");

    
    if (heroElement) {
        heroElement.innerHTML = `
            <div id="render-loading-status" class="loading-box">
                <div class="spinner"></div>
                <p class="loading-title">Lade Produkte...</p>
                <p class="loading-notice">
                    Hinweis: Aufgrund des kostenlosen Render-Hostings kann der erste Start des Servers 
                    <strong>ca. 30–40 Sekunden</strong> dauern. Vielen Dank für Ihre Geduld!
                </p>
            </div>
        `;
    }

    try {
        
        const podaci = await getDataFromDatabase();
        
       
        dressesDataBase = podaci;

       
        displayProducts();

    } catch (error) {
        console.error('Fehler beim Laden der Daten:', error);
        
       
        let loadingElement = document.getElementById('render-loading-status');
        if (loadingElement) {
            loadingElement.innerHTML = `
                <p style="color: #e74c3c; font-weight: bold; font-size: 1.1rem;">Verbindung zum Server dauert zu lange...</p>
                <p style="font-size: 0.9rem; color: #555;">Das Render Free-Tier benötigt aktuell mehr Zeit zum Aufwachen. 
                Bitte laden Sie die Seite in wenigen Sekunden neu (F5).</p>
            `;
        }
    }
}

document.addEventListener('DOMContentLoaded', fetchDresses);

/* displayProducts() */

addToCart()


