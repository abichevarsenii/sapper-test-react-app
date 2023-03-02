import React from "react";
import Counter from "./Counter";
import Field from "./Field";
import GameStatus from "./GameStatus";
import Timer from "./Timer";

class App extends React.Component {

    constructor(props) {
        super(props);
        this.settings = {
            width: 16,
            height: 16,
            minesCount: 40,
            timerCount: 40
        }
        this.state = {
            marksCount: this.settings.minesCount,
            gameStatus: "start"
        }
        this.gameStatus = React.createRef();
        this.field = React.createRef();
        this.timer = React.createRef();
        this.onChangeMark = this.onChangeMark.bind(this)
        this.onChangeGameStatus = this.onChangeGameStatus.bind(this)
        this.onStartGame = this.onStartGame.bind(this)
        this.onTimerEnd = this.onTimerEnd.bind(this)
    }

    render() {
        return <main>
            <div className="background">
                <div className="top-menu">
                    <Counter count={this.state.marksCount} digits={3}/>
                    <GameStatus ref={this.gameStatus} onClick={this.onStartGame} gameStatus={this.state.gameStatus}/>
                    <Timer onTimerEnd={this.onTimerEnd} initialTime={this.settings.timerCount} ref={this.timer}/>
                </div>
                <Field settings={this.settings} ref={this.field} onChangeMark={this.onChangeMark}
                       onChangeGameStatus={this.onChangeGameStatus}/>
            </div>
        </main>
    }

    onTimerEnd() {
        this.field.current.onDefeat()
    }

    onStartGame() {
        this.timer.current.startTimer()
        this.onChangeGameStatus("start")
        this.field.current.restartGame()
    }

    onChangeGameStatus(status) {
        if (status !== "start") this.timer.current.stopTimer()
        this.setState({gameStatus: status})
    }

    onChangeMark(value) {
        this.setState({marksCount: this.state.marksCount + value})
    }
}

export default App