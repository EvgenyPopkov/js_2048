/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _game = __webpack_require__(1);

var _game2 = _interopRequireDefault(_game);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

$(document).ready(function () {
    var $playfield = $('#playfield');
    var game = new _game2.default(4);
    var mousedown = false;

    //кнопка мыши нажата
    $playfield.unbind('mousedown').mousedown(function (e) {
        mousedown = true;
        game.mouse.setBeginPosition(e.pageX, e.pageY);
    });

    //кнопка мыши отпущена
    $playfield.unbind('mouseup').mouseup(function (e) {
        mousedown = false;
        game.mouse.setEndPosition(e.pageX, e.pageY);
        game.moveCells();
    });

    function keyDown(e) {
        switch (e.keyCode) {
            case 37:
                // если нажата клавиша влево
                game.moveLeft();
                break;
            case 38:
                // если нажата клавиша вверх
                game.moveUp();
                break;
            case 39:
                // если нажата клавиша вправо
                game.moveRight();
                break;
            case 40:
                // если нажата клавиша вниз
                game.moveDown();
                break;
        }
    }

    addEventListener("keydown", keyDown); //назначение обработчика
}); /*
        Пример игры: http://gabrielecirulli.github.io/2048/ только в нем ходы делаются с помощью клавиатуры
        Правила игры.
        В каждом раунде появляется плитка номинала «2» (с вероятностью 90 %) или «4» (с вероятностью 10 %).
        В начале игры на поле находится 1 клетка.
        Чтобы сделать ход, игрок должен зажать левую кнопку мыши и переместить курсор в одном из четырех направлений.
        Все клетку с числами при этом сдивгаются в этом направлении до упора.
        Если при этом две плитки одного номинала «налетают» одна на другую, то они слипаются в одну,
        номинал которой равен сумме соединившихся плиток.
        После каждого хода на свободной секции поля появляется новая плитка номиналом «2» или «4».
        Если при нажатии кнопки местоположение плиток или их номинал не изменится, то ход не совершается.
        Тоесть новую плитку в этом случае добавлять не нужно.
        За каждое соединение игровые очки увеличиваются на номинал получившейся плитки.
        Игра заканчивается поражением, если после очередного хода невозможно совершить действие.
    */

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _draw = __webpack_require__(2);

var _draw2 = _interopRequireDefault(_draw);

var _score = __webpack_require__(3);

var _score2 = _interopRequireDefault(_score);

var _mouse = __webpack_require__(4);

var _mouse2 = _interopRequireDefault(_mouse);

var _cell = __webpack_require__(5);

