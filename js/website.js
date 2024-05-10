/** This javascript file is responsible for the logic that makes the DodgeBall game function. The javascript also makes up the functionality behind the buttons
that are found on the html page, so when they are clicked, the game is either reset, paused, or the difficulty is changed. The game uses svg shape drawings 
as the game items/objects, and randomly re-places them on the game screen to simulate the constant falling of the shapes. The goal of the user is to avoid the
obstacles, and make contact with the other items which increases their overall score. The users score will increase for every second they stay alive, and by 
interacting with the other objects, they can increase their score even more. However, interacting with the other oibjects will either cause the players ball 
to grow, or shrink, maker it easier, and harder to avoid the obstacles.
*/

/** BRENDAN DILEO, 000879513. USE OF BOOTSTRAP, AND HELP OF W3SCHOOLS */
/** SA0001: I BRENDAN JOHN DILEO, 000879513 certify that this material is my original work. No other person's work has been used without due acknowledgement. I have not made my work available to anyone else. */


// Here I have assigned each variable with its corresponding element from the html page using the 'document.getElementById' funciton. 
// This allows for ease of use later on in the code, without having to repeat the 'getDocument' line for every time I will need to 
// utilize an element. The game screen, the ball the user will control (Dodgeball), the obstacles, the grow items, the shrink items,
// the scoreboard, and the highscore are all initialized to the corresponding variable.
let gameStage = document.getElementById("stage");
let ball = document.getElementById("dodgeBall");
let obstacle1 = document.getElementById("dodgeObject1");
let obstacle2 = document.getElementById("dodgeObject2");
let obstacle3 = document.getElementById("dodgeObject3");
let obstacle4 = document.getElementById("dodgeObject4");
let obstacle5 = document.getElementById("dodgeObject5");
let obstacle6 = document.getElementById("dodgeObject6");
let obstacle7 = document.getElementById("dodgeObject7");
let obstacle8 = document.getElementById("dodgeObject8");
let obstacle9 = document.getElementById("dodgeObject9");
let obstacle10 = document.getElementById("dodgeObject10");
let growItem = document.getElementById("growObject");
let growItem2 = document.getElementById("growObject2");
let shrinkItem = document.getElementById("shrinkObject");
let score = document.getElementById("score");
let highScore = document.getElementById("highScore");

// The variables 'gameWidth' and 'gameHeight' are declared and initialized to set values, where both these variables will act as
// the height and the width of the game screen. The game screen, despite being 700x700 on the html page, is slightly changed within 
// this code in order to prevent items from appearing off of the game screen (Width wise). Despite the actual svg width being 700, 
// I continued to have issues with items appearing off the screen, so after some trial and  error, I found the width of 480 was the
// perfect size where everything appeared on the screen, all the time.
let gameWidth = 480;
let gameHeight = 700;

// The variable 'ballRadius' represents the radius of the ball the user will be controlling. This will be the Dodgeball. This value
// may change in the future, depending on wether or not the user has interacted with a grow, or shrink item.
let ballRadius = 10;

// The variable 'scoreValue' is declared, and initialized to 0 as default. This variable is what will keep track of the users score.
let scoreValue = 0;

// The variable 'highScoreValue' is declared, and initialized to 0 as default. This variable is what will keep track of the users high
// score, and will depend on the users current score.
let highScoreValue = 0;

// The variable 'gameOverStatus' acts as a boolean flag which will help determine if the game's status. Initially the variable is declared,
// and initialized to false as default.
let gameOverStatus = false;

// The 'gamePaused' variable is declared, and initialized to false as defualt, as the game will not start paused. This variable will also
// act as a boolean flag helping determine if the user has paused the game or not. I have not yet implemented the logic for this, but I have
// the button in my html. My goal is to allow the user to pause the game screen, change the text of the button, and then let them resume.
let gamePaused = false;

// This variable 'difficultyHard' is initialized to false as default upon declaration. This variable will be used to determine the difficulty
// the user has chosen from the difficulty buttons. Depending on the difficulty the user has chosen, the speed of the game will be increased,
// or changed back to its default difficulty.
let difficultyHard = false;

// The variables 'ballPosX' and 'ballPosY' are delcared, and both are initialized to 100 as a defualt value. They represent the starting postisions
// of the ball the user will be controlling (DodgeBall). The 'ballPosX' represents the starting postision along the 'x' axis, and the 'ballPosY'
// represents the starting postision along the 'y' axis.
let ballPosX = 100;
let ballPosY = 100;

// Both variables that have been declared here 'ballSpeedX' and 'ballSpeedY' represent the speed that the ball controlled by the user will
// travel along the 'x', and 'y' axis of the game screen. Both variables are initialized to 0 as default.
let ballSpeedX = 0;
let ballSpeedY = 0;

// The variables 'obstacle1PosY', and 'obstacle1SpeedY' represent the first obstacles default postision along the 'y' axis, and how fast the obstacle
// will travel along the 'y' axis (Fall down via the game screen).
let obstacle1PosY = 0;
let obstacle1SpeedY = 2;
// The 'obstacle1PosX' variable is declared, but not yet initialized for now as it will be determined randomly later in the code via the use of a 
// helper function for generating a random 'x' postision.
let obstacle1PosX;

// The variables 'obstacle2PosY', and 'obstacle2SpeedY' represent the second obstacles default postision along the 'y' axis, and how fast the obstacle
// will travel along the 'y' axis (Fall down).
let obstacle2PosY = 0;
let obstacle2SpeedY = 2;
// The 'obstacle2PosX' variable is declared, but not yet initialized for now as it will be determined randomly later on in the code through a function.
let obstacle2PosX;

// Variables 'obstacle3PosY', and 'obstacle3SpeedY' represent the third obstacles default postision along the 'y' axis, and how fast the obstacle
// will travel along the 'y' axis (Fall down along the game screen).
let obstacle3PosY = 0;
let obstacle3SpeedY = 2;
// The 'obstacle3PosX' variable is declared, but not yet initialized for now as it will be determined randomly later in the code.
let obstacle3PosX;

// The variables 'obstacle4PosY', and 'obstacle4SpeedY' represent the fourth obstacles default postision along the 'y' axis, and how fast the obstacle
// will travel along the 'y' axis (Fall down along the game screen). The fourth obstacle will be slightly faster than the third, second, and first 
// obstacles in terms of the speed it will fall down at. This is to add some difficulty to the game.
let obstacle4PosY = 0;
let obstacle4SpeedY = 3;
// The 'obstacle4PosX' variable is declared, but not yet initialized for now as it will be determined randomly in a seperate helper function.
let obstacle4PosX;

// Variables 'obstacle5PosY', and 'obstacle5SpeedY' represent the fifth obstacles default postision along the 'y' axis, and how fast the obstacle
// will travel along the 'y' axis (Fall down). The fifth obstacle will be slightly faster than the fourth obstacle in terms of its falling down speed
// to incorporate some challenge in the game.
let obstacle5PosY = 0;
let obstacle5SpeedY = 4;
// The 'obstacle5PosX' variable is declared, but not yet initialized for now as it will be determined randomly.
let obstacle5PosX;

// Variables 'obstacle6PosY', and 'obstacle6SpeedY' represent the sixth obstacles default postision along the 'y' axis, and how fast the obstacle
// will travel along the 'y' axis (Fall down). The sixth obstacle will have the same falling down speed (speed along the y axis) as the fifth obstacle.
let obstacle6PosY = 0;
let obstacle6SpeedY = 4;
// The 'obstacle6PosX' variable is declared, but not yet initialized for now as it will be determined randomly.
let obstacle6PosX;

// Variables 'obstacle7PosY', and 'obstacle7SpeedY' represent the seventh obstacles default postision along the 'y' axis, and how fast the obstacle
// will travel along the 'y' axis (Fall down). The seventh obstacle will feature the same speed as the six and fifth obstacles.
let obstacle7PosY = 0;
let obstacle7SpeedY = 4;
// The 'obstacle7PosX' variable is declared, but not yet initialized for now as it will be determined randomly.
let obstacle7PosX;

// Variables 'obstacle8PosY', and 'obstacle8SpeedY' represent the eigth obstacles default postision along the 'y' axis, and how fast the obstacle
// will travel along the 'y' axis (Fall down). The eigth obstacle will have a falling down speed of slightly higher than the seventh, sixth, and 
// fifth obstacles speed along the 'y' axis.
let obstacle8PosY = 0;
let obstacle8SpeedY = 5;
// The 'obstacle8PosX' variable is declared, but not yet initialized for now as it will be determined randomly.
let obstacle8PosX;

// Variables 'obstacle9PosY', and 'obstacle9SpeedY' represent the ninth obstacles default postision along the 'y' axis, and how fast the obstacle
// will travel along the 'y' axis (Fall down). The ninth obstacle falling down speed will be equivalent to the eight obstacles speed.
let obstacle9PosY = 0;
let obstacle9SpeedY = 5;
// The 'obstacle9PosX' variable is declared, but not yet initialized for now as it will be determined randomly later in the code.
let obstacle9PosX;

