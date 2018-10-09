var gameOfGuess = {
    artist: [
        "AVRILLAVIGNE",
        "THEFATRAT",
        "ADRIANAFIGUEROA"
    ],

    songs: [
        "https://open.spotify.com/embed/track/1N7YeVU0ZwAFbOhwM61ef6",
        "https://open.spotify.com/embed/track/0hTrQoqDmFnA4S1PC265e1",
        "https://open.spotify.com/embed/track/4ARPdzojlX7GOD0vkszLnE"
    ],

    pics: [
        "https://i0.wp.com/nagajournal.com/wp-content/uploads/2018/09/head-above-water.jpeg?fit=950%2C627&ssl=1",
        "https://art.pixilart.com/299c8c3f0a4f6d8.png",
        "http://www.lickmylenscap.com/wp-content/uploads/2017/08/Conbravo-Concert-Adriana-Figueroa-Adrisaurus-II.jpg"
    ],

    songToPlay: [],
    picToGrab: [],
    lifeCount: 15,
    winCount: 0,

    wordToGuess: [],
    DummyArray: [],
    guessedWord: [],

    gameRunning: false,
    gameFinish: true,

    newGuess: function () {
        var randomIndex = [Math.floor(Math.random() * this.artist.length)];
        this.wordToGuess = (this.artist[randomIndex]).split("");
        this.songToPlay = (this.songs[randomIndex]);
        this.picToGrab = (this.pics[randomIndex]);
        return randomIndex;
    },

    initDummyArray: function () {
        for (i = 0; i < this.wordToGuess.length; i++) {
            this.DummyArray.textContent += this.DummyArray.splice(i, 0, " __");
            var todayWord = document.getElementById("toGuess");
            todayWord.textContent = this.DummyArray;
            console.log(todayWord);
        }
    },

    newGame: function () {
        this.wordToGuess = [];
        this.DummyArray = [];
        this.guessedWord = [];
        this.songToPlay = [];
        this.picToGrab = [];
        this.gameFinish = false;
        this.gameRunning = true;
        this.lifeCount = 15;
        this.newGuess();
        this.initDummyArray();
    },

    continueGame: function () {
        this.wordToGuess = [];
        this.DummyArray = [];
        this.guessedWord = [];
        this.songToPlay = [];
        this.picToGrab = [];
        this.gameFinish = false;
        this.gameRunning = true;
        this.newGuess();
        this.initDummyArray();
    },

    loseGame: function () {
        this.gameFinish = true;
        this.gameRunning = false;
        alert("Game over!, You did a great job");
        alert("Your final score is: " + this.winCount);
        this.newGame();
        usedWord.textContent = gameOfGuess.guessedWord;
        elLife.textContent = gameOfGuess.lifeCount;
    },

    wingame: function () {
        this.gameFinish = true;
        this.gameRunning = false;
        alert("Awesome!! Your earn 1 life and enjoy this cool muzic!");
        this.getReward();
        this.continueGame();
        this.lifeCount += 1;
        this.winCount += 1;
        usedWord.textContent = gameOfGuess.guessedWord;
        elLife.textContent = gameOfGuess.lifeCount;
        elScore.textContent = gameOfGuess.winCount;
    },

    checkDummy: function () {
        var dumDum = window.contains(this.DummyArray, " __");
        if (dumDum) {
            return true;
        } else if (!dumDum) {
            this.wingame();
            return false;
        }
    },

    getReward: function () {
        document.getElementById("songReward").setAttribute("src", this.songToPlay);
        document.getElementById("songReward").setAttribute("style", "opacity:1;border-color:white; border-width: 1px; border-style: groove;");
        document.getElementById("picReward").setAttribute("src", this.picToGrab);
        document.getElementById("picReward").setAttribute("style", "opacity:1;border-color:white; border-width: 1px; border-style: groove;");
    }
}


var usedWord = document.getElementById("guessedWord");
var todayWord = document.getElementById("toGuess");
var elLife = document.getElementById("life");
var goodLuck = document.getElementById("pressToStart");
var elScore = document.getElementById("score");


//Get all index of accepted letter
function getAllIndexes(arr, val) {
    var indexes = [], i;
    for (i = 0; i < arr.length; i++)
        if (arr[i] === val)
            indexes.push(i);
    return indexes;
}

//Verify if letter is within expected range
function contains(a, obj) {
    for (var i = 0; i < a.length; i++) {
        if (a[i] === obj) {
            return true;
        }
    }
    return false;
}


//Start the game: 
document.onkeyup = function (event) {
    if (gameOfGuess.gameFinish) {
        //Set life to max, Set start status to 0, Generate new word.
        gameOfGuess.newGame();

        //Start game - Have fun text.
        goodLuck.textContent = ("Have Fun!");

    }


    if (gameOfGuess.gameRunning) {
        //Game start to run.

        document.onkeyup = function (event2) {
            //Check for life
            /*             if (!gameOfGuess.lifeCount == 0) { */

            //Take input make upper case.
            var letter = event2.key.toUpperCase();


            //Verify if letter is already used.
            var guessedWordCheck = contains(gameOfGuess.guessedWord, letter);
            console.log(guessedWordCheck);


            //Letter is used return false.
            if (guessedWordCheck) {
                return false;
            }


            //Letter is not used, next operation.
            if (!guessedWordCheck) {


                //Add letter to usedWord array.
                gameOfGuess.guessedWord.splice(0, 0, letter);
                usedWord.textContent = gameOfGuess.guessedWord;
                console.log(gameOfGuess.guessedWord);

                //Check for score
                var pointCheck = contains(gameOfGuess.wordToGuess, letter);

                //Lose pts if wrong guess.
                if (!pointCheck) {
                    gameOfGuess.lifeCount += -1
                    elLife.textContent = gameOfGuess.lifeCount;
                    if (gameOfGuess.lifeCount == 0) {
                        gameOfGuess.loseGame();
                        return false;
                    } else {
                        return true;
                    }
                }

                //Correct guess, next operation.
                if (pointCheck) {
                    var indexToCheck = getAllIndexes(gameOfGuess.wordToGuess, letter);
                    if (indexToCheck) {

                        //Loop to insert to Dummy array
                        for (i = 0; i < indexToCheck.length; i++) {
                            gameOfGuess.DummyArray.splice(indexToCheck[i], 1, letter);
                            todayWord.textContent = gameOfGuess.DummyArray;
                            gameOfGuess.checkDummy();
                        }
                    }
                }
            }
            /*             } else {
                            gameOfGuess.loseGame();
                            return false;
                        } */
        }
    }


}




