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
        });
} catch (error) {
    console.error("Error caught: ", error);
}