// Variables 'obstacle10PosY', and 'obstacle10SpeedY' represent the tenth obstacles default postision along the 'y' axis, and how fast the obstacle
// will travel along the 'y' axis (Fall down). The tenth obstacles falling down speed will be equivalent to the ninth, and eigth obstacles speed and
// this will be the fastest a obstacle will fall down on the normal difficulty.
let obstacle10PosY = 0;
let obstacle10SpeedY = 5;
// The 'obstacle10PosX' variable is declared, but not yet initialized for now as it will be determined randomly later on in the code.
let obstacle10PosX;

// This variable 'growItemPosY' intializes a default value for the first grow items 'y' postision, and the 'growItemSpeedY' represents the first grow
// items falling down speed. The falling down speed is the speed at which the grow item will travel down the game screen.
let growItemPosY = 0;
let growItemSpeedY = 2;
// The 'growItemPosX' is declared, but not yet initialized for now as it will be determined randomly. This variable will use the helper function
// later on in the code to establish a random 'x' postision.
let growItemPosX;

// This variable 'growItem2PosY' intializes a default value for the first grow items 'y' postision, and the 'growItem2SpeedY' represents the first grow
// items falling down speed.
let growItem2PosY = 0;
let growItem2SpeedY = 2;
// The 'growItem2PosX' is declared, but not yet initialized for now as it will be determined randomly.
let growItem2PosX;

// The radius for the first grow item is 15, and the same is for the second grow item. Neither of these values will change.
let growItemRadius = 15;
let growItem2Radius = 15;

// The variable 'shrinkItemPosY' represents a default value for the shrink items postision along the 'y' axis. The 'shrinkItemSpeedY' 
// represents the speed at which the shrink item will fall down by along the 'y' axis.
let shrinkItemPosY = 0;
let shrinkItemSpeedY = 4;
// The 'shrinkItemPosX' is declared, but not yet initialized for now as it will be determined randomly with the use of a helper function
// later on in the code.
let shrinkItemPosX;

// The radius for the shrink item is 15, this will not be changed in the future.
let shrinkItemRadius = 15;

// The variable 'collisionRange' is responsible for keeping track of the range/distance between two objects, where if one object is within this 
// range, it will mean the objects have collided. I have chosen the value of 10 as it worked best after doing some trial and error. Initially in
// my game I had this set to 25, but this was too large of a range, and I was running into issues where items were touching, but nothing was 
// happening because the range I had set was too large. I found 10 was a good range and visually worked aswell.
let collisionRange = 10;

// This function is responsible for alerting the user with extra inforamtion if they press the 'help' button found on the html page.
// The function uses the built in 'alert' method provided by javascript to prompt the message to the user giving them a bit of insight 
// on how to play the game.
function helpAlert() {
    // Uses the built in alert function.
    alert("If using a keyboard, use the 'w', 'a', 's', 'd' keys to move the ball around. If using a mouse, move the mouse around to move the ball. To switch from the two options, you may need to refresh if you are stuck on the mouse. To pause the game, press the pause button. To reset the game, press the reset button.");
}

// This function 'resetGameScreen' is responsible for resetting the game screen when the reset button found on the html is pressed. It calls the other 
// function 'initialGameState', initialized later in the code which brings the game back to the state it was at before it was played. It defaults all
// postisions, scores, and speeds to the default values that were set.
function resetGameScreen() {
    // Calls upon the 'initialGameState' function.
    initialGameState();
}

// The purpose of the 'pauseGame' function is to allow the user to pause the game screen when they press the pause button which is found
// on the html page. It acesses the 'gamePaused' variable which will be used to manipulate the state of the game. The variable 'gamePaused'
// is a boolean flag variable declared and initialized earlier in the code to be utilized in this fucntion.
function pauseGame() {
    // Declares and initializes a variable 'pauseButton' and saves the element 'pauseGameButton' from the html page into it.
    let pauseButton = document.getElementById("pauseGameButton");
    // The 'gamePaused' variable is reassigned to the negation of the variable, which in turn reassigns the variable to true.
    // This means the variable is reassigned to true to indicate the game screen will now be paused.
    gamePaused = !gamePaused;
    // If the game is paused, indicated by the if statements condition 'if (gamePaused)'.
    if (gamePaused) {
        // If the game is paused, the text within the button is changed to "Resume" to simulate the user having the option to resume the
        // game after pausing. The text is changed by accessing the elements text with 'textContent'.
        pauseButton.textContent = "Resume";
    } else {
        // If the game is not paused, the text within the button is changed, or stays as 'Pause' to simulate that the user can pause the
        // game.
        pauseButton.textContent = "Pause";
        // The inner if statement checks if the game is over before updating the game screen.
        // I implemented this inner if statement as I was running into a problem where the games
        // speed was constantly increasing, which is why I implemented the if statement.
        if (!gameOverStatus) {
            // This line recalls the animations frame, which schedules/resets the function to be called
            // before the game screen is changed back to the initial state.
            requestAnimationFrame(dodgeBallGame);
        }
    }
}
// The button 'pauseGameButton' found on the html page is grabbed using the 'getElementById' function, and adds an event listener so when
// the button is clicked, the 'pauseGame' function is called, simulating the pause of the game. The "click" in the brackets implies that 
// when the button is clicked, the function will execute.
document.getElementById("pauseGameButton").addEventListener("click", pauseGame);

// This is a helper function responsible for generating a random 'x' postision along the x axis. The purpose of this method is so that for 
// each item, after it has fallen down, it will be assigned a random 'x' postision so that the items dont continue to fall at the same place.
function randomPosX() {
    return Math.floor(Math.random() * gameWidth);
}

// This function 'gameOver' is for the end of the game, when the user has died. The game over function sets the 'gameOverStatus' boolean
// flag to true, which indicates that the game is now over. It will also make use of the built in 'alert' function, which will alert the 
// users screen that the game is over, and then will call the 'intialGameState' function to bring the game screen back to its initial state.
function gameOver() {
    // Boolean flag for the games status is assigned to true, this simulates the game now being over.
    gameOverStatus = true;
    // Prompts the users screen that the game is over with the use of the alert function.
    alert("Game Over!")
    // Calls the 'initialGameState' function to bring the game back to its initial state.
    initialGameState();
}

// The purpose of the 'ballInBoundaries' function is to check if, and when the user controlled ball (DodgeBall) is outside of the game screen,
// as if it is, this will cause the user to die, and will end the game. Initially I was using the values I had set for the game screens height
// and width, but since the ball had a different radius/size than the items, I had to manually enter values to validate the ball being in bounds.
function ballInBoundaries() {
    // The function uses an if statement, and the 'OR' comparison operator to check if the balls postision along the 'x' and 'y' axis 
    // exceeds -100, or 650 for the 'x' axis, and '150' and '-500' for the 'y' axis. This ensures that if the ball exceeds these values,
    // the corresponding 'gameOver' method is called, which will end the game.
    if (ballPosX < -100 || ballPosX > 650 || ballPosY > 150 || ballPosY < -500) {
        // Debug. I was having problems with the ball radius exceeding the game screens dimensions, and the game still not ending. 
        // So I used this log statement to check at which point the ball was going out of boundaries, and used those values.
        console.log("Balls went out of boundaries at: X: " + ballPosX + ", Y: " + ballPosY)
        // Calls the 'gameOver' function to end the game if the ball exceeds those values, which means it went out of bounds.
        gameOver();
    }
}

// This function is reponsible for moving the ball along the game screens 'x' axis and the 'y' axis. It increments the balls 'x' postision
// given the balls movement speed, which simulates the ball moving side to side. Similarly the balls 'y' postision is incremented by the
// speed the ball travels along the 'y' axis simulating the ball moving up and down.
function moveBall() {
    // Increments the balls 'x' postision by the balls movement speed along the 'x' axis.
    ballPosX = ballPosX + ballSpeedX;
    // Increments the balls 'y' postision by the balls movement speed along the 'y' axis.
    ballPosY = ballPosY + ballSpeedY;

    // The 'setAttribute' function is used to modify the svg image of the balls potsison, which will simulate its movement.
    // The 'transform' attribute is what will modify the postision of the ball, and the 'translate' function is what will
    // actually move the ball. Inside the 'translate' brackets are literals for where the ball will be replaced to given the
    // values of 'ballPosX' and 'ballPosY'.
    ball.setAttribute("transform", `translate(${ballPosX},${ballPosY})`);
    // Initially I was trying what we learned in class which was 'getAttribute(x)' and 'setAttribute(x)' but this was not working
    // at all, so I used the 'transform' and 'translate' attributes instead, which ended up working for me.
    // ---> What I tried 'ball.getAttribute("cx");' 'ball.setAttribute("ballPosX");'
}

