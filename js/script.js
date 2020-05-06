/*============================================================================*/
/* ----------------- VÄLKOMMEN TILL HANGMAN DIABLO EDITION! ----------------- */
/*============================================================================*/
// Globala variabler
const wordList = ['diablo', 'mephisto', 'baal', 'andariel', 'duriel', 'azmodan', 'lilith', 'leah', 'rakanoth', 'tyrael', 'malthael', 'izual']; // Array: med spelets alla ord
let selectedWord;    // Sträng: ett av orden valt av en slumpgenerator från arrayen ovan

let guesses = 0;     // Number: håller antalet gissningar som gjorts
let hangmanImgNr;    // Sträng: sökväg till bild som kommer visas (och ändras) fel svar. t.ex. `/images/h1.png`

let letterBoxesEls;  // Array av DOM-noder: Rutorna där bokstäverna ska stå
let startGameBtnEl;  // DOM-nod: knappen som du startar spelet med
let letterGuess;
let playerLives = 6; // Håller koll på antal gissningar som spelaren har kvar
let msgElem;         // DOM-nod: Ger meddelande när spelet är över

// Gör så att init körs när sidan laddas
window.onload = init;

// Funktion som körs när man kommer in på sidan
function init() {
    document.querySelector("#startGameBtn").addEventListener('click', startGameBtn);
}

// Funktion som startar spelet vid mouseclick och tillkallar andra funktioner som krävs för att spela
function startGameBtn() {
    restartGame();
    playerLives = 6;
    randomWord();
    createLetterBoxes();
    makeHangmanimg();
    document.getElementById('guesses-left').innerHTML = playerLives;
}

// Funktion som slumpar fram ett ord
function randomWord() {
    selectedWord = wordList[Math.floor(Math.random() * wordList.length)];
}

// Funktion som tar fram bokstävernas rutor beroende på vilket ord som slumpades fram
function createLetterBoxes() {
    letterBoxEls = document.querySelector('#letterBoxes > ul');
    letterBoxEls.innerHTML = "";

    for (let i = 0; i < selectedWord.length; i++) {

        let newElement = document.createElement('li')
        let newInput = document.createElement('input')
        newInput.setAttribute('type', 'text')
        newInput.setAttribute('disabled', '')
        newElement.appendChild(newInput);
        letterBoxEls.appendChild(newElement);
    }
}

// Funktion som kollar om gissade bokstaven finns i ordet och placerar det på rätt plats
function lookAtGuess(letterGuess) {
    // För att kolla så knapparna verkligen loggar rätt värde/value 
    console.log(letterGuess);

    let correctGuess = false;
    let childNodes = document.getElementById("letterList").children;

    for (let i = 0; i < selectedWord.length; i++) {

        if (letterGuess.toLowerCase() == selectedWord[i]) {
            correctGuess = true;
            guesses++;
            childNodes[i].firstChild.setAttribute("value", letterGuess);
            disableLetter(letterGuess);
        }
    }

    if (correctGuess == false) {
        hangmanImgNr++;
        document.getElementById('guesses-left').innerHTML = playerLives -= 1;
        makeHangmanimg();
        disableLetter(letterGuess);
    }
    if (hangmanImgNr == 6) {
        msgElem = "You thought you were so clever... Right word: " + selectedWord.toUpperCase();
        gameOver();
    }
    if (guesses == selectedWord.length) {
        msgElem = "Diablo was defeated. For now.";
        gameOver();
    }
}

// Funktion som tar bort boxarna, rensar spelplanen
function removeBoxes() {
    let letterBoxesToRemove = letterBoxes.querySelectorAll("li");
    if (letterBoxesToRemove.length > 0 || null) {
        for (let i = 0; i < letterBoxesToRemove.length; i++) {
            let nodeToRemove = letterBoxesToRemove[i];
            letterBoxes.removeChild(nodeToRemove);
        }
    }
}

// Funktion som bygger på Hangman vid fel svar
function makeHangmanimg() {
    hangmanImg = document.querySelector("#hangman");
    hangmanImg.setAttribute("src", "images/h" + hangmanImgNr + ".png")
}

// Funktionen ropas vid vinst eller förlust, meddelar spelaren om denne vunnit eller förlorat
function gameOver() {
    disableButtons();
    setTimeout(function () {
        window.alert(msgElem);
    });
}

// Funktion som inaktiverar/aktiverar bokstavsknapparna beroende på vilken del av spelet du är på
function disableLetter(letterGuess) {
    let allLetters = document.getElementsByClassName("btn btn--stripe");

    for (let i = 0; i < allLetters.length; i++) {

        if (allLetters[i].innerHTML == letterGuess) {
            allLetters[i].disabled = true;
        }
    }
}

// Funktion som nollställer spelarens liv/guesses left, nollställer bilderna, antal gissningar gjorda samt gör knappar klickbara igen
function restartGame() {
    hangmanImgNr = 0;
    guessCounter = 0;
    resetLetterButtons();
}

// Funktion som gör knappar ej klickbara, används när spelet är vunnet/förlorat
function disableButtons() {
    let allLetters = document.getElementsByClassName("btn btn--stripe");

    for (let i = 1; i < allLetters.length; i++) {
        allLetters[i].disabled = true;
    }
}

// Funktion som gör att knappar går att klicka, används när spelet startas om
function resetLetterButtons() {
    let allLetters = document.getElementsByClassName("btn btn--stripe");

    for (let i = 0; i < allLetters.length; i++) {

        if (allLetters[i].disabled == true) {
            allLetters[i].disabled = false;
            allLetters[i].removeAttribute("style");
        }
    }
}

