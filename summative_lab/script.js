// Dictionary service address
const DICTIONARY_API = "https://api.dictionaryapi.dev/api/v2/entries/en/";

// Connecting JavaScript with HTML elements
const lookupForm = document.querySelector("#dictionary-search");
const wordBox = document.querySelector("#search-word");
const outputArea = document.querySelector("#word-display");

let pronunciationAudio;


// Start searching when the form is submitted
lookupForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const requestedWord = wordBox.value.trim();

    if (requestedWord === "") {
        return;
    }

    searchDictionary(requestedWord);

    wordBox.value = "";
});


// Gets information from the dictionary API
async function searchDictionary(term) {

    showMessage(`Searching for "${term}"...`);

    try {

        const apiResponse = await fetch(
            `${DICTIONARY_API}${encodeURIComponent(term)}`
        );


        if (!apiResponse.ok) {

            displayError(term);

            return;
        }


        const dictionaryData = await apiResponse.json();


        clearScreen();

        createWordCard(dictionaryData[0]);


    } catch (problem) {

        showMessage(
            "Unable to connect. Please try again.",
            "error-message"
        );

        console.log(problem);

    }
}



// Creates the complete result section
function createWordCard(wordInfo) {


    const titleArea = createHeader(wordInfo);


    outputArea.appendChild(titleArea);


    wordInfo.meanings.forEach((category) => {

        const meaningArea = createMeaningSection(category);

        outputArea.appendChild(meaningArea);

    });

}



// Creates word title and audio controls
function createHeader(data) {


    const header = document.createElement("div");

    header.className = "word-header";


    const textContainer = document.createElement("div");


    const wordName = document.createElement("h2");

    wordName.className = "word-title";

    wordName.textContent = data.word;



    const soundText = document.createElement("p");

    soundText.className = "pronunciation";


    const sound = findPronunciation(data);


    soundText.textContent = sound || "No pronunciation available";


    textContainer.append(wordName, soundText);



    const audioButton = document.createElement("button");

    audioButton.className = "sound-button";


    const audioFile = findAudio(data);



    if (audioFile) {

        audioButton.textContent = "🔊 Play Audio";


        pronunciationAudio = new Audio(audioFile);


        audioButton.addEventListener("click", () => {

            pronunciationAudio.currentTime = 0;

            pronunciationAudio.play();

        });


    } else {

        audioButton.textContent = "No Audio";

        audioButton.disabled = true;

    }


    header.append(textContainer, audioButton);


    return header;

}



// Finds available pronunciation text
function findPronunciation(wordData) {


    if (wordData.phonetic) {

        return wordData.phonetic;

    }


    const availableSound = wordData.phonetics.find(
        (item) => item.text
    );


    return availableSound ? availableSound.text : "";

}



// Finds available audio file
function findAudio(wordData) {


    const audioObject = wordData.phonetics.find(
        (item) => item.audio
    );


    return audioObject ? audioObject.audio : "";

}



// Builds each definition section
function createMeaningSection(info) {


    const box = document.createElement("div");

    box.className = "definition-card";



    const type = document.createElement("h3");

    type.className = "word-type";

    type.textContent = info.partOfSpeech;



    const list = document.createElement("ol");

    list.className = "definition-list";



    info.definitions.slice(0, 3).forEach((item) => {


        const meaning = document.createElement("li");


        meaning.textContent = item.definition;



        if (item.example) {

            const example = document.createElement("span");

            example.className = "example-text";

            example.textContent =
                ` Example: "${item.example}"`;


            meaning.appendChild(example);

        }


        list.appendChild(meaning);


    });



    box.append(type, list);


    return box;

}



// Removes old search results
function clearScreen() {

    outputArea.innerHTML = "";

}



// Shows loading information
function showMessage(message, style = "loading-message") {

    outputArea.innerHTML = `
        <p class="${style}">
            ${message}
        </p>
    `;

}



// Displays error when word does not exist
function displayError(word) {

    outputArea.innerHTML = `
        <p class="error-message">
            Sorry, "${word}" was not found.
            Try checking the spelling.
        </p>
    `;

}