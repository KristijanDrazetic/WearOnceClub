let year = document.getElementById("year")
let thisYear = new Date().getFullYear()
year.setAttribute("datetime", thisYear)
year.textContent = thisYear

function displayCartQuantity(){

    let cartQuantityDisplay = document.getElementById("cartQuantity")

    if(JSON.parse(localStorage.getItem("itemsInCart")) !== null){
  cartQuantityDisplay.innerHTML = `(${JSON.parse(localStorage.getItem("itemsInCart")).length})`

    if(JSON.parse(localStorage.getItem("itemsInCart")).length === 0){
    cartQuantityDisplay.style.visibility = "hidden"}

    }

}

displayCartQuantity()

export async function getDataFromDatabase() {
 
  const SERVER_URL = "https://wearonceclub-1.onrender.com/api/data/find";

  const requestPayload = {
    database: "inventory",       
    collection: "dresses",   
    filter: {}                 
  };

  try {
    const response = await fetch(SERVER_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(requestPayload)
    });

    const result = await response.json();
    
    if (result.success) {
     
      
      
      return result.documents
      
    } else {
      console.error("Backend error:", result.error);
    }
  } catch (networkError) {
    console.error("Could not reach backend server:", networkError);
  }
}

export async function getitemAvailable(itemName) {
  
  const SERVER_URL = "https://wearonceclub-1.onrender.com/api/data/find";

  const requestPayload = {
    database: "inventory",       
    collection: "dresses",   
    filter: { Name: itemName,
      Available: { $gte: 0 }}                 
  };

  try {
    const response = await fetch(SERVER_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(requestPayload)
    });

    const result = await response.json();
    
    if (result.success) {
    
      
      return result.documents[0].Available
      
    } else {
      console.error("Backend error:", result.error);
    }
  } catch (networkError) {
    console.error("Could not reach backend server:", networkError);
  }
}


export async function getitemPrice(itemName) {
  
  const SERVER_URL = "https://wearonceclub-1.onrender.com/api/data/find";

  const requestPayload = {
    database: "inventory",       
    collection: "dresses",   
    filter: { Name: itemName,
      Price: { $gte: 0 }}                 
  };

  try {
    const response = await fetch(SERVER_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(requestPayload)
    });

    const result = await response.json();
    
    if (result.success) {
    
      console.log(result.documents[0].Price)
      return result.documents[0].Price
      
    } else {
      console.error("Backend error:", result.error);
    }
  } catch (networkError) {
    console.error("Could not reach backend server:", networkError);
  }
}


export async function reduceQuantityDirectly(itemName) {
  
  const SERVER_URL = "https://wearonceclub-1.onrender.com/api/data/update"; 

  

  const requestPayload = {
    database: "inventory",       
    collection: "dresses",    
    filter: { Name: itemName,
      Available: { $gte: 1 } 
     },
    update: {
      $inc: { Available: -1 } 
    }
  };

  try {
    const response = await fetch(SERVER_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestPayload)
    });

    const result = await response.json();
   
    if (result.success) {
      const item = result.document || (result.documents && result.documents[0]);
      
      return item;
    }
  } catch (error) {
    console.error("Error modifying quantity:", error);
  }
}

 

  export async function addQuantityDirectlyMultipleItems(itemName, items) {
 
  const SERVER_URL = "https://wearonceclub-1.onrender.com/api/data/update"; 

  

  const requestPayload = {
    database: "inventory",       
    collection: "dresses",    
    filter: { Name: itemName,
      Available: { $gte: 0 } 
     },
    update: {
      $inc: { Available: 1 * items }
    }
  };

  try {
    const response = await fetch(SERVER_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestPayload)
    });

    const result = await response.json();
    
    
    if (result.success) {
      const item = result.document || (result.documents && result.documents[0]);
      
      return item;
    }
  } catch (error) {
    console.error("Error modifying quantity:", error);
  }
  return result.price
}



export async function addQuantityDirectly(itemName) {
  
  const SERVER_URL = "https://wearonceclub-1.onrender.com/api/data/update"; 

  

  const requestPayload = {
    database: "inventory",       
    collection: "dresses",    
    filter: { Name: itemName,
      Available: { $gte: 0 } 
     },
    update: {
      $inc: { Available: +1 } 
    }
  };

  try {
    const response = await fetch(SERVER_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestPayload)
    });

    const result = await response.json();
    
    
    if (result.success) {
      const item = result.document || (result.documents && result.documents[0]);
     
      return item;
    }
  } catch (error) {
    console.error("Error modifying quantity:", error);
  }
  return result.price
}







