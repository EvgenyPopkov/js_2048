//класс для местоположения мыши
export default class Mouse {
    constructor () {
        this.x1 = null;
        this.y1 = null;
        this.x2 = null;
        this.y2 = null;
    }

    //задать начальное значение
    setBeginPosition(x, y) {
        this.x1 = x;
        this.y1 = y;
    }

    //задать конечное значение
    setEndPosition(x, y) {
        this.x2 = x;
        this.y2 = y;
    }
}