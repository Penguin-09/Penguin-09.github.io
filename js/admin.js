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
 * Remove the cart from local storage
 */
function resetCart() {
    localStorage.removeItem("cart");
    console.debug("Cart reset");

    let alertElement = document.getElementById("alertReset");
    alertElement.innerText = "Cart has been reset!";
}

/**
 *
 */
function addRing() {
    try {
        getRingData().then((data) => {
            const ringName = document.getElementById("addRingName").value;
            const ringValue = document.getElementById("addRingValue").value;
            const ringWeight = document.getElementById("addRingWeight").value;
            const ringImageURL =
                document.getElementById("addRingImageURL").value;
            const ringEffect = document.getElementById("addRingEffect").value;
            const ringDescription1 = document.getElementById(
                "addRingDescription1"
            ).value;
            const ringDescription2 = document.getElementById(
                "addRingDescription2"
            ).value;

            // Generate a new ID
            const highestId = Math.max(...data.map((ring) => ring.id), 0);
            const newId = highestId + 1;

            // Create the new ring object
            const newRing = {
                name: ringName,
                id: newId,
                value: parseInt(ringValue),
                weight: parseFloat(ringWeight),
                imageURL: ringImageURL,
                effect: ringEffect,
                description: [ringDescription1, ringDescription2],
            };

            data.push(newRing);

            localStorage.setItem("rings", JSON.stringify(data));
            console.debug(newRing);
        });
    } catch (error) {
        console.error("Error caught: ", error);
    }
}

/**
 * Remove a ring from local storage
 */
function removeRing() {
    try {
        getRingData().then((data) => {
            const ID = parseInt(document.getElementById("removeInput").value);
            console.debug(ID);

            const updatedData = data.filter((ring) => ring.id !== ID);
            localStorage.setItem("rings", JSON.stringify(updatedData));
            console.debug(`Ring removed`);

            let alertElement = document.getElementById("alertRemove");
            alertElement.innerText = "Ring removed!";
        });
    } catch (error) {
        console.error("Error caught: ", error);
    }
}

try {
    // Reset cart
    const resetCartButton = document.getElementById("resetCartButton");
    resetCartButton.addEventListener("click", resetCart);

    // Remove ring
    const removeRingButton = document.getElementById("removeRingButton");
    removeRingButton.addEventListener("click", (event) => {
        event.preventDefault();
        removeRing();
    });

    // Add ring
    const addRingButton = document.getElementById("addRingButton");
    addRingButton.addEventListener("click", (event) => {
        event.preventDefault();
        addRing();
    });
} catch (error) {
    console.error("Error caught: ", error);
}
