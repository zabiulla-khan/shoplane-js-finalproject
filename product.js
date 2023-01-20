const parameters = new URLSearchParams(window.location.search);
const parametersId = parameters.get("id");

function onApiCallSuccess(productData) {
  let container = document.getElementById("container");
  console.log(container);
  let leftContainer = document.createElement("div");

  leftContainer.classList.add("leftContainer");

  let leftContainerImage = document.createElement("img");
  leftContainerImage.src = productData.preview;
  leftContainerImage.classList.add("leftContainerImage");

  leftContainer.append(leftContainerImage);
  container.append(leftContainer);

  let rightContainer = document.createElement("div");
  rightContainer.classList.add("rightContainer");

  let h1 = document.createElement("h1");
  h1.innerText = productData.name;

  let brand = document.createElement("p");
  brand.innerText = productData.brand;

  let price = document.createElement("p");
  price.innerText = "price: Rs ";
  let priceSpan = document.createElement("span");
  priceSpan.innerText = productData.price;
  price.append(priceSpan);

  let description = document.createElement("p");
  description.innerText = "Description";

  let descriptionText = document.createElement("p");
  descriptionText.classList.add("para");
  descriptionText.innerText = productData.description;

  let productPreview = document.createElement("p");
  productPreview.innerText = "Product Preview";

  let smallContainer = document.createElement("div");
  smallContainer.classList.add("smallContainer");

  function onImgClick(e) {
    let clicked = e.target.src;
    let activeElement = document.getElementsByClassName("active");
    activeElement[0].classList.remove("active");
    e.target.classList.add("active");
    leftContainerImage.src = clicked;
  }

  for (i = 0; i < productData.photos.length; i++) {
    let photos = productData.photos[i];
    let smallImages = document.createElement("img");
    smallImages.classList.add("smallImages");
    smallImages.src = photos;
    smallImages.addEventListener("click", onImgClick);
    smallContainer.append(smallImages);
    if (i === 0) {
      smallImages.classList.add("active");
    }
  }

  let button = document.createElement("button");
  button.classList.add("button");
  button.innerText = "Add to Cart";

  rightContainer.append(
    h1,
    brand,
    price,
    description,
    descriptionText,
    productPreview,
    smallContainer,
    button
  );
  button.addEventListener("click",
  function () {
    let cartcount = $("#cartcount").text()

    cartcount = parseInt(cartcount)
    cartcount++
    $("#cartcount").text(cartcount)

    if (localStorage.getItem("product List")) {
      let productList = JSON.parse(localStorage.getItem("product List"))
      let state = false
      for (let i = 0; i < productList.length; i++) {
        if (productList[i].id === parametersId) {
          productList[i].count++
          localStorage.setItem("product List", JSON.stringify(productList))
          state = true
        }
      }
      if (!state) {
        let obj = productData
        obj.count = 0
        obj.count++
        productList.push(obj)
        localStorage.setItem("product List", JSON.stringify(productList))
      }
    } else {
      let productList = []
      let obj = productData
      obj.count = 0
      obj.count++
      productList.push(obj)
      localStorage.setItem("product List", JSON.stringify(productList))
    }
  })
    $(".cartContainer i").on("click", function (e) {
      let cartid = e.currentTarget.id
      location.href = "checkout.html?productData=" + cartid
    })
  container.append(rightContainer);
}

function onApiCallError() {
  alert("Something went wrong");
}

$.get("https://5d76bf96515d1a0014085cf9.mockapi.io/product/" + parametersId)
  .done(onApiCallSuccess)
  .fail(onApiCallError);


  
