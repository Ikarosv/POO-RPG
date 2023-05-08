import Character from './Character';
import Monster from './Monster';
import Dragon from './Dragon';
import Battle, { PVE, PVP } from './Battle';

const player1 = new Character('player1');

for (let i = 0; i < 5; i += 1) player1.levelUp();

const player2 = new Character('player2');
const player3 = new Character('player3');
console.log(player1.lifePoints, player2.lifePoints, player3.lifePoints);
console.log(player1.race.maxLifePoints / 2, player2.race.maxLifePoints / 2, player3.race.maxLifePoints / 2);

const monster1 = new Monster();
const monster2 = new Dragon();

const pvp = new PVP(player2, player3);

const pve = new PVE(player1, [monster1, monster2]);

function runBattles(battles: Battle[]) {
  battles.forEach((battle) => {
    battle.fight();
  });
}

export { player1, player2, player3 };
export { monster1, monster2 };
export { pvp };
export { pve };
export { runBattles };