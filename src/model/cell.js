//класс игровой ячейки
export default class Cell{
    constructor(top, left) {
        this.top = top;
        this.left = left;
        this.value = null;
        this.ID = String(top) + String(left);
    }

    //создание значения ячейки
    create() {
        this.value = Math.random() >= 0.1 ? 2 : 4;
    }

    //проверка на существование ячейки
    isExist(top, left) {
        return this.top == top && this.left == left ? true : false;
    }

    //проверка существует ли значение в ячейке
    isActive() {
        return this.value != null ? true : false;
    }
}