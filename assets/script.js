

// Let's make a quiz! About JavaScript!

// Let's make some variables!
var secondsLeft = 75;
var correct = {
    answer1: questions[0].answer, 
    answer2: questions[1].answer, 
    answer3: questions[2].answer, 
    answer4: questions[3].answer, 
    answer5: questions[4].answer
}

var score;
var userChoice;
var playerName;
var playerScore;


// element grabbers
var startbtn = document.querySelector("#startbtn"); // this grabs the start button for the click eventListener
var title = document.querySelector(".title");  // this is the main content div
var h1El = document.querySelector("h1"); // this is where each question goes
var container = document.querySelector(".container");
var rainbow = document.querySelector("#red");
var scorebox = document.querySelector(".scorebox");
var highbtn = document.querySelector("#highbtn");
var scorediv = document.querySelector("#scorediv");
var highscore = document.querySelector("#highscore");

/* my solution for needing each one of these to be targetable individually
later on so I can replace their contents with new choices for each question
and I'm sure there's a more elegant solution but I haven't found it yet*/
// element creators
var divElArr = {
    div1: document.createElement("div"),
    div2: document.createElement("div"),
    div3: document.createElement("div"),
    div4: document.createElement("div"),
    countdiv: document.createElement("div")
}
var adivArr = ["adiv1", "adiv2", "adiv3", "adiv4"];
var i = 0;

var prevPlayer = localStorage.getItem("PlayerName");
var prevScore = localStorage.getItem("PlayerScore");
renderLastRegistered();


function renderLastRegistered(){
    if (prevPlayer === null || prevScore === null) {
        return;
    }

    else {
        document.querySelector("#highscore").textContent = prevPlayer + ": " + prevScore;
    }
}


highbtn.addEventListener("click", function (event){
    event.stopPropagation();
    renderLastRegistered();
    if (highscore.getAttribute("style") === "display: block;") {
    document.querySelector("#highscore").setAttribute("style", "display: none;")
    }
    else {
        document.querySelector("#highscore").setAttribute("style", "display: block;")
    }
});

function correctSound() {
    let sound = document.querySelector("#audiocorrect");
    sound.play();
}

function incorrectSound() {
    let sound = document.querySelector("#audiowrong");
    sound.play();
}


