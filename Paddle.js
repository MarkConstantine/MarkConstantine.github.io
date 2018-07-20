class Paddle {
    constructor(startingPosition) {
        this.color = color(255, 255, 255);
        this.position = startingPosition;
        this.velocity = createVector(0, 0);
        this.width = 65;
        this.height = 10;
        this.movementSpeed = 10;
        this.maxBounceAngle = 5 * PI / 12;
        this.isHuman = false;
    }

    handleAiMovement() {
        // Only move the AI if the ball is going downwards.
        if (ball.velocity.y > 0) {
            // Random -1 to 1 to balance out where the AI aims the ball.
            if (ball.position.x > this.position.x + (this.width / 2) + random(-1, 1)) {
                this.moveRight();
            } else if (ball.position.x < this.position.x + (this.width / 2) + random(-1, 1)) {
                this.moveLeft();
            }
        } else {
            this.velocity.mult(0);
        }
        
    }

    handleUserInput() {
        if (keyIsDown(RIGHT_ARROW)) {
            this.moveRight();
        } else if (keyIsDown(LEFT_ARROW)) {
            this.moveLeft();
        } else {
            this.velocity.mult(0);
        }
    }

    moveRight() {
        this.velocity.x = this.movementSpeed;
    }

    moveLeft() {
        this.velocity.x = -this.movementSpeed;
    }

    render() {
        fill(this.color);
        rect(this.position.x, this.position.y, this.width, this.height);
    }

    update() {
        if (this.isHuman) {
            this.handleUserInput();
        } else {
            this.handleAiMovement();
        }

        this.position.add(this.velocity);

        // Keep the paddle within the screen.
        this.position.x = constrain(this.position.x, 0, width - this.width);

        // Collision detection with the ball.
        if (collideRectCircle(this.position.x, this.position.y, this.width, this.height,
                              ball.position.x, ball.position.y, ball.diameter)) {
            
            // Calculate the angle in which the ball is reflected.
            // The further the ball is from the center of the paddle, the greater the angle.
            let relativeIntersect = ball.position.x - (this.position.x + (this.width / 2));
            let normalizedRelativeIntersect = relativeIntersect / (this.width / 2);
            let bounceAngle = normalizedRelativeIntersect * (this.maxBounceAngle) - HALF_PI;
            ball.velocity.x = ball.movementSpeed * cos(bounceAngle) + bounceAngle / 2;
            ball.velocity.y = ball.movementSpeed * sin(bounceAngle) + bounceAngle / 2;
        }
    }
}
