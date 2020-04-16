'use strict';

class Paddle {
    constructor(sketch, startingPosition, startingVelocity) {
        this.sketch = sketch;
        this.position = startingPosition;
        this.velocity = startingVelocity;
        this.color = sketch.color(255);
        this.width = 65;
        this.height = 10;
        this.movementSpeed = 10;
        this.maxBounceAngle = 5 * sketch.PI / 12;
        this.isHuman = false;
    }

    _isBallCollided(ball) {
        const deltaX =
            ball.position.x - Math.max(this.position.x, Math.min(ball.position.x, this.position.x + this.width));
        const deltaY =
            ball.position.y - Math.max(this.position.y, Math.min(ball.position.y, this.position.y + this.height));
        return (deltaX * deltaX + deltaY * deltaY) < (ball.radius * ball.radius);
    }

    _handleAiMovement(ball) {
        // Only move the AI if the ball is going downwards.
        if (ball.velocity.y > 0) {
            // Random -1 to 1 to balance out where the AI aims the ball.
            if (ball.position.x > this.position.x + (this.width / 2) + this.sketch.random(-1, 1)) {
                this._moveRight();
            }

            if (ball.position.x < this.position.x + (this.width / 2) + this.sketch.random(-1, 1)) {
                this._moveLeft();
            }
        } else {
            this.velocity.mult(0);
        }

    }

    _handleUserInput() {
        if (this.sketch.keyIsDown(this.sketch.RIGHT_ARROW)) {
            this._moveRight();
        } else if (this.sketch.keyIsDown(this.sketch.LEFT_ARROW)) {
            this._moveLeft();
        } else {
            this._stop();
        }
    }

    _moveRight() {
        this.velocity.x = this.movementSpeed;
    }

    _moveLeft() {
        this.velocity.x = -this.movementSpeed;
    }

    _stop() {
        this.velocity.mult(0);
    }

    draw() {
        this.sketch.fill(this.color);
        this.sketch.rect(this.position.x, this.position.y, this.width, this.height);
    }

    update(ball) {
        if (this.isHuman) {
            this._handleUserInput();
        } else {
            this._handleAiMovement(ball);
        }

        this.position.add(this.velocity);

        // Keep the paddle within the screen.
        this.position.x = this.sketch.constrain(this.position.x, 0, this.sketch.width - this.width);

        // Collision detection with the ball.
        if (this._isBallCollided(ball)) {
            // Calculate the angle in which the ball is reflected.
            // The further the ball is from the center of the paddle, the greater the angle.
            let relativeIntersect = ball.position.x - (this.position.x + (this.width / 2));
            let normalizedRelativeIntersect = relativeIntersect / (this.width / 2);
            let bounceAngle = normalizedRelativeIntersect * (this.maxBounceAngle) - this.sketch.HALF_PI;
            ball.velocity.x = ball.movementSpeed * Math.cos(bounceAngle) + bounceAngle / 2;
            ball.velocity.y = ball.movementSpeed * Math.sin(bounceAngle) + bounceAngle / 2;
        }
    }
}
