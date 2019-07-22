'use strict';

class Ball {
    constructor(sketch, startingPosition, startingVelocity) {
        this.sketch = sketch;
        this.diameter = 10;
        this.radius = this.diameter / 2;
        this.movementSpeed = 8;
        this.position = startingPosition;
        this.velocity = startingVelocity;
        this.color = sketch.color(255);

        this.velocity.mult(this.movementSpeed);
    }

    _bounceOffScreenEdges() {
        if (this.position.y >= this.sketch.height || this.position.y <= 0) {
            this._reflectVertically();
        }

        if (this.position.x <= 0 || this.position.x >= this.sketch.width) {
            this._reflectHorizontally();
        }
    }


    _reflectHorizontally() {
        this.velocity.x *= -1;
    }

    _reflectVertically() {
        this.velocity.y *= -1;
    }

    checkIfOffScreen() {
        if (this.position.y >= this.sketch.height) {
            return true;
        }
        return false;
    }

    render() {
        this.sketch.fill(this.color);
        this.sketch.ellipse(this.position.x, this.position.y, this.diameter);
    }

    update() {
        this._bounceOffScreenEdges();
        this.position.add(this.velocity);
    }
}