var _cell2 = _interopRequireDefault(_cell);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//класс игры
var Game = function () {
    function Game(size) {
        _classCallCheck(this, Game);

        this.size = size; //размер игрового поля
        this.cells = []; //ячейки игрового поля
        this.isWin = false;

        this.draw = new _draw2.default();
        this.score = new _score2.default();
        this.mouse = new _mouse2.default();

        this.createFields(size);
        this.addCells(true);
    }

    //создание игрового поля


    _createClass(Game, [{
        key: 'createFields',
        value: function createFields(size) {
            for (var i = 0; i < size; ++i) {
                for (var j = 0; j < size; ++j) {
                    this.cells.push(new _cell2.default(i, j));
                    this.draw.drawField(i, j);
                }
            }

            this.draw.drawScore(this.score.score);
        }

        //установление значения для ячейки

    }, {
        key: 'setValueCell',
        value: function setValueCell(top, left) {
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = this.cells[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var cell = _step.value;

                    if (cell.isExist(top, left)) {
                        cell.create();
                        this.draw.drawCell(cell.ID, top, left, cell.value);
                    }
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }
        }

        //добавление ячейки

    }, {
        key: 'addCells',
        value: function addCells() {
            var isNewGame = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

            //в начале игры
            if (isNewGame) {
                var top1 = this.randPosition(true);
                var top2 = this.randPosition(true);
                var left1 = this.randPosition(true);
                var left2 = this.randPosition(true);

                //проверка на разные позиции
                if (top1 == top2) {
                    if (left1 == left2) {
                        while (left1 == left2) {
                            left2 = this.randPosition(true);
                        }
                    }
                    this.setValueCell(top1, left1);
                    this.setValueCell(top2, left2);
                } else {
                    this.setValueCell(top1, left1);
                    this.setValueCell(top2, left2);
                }
            }
            //во время игры
            else {
                    var freePositions = [];

                    //формирование массива позиций, в которых нет активных ячеек
                    var _iteratorNormalCompletion2 = true;
                    var _didIteratorError2 = false;
                    var _iteratorError2 = undefined;

                    try {
                        for (var _iterator2 = this.cells[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                            var cell = _step2.value;

                            if (!cell.isActive()) freePositions.push({ 'top': cell.top, 'left': cell.left });
                        }

                        //добавление ячейки
                    } catch (err) {
                        _didIteratorError2 = true;
                        _iteratorError2 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion2 && _iterator2.return) {
                                _iterator2.return();
                            }
                        } finally {
                            if (_didIteratorError2) {
                                throw _iteratorError2;
                            }
                        }
                    }

                    if (freePositions.length > 0) {
                        var position = this.randPosition(false, freePositions);
                        this.setValueCell(position.top, position.left);
                    }
                    //проверка на конец игры
                    else this.lost();
                }
        }

        //рандом позиции ячейки

    }, {
        key: 'randPosition',
        value: function randPosition(isNewGame) {
            var positions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

            return isNewGame ? Math.floor(Math.random() * 4) : positions[Math.floor(Math.random() * positions.length)];
        }

        //движение ячейки в зависимости от направление движения мыши

    }, {
        key: 'moveCells',
        value: function moveCells() {
            var direction = this.direction();

            if (direction != null) {
                switch (direction) {
                    case 'right':
                        this.moveRight();
                        break;
                    case 'left':
                        this.moveLeft();
                        break;
                    case 'up':
                        this.moveUp();
                        break;
                    case 'down':
                        this.moveDown();
                        break;
                }
            }
        }

        //движение направо

    }, {
        key: 'moveRight',
        value: function moveRight() {
            var isMoving = false;
            var cellsNewValue = []; //ячейки, у которых поменялось значение

            //сортировка массива ячеек
            this.cells.sort(this.compareArrayRight);

            var _iteratorNormalCompletion3 = true;
            var _didIteratorError3 = false;
            var _iteratorError3 = undefined;

            try {
                for (var _iterator3 = this.cells[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                    var cell = _step3.value;

                    //если значение ячейки не null
                    if (cell.isActive()) {
                        //просмотр ячеек, которые правее текущей
                        for (var i = cell.left + 1; i < this.size; ++i) {
                            //получение ячейки, находящейся справа от текущей ячейки
                            var nextCell = this.getCell(cell.top, i);

                            if (nextCell != null) {
                                if (nextCell.isActive()) {
                                    //проверка на равенство значений соседних ячеек и дигалась ли текущая ячейка
                                    if (cell.value == nextCell.value && !this.isCellInArray(cellsNewValue, cell)) {
                                        var nextNextCell = this.getCell(cell.top, nextCell.left + 1);

                                        //если следом еще есть ячейка с таким же значение то текущую ячейку не перемщаем
                                        if (nextNextCell != null && nextNextCell.isActive() && cell.value == nextNextCell.value) break;

                                        this.draw.deleteCell(nextCell.ID); //удаление div'а ячейки при сложении значений 2х ячеек    
                                        nextCell.value = null;
                                        nextCell.left--; //смещение ячейки

                                        cell.value *= 2;
                                        cell.left++;
                                        this.draw.movingCell(cell.ID, cell.top, cell.left, 'left'); //движение div'а ячейки
                                        this.draw.drawNewValue(cell.ID, cell.value); //новое значение в div'е

                                        //изменение id элементов
                                        nextCell.ID = cell.ID;
                                        cell.ID = String(cell.top) + String(cell.left);
                                        this.draw.updateID(nextCell.ID, cell.ID); //изменение id div'а

                                        //добавление игровых очков
                                        this.score.addPoints(cell.value);
                                        this.draw.drawScore(this.score.score);

                                        isMoving = true;
                                        cellsNewValue.push(cell);

                                        this.draw.animateNewValue(cell.ID);

                                        //смещение ячеек, которые стоят левее текущей
                                        //аналогисно главному циклу, только без проверки равенста соседних ячеек
                                        for (var j = cell.left - 1; j > 0; --j) {
                                            var cellPrevios = this.getCell(cell.top, j);

                                            if (cellPrevios != null) {
                                                if (cellPrevios.isActive()) {
                                                    for (var k = cellPrevios.left + 1; k < this.size; ++k) {
                                                        var newCell = this.getCell(cell.top, k);

                                                        if (newCell != null && !newCell.isActive()) {
                                                            cellPrevios.left++;
                                                            this.draw.movingCell(cellPrevios.ID, cellPrevios.top, cellPrevios.left, 'left');

                                                            newCell.ID = cellPrevios.ID;
                                                            cellPrevios.ID = String(cellPrevios.top) + String(cellPrevios.left);
                                                            this.draw.updateID(newCell.ID, cellPrevios.ID);

                                                            newCell.left--;

                                                            cellsNewValue.push(cellPrevios);
                                                        }
                                                    }
                                                }
                                            } else break;
                                        }

                                        //проверка на конец игры (значение в ячейке 2048)
                                        this.win(cell.value);
                                    } else break;
                                }

                                //если у ячейки правее значение null
                                else {
                                        cell.left++;
                                        this.draw.movingCell(cell.ID, cell.top, cell.left, 'left');

                                        nextCell.left--;
                                        nextCell.ID = cell.ID;

                                        cell.ID = String(cell.top) + String(cell.left);
                                        this.draw.updateID(nextCell.ID, cell.ID);

                                        isMoving = true;
                                    }
                            } else break;
                        }
                    }
                }
            } catch (err) {
                _didIteratorError3 = true;
                _iteratorError3 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion3 && _iterator3.return) {
                        _iterator3.return();
                    }
                } finally {
                    if (_didIteratorError3) {
                        throw _iteratorError3;
                    }
                }
            }

            if (isMoving) this.addCells(); //добавление новой ячейки
            else this.lost(); //проверка на проигрыш
        }

        //движение налево, аналогично moveRight()

    }, {
        key: 'moveLeft',
        value: function moveLeft() {
            var isMoving = false;
            var cellsNewValue = [];

            this.cells.sort(this.compareArrayLeft);

            var _iteratorNormalCompletion4 = true;
            var _didIteratorError4 = false;
            var _iteratorError4 = undefined;

            try {
                for (var _iterator4 = this.cells[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                    var cell = _step4.value;

                    if (cell.isActive()) {
                        for (var i = cell.left - 1; i >= 0; --i) {
                            var nextCell = this.getCell(cell.top, i);

                            if (nextCell != null) {
                                if (nextCell.isActive()) {
                                    if (cell.value == nextCell.value && !this.isCellInArray(cellsNewValue, cell)) {
                                        var nextNextCell = this.getCell(cell.top, nextCell.left - 1);

                                        if (nextNextCell != null && nextNextCell.isActive() && cell.value == nextNextCell.value) break;

                                        this.draw.deleteCell(nextCell.ID);
                                        nextCell.value = null;
                                        nextCell.left++;

                                        cell.value *= 2;
                                        cell.left--;
                                        this.draw.movingCell(cell.ID, cell.top, cell.left, 'left');
                                        this.draw.drawNewValue(cell.ID, cell.value);

                                        nextCell.ID = cell.ID;
                                        cell.ID = String(cell.top) + String(cell.left);
                                        this.draw.updateID(nextCell.ID, cell.ID);

                                        this.score.addPoints(cell.value);
                                        this.draw.drawScore(this.score.score);

                                        isMoving = true;
                                        cellsNewValue.push(cell);

                                        this.draw.animateNewValue(cell.ID);

                                        for (var j = cell.left + 1; j < this.size; ++j) {
                                            var cellPrevios = this.getCell(cell.top, j);

                                            if (cellPrevios != null) {
                                                if (cellPrevios.isActive()) {
                                                    for (var k = cellPrevios.left - 1; k >= 0; --k) {
                                                        var newCell = this.getCell(cell.top, k);

                                                        if (newCell != null && !newCell.isActive()) {
                                                            cellPrevios.left--;
                                                            this.draw.movingCell(cellPrevios.ID, cellPrevios.top, cellPrevios.left, 'left');

                                                            newCell.ID = cellPrevios.ID;
                                                            cellPrevios.ID = String(cellPrevios.top) + String(cellPrevios.left);
                                                            this.draw.updateID(newCell.ID, cellPrevios.ID);

                                                            newCell.left++;

                                                            cellsNewValue.push(cellPrevios);
                                                        }
                                                    }
                                                }
                                            } else break;
                                        }

                                        this.win(cell.value);
                                    } else break;
                                } else {
                                    cell.left--;
                                    this.draw.movingCell(cell.ID, cell.top, cell.left, 'left');

                                    nextCell.left++;
                                    nextCell.ID = cell.ID;

                                    cell.ID = String(cell.top) + String(cell.left);
                                    this.draw.updateID(nextCell.ID, cell.ID);

                                    isMoving = true;
                                }
                            } else break;
                        }
                    }
                }
            } catch (err) {
                _didIteratorError4 = true;
                _iteratorError4 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion4 && _iterator4.return) {
                        _iterator4.return();
                    }
                } finally {
                    if (_didIteratorError4) {
                        throw _iteratorError4;
                    }
                }
            }

            if (isMoving) this.addCells();else this.lost();
        }

        //движение наверх, аналогично moveRight()

    }, {
        key: 'moveUp',
        value: function moveUp() {
            var isMoving = false;
            var cellsNewValue = [];

            this.cells.sort(this.compareArrayUp);

            var _iteratorNormalCompletion5 = true;
            var _didIteratorError5 = false;
            var _iteratorError5 = undefined;

            try {
                for (var _iterator5 = this.cells[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
                    var cell = _step5.value;

                    if (cell.isActive()) {
                        for (var i = cell.top - 1; i >= 0; --i) {
                            var nextCell = this.getCell(i, cell.left);

                            if (nextCell != null) {
                                if (nextCell.isActive()) {
                                    if (cell.value == nextCell.value && !this.isCellInArray(cellsNewValue, cell)) {
                                        var nextNextCell = this.getCell(nextCell.top - 1, cell.left);

                                        if (nextNextCell != null && nextNextCell.isActive() && cell.value == nextNextCell.value) break;

                                        this.draw.deleteCell(nextCell.ID);
                                        nextCell.value = null;
                                        nextCell.top++;

                                        cell.value *= 2;
                                        cell.top--;
                                        this.draw.movingCell(cell.ID, cell.top, cell.left, 'top');
                                        this.draw.drawNewValue(cell.ID, cell.value);

                                        nextCell.ID = cell.ID;
                                        cell.ID = String(cell.top) + String(cell.left);
                                        this.draw.updateID(nextCell.ID, cell.ID);

                                        this.score.addPoints(cell.value);
                                        this.draw.drawScore(this.score.score);

                                        isMoving = true;
                                        cellsNewValue.push(cell);

                                        this.draw.animateNewValue(cell.ID);

                                        for (var j = cell.top + 1; j < this.size; ++j) {
                                            var cellPrevios = this.getCell(j, cell.left);

                                            if (cellPrevios != null) {
                                                if (cellPrevios.isActive()) {
                                                    for (var k = cellPrevios.top - 1; k >= 0; --k) {
                                                        var newCell = this.getCell(k, cell.left);

                                                        if (newCell != null && !newCell.isActive()) {
                                                            cellPrevios.top--;
                                                            this.draw.movingCell(cellPrevios.ID, cellPrevios.top, cellPrevios.left, 'top');

                                                            newCell.ID = cellPrevios.ID;
                                                            cellPrevios.ID = String(cellPrevios.top) + String(cellPrevios.left);
                                                            this.draw.updateID(newCell.ID, cellPrevios.ID);

                                                            newCell.top++;

                                                            cellsNewValue.push(cellPrevios);
                                                        }
                                                    }
                                                }
                                            } else break;
                                        }

                                        this.win(cell.value);
                                    } else break;
                                } else {
                                    cell.top--;
                                    this.draw.movingCell(cell.ID, cell.top, cell.left, 'top');

                                    nextCell.top++;
                                    nextCell.ID = cell.ID;

                                    cell.ID = String(cell.top) + String(cell.left);
                                    this.draw.updateID(nextCell.ID, cell.ID);

                                    isMoving = true;
                                }
                            } else break;
                        }
                    }
                }
            } catch (err) {
                _didIteratorError5 = true;
                _iteratorError5 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion5 && _iterator5.return) {
                        _iterator5.return();
                    }
                } finally {
                    if (_didIteratorError5) {
                        throw _iteratorError5;
                    }
                }
            }

            if (isMoving) this.addCells();else this.lost();
        }

        //движение вниз, аналогично moveRight()

    }, {
        key: 'moveDown',
        value: function moveDown() {
            var isMoving = false;
            var cellsNewValue = [];

            this.cells.sort(this.compareArrayDown);

            var _iteratorNormalCompletion6 = true;
            var _didIteratorError6 = false;
            var _iteratorError6 = undefined;

            try {
                for (var _iterator6 = this.cells[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
                    var cell = _step6.value;

                    if (cell.isActive()) {
                        for (var i = cell.top + 1; i < this.size; ++i) {
                            var nextCell = this.getCell(i, cell.left);

                            if (nextCell != null) {
                                if (nextCell.isActive()) {
                                    if (cell.value == nextCell.value && !this.isCellInArray(cellsNewValue, cell)) {
                                        var nextNextCell = this.getCell(nextCell.top + 1, cell.left);

                                        if (nextNextCell != null && nextNextCell.isActive() && cell.value == nextNextCell.value) break;

                                        this.draw.deleteCell(nextCell.ID);
                                        nextCell.value = null;
                                        nextCell.top--;

                                        cell.value *= 2;
                                        cell.top++;
                                        this.draw.movingCell(cell.ID, cell.top, cell.left, 'top');
                                        this.draw.drawNewValue(cell.ID, cell.value);

                                        nextCell.ID = cell.ID;
                                        cell.ID = String(cell.top) + String(cell.left);
                                        this.draw.updateID(nextCell.ID, cell.ID);

                                        this.score.addPoints(cell.value);
                                        this.draw.drawScore(this.score.score);

                                        isMoving = true;
                                        cellsNewValue.push(cell);

                                        this.draw.animateNewValue(cell.ID);

                                        for (var j = cell.top - 1; j >= 0; --j) {
                                            var cellPrevios = this.getCell(j, cell.left);

                                            if (cellPrevios != null) {
                                                if (cellPrevios.isActive()) {
                                                    for (var k = cellPrevios.top + 1; k < this.size; ++k) {
                                                        var newCell = this.getCell(k, cell.left);

                                                        if (newCell != null && !newCell.isActive()) {
                                                            cellPrevios.top++;
                                                            this.draw.movingCell(cellPrevios.ID, cellPrevios.top, cellPrevios.left, 'top');

                                                            newCell.ID = cellPrevios.ID;
                                                            cellPrevios.ID = String(cellPrevios.top) + String(cellPrevios.left);
                                                            this.draw.updateID(newCell.ID, cellPrevios.ID);

                                                            newCell.top--;

                                                            cellsNewValue.push(cellPrevios);
                                                        }
                                                    }
                                                }
                                            } else break;
                                        }

                                        this.win(cell.value);
                                    } else break;
                                } else {
                                    cell.top++;
                                    this.draw.movingCell(cell.ID, cell.top, cell.left, 'top');

                                    nextCell.top--;
                                    nextCell.ID = cell.ID;

                                    cell.ID = String(cell.top) + String(cell.left);
                                    this.draw.updateID(nextCell.ID, cell.ID);

                                    isMoving = true;
                                }
                            } else break;
                        }
                    }
                }
            } catch (err) {
                _didIteratorError6 = true;
                _iteratorError6 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion6 && _iterator6.return) {
                        _iterator6.return();
                    }
                } finally {
                    if (_didIteratorError6) {
                        throw _iteratorError6;
                    }
                }
            }

            if (isMoving) this.addCells();else this.lost();
        }

        //функция для сортировки массива (max left)

    }, {
        key: 'compareArrayRight',
        value: function compareArrayRight(a, b) {
            return b.left - a.left;
        }

        //min left

    }, {
        key: 'compareArrayLeft',
        value: function compareArrayLeft(a, b) {
            return a.left - b.left;
        }

        //min top

    }, {
        key: 'compareArrayUp',
        value: function compareArrayUp(a, b) {
            return a.top - b.top;
        }

        //max top

    }, {
        key: 'compareArrayDown',
        value: function compareArrayDown(a, b) {
            return b.top - a.top;
        }

        //определение направления движения мыши

    }, {
        key: 'direction',
        value: function direction() {
            var array = {};
            var max = 0;
            var resultDirection = void 0;

            this.mouse.x2 >= this.mouse.x1 ? array['right'] = this.mouse.x2 - this.mouse.x1 : array['left'] = this.mouse.x1 - this.mouse.x2;
            this.mouse.y2 >= this.mouse.y1 ? array['down'] = this.mouse.y2 - this.mouse.y1 : array['up'] = this.mouse.y1 - this.mouse.y2;

            for (var index in array) {
                if (array[index] > max) {
                    max = array[index];
                    resultDirection = index;
                }
            }

            //длина движение мыши должн быть более 70px (чтобы исключить случайное движение)
            return max >= 70 ? resultDirection : null;
        }

        //проверка на вхождение элемента в массив

    }, {
        key: 'isCellInArray',
        value: function isCellInArray(array, cell) {
            var _iteratorNormalCompletion7 = true;
            var _didIteratorError7 = false;
            var _iteratorError7 = undefined;

            try {
                for (var _iterator7 = array[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
                    var element = _step7.value;

                    if (element == cell) return true;
                }
            } catch (err) {
                _didIteratorError7 = true;
                _iteratorError7 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion7 && _iterator7.return) {
                        _iterator7.return();
                    }
                } finally {
                    if (_didIteratorError7) {
                        throw _iteratorError7;
                    }
                }
            }

            return false;
        }

        //получение ячейки по ее позиции

    }, {
        key: 'getCell',
        value: function getCell(top, left) {
            var _iteratorNormalCompletion8 = true;
            var _didIteratorError8 = false;
            var _iteratorError8 = undefined;

            try {
                for (var _iterator8 = this.cells[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
                    var cell = _step8.value;

                    if (cell.top == top && cell.left == left) return cell;
                }
            } catch (err) {
                _didIteratorError8 = true;
                _iteratorError8 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion8 && _iterator8.return) {
                        _iterator8.return();
                    }
                } finally {
                    if (_didIteratorError8) {
                        throw _iteratorError8;
                    }
                }
            }

            return null;
        }

        //проверка на проигрыш

    }, {
        key: 'lost',
        value: function lost() {
            var isLost = true;

            //должны отсутствовать ячейки со значением null
            var _iteratorNormalCompletion9 = true;
            var _didIteratorError9 = false;
            var _iteratorError9 = undefined;

            try {
                for (var _iterator9 = this.cells[Symbol.iterator](), _step9; !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {
                    var cell = _step9.value;

                    if (!cell.isActive()) {
                        isLost = false;
                        break;
                    }

                    var stopFor = false;
                    var cellsAbout = []; //соседние ячейки
                    cellsAbout.push(this.getCell(cell.top, cell.left + 1));
                    cellsAbout.push(this.getCell(cell.top, cell.left - 1));
                    cellsAbout.push(this.getCell(cell.top - 1, cell.left));
                    cellsAbout.push(this.getCell(cell.top + 1, cell.left));

                    //не должно быть соседних ячеек с одинаковым значнием
                    var _iteratorNormalCompletion10 = true;
                    var _didIteratorError10 = false;
                    var _iteratorError10 = undefined;

                    try {
                        for (var _iterator10 = cellsAbout[Symbol.iterator](), _step10; !(_iteratorNormalCompletion10 = (_step10 = _iterator10.next()).done); _iteratorNormalCompletion10 = true) {
                            var cellAbout = _step10.value;

                            if (cellAbout != null && cell.value == cellAbout.value) {
                                stopFor = true;
                                isLost = false;
                                break;
                            }
                        }
                    } catch (err) {
                        _didIteratorError10 = true;
                        _iteratorError10 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion10 && _iterator10.return) {
                                _iterator10.return();
                            }
                        } finally {
                            if (_didIteratorError10) {
                                throw _iteratorError10;
                            }
                        }
                    }

                    if (stopFor) break;
                }
            } catch (err) {
                _didIteratorError9 = true;
                _iteratorError9 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion9 && _iterator9.return) {
                        _iterator9.return();
                    }
                } finally {
                    if (_didIteratorError9) {
                        throw _iteratorError9;
                    }
                }
            }

            if (isLost) {
                alert('You lost!');
                window.location.reload();
            }
        }

        //проверка на победу

    }, {
        key: 'win',
        value: function win(maxValue) {
            if (maxValue >= 2048 && !this.isWin) {
                var isOk = confirm('You win!');

                if (isOk) window.location.reload();else this.isWin = true;
            }
        }
    }]);

    return Game;
}();

