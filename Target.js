class Target {
    constructor(startingPosition, cssColorString) {
        this.position = startingPosition;
        this.width = targetWidth;
        this.height = targetHeight;
        this.isVisible = true;
        this.color = color(cssColorString);
    }

    render() {        
        if (this.isVisible) {
            fill(this.color);
            rect(this.position.x, this.position.y, this.width, this.height);
        }
    }

    update() {
        // Collision detection with the ball.
        if (this.isVisible && collideRectCircle(this.position.x, this.position.y, this.width, this.height,
                                                ball.position.x, ball.position.y, ball.diameter)) {
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

            targetCount -= 1;
        }
    }

}
