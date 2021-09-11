class Snake{
    
    constructor(x,y, snakeLength){
        this.size = 8;
        this.defaultX = x;
        this.defaultY = y;
        this.defaultLength = snakeLength;
        this.currentX;
        this.currentY;

        this.xLimits = [0, canvas.width - this.size];
        this.yLimits = [0, canvas.height - this.size];
        
        if(this.isSnakeValid(x,y, snakeLength))
        {
            this.snakeDirection = Key.Right.action;
            this.speed = 1.5;
            this.snakePos = this.GetStartSnake(snakeLength * this.size);
            this.growthFood = new GrowthFood(this.size, this.snakePos);
            this.poison = new PoisonFood(this.size, this.snakePos, this.growthFood.position);
            this.poisonChangeCounter = 0;
            this.poisonCounterLimit = 100 * this.size;

            this.score = new Score(canvas.width - 70, 20, snakeLength);
            
        }
        else
            throw "Error: given x,y position or snakeLength for your Snake is not valid";
    }
    isSnakeValid(x, y, length){
        if(isNaN(x) || isNaN(y) || isNaN(length))
            return false;

        length = length*this.size;
        if(x + this.size - length < this.xLimits[0])
            return false;

        this.currentX = x;
        this.currentY = y;

        if(this.CheckLimits())
            return false;
        
        return true;
    }
    Draw(){
        context.clearRect(0,0, canvas.width, canvas.height);
        let size = this.size
        this.growthFood.Draw(this.growthFood.color, defaultColor);
        this.poison.Draw(this.poison.color, defaultColor)
        this.score.Output();
        this.snakePos.forEach(function(position){
            context.fillRect(position.x, position.y, size, size)
        })
        
        
    }
    Update(x, y){
        if(this.isGrowthFoodIntersecting()){
            growthFoodEffect.PlaySound();
            this.AddSnakePiece(this.growthFood.addPiece);
            this.growthFood.Update(this.snakePos);
            this.score.AddScore(this.growthFood.addPiece)
        }
        if(this.isPoisonIntersecting()){
            poisonEffect.PlaySound();
            this.RemoveSnakePiece(this.poison.removePiece);
            this.poison.Update(this.snakePos, this.growthFood.position);
            this.poisonChangeCounter = 0;
            this.score.RemoveScore(this.poison.removePiece)
        }
        else if (this.poisonChangeCounter == this.poisonCounterLimit){
            this.poison.Update(this.snakePos, this.growthFood.position);
            this.poisonChangeCounter = 0;
        }
        else
        {
            this.poisonChangeCounter++;
        }
        
        
        for(let i = this.snakePos.length-1; i>0; i--){
            this.snakePos[i].x = this.snakePos[i-1].x;
            this.snakePos[i].y = this.snakePos[i-1].y;
        }

        this.currentX = x;
        this.currentY = y;

        this.snakePos[0].x = this.currentX;
        this.snakePos[0].y = this.currentY;

        
        
        this.Draw();
    } 
    AddSnakePiece(addNum){
        const someValue = -10;
        for(let i = 1; i<= this.size * addNum; i++)
            this.snakePos.push({x: someValue, y: someValue});
        //this.Update(this.currentX, this.currentY);
    }
    RemoveSnakePiece(removeNum){
        for(let i = 1; i<= this.size * removeNum; i++)
        {
            this.snakePos.pop();
        }
    }
    isGrowthFoodIntersecting(){
        for(let i = 0; i<this.snakePos.length; i++){
            if(!this.growthFood.PositionValid(this.growthFood.position[0], this.growthFood.position[1], i, this.snakePos)){
                return true;
            }
        }

        return false;
    }
    isPoisonIntersecting(){
        for(let i =0; i<this.snakePos.length; i++){
            if(!this.poison.PositionValid(this.poison.position[0], this.poison.position[1], i, this.snakePos))
                return true;
        }

        return false;
    }
    ChangeDirection(snakeDirection){
        snakeDirection = snakeDirection.toLowerCase();
        

        if(snakeDirection === Key.Right.action)
            this.snakeDirection = Key.Right.action;

        else if(snakeDirection === Key.Left.action)
            this.snakeDirection = Key.Left.action;

        else if(snakeDirection === Key.Up.action)
            this.snakeDirection = Key.Up.action;

        else if(snakeDirection === Key.Down.action)
            this.snakeDirection = Key.Down.action;
        else
            throw "direction given is not valid";
        
    }
    GetStartSnake(length){
        let snake = [];
        snake.push({x: this.currentX, y: this.currentY});
        for(let i =1; i<length-this.size; i++){
            snake.push({x: snake[i-1].x - this.speed, y: snake[i-1].y});
        }
        return snake; 
    }
    isColliding(){
        if(this.CheckLimits())
        {
            return true;
        }

        const xIndex = 0;
        const yIndex = 1;
        let snakeHead = [this.snakePos[0].x, this.snakePos[0].y];

        let statement1 = false;
        let statement2 = false;
        let statement3 = false;
        let statement4 = false;

        if(this.snakeDirection == Key.Up.action)
        {
            statement1 = true;
            statement2 = true;
        }
        else if(this.snakeDirection == Key.Down.action)
        {
            statement3 = true;
            statement4 = true;
        }
        else if(this.snakeDirection == Key.Left.action)
        {
            statement1 = true;
            statement3 = true;
        }
        else if(this.snakeDirection == Key.Right.action)
        {
            statement2 = true;
            statement4 = true;
        }

        for(let i = 1; i<this.snakePos.length; i++){
            if(statement1 == true && snakeHead[xIndex] >= this.snakePos[i].x && snakeHead[xIndex] < this.snakePos[i].x + this.size && snakeHead[yIndex] >= this.snakePos[i].y && snakeHead[yIndex] < this.snakePos[i].y + this.size)
            {
                return true;
            }
            else if (statement2 == true && snakeHead[xIndex] + this.size > this.snakePos[i].x && snakeHead[xIndex] + this.size <= this.snakePos[i].x + this.size && snakeHead[yIndex] >= this.snakePos[i].y && snakeHead[yIndex] < this.snakePos[i].y + this.size)
            {
                return true;
            }
            else if (statement3 == true && snakeHead[xIndex] >= this.snakePos[i].x && snakeHead[xIndex] < this.snakePos[i].x + this.size && snakeHead[yIndex] + this.size > this.snakePos[i].y && snakeHead[yIndex] + this.size <= this.snakePos[i].y + this.size)
            {
                return true;
            }
            else if (statement4 == true && snakeHead[xIndex] + this.size > this.snakePos[i].x && snakeHead[xIndex] + this.size <= this.snakePos[i].x + this.size && snakeHead[yIndex] + this.size > this.snakePos[i].y && snakeHead[yIndex] + this.size <= this.snakePos[i].y + this.size)
            {
                return true;
            }
        }

        return false;
    }
    CheckLimits(){
        if(this.currentX < this.xLimits[0] || this.currentX > this.xLimits[1] || this.currentY < this.yLimits[0] || this.currentY > this.yLimits[1]){
            return true;
        }

        return false;
    }
    ResetSnake(){
        this.currentX = this.defaultX;
        this.currentY = this.defaultY;
        this.snakePos = this.GetStartSnake(this.defaultLength);
        this.snakeDirection = Key.Right.action;
        this.poisonChangeCounter = 0;
        this.score.ResetScore();
        this.growthFood.Update(this.snakePos);
        this.poison.Update(this.snakePos, this.growthFood.position);
    }
    
}
