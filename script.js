document.addEventListener("DOMContentLoaded", function () {
    const wordElement = document.getElementById("word");
    const definitionElement = document.getElementById("definition");
    const newWordButton = document.getElementById("new-word");

    async function fetchWord() {
        try {
            let response = await fetch("https://random-word-api.herokuapp.com/word");
            let wordArray = await response.json();
            let word = wordArray[0];

            let dictResponse = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
            let dictData = await dictResponse.json();

            wordElement.textContent = word;
            definitionElement.textContent = dictData[0]?.meanings[0]?.definitions[0]?.definition || "Definition not found.";
        } catch (error) {
            wordElement.textContent = "Error fetching word.";
            definitionElement.textContent = "Try again!";
        }
    }

    newWordButton.addEventListener("click", fetchWord);

    // Load a word when popup opens
    fetchWord();
});
