'use strict'

const initElement = (data_wrapper) => {
  // data_wrapper.style.display = 'none'
  while (data_wrapper.firstChild) {
    data_wrapper.removeChild(data_wrapper.firstChild);
  }
};

const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const sleep = (waitSec, callbackFunc) => {
  let spanedSec = 0;
  let waitFunc = () => {
    spanedSec++;

    if (spanedSec >= waitSec) {
      if (callbackFunc) callbackFunc();
      return;
    }

    clearTimeout(id);
    id = setTimeout(waitFunc, 1000);
  };

  let id = setTimeout(waitFunc, 1000);
}

const setLocation = (locaName) => {
  localStorage.setItem("mathbat3", locaName);
  location.reload();
}

const fade = (color) => {
  const target = document.getElementById("fadeLayer");
  console.log(target.style);
  // if (target.style.visibility)
  target.style.left = 0
}

