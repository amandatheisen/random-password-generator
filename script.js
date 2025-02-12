document.addEventListener("DOMContentLoaded", function () {
    const passwordField = document.getElementById("password");
    const copyButton = document.getElementById("copy-btn");
    const form = document.getElementById("form-inputs");
    const lengthInput = document.querySelector("input[name='n-characters']");
    const checkboxes = document.querySelectorAll("input[name='input-options']");

    const charSets = {
        "first-l-input": "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
        "lower-case": "abcdefghijklmnopqrstuvwxyz",
        "capital-letter": "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
        "numbers-input": "0123456789",
        "special-c-input": "!@#$%^&*()_-+=<>?"
    };

    function generatePassword(length, selectedTypes, firstUpperCase) {
        if (selectedTypes.length === 0) {
            return "Select at least one option";
        }

        let allCharacters = "";
        let passwordArray = [];

        selectedTypes.forEach(type => {
            const charSet = charSets[type];
            const randomChar = charSet.charAt(Math.floor(Math.random() * charSet.length));
            passwordArray.push(randomChar);
            allCharacters += charSet;
        });

        while (passwordArray.length < length) {
            passwordArray.push(allCharacters.charAt(Math.floor(Math.random() * allCharacters.length)));
        }

        passwordArray = passwordArray.sort(() => Math.random() - 0.5);

        if (firstUpperCase) {
            passwordArray[0] = charSets["first-l-input"].charAt(Math.floor(Math.random() * charSets["first-l-input"].length));
        }

        return passwordArray.join("");
    }

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const length = parseInt(lengthInput.value);
        if (isNaN(length) || length < 6 || length > 30) {
            passwordField.value = "Invalid length (6-30)";
            return;
        }

        const selectedTypes = [...checkboxes]
            .filter(checkbox => checkbox.checked)
            .map(checkbox => checkbox.value);

        const firstUpperCase = selectedTypes.includes("first-l-input");

        passwordField.value = generatePassword(length, selectedTypes, firstUpperCase);
    });

    copyButton.addEventListener("click", function (event) {
        event.preventDefault();
        if (passwordField.value && passwordField.value !== "Select at least one option" && passwordField.value !== "Invalid length (6-30)") {
            navigator.clipboard.writeText(passwordField.value).then(() => {
                alert("Password copied!");
            }).catch(() => {
                alert("Failed to copy password.");
            });
        }
    });
});