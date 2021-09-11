class Score{
    constructor(x,y, startingScore){
        this.xAxis = x;
        this.yAxis = y;
        this.startingScore = startingScore;
        this.score = startingScore;
        this.highScore = this.score;
    }
    Output(){
        let output = "Score: " + this.score;
        context.fillStyle = defaultColor
        context.font = "15px Georgia";
        context.fillText(output, this.xAxis, this.yAxis)
    }
    AddScore(scoreAdd){
        if(this.score + scoreAdd < 0)
            this.score = 0;
        else
            this.score += scoreAdd;
    }
    RemoveScore(scoreRemove){
        this.AddScore(-scoreRemove);
    }
    GetScore(){
        return this.score;
    }
    UpdateHighScore(){
        if(this.score > this.highScore)
            this.highScore = this.score;
    }
    GetHighScore(){
        return this.highScore;
    }
    ResetScore(){
        this.score = this.startingScore;
    }
}
