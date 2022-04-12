import React, { Component } from 'react'
import './Cell.css'

class Cell extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(e) {
        this.props.changeAround();
    }
    render() {
        const { lit, changeAround } = this.props;
        return <td onClick={changeAround} className={`${lit === true ? "lit" : "off"}`}></td>
    }

}
export default Cell;