import { getDataFromDatabase } from './main.js';
import { reduceQuantityDirectly } from './main.js';
import {addQuantityDirectly} from './main.js'
import {addQuantityDirectlyMultipleItems} from './main.js'
import {getitemAvailable} from './main.js'
export let dressesDataBase = await getDataFromDatabase()
let dresses = dressesDataBase.sort((a, b) => a.Name.localeCompare(b.Name))
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
        
  productsHTML = productsHTML +=`<div class ="add__product" id = "pp"><button class="addBtn" id = "addBtnReservation" type="button">Add to Cart</button></div></div>`

      }else if(dress.Available === 0){
  productsHTML = productsHTML +=`<div class ="add__product" ><p>Out of Stock</p></div></div>`
   
}
  
  })


  let heroElement = document.querySelector(".hero");

  if(heroElement){
  document.querySelector(".hero").innerHTML = productsHTML
  }
}





function sortFunction() {
  
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
}



export function addToCart(){

  document.querySelectorAll(".addBtn").forEach(function(btn){

  btn.addEventListener("click" ,async function(event){

    

  
  function numberDisplayItemsInCart(){
 let numberDisplayItemsInCart = document.getElementById("productAmountInCartDisplay")
  if(numberDisplayItemsInCart){
  let itemsFromCart = JSON.parse(localStorage.getItem("itemsInCart"))
  let numberOfUniqueItemsInCart = itemsFromCart.filter(element => element.Name === event.target.parentNode.parentNode.children[1].innerHTML.slice(7)).length;
  event.target.parentNode.parentNode.children[5].children[1].innerHTML = numberOfUniqueItemsInCart

  }
}







   let name = this.parentNode.parentNode.children[1].innerHTML.slice(7)
   
   if(await getitemAvailable(`${name}`) === 0){
      this.parentNode.parentNode.children[6].innerHTML = `In Stock: ${await getitemAvailable(`${name}`)}`

       if(event.target.parentNode.children[3] ){
  event.target.parentNode.children[3].style.display = "unset"
   event.target.parentNode.children[3].style.color = "red"

 }
      
      if(this.parentNode.parentNode.children[7].innerHTML){
  this.parentNode.parentNode.children[7].innerHTML = `<p> Out of stock</p>`
      }
      

  let orderSumDisplay = document.querySelector(".order___sum")

  if(orderSumDisplay){
  document.querySelector(".order___sum").innerHTML = `Total: ${localStorage.getItem("cartSum")},00$`
  }


  numberDisplayItemsInCart()



  
    
  
  return
   }
   let dressesDataBase = await getDataFromDatabase()
    let obj = dressesDataBase.find(o => o.Name === this.parentNode.parentNode.children[1].innerHTML.slice(7));
    

     if(await getitemAvailable(`${obj.Name}`) !== 0){
  


  function checkDoubleClicks() {
 
  const now = Date.now();
  
  if (now - lastClick < 700){
return; 
  } 
  localStorage.setItem("cartSum", +localStorage.getItem("cartSum") + obj.Price)
    
  let dressAvailability = dressesDataBase.find(dressesDataBase => dressesDataBase.Name === obj.Name);


    if(localStorage.getItem("itemsInCart") !== null){
let itemsFromCart = [...JSON.parse(localStorage.getItem("itemsInCart"))]

itemsFromCart.push(obj)

localStorage.setItem("itemsInCart", JSON.stringify(itemsFromCart))

 }else {
  let itemsFromCart = []

itemsFromCart.push(obj)

localStorage.setItem("itemsInCart", JSON.stringify(itemsFromCart))



 }
    reduceQuantityDirectly(`${name}`)
  lastClick = now;
  
}

checkDoubleClicks()
  
    
  }


  let objName = obj.Name


 await getitemAvailable(`${objName}`)

 
  this.parentNode.parentNode.children[6].innerHTML = `In Stock: ${await getitemAvailable(`${objName}`)}`

  if(await getitemAvailable(`${objName}`) > 0 || await getitemAvailable(`${objName}`) === 0){

  }

  let orderSumDisplay = document.querySelector(".order___sum")
  if(orderSumDisplay){
  document.querySelector(".order___sum").innerHTML = `Total: ${localStorage.getItem("cartSum")},00$`
  }

  numberDisplayItemsInCart()
 
  let outOfStockDisplay = document.getElementById(".available")
  if(orderSumDisplay){
document.querySelector(".order___sum").innerHTML = `Total: ${localStorage.getItem("cartSum")},00$`
  }

let productNotAvailableDisplay = document.getElementById("available")
  
 if(await getitemAvailable(`${objName}`) === 0 && productNotAvailableDisplay){
 
  event.target.parentNode.children[3].style.display = "unset"
   event.target.parentNode.children[3].style.color = "red"

    }else if(await getitemAvailable(`${objName}`) !== 0 && productNotAvailableDisplay){
event.target.parentNode.children[3].style.display = "none"
   
    }
cartQuantityDisplay.innerHTML = `(${JSON.parse(localStorage.getItem("itemsInCart")).length})`
cartQuantityDisplay.style.visibility = "visible"
  })
   
  }) 

}



