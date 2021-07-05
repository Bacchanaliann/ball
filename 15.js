var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var width = canvas.width;
var height = canvas.height;

var circle = function(x, y, radius, fillCircle) {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2, false);
    if (fillCircle) {
        ctx.fill();
    } else {
        ctx.stroke();
    }
};

// Конструктор Ball
var Ball = function() {
    this.x = width / 2;
    this.y = height / 2;
    this.speed = 5;
    this.xSpeed = 1;
    this.ySpeed = 0;
};

// Обновляем позицию мяча соответственно его скорости
Ball.prototype.move = function() {
    this.x += this.xSpeed * this.speed;
    this.y += this.ySpeed * this.speed;

    if (this.x < 0 || this.x > width) {
        this.xSpeed = -this.xSpeed;
    } else if (this.y < 0 || this.y > height) {
        this.ySpeed = -this.ySpeed;
    }
    if (this.speed === 0) {
        this.speed = 1;
    } else if (this.speed > 9) {
        this.speed = 9;
    }
    if (radius < 1) {
        radius = 1;
    };
};
var radius = 10;

// Рисуем мяч в его текущей позиции
Ball.prototype.draw = function(direction) {
    circle(this.x, this.y, radius, true);

};

// Задаем направление движения по строке с названием действия
Ball.prototype.setDirection = function(direction) {
    if (direction === "вверх") {
        this.xSpeed = 0;
        this.ySpeed = -1;
    } else if (direction === "вниз") {
        this.xSpeed = 0;
        this.ySpeed = 1;
    } else if (direction === "влево") {
        this.xSpeed = -1;
        this.ySpeed = 0;
    } else if (direction === "вправо") {
        this.xSpeed = 1;
        this.ySpeed = 0;
    } else if (direction === "стоп") {
        this.xSpeed = 0;
        this.ySpeed = 0;
    } else if (direction === "быстрее") {
        this.speed++;
    } else if (direction === "медленнее") {
        this.speed--;
    } else if (direction === "меньше") {
        radius--;
    } else if (direction === "больше") {
        radius++;
    }
};

// Задаем новую скорость мяча
Ball.prototype.setSpeed = function(newSpeed) {
    if (newSpeed !== undefined) {
        this.speed = newSpeed;
    }
};

// Создаем объект-мяч
var ball = new Ball();

// Объект для перевода кодов клавиш в названия действий
var keyActions = {
    32: "стоп",
    37: "влево",
    38: "вверх",
    39: "вправо",
    40: "вниз",
    88: "быстрее",
    90: "медленнее",
    67: "меньше",
    86: "больше"
};

// Объект для перевода кодов клавиш в скорости
var speeds = {
    49: 1,
    50: 2,
    51: 3,
    52: 4,
    53: 5,
    54: 6,
    55: 7,
    56: 8,
    57: 9
};

// Обработчик события keydown, будет вызван при каждом нажатии клавиши
$("body").keydown(function(event) {
    var direction = keyActions[event.keyCode];
    var speed = speeds[event.keyCode];
    ball.setDirection(direction);
    ball.setSpeed(speed);
});

// Функция анимации, вызывается раз в 30 мс
setInterval(function() {
    ctx.clearRect(0, 0, width, height);

    ball.draw();
    ball.move();

    ctx.strokeRect(0, 0, width, height);

}, 30);