exports.default = Game;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//класс для отрисовки и анимации объектов
var Draw = function () {
    function Draw() {
        _classCallCheck(this, Draw);
    }

    //добавление ячейки игрового поля


    _createClass(Draw, [{
        key: 'drawField',
        value: function drawField(top, left) {
            $('#playfield').append('<div class="back" style="top: ' + top * 100 + 'px; left: ' + left * 100 + 'px;"></div>');
        }

        //добавление активной ячейки

    }, {
        key: 'drawCell',
        value: function drawCell(ID, top, left, value) {
            $('#playfield').append('<div id="' + ID + '" class="emerg thing t' + value + '" style="top: ' + top * 100 + 'px; left: ' + left * 100 + 'px;"></div>');
        }

        //изменение значение игрового счета

    }, {
        key: 'drawScore',
        value: function drawScore(score) {
            $('#point').text(score);
        }

        //изменение позиции (top, left) активной ячейки

    }, {
        key: 'movingCell',
        value: function movingCell(ID, top, left, direction) {
            var div = $('#' + ID);

            switch (direction) {
                case 'left':
                    div.animate({ 'left': left * 100 + 'px' }, 20);
                    break;

                case 'top':
                    div.animate({ 'top': top * 100 + 'px' }, 20);
                    break;
            }
        }

        //удаления поля с неактивной ячейкой

    }, {
        key: 'deleteCell',
        value: function deleteCell(ID) {
            $('#' + ID).remove();
        }

        //изменение класса ячейки, у которой изменилось значение

    }, {
        key: 'drawNewValue',
        value: function drawNewValue(ID, value) {
            var div = $('#' + ID);
            div.removeClass();
            div.addClass('thing t' + value);
        }

        //анимация изменивщейся ячейки

    }, {
        key: 'animateNewValue',
        value: function animateNewValue(ID) {
            var div = $('#' + ID);
            div.animate({ 'height': '-=10px' }, 50, function () {
                div.animate({ 'height': '+=10px' }, 50);
            });
        }

        //изменеие ID div'а ячейки

    }, {
        key: 'updateID',
        value: function updateID(oldID, newID) {
            $('#' + oldID).attr({ 'id': newID });
        }
    }]);

    return Draw;
}();