export function removeFromCart(){


  
  document.querySelectorAll(".removeItemInCartBtn, .removeBtn").forEach(function(btn){

  btn.addEventListener("click" , function(event){

    if(JSON.parse(localStorage.getItem("itemsInCart")) !== null ){
  cartQuantityDisplay.innerHTML = `(${JSON.parse(localStorage.getItem("itemsInCart")).length})`
    }
  
  let obj = dressesDataBase.find(o => o.Name === this.parentNode.parentNode.children[1].innerHTML.slice(7));

  
  let objName = obj.Name


  if(event.target.className === "removeBtn"){

  
    let sameDressesInCart = JSON.parse(localStorage.getItem("itemsInCart")).filter(element => element.Name ===  event.target.parentNode.parentNode.children[1].innerHTML.slice(7));
    let dressesFromDatabase = dressesDataBase
    let dressAvailability = dressesFromDatabase.find(dressesFromDatabase => dressesFromDatabase.Name === objName);
  
    
    localStorage.setItem("dressesInDatabase", JSON.stringify(dressesFromDatabase))
    obj.Available += sameDressesInCart.length
    
    const target = event.target.parentNode.parentNode.children[1].innerHTML.slice(7)

    let remainingDressesInCart = JSON.parse(localStorage.getItem("itemsInCart")).filter(item => item.Name !== target);

  

    localStorage.setItem("itemsInCart", JSON.stringify(remainingDressesInCart))

    

    localStorage.setItem("cartSum", +localStorage.getItem("cartSum") - obj.Price * sameDressesInCart.length)
    
    document.querySelector(".order___sum").innerHTML = `Total: ${localStorage.getItem("cartSum")},00$`
    event.target.parentNode.parentNode.style.display ="none"

    addQuantityDirectlyMultipleItems(`${objName}`, sameDressesInCart.length)


    if(+localStorage.getItem("cartSum") === 0){
  
    
    document.querySelector(".order___sum").innerHTML = ""

    document.getElementById("hero2").innerHTML = `<p>It's pretty empty here.</p>
                                                    <a href="./reservation.html">
    Let yourself be inspired</a>`

    document.getElementById("checkoutBtn").style.display ="none"
    document.getElementById("cartQuantity").style.display ="none"
 
  
    }

     
    cartQuantityDisplay.innerHTML = `(${JSON.parse(localStorage.getItem("itemsInCart")).length})`

    return
  }

 

 
  document.querySelector(".order___sum").innerHTML = `Total: ${localStorage.getItem("cartSum")},00$`

  if(+localStorage.getItem("cartSum") === 0){
  
    
    document.querySelector(".order___sum").innerHTML = ""

    document.getElementById("hero2").innerHTML = `<p>It's pretty empty here.</p>
                                                    <a href="./reservation.html">
  Let yourself be inspired</a>`

  document.getElementById("checkoutBtn").style.display ="none"
  document.getElementById("cartQuantity").style.display ="none"
  }



  let itemsFromCart = JSON.parse(localStorage.getItem("itemsInCart"))


  let dressIndex = itemsFromCart.findIndex(dress => dress.Name ===  event.target.parentNode.parentNode.children[1].innerHTML.slice(7) );



  function numberOfUniqueItemsInCart(){
  let numberOfUniqueItemsInCart = itemsFromCart.filter(element => element.Name === event.target.parentNode.parentNode.children[1].innerHTML.slice(7)).length;


  event.target.parentNode.parentNode.children[5].children[1].innerHTML = numberOfUniqueItemsInCart


  if( numberOfUniqueItemsInCart === 0){
  
  event.target.parentNode.parentNode.className = ""
 event.target.parentNode.parentNode.innerHTML = ""
 
 
  
}

return numberOfUniqueItemsInCart
}

numberOfUniqueItemsInCart()
     
setTimeout(()=>{
  cartQuantityDisplay.innerHTML = `(${JSON.parse(localStorage.getItem("itemsInCart")).length})`
}, 100)
 
   
  
 if(obj.Available > -1){
  
   event.target.parentNode.children[3].style.display = "none"
   
}

  if(obj.Available > -1 ){

  
if(numberOfUniqueItemsInCart() === 0){

localStorage.setItem("cartSum", +localStorage.getItem("cartSum") - obj.Price)

  
  return
}

addQuantityDirectly(`${objName}`)
  

 localStorage.setItem("cartSum", +localStorage.getItem("cartSum") - obj.Price)

  
}


if (dressIndex !== -1) {
  itemsFromCart.splice(dressIndex, 1);
  localStorage.setItem("itemsInCart", JSON.stringify(itemsFromCart))
 
  
}


document.querySelector(".order___sum").innerHTML = `Total: ${localStorage.getItem("cartSum")},00$`

itemsFromCart = JSON.parse(localStorage.getItem("itemsInCart"))


numberOfUniqueItemsInCart()


if(+localStorage.getItem("cartSum") === 0){
  
    
    document.querySelector(".order___sum").innerHTML = ""

    document.getElementById("hero2").innerHTML = `<p>It's pretty empty here.</p>
                                                    <a href="./reservation.html">
  Let yourself be inspired</a>`

  document.getElementById("checkoutBtn").style.display ="none"
document.getElementById("cartQuantity").style.display ="none"
}
  
  })
   
  }) 

}

displayProducts()

addToCart()


