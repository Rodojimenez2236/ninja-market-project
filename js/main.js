let products = []

const getProducts = () => {
    const xhr = new XMLHttpRequest()

    xhr.addEventListener("readystatechange", () => {
        if(xhr.readyState === 4 && xhr.status === 200) {
            let products = JSON.parse(xhr.responseText)
            // console.log(products)
            // console.log(Object.keys(products))
            products = Object.keys(products).map(key => {
                let product = products[key]
                // console.log(key)
                // console.log(product)
                return {...product, id: key}
            })
            printProducts(products)
            console.log(products)
        }
    })

    xhr.open("GET", "https://ninja-market-db5e3-default-rtdb.firebaseio.com/products.json")
    xhr.send()
}

const printProducts = arrayProducts => {
    let list = document.querySelector("#list-products")

    let allProducts = arrayProducts.reduce((acc, product) => {
        let {name, description, price, id, sizes, image} = product

        let cardProduct = `
        <div class="col-12 col-md-6 d-flex justify-content-center my-3">
          <article class="card-anime">
            <header class="card-anime-header d-flex justify-content-between mb-2">
              <img class="img-munko" src="${image}" alt="${name}">
              <div class="sizes-munkos d-flex flex-column justify-content-between">
                <div class="large d-flex align-items-center">
                  <img src="./assets/size-l.svg" alt="">
                  <p><span>G</span>rande</p>
                </div>
                <div class="medium d-flex align-items-center">
                  <img src="./assets/size-l.svg" alt="">
                  <p><span>M</span>ediano</p>
                </div>
                <div class="small d-flex align-items-center">
                  <img src="./assets/size-l.svg" alt="">
                  <p><span>P</span>equeño</p>
                </div>
              </div>
            </header>
            <section class="card-anime-body">
              <h3>${name}</h3>
              <p>${description}</p>
              <h4>$${price}.00 <span>MXN</span> </h4>
            </section>
            <footer class="card-anime-footer d-flex justify-content-between mt-4">
              <div class="heart">
                <i class="far fa-heart"></i>
              </div>
              <button data-product-id="${id}" class="btn btn-primary">Agregar <i class="fas fa-cart-plus"></i></button>
            </footer>
          </article>
        </div>
        `
        return acc + cardProduct
    }, "")
    // console.log(allProducts)
    list.innerHTML = allProducts
}

getProducts()