exports.default = Draw;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//класс для игрового счета
var Score = function () {
    function Score() {
        _classCallCheck(this, Score);

        this.score = 0;
    }

    //добавление очков


    _createClass(Score, [{
        key: "addPoints",
        value: function addPoints(points) {
            this.score += points;
        }
    }]);

    return Score;
}();

exports.default = Score;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//класс для местоположения мыши
var Mouse = function () {
    function Mouse() {
        _classCallCheck(this, Mouse);

        this.x1 = null;
        this.y1 = null;
        this.x2 = null;
        this.y2 = null;
    }

    //задать начальное значение


    _createClass(Mouse, [{
        key: "setBeginPosition",
        value: function setBeginPosition(x, y) {
            this.x1 = x;
            this.y1 = y;
        }

        //задать конечное значение

    }, {
        key: "setEndPosition",
        value: function setEndPosition(x, y) {
            this.x2 = x;
            this.y2 = y;
        }
    }]);

    return Mouse;
}();

exports.default = Mouse;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//класс игровой ячейки
var Cell = function () {
    function Cell(top, left) {
        _classCallCheck(this, Cell);

        this.top = top;
        this.left = left;
        this.value = null;
        this.ID = String(top) + String(left);
    }

    //создание значения ячейки


    _createClass(Cell, [{
        key: "create",
        value: function create() {
            this.value = Math.random() >= 0.1 ? 2 : 4;
        }

        //проверка на существование ячейки

    }, {
        key: "isExist",
        value: function isExist(top, left) {
            return this.top == top && this.left == left ? true : false;
        }

        //проверка существует ли значение в ячейке

    }, {
        key: "isActive",
        value: function isActive() {
            return this.value != null ? true : false;
        }
    }]);

    return Cell;
}();

exports.default = Cell;

/***/ })
/******/ ]);