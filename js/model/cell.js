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