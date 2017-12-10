'use strict';

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