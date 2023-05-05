import { EnergyType } from '../Energy';
import Archetype from './Archetype';

export default class Necromancer extends Archetype {
  private _energyType: EnergyType;
  private static _createdArchetypesInstances = 0;

  constructor(name: string) {
    super(name);
    this._energyType = 'mana';
    Necromancer._createdArchetypesInstances += 1;
  }

  get energyType() {
    return this._energyType;
  }

  static createdArchetypeInstances() {
    return Necromancer._createdArchetypesInstances;
  }
}