// This function is is responsible for allowing for the user to manipulate the postision of the ball with the use
// of pressing the 'w', 'a', 's', and 'd' keys which will simulate the movement animation of the ball the user is controlling.
// The purpose of this is to allow the user to move the ball around the game screen with the use of these keys. The parameter
// 'e' being passed to the function represents the object event controlling the what occurs in the function.
function keyboardEventMovement(e) {    
    // The if statement checks if the key being pressed is 'w', and if the balls speed along the 'y' axis is not 3, which is making 
    // sure the ball is not already moving, and makes sure the user is pressing the 'w' key.
    if (e.key === "w" && ballSpeedY !== 3) {
        // If the 'w' key is being pressed which means the ball should be going up along the 'y' axis, and the ball is not going down,
        // the balls speed along the 'x' axis 'ballSpeedX' is assigned to 0, and the balls speed along the 'y' axis is set to -3 to 
        // make the ball travel up the 'y' axis on the game screen if the 'w' key is pressed.
        ballSpeedX = 0;
        ballSpeedY = -3;
    // If the initial if statements condiiton is not met, meaning the 'w' key is not pressed, this else if block will check if the 's'
    // key is being pressed, and if the ball is not moving up along the 'y' axis.
    } else if (e.key === "s" && ballSpeedY !== -3) {
        // If the else if's condiiton evaluates to true, meaning the user is pressing the 's' key and the ball is not moving up already,
        // then the balls speed along the 'x' axis 'ballSpeedX' is assigned to 0, to ensure it isnt moving side to side, and the balls 'y'
        // axis speed is set to 3, to make the ball go down whenever the user is pressing the 's' key.
        ballSpeedX = 0;
        ballSpeedY = 3;
    // If neither of the first two conditions are met, this if else block is checked to see if the user is pressing the 'd' key, and to ensure
    // the ball is not already moving to the left, 'ballSpeedX !== -3'.
    } else if (e.key === "d" && ballSpeedX !== -3) {
        // If the 'd' key is being pressed, and the ball is not already moving to the left, the balls speed along the 'x' axis 'ballSpeedX'
        // is assigned to 3, which will make the ball move to the right when the user presses 'd'. The balls speed along the 'y' axis 'ballSpeedY'
        // is assigned to 0, so that the ball will only move the direction of the key being pressed.
        ballSpeedX = 3;
        ballSpeedY = 0;
    // If neither of the first three conditions in the if statements are met, this if else block will be checked to see if the user is pressing
    // the 'a' key and that the ball is not already moving to the right.
    } else if (e.key === "a" && ballSpeedX !== 3) {
        // If the 'a' key is being pressed, and the ball is not already moving to the right, the balls speed along the 'x' axis 'ballSpeedX' is 
        // assigned to -3, which will move the ball to the left. The balls speed along the 'y' axis is assigned to 0, to prevent the ball from moving
        // along the 'y' axis unless the corresponding key is pressed.
        ballSpeedX = -3;
        ballSpeedY = 0;
    }
}

document.addEventListener('keydown', keyboardEventMovement);


// The postision of the first obstacle is assigned to the randomly generated value as a result of calling the 'randomPosX' function.
// This assigns a random value for the first obstacles 'x' postision.
obstacle1PosX = randomPosX();
// This function 'fallingObstacles' is responsible for simulating the falling animation of the first obstacle. It re assigns the 'y'
// postision of the first obstacle, which simulates the falling animation, as this is incremented by the speed at which the obstacle 
// falls. The function then checks if the obstacle has fallen off of the game screen, atleast the game screen the user can see, and
// if it has, the obstacles 'y' postision is reset to a value, where it will repeat the falling cycle.
function fallingObstacles() {
    // Increments the obstacles 'y' postision which simulates the falling animation.
    obstacle1PosY = obstacle1PosY + obstacle1SpeedY;

    // This if statement checks if the obstacle has gone off of the game screen.
    if (obstacle1PosY > gameHeight) {
        // If it has, the obstacles 'y' postision is reset to a value of -10, which is above the game screen, so it can restart the
        // cycle of falling off, and then reappearing at the top.
        obstacle1PosY = -10;
        // After the obstacle has fallen off of the screen, to prevent it from staying at the same random 'x' postision, it is assigned
        // a new randomly generated 'x' postision, so each time the obstacle falls off of the screen, it appears at a new spot.
        obstacle1PosX = randomPosX();
        // Debug. Initially I was having issues with the obstacle staying at the same 'x' postision, which is what led me to the log 
        // statement. After some trial and error, I came to the conclusion that I needed to change the 'x' postision after each cycle
        // /iteration.
        console.log("'x' pos: " + obstacle1PosX)
    }
    // The 'setAttribute' function is used to modify the svg image of the balls psotsion, in turn simulating its movement.
    // The 'transform' attribute is what will modify the postision of the obstacle, and the 'translate' function is what will
    // actually move the obstacle. Inside the 'translate' brackets are literals for where the obstacle will be replaced to given
    // the values of 'obstacle1PosX' and 'obstacle1PosY'. This is responsible for simulating the movement animation of the obstacle.
    obstacle1.setAttribute("transform", `translate(${obstacle1PosX}, ${obstacle1PosY})`);
}

// The postision of the second obstacle is assigned to the randomly generated value as a result of calling the 'randomPosX' function.
// This assigns a random value for the second obstacles 'x' postision.
obstacle2PosX = randomPosX();
// The function 'fallingObstacles2' is to simulate the animation of the secon obstacle falling on the game screen, which is what the user
// will try to avoid to stay alive. The function will increment the obstacles postision which will be based on its current positsion, and 
// the speed it will travel, and then will check if the obstacle has gone off of the game screen, to then repeat this animation by reassigning
// the 'y' postision.
function fallingObstacles2() {
    // The obstacles new 'y' postision is reassigned to the value of adding the obstacles current value by the speed the obstacle travels.
    obstacle2PosY = obstacle2PosY + obstacle2SpeedY;
    // Debug. I used this log statement because at first I was not getting the postision I wanted. I ended up finding out that the problem
    // was that I was adding the first obstacles postision, and not the second. However I came to the conclusion this did not make a huge 
    // change, it worked after I made the change so I stuck with it.
    console.log(obstacle2PosY)
    // The if statement checks the condition, which is if the obstacles postision is more than the height of the game screen.
    if (obstacle2PosY > gameHeight) {
        // If it is, the obstacles 'y' postision is set to a value of -10, so it appears above the game screen, to then repeat the cycle of
        // falling down with the user trying to avoid.
        obstacle2PosY = -10;
        // The obstacles 'x' postision is reassigned to a new value which is randomly generated when calling upon the 'randomPosX' function.
        obstacle2PosX = randomPosX();
    }
    // The 'setAttribute' function sets the 'transform' atributes of the element of the html page 'obstacle2'. It uses the 'translate' function to 
    // change the postision of the obstacle, and move the obstacle to the specified 'x' and 'y' coordinates. The 'x' and 'y' coordinates are specified
    // using  'obstacle2PosX' and 'obstacle2PosY' where these variables hold the values of the obstacles 'x' and 'y' coordinates after the functions if
    // statement. The purpose of setting the obstacles attributes is to simulate the animation of the object falling, and reappearing, and then falling again.
    obstacle2.setAttribute("transform", `translate(${obstacle2PosX}, ${obstacle2PosY})`);
}

// The postision of the third obstacle is assigned to the randomly generated value as a result of calling the 'randomPosX' function.
obstacle3PosX = randomPosX();
// This function simulates the falling animation of the third obstacle, where the users goal is to avoid the falling obstacle. The obstacles (third obstacle)
// postision along the 'y' axis is determined by the current postision of the obstacle, and the speed in which the obstacle travels by. The obstacles postisions
// are then set using the 'setAttrbiute' function.
function fallingObstacles3() {
    // Reassigns the obstacles 'y' postision by adding the current 'y' postision and the speed it travels along the 'y' axis.
    obstacle3PosY = obstacle3PosY + obstacle3SpeedY;
    // This if statement checks if the obstacles postision exceeds the height of the game screen, cause if it does, it means the obstacle
    // has fallen off the game screen, and needs to reappear.
    if (obstacle3PosY > gameHeight) {
        // If the if statements condition evaluates to true, meaning the obstacle has fallen off of the game screen, the obstacles
        // 'y' postision is re assigned to -10, which will make it appear back at the top of the game screen.
        obstacle3PosY = -10;
        // After the obstacle has fallen down, the 'x' postision of the obstacle is reassigned to the value of calling the 'randomPosX'
        // function, which will generate another random value for the obstacles 'x' postision.
        obstacle3PosX = randomPosX();
        // Debug. Like the first obstacle, the 'x' postision of this obstacle was not being reassigned after everytime it had fallen down,
        // which initially resulted in it never changing postision along the 'x' postision. After using the log statement, I had come to
        // the conclusion that the problem was the same as the first obstacle, and it needed to be changed after each time it exceeded the
        // size of the game screen.
        console.log("'x' pos: " + obstacle3PosX)
    }
    // Debug. This log statement helped me determine that the reason I was getting incorrect 'y' postision for this obstacle is because I was
    // changing the postision by adding the 'x' postision, instead of the 'y' speed.
    console.log(obstacle3PosY);
    // The html element 'obstacle3's attributes are changed using the 'setAttribute' function, in this case it sets the value of the transform
    // attribute. I needed to use the 'transform' attribute and translate function in order to move the svg drawing. The translate function uses
    // a literal to set the 'x' and 'y' coordinates for the new postision of the transformed obsatcle, which will simulate the moving animation 
    // of the obstacle falling down.
    obstacle3.setAttribute("transform", `translate(${obstacle3PosX}, ${obstacle3PosY})`);
}

