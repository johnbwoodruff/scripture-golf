import { Stats } from './player.types';

export class Player {
  public name: string;
  public playerNumber: number;
  private score: number;
  private stats: Stats[];

  constructor(name: string, playerNumber: number) {
    this.name = name;
    this.playerNumber = playerNumber;
    this.score = 0;
    this.stats = [];
  }

  public addPoint(round: number): void {
    this.score += 1;
    const index = round - 1;

    // Check if round already has points in stats array. If so, add to it. If not, create round of stats.
    if (this.stats.length === round) {
      this.stats[index].score = this.stats[index].score + 1;
    } else {
      this.stats.push({
        round,
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
