/**
 * Created by wangbo on 2016/12/2.
 */

import React from 'react'
import './Common.css'

class FancyBoarder extends React.Component {
  render() {
    return (
      <div className={this.props.color}>
        {this.props.children}
      </div>
    )
  }
}

class Dialog extends React.Component {
  // constructor(props) {
  //   super(props)
  // }

  render() {
    return (
      <FancyBoarder color="blue">
        <h1>{this.props.title}</h1>
        <p>{this.props.message}</p>
        {this.props.children}
      </FancyBoarder>
    )
  }
}

class LoginDialog extends React.Component {
  constructor(props) {
    super(props)

    this.state = {value: '', message: 'Input user name to login'}

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleSubmit(e) {
    e.preventDefault()
    this.setState({message: "Welcome ," + this.state.value})
  }

  handleChange(e) {
    this.setState({value: e.target.value})
  }

  render() {
    return (
      <Dialog title="Login Dialog" message={this.state.message}>
        <form onSubmit={this.handleSubmit}>
          <fieldset>
            <legend>Input user name:</legend>
            <input type="text" value={this.state.value} onChange={this.handleChange}/>
            <input type="submit" value="Login"/>
          </fieldset>
        </form>
      </Dialog>
    )
  }
}

export default LoginDialog