// The postision of the fourth obstacle is assigned to the randomly generated value as a result of calling the 'randomPosX' function.
// This assigns a random value for the fourth obstacles 'x' postision.
obstacle4PosX = randomPosX();
// This function 'fallingObstacles4' is responsible for simulating the falling animation of the fourth obstacle. It reassigns the 'y'
// postision of the obstacle, which simulates the falling animation, as this is added by the speed at which the obstacle falls. The 
// function then checks if the obstacle has fallen off of the game screen, and if it has, the obstacles 'y' postision is reset to a 
// value above the game screen, where it will repeat the falling cycle.
function fallingObstacles4() {
    // The obstacles 'y' postision is reassigned to the result of adding its current postision, by the speed the obstacle travels.
    obstacle4PosY = obstacle4PosY + obstacle4SpeedY;
    // This if statement checks if the obstacle has exceeded the size of the game screen, by checking the condition 
    // 'obstacle4PosY > gameHeight', where if this evaluates to true, the obstacle has gone off of the game screen
    // and needs to reappear at the top.
    if (obstacle4PosY > gameHeight) {
        // If this condition has evaluated to true, the obstacles 'y' postision is reassigned to -10, which will make
        // it seem as if the obstacle is falling from the top again.
        obstacle4PosY = -10;
        // The obstacles 'x' pos is then reassigned to the result of calling upon the 'randomPosX' function, which will
        // generate a random value for the obstacles new 'x' coordinate/postision. This is done so the obstacle does not
        // continously fall along the same 'x' postision/coordinate.
        obstacle4PosX = randomPosX();
    }
    // The element from the HTML page 'obstacle4' which represents the svg drawing for the fourth obstacle, has its attributes
    // set with the use of the 'setAttribute' function provided by javascript. The attrbiutes that are being set are the 'transform'
    // attribute with the purpose of changing the postision of the obstacle, and simulating a moving animation. The 'translate' function
    // inside of the 'transform' attribute is responsible for actually moving the svg drawing (Fourth obstacle) to the new postision, which
    // is determined by the new values assigned to the variables 'obstacle4PosX' and 'obstacle4PosY'. This will transform and translate
    // the svg's location depending on the values passed, which in turn will move the svg drawing.
    obstacle4.setAttribute("transform", `translate(${obstacle4PosX}, ${obstacle4PosY})`);
}

// The postision of the fifth obstacle is assigned to the randomly generated value as a result of calling the 'randomPosX' function.
// This assigns a random value for the fifth obstacles 'x' postision.
obstacle5PosX = randomPosX();
// This function simulates the falling animation of the fifth obstacle. The obstacles (fifth obstacle) postision along the 'y' axis is
// determined by the current postision of the obstacle, and the speed in which the obstacle travels by. The obstacles postisions are then
// set using the 'setAttrbiute' function. The objects new postision is dependent on the logic inside of the function, which will change its
// 'y' coord to simulate the falling, and change the 'x' coord so it does not always appear at the same place.
function fallingObstacles5() {
    // The fifth obstacles new 'y' pos is reassigned to the result of adding the current 'y' pos by the speed at which the fifth obstacle
    // falls down by.
    obstacle5PosY = obstacle5PosY + obstacle5SpeedY;
    // If the obstacles 'y' postision exceeds the height of the game screen, this means that the 'y' pos of the obstacle needs to be set 
    // back to the top.
    if (obstacle5PosY > gameHeight) {
        // If the obstacle does fall off of the game screen, the value of the 'y' postision is set to -10, so it goes back up to the top,
        // and then will fall down from there.
        obstacle5PosY = -10;
        // The 'x' pos of the fifth obstacle is set to the random value of calling upon the 'randomPosX' helper function which generates a 
        // new random value for the obstacles 'x' pos so it does not always fall at the same 'x' postision.
        obstacle5PosX = randomPosX();
    }
    // The element from the HTML page 'obstacle5' which represents the svg drawing for the fifth obstacle, has its attributes
    // set with the use of the 'setAttribute' function provided by javascript. The attrbiutes that are being set are the 'transform'
    // attribute with the purpose of changing the postision of the obstacle, and simulating a moving animation. The 'translate' function
    // inside of the 'transform' attribute is responsible for actually moving the svg drawing (Fifth obstacle) to the new postision, which
    // is determined by the new values assigned to the variables 'obstacle5PosX' and 'obstacle5PosY'. This will transform and translate
    // the svg's location depending on the values passed, which in turn will move the svg drawing.
    obstacle5.setAttribute("transform", `translate(${obstacle5PosX}, ${obstacle5PosY})`);
}

// This assigns a random value for the sixth obstacles 'x' postision by calling upon the 'randomPosX' helper function.
obstacle6PosX = randomPosX();
// This function simulates the falling animation of the sixth obstacle, where the users goal is to avoid the falling obstacle. The obstacles (sixth obstacle)
// postision along the 'y' axis is determined by the current postision of the obstacle, and the speed in which the obstacle travels by. The obstacles postisions
// are then set using the 'setAttribute' function.
function fallingObstacles6() {
    // The sixth obstacles new 'y' pos is reassigned to the result of adding the current 'y' pos by the speed at which the sixth obstacle
    // falls down by.
    obstacle6PosY = obstacle6PosY + obstacle6SpeedY;
    // The if statement checks if the obstacles 'y' postision exceeds the height of the game screen, this means that the 'y' pos of the obstacle needs 
    // to be set back to the top. This is determined by the obstacles 'y' pos and the game screens height as the condition.
    if (obstacle6PosY > gameHeight) {
        // If the obstacle does fall off of the game screen, the value of the 'y' postision is set to -10, so it goes back up to the top,
        // and then will fall down from there.
        obstacle6PosY = -10;
         // The 'x' pos of the sixth obstacle is set to the random value of calling upon the 'randomPosX' helper function which generates a 
        // new random value for the obstacles 'x' pos so it does not always fall at the same 'x' postision.
        obstacle6PosX = randomPosX();
    }
     // The element from the HTML page 'obstacle6' which represents the svg drawing for the sixth obstacle, has its attributes
    // set with the use of the 'setAttribute' function provided by javascript. The attrbiutes that are being set are the 'transform'
    // attribute with the purpose of changing the postision of the obstacle, and simulating a moving animation. The 'translate' function
    // inside of the 'transform' attribute is responsible for actually moving the svg drawing (Sixth obstacle) to the new postision, which
    // is determined by the new values assigned to the variables 'obstacle6PosX' and 'obstacle6PosY'. This will transform and translate
    // the svg's location depending on the values passed, which in turn will move the svg drawing. Each time the obstacle has its attributes
    // re-set, it will appear at a different 'x' pos which is determined by the random value saved into the 'obstacle6PosX' variable.
    obstacle6.setAttribute("transform", `translate(${obstacle6PosX}, ${obstacle6PosY})`);
}

// The initial 'x' postision of the seventh obstacle is assigned to the randomly generated value as a result of calling the 'randomPosX' function.
obstacle7PosX = randomPosX();
// This function is responsible for the logic behind the seventh obstacle's falling down animation.
function fallingObstacles7() {
    // The 'x' pos of the seventh obstacle is reassigned to the result value of adding its current 'x' pos by the speed at which it falls down by.
    obstacle7PosY = obstacle7PosY + obstacle7SpeedY;
    // The if statement checks the condition of 'is the obstacles 'y' pos greater than the height of the game screen', because if it is,
    // this means the obstacle has appeared off of the game screen, and needs to be set back up to the top.
    if (obstacle7PosY > gameHeight) {
        // If the condiition evaluates to true, meaning the obstacle has fallen off of the game screen, its 'y' pos is reset to -10,
        // so it reappears at the top of the game screen.
        obstacle7PosY = -10;
        // For the next time the obstacle will fall down, its 'x' pos is reassigned to a random 'x' value as a result of calling the 
        // 'randomPosX' function.
        obstacle7PosX = randomPosX();
    }
    // The 'obstacle7''s attributes are set using the 'setAttrbiute' function. This is to change the attributes of the svg drawing from
    // the html page. It sets the 'trasnform' attribute of the svg drawing using the 'translate' function, which moves the drawing to the
    // coordinates past to the function. In this case, it will move the drawing to the 'obstacle7PosX' 'x' pos, and the 'obstacle7PosY' 'y' pos.
    obstacle7.setAttribute("transform", `translate(${obstacle7PosX}, ${obstacle7PosY})`);
}

// The postision of the eigth obstacle is assigned to the randomly generated value as a result of calling the 'randomPosX' function.
// This assigns a random value for the eigth obstacles 'x' postision.
obstacle8PosX = randomPosX();
// This function is responsible for implementing the logic assosciated with the eighth obstacle, where the logic is responsible for simulating
// the falling down animation of the obstacle, which then repeats the animation after it falls off of the game screen.
function fallingObstacles8() {
    // The current 'x' pos of the eigth obstacle is reassigned to the result of adding its current 'y' pos, by the speed at which the obstacle
    // travels/falls down along the 'y' pos.
    obstacle8PosY = obstacle8PosY + obstacle8SpeedY;
    // This if statement checks if the obstacle is still on the game screen. As if it is not, this means its 'y' pos needs to be updated
    // so it reappears at the top of the screen, so it can fall down again.
    if (obstacle8PosY > gameHeight) {
        // If it has fallen off of the game screen, meaning the if statements condition has evaluated to true, the obstacles 'y' pos is changed
        // to -10, so it reappears at the top of the game screen.
        obstacle8PosY = -10;
        // The obstacles 'x' pos is reassigned to the result of calling the 'randomPosX' function which generates a random value for the obstacles
        // 'x' postision.
        obstacle8PosX = randomPosX();
    }
    // The obstacle from the HTML page 'obstacle8''s attributes are set using the 'setAttrbiute' function which will change the location of the 
    // obstacle accordingly. It targets the 'transform' attribute of the obstacle, and uses the 'translate' function to actually move the obstcale
    // to the 'x' and 'y' pos's passed to the function.
    obstacle8.setAttribute("transform", `translate(${obstacle8PosX}, ${obstacle8PosY})`);
}

