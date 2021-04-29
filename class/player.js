"use strict";

class Player {
  constructor(name) {
    this.name = name;
    this.hp = 100;
    this.alive = true;
  }

  doAttack(enemey, player, val) {
    console.log(val);
    enemey.hp -= val
    console.log(`${player.name}の攻撃`);
    console.log(`${enemey.name}は${val}のダメージ！`);
    return [enemey, player];
  }
}

export default Player;
