// const appDiv: HTMLElement = document.getElementById("app");

// create start button

/****************** global variables ***********/

// const prevButton: HTMLButtonElement = document.getElementById("prev")!;
// const nextButton: HTMLButtonElement = document.getElementById("next")!;
const buttonsContainer: HTMLDivElement = document.querySelector(".buttons-container")!;
const levelNumberEl: HTMLParagraphElement = document.querySelector("#level-number")!;
const curTurnEl: HTMLParagraphElement = document.querySelector(".current-turn")!;

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
  allStageCount: Game.level * 2, // -> stage count extract from the double level counts
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
      await this.wait(transitionTime);
      button?.classList.add("clicked");
      await this.wait(transitionTime);
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
    await this.animateSteps(300);
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
          if (Game.level >= 10) document.body.innerHTML = "";

          levelNumberEl.innerText = "" + Game.level;
          const newButton = this.createButtonEl(Game.colors[Game.level], "" + Game.level);
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
    button.id = id;

    button.addEventListener("click", (event: any) => {
      if (Game.curTurn == "computer") return;
      const id = +event.target.id;
      this.gameLogic(id);
    });

    return button;
  }
}

class Game {
  static level: number = 0;
  static curTurn: "computer" | "player" = "computer";
  static colors: string[] = ["red", "blue", "black"];

  static extractLevel() {} // it will extreact level from local storage
  static initializeGame(): void {
    // create all buttons
    const gameButtons: HTMLLabelElement[] = [];
    for (let i = 1; i <= this.level; i++) {
      gameButtons.push(Controller.createButtonEl(this.colors[i], "" + i));
    }

    curTurnEl.innerText = this.curTurn;
    buttonsContainer.append(...gameButtons);
  }

  static updateCounters() {
    levelNumberEl.innerText = "" + this.level;
    stepsController.setCurStepsCount = stepsController.curStepsCount;
    stepsController.setAllStepsCount = stepsController.allStepsCount;
    stageController.setCurStageCount = stageController.curStageCount;
    stageController.setAllStageCount = stageController.allStageCount;
  }

  static async start() {
    this.initializeGame();
    Controller.generateStep();
    this.updateCounters();
    await GameAnimation.computerAutomation();
  }
}

Game.start();

// function createButtonEl(color: string, id: string): HTMLLabelElement {
//   const button = document.createElement("label");
//   button.classList.add("game-btn");
//   button.style.backgroundColor = color;
//   button.id = id;

//   button.addEventListener("click", (event: any) => {
//     if (curTurn == "computer") return;
//     const id = +event.target.id;
//     gameLogic(id);
//   });

//   return button;
// }

// function initializeGame(): void {
//   // create all buttons
//   const gameButtons: HTMLLabelElement[] = [];
//   for (let i = 1; i <= level; i++) {
//     gameButtons.push(createButtonEl(colors[i], "" + i));
//   }

//   curTurnEl.innerText = curTurn;
//   buttonsContainer.append(...gameButtons);
// }

// function updateCounters() {
//   levelNumberEl.innerText = "" + level;
//   stepsController.setCurStepsCount = stepsController.curStepsCount;
//   stepsController.setAllStepsCount = stepsController.allStepsCount;
//   stageController.setCurStageCount = stageController.curStageCount;
//   stageController.setAllStageCount = stageController.allStageCount;
// }

// function wait(time: number): Promise<null> {
//   return new Promise((resolve) => {
//     setTimeout(resolve, time);
//   });
// }

// async function animateSteps(transitionTime: number) {
//   for (const stepId of stepsController.stepsArr) {
//     const button = document.getElementById(`${stepId}`);
//     await wait(transitionTime);
//     button?.classList.add("clicked");
//     await wait(transitionTime);
//     button?.classList.remove("clicked");
//   }
// }

// function generateStep(): void {
//   const randomId = Math.ceil(Math.random() * level);
//   stepsController.stepsArr.push(randomId);
// }

// function changeTurn(turn: typeof curTurn) {
//   curTurn = turn;
//   curTurnEl.innerText = turn;

//   // allow player to click with animation
//   curTurn === "computer"
//     ? buttonsContainer.classList.remove("player-active")
//     : buttonsContainer.classList.add("player-active");
// }

// function wrongClickAnimation() {}

// // game logic
// async function gameLogic(id: number) {
//   if (stepsController.stepsArr[stepsController.curStepsCount] === id) {
//     stepsController.setCurStepsCount = stepsController.curStepsCount + 1;

//     if (stepsController.curStepsCount >= stepsController.allStepsCount) {
//       stageController.setCurStageCount = stageController.curStageCount + 1;

//       if (stageController.curStageCount >= stageController.allStageCount) {
//         // if level == 10 ( case win )
//         level++;
//         if (level >= 10) document.body.innerHTML = "";

//         levelNumberEl.innerText = "" + level;
//         const newButton = createButtonEl(colors[level], "" + level);
//         buttonsContainer.append(newButton);

//         // update stages
//         stageController.setCurStageCount = 0;
//         stageController.setAllStageCount = level * 2;

//         // update steps
//         stepsController.setCurStepsCount = 0;
//         stepsController.stepsArr = [];
//         stepsController.setAllStepsCount = 1;

//         generateStep();
//         await computerAutomation();

//         return;
//       }

//       generateStep();
//       stepsController.setCurStepsCount = 0;
//       stepsController.setAllStepsCount = stepsController.stepsArr.length;
//       await computerAutomation();
//     }
//   } else {
//     stepsController.setCurStepsCount = 0;
//     await computerAutomation();
//   }
// }

// async function computerAutomation() {
//   changeTurn("computer");
//   await animateSteps(300);
//   changeTurn("player");
// }
