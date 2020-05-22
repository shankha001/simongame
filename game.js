
var buttonColours=["red", "blue", "green", "yellow"];
var userClickedPattern = [];
var gamePattern=[];
var level = 0;
var started = false;

$(".btn").on("click", function(){
  var userChosenColour=$(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
  // console.log(userClickedPattern);
});

$("body").on("keydown" ,function(){
  if(!started){
    $("#level-title").text("Level "+level);
    nextSequence();
    started=true;
  }
});

function nextSequence(){
  userClickedPattern=[];
  level++;
    $("#level-title").text("Level " + level);
  var randomNumber=Math.floor(Math.random()*4);
  var randomChosenColour=buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

function playSound(name){
  var audio=new Audio("sounds/"+name+".mp3");
  audio.play();
}
function animatePress(animatebtn){
  $("#"+animatebtn).addClass("pressed");
  setTimeout(function(){  $("#"+animatebtn).removeClass("pressed"); },100);
}
function checkAnswer(currentLevel) {

    //3. Write an if statement inside checkAnswer() to check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      console.log("success");
      //4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
      if (userClickedPattern.length === gamePattern.length){
        //5. Call nextSequence() after a 1000 millisecond delay.
        setTimeout(function () {
          nextSequence();
        }, 1000);

      }

    } else {

      console.log("wrong");
      playSound("wrong");
      $("body").addClass("game-over");
      setTimeout(function(){$("body").removeClass("game-over");},200);
      $("#level-title").text("Game Over, Press Any Key to Restart");
      // $("body").on("keydown", function(){startOver();});
        startOver();
    }

}

function startOver(){
  level = 0;
  gamePattern = [];
  started = false;
}
