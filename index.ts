// const appDiv: HTMLElement = document.getElementById("app");

// create start button

// const prevButton: HTMLButtonElement = document.getElementById("prev")!;
// const nextButton: HTMLButtonElement = document.getElementById("next")!;
const buttonsContainer: HTMLDivElement = document.querySelector(".buttons-container")!;

/*******************  counters ***************/
const levelNumberEl: HTMLParagraphElement = document.querySelector("#level-number")!;
const curStageCountEl: HTMLParagraphElement = document.querySelector(".current-stage-count")!; // -> stage counter
const stageCountEl: HTMLParagraphElement = document.querySelector(".stage-count")!; //
const curStepsCountEl: HTMLParagraphElement = document.querySelector(".current-steps-count")!; // -> steps counter
const stepsCountEl: HTMLParagraphElement = document.querySelector(".steps-count")!; //
const curTurnEl: HTMLParagraphElement = document.querySelector(".current-turn")!; // -> current turn

// initialize game
// fetch the level and the scores from local storage
/**************** global variabless  **********************/
let level = 1;
let steps: number[] = [];
let stepsCount = 1;
let curStepsCount = 0;
let stageCount = 0;
let curStageCount = 0;
let playerStep = 0;
let curTurn: "computer" | "player" = "computer";
const colors: string[] = ["red", "blue", "black"];

function createButtonEl(color: string, id: string): HTMLLabelElement {
  const button = document.createElement("label");
  button.classList.add("game-btn");
  button.style.backgroundColor = color;
  button.id = id;

  return button;
}

function initializeGame(): void {
  // step count from current level
  stageCount = level * 2;

  // init buttons
  const gameButtons: HTMLLabelElement[] = [];
  for (let i = 1; i <= level; i++) {
    gameButtons.push(createButtonEl(colors[i], "" + i));
  }
  buttonsContainer.append(...gameButtons);

  // init counters
  levelNumberEl.innerText = "" + level;
  curStepsCountEl.innerText = "" + curStepsCount;
  stepsCountEl.innerText = "" + stepsCount;
  curStageCountEl.innerText = "" + curStageCount;
  stageCountEl.innerText = "" + stageCount;
  curTurnEl.innerText = curTurn;

  document.querySelectorAll("label").forEach((el) => {
    el.addEventListener("click", buttonClickHandler);
  });
}

function wait(time: number): Promise<null> {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
}

async function animateSteps(transitionTime: number) {
  for (const stepId of steps) {
    const button = document.getElementById(`${stepId}`);
    await wait(transitionTime);
    button?.classList.add("clicked");
    await wait(transitionTime);
    button?.classList.remove("clicked");
  }
}

function generateStep(): void {
  // button count depend on the level
  const randomId = Math.ceil(Math.random() * level);
  steps.push(randomId);
}

function changeTurn(turn: typeof curTurn) {
  curTurn = turn;
  curTurnEl.innerText = turn;

  // allow player to click with animation
  curTurn === "computer"
    ? buttonsContainer.classList.remove("player-active")
    : buttonsContainer.classList.add("player-active");
}

function wrongClickAnimation() {}

async function buttonClickHandler(event: any) {
  if (curTurn == "computer") return;
  const id = +event.target.id;

  if (steps[playerStep] === id) {
    playerStep++;
    curStepsCount++;
    curStepsCountEl.innerText = "" + curStepsCount;

    if (curStepsCount >= stepsCount) {
      console.log("stage");

      curStageCount++;
      curStageCountEl.innerText = "" + curStageCount;
      await wait(500);

      if (curStageCount >= stageCount) {
        level++;
        levelNumberEl.innerText = "" + level;
        const newButton = createButtonEl(colors[level], "" + level);
        buttonsContainer.append(newButton);

        // stages
        console.log("level");
        curStageCount = 0;
        curStageCountEl.innerText = "" + curStageCount;

        stageCount = level * 2;
        stageCountEl.innerText = "" + stageCount;
        // steps
        curStepsCount = 0;
        curStepsCountEl.innerText = "" + curStepsCount;

        steps = [];
        generateStep();
        changeTurn("computer");
        await animateSteps(300);
        changeTurn("player");
        stepsCount = 1;
        stepsCountEl.innerText = "" + stepsCount;
        await wait(500);
        return 0;
      }
      console.log("steps");
      generateStep();
      changeTurn("computer");
      await animateSteps(300);
      changeTurn("player");
      curStepsCount = 0;
      curStepsCountEl.innerText = "" + curStepsCount;
      stepsCount = steps.length;
      stepsCountEl.innerText = "" + stepsCount;
    }
  } else {
    changeTurn("computer");
    await animateSteps(300);
    changeTurn("player");
  }
}

async function Game() {
  initializeGame();
  generateStep();
  await animateSteps(300);
  changeTurn("player");
}

Game();
