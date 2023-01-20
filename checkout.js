$(document).ready(function () {
  if (localStorage.getItem("product List")) {
    var productList = localStorage.getItem("product List");
    productList = JSON.parse(productList);
  } else {
    var productList = [];
  }
  function createCard(product) {
    let card = $("<div>").addClass("product-Card");
    let imgDiv = $("<div>");
    let detailsDiv = $("<div>");
    let productImg = $("<img>").attr({
      class: "product-Img",
      src: product.photos[0],
    });
    imgDiv.append(productImg);
    let name = $("<h4>").text(product.name);
    let count = $("<p>").text("x" + product.count);
    let TotalPrice = product.count * product.price;
    let amount = $("<p>").append([
      $("<span>").text("Amount: Rs"),
      $("<span>").text(TotalPrice),
    ]);
    detailsDiv.append(name, count, amount);
    card.append(imgDiv, detailsDiv);
    $("#productCards").append(card);
    return TotalPrice;
  }

  let cardsCount = 0;
  let totalPrice = 0;

  for (let i = 0; i < productList.length; i++) {
    let priceEach = createCard(productList[i]);
    totalPrice += priceEach;
    cardsCount++;
  }
  $("#itemCount").text(cardsCount);
  $("#totalAmount").text(totalPrice);
  $("#placeorderButton").click(function () {
    if (cardsCount === 0) {
      alert("No items in the cart. Buy any item to place the order.");
    } else {
      location.href = "confirmation.html?";
      localClear();
    }
  });
});
