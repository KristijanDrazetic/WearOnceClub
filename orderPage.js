let orderBox = document.getElementById("products")
let sumBox = document.getElementById("sumToPay")
let fields = document.querySelector(".fs-input")
let checkBox = document.querySelector('#terms-agreement')
let confirmOrderBtn = document.getElementById("confirmOrderBtn")
let itemsToBeOrdered = JSON.parse(localStorage.getItem("itemsInCart"))
let cartQuantityDisplay = document.getElementById("cartQuantity")
sumBox.innerHTML = `${localStorage.getItem("cartSum")},00$`

window.addEventListener('pageshow', function(event) {
   
    if (event.persisted) {
        window.location.reload();
    }
});

function returnToReservationPage(){

    if(JSON.parse(localStorage.getItem("itemsInCart")) === null || JSON.parse(localStorage.getItem("itemsInCart")).length === 0){
    window.location.replace("./reservation.html")
}
  }


confirmOrderBtn.addEventListener("click", ()=>{

if(cartQuantityDisplay){
cartQuantityDisplay.innerHTML = `(${JSON.parse(localStorage.getItem("itemsInCart")).length})`
}
    

    

    sumBox.innerHTML = `${localStorage.getItem("cartSum")},00$`
    
    

    orderBox.innerHTML = ""
     itemsToBeOrdered = JSON.parse(localStorage.getItem("itemsInCart"))

    itemsToBeOrdered.forEach((dress) => {
    

    orderBox.innerHTML += `-Dress: ${dress.Name}, Price: ${dress.Price},00$, Size: ${dress.Size}.
`
    })

    returnToReservationPage()

if (fields.checkValidity() && checkBox.checked) {
  } else {
    fields.reportValidity(); 
  return
}

    localStorage.removeItem("itemsInCart")
    localStorage.removeItem("cartSum")
    
    
})





returnToReservationPage()


function displayProductsOrderForm(){

itemsToBeOrdered.forEach((dress) => {
    

    orderBox.innerHTML += `-Dress: ${dress.Name}, Price: ${dress.Price},00$, Size: ${dress.Size}.
`
})

}

displayProductsOrderForm()

