export class ResultDTO
{
    constructor(tricksWon,totalRounds,extraTricks,multiplier,roundScore,listOfBonus,totalForThisRound,accumulatedScore,roundNumber,maxRounds)

    {
        this.tricksWon = tricksWon;
        this.totalRounds = totalRounds;
        this.extraTricks = extraTricks;
        this.multiplier = multiplier;
        this.roundScore = roundScore;
        this.listOfBonus = listOfBonus;
        this.totalForThisRound = totalForThisRound;
        this.accumulatedScore = accumulatedScore;
        this.roundNumber = roundNumber;
        this.maxRounds = maxRounds;
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

