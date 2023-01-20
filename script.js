$(document).ready(function () {
  $(".banerPart").slick({
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  });
});

function onApiCallSuccess(productList) {
  var clothingSection = document.getElementById("clothing");

  var accessoriesSection = document.getElementById("accessories");

  for (counter = 0; counter < productList.length; counter++) {
    var productDetails = productList[counter];

    var img = document.createElement("img");
    img.src = productDetails.preview;

    var h3 = document.createElement("h3");
    h3.innerText = productDetails.name;

    var h4 = document.createElement("h4");
    h4.innerText = productDetails.brand;

    var h5 = document.createElement("h5");
    h5.innerText = "Rs " + productDetails.price;

    var card = document.createElement("div");
    card.classList.add("card");
    card.id = productDetails.id;
    // card.setAttribute("id", "cards");

    card.append(img, h3, h4, h5);

    if (productDetails.isAccessory === true) {
      accessoriesSection.append(card);
    } else {
      clothingSection.append(card);
    }
  }
  $(".card").on("click", function (e) {
    console.log("clicked");
    const id = e.currentTarget.id;
    window.location.href =
      "\product.html?id="+id;
  });
}

function onApiCallError(error) {
  alert("Something went wrong");
}

$.get("https://5d76bf96515d1a0014085cf9.mockapi.io/product")
  .done(onApiCallSuccess)
  .fail(onApiCallError);
