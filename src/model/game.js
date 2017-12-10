import Draw from '../view/draw';
import Score from './score';
import Mouse from './mouse';
import Cell from './cell';

//класс игры
export default class Game {
    constructor(size) {
        this.size = size; //размер игрового поля
        this.cells = []; //ячейки игрового поля
        this.isWin = false;

        this.draw = new Draw();
        this.score = new Score();
        this.mouse = new Mouse();
        
        this.createFields(size);
        this.addCells(true);
    }

    //создание игрового поля
    createFields(size){
        for(let i = 0; i < size; ++i) {
            for(let j = 0; j < size; ++j) {
                this.cells.push(new Cell(i, j));
                this.draw.drawField(i, j);
            }
        }

        this.draw.drawScore(this.score.score);
    }

    //установление значения для ячейки
    setValueCell(top, left) {
        for(let cell of this.cells) {
            if (cell.isExist(top, left)) {
                cell.create();
                this.draw.drawCell(cell.ID, top, left, cell.value);                
            }
        }
    }

    //добавление ячейки
    addCells(isNewGame = false) {
        //в начале игры
        if(isNewGame) {
            let top1 = this.randPosition(true);
            let top2 = this.randPosition(true);
            let left1 = this.randPosition(true);
            let left2 = this.randPosition(true);

            //проверка на разные позиции
            if(top1 == top2) {
                if(left1 == left2) {
                    while(left1 == left2) 
                        left2 = this.randPosition(true);
                }
                this.setValueCell(top1, left1);
                this.setValueCell(top2, left2);
            }
            else {
                this.setValueCell(top1, left1);
                this.setValueCell(top2, left2);
            }
        }
        //во время игры
        else {
            let freePositions = [];

            //формирование массива позиций, в которых нет активных ячеек
            for(let cell of this.cells) {
                if(!cell.isActive()) 
                    freePositions.push({'top' : cell.top, 'left' : cell.left});
            }

            //добавление ячейки
            if(freePositions.length > 0) {
                let position = this.randPosition(false, freePositions);
                this.setValueCell(position.top, position.left);
            }
            //проверка на конец игры
            else 
                this.lost();
        }
    }

    //рандом позиции ячейки
    randPosition(isNewGame, positions = null) {
        return isNewGame ? Math.floor(Math.random() * 4) : positions[Math.floor(Math.random() * positions.length)];
    }

