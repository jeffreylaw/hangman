let letters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l",
    "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
let dictionary = {
    tattoo: "a form of body modification where a design is made by inserting ink",
    electricity: "the set of physical phenomena associated with the presence and motion of electric charge",
    rabbit: "a burrowing, plant-eating mammal with long ears and a short tail",
    hypothesis: "a supposition or proposed explaination made on the basis of limited evidence",
    committee: "a group of people appointed for a specific function by a larger group and typically consisting of members of that group",
    impediment: "something that hinders",
    fragile: "easily injured, broken, or destroyed",
    fetter: "to shackle or put in chains",
    macerate: "soften or become softened by soaking in liquid",
    pyrophorus: "substance that spontaneously combusts"

}
let lives = document.getElementById("lives");
let score = document.getElementById("score");
let buttonsDiv = document.getElementById("letterButtons");
let wordDisplay = document.getElementById("wordDisplay");
document.getElementById("restartButton").onclick = restartGame;

let answer = "";
let guessed = "";


// Dynamically creates buttons, generates the word for the hangman game, and initailizes the lives & score values. 
function startGame() {
    createButtonsArray();
    generateWord();
    lives.innerHTML = 7;
    score.innerHTML = 0;
}

// An object constructor that creates a button element and appends it to the DOM.
function Button(letter) {
    this.letter = letter;
    this.btn = document.createElement("button");
    this.btn.innerHTML = letter;
    buttonsDiv.appendChild(this.btn);
    this.btn.onclick = guessLetter;
}

// Creates 26 button objects, one for each letter in the alphabet.
function createButtonsArray() {
    for (let i = 0; i < 26; i++) {
        let btnObj = new Button(letters[i]);
    }
}

// Randomly retrieves a word from the dictionary object and updates internal variables.
function generateWord() {
    let dictionaryArray = Object.keys(dictionary);
    let randomNum = Math.floor((Math.random() * 10));
    answer = dictionaryArray[randomNum];
    document.getElementById("definitionDisplay").innerHTML = dictionary[dictionaryArray[randomNum]];
    guessed = '_'.repeat(answer.length);
    updateDisplay();
}

// Checks if the guessed letter is in the word and updates the score & life values accordingly.
function guessLetter() {
    this.setAttribute("disabled", true);
    let guessedLetter = this.innerHTML;

    let currentGuessArray = guessed.split("");
    if (answer.includes(guessedLetter)) {
        for (let i = 0; i < answer.length; i++) {
            if (guessedLetter === answer[i]) {
                currentGuessArray[i] = guessedLetter;
                score.innerHTML = parseInt(score.innerHTML) + 1;
                this.style = "background-color: lightGreen";
            }
        }
    } else {
        lives.innerHTML = parseInt(lives.innerHTML) - 1;
        score.innerHTML = parseInt(score.innerHTML) - 1;
        this.style = "background-color: lightCoral";
    }
    guessed = currentGuessArray.join("");
    updateDisplay();
}

// Ends the game
function endGame() {
    disableButtons();
    let scoreValue = parseInt(score.innerHTML);

    let status = document.getElementById("status");
    status.innerHTML = (guessed === answer) ? "<p style='color:green'>You win!</p>" : "<p style='color:red'>You lose.</p>";
    let name;
    setTimeout(function () {
        name = prompt("Enter your name");
        if (name === null || name.trim().length === 0) {
            name = "Shy player";
        }
        uploadScore(name, scoreValue);
        hideDivs();
        status.innerHTML = "<p>" + name + ", your score is " + scoreValue + "</p>";
        document.getElementById("header").innerHTML = "<h1>Hangman High Scores</h1>";
    }, 1500);
}

// Updates the div to the current guessed state.
function updateDisplay() {
    wordDisplay.innerHTML = guessed;
    let remainingLives = parseInt(lives.innerHTML);
    if (remainingLives < 1 || guessed === answer) {
        endGame();
    }
}

// Restarts the game.
function restartGame() {
    location.reload();
}

// Uploads the score to the database and retrieves data formatted as a HTML table.
function uploadScore(name, score) {
    let sendAjax = new XMLHttpRequest();
    sendAjax.open('POST', 'uploadscore.php', true);
    sendAjax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    sendAjax.send("name=" + name + "&score=" + score);

    sendAjax.onreadystatechange = function () {
        if (sendAjax.readyState === 4 && sendAjax.status === 200) {
            let retrieveAjax = new XMLHttpRequest();
            retrieveAjax.onreadystatechange = function () {
                if (retrieveAjax.readyState === 4 && retrieveAjax.status === 200) {
                    document.getElementById("highScores").innerHTML = retrieveAjax.responseText;
                }
            }
            retrieveAjax.open('GET', 'getscores.php', true);
            retrieveAjax.send();
        }
    }
}


// Hide the word, definition, all buttons.
function hideDivs() {
    document.getElementById("wordDisplay").style.display = "none";
    document.getElementById("definitionDisplay").style.display = "none";
    document.getElementById("letterButtons").style.display = "none";
    document.getElementById("restart").style.display = "none";
}

// Disable all buttons
function disableButtons() {
    let btns = document.getElementsByTagName("button");
    for (let i = 0; i < btns.length; i++) {
        btns[i].setAttribute("disabled", true);
    }
}

startGame();


