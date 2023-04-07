const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

let gameOn = false
let animationId
let obstacleId
let score = 0

const road = new Image()
road.src = './images/road.png'

const car = new Image()
car.src = './images/car.png'

function showScore () {
  ctx.fillStyle = 'black'
  ctx.fillRect(380,15,100,35)
  ctx.fillStyle = 'white'
  ctx.font = '20px sans-serif'
  ctx.fillText(`Score: ${score}`, 390, 40)
}

const player = {
  x: canvas.width/2 - 25,
  y: canvas.height - 120,
  width: 50,
  height: 100,
  draw() {
    ctx.drawImage(car, this.x, this.y, this.width, this.height)
  }

}

let obstaclesArr = []

class Obstacle {
  constructor(){
    this.x = Math.random() * canvas.width;
    this.y = 0;
    this.width = 10 + Math.random() * 200;
    this.height = 20
  }

  draw(){
    ctx.fillStyle = 'brown'
    ctx.fillRect(this.x, this.y, this.width, this.height)
  }
}

function gameOver() {
  score = 0

  gameOn = false
  ctx.clearRect(0, 0, 500, 700)
  ctx.fillStyle = 'black'
  ctx.fillRect(0,0,500,700)
  ctx.fillStyle = 'white'
  ctx.font = '40px sans-serif'
  ctx.fillText("Game over", 150, 300)
  if (score < 10) {
    ctx.fillText(`Final score: ${score}`, 150, 340)
    ctx.fillText("You lose!", 150, 380)
    
  } else {

    ctx.fillText(`Final score: ${score}`, 150, 340)
    ctx.fillText("You win!", 150, 380)

  }
  obstaclesArr = []
  clearInterval(animationId)
  clearInterval(obstacleId)
  player.x = canvas.width/2 - 25
  player.y = canvas.height - 120

}

function checkCollision(obst) {

  if (
    player.x < obst.x + obst.width &&
    player.x + player.width > obst.x &&
    player.y < obst.y + obst.height &&
    player.y + player.height > obst.y
  ) {
    gameOver()
    console.log("colliding")

  
  }

}

function animationLoop() {

  ctx.clearRect(0, 0, 500, 700)
  ctx.drawImage(road, 0, 0, 500, 700)
  player.draw()

  
  obstaclesArr.forEach((obstacle, i, arr) => {
    checkCollision(obstacle)
    obstacle.y += 1
    if (obstacle.y > canvas.height) {
      score += 1
      arr.splice(i, 1)
    }
    obstacle.draw()
  })
  showScore()
  
  if (score > 1) {
    gameOver()
  }
}




function startGame() {
  
  if (!gameOn) {
    
    animationId = setInterval(animationLoop, 16)
    obstacleId = setInterval(()=> {
      obstaclesArr.push(new Obstacle())
    }, 2000)
    gameOn = true
    console.log("starting...")
  }



}


window.onload = () => {
  document.getElementById('start-button').onclick = () => {
    startGame();
  };

  document.addEventListener('keydown', ((e) => {
    switch(e.keyCode){
      case 38: // up arrow
      player.y -= 5;
      break;
    case 40: // down arrow
      player.y += 5;
      break;
    case 37: // left arrow
      if(player.x <= 0) {
        player.x += 10
      }
      player.x -= 5;
      break;
    case 39: // right arrow
    if(player.x >= canvas.width - 50) {
      player.x -= 10
    }
      player.x += 5;
      break;
    }
  }))

};
