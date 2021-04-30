'use strict'

import Game from './class/game.js'

const init = (game) => {
  game.setEvent()
  game.createEnemeyImages()
  game.createConsole()
  game.createPlayer('sukeo')

  const location = localStorage.getItem('mathbat3')
  if (location) {
    switch (location) {
      case views.select:
        game.changeView(views.select);
        break;
    }
  } else {
    game.changeView(views.title)
  }
  //dev↓
  // game.changeView(views.battle, 'mimic');
}


const main = () => {
  const game = new Game();
  init(game)
} 


window.onload = () => {
  window.addEventListener('keydown', e => {
    console.log(e.isComposing);
    if (e.isComposing) {
      console.log('入力中');
    }
  })
  main();
  // blackoutoの時間
  const time = 500
  // ローディングをかませたい
  setTimeout(() => {
    document.getElementById("fadeLayer").style.left = '100%';
  }, time)
};

export default main