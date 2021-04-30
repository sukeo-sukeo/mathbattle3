'use strict'

class Battle {
  constructor(enemey, player) {
    this.enemey = enemey;
    this.player = player;
    this.question;
    this.answer;

    //クリックしなくても入力可能にする
    this.focus = document.getElementById('answerField').focus()

    //敵キャラのhpをdom反映
    this.enemeyHPBar = document.getElementById("enemeyHpBar").children[0];
    this.enemeyHPBar.value = enemey_status[this.enemey.name][0];
    this.enemeyHPBar.max = enemey_status[this.enemey.name][0];

    //プレイヤーのhpをdom反映
    this.playerHPBar = document.getElementById("playerHpBar").children[0];
    this.playerHPBar.value = player.hp;
    this.playerHPBar.max = player.hp;

    //activeTimeBarの反映
    this.timeBar = document.getElementById('activeTimeBar').children[0]
    this.timeBar.value = 0
    this.timeBar.max = this.enemey.spd
  }

  start() {
    this._inputEvent();
    //レディーゴーの演出
    this._activeTime()
    this._createQuestion();
  }
  
  _activeTime() {
    const countUp = () => {
      if (this.timeBar.value >= this.timeBar.max) {
        this.timeBar.value = 0
        this._sayQuestion()
      }
      this.timeBar.value += 1/100
      setTimeout(() => countUp(), 10)
    }
    countUp()
  }

  _sayQuestion() {
    this._createQuestion();
    this._attack(this.enemey);
    this.timeBar.value = 0;
    if (this.player.hp <= 0) {
      this._loose();
      return;
    }
  }


  _createQuestion() {
    const container = document.getElementById("question");
    [this.question, this.answer] = this.enemey.thinkQuestion();
    container.textContent = this.question;
  }

  _inputEvent() {
    const input = document.getElementById('answerField')
    
    window.addEventListener('keyup', async (e) => {
      if (e.key === 'Enter') {
        if (input.value) {
          //全角のときは半角に変換する処理
          const answer = await zenkakuCheck(input.value)
          this._checkAnswer(answer)
        }
        input.value = ''
      }
    })
  }

  _checkAnswer(val) {
    if (Number(val) === Number(this.answer)) {
      console.log('あってます！');
      this._attack(this.player)
      this.timeBar.value = 0;
      this._createQuestion();
      if (this.enemey.hp <= 0) {
        this._win()
        return
      }
    } else {
      console.log('ちがいます！');
      this._attack(this.enemey)
      this.timeBar.value = 0;
      if (this.player.hp <= 0) {
        this._loose()
        return
      }
    }
  }

  _attack(done) {
    //敵か味方かどちらの攻撃か判断
    const side = done.constructor.toString().split(" ")[1]; 
    console.log(side);
    if (side === 'Enemey') {
      // 敵の攻撃
      [this.enemey, this.player] = this.enemey.doAttack(this.enemey, this.player);
      this.playerHPBar.value -= this.enemey.atk
    } else {
      // プレイヤーの攻撃
      [this.enemey, this.player] = this.player.doAttack(this.enemey, this.player,  this.answer);
      this.enemeyHPBar.value -= this.answer
    }
  }

  _win() {
    sleep(1, () => {
      alert("勝利した！")
      console.log("★★★★★★★★");
      console.log('勝利した！');
      console.log("★★★★★★★★");
      setLocation(views.select);
    });
  }
  
  _loose() {
    sleep(1, () => {
      alert("負けた...");
      setLocation(views.select)
    })
  }

  _chengeView(view) {
    // dataの切り替え
    for (let key of Object.keys(currentView)) {
      if (String(view) === String(key)) {
        currentView[view] = true;
      } else {
        currentView[key] = false;
      }
    }
    // domの切り替え
    for (let key of Object.keys(currentView)) {
      if (currentView[key]) {
        document.getElementById(key + "Display").style.display = "";
      } else {
        document.getElementById(key + "Display").style.display = "none";
      }
    }
  }

}

export default Battle