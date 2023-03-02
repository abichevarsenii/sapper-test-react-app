import React from "react";
import Counter from "./Counter";

class Timer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {time: 0};
        this.initialCount = this.props.initialTime
        this.timer = 0;
        this.startTimer = this.startTimer.bind(this);
        this.countDown = this.countDown.bind(this);
    }

    componentDidMount() {
        this.startTimer()
    }

    startTimer() {
        this.stopTimer()
        this.setState({time: this.initialCount});
        this.timer = setInterval(this.countDown, 1000 * 60);
    }

    stopTimer() {
        if (this.timer !== 0) {
            clearInterval(this.timer);
        }
    }

    countDown() {
        let seconds = this.state.time - 1;
        this.setState({
            time: seconds
        });
        if (seconds === 0) {
            this.props.onTimerEnd()
            clearInterval(this.timer);
        }
    }

    render() {
        return (
            <div className="timer">
                <Counter count={this.state.time} digits={3}/>
            </div>
        );
    }
}

export default Timer