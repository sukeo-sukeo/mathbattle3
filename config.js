"use strict";

const M_WIDTH = 600;
const M_HEIGHT = 600;

const gameTitle = "かけざんバトル";

const views = {
  title: "title",
  select: "select",
  battle: "battle",
  status: "status",
  practice: "practice",
  console: "console",
};

let currentView = {
  title: true,
  select: false,
  battle: false,
  // status: false,
  // practice: false,
  console: false,
};


const btn_color = {
  red: "is-error",
  yellow: "is-warning",
  green: "is-success",
  blue: "is-primary",
  white: "",
  disabled: "is-disabled",
};

const enemy_assets = {
  catman: "./asset/enemey/enemey_catman.png",
  mimic: "./asset/enemey/enemey_mimic.png",
  sordman: "./asset/enemey/enemey_sordman.png",
  maou: "./asset/enemey/enemey_maou.png",
};

const enemey_status = {
  catman: [80, 20, 8],
  mimic: [50, 10, 5],
  sordman: [150, 35, 6],
  maou: [500, 50, 10],
};


