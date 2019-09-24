// ############################################## CARD ######################################################

// ----------------------------------------------- ADD ALL CARD -----------------------------------------------------

var wordDict = {};
var btnFlip = document.getElementById("btnFlip");
var cardDeck = document.getElementById("cardDeck");

// WORD OBJECT
function Word() {
    // List of every word in this card
    this.wordList = Array.prototype.slice.call(arguments);

    // Index of current word, return -1 if there are no word
    this.currentWord = (this.wordList.length > 0) ? 0 : -1;

    // Method to add new word(s)
    this.addWord = function () {
        newWord = Array.prototype.slice.call(arguments);
        for (let i = 0; i < newWord.length; i++) {
            if (this.wordList.indexOf(newWord[i]) != -1) {
                console.error("This card has " + newWord[i] + " already!");
            } else {
                this.wordList.push(newWord[i]);
            }
        }
        if (this.wordList.length > 0 && this.currentWord == -1) this.currentWord = 0;
    }

    // Get current word, empty string if there are no word
    this.getCurrentWord = function () {
        if (this.currentWord == -1) {
            return "";
        }
        return this.wordList[this.currentWord];
    }

    // Get word by index, empty string if there are no word
    this.getWord = function (index) {
        if (index < 0 || index >= this.wordList.length) {
            console.error("WRONG INDEX (Word.getWord)");
            return "";
        }

        this.currentWord = index;
        return this.wordList[index];
    }

    // Get next word (by index)
    this.getNextWord = function () {
        this.currentWord = (this.currentWord == this.wordList.length - 1) ? 0 : this.currentWord + 1;
        return this.wordList[this.currentWord];
    }

    // Get previous word (by index)
    this.getPrevWord = function () {
        this.currentWord = (this.currentWord == 0) ? this.wordList.length - 1 : this.currentWord - 1;
        return this.wordList[this.currentWord];
    }
}

// ADD TEST WORD
wordDict["word01"] = new Word("Dog", "หมา", "狗");
wordDict["word02"] = new Word("Cat", "แมว", "猫");
wordDict["word03"] = new Word("Ant", "มด", "蚂蚁");

// FUNCTION TO ADD NEW CARD TO THE DECK
function addNewCard(wordID) {

    var activeText = "";
    if (cardDeck.getElementsByClassName("Card").length > cardDeck.getElementsByClassName("Card-hidden").length) {
        activeText = "Card-hidden";
    }

    var englishWord = wordDict[wordID].getCurrentWord();
    var elementString = "<div class=\"Card " + activeText + "\" id=\"Card_" + wordID + "\">" + englishWord + "</div>"

    cardDeck.innerHTML += elementString;
    console.log("ADD NEW CARD: " + wordID);
};

// ADD NEW CARD TO THE DECK (USE THE FUNCTION)
for (const key in wordDict) {
    addNewCard(key);
};

// ----------------------------------------------- ADD ALL CARD DONE -----------------------------------------------------

// FUNCTION TO FLIP CARD (CHANGE WORD)
function flipCard(deck) {

    if (deck.busy == true) {
        console.error("IT IS BUSY, PLEASE WAIT!");
        return;
    }

    try {
        var currentCard = deck.slides[deck.current];
        var wordID = currentCard.id.substring(5);

        if (wordDict[wordID].currentCard == -1) {
            console.error("This card has no word!");
            return;
        }
    } catch (err) {
        console.error("This is not a card!");
        return;
    }

    // SET BUSY TO 'TRUE'
    deck.busy = true;

    currentCard.className += " Card-flip";
    currentCard.addEventListener("transitionend", flipDone);

    function flipDone() {
        currentCard.removeEventListener("transitionend", flipDone);
        currentCard.classList.remove("Card-flip");
        currentCard.innerHTML = wordDict[wordID].getNextWord();
        currentCard.addEventListener("transitionend", flipReallyDone);
    }

    function flipReallyDone() {
        deck.busy = false;
        console.log("Flip Card " + wordID + " done");
        currentCard.removeEventListener("transitionend", flipReallyDone);
    }
};

