let cartCount = 0;
let totalPrice = 0;


function addToCart(price) {
  cartCount++;
  totalPrice += price;
  
  
  $("#cart-count").text(cartCount);
  $("#total-price").text(totalPrice);
}
$(".pick button").click(function() {
  var pizza = $(this).closest(".pizza");
  var priceElement = pizza.find(".pick p");
  var totalPrice = parseInt(priceElement.text().replace("від ", "").replace("₴", ""));
  addToCart(totalPrice);
});


$(".pizza").addClass("flex");

function filterPizzas(category) {
  $(".pizza").each(function() {
    var pizza = $(this);
    if (category === "all") {
      pizza.removeClass("hidden").addClass("flex");
    } else if (pizza.hasClass(category)) {
      pizza.removeClass("hidden").addClass("flex");
    } else {
      pizza.removeClass("flex").addClass("hidden");
    }
  });
  
 
  var filterText = $("#filter_pizza");
  if (category === "all") {
    filterText.text("Всі");
  } else if(category === "meat"){
    filterText.text("Мясні");
  } else if(category === "vegan"){
    filterText.text("Вегетеріанські");
  }else if(category === "grill"){
    filterText.text("Гриль");
  }else if(category === "hot"){
    filterText.text("Гострі");
  }else{
    filterText.text("Закриті");
  }
  
}
$(document).ready(function() {
  $(".pizza :radio").change(function() {
    var pizza = $(this).closest(".pizza");
    var priceElement = pizza.find(".pick p");
    var basePrice = parseInt(priceElement.data("price"));
    var selectedOptions = pizza.find(":radio:checked");

    var totalPrice = selectedOptions.toArray().reduce(function(acc, option) {
      var optionPrice = parseInt($(option).data("price"));
      return acc + optionPrice;
    }, basePrice);

    priceElement.text("від " + totalPrice + "₴");
  });
});




$(".filter-btn").click(function() {
  $(".filter-btn.active").removeClass("active");
  $(this).addClass("active");
});

function updateDropdown(option) {
  var dropdownToggle = $('.btn-group .dropdown-toggle-no-caret');
  dropdownToggle.text(option);

  const pizzaElements = $('.pizza');
  const container = $('#cont_'); 

  if (option === 'популярності') {
    pizzaElements.sort((a, b) => {
      const popularityA = parseInt($(a).attr('data-popularity'));
      const popularityB = parseInt($(b).attr('data-popularity'));

      return popularityB - popularityA; 
    });
  } else if (option === 'зростанню') {
    pizzaElements.sort((a, b) => {
      const priceA = parseInt($(a).find('.pick p').attr('data-price'));
      const priceB = parseInt($(b).find('.pick p').attr('data-price'));

      return priceA - priceB; 
    });
  } else if (option === 'спаданню') {
    pizzaElements.sort((a, b) => {
      const priceA = parseInt($(a).find('.pick p').attr('data-price'));
      const priceB = parseInt($(b).find('.pick p').attr('data-price'));

      return priceB - priceA; 
    });
  }

  container.append(pizzaElements);
}


