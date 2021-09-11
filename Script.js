// Music: “Follow Me”, from PlayOnLoop.com Licensed under Creative Commons by Attribution 4.0
let backgroundMusic = new Sound("./Music/BackgroundMusic.wav", true, 0.7);

// Sound effect when collecting GrowthFood obtained from http://soundbible.com/ under the Attribution 3.0 license
let growthFoodEffect = new Sound("./Music/GrowthFoodSound.wav", false, 1);

// gameover sound effect from https://www.freesoundslibrary.com/ under Attribution 4.0 International (CC BY 4.0) license
let gameOverEffect = new Sound("./Music/GameOverEffect.mp3", false, 1);

// sound effect when eating poisonous apple obtained from https://www.freesoundslibrary.com/ under Attribution 4.0 International (CC BY 4.0) license 
let poisonEffect = new Sound("./Music/PoisonSound.mp3", false, 1);


const canvas = document.getElementsByTagName('canvas')[0];
const minWidth = 550;
const maxWidth = 900;

if(window.innerWidth/2 > maxWidth)
    canvas.width = maxWidth;
else if(window.innerWidth/2 < minWidth)
    canvas.width = minWidth;
else
    canvas.width = window.innerWidth/2;

canvas.height = canvas.width/2
const context = canvas.getContext('2d');
const canvasContainer = document.getElementsByTagName('main')[0];
const defaultColor = 'darkgreen';


const Key = {
    Left: {action: "left", code: 37},
    Right: {action: "right", code: 39},
    Up: {action: "up", code: 38},
    Down: {action: "down", code: 40},
    Space: {action: "play again", code: 32}
}

let snake = new Snake(20, 10, 1);

function Main(){

    document.removeEventListener("keydown", StartPlay);
    let gameOver = false;
    let gameWon = false;
    snake.Draw();

    document.addEventListener('keydown', SnakeDirection)
    
    MoveSnake();
    
    
}
let prevDirection = snake.snakeDirection;

function Intro(){
    const xMin = 30;
    const xMax = canvas.width - xMin;
    const yMin = 30;
    const yMax = canvas.height - yMin;
    context.fillStyle = '#99ddf7';
    context.clearRect(xMin, yMin, xMax - xMin, yMax - yMin);
    context.fillRect(xMin, yMin, xMax - xMin, yMax - yMin);

    const yMiddle = (yMin + yMax)/2
    context.font = "bold 25px Arial";
    context.fillStyle = 'darkblue';
    context.textAlign = "center";
    let textY = yMiddle - 80;
    let text = "Advanced Snake Game";
    context.fillText(text, (xMin + xMax)/2, textY);

    context.font = "normal 15px Georgia";
    textY += 30;
    text = "Use arrow keys to move the snake.\nEat the red apple to grow and reach a new highscore.\nDon't eat the poisonous purple apple or your snake will shrink.\n \nRemember: \nRed apple makes snake grow by 1 unit\nPurple apple makes snake shrink by 2 units";
    let linesToOutput = text.split('\n');
    const lineHeight = 15;
    const redIndex = 5;
    const purpleIndex = 6;
    for(let i =0; i<linesToOutput.length; i++){
        if(i == redIndex)
            context.fillStyle = '#FF6347'
        else if (i == purpleIndex)
            context.fillStyle = 'purple'
        textY += lineHeight
        context.fillText(linesToOutput[i], (xMin + xMax)/2, textY);
        context.fillStyle = 'darkblue'
    }
    textY += lineHeight*2;
    context.fillStyle = 'black';
    text = "Click space to start slitering..."
    context.fillText(text, (xMin + xMax)/2, textY)
    document.addEventListener("keydown", StartPlay);
    
}

Intro();

function GameOver(){
    gameOverEffect.PlaySound();
    backgroundMusic.StopSound();
    
    const xMin = 80;
    const xMax = canvas.width - xMin
    const yMin = 40;
    const yMax = canvas.height - yMin;
    context.fillStyle = 'black';
    context.clearRect(xMin, yMin, xMax - xMin, yMax - yMin);
    context.fillRect(xMin, yMin, xMax - xMin, yMax - yMin);

    context.font = "bold 30px Arial"
    context.fillStyle = 'red'
    context.textAlign = "center";
    let textY = yMin + 60
    let text = "Game Over"
    context.fillText(text, (xMin + xMax)/2, textY);

    context.font = "normal 15px Georgia"
    textY += 25;
    text = "score: " + snake.score.GetScore() + "    highscore: " + snake.score.GetHighScore();
    context.fillText(text, (xMin + xMax)/2, textY)

    context.font = "normal 15px Arial"
    textY = yMax - 60;
    text = "click space to play again"
    context.fillText(text, (xMin + xMax)/2, textY)

}

function SnakeDirection(event){
    if(event.keyCode == Key.Up.code && snake.snakeDirection !== Key.Down.action)
        snake.ChangeDirection(Key.Up.action)
    
    else if(event.keyCode == Key.Down.code && snake.snakeDirection !== Key.Up.action)
        snake.ChangeDirection(Key.Down.action)
    
    else if(event.keyCode == Key.Left.code && snake.snakeDirection !== Key.Right.action)
        snake.ChangeDirection(Key.Left.action)
    
    else if(event.keyCode == Key.Right.code && snake.snakeDirection !== Key.Left.action)
        snake.ChangeDirection(Key.Right.action)

    event.preventDefault();
    
}

function MoveSnake(){ 
    let animate = requestAnimationFrame(MoveSnake);
    let newX = snake.currentX;
    let newY = snake.currentY;
    let speed = snake.speed;

    if(prevDirection != snake.snakeDirection)
    {
        if(prevDirection != null)
            speed = snake.size;
            
        prevDirection = snake.snakeDirection;
    }

    if(snake.snakeDirection === Key.Up.action){
        newY -= speed;
    }
    else if(snake.snakeDirection === Key.Down.action){
        newY += speed;
    }
    else if(snake.snakeDirection === Key.Left.action){
        newX -= speed;
    }
    else if(snake.snakeDirection === Key.Right.action){
        newX += speed;
    }

    if(newX != snake.currentX || newY!= snake.currentY){
        if(snake.score.GetScore() > 0)
            snake.Update(newX, newY);

        if(snake.score.GetScore() <= 0 || snake.isColliding())
        {
            snake.Draw();
            cancelAnimationFrame(animate);
            snake.score.UpdateHighScore();
            GameOver();
            document.removeEventListener("keydown", SnakeDirection);
            document.addEventListener("keydown", StartPlay)

        }
        
    }

}

function StartPlay(e){
    
    

    if(e.keyCode == Key.Space.code){
        if(e.target == document.body)
            e.preventDefault();

        snake.ResetSnake();
        backgroundMusic.PlaySound();
        Main();
        e.prevDirection();
    }
    
}
