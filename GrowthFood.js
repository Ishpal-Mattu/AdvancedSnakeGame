class GrowthFood extends Food {
    constructor(foodSize, snakeArray){
        super(foodSize);
        
        this.snake = snakeArray;
        super.position = this.NewPosition();        
        this.color = '#FF6347';
        this.addPiece = 1;
    }
    Update(snakeArray){
        this.snake = snakeArray;
        this.position = this.NewPosition();

        this.Draw(this.color, defaultColor);
    }
    NewPosition(){
        let x = GetRandomInt(this.size, canvas.width - this.size);
        let y = GetRandomInt(this.size, canvas.height - this.size);

        for(let i = 0; i < this.snake.length; i++){
            while(!this.PositionValid(x, y, i, this.snake))
            {
                x = GetRandomInt(this.size, canvas.width - this.size)
                y = GetRandomInt(this.size, canvas.height - this.size);

                i = 0;
            }
        }

        return [x,y];
    }
    
}
