'use strict';

const breakout = (sketch) => {
    const targetColors = ["red", "darkorange", "orange", "yellow", "lime", "blue", "hotpink", "purple"]; // Order matters.
    const targetWidth = 50;
    const targetHeight = 15;
    let targets = [];
    let targetCount = 0;
    let paddle;
    let ball;
    let backgroundColor = "black";
    const cssVariables = document.querySelector(":root");

    function changeThemeColors(primary, secondary) {
        // Secondary colors.
        cssVariables.style.setProperty("--main-text-color", secondary);
        ball.color = secondary;
        paddle.color = secondary;

        // Primary color.
        backgroundColor = primary;
    }

    function resetGame(hasWon) {
        paddle = new Paddle(
            sketch,
            sketch.createVector(sketch.windowWidth / 2, sketch.windowHeight - 30),
            sketch.createVector(0, 0));
        ball = new Ball(
            sketch,
            sketch.createVector(sketch.windowWidth / 2, sketch.windowHeight / 2),
            sketch.createVector(sketch.random(-0.5, 0.5), 1)); // Slightly offset the ball's starting x-velocity for the AI.

        targets = []; // Clearing the array for performance.

        // Add more colors for more target levels.
        for (let y = 0; y < targetColors.length; y++) {
            for (let x = 0; x < sketch.windowWidth; x += targetWidth) {
                targets.push(new Target(
                    sketch,
                    sketch.createVector(x, y * targetHeight), targetWidth, targetHeight, targetColors[y]));
            }
        }

        targetCount = targets.length;
        if (hasWon) {
            changeThemeColors("white", "black");
        } else {
            changeThemeColors("black", "white");
        }
    }

    sketch.keyPressed = () => {
        if (sketch.keyCode === sketch.RIGHT_ARROW || sketch.keyCode === sketch.LEFT_ARROW) {
            paddle.isHuman = true;
        }
    }

    sketch.windowResized = () => {
        sketch.resizeCanvas(sketch.windowWidth, sketch.windowHeight);
        resetGame(false);
    }

    sketch.setup = () => {
        const canvas = sketch.createCanvas(sketch.windowWidth, sketch.windowHeight);
        canvas.parent("sketch");

        resetGame(false);
    };

    sketch.draw = () => {
        // Allows for a small trail to be drawn behind every moving object.
        sketch.fill(backgroundColor);
        sketch.rect(0, 0, sketch.windowWidth, sketch.windowHeight);

        // Lose condition.
        if (ball.checkIfOffScreen()) {
            resetGame(false);
        }

        // Win condition.
        if (targetCount <= 0) {
            resetGame(true);
        }

        ball.update();
        ball.draw();
        paddle.update(ball);
        paddle.draw();
        for (let i = 0; i < targets.length; i++) {
            targetCount -= targets[i].update(ball);
            targets[i].draw();
        }
    };
};