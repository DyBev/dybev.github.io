const width = 16;
const height = 16;
const grid = document.querySelector(".grid");
const color = "#EEF4D4";

for (let i = 0; i < width * height; i++) {
    const content = document.createElement("div");
    content.setAttribute("class", "content");
    content.setAttribute("id", i); // Just for debugging, not used

    const tile = document.createElement("div");
    tile.setAttribute("class", "tile");
    tile.appendChild(content);

    grid.appendChild(tile);
}

let snakePositions = [168,169,170,171];
let applePosition = 100;
let gameStarted = false;

const tiles = document.querySelectorAll(".grid .tile .content");
const appleTile = tiles[applePosition]

const scoreElement = document.querySelector(".score");
const noteElement = document.querySelector("footer");

const speed = 300;

let inputs = [];

let startTimestamp;
let stepsTaken = 0;
let score = 0;
let pause = false;

window.addEventListener("keydown", function(event) {
if (!["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"," ","p","P"].includes(event.key))
    return;

    event.preventDefault();

    if(event.key == " "){
        resetGame();
        startGame();
        return;
    }

    if(event.key == "p" || event.key == "p"){
        if(pause){
            pause = false;
            window.requestAnimationFrame(main);
            scoreElement.innerText = score;
        } else {
            pause = true;
            scoreElement.innerText = "GAME PAUSED...CURRENT SCORE: " + score;
        }
        
    }

    if(event.key == "ArrowLeft" && inputs[inputs.length - 1] != "left" && headDirection() != "right"){
        inputs.push("left");
        return;
    }

    if(event.key == "ArrowRight" && inputs[inputs.length - 1] != "right" && headDirection() != "left"){
        inputs.push("right");
        return;
    }

    if(event.key == "ArrowUp" && inputs[inputs.length - 1] != "up" && headDirection() != "down"){
        inputs.push("up");
        return;
    }

    if(event.key == "ArrowDown" && inputs[inputs.length - 1] != "down" && headDirection() != "up"){
        inputs.push("down");
        return;
    }

});

function resetGame() {
    snakePositions = [168, 169, 170, 171];
    applePosition = 100; 

    startTimestamp = undefined;
    lastTimestamp = undefined;
    stepsTaken = -1;
    score = 0;
    contrast = 1;

    inputs = [];

    for (const tile of tiles) setTile(tile);

    setTile(tiles[applePosition], {
        "background-color": color,
        "border-radius": "50%"
    });

    for (const i of snakePositions.slice(1)) {
        const snakePart = tiles[i];
        snakePart.style.backgroundColor = color;

        if (i == snakePositions[snakePositions.length - 1]) { snakePart.style.left = 0; }
        if (i == snakePositions[0]) { snakePart.style.right = 0; }
    }
}

function startGame() {
    gameStarted = true;
    window.requestAnimationFrame(main);
}

function main(timestamp){
    if(pause){
        return;
    } else try{
        if (startTimestamp == undefined) startTimestamp = timestamp;
        const totalElapsedTime = timestamp - startTimestamp;
        
        const stepsShouldHaveTaken = Math.floor(totalElapsedTime / speed);
        const percentageOfStep = (totalElapsedTime % speed) / speed;

        if (stepsTaken !== stepsShouldHaveTaken) {
            step(percentageOfStep);
            
            const headPosition = snakePositions[snakePositions.length - 1];
            if(headPosition == applePosition){
                score++;
                scoreElement.innerText = score;

                addNewApple();
            }

            stepsTaken++;
        } else { transition(percentageOfStep) }

        window.requestAnimationFrame(main);
    }catch (error){
        noteElement.innerHTML = `${error.message}. Press space to reset the game`;
    }
}

