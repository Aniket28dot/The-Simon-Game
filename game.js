
let gamePattern = [];
let buttonColours = ["red", "blue", "green", "yellow"];
let userClickedPattern = [];

var check = 0;
var level = 0;

$("h1").click(function () {
    if (check == 0) {
        nextSequence();
    }
})

function nextSequence() {

    userClickedPattern = [];
    level = level + 1;
    $("h1").text("Level " + level);
    check = 1;
    var randomNumber = Math.random()*4;
    randomNumber = Math.floor(randomNumber);

    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeOut(10).fadeIn(50).fadeOut(50).fadeIn(10); //flashing in button.

    playSound(randomChosenColour);
}

$(".btn").click(function () {

    var userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
 });

 function playSound(name) {

    if (name == "red") {
        var red = new Audio("sounds/red.mp3");
        red.play();
    }
    else if (name == "yellow") {
        var yellow = new Audio("sounds/yellow.mp3");
        yellow.play();
    }
    else if (name == "blue") {
        var blue = new Audio("sounds/blue.mp3");
        blue.play();
    }
    else if (name == "green") {
        var green = new Audio("sounds/green.mp3");
        green.play();
    }
    else {
        var wrong = new Audio("sounds/wrong.mp3");
        wrong.play();
    }

 }

 function animatePress(currentColour) {
     $("." + currentColour).addClass("pressed");

     setTimeout(() => {
         $("." + currentColour).removeClass("pressed");
     }, 100);
 }

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] == userClickedPattern[currentLevel]) {
        if (currentLevel == gamePattern.length - 1) {
            setTimeout(() => {
                nextSequence();
            }, 1000);
        }
    }
    else {
        $("h1").text("Game Over, Click on me to Restart.");
        startOver();
        $("body").addClass("game-over");
        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 200);
        playSound("wrong");
    }
}

function startOver() {
    check = 0;
    level = 0;
    gamePattern = [];
}
