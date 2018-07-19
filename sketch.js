// Player related globals.
let playerPaddle;

// Target-related globals.
let targets = [];
let targetColors = ["red", "darkorange", "orange", "yellow", "lime", "blue", "hotpink", "purple"]; // Order matters.
let targetCount = 0;
let targetWidth = 50;
let targetHeight = 15;

// Ball-related globals.
let ball;

function resetGame() {
    playerPaddle = new Paddle(createVector(windowWidth / 2, windowHeight - 15));
    ball = new Ball(createVector(windowWidth / 2, windowHeight / 2),
                    createVector(random(-0.5, 0.5), 1)); // Slightly offset the ball's starting x-velocity for the AI.

    targets = []; // Clearing the array for performance.

    // Add more colors for more target levels.
    for (let y = 0; y < targetColors.length; y++) {        
        for (let x = 0; x < windowWidth; x += targetWidth) {
            targets.push(new Target(createVector(x, y * targetHeight), targetColors[y]));
        }
    }

    targetCount = targets.length;
}

function keyPressed() {
    if (keyCode === RIGHT_ARROW || keyCode === LEFT_ARROW) {
        playerPaddle.isHuman = true;
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);   
    resetGame();
}

function setup() {
    let canvas = createCanvas(windowWidth, windowHeight);
    canvas.parent("sketch");
    
    resetGame();
}

function draw() {
    // TODO: win condition. refresh to start over?
    
    // Draws a small trail behind every moving object.
    fill(0, 100);
    rect(0, 0, width, height);

    if (ball.checkIfOffScreen() || targetCount <= 0) {
        resetGame();
    }
    
    ball.update();
    playerPaddle.update();
    for (let i = 0; i < targets.length; i++) {
        targets[i].update();
        targets[i].render();
    }
    ball.render();
    playerPaddle.render();
}