// This assigns a random value for the ninth obstacles 'x' postision.
obstacle9PosX = randomPosX();
// This function is responsible for the logic behind the ninth obstacle's falling down animation.
function fallingObstacles9() {
    // The ninth obstacles new 'y' pos is reassigned to the result of adding the current 'y' pos by the speed at which the ninth obstacle
    // falls down by.
    obstacle9PosY = obstacle9PosY + obstacle9SpeedY;
    // This if statement checks if the obstacle is still on the game screen. As if it is not, this means its 'y' pos needs to be updated
    // so it reappears at the top of the screen, so it can fall down again.
    if (obstacle9PosY > gameHeight) {
        // If the obstacle does fall off of the game screen, the value of the 'y' postision is set to -10, so it goes back up to the top,
        // and then will fall down from there.
        obstacle9PosY = -10;
        // The obstacles 'x' pos is then reassigned to the result of calling upon the 'randomPosX' function, which will
        // generate a random value for the obstacles new 'x' coordinate/postision. This is done so the obstacle does not
        // continously fall along the same 'x' postision/coordinate.
        obstacle9PosX = randomPosX();
    }
    // The obstacle from the HTML page 'obstacle9''s attributes are set using the 'setAttrbiute' function which will change the location of the 
    // obstacle accordingly. It targets the 'transform' attribute of the obstacle, and uses the 'translate' function to actually move the obstcale
    // to the 'x' and 'y' pos's passed to the function.
    obstacle9.setAttribute("transform", `translate(${obstacle9PosX}, ${obstacle9PosY})`);
}

// The postision of the tenth obstacle is assigned to the randomly generated value as a result of calling the 'randomPosX' function.
obstacle10PosX = randomPosX();
// The function 'fallingObstacles10' is to simulate the animation of the secon obstacle falling on the game screen, which is what the user
// will try to avoid to stay alive. The function will increment the obstacles postision which will be based on its current positsion, and 
// the speed it will travel, and then will check if the obstacle has gone off of the game screen, to then repeat this animation by reassigning
// the 'y' postision.
function fallingObstacles10() {
    // The obstacles 'y' postision is reassigned to the result of adding its current postision, by the speed the obstacle travels.
    obstacle10PosY = obstacle10PosY + obstacle10SpeedY;
     // This if statement checks if the obstacle has exceeded the size of the game screen, by checking the condition 
    // 'obstacle10PosY > gameHeight', where if this evaluates to true, the obstacle has gone off of the game screen
    // and needs to reappear at the top.
    if (obstacle10PosY > gameHeight) {
        // If the obstacle does fall off of the game screen, the value of the 'y' postision is set to -10, so it goes back up to the top,
        // and then will fall down from there.
        obstacle10PosY = -10;
        // The obstacles 'x' pos is then reassigned to the result of calling upon the 'randomPosX' function, which will
        // generate a random value for the obstacles new 'x' coordinate/postision. This is done so the obstacle does not
        // continously fall along the same 'x' postision/coordinate.
        obstacle10PosX = randomPosX();
    }
    // The obstacle from the HTML page 'obstacle10''s attributes are set using the 'setAttrbiute' function which will change the location of the 
    // obstacle accordingly. It targets the 'transform' attribute of the obstacle, and uses the 'translate' function to actually move the obstcale
    // to the 'x' and 'y' pos's passed to the function.
    obstacle10.setAttribute("transform", `translate(${obstacle10PosX}, ${obstacle10PosY})`);
}

// The postision of the first grow items 'x' postision is set a random postision along the game screen. The purpose of calling
// the 'randomPosX' helper function is to generate a random postision along the 'x' axis of the game screen.
growItemPosX = randomPosX();
// This function is responsible for simulating the falling animation of the grow items which will appear on the game screen.
function fallingGrowItems() {
    // Similarly to the logic with the obstacles, the first grow items 'y' pos is reassigned to the result of adding the grow items current 'y' pos
    // with the speed at which the grow item travels along the 'y' axis (falls down).
    growItemPosY = growItemPosY + growItemSpeedY;
    // Debug. Initially I was using just the 'setAttribute' function to target the circle and attempt to move it. However I was continously
    // having issues with the circle moving, but not the face inside of the circle. After doing some of my own research on youtube, I had found
    // out that it would be best to use a query selector before setting the attribute so it targetted the whole group and not just the shape.
    // growItem.setAttribute("cx", growItemPosX)
    // The first grow item svg drawing is selected as a group using the 'querySelector' function, and then has its attributes changed using the
    // 'setAttrbiute' function. This is to change the location along the 'x' axis of the circle group to simulate it moving on the game screen.
    growItem.querySelector('circle').setAttribute("cx", growItemPosX);
    // This if statement checks if the grow item  has exceeded the height of the game screen, because if it has, similarly to the obstacles, it 
    // must reappear at the top of the game screen to then fall down again.
    if (growItemPosY > gameHeight) {
        // If the grow item has fallen off of the game screen, its 'y' pos is reassigned to -10, so it reappears at the top of the game screen.
        growItemPosY = -10;
        // After falling down, the 'x' pos of the grow item is assigned to a random value generated by calling upon the 'randomPosX' helper 
        // function.
        growItemPosX = randomPosX();
        // Debug. At first I was changing the 'y' pos, but after adding the log statement and some debugging I was able to find that the issue 
        // came from the use of an incorrect variable.
        console.log("'x' pos - Grow Item 1: " + growItemPosX)
    }
    // The 'querySelector' function finds the svg drawing 'circle' which is apart of the 'growItem' group. This is so the attributes can be set,
    // in order to change the postisioning of the circle (grow item). It uses the 'setAttrbiute' function to change the positsioning of the circle
    // along the 'y' axis, this is to simulate the moement of the circle.
    growItem.querySelector('circle').setAttribute("cy", growItemPosY);
}

// The postision of the first grow items 'x' postision is set a random postision along the game screen. The purpose of calling
// the 'randomPosX' helper function is to generate a random postision along the 'x' axis of the game screen.
growItem2PosX = randomPosX();
// This function is responsible for simulating the falling animation of the second grow item which will appear on the game screen.
function fallingGrowItems2() {
    // Similarly to the logic with the obstacles and the first grow item, the second grow items 'y' pos is reassigned to the result of 
    // adding the grow items current 'y' pos with the speed at which the grow item travels along the 'y' axis (falls down).
    growItem2PosY = growItem2PosY + growItem2SpeedY;
    // The second grow item svg drawing is selected as a group using the 'querySelector' function, and then has its attributes changed using the
    // 'setAttrbiute' function. This is to change the location along the 'x' axis of the circle group to simulate it moving on the game screen.
    growItem2.querySelector('circle').setAttribute("cx", growItem2PosX);
    // This if statement checks if the grow item has exceeded the height of the game screen, because if it has, similarly to the obstacles, it 
    // must reappear at the top of the game screen to then fall down again.
    if (growItem2PosY > gameHeight) {
        // If the grow item has fallen off of the game screen, its 'y' pos is reassigned to -10, so it reappears at the top of the game screen.
        growItem2PosY = -10;
        // After falling down, the 'x' pos of the grow item is assigned to a random value generated by calling upon the 'randomPosX' helper 
        // function.
        growItem2PosX = randomPosX();
    }
    // The 'querySelector' function finds the svg drawing 'circle' which is apart of the 'growItem2' group. This is so the attributes can be set,
    // in order to change the postisioning of the circle (second grow item). It uses the 'setAttrbiute' function to change the positsioning of the
    // circle along the 'y' axis, this is to simulate the moement of the circle.
    growItem2.querySelector('circle').setAttribute("cy", growItem2PosY);

}

