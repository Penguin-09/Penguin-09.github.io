import { createRingCard } from "./ring.js";

/**
 * Fetch data from Json if needed
 * @returns ring data
 */
async function getRingData() {
    let data = localStorage.getItem("rings");

    if (!data) {
        const response = await fetch("./rings.json");
        const dataJson = await response.json();
        localStorage.setItem("rings", JSON.stringify(dataJson));
        data = dataJson;
        console.debug("Ring data retrieved from json");
    } else {
        data = JSON.parse(data);
        console.debug("Ring data retrieved from local storage");
    }

    data = data.filter((ring) => cart.includes(ring.id));
    console.debug("Ring data filtered by cart");

    return data;
}

/**
 * Print all ring cards in the cart
 * @param {*} data ring data
 */
function printCart(data) {
    let storeElement = document.getElementById("cart");

    // Print error if cart is empty
    if (data.length === 0) {
        console.error("No data to print");
        storeElement.innerHTML =
            "<p class='display-6 d-flex align-items-center'>Your cart is empty!</p>";
    }

    for (let i = 0; i < data.length; i++) {
        const ringCard = createRingCard(data[i]);
        storeElement.appendChild(ringCard);
    }
}

/**
 * Print the amount of rings in the cart
 */
function printCartCount() {
    let cartCount = document.getElementById("cartCount");
    cartCount.innerText = cart.length;
    console.debug("Cart count printed: " + cart.length);
}

let cart = localStorage.getItem("cart");

if (!cart) {
    cart = [];
    localStorage.setItem("cart", JSON.stringify(cart));
} else {
    cart = JSON.parse(cart);
}

try {
    getRingData().then((data) => {
        printCart(data);
        printCartCount(data);
    });
} catch (error) {
    console.error("Error caught: ", error);
}
