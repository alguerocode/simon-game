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
var _this = this;
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
var buttonsContainer = document.querySelector(".buttons-container");
var levelNumberEl = document.querySelector("#level-number");
var curTurnEl = document.querySelector(".current-turn");
var startGameBTN = document.querySelector("#start-game");
var Board = document.querySelector("#board");
var gameTable = document.querySelector("main");
/****************** controller *****************/
var stepsController = {
    stepsArr: [],
    curStepsCount: 0,
    allStepsCount: 1,
    allStepsCountEl: document.querySelector(".all-steps-count"),
    curStepsCountEl: document.querySelector(".current-steps-count"),
    set setCurStepsCount(value) {
        this.curStepsCount = value;
        this.curStepsCountEl.innerText = "" + this.curStepsCount;
    },
    set setAllStepsCount(value) {
        this.allStepsCount = value;
        this.allStepsCountEl.innerText = "" + this.allStepsCount;
    }
};
var stageController = {
    curStageCount: 0,
    allStageCount: 1,
    curStageCountEl: document.querySelector(".current-stage-count"),
    allStageCountEl: document.querySelector(".all-stage-count"),
    set setCurStageCount(value) {
        this.curStageCount = value;
        this.curStageCountEl.innerText = "" + this.curStageCount;
    },
    set setAllStageCount(value) {
        this.allStageCount = value;
        this.allStageCountEl.innerText = "" + this.allStageCount;
    }
};
// initialize game
// fetch the level and the scores from local storage
var GameAnimation = /** @class */ (function () {
    function GameAnimation() {
    }
    GameAnimation.animateSteps = function (transitionTime) {
        return __awaiter(this, void 0, void 0, function () {
            var _i, _a, stepId, button;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _i = 0, _a = stepsController.stepsArr;
                        _b.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3 /*break*/, 5];
                        stepId = _a[_i];
                        button = document.getElementById("".concat(stepId));
                        return [4 /*yield*/, GameAnimation.wait(transitionTime)];
                    case 2:
                        _b.sent();
                        button === null || button === void 0 ? void 0 : button.classList.add("clicked");
                        return [4 /*yield*/, GameAnimation.wait(transitionTime)];
                    case 3:
                        _b.sent();
                        button === null || button === void 0 ? void 0 : button.classList.remove("clicked");
                        _b.label = 4;
                    case 4:
                        _i++;
                        return [3 /*break*/, 1];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    GameAnimation.wait = function (time) {
        return new Promise(function (resolve) {
            setTimeout(resolve, time);
        });
    };
    GameAnimation.computerAutomation = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        Controller.changeTurn("computer");
                        return [4 /*yield*/, GameAnimation.animateSteps(300)];
                    case 1:
                        _a.sent();
                        Controller.changeTurn("player");
                        return [2 /*return*/];
                }
            });
        });
    };
    GameAnimation.wrongClickAnimation = function () {
        return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/];
        }); });
    };
    return GameAnimation;
}());
var Controller = /** @class */ (function () {
    function Controller() {
    }
    Controller.generateStep = function () {
        var randomId = Math.ceil(Math.random() * Game.level);
        stepsController.stepsArr.push(randomId);
    };
    Controller.changeTurn = function (turn) {
        Game.curTurn = turn;
        curTurnEl.innerText = turn;
        // allow player to click with animation
        Game.curTurn === "computer"
            ? buttonsContainer.classList.remove("player-active")
            : buttonsContainer.classList.add("player-active");
    };
    Controller.gameLogic = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var newButton;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(stepsController.stepsArr[stepsController.curStepsCount] === id)) return [3 /*break*/, 5];
                        stepsController.setCurStepsCount = stepsController.curStepsCount + 1;
                        if (!(stepsController.curStepsCount >= stepsController.allStepsCount)) return [3 /*break*/, 4];
                        stageController.setCurStageCount = stageController.curStageCount + 1;
                        if (!(stageController.curStageCount >= stageController.allStageCount)) return [3 /*break*/, 2];
                        // if level == 10 ( case win )
                        Game.level++;
                        if (Game.level >= 11)
                            document.body.innerHTML = "";
                        Game.saveLevel();
                        levelNumberEl.innerText = "" + Game.level;
                        newButton = Controller.createButtonEl(Game.colors[Game.level], "" + Game.level);
                        buttonsContainer.append(newButton);
                        // update stages
                        stageController.setCurStageCount = 0;
                        stageController.setAllStageCount = Game.level * 2;
                        // update steps
                        stepsController.setCurStepsCount = 0;
                        stepsController.stepsArr = [];
                        stepsController.setAllStepsCount = 1;
                        Controller.generateStep();
                        return [4 /*yield*/, GameAnimation.computerAutomation()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                    case 2:
                        Controller.generateStep();
                        stepsController.setCurStepsCount = 0;
                        stepsController.setAllStepsCount = stepsController.stepsArr.length;
                        return [4 /*yield*/, GameAnimation.computerAutomation()];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [3 /*break*/, 7];
                    case 5:
                        stepsController.setCurStepsCount = 0;
                        return [4 /*yield*/, GameAnimation.computerAutomation()];
                    case 6:
                        _a.sent();
                        _a.label = 7;
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    Controller.createButtonEl = function (color, id) {
        var button = document.createElement("label");
        button.classList.add("game-btn");
        button.style.backgroundColor = color;
        button.style.backgroundImage = "linear-gradient(to top, ".concat(color, ", rgb(130, 130, 130))");
        button.id = id;
        var frontground = document.createElement("label");
        frontground.style.backgroundColor = color;
        frontground.id = id;
        frontground.classList.add("front");
        frontground.innerText = color[0].toUpperCase();
        frontground.htmlFor = id;
        button.append(frontground);
        button.addEventListener("click", function (event) {
            if (Game.curTurn == "computer")
                return;
            var id = +event.target.id;
            Controller.gameLogic(id);
            console.log(stepsController.stepsArr);
        });
        return button;
    };
    return Controller;
}());
var Game = /** @class */ (function () {
    function Game() {
    }
    Game.saveLevel = function () {
        window.localStorage.setItem("level", "" + Game.level);
    };
    Game.extractLevelAndSet = function () {
        var level = window.localStorage.getItem("level");
        if (level) {
            Game.level = +level;
        }
    };
    Game.initializeGame = function () {
        // create all buttons
        stageController.setAllStageCount = Game.level * 2;
        var gameButtons = [];
        for (var i = 1; i <= Game.level; i++) {
            gameButtons.push(Controller.createButtonEl(Game.colors[i], "" + i));
        }
        curTurnEl.innerText = Game.curTurn;
        buttonsContainer.append.apply(buttonsContainer, gameButtons);
    };
    Game.updateCounters = function () {
        levelNumberEl.innerText = "" + Game.level;
        stepsController.setCurStepsCount = stepsController.curStepsCount;
        stepsController.setAllStepsCount = stepsController.allStepsCount;
        stageController.setCurStageCount = stageController.curStageCount;
        stageController.setAllStageCount = stageController.allStageCount;
    };
    Game.start = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        Game.extractLevelAndSet();
                        Game.initializeGame();
                        Controller.generateStep();
                        Game.updateCounters();
                        return [4 /*yield*/, GameAnimation.wait(1000)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, GameAnimation.computerAutomation()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Game.level = 1;
    Game.curTurn = "computer";
    // we add empty at the first becuase the id start from 1 not 0;
    Game.colors = [
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
    return Game;
}());
startGameBTN.addEventListener("click", function () { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        Board.style.display = "block";
        gameTable.style.display = "block";
        startGameBTN.style.display = "none";
        Game.start();
        return [2 /*return*/];
    });
}); });
// check if the user already play the game
if (window.localStorage.getItem("level")) {
    startGameBTN.querySelector("label").innerText = "Continue";
}
