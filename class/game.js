'use strict'

import NumConsole from "./numConsole.js";
import Enemey from "./enemey.js";
import Player from "./player.js";
import Battle from "./battle.js";


class Game {
  constructor() {
    this.player;
  }

  createPlayer(name) {
    this.player = new Player(name);
    // console.log(this.player);
  }

  changeView(view, eneID = "") {
    // console.log(view);
    // dataの切り替え
    for (let key of Object.keys(currentView)) {
      if (String(view) === String(key)) {
        currentView[view] = true;
      } else {
        currentView[key] = false;
      }
      if (String(view) === "battle" || String(view) === "practice") {
        currentView["console"] = true;
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

    // enemeyIDがあるときはバトル画面なので敵をクリエイト
    if (eneID) {
      const eneContainer = document.getElementById("enemey");
      // console.log(eneID);
      const eneData = new Enemey(
        enemy_assets[eneID],
        eneID,
        ...enemey_status[eneID]
      );
      console.log(eneData);
      const eneImage = eneData.create();
      eneContainer.appendChild(eneImage);
      
      const battle = new Battle(eneData, this.player);
      battle.start()
    }
  }

  createConsole() {
    const numCon = new NumConsole();
    numCon.setBtn(numCon.createBtn(10));
  }

  setEvent(images) {
    const targets = this._judegeInstance(images);
    if (targets instanceof Array) {
      // arrayのとき
      [...targets].forEach((target) => {
        // console.log(target);
        switch (target.id) {
          case "kunren":
            break;
          case "tuyosa":
            break;
          case "startBtn":
            target.addEventListener("click", (e) =>
              this.changeView(views.select)
            );
            break;
          case "backBtn":
            target.addEventListener("click", (e) => {
              this.changeView(views.title)
              localStorage.removeItem("mathbat3");
            });
            break;
          case "practiceBtn":
            break;
          case "givupBtn":
            target.addEventListener("click", (e) => {
              fade()
              if (confirm('あきらめますか?')) {
                sleep(1, () => {
                  alert("負けた...");
                  setLocation(views.select);
                });
              } else {
                return
              }
            })
            break;
          case "attackBtn":
            // numConsoleクラスで定義
            break;
          case "deleteBtn":
            // numConsoleクラスで定義
            break;
        }
      });
    } else {
      //データがobjectのときはエネミー情報なのでバトルへ
      // console.log("object", targets);
      targets.enemeys.forEach((enemey) => {
        enemey.addEventListener("click", (e) => {
          this.changeView("battle", enemey.id);
        });
      });
    }
  }

  _judegeInstance(images) {
    let targets = [];
    if (!images) {
      const tmp = document.getElementsByTagName("button");
      targets = [...tmp];
    } else {
      targets = { enemeys: images };
    }
    return targets;
  }

  //セレクト画面の敵配置
  createEnemeyImages() {
    let enemeyImages = [];
    let enemeyData = [];
    for (let key of Object.keys(enemy_assets)) {
      if (key === "maou") continue;
      const enemeyImage = new Enemey(
        enemy_assets[key],
        key,
        enemey_status[key][0],
        enemey_status[key][1],
        enemey_status[key][2],
      );
      // console.log(enemeyImage);
      enemeyImage.name = key;
      // 敵キャラのステータス表示ボックスを作成
      // あとづけのためimgと分離されています
      enemeyData.push(enemeyImage)
      // 敵キャラのimgデータ作成
      enemeyImages.push(enemeyImage.create());
    }
    this._setEnemeyInfo(enemeyData)
    this._setEnemeyImages(enemeyImages);
    this.setEvent(enemeyImages);
  }

  _setEnemeyImages(images) {
    images.forEach((image) => {
      document.getElementById("enemeyContainer").appendChild(image);
    });
  }

  _setEnemeyInfo(enemeys) {
    console.log(enemeys);
    const container = document.getElementById("infoContainer");
    enemeys.forEach((enemey) => {
      const infoEle = enemey.createInfoBox(enemey);
      container.insertAdjacentHTML('beforeend', infoEle)
    })
  }
}

export default Game