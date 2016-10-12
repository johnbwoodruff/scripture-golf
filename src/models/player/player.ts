export interface Stats {
  round: number;
  score: number;
}

export interface Person {
  name: string;
  playerNumber: number;
  addPoint(round: number);
  getScore(): number;
  getStats(): Stats[];
}

export class Player implements Person {
  public score: number;
  public stats: Stats[];

  constructor(public name: string, public playerNumber: number) {
    this.name = name;
    this.playerNumber = playerNumber;
    this.score = 0;
    this.stats = [];
  }

  // TODO: Probably remove this method.
  // public saveRoundScore(round: number, points: number) {
  //   this.score += points;
  //   this.stats.push({
  //     round: round,
  //     score: points
  //   });
  // }

  public addPoint(round: number) {
    this.score += 1;
    // Check if round already has points in stats array. If so, add to it. If not, create round of stats.
    if(this.stats.length === round) {
      this.stats[round-1].score = this.stats[round-1].score + 1;
    }
    else {
      this.stats.push({
        round: round,
        score: 1
      });
    }
  }

  public getScore(): number {
    return this.score;
  }

  public getStats(): Stats[] {
    return this.stats;
  }
}