// The shrink items 'x' postision is assigned to the random value as a result of calling the 'randomPosX' helper function.
// This allows for the shrink item that appears on the game screen to always show at a different 'x' coordinate.
shrinkItemPosX = randomPosX();
// The fucntion 'fallingShrinkItems' will have similar logic to the obstacles, and the grow items as they all follow the same pattern of falling
// down on the game screen for the user to try and avoid. The 'y' postision of the shrink item will depend on its current postision, and the speed
// it falls down by. The items svg group will be changed to reflect the movement on the game screen.
function fallingShrinkItems() {
    // The shrink items 'y' postision is assigned to the result of adding the items current postision along the 'y' axis, by the speed that it falls
    // down along the 'y' axis.
    shrinkItemPosY = shrinkItemPosY + shrinkItemSpeedY;
    // The shrink item's svg drawing (circle) is selected using the 'querySelector' function, and then its attributes will be changed to reflect the 
    // movement on the game screen. The 'cx' attribute of the circle is set to the value of the 'shrinkItemPosX' variable which will change the elements
    // postision along the 'x' axis.
    shrinkItem.querySelector('circle').setAttribute("cx", shrinkItemPosX)
    // Debug. At first I was not changing the 'x' postision before the function which was resulting in the circle always starting at the same postision every
    // time the page was refreshed. So i managed to figure out the problem was that it needed to be changed before the body of the function was executed.
    console.log(shrinkItemPosX);
    // The if statement ensures that if the shrink item appears off the game screen/has fallen off of the game screen, its 'y' postision is reset to reflect
    // the fact it will re appear at the top.
    if (shrinkItemPosY > gameHeight) {
        // In order to make the shrink item reappear at the top, its 'y' postision is reassigned to -10.
        shrinkItemPosY = -10;
        // To ensure the shrink item always appears at a different 'x' postision everytime it falls, after each time it is reassigned to the top, it will have 
        // a different random 'x' value which is generated by calling the 'randomPosX' helper function.
        shrinkItemPosX = randomPosX();
    }
    // The shrink items 'y' postision is set using the 'queruSelector' function to select the shrink items svg drawing, and the 'cy' attribute in the 
    // 'setAttrbiute' function to change its postision, where its postision is dependent on the value being passed to the function 'shrinkItemPosY' to 
    // reflect its movement.
    shrinkItem.querySelector('circle').setAttribute("cy", shrinkItemPosY);
}

// The purpose of the 'ballCollision' function is to detect wether or not the ball has made contact with an obstacle. It uses the 'getBoundingClient' function
// to retreive the postision of the ball, and the obstacle on the game screen, and checks if it has made contact with an obstacle, or vice versa.
function ballCollision() {
    // The variable 'ballArea' is declared and initialized to the postision and the dimensions of the Dodgeball (ball) item/object.
    let ballArea = ball.getBoundingClientRect();
    // The variable 'ballX' is declared and initialized to the centre 'x' postision of the ball (Dodgeball).
    let ballX = ballArea.x + ballRadius;
    // The variable 'ballY' is declared and intialized to the centre of the 'y' postision of the ball (Dodgeball).
    let ballY = ballArea.y + ballRadius;

    // A variable 'obstcales' is declared and initialized to an array, which contains all 10 obstacles that the ball will try to avoid.
    let obstacles = [obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6, obstacle7, obstacle8, obstacle9, obstacle10];
    // This for loop will iterate through every element in the 'obstcales' array in order to make sure the collision applies to every obstacle.
    for (let obstacle of obstacles) {
        // For every obstacle in the 'obstacles' array, the 'obstacleRect' variable is assigned to the postision and dimensions of the obstacle
        // in this iteration.
        let obstacleArea = obstacle.getBoundingClientRect();
        // Similarly, the variables 'obstacleX' and 'obstacleY' are declared and initialized to the middle of the obstacles which is done by retreiving
        // each obstacles 'x' and 'y' coordinate in the array, dividing it by 2, and adding the obstacles 'x' and 'y' coord to it in order to retreive
        // the middle point of the item.
        let obstacleX = obstacleArea.x + obstacleArea.width / 2;
        let obstacleY = obstacleArea.y + obstacleArea.height / 2;

        // The variable 'distance' is responsible for calcualting the distance between the ball, and the obstacle it is trying to avoid in order to see if 
        // they have made contact. The variable is declared and initialized to the result of the Euclidean Formula which calculates the distance between the 
        // obstacle in this iteration, and the ball (Dodgeball) itself. It essentially calculates the distance between the middle of the ball, and the middle
        // of the obstacle in every iteration of the for loop.
        let distance = Math.sqrt(Math.pow(ballX - obstacleX, 2) + Math.pow(ballY - obstacleY, 2));

        // This if statement which is nested in the for loop, checks if the ball has actually made contact with an obstacle, based on the variables 'distance',
        // 'ballRadius', and 'collisionRange'. Essentially it checks if the distance between the ball and the obstacle is less than the range and radius, where 
        // if this is true, it means that they have made contact/collided.
        if (distance < ballRadius + collisionRange) {
            // Since the game will end if the ball makes contact with an obstacle, the 'gameOver' function is called which will end the game, simulating the end of 
            // the game after the ball has made contact with a obstacle.
            gameOver();
            // The return statement is used so the fucntion exits and does not keep checking for the collision of the remaining obstacles in the array and loop.
            return;
        }
    }
}

// The purpose of the 'growBallItemCollision' function is to detect wether or not the ball has made contact with an grow item. It uses the 'getBoundingClient' function
// to retreive the postision of the ball, and the grow item on the game screen, and checks if it has made contact with an grow item.
function growBallItemCollision() {
    // The variable 'ballArea' is declared and initialized to the postision and the dimensions of the Dodgeball (ball) item/object.
    let ballArea = ball.getBoundingClientRect();
    // The variable 'ballX' is declared and initialized to the center 'x' postision of the ball (Dodgeball).
    let ballX = ballArea.x + ballArea.width / 2;
    // The variable 'ballY' is declared and initialized to the center 'y' postision of the ball (Dodgeball).
    let ballY = ballArea.y + ballArea.height / 2;

    // The 'growItemArea' variable is assigned to the postision and dimensions of the grow item.
    let growItemArea = growItem.getBoundingClientRect();
    // The variables 'growItemAreaX' and 'growItemAreaY' are declared and initialized to the middle of the grow item which is done by retreiving 
    // each grow items 'x' and 'y' coordinate, dividing it by 2, and adding the grow items 'x' and 'y' coord to it in order to retreive
    // the middle point of the item.
    let growItemX = growItemArea.x + growItemArea.width / 2;
    let growItemY = growItemArea.y + growItemArea.height / 2;

    // The variable 'distance' is responsible for calcualting the diatance between the ball, and thegrow item it is trying to make contact with. 
    // The variable is declared and initialized to the result of the Euclidean Formula which calculates the distance between the grow item, and the
    // ball (Dodgeball) itself. It essentially calculates the disatnce between the middle of the ball, and the middle of the grow item.
    let distance = Math.sqrt(Math.pow(ballX - growItemX, 2) + Math.pow(ballY - growItemY, 2));

    // This if statement checks if the ball has actually made contact with the grow item, based on the variables 'distance', 'ballRadius', and 
    //'growItemRadius'. Essentially it checks if the distance between the ball and the grow item is less than the grow radius and ball radius, where 
    // if this is true, it means that they have made contact/collided.
    if (distance < ballRadius + growItemRadius) {
        // If the ball has made contact with a grow item, the point is that the ball will grow. So this is why the balls radius is increased by 5.
        ballRadius = ballRadius + 5;
        // The balls radius is changed by selecting the query, and setting the new attribute for radius using the balls new radius 'ballRadius'.
        ball.querySelector('circle').setAttribute("r", ballRadius);
        // For every interaction with the grow item, the users score is increased by 10, which is why 10 is added to the variable 'scoreValue' in
        // order to reflect the increase in the users score.
        scoreValue = scoreValue + 10; 
        // The text context of the html element 'score' is then changed to reflect the increase in score.
        score.textContent = "Score: " + scoreValue
        // After the grow item has made contact with the user (dodgeball), it must reappear at the top at a different postision,
        // which is why the 'x' pos is reassigned to the random value as a result of calling upon the 'randomPosX' helper function.
        growItemPosX = randomPosX();
        // To make the item reappear at the top of the screen, it is rrassigned to a 'y' pos of -10 after being interacted with.
        growItemPosY = -10;
        // The grow item is selected using the 'querySelector' and its new postisions are set using the 'setAttrbiute' function and passing
        // the new coordinates to the function for 'cx' and 'cy' where the new coords are 'growItemPosX' and 'growItemPosY'.
        growItem.querySelector('circle').setAttribute("cx", growItemPosX);
        growItem.querySelector('circle').setAttribute("cy", growItemPosY);
    };
}

