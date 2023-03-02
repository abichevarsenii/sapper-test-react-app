import React from "react";
import "../css/Cell.css"

class Cell extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cellType: "close"
        }
        this.clickHandler = this.clickHandler.bind(this)
        this.changeState = this.changeState.bind(this)
        this.contextMenu = this.contextMenu.bind(this)
        this.setSurprising = this.setSurprising.bind(this)
    }

    render() {
        return <div onClick={this.clickHandler} onMouseDown={() => this.setSurprising(true)}
                    onMouseUp={() => this.setSurprising(false)} onContextMenu={this.contextMenu} className="cell">
            <div className={this.state.cellType + " icon-cell"}/>
        </div>
    }

    showState() {
        if (this.state.cellType === "marked") {
            this.changeState("mined-defused")
        } else {
            this.changeState("mined-open")
        }
    }

    isOpen(){
        return this.state.cellType !== "close" && this.state.cellType !== "unknown" && this.state.cellType !== "marked"
    }

    contextMenu(e) {
        e.preventDefault()
        if (this.props.field.isFirstClick) return

        if (this.state.cellType === "close") {
            this.changeState("marked")
        } else if (this.state.cellType === "marked") {
            this.changeState("unknown")
        } else if (this.state.cellType === "unknown") {
            this.changeState("close")
        }
    }

    setSurprising(value) {
        this.props.field.setSurprising(value)
    }

    clickHandler() {
        this.props.field.onCellClicked(this.props.x, this.props.y, this)
    }

    changeState(state) {
        this.setState({cellType: state})
    }
}

export default Cell