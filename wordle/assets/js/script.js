// Grab DOM elements
const message = document.getElementById('success-msg');
const letters = document.querySelectorAll('.wordboard-letter');

// console.log(message);
// console.log(letters);


async function init() {
    /**
     * Define following variables:
     * - currentGuess
     * - currentRow
     * - answerLength
     * - done
     */
    let currentGuess = '';
    let currentRow = 0;
    const ANSWER_LENGTH = 5;

    /**
     * Make API call, get word of the day.
     * Create array of characters
     */
    const url = 'https://words.dev-apis.com/word-of-the-day';
    const res = await fetch(url);
    const data = await res.json();
    let wordOfTheDay = data.word.toUpperCase();
    // console.log(wordOfTheDay);
    // we want to convert the string in an array
    let wordParts = wordOfTheDay.split('');



    function addLetter(letter) {
        // check if buffer is less than 5 characters
        // if so, add letter
        // if not, replace last letter with new letter
        if (currentGuess.length < ANSWER_LENGTH) {
            currentGuess += letter;
        } else {
            // it's like slice method
            currentGuess = currentGuess.substring(0, currentGuess.length - 1) + letter;
        }

        // what it's been returned from letters is an array of data so to access to each of them we use []
        letters[currentRow * ANSWER_LENGTH + currentGuess.length - 1].textContent = letter;
    }

    function handleCommit(){
        // If word doesn't contain 5 letters...
        if (currentGuess.length !== ANSWER_LENGTH) return;

        // Create an array of the currentGuess too
        let guessParts = currentGuess.split('');
        // console.log(guessParts)
        let wordMap = makeMap(wordParts);
        console.log(wordMap);

        // Mark 'correct', 'close', 'wrong' squares
        // Compare items of the two arrays to see if they match
        for (let i = 0; i < ANSWER_LENGTH; i++) {
            if (guessParts[i] === wordParts[i]) {
                letters[currentRow * ANSWER_LENGTH + i].classList.add('correct');
                wordMap[guessParts[i]]--
            }
        }

        for (let i = 0; i < ANSWER_LENGTH; i++) {
            if (guessParts[i] === wordParts[i]) {
                // do nothing, we've already handled this case above
            } else if (wordParts.includes(guessParts[i]) && wordMap[guessParts[i]] > 0) { //make more accurate later
                letters[currentRow * ANSWER_LENGTH + i].classList.add('close');
                wordMap[guessParts[i]]--
            } else {
                letters[currentRow * ANSWER_LENGTH + i].classList.add('wrong');
            }
        }

        // Did the user win or lose?
        if (currentGuess === wordOfTheDay) {
            animate();
            message.textContent = 'You win!'
            message.classList.add('complete', 'wotd');
        } else if (currentRow === 5) {
            animate();
            message.innerHTML = `You lose! The word was <span class='wotd'>${wordOfTheDay}</span>`
            message.classList.add('complete')
        }

        // set currentGuess to empty string
        // increment currentRow

        currentGuess = '';
        currentRow++ //we need to go to the next row
        // console.log(currentRow)
    }

    function handleBackspace() {
        // Modify currentGuess and update DOM
        currentGuess = currentGuess.substring(0, currentGuess.length - 1);
        letters[currentRow * ANSWER_LENGTH + currentGuess.length].textContent = '';
    }


    /**
     * Listen for keystrokes and perform actions based on the following:
     * 
     * - is the key Enter
     * - is the key Backspace
     * - is the key a valid letter
     * - otherwise...
     */
    document.addEventListener('keydown', function (event) {
        // console.log('this event is working!')
        // we want to know the key that was entered. Todo this we add event as parameter in our function
        const action = event.key;
        // console.log(action);
        if (action ===  'Enter') {
            handleCommit();
        } else if (action === 'Backspace') {
            handleBackspace();
        } else if (isLetter(action)) {
            console.log(action)
            addLetter(action.toUpperCase());
        } else {
            // console.log('something else was clicked!')
        }
    })
}

// these are utility functions

function isLetter(action) {
    // Check if keystroke is indeed a letter
    // using regex, we need $
    return /^[a-zA-Z]$/.test(action)
}

// this is to handle duplicate letters

function makeMap(array) {
    // Create object of characters along with amount of occurrences in word.
    const obj = {};
    for (let i = 0; i < array.length; i++) {
        if (obj[array[i]]) {
            obj[array[i]]++
        } else {
            obj[array[i]] = 1
        }
    }
    // console.log(obj);
    return obj;
}

init();