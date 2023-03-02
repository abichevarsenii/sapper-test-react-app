import React from "react";
import "../css/GameStatus.css"

class GameStatus extends React.Component {
    render() {
        return <div onClick={this.props.onClick} className="game-status">
            <div className={this.props.gameStatus + " icon-game-status"}/>
        </div>
    }
}

export default GameStatus