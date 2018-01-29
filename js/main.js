var snake = new Snake();
var food = new Food();
var s= 30;
var h = 400;
var w = 600;

function setup() {
    createCanvas(w,h);
    frameRate(10);
}

function draw() {
    background('black');
    snake.update();
    food.look();
    snake.display();
}

function Food() {
    food=[];
    this.x = 0;
    this.y = 0;
    this.look = function() {
        noStroke();
        fill(random(50,250),random(50,250),random(50,250));
        ellipse(this.x, this.y, s, s,s);
    };
    this.position = function() {
        this.x = Math.floor(random(0, w/s)) * s;
        this.y = Math.floor(random(0, h/s)) * s;
    };
}

function Snake() {
    this.tail = [];
    this.x = 0;
    this.y = 0;
    this.direction = "RIGHT";
    this.update = function() {
        if(this.direction === "RIGHT") {
            this.x = this.x + s;
        } else if(this.direction === "LEFT") {
            this.x = this.x - s;
        } else if(this.direction === "UP") {
            this.y = this.y - s;
        } else {
            this.y = this.y + s;
        }

        if(this.x >= w) {
            this.x = 0;
        }
        if(this.x < 0) {
            this.x = w;
        }
        if(this.y >= h) {
            this.y = 0;
        }
        if(this.y < 0) {
            this.y = h;
        }

        if(this.x === food.x && this.y === food.y) {
            this.eat();
        }
        for(var i=this.tail.length-1; i>=1; i--) {
            this.tail[i] = this.tail[i-1];
        }
        this.tail[0] = [this.x, this.y];
    };

    this.eat = function() {
        food.position();
        this.tail.push([this.x, this.y]);
    };

    this.display = function() {
        fill(255,255,255);
        for(var i=0; i<this.tail.length; i++) {
            ellipse(this.tail[i][0],this.tail[i][1], s, s,s);
        }
    };
}

function keyPressed() {
  if (keyCode === UP_ARROW) {
    snake.direction = "UP";
  } else if (keyCode === DOWN_ARROW) {
    snake.direction = "DOWN";
  } else if (keyCode === RIGHT_ARROW) {
    snake.direction = "RIGHT";
  } else if (keyCode === LEFT_ARROW) {
    snake.direction = "LEFT";
  }
}