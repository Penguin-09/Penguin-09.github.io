/**
 * @typedef {Object} Ring
 * @property {string} name - The name of the ring
 * @property {number} id - The ID of the ring
 * @property {number} value - The value of the ring in souls
 * @property {number} weight - The weight of the ring
 * @property {string} imageURL - The URL of the ring's image
 * @property {string} effect - The effect of the ring
 * @property {string[]} description - The description of the ring
 */

const priceImageURL =
    "https://static.wikia.nocookie.net/darksouls/images/7/78/Soul_of_an_Old_Hand.png";
const weightImageURL =
    "https://darksouls3.wiki.fextralife.com/file/Dark-Souls-3/icon_weight.png";

/**
 * Create a card for a ring
 * @param {Ring} ring
 * @returns {HTMLElement} The card element
 */
function createRingCard(ring) {
    const { name, id, value, weight, imageURL, effect } = ring;

    // Store Card Element
    let cardElement = document.createElement("a");
    cardElement.href = "detail.html#" + id;
    cardElement.classList.add(
        "customStoreCard",
        "col-12",
        "col-sm-6",
        "col-md-4",
        "col-lg-3"
    );

    // Name Element
    let nameElement = document.createElement("h2");
    nameElement.textContent = name;
    nameElement.classList.add("customStoreCardName");
    cardElement.appendChild(nameElement);

    // Image Element
    let imageElement = document.createElement("img");
    imageElement.src = imageURL;
    imageElement.alt = name;
    cardElement.appendChild(imageElement);

    // Effect Element
    let effectElement = document.createElement("p");
    effectElement.textContent = effect;
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
    priceElement.textContent = value + " souls";
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
    weightElement.textContent = weight + " units";
    weightDivElement.appendChild(weightElement);

    infoElement.appendChild(weightDivElement);
    cardElement.appendChild(infoElement);

    console.log("Store card created for ring: " + name);

    return cardElement;
}

export { createRingCard };
