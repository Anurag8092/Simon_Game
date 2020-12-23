//Array
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

//Detect click
$(".btn").click(function(){
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});

var started = false;
var level = 0;

//Start Game
$(".playbtn").click(function(){
  if(!started){
   nextSequence();
   $("#level-title").text("Level " + level);
   started = true;
 }
 animatePlay();
});

//Generate Sequence
function nextSequence(){
  userClickedPattern = [];
  level++;

  $("#level-title").text("Level " + level);

//Generate Random Number
var randomNumber = Math.random()*4;
randomNumber = Math.floor(randomNumber);
var randomChosenColour = buttonColours[randomNumber];

gamePattern.push(randomChosenColour);

//Animate
$("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

playSound(randomChosenColour);
}

//Check Answer
var currentScore = 0;
var bestScore = 0;
function checkAnswer(currentLevel){
  if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
    if(userClickedPattern.length === gamePattern.length){
      currentScore += 10;
      $("#cscore").html("Current<br>Score<br> " + currentScore);
      setTimeout(nextSequence, 1000);
    }
  }

  else{
    if(currentScore > bestScore){
      bestScore = currentScore;
      $("#bscore").html("Best<br>Score<br> " + bestScore);
    }
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over!! Press Play to Restart");
    setTimeout(function(){
      $("body").removeClass("game-over");
    }, 200);
    startOver();
}
}

  //Button Press effect
  function animatePress(currentColour){
    $("#" + currentColour).addClass("pressed");
    setTimeout(function(){
      $("#" + currentColour).removeClass("pressed");
    }, 100);
  }

  function animatePlay(){
    $(".playbtn").addClass("pressed");
    setTimeout(function(){
      $(".playbtn").removeClass("pressed");
    }, 100);
  }

  //Add audio to buttons
  function playSound(name){
    var audio = new Audio("sounds/"+ name +".mp3");
    audio.play();
  }

//Restart Game
  function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
    currentScore = 0;
    $("#cscore").html("Current<br>Score<br> " + currentScore);
  }
