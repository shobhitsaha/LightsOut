import React, { Component } from 'react'
import Cell from './Cell.js'
import './Board.css'

class Board extends Component {

    static defaultProps = {
        len: 4,
        wid: 4
    }
    random() {
        return Math.floor(Math.random() < 0.2 ? true : false);
    }
    constructor(props) {
        super(props);
        this.state = {
            nums: this.createBoard(),
            hasWon: false
        }
        this.changeAround = this.changeAround.bind(this);
        this.createBoard = this.createBoard.bind(this);
        this.random = this.random.bind(this);
    }

    createBoard() {
        let newNums = [];
        let i = 0, j = 0;
        for (i = 0; i < this.props.len; i++) {
            let row = [];
            for (j = 0; j < this.props.wid; j++) {
                row.push(!(Math.floor(Math.random() < 0.8 ? true : false)));
            }
            newNums.push(row);
        }
        return newNums;
    }

    changeAround(coord) {

        let y = parseInt(coord.split("-")[0]);
        let x = parseInt(coord.split("-")[1]);

        let newNums = this.state.nums;

        newNums[y][x] = !newNums[y][x];
        if (x > 0) {

            newNums[y][x - 1] = !newNums[y][x - 1];
        }
        if (y > 0) {
            newNums[y - 1][x] = !newNums[y - 1][x];
        }
        if (x < this.props.wid - 1) {
            newNums[y][x + 1] = !newNums[y][x + 1];
        }
        if (y < this.props.len - 1) {
            newNums[y + 1][x] = !newNums[y + 1][x];
        }

        let hasWon = newNums.every(row => row.every(cell => !cell));

        this.setState({ nums: newNums, hasWon });

    }
    render() {
        if (this.state.hasWon) {
            return <h1>Won</h1>
        }
        let tble = [];
        for (let x = 0; x < this.props.len; x++) {
            let row = [];
            for (let y = 0; y < this.props.wid; y++) {
                let coord = `${x}-${y}`;
                row.push(<Cell key={coord} lit={this.state.nums[x][y]} changeAround={() => { this.changeAround(coord) }} />)
            }
            tble.push(<tr key={x}>{row}</tr>);
        }
        return (
            <section >

                <div className='container'>
                    <div class="neon">Lights </div>
                    <div class="flux">OUT </div>
                </div>

                <table className='board'>
                    <tbody>{tble}</tbody>
                </table>
            </section>
        )
    }
}
export default Board;