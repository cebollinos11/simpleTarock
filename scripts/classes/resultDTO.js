export class ResultDTO
{
    constructor(roundsWon,totalRounds,multiplier,roundScore,listOfBonus,totalForThisRound,accumulatedScore)

    {
        this.roundsWon = roundsWon;
        this.totalRounds = totalRounds;
        this.multiplier = multiplier;
        this.roundScore = roundScore;
        this.listOfBonus = listOfBonus;
        this.totalForThisRound = totalForThisRound;
        this.accumulatedScore = accumulatedScore;
    }
}

export class Bonus{
    constructor(displayName,points,success)
    {
        this.displayName = displayName;
        this.points = points;
        this.success = success;
    }

}

