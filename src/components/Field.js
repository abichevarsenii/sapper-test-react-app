import React from "react";
import {Field} from "../lib/field";
import Cell from "./Cell";
import {Numbers} from "../lib/tools";


class FieldComponent extends React.Component {
    constructor(props) {
        super(props);
        const {height, width, minesCount} = this.props.settings
        this.field = new Field(height, width, minesCount)
        this.isFirstClick = true
        this.isFieldBlocked = false
        this.cellField = []
        for (let i = 0; i < height; i++) {
            const row = Array(width).fill(null)
            this.cellField.push(row)
        }
        this.restartGame = this.restartGame.bind(this)
        this.setSurprising = this.setSurprising.bind(this)
    }

    render() {
        return <table className="field">
            <tbody>
            {this.field.field.map((row, i) => <tr key={i.toString()}>
                {row.map((cell, j) => <td key={j.toString()}>{this.createCell(j, i)}</td>)}
            </tr>)
            }
            </tbody>
        </table>
    }

    showAllMines() {
        setTimeout(() => this.cellField.forEach((row, i) => {
            row.forEach((cell, j) => {
                if (cell && this.field.isMine(i, j)) cell.showState()
            })
        }), 0)
    }

    restartGame() {
        setTimeout(() => this.cellField.forEach(row => {
            row.forEach(cell => {
                if (cell) {
                    cell.changeState("close")
                }
            })
            this.minesCount = this.field.numberOfMines
            this.field.restartField()
            this.isFirstClick = true
            this.isFieldBlocked = false
        }), 0)
    }

    createCell(x, y) {
        return <Cell ref={el => this.cellField[x][y] = el} y={y} x={x} field={this}/>
    }

    openEmpty(x, y) {
        if (this.field.isValidCoordinates(x, y) && !this.field.isMine(x, y)) this.onCellClicked(x, y, this.cellField[x][y])
    }

    onVictory() {
        this.isFieldBlocked = true
        this.showAllMines()
        this.props.onChangeGameStatus("victory")
    }

    onDefeat() {
        this.isFieldBlocked = true
        this.showAllMines()
        this.props.onChangeGameStatus("defeat")
    }

    setSurprising(value) {
        this.props.onChangeGameStatus(value ? "surprising" : "start")
    }

    checkVictory() {
        for (let i = 0; i < this.field.fieldHeight; i++) {
            for (let j = 0; j < this.field.fieldWidth; j++) {
                if (!this.field.isMine(j, i) && (this.cellField[j][i] && !this.cellField[j][i].isOpen())){
                    return
                }

            }
        }
        this.onVictory()
    }

    onCellClicked(x, y, cell) {
        if (this.isFirstClick) this.field.createField(x, y)
        this.isFirstClick = false
        if (this.isFieldBlocked || !cell || cell.isOpen()) return
        if (this.field.field[x][y] === 1) {
            this.onDefeat()
            setTimeout(() => cell.changeState("mined-detonated"), 1)
        } else {
            const minesAround = this.field.countMinesAround(x, y)
            cell.changeState(Numbers[minesAround])
            this.cellField[x][y] = null
            if (minesAround === 0) {
                this.openEmpty(x - 1, y)
                this.openEmpty(x + 1, y)
                this.openEmpty(x, y - 1)
                this.openEmpty(x, y + 1)
            }
            setTimeout(() => this.checkVictory(),0)
        }
    }
}

export default FieldComponent