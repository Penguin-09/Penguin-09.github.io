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

    data = data.filter((ring) => cart.includes(ring.id));

    return data;
}

/**
 * Print all ring cards in the cart
 * @param {*} data ring data
 */
function printCart(data) {
    let cartElement = document.getElementById("cart");

    // Print error if cart is empty
    if (data.length === 0) {
        console.error("No data to print");
        cartElement.innerHTML =
            "<p class='display-6 pt-5'>Your cart is empty!</p>";
    }

    const priceImageURL =
        "https://static.wikia.nocookie.net/darksouls/images/7/78/Soul_of_an_Old_Hand.png";
    const weightImageURL =
        "https://darksouls3.wiki.fextralife.com/file/Dark-Souls-3/icon_weight.png";

    for (let i = 0; i < data.length; i++) {
        // Store Card Element
        let cardElement = document.createElement("a");
        cardElement.href = "detail.html#" + data[i].id;
        cardElement.classList.add(
            "customStoreCard",
            "col-12",
            "col-sm-6",
            "col-md-4",
            "col-lg-3"
        );

        // Name Element
        let nameElement = document.createElement("h2");
        nameElement.textContent = data[i].name;
        nameElement.classList.add("customStoreCardName");
        cardElement.appendChild(nameElement);

        // Image Element
        let imageElement = document.createElement("img");
        imageElement.src = data[i].imageURL;
        imageElement.alt = data[i].name;
        cardElement.appendChild(imageElement);

        // Effect Element
        let effectElement = document.createElement("p");
        effectElement.textContent = data[i].effect;
        cardElement.appendChild(effectElement);

        let infoElement = document.createElement("div");
        infoElement.classList.add("customStoreCardInfo");

        // Price Element
        let priceDivElement = document.createElement("div");
        priceDivElement.classList.add("customStoreCardPrice");

        let priceImageElement = document.createElement("img");
        priceImageElement.src = priceImageURL;
        priceImageElement.alt = "souls";
        priceDivElement.appendChild(priceImageElement);

        let priceElement = document.createElement("p");
        priceElement.textContent = data[i].value + " souls";
        priceDivElement.appendChild(priceElement);

        infoElement.appendChild(priceDivElement);

        // Weight Element
        let weightDivElement = document.createElement("div");
        weightDivElement.classList.add("customStoreCardWeight");

        let weightImageElement = document.createElement("img");
        weightImageElement.src = weightImageURL;
        weightImageElement.alt = "weight";
        weightDivElement.appendChild(weightImageElement);

        let weightElement = document.createElement("p");
        weightElement.textContent = data[i].weight + " units";
        weightDivElement.appendChild(weightElement);

        infoElement.appendChild(weightDivElement);
        cardElement.appendChild(infoElement);
        cartElement.appendChild(cardElement);

        console.log("Cart card created for ring: " + data[i].name);
    }
}

const cart = localStorage.getItem("cart");

document.addEventListener("DOMContentLoaded", function () {
    try {
        getRingData().then((data) => {
            printCart(data);
        });
    } catch (error) {
        console.error("Error caught: ", error);
    }
});
