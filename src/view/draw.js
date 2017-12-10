//класс для отрисовки и анимации объектов
export default class Draw {
    constructor () {}

    //добавление ячейки игрового поля
    drawField(top, left) {
        $('#playfield').append('<div class="back" style="top: ' + top * 100 + 'px; left: ' + left * 100 + 'px;"></div>');
    }

    //добавление активной ячейки
    drawCell(ID, top, left, value) {
        $('#playfield').append('<div id="' + ID + '" class="emerg thing t' + value + '" style="top: ' + top * 100 + 'px; left: ' + left * 100 + 'px;"></div>');
    }

    //изменение значение игрового счета
    drawScore(score) {
        $('#point').text(score);
    }

    //изменение позиции (top, left) активной ячейки
    movingCell(ID, top, left, direction) {
        let div = $('#' + ID);

        switch(direction) {
            case 'left':
                div.animate({'left': left * 100 + 'px'}, 20);
                break;

            case 'top':
                div.animate({'top': top * 100 + 'px'}, 20);
                break;
        }
    }

    //удаления поля с неактивной ячейкой
    deleteCell(ID) {
        $('#' + ID).remove();
    }

    //изменение класса ячейки, у которой изменилось значение
    drawNewValue(ID, value) {
        let div = $('#' + ID);
        div.removeClass();
        div.addClass('thing t' + value);
    }

    //анимация изменивщейся ячейки
    animateNewValue(ID) {
        let div = $('#' + ID);
        div.animate({'height' : '-=10px'}, 50, function() {
            div.animate({'height' : '+=10px'}, 50);
        });
    }

    //изменеие ID div'а ячейки
    updateID(oldID, newID) {
        $('#' + oldID).attr({'id' : newID});
    }
}