    //движение ячейки в зависимости от направление движения мыши
    moveCells() {
        let direction = this.direction();

        if(direction != null) {
            switch(direction) {
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
    moveRight() {
        let isMoving = false;
        let cellsNewValue = []; //ячейки, у которых поменялось значение
       
        //сортировка массива ячеек
        this.cells.sort(this.compareArrayRight);

        for(let cell of this.cells) {
            //если значение ячейки не null
            if(cell.isActive()) {
                //просмотр ячеек, которые правее текущей
                for(let i = cell.left + 1; i < this.size; ++i) {
                    //получение ячейки, находящейся справа от текущей ячейки
                    let nextCell = this.getCell(cell.top, i);
                
                    if (nextCell != null) {     
                        if(nextCell.isActive()) {
                            //проверка на равенство значений соседних ячеек и дигалась ли текущая ячейка
                            if(cell.value == nextCell.value && !this.isCellInArray(cellsNewValue, cell)) {
                                let nextNextCell = this.getCell(cell.top, nextCell.left + 1); 

                                //если следом еще есть ячейка с таким же значение то текущую ячейку не перемщаем
                                if(nextNextCell != null && nextNextCell.isActive() && cell.value == nextNextCell.value) 
                                    break;

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
                                for(let j = cell.left - 1; j > 0; --j){
                                    let cellPrevios = this.getCell(cell.top, j);

                                    if(cellPrevios != null) {
                                        if(cellPrevios.isActive()) {
                                            for(let k = cellPrevios.left + 1; k < this.size; ++k) {
                                                let newCell = this.getCell(cell.top, k);
                                                
                                                if(newCell != null && !newCell.isActive()) {
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
                                    }
                                    else break;
                                }

                                //проверка на конец игры (значение в ячейке 2048)
                                this.win(cell.value);
                            }
                            else break;
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
                    }
                    else break;
                }
            }
        }

        if (isMoving) 
            this.addCells(); //добавление новой ячейки
        else 
            this.lost(); //проверка на проигрыш
    }

    //движение налево, аналогично moveRight()
    moveLeft() {
        let isMoving = false;
        let cellsNewValue = [];

        this.cells.sort(this.compareArrayLeft);
       
        for(let cell of this.cells) {
            if(cell.isActive()) {
                for(let i = cell.left - 1; i >= 0; --i) {
                    let nextCell = this.getCell(cell.top, i);
                
                    if (nextCell != null) {     
                        if(nextCell.isActive()) {
                            if(cell.value == nextCell.value && !this.isCellInArray(cellsNewValue, cell)) {
                                let nextNextCell = this.getCell(cell.top, nextCell.left - 1); 

                                if(nextNextCell != null && nextNextCell.isActive() && cell.value == nextNextCell.value) 
                                    break;
                                
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

                                for(let j = cell.left + 1; j < this.size; ++j){
                                    let cellPrevios = this.getCell(cell.top, j);

                                    if(cellPrevios != null) {
                                        if(cellPrevios.isActive()) {
                                            for(let k = cellPrevios.left - 1; k >= 0; --k) {
                                                let newCell = this.getCell(cell.top, k);
                                                
                                                if(newCell != null && !newCell.isActive()) {
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
                                    }
                                    else break;
                                }

                                this.win(cell.value);
                            }
                            else break;
                        }
                        
                        else {
                            cell.left--;
                            this.draw.movingCell(cell.ID, cell.top, cell.left, 'left');

                            nextCell.left++;
                            nextCell.ID = cell.ID;     

                            cell.ID = String(cell.top) + String(cell.left);
                            this.draw.updateID(nextCell.ID, cell.ID);

                            isMoving = true;
                        }
                    }
                    else break;
                }
            }
        }

        if (isMoving) 
            this.addCells();
        else 
            this.lost();
    }

    //движение наверх, аналогично moveRight()
    moveUp() {
        let isMoving = false;
        let cellsNewValue = [];

        this.cells.sort(this.compareArrayUp);
       
        for(let cell of this.cells) {
            if(cell.isActive()) {
                for(let i = cell.top - 1; i >= 0; --i) {
                    let nextCell = this.getCell(i, cell.left);
                
                    if (nextCell != null) {     
                        if(nextCell.isActive()) {
                            if(cell.value == nextCell.value && !this.isCellInArray(cellsNewValue, cell)) {
                                let nextNextCell = this.getCell(nextCell.top - 1, cell.left); 

                                if(nextNextCell != null && nextNextCell.isActive() && cell.value == nextNextCell.value) 
                                    break;

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

                                for(let j = cell.top + 1; j < this.size; ++j){
                                    let cellPrevios = this.getCell(j, cell.left);

                                    if(cellPrevios != null) {
                                        if(cellPrevios.isActive()) {
                                            for(let k = cellPrevios.top - 1; k >= 0; --k) {
                                                let newCell = this.getCell(k, cell.left);
                                                
                                                if(newCell != null && !newCell.isActive()) {
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
                                    }
                                    else break;
                                }

                                this.win(cell.value);
                            }
                            else break;
                        }
                        
                        else {
                            cell.top--;
                            this.draw.movingCell(cell.ID, cell.top, cell.left, 'top');

                            nextCell.top++;
                            nextCell.ID = cell.ID;     

                            cell.ID = String(cell.top) + String(cell.left);
                            this.draw.updateID(nextCell.ID, cell.ID);

                            isMoving = true;
                        }
                    }
                    else break;
                }
            }
        }

        if (isMoving)
            this.addCells();
        else 
            this.lost();
    }

    //движение вниз, аналогично moveRight()
    moveDown() {
        let isMoving = false;
        let cellsNewValue = [];

        this.cells.sort(this.compareArrayDown);
       
        for(let cell of this.cells) {
            if(cell.isActive()) {
                for(let i = cell.top + 1; i < this.size; ++i) {
                    let nextCell = this.getCell(i, cell.left);
                
                    if (nextCell != null) {     
                        if(nextCell.isActive()) {
                            if(cell.value == nextCell.value && !this.isCellInArray(cellsNewValue, cell)) {
                                let nextNextCell = this.getCell(nextCell.top + 1, cell.left); 

                                if(nextNextCell != null && nextNextCell.isActive() && cell.value == nextNextCell.value) 
                                    break;
                                
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

                                for(let j = cell.top - 1; j >= 0; --j){
                                    let cellPrevios = this.getCell(j, cell.left);

                                    if(cellPrevios != null) {
                                        if(cellPrevios.isActive()) {
                                            for(let k = cellPrevios.top + 1; k < this.size; ++k) {
                                                let newCell = this.getCell(k, cell.left);
                                                
                                                if(newCell != null && !newCell.isActive()) {
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
                                    }
                                    else break;
                                }

                                this.win(cell.value);
                            }
                            else break;
                        }
                        
                        else {
                            cell.top++;
                            this.draw.movingCell(cell.ID, cell.top, cell.left, 'top');

                            nextCell.top--;
                            nextCell.ID = cell.ID;     

                            cell.ID = String(cell.top) + String(cell.left);
                            this.draw.updateID(nextCell.ID, cell.ID);

                            isMoving = true;
                        }
                    }
                    else break;
                }
            }
        }

        if (isMoving)
            this.addCells();
        else 
            this.lost();
    }

    //функция для сортировки массива (max left)
    compareArrayRight(a, b) {
        return b.left - a.left;
    }

    //min left
    compareArrayLeft(a, b) {
        return a.left - b.left;
    }

    //min top
    compareArrayUp(a, b) {
        return a.top - b.top;
    }

    //max top
    compareArrayDown(a, b) {
        return b.top - a.top;
    }

    //определение направления движения мыши
    direction() {
        let array = {};
        let max = 0;
        let resultDirection;

        this.mouse.x2 >= this.mouse.x1 ? array['right'] = this.mouse.x2 - this.mouse.x1 : array['left'] = this.mouse.x1 - this.mouse.x2;
        this.mouse.y2 >= this.mouse.y1 ? array['down'] = this.mouse.y2 - this.mouse.y1 : array['up'] = this.mouse.y1 - this.mouse.y2;
        
        for(let index in array) {
            if(array[index] > max){ 
                max = array[index];
                resultDirection = index;
            }
        }

        //длина движение мыши должн быть более 70px (чтобы исключить случайное движение)
        return max >= 70 ? resultDirection : null;
    }

    //проверка на вхождение элемента в массив
    isCellInArray(array, cell) {
        for(let element of array) {
            if (element == cell) 
                return true; 
        }

        return false;
    }

    //получение ячейки по ее позиции
    getCell(top, left) {
        for(let cell of this.cells) {
            if (cell.top == top && cell.left == left)  
                return cell;  
        }

        return null;
    }

    //проверка на проигрыш
    lost() {
        let isLost = true;

        //должны отсутствовать ячейки со значением null
        for(let cell of this.cells) {
            if(!cell.isActive()) {
                isLost = false;
                break;
            }

            let stopFor = false;
            let cellsAbout = []; //соседние ячейки
            cellsAbout.push(this.getCell(cell.top, cell.left + 1));
            cellsAbout.push(this.getCell(cell.top, cell.left - 1));
            cellsAbout.push(this.getCell(cell.top - 1, cell.left));
            cellsAbout.push(this.getCell(cell.top + 1, cell.left));

            //не должно быть соседних ячеек с одинаковым значнием
            for(let cellAbout of cellsAbout) {
                if(cellAbout != null && cell.value == cellAbout.value) {
                    stopFor = true;
                    isLost = false;
                    break;
                }
            }

            if(stopFor) 
                break;
        }
        
        if(isLost) {
            alert('You lost!');
            window.location.reload();
        }
    }

    //проверка на победу
    win(maxValue) {
        if(maxValue >= 2048 && !this.isWin) {
            let isOk = confirm('You win!');
            
            if(isOk)  window.location.reload();
            else this.isWin = true;  
        }
    }
}