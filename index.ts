// const appDiv: HTMLElement = document.getElementById("app");

// create start button

// end page and retry
// audio
// wrong animation
// progress bar
// party event when next level
// next and prev

/****************** global variables ***********/

// const prevButton: HTMLButtonElement = document.getElementById("prev")!;
// const nextButton: HTMLButtonElement = document.getElementById("next")!;
const buttonsContainer: HTMLDivElement = document.querySelector(".buttons-container")!;
const levelNumberEl: HTMLParagraphElement = document.querySelector("#level-number")!;
const curTurnEl: HTMLParagraphElement = document.querySelector(".current-turn")!;
const startGameBTN: HTMLLabelElement = document.querySelector("#start-game")!;
const Board: HTMLDivElement = document.querySelector("#board")!;
const gameTable: HTMLElement = document.querySelector("main")!;

/****************** controller *****************/
const stepsController: { stepsArr: number[] } | any = {
  stepsArr: [],
  curStepsCount: 0,
  allStepsCount: 1,
  allStepsCountEl: document.querySelector<HTMLParagraphElement>(".all-steps-count")!,
  curStepsCountEl: document.querySelector<HTMLParagraphElement>(".current-steps-count")!,

  set setCurStepsCount(value: number) {
    this.curStepsCount = value;
    this.curStepsCountEl.innerText = "" + this.curStepsCount;
  },

  set setAllStepsCount(value: number) {
    this.allStepsCount = value;
    this.allStepsCountEl.innerText = "" + this.allStepsCount;
  },
};

const stageController = {
  curStageCount: 0,
  allStageCount: 1, // -> stage count extract from the double level counts
  curStageCountEl: document.querySelector<HTMLParagraphElement>(".current-stage-count")!,
  allStageCountEl: document.querySelector<HTMLParagraphElement>(".all-stage-count")!,

  set setCurStageCount(value: number) {
    this.curStageCount = value;
    this.curStageCountEl.innerText = "" + this.curStageCount;
  },

  set setAllStageCount(value: number) {
    this.allStageCount = value;
    this.allStageCountEl.innerText = "" + this.allStageCount;
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
    Controller.changeTurn("computer");
    await GameAnimation.animateSteps(300);
    Controller.changeTurn("player");
  }
  static async wrongClickAnimation() {}
}

class Controller {
  static generateStep(): void {
    const randomId = Math.ceil(Math.random() * Game.level);
    stepsController.stepsArr.push(randomId);
  }

  static changeTurn(turn: typeof Game.curTurn) {
    Game.curTurn = turn;
    curTurnEl.innerText = turn;

    // allow player to click with animation
    Game.curTurn === "computer"
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
          if (Game.level >= 11) document.body.innerHTML = "";
          Game.saveLevel();
            
          levelNumberEl.innerText = "" + Game.level;
          const newButton = Controller.createButtonEl(Game.colors[Game.level], "" + Game.level);
          buttonsContainer.append(newButton);

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
        stepsController.setCurStepsCount = 0;
        stepsController.setAllStepsCount = stepsController.stepsArr.length;
        await GameAnimation.computerAutomation();
      }
    } else {
      stepsController.setCurStepsCount = 0;
      await GameAnimation.computerAutomation();
    }
  }

  static createButtonEl(color: string, id: string): HTMLLabelElement {
    const button = document.createElement("label");
    button.classList.add("game-btn");
    button.style.backgroundColor = color;
    button.style.backgroundImage = `linear-gradient(to top, ${color}, rgb(130, 130, 130))`;
    button.id = id;

    const frontground = document.createElement("label");
    frontground.style.backgroundColor = color;
    frontground.id = id;
    frontground.classList.add("front");
    frontground.innerText = color[0].toUpperCase();
    frontground.htmlFor = id;
    button.append(frontground);

    button.addEventListener("click", (event: any) => {
      if (Game.curTurn == "computer") return;
      const id = +event.target.id;
      Controller.gameLogic(id);
      console.log(stepsController.stepsArr);
    });

    return button;
  }
}

class Game {
  static level: number = 1;
  static curTurn: "computer" | "player" = "computer";
  // we add empty at the first becuase the id start from 1 not 0;
  static colors: string[] = [
    "",
    "red",
    "blue",
    "black",
    "forestgreen",
    "coral",
    "yellow",
    "aqua",
    "purple",
    "orange",
    "mediumslateblue",
  ];

  static saveLevel() {
    window.localStorage.setItem("level", "" + Game.level);
  }

  static extractLevelAndSet() { // it will extract level from local storage
    const level = window.localStorage.getItem("level");
    if(level) {
      Game.level = +level;
    }
  } 
  static initializeGame(): void {
    // create all buttons
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
    Game.extractLevelAndSet();
    Game.initializeGame();
    Controller.generateStep();
    Game.updateCounters();
    await GameAnimation.wait(1000);
    await GameAnimation.computerAutomation();
  }
}

startGameBTN.addEventListener("click", async () => {
  Board.style.display = "block";
  gameTable.style.display = "block"; 
  startGameBTN.style.display = "none";
  Game.start();
});

// check if the user already play the game
if(window.localStorage.getItem("level")) {
  startGameBTN.querySelector("label")!.innerText = "Continue";
}
