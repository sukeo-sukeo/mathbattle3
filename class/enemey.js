"use strict";

class Enemey {
  constructor(src, name, hp, atk, spd) {
    this.src = src;
    this.name = name || "test";
    this.hp = hp || 1;
    this.atk = atk || 1;
    this.spd = spd || 5;
    this.alive = true;
  }
  create() {
    const img = document.createElement("img");
    img.setAttribute("id", this.name);
    img.style.cursor = 'pointer'
    img.src = this.src;
    return img;
  }

  thinkQuestion() {
    // console.log(rand(1, 9));;
    const num1 = rand(1,9)
    const num2 = rand(1, 9)
    const question = `${num1}×${num2}`;
    const answer = num1 * num2;
    console.log(question);
    console.log(answer);
    return [question, answer];
  }


  doAttack(enemey, player) {
    player.hp -=  enemey.atk
    console.log(`${enemey.name}の攻撃`);
    console.log(`${player.name}は${enemey.atk}のダメージ！`);
    console.log('enemeyHP', enemey.hp);
    console.log('playerHP', player.hp);
    return [enemey, player]
  }

  createInfoBox(enemey) {
    console.log(enemey);
    return `
    <div class="nes-container with-title is-centered"
      style="padding: 20px 0 0 0;width: 25%;"
      >
        <span class="title" id="info_${enemey.name}">
          ${enemey.name}
        </span>
        <span id="info_${enemey.name}_status">
          <div class="lists">
            <ul class="nes-list is-disc"
            style="text-align: left;"
            >
              <li>HP: ${enemey.hp}</li>
              <li>こうげき: ${enemey.atk}</li>
              <li>はやさ: ${20-enemey.spd*2}</li>
            </ul>
          </div>
        </span>
      </div>
    `;
  }
}

export default Enemey;
