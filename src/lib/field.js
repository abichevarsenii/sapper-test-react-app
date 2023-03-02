import {shuffleArray} from "./tools";

class Field {
    constructor(fieldHeight = 16, fieldWidth = 16, numberOfMines = 40) {
        this.fieldHeight = fieldHeight
        this.fieldWidth = fieldWidth
        this.numberOfMines = numberOfMines
        this.field = []
        for (let i = 0; i < fieldHeight; i++) {
            const row = Array(fieldWidth).fill(0)
            this.field.push(row)
        }
    }

    restartField(){
        for (let i = 0; i < this.fieldHeight; i++) {
            this.field[i].fill(0)
        }
    }

    createField(x= 0, y= 0) {
        const indexes = Array.from(Array(this.fieldWidth * this.fieldHeight).keys())
        indexes.splice(y * this.fieldWidth + x,1)
        shuffleArray(indexes)
        for (let i = 0; i < this.numberOfMines; i++) {
            const y =  Math.floor(indexes[i] / this.fieldWidth)
            const x = indexes[i] % this.fieldWidth
            this.field[x][y] = 1
        }
    }

    isValidCoordinates(x, y) {
        return x >= 0 && x < this.fieldWidth && y >= 0 && this.fieldHeight
    }
    
    isMine(x,y) {
        if (!this.isValidCoordinates(x, y)) return false
        return this.field[x][y]
    }

    countMinesAround(baseX, baseY) {
        if (!this.isValidCoordinates(baseX, baseY)) return 0
        let mines = -this.field[baseX][baseY]
        for (const x of [-1, 0, 1]) {
            for (const y of [-1, 0, 1]) {
                if (this.isValidCoordinates(baseX + x,baseY + y) && this.field[baseX + x][baseY + y]) mines++
            }
        }
        return mines
    }
}

export {Field}
