'use strict';

var _game = require('./model/game');

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