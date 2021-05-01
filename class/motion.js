'use strict'

class Motion {
  static attack(target) {
    anime({
      targets: target,
      translateY: 50,
      direction: "alternate",
      duration: 200
    })
  }

  static damage(target) {
    anime({
      targets: target,
      translateY: -10,
      direction: "alternate",
      duration: 100,
      scale: 0.9,
    })
  }
  
  static huttobi(target) {
    anime({
      targets: target,
      translateY: -300,
      translateX: 1000,
      duration: 5000,
      scale: 0.1,
      rotate: "2turn",
    });
  }
  
  static shake_b(target) {
    // 敵にダメージを与えたとき
    anime({
      targets: target,
      translateY: 5,
      translateX: 5,
      duration: 100,
      direction: "alternate",
    });
  }

  static shake_f(target) {
    //敵の攻撃を受けたとき
    anime({
      targets: target,
      translateY: -5,
      translateX: -5,
      duration: 100,
      direction: "alternate",
    });
  }

  static flyingNum(target) {
    // 正解時の数字のモーション
    anime({
      targets: target,
      translateY: -100,
      // translateX: 50,
      duration: 200,
      scale: 2,
      color: "#f00",
      textShadow: "2px 2px 1px #fff",
      direction: "alternate",
    });
  }
  
  static dropNum(target) {
    //　不正解時の数字のモーション
    anime({
      targets: target,
      translateY: 20,
      translateX: 100,
      duration: 200,
      color: "#00f",
      direction: "alternate",
    });
  }
}

export default Motion