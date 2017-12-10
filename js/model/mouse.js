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