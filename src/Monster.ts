import { SimpleFighter } from './Fighter';

export default class Monster implements SimpleFighter {
  constructor(
    private _lifePoints: number = 85,
    private _strength: number = 63,
  ) {}

  get lifePoints(): number {
    return this._lifePoints;
  }

  get strength(): number {
    return this._strength;
  }

  receiveDamage(attackPoints: number): number {
    const life = this._lifePoints - attackPoints;
    this._lifePoints = Math.max(life, -1);
    return this._lifePoints;
  }

  receiveAttack(attackPoints: number): number {
    const life1 = this._lifePoints - attackPoints;
    this._lifePoints = Math.max(life1, -1);
    return this._lifePoints;
  }

  attack(enemy: SimpleFighter): void {
    enemy.receiveDamage(this._strength);
  }
}