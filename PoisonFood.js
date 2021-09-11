class PoisonFood extends Food{
    constructor(foodSize, snakeArray, growthFoodPos){
        super(foodSize);
        
        this.growthFoodPos = growthFoodPos;
        this.snake = snakeArray;
        this.position = this.NewPosition();
        this.color = 'purple';
        this.removePiece = 2
    }

    Update(snakeArray, growthFoodPos){
        this.snake = snakeArray;
        this.growthFoodPos = growthFoodPos;
        this.position = this.NewPosition();
        
        this.Draw(this.color, defaultColor);
    }
    NewPosition(){
        let x = GetRandomInt(this.size, canvas.width - this.size);
        let y = GetRandomInt(this.size, canvas.height - this.size);

        for(let i = 0; i < this.snake.length; i++){
            while(!this.isPosValid(x, y, i, this.snake, this.growthFoodPos))
            {
                x = GetRandomInt(this.size, canvas.width - this.size)
                y = GetRandomInt(this.size, canvas.height - this.size);

                i = 0;
            }
        }

        return [x,y];
    }
    isPosValid(x, y, snakeIndex, snakePos, growthFoodPos){
        if((x >= snakePos[snakeIndex].x && x <= snakePos[snakeIndex].x + this.size && y >= snakePos[snakeIndex].y && y <= snakePos[snakeIndex].y + this.size) || (x + this.size >= snakePos[snakeIndex].x && x + this.size <= snakePos[snakeIndex].x + this.size && y >= snakePos[snakeIndex].y && y <= snakePos[snakeIndex].y + this.size) || (x >= snakePos[snakeIndex].x && x <= snakePos[snakeIndex].x + this.size && y + this.size >= snakePos[snakeIndex].y && y + this.size <= snakePos[snakeIndex].y + this.size) || (x + this.size >= snakePos[snakeIndex].x && x + this.size <= snakePos[snakeIndex].x + this.size && y + this.size >= snakePos[snakeIndex].y && y + this.size <= snakePos[snakeIndex].y + this.size))
        {
            return false;
        }
        else if((x >= growthFoodPos[0] && x <= growthFoodPos[0] + this.size && y >=  growthFoodPos[1] && y <= growthFoodPos[1] + this.size) || (x + this.size >=  growthFoodPos[0] && x + this.size <=  growthFoodPos[0] + this.size && y >=  growthFoodPos[1] && y <=  growthFoodPos[1] + this.size) || (x >=  growthFoodPos[0] && x <=  growthFoodPos[0] + this.size && y + this.size >=  growthFoodPos[1] && y + this.size <=  growthFoodPos[1] + this.size) || (x + this.size >=  growthFoodPos[0] && x + this.size <=  growthFoodPos[0] + this.size && y + this.size >=  growthFoodPos[1] && y + this.size <=  growthFoodPos[1] + this.size))
            return false;

        return true;
    }
}
