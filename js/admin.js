document.addEventListener("DOMContentLoaded", function () {
    try {
        const resetCartButton = document.getElementById("resetCartButton");
        resetCartButton.addEventListener("click", () => {
            localStorage.removeItem("cart");
            console.debug("Cart reset");

            let alertElement = document.getElementById("alert");
            alertElement.innerText = "Cart reset!";
        });
    } catch (error) {
        console.error("Error caught: ", error);
    }
});
