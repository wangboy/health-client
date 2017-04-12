/**
 * Created by wangbo on 2016/12/2.
 */
import React from 'react'
import './Calculator.css'

// function BoilingVerdict(props) {
//   if (props.celsius >= 100) {
//     return <p>The water would boil</p>
//   } else {
//     return <p>The water would not boil</p>
//   }
// }

class BoilingVerdict extends React.Component {
  // constructor(props) {
  //   super(props)
  // }

  render() {
    if (this.props.celsius >= 100) {
      return <p>The water would boil</p>
    } else {
      return <p>The water would not boil</p>
    }
  }
}

const scaleNames = {
  c: 'Celsius',
  f: 'Fahrenheit'
}

class TemperatureInput extends React.Component {
  constructor(props) {
    super(props)
    // this.state = {value: ''}
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e) {
    this.props.onChange(e.target.value)
    // this.setState({value: e.target.value})
  }

  render() {
    return (
      <fieldset>
        <legend>Enter temperature in {scaleNames[this.props.scale]}:</legend>
        <input type="text" value={this.props.value} onChange={this.handleChange}/>
        {/*<BoilingVerdict />*/}
      </fieldset>
    )
  }
}

function toCelsius(fahrenheit) {
  return (fahrenheit - 32) * 5 / 9;
}

function toFahrenheit(celsius) {
  return (celsius * 9 / 5) + 32;
}

function tryConvert(value, convert) {
  const input = parseFloat(value)
  if (isNaN(input)) {
    return ''
  }
  const output = convert(input)
  const rounded = Math.round(output * 1000) / 1000
  return rounded
}

class Calculator extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      temp: '',
      scale: 'c'
    }
    this.handleChange = this.handleChange.bind(this)

    this.handleChangeC = this.handleChangeC.bind(this)
    this.handleChangeF = this.handleChangeF.bind(this)
  }

  handleChangeC(cValue) {
    this.setState({
      temp: cValue,
      scale: 'c'
    })
  }


  handleChangeF(fValue) {
    this.setState({
      temp: fValue,
      scale: 'f'
    })
  }

  handleChange(e) {
    this.setState({temp: e.target.value});
  }

  render() {
    const scale = this.state.scale
    const temp = this.state.temp
    let c, f
    console.log(this.state)
    if (scale === 'c') {
      c = temp
      f = tryConvert(c, toFahrenheit)
    } else {
      f = temp
      c = tryConvert(f, toCelsius)
    }

    return (
      <div>
        <BoilingVerdict celsius={parseInt(c, 10)}/>
        <div className="TemperatureInput1">
          <TemperatureInput onChange={this.handleChangeC} value={c} scale="c"/>
        </div>
        <div className="TemperatureInput2">
          <TemperatureInput onChange={this.handleChangeF} value={f} scale="f"/>
        </div>
      </div>
      // <fieldset className="Calculator">
      //   <legend>Enter temperature in Celsius:</legend>
      //   <input type="text" value={this.state.temp} onChange={this.handleChange}/>
      //   <BoilingVerdict celsius={parseInt(this.state.temp, 10)}/>
      // </fieldset>
    )
  }
}

export default Calculator