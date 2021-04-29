'use strict'

class Battle {
  constructor(enemey, player) {
    this.enemey = enemey;
    this.player = player;
    this.frameCount = 0;
    this.question;
    this.answer;
    this.intervalID;

    //敵キャラのhpをdom反映
    this.enemeyHPBar = document.getElementById("enemeyHpBar").children[0];
    this.enemeyHPBar.value = enemey_status[this.enemey.name][0];
    this.enemeyHPBar.max = enemey_status[this.enemey.name][0];

    //プレイヤーのhpをdom反映
    this.playerHPBar = document.getElementById("playerHpBar").children[0];
    this.playerHPBar.value = player.hp;
    this.playerHPBar.max = player.hp;

  }

  start() {
    this._inputEvent();
    //レディーゴーの演出
    this._mainLoop()
  }

  _mainLoop() {
    //最初の問題
    this._createQuestion();
    
    //以下ループ(エネミースピード毎に問題提出)
    const pushQuestion = () => {
      this.frameCount++;
      console.log('frame', this.frameCount);
      console.log('intervalID', this.intervalID);
      //エネミースピード毎に問題提出
      if (this.frameCount % this.enemey.spd === 0) {
        this._createQuestion();
        this._attack(this.enemey)
        if (this.player.hp <= 0) {
          this._loose();
          return;
        }
      }
    };

    this.intervalID = setInterval(pushQuestion, 1000);

  }

  _createQuestion() {
    const container = document.getElementById("question");
    [this.question, this.answer] = this.enemey.thinkQuestion();
    container.textContent = this.question;
  }

  _inputEvent() {
    const input = document.getElementById('answerField')
    window.addEventListener('keydown', e => {
      if (e.key === 'Enter') {
        if (input.value) {
          this._checkAnswer(input.value)
        }
        input.value = ''
      }
    })
  }

  _checkAnswer(val) {
    if (Number(val) === Number(this.answer)) {
      console.log('あってます！');
      this._attack(this.player)
      if (this.enemey.hp <= 0) {
        this._win()
        return
      }
    } else {
      console.log('ちがいます！');
      this._attack(this.enemey)
      if (this.player.hp <= 0) {
        this._loose()
        return
      }
    }
    this.frameCount = 0;
    clearInterval(this.intervalID);
    this._mainLoop()
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
    clearInterval(this.intervalID)
    sleep(1, () => {
      alert("勝利した！")
      console.log("★★★★★★★★");
      console.log('勝利した！');
      console.log("★★★★★★★★");
      setLocation(views.select);
    });
  }
  
  _loose() {
    clearInterval(this.intervalID);
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