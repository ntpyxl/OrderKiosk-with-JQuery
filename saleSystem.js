let cart = [];

$('.addOrderButton').on('click', function(event) {
    addItemToCart($(this).closest('.menuItem'));
    updateCart();
})

function addItemToCart(item) {  
    let productName = item.find('.productName').text();
    let snackVariant, snackFlavor, snackSize;
    if(item.hasClass('hasSnackVariant')) {
        snackVariant = item.find('#snackVariant').val();
        snackFlavor = item.find('#snackFlavor').val();
        snackSize = item.find('#snackSize').val();
    }
    let drinkVariant, sodaFlavor, juiceFlavor, drinkSize;
    if(item.hasClass('hasDrinkVariant')) {
        drinkVariant = item.find('#drinkVariant').val();
        sodaFlavor = item.find('#sodaFlavor').val();
        juiceFlavor = item.find('#juiceFlavor').val();
        drinkSize = item.find('#drinkSize').val();
    }
    let quantity = parseInt(item.find('#quantity').val(), 10);
    let totalPrice = parseInt(item.find('.productPrice').text().replace('PHP ', '').trim(), 10) * quantity;

    let itemDetail = {
        productName: productName,
        quantity: quantity,
        totalPrice: totalPrice,
    }
    itemDetail.isComboItem = item.hasClass('comboItem') ? true : false;
    if(snackVariant != null) {
        itemDetail.snackVariant = snackVariant,
        itemDetail.snackFlavor = snackFlavor,
        itemDetail.snackSize = snackSize
    }
    if(drinkVariant != null) {
        itemDetail.drinkVariant =  drinkVariant,
        itemDetail.sodaFlavor = drinkVariant == "soda" ? sodaFlavor : null,
        itemDetail.juiceFlavor = drinkVariant == "juice" ? juiceFlavor : null,
        itemDetail.drinkSize= drinkSize
    }

    cart.push(itemDetail);
}

function updateCart() {
    const orderList = $('#orderList');
    orderList.children().not(':first').remove();
    for(let i = 0; i < cart.length; i++) {
        createParentItem(i, orderList);
        
        if(cart[i].isComboItem) {
            switch(cart[i].productName) {
                case "Quickombo":
                createChildItem(orderList, "Cheeseburger");
                break;
            case "Decent Combo":
                createChildItem(orderList, "Cheeseburger");
                break;
            case "Big Combo":
                createChildItem(orderList, "Bacon Cheesebuger");
                break;
            case "Wombo Combo":
                createChildItem(orderList, "Stacked Burger");
                break;
            }
        }

        if(cart[i].snackVariant != null) {
            createChildItem(orderList, cart[i].snackFlavor + " " + cart[i].snackVariant + " " + cart[i].snackSize[0]);
        } 
    }
}

function createParentItem(i, orderList) {
    const row = $('<div>').addClass('grid grid-cols-[7fr_2fr_3fr] gap-2 border-t border-gray-500 px-3 pt-2');

    const displayName = $('<span>').addClass('text-left').text(cart[i].productName);
    const displayQuantity = $('<span>').addClass('text-center').text("x" + cart[i].quantity);
    const displayPrice = $('<span>').addClass('text-right').text(cart[i].totalPrice);

    row.append(displayName, displayQuantity, displayPrice);
    orderList.append(row);
}

function createChildItem(orderList, itemName) {
    const row = $('<div>').addClass('grid grid-cols-[7fr_2fr_3fr] gap-2 border-none border-gray-500 px-3');

    const displayName = $('<span>').addClass('text-left ml-5 font-normal').text(itemName);

    row.append(displayName);
    orderList.append(row);
}

function pay() {
    console.log(cart);
}