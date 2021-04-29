"use strict";

class NumConsole {
  constructor(width, height) {
    this.btn_w = width || 70
    this.btn_h = height || 70
  }

  createBtn(max) {
    let btns = [];
    for (let i = 0; i < max; i++) {
      const btn = document.createElement("button");
      btn.style.width = `${this.btn_w}px`;
      btn.style.height = `${this.btn_h}px`;
      btn.setAttribute("class", `nes-btn num`);
      btn.textContent = i;
      btns.push(btn);
    }
    return btns;
  }

  setBtn(btns) {
    const parent = document.getElementById('numKeyWrapper')
    btns.forEach(btn => {
      parent.appendChild(btn)
    });
  }

  eventSet() {

  }

}

export default NumConsole;
