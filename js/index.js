import { createRingCard } from "./ring.js";

/**
 * Fetch data from Json if needed
 * @returns {Array<Ring>} ring data
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

        if (searchActive) {
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

    length = Math.min(length, data.length);

    for (let i = offSet; i < length; i++) {
        pointer++;

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
    getRingData()
        .then((data) => {
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
                    if (searchActive) {
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
        })
        .catch((error) => {
            console.error("Error retrieving ring data: ", error);
        });
});
