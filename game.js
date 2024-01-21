var started = false;
var level = 0;

var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

$(document).keypress(function(x)
{
  if(started==false)
  { nextSequence();
    started = true;
  }});

$(".btn").click(function (){
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
});
  

function nextSequence(){
  level++;
  $("#level-title").text("Level "+ level);
  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

function playSound(name){
  var audio = new Audio("sounds/"+name+".mp3");
  audio.play();
}

function animatePress(currentColour){
  $("#"+currentColour).addClass("pressed");
  setTimeout(function(){$("#"+currentColour).removeClass("pressed");},100);
}

function checkAnswer(currentlevel)
{
  if(gamePattern[currentlevel] === userClickedPattern[currentlevel])
    {   console.log("success");
          if(gamePattern.length === userClickedPattern.length)
          {
            userClickedPattern = [];
            setTimeout(function () {
              nextSequence();
            }, 1000);
          }
    }
  else
    {
      var audio = new Audio("sounds/wrong.mp3");
      audio.play();
      $("body").addClass("game-over");
      setTimeout(function(){$("body").removeClass("game-over")},200);
      $("#level-title").text("Game Over, Press Any Key to Restart");
      startOver();
    }
}

function startOver()
{
  level = 0;
  gamePattern = [];
  started = false;
  userClickedPattern = [];
}