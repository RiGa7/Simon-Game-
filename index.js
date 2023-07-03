var gamePattern = [];

var userClickedPattern = [];

var buttonColors = ["red", "blue", "green", "yellow"];

var started = false;
var level = 0;

$(document).on("keypress click", function () {
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});



$(".btn").on("click", function () {
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);
});


function nextSequence() {

    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    var randonNumber = (Math.floor(Math.random() * 4));
    var randomChosenColor = buttonColors[randonNumber];
    gamePattern.push(randomChosenColor);

    $("#" + randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);


}


function checkAnswer(currentlevel) {
    if (gamePattern[currentlevel] === userClickedPattern[currentlevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    } else {
        var wrong = new Audio("./sounds/wrong.mp3");
        wrong.play();
        $("body").addClass("game-over");
        $("#level-title").html("Game Over <br><small> Press Any key to Restart</small>");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);

        startOver();
    } 
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
    }, 100)

}
function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}

function playSound(name) {
    switch (name) {
        case 'red':
            var audio = new Audio("./sounds/red.mp3");
            audio.play();
            break;
        case 'blue':
            var audio = new Audio("./sounds/blue.mp3");
            audio.play();
            break;
        case 'green':
            var audio = new Audio("./sounds/green.mp3");
            audio.play();
            break;
        case 'yellow':
            var audio = new Audio("./sounds/yellow.mp3");
            audio.play();
            break;
        default:
            console.log("ho");
    }
}