$('select').on('change', function(event) {
    const item = $(this).closest('.menuItem');

    if(item.hasClass('hasDrinkVariant')) {
        changeDisplayedDrinkFlavor(item);
        
    }
    if(item.hasClass('hasSizeVariant')) {
        changeDisplayedPrice(item);
    }
})

function changeDisplayedDrinkFlavor(item) {
    const drinkVariant = item.find('#drinkVariant').val();
    const sodaFlavor = item.find('.sodaFlavor');
    const juiceFlavor = item.find('.juiceFlavor');
    
    switch(drinkVariant) {
        case "soda":
            juiceFlavor.addClass('hidden');
            sodaFlavor.removeClass('hidden');
            break;
        case "juice":
            sodaFlavor.addClass('hidden');
            juiceFlavor.removeClass('hidden');
            break;
        case "water":
            sodaFlavor.addClass('hidden');
            juiceFlavor.addClass('hidden');
            break;
    }
}

function changeDisplayedPrice(item) {
    const snackSize = item.find('#snackSize').val();
    const drinkSize = item.find('#drinkSize').val();
    const itemSize = snackSize ? snackSize : drinkSize;

    const newPrice = getItemPrice(item.attr('id'), itemSize);
    item.find('.productPrice').text("PHP " + newPrice);
}

function getItemPrice(itemName, size) {
    const prices = {
        frenchFries: [30, 40, 50],
        potatoChips: [35, 45, 55],
        soda: [20, 30, 40],
        juice: [15, 25, 35],
        water: [10, 15, 20]
    };

    switch(size) {
        case "small":
            return prices[itemName][0];
        case "medium":
            return prices[itemName][1];
        case "large":
            return prices[itemName][2];
    }
}