// The purpose of the 'growBallItemCollision2' function is to detect wether or not the ball has made contact with the second grow item. It uses the 
//'getBoundingClient' function to retreive the postision of the ball, and the grow item on the game screen, and checks if it has made contact with the
// second grow item.
function growBallItemCollision2() {
    // The variable 'ballArea' is declared and initialized to the postision and the dimensions of the Dodgeball (ball) item/object.
    let ballArea = ball.getBoundingClientRect();
    // The variable 'ballX' is declared and initialized to the center 'x' postision of the ball (Dodgeball).
    let ballX = ballArea.x + ballArea.width / 2;
    // The variable 'ballY' is declared and initialized to the center 'y' postision of the ball (Dodgeball).
    let ballY = ballArea.y + ballArea.height / 2;

    // The 'growItem2Area' variable is assigned to the postision and dimensions of the second grow item.
    let growItem2Area = growItem2.getBoundingClientRect();
    // The variables 'growItemArea2X' and 'growItem2AreaY' are declared and initialized to the middle of the second grow item which is done by retreiving 
    // the grow items 'x' and 'y' coordinate, dividing it by 2, and adding the grow items 'x' and 'y' coord to it in order to retreive
    // the middle point of the item.
    let growItem2X = growItem2Area.x + growItem2Area.width / 2;
    let growItem2Y = growItem2Area.y + growItem2Area.height / 2;

    // The variable 'distance' is responsible for calcualting the distance between the ball, and the grow item it is trying to make contact with. 
    // The variable is declared and initialized to the result of the Euclidean Formula which calculates the distance between the second grow item, and the
    // ball (Dodgeball) itself. It essentially calculates the distance between the middle of the ball, and the middle of the second grow item.
    let distance = Math.sqrt(Math.pow(ballX - growItem2X, 2) + Math.pow(ballY - growItem2Y, 2));

    // This if statement checks if the ball has actually made contact with the second grow item, based on the variables 'distance', 'ballRadius', and 
    //'growItem2Radius'. Essentially it checks if the distance between the ball and the grow item is less than the grow radius and ball radius, where 
    // if this is true, it means that they have made contact/collided.
    if (distance < ballRadius + growItem2Radius) {
         // If the ball has made contact with the second grow item, the point is that the ball will grow. So this is why the balls radius is increased by 5.
        ballRadius = ballRadius + 5;
        // The balls radius is changed by selecting the query, and setting the new attribute for radius using the balls new radius 'ballRadius'.
        ball.querySelector('circle').setAttribute("r", ballRadius);
        // For every interaction with the second grow item, the users score is increased by 10, which is why 10 is added to the variable 'scoreValue' in
        // order to reflect the increase in the users score.
        scoreValue = scoreValue + 10; 
        // The text context of the html element 'score' is then changed to reflect the increase in score.
        score.textContent = "Score: " + scoreValue

        // After the second grow item has made contact with the user (dodgeball), it must reappear at the top at a different postision,
        // which is why the 'x' pos is reassigned to the random value as a result of calling upon the 'randomPosX' helper function.
        growItem2PosX = randomPosX();
        // To make the second item reappear at the top of the screen, it is rrassigned to a 'y' pos of -10 after being interacted with.
        growItem2PosY = -10;
        // The second grow item is selected using the 'querySelector' and its new postisions are set using the 'setAttrbiute' function and passing
        // the new coordinates to the function for 'cx' and 'cy' where the new coords are 'growItem2PosX' and 'growItem2PosY'.
        growItem2.querySelector('circle').setAttribute("cx", growItem2PosX);
        growItem2.querySelector('circle').setAttribute("cy", growItem2PosY);
    };
}

// The purpose of the 'shrinkItemCollision' function is to detect wether or not the ball has made contact with the shrink item. It uses the 
//'getBoundingClient' function to retreive the postision of the ball, and the shrink item on the game screen, and checks if it has made contact with the
// shrink item.
function shrinkItemCollisison() {
    // The variable 'ballArea' is declared and initialized to the postision and the dimensions of the Dodgeball (ball) item/object.
    let ballArea = ball.getBoundingClientRect();
    // The variable 'ballX' is declared and initialized to the center 'x' postision of the ball (Dodgeball).
    let ballX = ballArea.x + ballArea.width / 2;
    // The variable 'ballY' is declared and initialized to the center 'y' postision of the ball (Dodgeball).
    let ballY = ballArea.y + ballArea.height / 2;

    // The 'shrinkItemArea' variable is assigned to the postision and dimensions of the shrink item.
    let shrinkItemArea = shrinkItem.getBoundingClientRect();
    // The variables 'shrinkItemAreaX' and 'shrinkItemAreaY' are declared and initialized to the middle of the shrink item which is done by retreiving 
    // the shrink items 'x' and 'y' coordinate, dividing it by 2, and adding the shrink items 'x' and 'y' coord to it in order to retreive
    // the middle point of the item.
    let shrinkItemX = shrinkItemArea.x + shrinkItemArea.width / 2;
    let shrinkItemY = shrinkItemArea.y + shrinkItemArea.height / 2;

    // The variable 'distance' is responsible for calcualting the distance between the ball, and the shrink item it is trying to make contact with. 
    // The variable is declared and initialized to the result of the Euclidean Formula which calculates the distance between the shrink item, and the
    // ball (Dodgeball) itself. It essentially calculates the distance between the middle of the ball, and the middle of the shrink item.
    let distance = Math.sqrt(Math.pow(ballX - shrinkItemX, 2) + Math.pow(ballY - shrinkItemY, 2));

    // This if statement checks if the ball has actually made contact with the shrink item, based on the variables 'distance', 'ballRadius', and 
    //'shrinkItemRadius'. Essentially it checks if the distance between the ball and the shrink item is less than the shrink items radius and ball radius, where 
    // if this is true, it means that they have made contact/collided.
    if (distance < ballRadius + shrinkItemRadius) {

        // This if statement checks if the balls radius (dodgeball) is less than, or equal to 10.
        // This is done so that if the ball is, then it cannot shrink any more.
        if (ballRadius <= 10) {
            // If the balls radius is less than, or equal to 10, it is juts assigned 10 as the default radius.
            ballRadius = 10;
            // The ball is selected using the 'querySelector' and its new radius are set using the 'setAttrbiute' function and passing
            // the new radius to the function for 'r' and where the new radius is 'ballRadius.
            ball.querySelector('circle').setAttribute("r", ballRadius);
        // If the balls radius is not less than 10, meaning it has the option to shrink its size (radius), the else block will execute.
        } else {
            // After making contact with the shrink item, the balls radius is decremnted by 5 to reflect the use of the shrink item.
            ballRadius = ballRadius - 5;
            // The ball is selected using the 'querySelector' and its new radius is set using the 'setAttrbiute' function and passing
            // the new radius to the function for 'r' and where the new radius is 'ballRadius.
            ball.querySelector('circle').setAttribute("r", ballRadius);
            // After making contatc with a shrink item, the users score is incremneted by 5, which is why the variable 'scoreValue' is 
            // incremneted by a value of 5.
            scoreValue = scoreValue + 5; 
            // The text context of the html element 'score' is then changed to reflect the increase in score.
            score.textContent = "Score: " + scoreValue
        }

        // After the shrink item has made contact with the user (dodgeball), it must reappear at the top at a different postision,
        // which is why the 'x' pos is reassigned to the random value as a result of calling upon the 'randomPosX' helper function.
        shrinkItemPosX = randomPosX();
        // To make the shrink item reappear at the top of the screen, it is reassigned to a 'y' pos of -10 after being interacted with.
        shrinkItemPosY = -10;
        // The shrink item is selected using the 'querySelector' and its new postisions are set using the 'setAttrbiute' function and passing
        // the new coordinates to the function for 'cx' and 'cy' where the new coords are 'shrinkItemPosX' and 'shrinkItemPosY'.
        shrinkItem.querySelector('circle').setAttribute("cx", shrinkItemPosX);
        shrinkItem.querySelector('circle').setAttribute("cy", shrinkItemPosY);

        // The function will return true if the collision has happend.
        return true;
    };
    // The function will retrun false if no collision has happend.
    return false;
}

// This function tracks the users score while they are alive, and playing the game. This function is responsible for tracking, and updating
// the game score.
function scoreTracker() {
    // The if statement first ensures that the game is not over before tracking the score, as the score should only be tracked while the game
    // has not ended.
    if (!gameOverStatus) {
        // For every second the user is alive and playing the game, their score which is saved into the variable 'scoreValue' is incremnted by
        // 0.01, this is to reflect an increase in score of 1 per second alive. I did this because initially I had 'scoreValue++', which was being
        // incremnted way too quickly.
        scoreValue = scoreValue + 0.01;
        // The score value on the html page is changed by accessing the elements text context, it is changed to the default string 'Score', and is
        // concatenated with a rounded value of the users current score so no decimal places are seen.
        score.textContent = "Score: " + Math.round(scoreValue);
        // This nested if statement checks if the users scoree is greater than the value saved into the 'highScoreValue' which represents the users
        // high score.
        if (scoreValue > highScoreValue) {
            // If it is, this means the user has a new high score, and the score the user has achieved is assigned into the variable 'highScoreValue'
            // to reflect the new high score.
            highScoreValue = scoreValue;
            // Inside the if statement the 'highScoreTracker' helper method is called in order to reflect the new high score on the game screen.
            highScoreTracker();
        }
    }
}

// This function acts as a helper function in order to reflect the users high score on the game screen.
function highScoreTracker() {
    // When this function is called upon, the text context of the 'highScore' element on the html page is changed
    // tp the users high score 'highScoreValue'.
    highScore.textContent = "High Score: " + Math.round(highScoreValue);
}

