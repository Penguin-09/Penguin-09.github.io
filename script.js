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
 * Generate cards in the store element for 16 rings
 * @param {*} data The ring data from the json file
 */
function printStoreCards(data) {
    let storeElement = document.getElementById("storeElement");

    for (let i = 0; i < 16; i++) {
        // Store Card Element
        let cardElement = document.createElement("div");
        cardElement.classList.add("customStoreCard", "col-12", "col-sm-6", "col-md-4", "col-lg-3");

        // Name Element
        let nameElement = document.createElement("h2");
        nameElement.textContent = data[i].name;
        nameElement.classList.add("customStoreCardName");
        cardElement.appendChild(nameElement);

        // Image Element
        let imageElement = document.createElement("img");
        imageElement.src = data[i].imageURL;
        imageElement.alt = data[i].name;
        imageElement.classList.add("customHover");
        cardElement.appendChild(imageElement);

        // Effect Element
        let effectElement = document.createElement("p");
        effectElement.textContent = data[i].effect;
        cardElement.appendChild(effectElement);
        
        storeElement.appendChild(cardElement);
        console.log("Store card created for ring: " + data[i].name);
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
