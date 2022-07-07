
// audio
// pwa 
// deploy os and github pages
/****************** global variables ***********/

const prevButton: HTMLButtonElement = document.querySelector("#prev")!;
const nextButton: HTMLButtonElement = document.querySelector("#next")!;
const buttonsContainer: HTMLDivElement = document.querySelector(".buttons-container")!;
const levelNumberEl: HTMLParagraphElement = document.querySelector("#level-number")!;
const curTurnEl: HTMLParagraphElement = document.querySelector(".current-turn")!;
const startGameBTN: HTMLLabelElement = document.querySelector("#start-game")!;
const winMessageEl: HTMLDivElement = document.querySelector("#win")!;
const Board: HTMLDivElement = document.querySelector("#board")!;
const gameTable: HTMLElement = document.querySelector("main")!;

/****************** controller *****************/
const stepsController: { stepsArr: number[] } | any = {
  stepsArr: [],
  curStepsCount: 0,
  allStepsCount: 1,
  stepsProgressEl: document.querySelector<HTMLElement>(".steps .progress-bar")!,
  stepsSpan: document.querySelector<HTMLElement>(".steps span")!,

  set setCurStepsCount(value: number) {
    this.curStepsCount = value;
    this.stepsProgressEl.style.width = `${(this.curStepsCount / this.allStepsCount) * 100}%`
    this.stepsSpan.innerText = `steps (${this.curStepsCount}/${this.allStepsCount})`;
  },

  set setAllStepsCount(value: number) {
    this.allStepsCount = value;
    this.stepsSpan.innerText = `steps (${this.curStepsCount}/${this.allStepsCount})`;

  },
};

const stageController = {
  curStageCount: 0,
  allStageCount: 1, // -> stage count extract from the double level counts
  stageProgressEl: document.querySelector<HTMLElement>(".stage .progress-bar")!,
  stageSpan: document.querySelector<HTMLElement>(".stage span")!,

  set setCurStageCount(value: number) {
    this.curStageCount = value;
    this.stageSpan.innerText = `stages (${this.curStageCount}/${this.allStageCount})`;
    this.stageProgressEl.style.width = `${(this.curStageCount / this.allStageCount) * 100}%`
  },

  set setAllStageCount(value: number) {
    this.allStageCount = value;
    this.stageSpan.innerText = `stages (${this.curStageCount}/${this.allStageCount})`;
  },
};

// initialize game
// fetch the level and the scores from local storage

class GameAnimation {
  static async animateSteps(transitionTime: number) {
    for (const stepId of stepsController.stepsArr) {
      const button = document.getElementById(`${stepId}`);
      await GameAnimation.wait(transitionTime);
      button?.classList.add("clicked");
      await GameAnimation.wait(transitionTime);
      button?.classList.remove("clicked");
    }
  }
  static wait(time: number): Promise<null> {
    return new Promise((resolve) => {
      setTimeout(resolve, time);
    });
  }

  static async computerAutomation() {
    Controller.changeTurn("computer 🖥");
    await GameAnimation.animateSteps(300);
    Controller.changeTurn("player 👦🏽");
  }
  static async wrongClickAnimation() {
    for (let i = 0; i < 3; i++) {
      buttonsContainer.classList.add("wrong");
      await GameAnimation.wait(150);
      buttonsContainer.classList.remove("wrong");
      await GameAnimation.wait(150);
    }

    await GameAnimation.wait(500);
  }
}

class Controller {
  static generateStep(): void {
    const randomId = Math.ceil(Math.random() * Game.level);
    stepsController.stepsArr.push(randomId);
  }

  static disableNextAndPrevBTNs(disable: boolean) {
    nextButton.disabled = disable;
    prevButton.disabled = disable;
  }
  static changeTurn(turn: typeof Game.curTurn) {
    Game.curTurn = turn;
    curTurnEl.innerText = turn;

    // allow player to click with animation
    Game.curTurn === "computer 🖥"
      ? buttonsContainer.classList.remove("player-active")
      : buttonsContainer.classList.add("player-active");
  }

  static async gameLogic(id: number) {
    if (stepsController.stepsArr[stepsController.curStepsCount] === id) {
      stepsController.setCurStepsCount = stepsController.curStepsCount + 1;

      if (stepsController.curStepsCount >= stepsController.allStepsCount) {
        stageController.setCurStageCount = stageController.curStageCount + 1;

        if (stageController.curStageCount >= stageController.allStageCount) {
          // if level == 10 ( case win )
          Game.level++;
          if (Game.level >= 11) {
            Game.win();
            return;
          }

          Game.saveLevel();

          levelNumberEl.innerText = "" + Game.level;
          const newButton = Controller.createButtonEl(Game.colors[Game.level], "" + Game.level);
          buttonsContainer.append(newButton);

          await GameAnimation.wait(500);
          // update stages
          stageController.setCurStageCount = 0;
          stageController.setAllStageCount = Game.level * 2;

          // update steps
          stepsController.setCurStepsCount = 0;
          stepsController.stepsArr = [];
          stepsController.setAllStepsCount = 1;

          Controller.generateStep();
          await GameAnimation.computerAutomation();

          return;
        }

        Controller.generateStep();
        await GameAnimation.wait(500);
        stepsController.setCurStepsCount = 0;
        stepsController.setAllStepsCount = stepsController.stepsArr.length;
        await GameAnimation.computerAutomation();
      }
    } else {
      await GameAnimation.wait(500);
      stepsController.setCurStepsCount = 0;
      await GameAnimation.wrongClickAnimation();
      await GameAnimation.computerAutomation();
    }
  }

