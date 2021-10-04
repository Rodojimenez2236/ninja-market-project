let btnAdd = document.querySelector("#btn-added")
let btnEdit = document.querySelector("#btn-edit")


// Funciones AJAX

const createProduct = (productObject) => {
    const xhr = new XMLHttpRequest()

    xhr.addEventListener("readystatechange", () => {
        if(xhr.readyState === 4 && xhr.status === 200) {
            console.log(xhr.responseText)
        }
    })

    xhr.open("POST","https://ninja-market-db5e3-default-rtdb.firebaseio.com/products.json")
    xhr.send(JSON.stringify(productObject))
}

// const productTest = {
//     description: "Github en version funko...",
//     price: "1234",
//     stock: "500"
// }

const updateProduct = (idProduct, newDataToUpdate) => {
    const xhr = new XMLHttpRequest()
    xhr.addEventListener("readystatechange", () => {
        if(xhr.readyState === 4 && xhr.status === 200) {
            console.log(xhr.responseText)
        }
    })
    xhr.open("PATCH", `https://ninja-market-db5e3-default-rtdb.firebaseio.com/products${idProduct}.json`)
    xhr.send(JSON.stringify(newDataToUpdate))
}


const getDataForm = () => {
    let fields = document.querySelectorAll(".form input:not(input[type='checkbox']), .form textarea")
    let checkboxs = document.querySelectorAll(".form input[type='checkbox']")

    let product = {}
    let quantityFieldEmpty = 0

    fields.forEach(field => {
        if(!field.value) {
            quantityFieldEmpty++
        }else {
            product = {...product, [field.name]: field.value}
            field.value = ""
        }
    })

    let sizes = []
    checkboxs.forEach(checkbox => {
        if(checkbox.checked) sizes = [...sizes, checkbox.value]
    })

    if(sizes.length === 0) quantityFieldEmpty++

    product = {...product, sizes}

    // if(product.name && product.)

    return !quantityFieldEmpty > 0  ? product : null
}

btnAdd.addEventListener("click", () => {
   let product =  getDataForm()
   console.log(product)
   if(product){
    // agregarlo a la BD
    createProduct(product)
   }else {
       alert("Campos Obligatorios")
   }

})


// // Se modifica la tarjeta al mismo tiempo que escriben

// Modifica el nombre  de la tarjeta cuando escriben en el el campo 

let nameProduct = document.getElementById("name-product")

nameProduct.addEventListener("keyup", ()=> {
    
    let valueInput = nameProduct.value

    document.getElementById("name-prod").textContent = valueInput
})

//Modifica la descripcion de la tarjeta cuando escriben en el el campo 


let descriptionProduct = document.getElementById("description-product")

descriptionProduct.addEventListener("keyup", ()=> {
    
    let valueInput = descriptionProduct.value

    document.getElementById("desc-prod").textContent = valueInput
})

//Modifica el precio de la tarjeta cuando escriben en el el campo 

let priceProduct = document.getElementById("price-product")

priceProduct.addEventListener("keyup", ()=> {
    
    let valueInput = priceProduct.value

    document.getElementById("price-prod").textContent = valueInput
})
// Modifica la imagen de la tarjeta cuando introducen url en el el campo 

let imageProduct = document.getElementById("image-product")

imageProduct.addEventListener("paste", ()=> {
    
    let valueInput = imageProduct.name
    console.log(valueInput)
    document.getElementById("image-prod").src = valueInput
})