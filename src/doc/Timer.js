/**
 * Created by wangbo on 2016/12/1.
 */
import React from 'react';
import './Timer.css'

class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      seconds: 0,
      resetTimes: 0,
      text: '',
      sel: '10'
    };

    this.reset = this.reset.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleTextChange = this.handleTextChange.bind(this)

    this.handleSelectChange = this.handleSelectChange.bind(this)
    this.handleSubmitSelect = this.handleSubmitSelect.bind(this)
  }

  tick() {
    this.setState((preState)=> ({
      seconds: preState.seconds + 1
    }));
  }

  reset() {
    this.setState((preState) => ({seconds: 0, resetTimes: preState.resetTimes + 1}))
  }

  componentDidMount() {
    // this.interval = setInterval(() => this.tick(), 1000);
    this.interval = setInterval(this.tick.bind(this), 1000)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log(" submit something ");
    if (!isNaN(parseInt(this.state.text, 10))) {
      this.setState({
        seconds: parseInt(this.state.text, 10),
        text: ''
      });
    }
  }

  handleTextChange(e) {
    let input = e.target.value;
    if (!isNaN(parseInt(input, 10))) { //parseInt '1122sss' = 1122
      this.setState({text: e.target.value})
      console.log(' e.target is ' + e.target) //HTMLInputElement
      e.target.focus()
    }
  }

  handleSubmitSelect(e) {
    e.preventDefault()
    this.setState({seconds: parseInt(this.state.sel, 10)})
  }

  handleSelectChange(e) {
    this.setState({sel: e.target.value})
  }

  render() {
    let even = <p>Even</p>
    if (this.state.seconds % 2 !== 0) {
      even = <p>Odd</p>
    }

    let options = []
    for (let i = 10; i < 50; i += 10) {
      options.push(<option value={i + ""}>{i + ""} sec</option>)
    }

    return (
      <div className="Timer">
        <p onClick={this.reset}>Seconds : {this.state.seconds}</p>
        {even}
        <button className="btn" type="button" onClick={this.reset}>Reset Timer</button>
        <p>Reset Times: {this.state.resetTimes}</p>

        <form onSubmit={this.handleSubmit}>
          <label>
            Enter a Number:
            <input type="text" ref={it => this._text = it} value={this.state.text} onChange={this.handleTextChange}/>
          </label>
          <input type="submit" value="subInput"/>
        </form>

        <form onSubmit={this.handleSubmitSelect}>
          <label>
            Choose a second :
            <select value={this.state.sel} onChange={this.handleSelectChange}>
              {options}
            </select>
          </label>
          <input type="submit" value="subSel"/>
        </form>
      </div>
    )
  }
}

export default Timer;