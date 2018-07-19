class Ball {
    constructor(startingPosition, startingVelocity) {
        this.color = color(255, 255, 255);
        this.diameter = 10;
        this.movementSpeed = 8;
        this.position = startingPosition;
        this.velocity = startingVelocity;

        this.velocity.mult(this.movementSpeed);
    }

    bounceOffScreenEdges() {
        if (this.position.y >= height || this.position.y <= 0) {
            this.reflectVertically();
        }

        if (this.position.x <= 0 || this.position.x >= width) {
            this.reflectHorizontally();
        }
    }

    checkIfOffScreen() {
        if (this.position.y >= height) {
            return true;
        }
        return false;
    }

    reflectHorizontally() {
        this.velocity.x *= -1;
    }

    reflectVertically() {
        this.velocity.y *= -1;
    }

    render() {
        fill(this.color);
        ellipse(this.position.x, this.position.y, this.diameter);
    }

    update() {
        this.bounceOffScreenEdges();
        this.position.add(this.velocity);
    }
}
