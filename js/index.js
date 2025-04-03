/**
 * Fetch data from Json if needed
 * @returns ring data
 */
async function getRingData(userInput = "") {
    try {
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

        if (searchActive === true) {
            data = data.filter((ring) => {
                return ring.name
                    .toLowerCase()
                    .includes(userInput.toLowerCase());
            });
        }

        return data;
    } catch (error) {
        console.error("Error fetching ring data: ", error);
        return [];
    }
}

/**
 * Search for rings that contain the user input in their name
 * @param {*} userInput The search query that was inputted by the user
 */
function searchContains(userInput) {
    searchActive = true;

    getRingData(userInput).then((data) => {
        clearStore();
        pointer = 0;
        printStoreCards(data, pointer);
    });
}

/**
 * Clear the store of all ring cards to print new data
 */
function clearStore() {
    document.getElementById("storeElement").innerHTML = "";
    console.log("Store element cleared");
}

/**
 * Clear the search and print all rings again
 */
function clearSearch() {
    searchActive = false;

    getRingData().then((data) => {
        clearStore();
        document.getElementById("searchInput").value = "";
        pointer = 0;
        printStoreCards(data, pointer);
    });
}

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
 * @param {*} offSet Where to start the data
 * @param {*} limit How many rings need to be printed
 */
function printStoreCards(data, offSet = 0, limit = 16) {
    let storeElement = document.getElementById("storeElement");

    let length = limit + offSet;

    if (data.length === 0) {
        console.error("No data to print");
        storeElement.innerHTML =
            "<p class='display-6 d-flex align-items-center py-5'>No rings found</p>";
    }

    if (data.length < length) {
        length = data.length;
    }

    const priceImageURL =
        "https://static.wikia.nocookie.net/darksouls/images/7/78/Soul_of_an_Old_Hand.png";
    const weightImageURL =
        "https://darksouls3.wiki.fextralife.com/file/Dark-Souls-3/icon_weight.png";

    for (let i = offSet; i < length; i++) {
        pointer++;

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
        storeElement.appendChild(cardElement);

        console.log("Store card created for ring: " + data[i].name);
    }
}

/**
 * Print the amount of rings in the cart
 */
function printCartCount() {
    let cartCount = document.getElementById("cartCount");
    cartCount.innerText = cart.length;
}

let searchActive = false;
let pointer = 0;

let cart = localStorage.getItem("cart");

if (!cart) {
    cart = [];
    localStorage.setItem("cart", JSON.stringify(cart));
} else {
    cart = JSON.parse(cart);
}

document.addEventListener("DOMContentLoaded", function () {
    try {
        getRingData().then((data) => {
            printHeroRings(data);
            printStoreCards(data);
            printCartCount(cart);

            // Search button
            document
                .getElementById("form")
                .addEventListener("submit", (event) => {
                    event.preventDefault();
                    searchContains(
                        document.getElementById("searchInput").value
                    );
                });

            // Clear button
            document
                .getElementById("clearButton")
                .addEventListener("click", () => {
                    clearSearch();
                });

            // Infinite scroll
            window.addEventListener("scroll", () => {
                const scrollPosition = window.scrollY + window.innerHeight;
                const pageHeight = document.body.scrollHeight;

                if (pageHeight - scrollPosition < 100) {
                    if (searchActive === true) {
                        getRingData(
                            document.getElementById("searchInput").value
                        ).then((data) => {
                            printStoreCards(data, pointer);
                        });
                    } else {
                        printStoreCards(data, pointer);
                    }
                }
            });

            // Scroll to element button
            document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
                anchor.addEventListener("click", function (e) {
                    e.preventDefault();

                    const targetId = this.getAttribute("href").substring(1);
                    const targetElement = document.getElementById(targetId);
                    const offset = 70;

                    window.scrollTo({
                        top: targetElement.offsetTop - offset,
                        behavior: "smooth",
                    });
                });
            });
        });
    } catch (error) {
        console.error("Error caught: ", error);
    }
});
