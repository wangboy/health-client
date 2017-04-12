/**
 * Created by wangbo on 2016/12/15.
 */
// class Square extends React.Component {
//   // constructor(props) {
//   //   super(props)
//   //   // this.state = {value: null}
//   // }
//
//   render() {
//     return (
//       <button className="square" onClick={this.props.onClick}>
//         {this.props.value}
//       </button>
//     );
//   }
// }

import React from 'react'
import './index.css'

const ASCENDING = 'ascending'
const DESCENDING = 'descending'

function Square(props) {
  return (
    <button className={props.cc ? "square square-win" : "square"} onClick={props.onClick}>
      {props.value}
    </button>
  )
}

class Board extends React.Component {
  // constructor(props) {
  //   super(props)
  // }

  onClick(i) {
    this.props.onClick(i)
  }

  renderSquare(i) {
    let value = this.props.arr[i] || ''
    const result = this.props.result
    let row = result ? result.winrow : []

    return <Square key={i} value={value} cc={row.indexOf(i) !== -1}
                   onClick={this.onClick.bind(this, i) /* () => this.onClick(i)*/}/>;
  }

  render() {
    let coms = []
    for (let i = 0; i < 3; i++) {
      let ins = []
      for (let j = i * 3; j < i * 3 + 3; j++) {
        ins.push(this.renderSquare(j))
      }
      coms.push(
        <div key={i} className="board-row">
          {ins}
        </div>
      )
    }


    // const status = 'Next player: X';
    return (
      <div>
        {/*<div className="status">{status}</div>*/}
        {coms}
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      arr: Array(9).fill(null),
      current: 1, // 1 =X ,-1 = O
      moves: [[-1, '']],
      result: null,
      ascend: true
    }

    this.onClick = this.onClick.bind(this)
    this.handleBack = this.handleBack.bind(this)
    this.handleSortMove = this.handleSortMove.bind(this)
  }

  onClick(i) {
    let {arr, current, moves, result} = this.state
    if (result !== null) {
      console.log(`already has winner ${result}`)
      return
    }
    arr = Array.from(arr)
    moves = moves.slice()
    if (arr[i] === null) {
      let value = current === 1 ? 'X' : 'O'
      arr[i] = value
      moves.push([i, value])

      let result = calculateWinner(arr)

      this.setState({
        arr,
        current: current * -1,
        moves,
        result
      })
    } else {
      console.log(` already has clicked ${arr[i]}`)
    }
  }

  handleBack(index) {
    console.log(` click move ${index}`)
    let moves = this.state.moves.slice(0, index + 1)
    let arr = Array(9).fill(null)
    moves.forEach((item) => {
      arr[item[0]] = item[1]
    })
    let value = moves[moves.length - 1][1]
    this.setState({
      arr,
      current: value === 'X' ? -1 : 1,
      moves,
      result: null
    })
  }

  convertToPosition(i) {
    return `(${Math.floor(i / 3) + 1}, ${i % 3 + 1})`
  }

  handleSortMove(e) {
    let value = e.target.value
    console.log(` sort move ${value}`)
    if (value === ASCENDING) {
      this.setState({ascend: true})
    } else {
      this.setState({ascend: false})
    }
  }

  componentDidMount() {
    this.ascendRadio.checked = true
  }

  render() {
    let result = this.state.result
    console.log(`check result : ${result}`)
    let info = <div>Next player: {this.state.current === 1 ? 'X' : 'O'}</div>
    if (result !== null) {
      info = <div>Winner is : {result.winner}</div>
    }
    let moves = this.state.moves.map(
      (item, index) => (
        <li className={index === this.state.moves.length - 1 ? "game-info-current" : "game-info"} key={index}>
          <a href="#" onClick={this.handleBack.bind(this, index)}>
            {item[0] === -1 ? 'Game Start' : `Move #${item[1]} at ${this.convertToPosition(item[0])} ${item[0]}`}
          </a>
        </li>
      )
      , this)

    if (!this.state.ascend) {
      moves.reverse()
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board arr={this.state.arr} result={result} onClick={this.onClick}/>
        </div>
        <div className="game-info">
          {info}
          <label><input ref={(it) => this.ascendRadio = it} name="moves" type="radio" value={ASCENDING}
                        onChange={this.handleSortMove}/>{ASCENDING}</label>
          <label><input name="moves" type="radio" value={DESCENDING} onChange={this.handleSortMove}/>{DESCENDING}
          </label>
          <ol start="1">{moves}</ol>
        </div>
      </div>
    );
  }
}
export default Game

// ========================================

// ReactDOM.render(
//   <Game />,
//   document.getElementById('container')
// );

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return {winner: squares[a], winrow: lines[i].slice()};
    }
  }
  return null;
}
