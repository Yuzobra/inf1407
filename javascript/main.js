const LETTERS = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
var word = null;
var foundLetters = [];
var livesRemaining = null;

const CATEGORIES = {
    'Fruits': ['apple', 'orange', 'banana', 'pear'],
    'Animals': ['lion', 'dog', 'gorilla', 'giraffe'],
    'Vehicles': ['car', 'boat', 'train', 'truck']
}


onload = function () {
    generateCategories();
    resetGame();
}

function generateCategories() {
    const categoriesSelector = document.getElementById("categoriesSelector");
    categoriesSelector.onchange = resetGame

    for (const categoryName of Object.keys(CATEGORIES)) {
        const categoryElement = document.createElement("option")
        categoryElement.value = categoryName;
        categoryElement.innerHTML = categoryName;

        categoriesSelector.appendChild(categoryElement);
    }
}

function resetGame() {
    foundLetters = [];
    livesRemaining = 6;
    updateLifeImage();
    getHiddenWord();
    generateHiddenLetters(word);
    generateOptionLetters();
}

function updateLifeImage() {
    const imgElement = document.getElementById("imgHangman");
    imgElement.src = "imagens/img_" + livesRemaining + ".jpg"
}

function getHiddenWord() {
    const categoriesSelector = document.getElementById("categoriesSelector");

    for (let i = 0; i < categoriesSelector.options.length; i++) {
        const category = categoriesSelector.options[i];
        if(category.selected) {
            const random_word_index = Math.floor(Math.random() * CATEGORIES[category.value].length)
            word = CATEGORIES[category.value][random_word_index]
        }
    }
}

function generateHiddenLetters(word) {
    const hiddenLettersContainer = document.getElementById("hiddenLettersContainer");
    hiddenLettersContainer.innerHTML = ''; // Remove previous word

    for (var i = 0; i < word.length; i++) {
        const letter = word.charAt(i);
        const letterElement = document.createElement("div");
        letterElement.className = "hiddenLetter";
        letterElement.id = "hiddenLetter_" + i;

        if (foundLetters.includes(i)) {
            letterElement.innerHTML = letter;
        }
        else {
            letterElement.innerHTML = "&nbsp";
        }
        hiddenLettersContainer.appendChild(letterElement);
    }
}

function generateOptionLetters() {
    const optionLettersContainer = document.getElementById("optionLettersContainer");
    optionLettersContainer.innerHTML = ''; // Remove previous used letters

    for (var i = 0; i < LETTERS.length; i++) {
        const optionLetter = document.createElement("button");
        optionLetter.innerHTML = LETTERS[i];
        optionLetter.name = LETTERS[i];
        optionLetter.className = "optionLetter";
        optionLetter.id = "optionLetter_" + LETTERS[i];
        optionLetter.onclick = onOptionLetterPress;

        optionLettersContainer.appendChild(optionLetter);
    }
}

function onOptionLetterPress(e) {
    e.preventDefault();
    e.target.disabled = true;
    const pressedLetter = e.target.name;

    if (hiddenWordContains(pressedLetter)) {
        showHiddenLetter(pressedLetter);
        checkVictory();
    }
    else {
        loseLifePoint();
        checkDefeat();
    }
}

function hiddenWordContains(letter) {
    return word.includes(letter);
}

function showHiddenLetter(letter) {
    for (var i = 0; i < word.length; i++) {
        if (word[i] === letter) {
            foundLetters.push(i);
        }
    }
    updateHiddenWord();
}

function updateHiddenWord() {
    for (let i = 0; i < foundLetters.length; i++) {
        const hiddenLetter = document.getElementById("hiddenLetter_" + foundLetters[i]);
        hiddenLetter.innerHTML = word.charAt(foundLetters[i]);
    }
}

function revealWord() {
    for (let i = 0; i < word.length; i++) {
        if(!foundLetters.includes(i)) {
            const hiddenLetter = document.getElementById("hiddenLetter_" + i);
            hiddenLetter.classList.add("wrongLetter");
            hiddenLetter.innerHTML = word.charAt(i);
        }
    }
}

function loseLifePoint() {
    livesRemaining -= 1;
    updateLifeImage();
}

function checkVictory() {
    setTimeout(() => {
        // wait hidden letters to update
        if (foundLetters.length == word.length) {
            alert("Você venceu");
            resetGame();
        }
    }, 10);
}

function checkDefeat() {
    if (livesRemaining == 0) {
        revealWord();
        setTimeout(() => {
        // wait image to update
            alert("Você perdeu");
            resetGame();
        }, 100);
    }
}