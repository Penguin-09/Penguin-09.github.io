/**
 * Get the ring ID from the URL
 * @returns ring ID
 */
function getIdFromUrl() {
    const hash = window.location.hash;
    return hash.substring(1);
}

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
        console.log("Ring data succesfully retrieved");
    } else {
        data = JSON.parse(data);
    }

    return data;
}

/**
 * Print ring information on detail page
 * @param {*} data all ring data
 * @param {int} id ring ID
 */
function printRingInfo(data, id) {
    // Page name
    document.title = data[id].name;

    // Title
    let title = document.getElementById("title");
    title.innerText = data[id].name;

    // Image
    let image = document.getElementById("image");
    image.src = data[id].imageURL;
    image.alt = data[id].name;

    // Effect
    let effect = document.getElementById("effect");
    effect.innerText = data[id].effect;

    // Description
    let line0 = document.getElementById("line0");
    let line1 = document.getElementById("line1");
    let line2 = document.getElementById("line2");
    line0.innerText = data[id].description[0];

    if (data[id].description.length == 2) {
        line1.remove();
        line2.innerText = data[id].description[1];
    } else {
        line1.innerText = data[id].description[1];
        line2.innerText = data[id].description[2];
    }

    // Weight
    let weight = document.getElementById("weight");
    weight.innerText = data[id].weight + " units";

    // Value
    let value = document.getElementById("souls");
    value.innerText = data[id].value + " souls";
}

/**
 * Add or remove ring to cart
 */
function changeCartState() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let cartButtonText = document.getElementById("cartButtonText");

    if (!cart.includes(id)) {
        // Add to cart
        cart.push(id);
        localStorage.setItem("cart", JSON.stringify(cart));
        cartButtonText.textContent = "Remove from Cart";
        showAlert(true);
        console.log("Ring added to cart: ", id);
    } else {
        // Remove from cart
        cart = cart.filter((ringId) => ringId !== id);
        localStorage.setItem("cart", JSON.stringify(cart));
        cartButtonText.textContent = "Add to Cart";
        showAlert(false);
        console.log("Ring removed from cart: ", id);
    }
}

/**
 * Show the success alert for a few seconds
 * @param {*} isInCart Wether the ring is in the cart or not
 */
async function showAlert(isInCart) {
    let alert = document.getElementById("alert");
    let alertText = document.getElementById("alertText");

    if (isInCart) {
        alertText.textContent = "Ring added to cart!";
    } else {
        alertText.textContent = "Ring removed from cart!";
    }

    // Display for a determined time
    alert.classList.add("show");
    await sleep(2000);
    alert.classList.remove("show");
}

/**
 * Wait for a determined amount of time
 * @param {*} ms milliseconds to sleep
 * @returns void
 */
function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

const id = getIdFromUrl();
console.log("ID retrieved from URL: ", id);

document.addEventListener("DOMContentLoaded", function () {
    try {
        getRingData().then((data) => {
            printRingInfo(data, id);

            // Change cart button text if neccesary
            let cart = JSON.parse(localStorage.getItem("cart")) || [];
            let cartButtonText = document.getElementById("cartButtonText");

            if (cart.includes(id)) {
                cartButtonText.textContent = "Remove from Cart";
            }
        });
    } catch (error) {
        console.error("Error caught: ", error);
    }
});