function playGame(event) {
    event.stopPropagation();
    score = 0;
    
    // With this function the first thing it does is rewrite the html to give us questions[0]
    h1El.textContent = questions[0].title;
    h1El.id = "h1El"
    // then remove the rainbow container with the start quiz button
    container.removeChild(rainbow);
    // then add all the new content somehow from the question array

    /* I'm not sure how to do this in a for loop when they all need to be different ids so that they can
    be grabbed separately. And I tried everything I could think of to make these be buttons intead of divs for
    accessibility reasons but I absolutely could not get data- to work on them to make them (potentially) selectable separately later, 
    and trying to add different ids to them in a nested loop sounds like a headache waiting to happen. Trying to add a data- attribute
    broke everything no matter what I did and I ABSOLUTELY could not work around by removing all the buttons with the
    choices in them and re-making/appending them with the new set of choices because I couldn't remove them all, just the first one, 
    even with a for loop, so the new buttons were just appending onto the old ones and stacking up and honestly it made me feel so stupid I 
    had to ctrl+z back to where things were working with divs because I was about to have a breakdown. I tried EVERYTHING I could think of.
    JavaScript was going great until now and I'm questioning if I've been an idiot this whole time and just THOUGHT js was making sense. 
    I feel really stupid and discouraged. I wanted this to be as clean and clear and simple as I could make it and I'm really disappointed 
    that this awful mess is the best I was able to do. It works but I'll probably lose points for doing everything is a dumb workaround way and 
    I've lost momentum */
    container.appendChild(divElArr.div1).id = "adiv1";
    document.querySelector("#adiv1").textContent = questions[0].choices[0];
    container.appendChild(divElArr.div2).id = "adiv2";
    document.querySelector("#adiv2").textContent = questions[0].choices[1];
    container.appendChild(divElArr.div3).id = "adiv3";
    document.querySelector("#adiv3").textContent = questions[0].choices[2];
    container.appendChild(divElArr.div4).id = "adiv4";
    document.querySelector("#adiv4").textContent = questions[0].choices[3];
    
    
    
    title.appendChild(divElArr.countdiv).id = "countdiv";
    
    
    // we need a timer with setInterval()
    var interval = setInterval(function(){
        secondsLeft--;
        document.querySelector("#countdiv").textContent = "Time Left: " + secondsLeft;
        if (secondsLeft === 0) {
            clearInterval(interval);
            console.log("GAME OVER!");
            document.querySelector("#countdiv").textContent = "Seconds Left: 0";
            document.querySelector("#scorediv").textContent = "Final score:" + score;
            clearInterval(interval);
            container.appendChild(divElArr.div1).id = "restartdiv";
            document.querySelector("#restartdiv").textContent = "Play Again?";
            document.querySelector("#restartdiv").addEventListener("click", function(event){
            event.stopPropagation();
            location.reload();
                });

                setTimeout(function() {
                    playerName = prompt("Enter your initials to save your score!");
                    playerScore = score;
                    localStorage.setItem("PlayerName", playerName);
                    localStorage.setItem("PlayerScore", playerScore);
                    
                }, 300);
            renderLastRegistered();
        }
    }, 1000);
    
    // Next an eventListener for div clicks
    container.addEventListener("click", function(event){
        event.stopPropagation();
        // console.log(event);
        userChoice = event.target.textContent;
        if (event.target.matches("div")) {
            i++;
            console.log(i)
                // using i++ to advance i every time the click even happens I can shuffle 
                // through the question sets. This took a lot of trial and error to arrive at
                if (i === 1){
                h1El.textContent = questions[i].title;
                document.querySelector("#adiv1").textContent = questions[i].choices[0];
                document.querySelector("#adiv2").textContent = questions[i].choices[1];
                document.querySelector("#adiv3").textContent = questions[i].choices[2];
                document.querySelector("#adiv4").textContent = questions[i].choices[3];
            }
                if (i === 2){
                h1El.textContent = questions[i].title;
                document.querySelector("#adiv1").textContent = questions[i].choices[0];
                document.querySelector("#adiv2").textContent = questions[i].choices[1];
                document.querySelector("#adiv3").textContent = questions[i].choices[2];
                document.querySelector("#adiv4").textContent = questions[i].choices[3];
            }
                if (i === 3){
                h1El.textContent = questions[i].title;
                document.querySelector("#adiv1").textContent = questions[i].choices[0];
                document.querySelector("#adiv2").textContent = questions[i].choices[1];
                document.querySelector("#adiv3").textContent = questions[i].choices[2];
                document.querySelector("#adiv4").textContent = questions[i].choices[3];
            }
                if (i === 4){
                h1El.textContent = questions[i].title;
                document.querySelector("#adiv1").textContent = questions[i].choices[0];
                document.querySelector("#adiv2").textContent = questions[i].choices[1];
                document.querySelector("#adiv3").textContent = questions[i].choices[2];
                document.querySelector("#adiv4").textContent = questions[i].choices[3];
            }

            if (i > 4) {
                h1El.textContent = "GAME OVER!"
                container.removeChild(document.querySelector("#adiv1"));
                container.removeChild(document.querySelector("#adiv2"));
                container.removeChild(document.querySelector("#adiv3"));
                container.removeChild(document.querySelector("#adiv4"));
                
                document.querySelector("#countdiv").textContent = "Seconds Left: 0";
                document.querySelector("#scorediv").textContent = "Final score:" + score;
                clearInterval(interval);
                container.appendChild(divElArr.div1).id = "restartdiv";
                document.querySelector("#restartdiv").textContent = "Play Again?";
                document.querySelector("#restartdiv").addEventListener("click", function(event){
                    event.stopPropagation();
                    location.reload();
                });

                setTimeout(() => {
                    playerName = prompt("Enter your initials to save your score!");
                    playerScore = score;
                    localStorage.setItem("PlayerName", playerName);
                    localStorage.setItem("PlayerScore", playerScore);
                    renderLastRegistered();
                    
                }, 500);
            }


            if (userChoice === correct.answer1 || userChoice === correct.answer2 || userChoice === correct.answer3 || userChoice === correct.answer4 || userChoice === correct.answer5) {
                score = score + 20;
                correctSound();
                console.log("correct! you chose", userChoice);
                console.log("score: ", score);
                scorediv.textContent = "Your Score:" + score;
                return score;
            }
            
            else {
                console.log("worng!")
                score = score - 10;
                incorrectSound();
                console.log("score: ", score);
                secondsLeft = secondsLeft - 5;
                console.log("seconds left: ", secondsLeft);
                scorediv.textContent = "Your Score:" + score;
                return score;
            }            
        }
    })    
    scorediv.textContent = "Your Score:" + score;
}

startbtn.addEventListener("click", playGame);



