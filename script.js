/**
 * Retrieve 3 random rings from the json and print them on the hero section
 * @param {*} data The ring data from the json file
 */
function printHeroRings(data) {
    const usedImageIDs = [];

    for (let i = 0; i < 3; i++) {
        let ringElement = document.getElementById("heroRing" + i);

        let randomIndex;

        // Generate a random index that hasn't been used yet
        do {
            randomIndex = Math.floor(Math.random() * data.length);
        } while (usedImageIDs.includes(randomIndex));

        usedImageIDs.push(randomIndex);

        // Append the data
        ringElement.src = data[randomIndex].imageURL;
        ringElement.alt = data[randomIndex].name;
        console.log(
            "Ring image appended to hero section: " + data[randomIndex].name
        );
    }
}

/**
 * Generate a store card and fill it with ring data
 * @param {*} data The ring data from the json file
 * @param {*} index The index of the ring in the json file
 */
function printStoreCards(data, index) {
    // Store Card Element
    let cardElement = document.createElement("div");
    cardElement.classList.add(
        "customStoreCard",
        "col-12",
        "col-sm-6",
        "col-md-4",
        "col-lg-3"
    );

    // Name Element
    let nameElement = document.createElement("h2");
    nameElement.textContent = data[index].name;
    nameElement.classList.add("customStoreCardName");
    cardElement.appendChild(nameElement);

    // Image Element
    let imageElement = document.createElement("img");
    imageElement.src = data[index].imageURL;
    imageElement.alt = data[index].name;
    cardElement.appendChild(imageElement);

    // Effect Element
    let effectElement = document.createElement("p");
    effectElement.textContent = data[index].effect;
    cardElement.appendChild(effectElement);

    storeElement.appendChild(cardElement);
    console.log("Store card created for ring: " + data[index].name);

    let infoElement = document.createElement("div");
    infoElement.classList.add("customStoreCardInfo");

    // Price Element
    let priceDivElement = document.createElement("div");
    priceDivElement.classList.add("customStoreCardPrice");

    let priceImageElement = document.createElement("img");
    priceImageElement.src =
        "https://static.wikia.nocookie.net/darksouls/images/7/78/Soul_of_an_Old_Hand.png";
    priceImageElement.alt = "souls";
    priceDivElement.appendChild(priceImageElement);

    let priceElement = document.createElement("p");
    priceElement.textContent = data[index].value + " souls";
    priceDivElement.appendChild(priceElement);

    infoElement.appendChild(priceDivElement);

    // Weight Element
    let weightDivElement = document.createElement("div");
    weightDivElement.classList.add("customStoreCardWeight");

    let weightImageElement = document.createElement("img");
    weightImageElement.src =
        "https://darksouls3.wiki.fextralife.com/file/Dark-Souls-3/icon_weight.png";
    weightImageElement.alt = "weight";
    weightDivElement.appendChild(weightImageElement);

    let weightElement = document.createElement("p");
    weightElement.textContent = data[index].weight + " units";
    weightDivElement.appendChild(weightElement);

    infoElement.appendChild(weightDivElement);

    cardElement.appendChild(infoElement);
}

/**
 * Print ring cards in the store
 * @param {*} data The ring data from the json file
 */
function printStoreCards(data) {
    let storeElement = document.getElementById("storeElement");

    for (let i = 0; i < 16; i++) {
        printStoreCards(data, i);
    }
}

try {
    fetch("./rings.json")
        .then((response) => response.json())
        .then((dataJson) => {
            localStorage.setItem("rings", JSON.stringify(dataJson));

            const data = JSON.parse(localStorage.getItem("rings"));
            console.log("Ring data succesfully retrieved");

            printHeroRings(data);
            printStoreCards(data);
        });
} catch (error) {
    console.error("Error caught: ", error);
}
