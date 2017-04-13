/**
 * Created by wangbo on 2017/4/13.
 */
import React, {Component} from  'react';
import './TestApp.css'

import 'es6-promise'
import 'isomorphic-fetch'

class TestApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fetching: false,
      fetchResult: "waiting",
      countDown: 0,

      loginOrSignUp: true,

      loginName: "",
      loginPass: "",

      signUpName: "",
      signUpPass: "",
      signUpPassConfirm: ""


    };

    this.setCountDown = this.setCountDown.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
    this.changeLoginOrSignUp = this.changeLoginOrSignUp.bind(this);
  }

  fetchUrl() {
    if (this.state.countDown > 0) {
      this.setState((preState) => ({
        countDown: preState.countDown - 1
      }));
    } else {
      this.setCountDown()

      if (this.state.fetching === false) {

        this.setState({fetching: true, fetchResult: "fetching"})

        console.log();

        fetch('www.baidu.com')
          .then(response => {
            this.setState({
              fetching: false,
              fetchResult: "success:" + response.status
            })
          }).catch(e => {
          this.setState({
            fetching: false,
            fetchResult: "error"
          })
        })

      }
    }
  }

  setCountDown() {
    this.setState({countDown: Math.round(Math.random() * 5 + 1)})
  }

  componentDidMount() {
    this.setCountDown();
    this.interval = setInterval(this.fetchUrl.bind(this), 1000);
  }

  handleLogin(e) {
    e.preventDefault();
    console.log(" click login with" + this.state.loginName + "_" + this.state.loginPass)
  }

  handleSignUp(e) {
    e.preventDefault();
    console.log(" click sign up with" + this.state.signUpName + "_" + this.state.signUpPass)
  }


  handleInput(e) {
    var input = e.target.value;

    console.log(" input " + input + " in " + e.target)

    if (e.target === this._loginPassword) {
      this.setState({loginPass: input});
    } else if (e.target === this._loginName) {
      this.setState({loginName: input});
    } else if (e.target === this._signUpName) {
      this.setState({signUpName: input});
    } else if (e.target === this._signUpPass) {
      this.setState({signUpPass: input});
    } else if (e.target === this._signUpPassConfirm) {
      this.setState({signUpPassConfirm: input});
    }
  }

  changeLoginOrSignUp(e) {
    console.log(" change form to " + this.state.loginOrSignUp)
    this.setState((preState) => ({loginOrSignUp: !preState.loginOrSignUp}));
  }

  renderLogin() {
    return (
      <div>
        <form onSubmit={this.handleLogin}>
          <fieldset>
            <legend>Login Table:</legend>
            <p>LoginName: </p><input type="text" value={this.state.loginName} ref={it => this._loginName = it}
                                     onChange={this.handleInput}/><br/>
            <p>Password: </p><input type="password" value={this.state.loginPass} ref={it => this._loginPassword = it}
                                    onChange={this.handleInput}/><br/>
            <input type="submit" value="Login"/>
          </fieldset>
        </form>
      </div>
    )
  }

  renderSignUp() {
    return (
      <div>
        <form onSubmit={this.handleSignUp}>
          <fieldset>
            <legend>SingUp Table:</legend>
            <p>SignUp Name: </p><input type="text" value={this.state.signUpName} ref={it => this._signUpName = it}
                                       onChange={this.handleInput}/><br/>
            <p>SignUp Password: </p><input type="password" value={this.state.signUpPass}
                                           ref={it => this._signUpPass = it} onChange={this.handleInput}/><br/>
            <p>SignUp Password Confirm: </p><input type="password" value={this.state.signUpPassConfirm}
                                                   ref={it => this._signUpPassConfirm = it}
                                                   onChange={this.handleInput}/><br/>
            <input type="submit" value="SignUp"/>
          </fieldset>
        </form>
      </div>
    )
  }

  render() {

    return (
      <div className="TestApp">
        <p>Fetch : {this.state.fetchResult} , CountDown : {this.state.countDown}</p>
        <br/>
        <button type="button"
                onClick={this.changeLoginOrSignUp}>{this.state.loginOrSignUp ? "signUp" : "login"}</button>
        {this.state.loginOrSignUp ? this.renderLogin() : this.renderSignUp()}

      </div>
    )
  }
}


export default TestApp