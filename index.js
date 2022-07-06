// const appDiv: HTMLElement = document.getElementById("app");
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
// create start button
// const prevButton: HTMLButtonElement = document.getElementById("prev")!;
// const nextButton: HTMLButtonElement = document.getElementById("next")!;
var buttonsContainer = document.querySelector(".buttons-container");
/*******************  counters ***************/
var levelNumberEl = document.querySelector("#level-number");
var curStageCountEl = document.querySelector(".current-stage-count"); // -> stage counter
var stageCountEl = document.querySelector(".stage-count"); //
var curStepsCountEl = document.querySelector(".current-steps-count"); // -> steps counter
var stepsCountEl = document.querySelector(".steps-count"); //
var curTurnEl = document.querySelector(".current-turn"); // -> current turn
// initialize game
// fetch the level and the scores from local storage
/**************** global variabless  **********************/
var level = 1;
var steps = [];
var stepsCount = 1;
var curStepsCount = 0;
var stageCount = 0;
var curStageCount = 0;
var curTurn = "computer";
var colors = ["red", "blue", "black"];
function createButtonEl(color, id) {
    var button = document.createElement("label");
    button.classList.add("game-btn");
    button.style.backgroundColor = color;
    button.id = id;
    button.addEventListener("click", function (event) {
        if (curTurn == "computer")
            return;
        var id = +event.target.id;
        gameLogic(id);
    });
    return button;
}
function initializeGame() {
    // step count from current level
    stageCount = level * 2;
    // init buttons
    var gameButtons = [];
    for (var i = 1; i <= level; i++) {
        gameButtons.push(createButtonEl(colors[i], "" + i));
    }
    curTurnEl.innerText = curTurn;
    buttonsContainer.append.apply(buttonsContainer, gameButtons);
}
function updateCounters() {
    levelNumberEl.innerText = "" + level;
    curStepsCountEl.innerText = "" + curStepsCount;
    stepsCountEl.innerText = "" + stepsCount;
    curStageCountEl.innerText = "" + curStageCount;
    stageCountEl.innerText = "" + stageCount;
}
function wait(time) {
    return new Promise(function (resolve) {
        setTimeout(resolve, time);
    });
}
function animateSteps(transitionTime) {
    return __awaiter(this, void 0, void 0, function () {
        var _i, steps_1, stepId, button;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _i = 0, steps_1 = steps;
                    _a.label = 1;
                case 1:
                    if (!(_i < steps_1.length)) return [3 /*break*/, 5];
                    stepId = steps_1[_i];
                    button = document.getElementById("".concat(stepId));
                    return [4 /*yield*/, wait(transitionTime)];
                case 2:
                    _a.sent();
                    button === null || button === void 0 ? void 0 : button.classList.add("clicked");
                    return [4 /*yield*/, wait(transitionTime)];
                case 3:
                    _a.sent();
                    button === null || button === void 0 ? void 0 : button.classList.remove("clicked");
                    _a.label = 4;
                case 4:
                    _i++;
                    return [3 /*break*/, 1];
                case 5: return [2 /*return*/];
            }
        });
    });
}
function generateStep() {
    // button count depend on the level
    var randomId = Math.ceil(Math.random() * level);
    steps.push(randomId);
}
function changeTurn(turn) {
    curTurn = turn;
    curTurnEl.innerText = turn;
    // allow player to click with animation
    curTurn === "computer"
        ? buttonsContainer.classList.remove("player-active")
        : buttonsContainer.classList.add("player-active");
}
function wrongClickAnimation() { }
// game logic
function gameLogic(id) {
    return __awaiter(this, void 0, void 0, function () {
        var newButton;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(steps[curStepsCount] === id)) return [3 /*break*/, 5];
                    curStepsCount++;
                    curStepsCountEl.innerText = "" + curStepsCount;
                    if (!(curStepsCount >= stepsCount)) return [3 /*break*/, 4];
                    curStageCount++;
                    curStageCountEl.innerText = "" + curStageCount;
                    if (!(curStageCount >= stageCount)) return [3 /*break*/, 2];
                    level++;
                    // if level == 10 ( case win )
                    if (level >= 10)
                        document.body.innerHTML = "";
                    levelNumberEl.innerText = "" + level;
                    newButton = createButtonEl(colors[level], "" + level);
                    buttonsContainer.append(newButton);
                    // stages
                    curStageCount = 0;
                    curStageCountEl.innerText = "" + curStageCount;
                    stageCount = level * 2;
                    stageCountEl.innerText = "" + stageCount;
                    // steps
                    curStepsCount = 0;
                    curStepsCountEl.innerText = "" + curStepsCount;
                    steps = [];
                    generateStep();
                    return [4 /*yield*/, computerAutomation()];
                case 1:
                    _a.sent();
                    stepsCount = 1;
                    stepsCountEl.innerText = "" + stepsCount;
                    return [2 /*return*/, 0];
                case 2:
                    generateStep();
                    return [4 /*yield*/, computerAutomation()];
                case 3:
                    _a.sent();
                    curStepsCount = 0;
                    curStepsCountEl.innerText = "" + curStepsCount;
                    stepsCount = steps.length;
                    stepsCountEl.innerText = "" + stepsCount;
                    _a.label = 4;
                case 4: return [3 /*break*/, 7];
                case 5:
                    curStepsCount = 0;
                    curStepsCountEl.innerText = "" + curStepsCount;
                    return [4 /*yield*/, computerAutomation()];
                case 6:
                    _a.sent();
                    _a.label = 7;
                case 7: return [2 /*return*/];
            }
        });
    });
}
function computerAutomation() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    changeTurn("computer");
                    return [4 /*yield*/, animateSteps(300)];
                case 1:
                    _a.sent();
                    changeTurn("player");
                    return [2 /*return*/];
            }
        });
    });
}
function Game() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    initializeGame();
                    generateStep();
                    updateCounters();
                    return [4 /*yield*/, computerAutomation()];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
/* - start game -  */
Game();
// class Animation {}
// class Tools {}
// class Game {}
