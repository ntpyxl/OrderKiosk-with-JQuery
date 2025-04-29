let cart = [];
let totalAmount = 0;

$('.addOrderButton').on('click', function(event) {
    addItemToCart($(this).closest('.menuItem'));
    updateCart($('#orderList'));
    updateTotalAmount();
})

function addItemToCart(item) {
    // get all possible item values
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

    // pushing item values to cart array
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

function updateCart(orderList) {
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
            createChildItem(orderList, capitalize(cart[i].snackFlavor) + " " + capitalize(cart[i].snackVariant) + " " + capitalize(cart[i].snackSize[0]));
        }
        if(cart[i].drinkVariant != null) {
            if(cart[i].drinkVariant == "water") {
                createChildItem(orderList, capitalize(cart[i].drinkVariant) + " " + capitalize(cart[i].drinkSize[0]));
            } else {
                const drinkFlavor = cart[i].drinkVariant == "soda" ? cart[i].sodaFlavor : cart[i].juiceFlavor;
                createChildItem(orderList, capitalize(drinkFlavor) + " " + capitalize(cart[i].drinkVariant) + " " + capitalize(cart[i].drinkSize[0]));
            }
        } 
    }
}

function updateTotalAmount() {
    totalAmount = 0;
    for(let i = 0; i < cart.length; i++) {
        totalAmount += cart[i].totalPrice;
    }
    $('#totalAmount').text("PHP " + totalAmount);
}

function pay() {
    if(cart.length > 0) {
        const userPayAmount = $('#userPayAmount').val();
        if(userPayAmount < totalAmount) {
            const missingFunds = totalAmount - userPayAmount
            alert("You have insufficient funds! You are missing PHP " + missingFunds + "!");
        } else if (userPayAmount >= totalAmount) {
            const change = userPayAmount - totalAmount;
            $('#modalReceipt').removeClass('hidden');
            $('body').addClass('overflow-hidden');
            updateCart($('#receiptOrderList'));
            $('#receiptTotalAmount').text("PHP " + totalAmount);
            $('#reciptAmountPaid').text("PHP " + userPayAmount);
            $('#reciptChange').text("PHP " + change);
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

function capitalize(text) {
    return text.charAt(0).toUpperCase() + text.slice(1);
}