'use strict';

class Target {
    constructor(sketch, startingPosition, width, height, cssColorString) {
        this.sketch = sketch;
        this.position = startingPosition;
        this.width = width;
        this.height = height;
        this.isVisible = true;
        this.color = sketch.color(cssColorString);
    }

    _isBallCollided(ball) {
        const deltaX =
            ball.position.x - Math.max(this.position.x, Math.min(ball.position.x, this.position.x + this.width));
        const deltaY =
            ball.position.y - Math.max(this.position.y, Math.min(ball.position.y, this.position.y + this.height));
        return (deltaX * deltaX + deltaY * deltaY) < (ball.radius * ball.radius);
    }

    draw() {
        if (this.isVisible) {
            this.sketch.fill(this.color);
            this.sketch.rect(this.position.x, this.position.y, this.width, this.height);
        }
    }

    update(ball) {
        // Collision detection with the ball.
        if (this.isVisible && this._isBallCollided(ball)) {
            this.isVisible = false;

            if (ball.position.y >= this.position.y) {
                // Bottom collision.
                ball.reflectVertically();
            } else if (ball.position.y <= this.position.y + this.height) {
                // Top collision.
                ball.reflectVertically();
            } else if (ball.position.x < this.position.x) {
                // Left collision.
                ball.reflectHorizontally();
            } else if (ball.position.x > this.position.x + this.width) {
                // Right collision.
                ball.reflectHorizontally();
            }

            return 1;
        }

        return 0;
    }

}
