class Food{
    constructor(foodSize){

        this.size = foodSize;
        this.position = [0, 0];      
        
    }
    Draw(foodColor, resetColor){
        context.fillStyle = foodColor
        context.fillRect(this.position[0], this.position[1], this.size, this.size);
        context.fillStyle = resetColor
    }
    PositionValid(x, y, snakeIndex, snakePos){
        if((x >= snakePos[snakeIndex].x && x <= snakePos[snakeIndex].x + this.size && y >= snakePos[snakeIndex].y && y <= snakePos[snakeIndex].y + this.size) || (x + this.size >= snakePos[snakeIndex].x && x + this.size <= snakePos[snakeIndex].x + this.size && y >= snakePos[snakeIndex].y && y <= snakePos[snakeIndex].y + this.size) || (x >= snakePos[snakeIndex].x && x <= snakePos[snakeIndex].x + this.size && y + this.size >= snakePos[snakeIndex].y && y + this.size <= snakePos[snakeIndex].y + this.size) || (x + this.size >= snakePos[snakeIndex].x && x + this.size <= snakePos[snakeIndex].x + this.size && y + this.size >= snakePos[snakeIndex].y && y + this.size <= snakePos[snakeIndex].y + this.size))
        {
            return false;
        }

        return true;
    }
    
    
}

// code in the function GetRandomInt(min, max) comes from developer.mozilla.org:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function GetRandomInt(min, max){
    min = Math.ceil(min);
    max = Math.floor(max);

    return Math.floor(Math.random() * (max - min) + min);
}
