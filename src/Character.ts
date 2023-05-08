import Archetype, { Mage, Necromancer, Ranger, Warrior } from './Archetypes';
import Energy from './Energy';
import Fighter, { SimpleFighter } from './Fighter';
import Race, { Dwarf, Elf, Halfling, Orc } from './Races';
import getRandomInt from './utils';

export default class Character implements Fighter {
  private _race: Race;
  private _archetype: Archetype;
  private _maxLifePoints: number;
  private _lifePoints: number;
  private _strength: number;
  private _defense: number;
  private _dexterity: number;
  private _energy: Energy;

  constructor(
    private name: string,
    characterArchetype = 'mage',
    charachterRace = 'elf',
  ) {
    this._dexterity = getRandomInt(1, 10);
    this._race = this.getRace(charachterRace, name);
    this._archetype = this.getArchetype(characterArchetype, name);
    this._maxLifePoints = this._race.maxLifePoints / 2;
    this._lifePoints = this._maxLifePoints;
    this._strength = getRandomInt(1, 10);
    this._defense = getRandomInt(1, 10);
    this._energy = {
      type_: this._archetype.energyType,
      amount: getRandomInt(1, 10),
    };
  }

  get race(): Race {
    return this._race;
  }

  get archetype(): Archetype {
    return this._archetype;
  }

  get maxLifePoints(): number {
    return this._maxLifePoints;
  }

  get lifePoints(): number {
    return this._lifePoints;
  }

  get strength(): number {
    return this._strength;
  }

  get defense(): number {
    return this._defense;
  }

  get dexterity(): number {
    return this._dexterity;
  }

  get energy(): Energy {
    return { ...this._energy };
  }  

  receiveDamage(attackPoints: number): number {
    const damage = attackPoints - this._defense;
    this._lifePoints -= damage > 0 ? damage : 1;
    if (this._lifePoints < 0) {
      this._lifePoints = -1;
    }
    return this.lifePoints;
  }

  attack(enemy: SimpleFighter): void {
    enemy.receiveDamage(this._strength);
  }

  levelUp(): void {
    this._maxLifePoints = Math.min(
      this.race.maxLifePoints,
      this._maxLifePoints + getRandomInt(1, 10),
    );
    this._lifePoints = this._maxLifePoints;
    this._strength += getRandomInt(1, 10);
    this._defense += getRandomInt(1, 10);
    this._dexterity += getRandomInt(1, 10);
    this._energy.amount = 10;
  }

  getArchetype = (
    characterArchetype: string | undefined,
    name: string,
  ): Archetype => {
    const type = characterArchetype?.toLocaleLowerCase() || 'elf';

    switch (type) {
      case 'necromancer':
        return new Necromancer(name);
      case 'ranger':
        return new Ranger(name);
      case 'warrior':
        return new Warrior(name);
      default:
        return new Mage(name);
    }
  };

  getRace(
    charachterRace: string | undefined,
    name: string,
  ): Race {
    switch (charachterRace?.toLowerCase()) {
      case 'dwarf':
        return new Dwarf(name, this._dexterity);
      case 'halfling':
        return new Halfling(name, this._dexterity);
      case 'orc':
        return new Orc(name, this._dexterity);
      default:
        return new Elf(name, this._dexterity);
    }
  }

  special(enemy: Fighter): void {
    if (this._energy.amount < 5) {
      throw new Error('Not enough energy to perform this action');
    }
    this._energy.amount -= 5;
    enemy.receiveDamage(this._strength * 2);
  }
}
