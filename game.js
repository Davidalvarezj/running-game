const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');
const btnUp = document.querySelector('#up');
const btnLeft = document.querySelector('#left');
const btnRight = document.querySelector('#right');
const btnDown = document.querySelector('#down');
const spanLives = document.querySelector('#lives');
const spanTime = document.querySelector('#time');
let recordTime = localStorage.getItem("record_time");
const spanTimeRec = document.querySelector('#timeRec')


let canvasSize;
let elementsSize;
let level = 0;
let lives = 3;
let init = false;

let timePlayer;
let timeInterval;
let winmsg;
let timeStart;

let mapRowCols = []; 
const playerPosition = {
  x: undefined,
  y: undefined,
};
const giftPosition = {
  x: undefined,
  y: undefined,
};
let enemyPositions = [];
if (!recordTime){
  localStorage.setItem("record_time",27.4);
  recordTime=27.4
}


window.addEventListener('load', setCanvasSize);
window.addEventListener('resize', setCanvasSize);

function setCanvasSize() {
  if (window.innerHeight > window.innerWidth) {
    canvasSize = (window.innerWidth * 0.7).toFixed(2);
  } else {
    canvasSize = (window.innerHeight * 0.7).toFixed(2);
  }
  
  canvas.setAttribute('width', canvasSize);
  canvas.setAttribute('height', canvasSize);
  
  elementsSize = (canvasSize / 10);

  playerPosition.x=undefined


  startGame();
}

function startGame() {
  game.clearRect(0, 0, canvas.width, canvas.height);
  enemyPositions = [];
  if(!timeStart){
    timeStart=(Date.now()/1000).toFixed(1);
    timeInterval = setInterval(showTime,200);


  }

  game.font = elementsSize + 'px Verdana';
  game.textAlign = 'end';
  const map = maps[level];

  if (level==3) {
    gameWin();
    return;

  }

  if (!init){
  const mapRows = map.trim().split('\n');
  mapRowCols = mapRows.map(row => row.trim().split(''));
  init = true;
  }

  mapRowCols.forEach((row, rowI) => {
    row.forEach((col, colI) => {
      const emoji = emojis[col];
      const posX = elementsSize * (colI + 1);
      const posY = elementsSize * (rowI + 1);

      if (col == 'X'| col == 'B'| col == 'C' | col == 'J' | col == 'H') {
        enemyPositions.push({
          x: posX,
          y: posY,
      });
      }
      if (col == 'O' && !playerPosition.x) {
        playerPosition.x = posX;
        playerPosition.y = posY;
      }
      if (col == 'I'| col == 'Y') {
        giftPosition.x = posX;
        giftPosition.y = posY;
      }

      game.fillText(emoji, posX, posY);
    });
  });

  movePlayer();
  showLives()
}



function movePlayer() {
  // Validar si la posicion player es igual al fin regalo
  const giftCollisionX = playerPosition.x.toFixed(2) == giftPosition.x.toFixed(2);
  const giftCollisionY = playerPosition.y.toFixed(2) == giftPosition.y.toFixed(2);
  const giftCollision = giftCollisionX && giftCollisionY;
  if (giftCollision) {

    levelWin();
  }

  // Validar si la posicion player es igual al enemy
  const enemyCollision = enemyPositions.find(enemy => {
    const enemyCollisionX = Number(enemy.x.toFixed(2)) == Number(playerPosition.x.toFixed(2));
    const enemyCollisionY = Number(enemy.y.toFixed(2)) == Number(playerPosition.y.toFixed(2));
    return enemyCollisionX && enemyCollisionY;
  });
  
  if (enemyCollision) {

    console.log(playerPosition.x, playerPosition.y)
    let a = Number((playerPosition.x/elementsSize)-1).toFixed(0)
    let b =Number((playerPosition.y/elementsSize)-1).toFixed(0)

    console.log(a,b);
    mapRowCols[b][a]='BOMB_COLLISION';

    levelFail();
  }



// Renderizar la posicion del Player
  game.fillText(emojis['PLAYER'], playerPosition.x, playerPosition.y);

}

window.addEventListener('keydown', moveByKeys);
btnUp.addEventListener('click', moveUp);
btnLeft.addEventListener('click', moveLeft);
btnRight.addEventListener('click', moveRight);
btnDown.addEventListener('click', moveDown);

function moveByKeys(event) {
  if (level<=2){
    if (event.key == 'ArrowUp') moveUp();
    else if (event.key == 'ArrowLeft') moveLeft();
    else if (event.key == 'ArrowRight') moveRight();
    else if (event.key == 'ArrowDown') moveDown();
  }
}
function moveUp() {

  if(playerPosition.y.toFixed(2)>elementsSize) playerPosition.y -= elementsSize;
  startGame();
}
function moveLeft() {

  if(playerPosition.x.toFixed(2)>elementsSize) playerPosition.x -= elementsSize;
  startGame();
}
function moveRight() {

  if(playerPosition.x.toFixed(2)<elementsSize*10) playerPosition.x += elementsSize;
  startGame();
}
function moveDown() {
  if(playerPosition.y.toFixed(2)<elementsSize*10) playerPosition.y += elementsSize;

  startGame();
}

function levelWin(){
  console.log('Subiste de nivel!');
  level++;
  init = false;
 
  startGame();
}

function gameWin() {
  console.log('¡Terminaste el juego!');
  clearInterval(timeInterval);
  if (recordTime){
    const playerTime = (Date.now()/1000 - timeStart).toFixed(1);
    if(recordTime>=playerTime){
      localStorage.setItem("record_time",playerTime)
      console.log("Superaste el record actual!!")
      winmsg="Added new Record: "+playerTime+"'"
    }else{
      console.log("Lo siento no superaste el record")
      winmsg="Keep trying for new record..."
    }
  }
  recordTime = localStorage.getItem("record_time");
  showTime()
  game.clearRect(0, 0, canvas.width, canvas.height);
  game.textAlign = 'center';
  game.font = elementsSize*1.3 + 'px seif';
  game.fillText("Congratulations!", canvas.width/2, canvas.width/3)
  game.fillText("🏆", canvas.width/2, canvas.width/2)
  game.font = elementsSize + 'px serif';
  game.fillText("Finish!", canvas.width/2, canvas.width/3*2)
  game.font = elementsSize*0.5 + 'px serif';
  game.fillText(winmsg, canvas.width/2, canvas.width/4*3)

}

function levelFail(){
  lives--;

  if(lives == 0){
    level = 0; 
    lives = 3;
    timeStart=undefined;
    init = false;
  } 
  console.log('Chocaste contra un enemigo :(');
  playerPosition.y = undefined
  playerPosition.x = undefined
  startGame();
}

function showLives() {
  const heartsArray = Array(lives).fill(emojis['HEART']); // [1,2,3]
  // console.log(heartsArray);
  
  spanLives.innerHTML = "";
  heartsArray.forEach(heart => spanLives.append(heart));
}

function showTime() {
  spanTime.innerHTML = (Date.now()/1000 - timeStart).toFixed(1);
  spanTimeRec.innerHTML = recordTime;
}