  static createButtonEl(color: string, id: string): HTMLLabelElement {
    const button = document.createElement("label");
    button.classList.add("game-btn");
    button.style.backgroundColor = color;
    button.style.backgroundImage = `linear-gradient(to top, ${color}, rgb(170, 170, 170))`;
    button.id = id;

    const frontground = document.createElement("label");
    frontground.style.backgroundColor = color;
    frontground.id = id;
    frontground.classList.add("front");
    frontground.innerText = color[0].toUpperCase();
    frontground.htmlFor = id;
    button.append(frontground);

    button.addEventListener("click", async (event: any) => {
      if (Game.curTurn == "computer 🖥") return;
      const id = +event.target.id;
      Controller.disableNextAndPrevBTNs(true);
      await Controller.gameLogic(id);
      Controller.disableNextAndPrevBTNs(false);

      console.log(stepsController.stepsArr);
    });

    return button;
  }
}

class Game {
  static level: number = 1;
  static curTurn: "computer 🖥" | "player 👦🏽" = "computer 🖥";
  // we add empty at the first becuase the id start from 1 not 0;
  static colors: string[] = [
    "",
    "blue",
    "forestgreen",
    "black",
    "coral",
    "yellow",
    "aqua",
    "red",
    "purple",
    "orange",
    "mediumslateblue",
  ];

  static saveLevel() {
    const savedLevel = window.localStorage.getItem("level")!;
    if (+savedLevel < Game.level) {
      window.localStorage.setItem("level", "" + Game.level);
    }
  }

  static win() {
    startGameBTN.style.display = "block";
    winMessageEl.style.display = "block";
    Board.style.display = "none";
    gameTable.style.display = "none";

    startGameBTN.querySelector("label")!.innerText = "Play again";
  }
  static extractLevelAndSet() {
    // it will extract level from local storage
    const level = window.localStorage.getItem("level");
    if (level) {
      Game.level = +level;
    }
  }
  static initializeGame(): void {
    // create all buttons
    buttonsContainer.innerHTML = "";
    stageController.setAllStageCount = Game.level * 2;
    const gameButtons: HTMLLabelElement[] = [];
    for (let i = 1; i <= Game.level; i++) {
      gameButtons.push(Controller.createButtonEl(Game.colors[i], "" + i));
    }

    curTurnEl.innerText = Game.curTurn;
    buttonsContainer.append(...gameButtons);
  }

  static updateCounters() {
    levelNumberEl.innerText = "" + Game.level;
    stepsController.setCurStepsCount = stepsController.curStepsCount;
    stepsController.setAllStepsCount = stepsController.allStepsCount;
    stageController.setCurStageCount = stageController.curStageCount;
    stageController.setAllStageCount = stageController.allStageCount;
  }

  static async start() {
    Game.initializeGame();
    stepsController.stepsArr = [];
    stepsController.curStepsCount = 0;
    stepsController.allStepsCount = 1;
    stageController.curStageCount = 0;
    Controller.generateStep();
    Game.updateCounters();
    await GameAnimation.wait(1000);
    await GameAnimation.computerAutomation();
  }
}

// check if the user already play the game or he win
if (window.localStorage.getItem("level")) {
  Game.extractLevelAndSet();
  if (Game.level >= 11) {
    Game.win();
  } else {
    startGameBTN.querySelector("label")!.innerText = "Continue";
  }
}


startGameBTN.addEventListener("click", async () => {
  Board.style.display = "block";
  gameTable.style.display = "block";
  winMessageEl.style.display = "none";
  startGameBTN.style.display = "none";
  if(Game.level >= 11) {
    Game.level = 1;
    window.localStorage.setItem("level", "" + Game.level);
  }
  Game.extractLevelAndSet();
  Game.start();
});


// next and prev
nextButton.addEventListener("click", (event) => {
  const maxLevel = window.localStorage.getItem("level");
  if (!maxLevel) return;
  if (+maxLevel > Game.level) {
    Game.level++;
    Game.start(); // restart the game
  }
});

prevButton.addEventListener("click", (event) => {
  if (Game.level > 1) {
    Game.level--;
    Game.start(); // restart the game
  }
});
