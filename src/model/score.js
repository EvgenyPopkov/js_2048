//класс для игрового счета
export default class Score {
    constructor() {
        this.score = 0;
    }

    //добавление очков
    addPoints(points) {
        this.score += points;
    }
}