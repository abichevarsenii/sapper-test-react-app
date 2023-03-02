import React from "react";
import {Numbers} from "../lib/tools";
import "../css/Counter.css"

class Counter extends React.Component {
    render() {
        let numbers = this.getNumbers(Math.max(this.props.count, 0))
        if (numbers.length > this.props.digits) {
            numbers = this.getNumbers(Math.floor(Math.pow(10, this.props.digits) - 1))
        }
        if (numbers.length < this.props.digits) {
            const zeros = Array(this.props.digits - numbers.length).fill(0)
            numbers = [...zeros, ...numbers]
        }
        return <div className="counter">{numbers.map((num, ind) => <div key={ind}
                                                                        className={Numbers[num] + " icon-counter"}/>)}</div>
    }

    getNumbers = (number) => Array.from(String(number)).map(i => Number(i))
}

export default Counter