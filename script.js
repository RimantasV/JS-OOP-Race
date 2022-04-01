let numberOfCars = 0;
let distance = 0;
const cars = [];
const body = document.querySelector("body");

function isPositiveInteger(n) {
  return Number.isInteger(n) && n > 0;
}

function getUserInput() {
  while (!isPositiveInteger(numberOfCars)) {
    numberOfCars = prompt("Kiek masinu turi lenktyniauti?", 5);
    numberOfCars = parseInt(numberOfCars);
    if (!isPositiveInteger(numberOfCars)) {
      alert("Reikia ivesti sveikaji skaiciu");
    }
  }

  while (!isPositiveInteger(distance)) {
    distance = prompt("Koks distance?", 100);
    distance = parseInt(distance);
    if (!isPositiveInteger(distance)) {
      alert("Reikia ivesti sveikaji skaiciu");
    }
  }
}

function Car(id) {
  this.marke = id;
  this.speed = 0;
  this.distance = 0;
  console.log("Created car #" + id);
}

Car.prototype.accelerate = function (s) {
  this.speed += s;
};

Car.prototype.slowdown = function (s) {
  this.speed -= s;
  if (this.speed < 0) {
    this.speed = 0;
  }
};

Car.prototype.move = function () {
  this.distance = this.distance + this.speed * 0.5;
};

function drawCars() {
  for (let i = 0; i < numberOfCars; i++) {
    cars[i] = new Car(i + 1);
    const car = document.createElement("div");
    car.setAttribute("id", i);
    car.setAttribute(
      "style",
      "position: absolute; width: 100px; height: 50px; border-width: 5px; border-style: solid;"
    );
    car.style.top = i * 80 + 80 + "px";
    body.appendChild(car);
  }
}

function drawFinishLine() {
  const finishLine = document.createElement("div");
  finishLine.setAttribute(
    "style",
    "position: absolute; top: 50px; width: 5px; border-width: 5px; border-color: red; border-style: solid;"
  );
  finishLine.style.left = distance * 3 + 100 + "px";
  finishLine.style.height = numberOfCars * 80 + 30 + "px";
  body.appendChild(finishLine);
}

function move() {
  let win = 0;
  for (let i = 0; i < numberOfCars; i++) {
    cars[i].move();

    $("#" + i).css("left", cars[i].distance * 3);
    $("#" + i).text(
      "distance:" + cars[i].distance + " speed: " + cars[i].speed
    );
  }

  for (let i = 0; i < numberOfCars; i++) {
    if (cars[i].distance > distance) {
      clearInterval(moveInterval);
      clearInterval(paceInterval);
      win = 1;
      break;
    }
  }
  if (win == 1) {
    let maks = 0;
    let info;
    for (let j = 0; j < numberOfCars; j++) {
      if (cars[j].distance > maks) {
        maks = cars[j].distance;
        info = cars[j].marke;
      }
    }
    let winnerText = document.createTextNode("Laimejo masina " + info);
    document.querySelector(".winner-text").appendChild(winnerText);
  }
}

function pace() {
  for (let i = 0; i < numberOfCars; i++) {
    if (Math.random() < 0.5) {
      cars[i].accelerate(Math.floor(Math.random() * 5 + 1));
    } else {
      cars[i].slowdown(Math.floor(Math.random() * 5 + 1));
    }
  }
}

getUserInput();
drawFinishLine();
drawCars();
pace();
move();

var moveInterval = setInterval(move, 500);
var paceInterval = setInterval(pace, 2000);