function step(percentageOfStep) { //transition step
    const newHeadPosition = getNextPosition();
    snakePositions.push(newHeadPosition);

    const previousTail = tiles[snakePositions[0]];
    setTile(previousTail);

    if(!gameStarted) { return }

    if (newHeadPosition !== applePosition) {
        snakePositions.shift();

        const tail = tiles[snakePositions[0]];
        const tailDi = tailDirection();

        const tailValue = `${100 - percentageOfStep * 100}%`

        if (tailDi == "right")
            setTile(tail, { left : 0, width: tailValue, "background-color": color });
  
        if (tailDi == "left")
            setTile(tail, { right : 0, width: tailValue, "background-color": color });
  
        if (tailDi == "down")
            setTile(tail, { top : 0, height: tailValue, "background-color": color });
  
        if (tailDi == "up")
            setTile(tail, { bottom : 0, height: tailValue, "background-color": color });
    
    }
    
    const previousHead = tiles[snakePositions[snakePositions.length - 2]];
    setTile(previousHead, { "background-color": color });

    const head = tiles[newHeadPosition];
    const headDi = headDirection();
    const headValue = `${percentageOfStep * 100}%`;

    if (headDi == "right")
    setTile(head, {left: 0,width: headValue,"background-color": color,"border-radius": 0});

    if (headDi == "left")
    setTile(head, {right: 0,width: headValue,"background-color": color,"border-radius": 0});

    if (headDi == "down")
    setTile(head, {top: 0,height: headValue,"background-color": color,"border-radius": 0});

    if (headDi == "up")
    setTile(head, {bottom: 0,height: headValue,"background-color": color,"border-radius": 0});

    head.style.backgroundColor = color;
}

function transition(percentageOfStep) {
    const head = tiles[snakePositions[snakePositions.length - 1]];
    const headDi = headDirection();
    const headValue = `${percentageOfStep * 100}%`;

    if (headDi == "right" || headDi == "left") head.style.width = headValue;
    if (headDi == "down" || headDi == "up") head.style.height = headValue;

    const tail = tiles[snakePositions[0]];
    const tailDi = tailDirection();
    const tailValue = `${100 - percentageOfStep * 100}%`;

    if (tailDi == "right" || tailDi == "left") tail.style.width = tailValue;
    if (tailDi == "down" || tailDi == "up") tail.style.height = tailValue;
}

function getNextPosition(){
    const headPosition = snakePositions[snakePositions.length - 1];
    const snakeDirection = inputs.shift() || headDirection();

    switch(snakeDirection){
        case "right": {
            const nextPosition = headPosition + 1;
            if(nextPosition % width == 0) throw Error("The snake bonked the wall");
            if(snakePositions.includes(nextPosition)) throw Error("the snake bonked itself");
            return nextPosition;
        }
        case "left": {
            const nextPosition = headPosition - 1;
            if(nextPosition % width == width - 1 || nextPosition < 0) throw Error("the snake bonked the wall");
            if(snakePositions.includes(nextPosition)) throw Error("the snake bonked itself");
            return nextPosition;
        }
        case "down": {
            const nextPosition = headPosition + width;
            if(nextPosition > width * height - 1) throw Error("the snake bonked the wall");
            if(snakePositions.includes(nextPosition)) throw Error("The snake bonked itself");
            return nextPosition;
        }
        case "up": {
            const nextPosition = headPosition - width;
            if(nextPosition < 0) throw Error("the snake bonked the wall");
            if(snakePositions.includes(nextPosition)) throw Error("the snake bonked itself");
            return nextPosition;
        }
    }
}

function setTile(element, overrides = {}) {
    const defaults = {
      width: "100%",
      height: "100%",
      top: "auto",
      right: "auto",
      bottom: "auto",
      left: "auto",
      "background-color": "transparent",
      "border-radius" : "none"
    };
    const cssProperties = { ...defaults, ...overrides };
    element.style.cssText = Object.entries(cssProperties)
      .map(([key, value]) => `${key}: ${value};`)
      .join(" ");
}

function addNewApple() {
    let newPosition;
    do {
      newPosition = Math.floor(Math.random() * width * height);
    } while (snakePositions.includes(newPosition));

    setTile(tiles[newPosition], {
      "background-color": color,
      "border-radius": "50%"
    });

    setTile(tiles[applePosition], {
        "background-color": "black",
        "border-radius": "0"
    });

    applePosition = newPosition;
}

function headDirection() {
    const head = snakePositions[snakePositions.length - 1];
    const neck = snakePositions[snakePositions.length - 2];
    return getDirection(head, neck);
}

function tailDirection() {
    const tail1 = snakePositions[0];
    const tail2 = snakePositions[1];
    return getDirection(tail1, tail2);
}

function getDirection(first, second) {
    if (first - 1 == second) return "right";
    if (first + 1 == second) return "left";
    if (first - width == second) return "down";
    if (first + width == second) return "up";
    throw Error("the two tile are not connected");
}