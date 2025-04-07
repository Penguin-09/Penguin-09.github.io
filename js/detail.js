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
    try {
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

        return data;
    } catch (error) {
        console.error("Error fetching ring data: ", error);
        return [];
    }
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

    console.debug("Ring data printed: ", data[id].name);
}

/**
 * Add or remove ring to cart
 */
function changeCartState() {
    let cartButtonText = document.getElementById("cartButtonText");

    if (!cart.includes(id)) {
        // Add to cart
        cart.push(id);
        localStorage.setItem("cart", JSON.stringify(cart));
        cartButtonText.textContent = "Remove from Cart";
        showAlert(true);
        console.debug("Ring added to cart: ", id);
    } else {
        // Remove from cart
        cart = cart.filter((ringId) => ringId !== id);
        localStorage.setItem("cart", JSON.stringify(cart));
        cartButtonText.textContent = "Add to Cart";
        showAlert(false);
        console.debug("Ring removed from cart: ", id);
    }
}

/**
 * Show the success alert for a few seconds
 * @param {*} isInCart Whether the ring is in the cart or not
 */
async function showAlert(isInCart) {
    let alert = document.getElementById("alert");
    let alertText = document.getElementById("alertText");

    if (isInCart) {
        alertText.textContent = "Ring added to cart!";
    } else {
        alertText.textContent = "Ring removed from cart!";
    }

    printCartCount();
    console.debug("Alert shown: ", alertText.textContent);

    // Display for a determined time
    alert.classList.add("show");
    await new Promise((resolve) => setTimeout(resolve, 2000));
    alert.classList.remove("show");
}

/**
 * Print the amount of rings in the cart
 */
function printCartCount() {
    let cartCount = document.getElementById("cartCount");
    cartCount.innerText = cart.length;
    console.debug("Cart count printed: " + cart.length);
}

const id = parseInt(getIdFromUrl());
console.debug("ID retrieved from URL: ", id);

let cart = localStorage.getItem("cart");

if (!cart) {
    cart = [];
    localStorage.setItem("cart", JSON.stringify(cart));
} else {
    cart = JSON.parse(cart);
}

try {
    getRingData().then((data) => {
        printRingInfo(data, id);
        printCartCount();

        // Change cart button text if necessary
        let cartButtonText = document.getElementById("cartButtonText");

        if (cart.includes(id)) {
            cartButtonText.textContent = "Remove from Cart";
        }

        const cartButton = document.getElementById("cartButton");
        cartButton.addEventListener("click", changeCartState);
    });
} catch (error) {
    console.error("Error caught: ", error);
}