// ########################################### END OF CARD ###################################################


// ############################################ CAROUSEL ####################################################

// Carousel OBJECT
function Carousel(containerID) {
    this.container = document.getElementById(containerID) || document.getElementsByClassName("Card-Deck")[0];
    this.slides = this.container.children;
    //this.totalSlides = this.slides.length;
    this.width = function () {
        return this.container.offsetWidth;
    }
    this.height = function () {
        return this.container.offsetHeight;
    }
    this.current = 0;

}

// CHECK IF IT IS BUSY
Carousel.prototype.busy = false;

// FUNCTION FOR HANDLE CARD IN OUT
Carousel.prototype.cardInOut = function (indexIn, indexOut, classIn, classOut) {

    // CARD LEFT OUT
    this.slides[indexOut].className = classOut;
    // console.log(this.slides[indexOut].className);

    // ADD LISTENER FOR EVENT END
    this.slides[indexOut].addEventListener("transitionend", cardOutDone);
    this.slides[indexOut].addEventListener("webkitTransitionEnd", cardOutDone);
    this.slides[indexIn].addEventListener("transitionend", cardInDone);
    this.slides[indexIn].addEventListener("webkitTransitionEnd", cardInDone);

    // START IN CARD
    this.slides[indexIn].className = classIn;

    // SET THIS SLIDES AND THIS CAROUSEL
    slides = this.slides;
    var thisCarousel = this;

    // FUNCTION FOR CARD IN TO START
    function cardOutDone() {
        console.log("CARD " + indexOut.toString() + " IS OUT");
        slides[indexOut].className = "Card Card-hidden";
        slides[indexIn].className = "Card";
        slides[indexOut].removeEventListener("transitionend", cardOutDone);
        slides[indexOut].removeEventListener("webkitTransitionEnd", cardOutDone);
    }

    // FUNCTION FOR CARD IN DONE
    function cardInDone() {
        console.log("CARD " + indexIn.toString() + " IS IN");
        //slides[indexIn].className = "Card";
        slides[indexIn].removeEventListener("transitionend", cardInDone);
        slides[indexIn].removeEventListener("webkitTransitionEnd", cardInDone);
        thisCarousel.busy = false;
    }

}

// NEXT CAROUSEL
Carousel.prototype.next = function () {

    if (this.busy == true) {
        console.error("IT IS SLIDING, PLEASE WAIT!");
        return;
    }

    // SET BUSY TO 'TRUE'
    this.busy = true;

    // SET INDEX IN AND INDEX OUT
    var indexIn, indexOut = this.current;
    (this.current + 1 === this.slides.length) ? this.current = 0 : this.current++;
    indexIn = this.current;

    // CARD IN AND OUT FUNCTION
    this.cardInOut(indexIn, indexOut, "Card Card-right", "Card Card-left");
}

// PREVIOUS CAROUSEL
Carousel.prototype.prev = function () {

    if (this.busy == true) {
        console.error("IT IS SLIDING, PLEASE WAIT!");
        return;
    }

    // SET BUSY TO 'TRUE'
    this.busy = true;

    // SET INDEX IN AND INDEX OUT
    var indexIn, indexOut = this.current;
    (this.current === 0) ? this.current = this.slides.length - 1 : this.current--;
    indexIn = this.current;

    // CARD IN AND OUT FUNCTION
    this.cardInOut(indexIn, indexOut, "Card Card-left", "Card Card-right");
}

// ##################################### END OF CAROUSEL ###############################################

function clickAddWord(){
    var newWord = document.getElementById("txtAddWord").value;
    newWordList = newWord.split(",");
    var newID = Object.keys(wordDict).length + 1
    newID = (newID < 10 ? '0' : '') + newID
    var newWordID = "word" + Object.keys(wordDict).length.toString()
}