// This function 'hardDifficulty' is responsible for increasing the difficulty of the game if the user has chosen to do so.
// The only difference is the speed at which the game will be played. If the hard difficulty is chosen, the speed of the game
// which means the obstacle speed, ball speed, and grow items speed is increased by double the amount it was going by in the 
// normal difficulty.
function hardDifficulty() {
    // The if statement checks the boolean flag 'difficultyHard', which means that the difficulty is not currently hard to prevent
    // the speed being increased everytime the difficulty is hard even if it is currently hard.
    if (!difficultyHard) {
        // The ball speed is increased to double its speed on the normal difficulty.
        ballSpeedX = ballSpeedX * 2;
        ballSpeedY = ballSpeedY * 2;

        // The obstacle speeds are set to double its previous speed on the normal difficulty.
        obstacle1SpeedY = obstacle1SpeedY * 2;
        obstacle2SpeedY = obstacle2SpeedY * 2;
        obstacle3SpeedY = obstacle3SpeedY * 2;
        obstacle4SpeedY = obstacle4SpeedY * 2;
        obstacle5SpeedY = obstacle5SpeedY * 2;
        obstacle6SpeedY = obstacle6SpeedY * 2;
        obstacle7SpeedY = obstacle7SpeedY * 2;
        obstacle8SpeedY = obstacle8SpeedY * 2;
        obstacle9SpeedY = obstacle9SpeedY * 2;
        obstacle10SpeedY = obstacle10SpeedY * 2;

        // The grow item speed is set to double its speed on the normal difficulty.
        growItemSpeedY = growItemSpeedY * 2;
        growItem2SpeedY = growItem2SpeedY * 2;

        // No increase in Shrink Item speed to make things harder.
        // The boolean flag 'difficultyHard' is set to true, this reflects the fact the user is on the hard difficulty.
        // This ws implemented as i was getting a bug where even if the user was on the hard difficulty, if they pressed
        // the 'hard' button on the html page, the speed would continue to increase.
        difficultyHard = true;

    }
}
// An event listener is attached to the 'hardButton' on the html page. So that when the button is clicked denoted by the 'click',
// the 'hardDifficulty' function is called upon, increasing the difficulty.
document.getElementById("hardButton").addEventListener("click", hardDifficulty);

// This function 'normalDifficulty' is responsible for altering the games state back to the regular/normal difficulty it begins with.
// All of the speeds are just set back to the default speeds, whcih in turn reflects the normal difficulty as there are only two 
// difficultys.
function normalDifficulty() {
    // Obstacle speeds are set back to their default speeds.
    obstacle1SpeedY = 2;
    obstacle2SpeedY = 2;
    obstacle3SpeedY = 2;
    obstacle4SpeedY = 3;
    obstacle5SpeedY = 4;
    obstacle6SpeedY = 4;
    obstacle7SpeedY = 4;
    obstacle8SpeedY = 5;
    obstacle9SpeedY = 5;
    obstacle10SpeedY = 5;

    // The grow item speeds  are set back to their defaults.
    growItemSpeedY = 2;
    growItem2SpeedY = 2;

    // Shrink item speed is set back to default just incase.
    shrinkItemSpeedY = 4;

    // Calls upon the 'initialGameState' function to reset the game back to its initial state.
    initialGameState();
    // The boolean flag is set back to false, this is to reflect the fact the difficulty is no longer hard.
    difficultyHard = false;
}
// The event listener is also added to the element 'normalButton' on the html page, so that when the button is pressed (clicked),
// the 'normalDifficulty' function is called upon to bring the game back to its regular difficulty.
document.getElementById("normalButton").addEventListener("click", normalDifficulty);

// This function is reponsible for returning the game to its intitial state. The purpose is if the game has ended, or if the difficulty
// has been changed.
function initialGameState() {
    // The boolean flag 'gameOverStatus' indicating if the game is over or not is reassigned to false to reflect the game
    // restarting.
    gameOverStatus = false;

    // The users score 'scoreValue' is reset to 0 this also helps reflect the restarting of the game.
    scoreValue = 0;
    // The html element 'score''s text is set back to 0 to further reflect the restarting of the game.
    score.textContent = "Score: " + scoreValue;

    // The ball postsions and speed are set back to the starting point (initial state).
    ballPosX = 100;
    ballPosY = 100;
    ballSpeedX = 0;
    ballSpeedY = 0;
    ballRadius = 10;
    // The ball is selected using the 'querySelector' and its default radius is set using the 'setAttrbiute' function and passing
    // the default radius to the function for 'r' where the new radius is 'ballRadius' which will hold the default radius when the 
    // game has started.
    ball.querySelector('circle').setAttribute("r", ballRadius);

    // The obstacle postsions and speeds are set back to the default values.
    obstacle1PosY = 0;
    obstacle1SpeedY = 2;
    obstacle1PosX;

    obstacle2PosY = 0;
    obstacle2SpeedY = 2;
    obstacle2PosX;

    obstacle3PosY = 0;
    obstacle3SpeedY = 2;
    obstacle3PosX;

    obstacle4PosY = 0;
    obstacle4SpeedY = 3;
    obstacle4PosX;

    obstacle5PosY = 0;
    obstacle5SpeedY = 4;
    obstacle5PosX;

    obstacle6PosY = 0;
    obstacle6SpeedY = 4;
    obstacle6PosX;

    growItemPosY = 0;
    growItemSpeedY = 2;
    growItemPosX;

    growItem2PosY = 0;
    growItem2SpeedY = 2;
    growItem2PosX;

    shrinkItemPosY = 0;
    shrinkItemSpeedY = 4;
    shrinkItemPosX;

    // The obstacles 'x' postisions are set to another random value by calling the helper function 'randomPosX' which will
    // re initialize a random value for each obstacles 'x' postision.
    obstacle1PosX = randomPosX();
    obstacle2PosX = randomPosX();
    obstacle3PosX = randomPosX();
    obstacle4PosX = randomPosX();
    obstacle5PosX = randomPosX();
    obstacle6PosX = randomPosX();
    obstacle7PosX = randomPosX();
    obstacle8PosX = randomPosX();
    obstacle9PosX = randomPosX();
    obstacle10PosX = randomPosX();

    // This resets the grow and shrink item positions along the 'x' axis / 'x' postisions.
    growItemPosX = randomPosX();
    growItem2PosX = randomPosX();
    shrinkItemPosX = randomPosX();

    // This resets the balls position to its default postisions along the 'x' and 'y' axis before the game was played (its initial state).
    ball.setAttribute("transform", `translate(${ballPosX},${ballPosY})`);

    // This resets the obstacle positions along the 'x' and 'y' axis to reflect the fact the game is back at its intitial state.
    obstacle1.setAttribute("transform", `translate(${obstacle1PosX}, ${obstacle1PosY})`);
    obstacle2.setAttribute("transform", `translate(${obstacle2PosX}, ${obstacle2PosY})`);
    obstacle3.setAttribute("transform", `translate(${obstacle3PosX}, ${obstacle3PosY})`);
    obstacle4.setAttribute("transform", `translate(${obstacle4PosX}, ${obstacle4PosY})`);
    obstacle5.setAttribute("transform", `translate(${obstacle5PosX}, ${obstacle5PosY})`);
    obstacle6.setAttribute("transform", `translate(${obstacle6PosX}, ${obstacle6PosY})`);
    obstacle7.setAttribute("transform", `translate(${obstacle7PosX}, ${obstacle7PosY})`);
    obstacle8.setAttribute("transform", `translate(${obstacle8PosX}, ${obstacle8PosY})`);
    obstacle9.setAttribute("transform", `translate(${obstacle9PosX}, ${obstacle9PosY})`);
    obstacle10.setAttribute("transform", `translate(${obstacle10PosX}, ${obstacle10PosY})`);

    // This is resetting the grow and shrink items positions along the 'x' and 'y' axis's.
    growItem.querySelector('circle').setAttribute("cx", growItemPosX);
    growItem.querySelector('circle').setAttribute("cy", growItemPosY);
    growItem2.querySelector('circle').setAttribute("cx", growItem2PosX);
    growItem2.querySelector('circle').setAttribute("cy", growItem2PosY);
    shrinkItem.querySelector('circle').setAttribute("cx", shrinkItemPosX);
    shrinkItem.querySelector('circle').setAttribute("cy", shrinkItemPosY);
}

// The function 'updateGame' is responsible for updating the state of the game in order for it to play as expected. Inside the 
// body of the function, it will make a call to each and every function which plays a part in the logic and state of the game in
// order for it to be played. It will call all the obstacle functions, the grow and shrink item functions, boundaries function,
// collision functions, and the score tracker each of which make the game playable.
function updateGame() {
    // Calls obstacle functions
    fallingObstacles();
    fallingObstacles2();
    fallingObstacles3();
    fallingObstacles4();
    fallingObstacles5();
    fallingObstacles6();
    fallingObstacles7();
    fallingObstacles8();
    fallingObstacles9();
    fallingObstacles10();
    // Calls grow item functions.
    fallingGrowItems();
    fallingGrowItems2();
    // Calls shrink item functions.
    fallingShrinkItems();
    // Calls boundary functions.
    ballInBoundaries();
    // Calls collisison functions.
    ballCollision();
    growBallItemCollision();
    growBallItemCollision2();
    shrinkItemCollisison();
    // Calls the score tracking function.
    scoreTracker();
}

// This function is what starts the game on the html page. It first ensures the game is not paused by the user before executing,
// and then calls the 'moveBall' and 'updateGame' methods to make each and every call to start the game and every movement. It 
// then ensures the game is not over, before making a request for the next frame (Animation frame) passing the game itself 'dodgeBallGame'
// as a parameter/argument. The purpose of this is to start the constant reframing of the frames to make it seem like the game is being
// animated based on the fucntion calls movements.
function dodgeBallGame() {
    if (!gamePaused) {
        moveBall();
        updateGame();
        // Was getting a problem where I was requesting the frames too often, which sped up the game after each pause.
        if (!gameOverStatus) {
            requestAnimationFrame(dodgeBallGame);
        }
    }
}

// Calls the DodgeBall game which starts the game, and its animations.
dodgeBallGame();