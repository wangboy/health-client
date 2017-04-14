/**
 * Created by wangbo on 2017/4/13.
 */
import React, {Component} from  'react';
import './TestApp.css'

import 'es6-promise'
import 'isomorphic-fetch'

import FetchTest from './FetchTest'

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
      signUpPassConfirm: "",

      current: ""

    };

    this.setCountDown = this.setCountDown.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
    this.changeLoginOrSignUp = this.changeLoginOrSignUp.bind(this);
    this.getOauthToken = this.getOauthToken.bind(this);
    this.getCurrentUser = this.getCurrentUser.bind(this);
  }

  setCountDown() {
    this.setState({countDown: Math.round(Math.random() * 5 + 1)})
  }

  componentDidMount() {
    // this.setCountDown();
    // this.interval = setInterval(this.fetchUrl.bind(this), 1000);
  }

  handleLogin(e) {
    e.preventDefault();
    console.log(" click login with" + this.state.loginName + "_" + this.state.loginPass)
    this.getOauthToken(this.state.loginName, this.state.loginPass, this.getCurrentUser);
  }

  handleSignUp(e) {
    e.preventDefault();
    console.log(" click sign up with" + this.state.signUpName + "_" + this.state.signUpPass)

    let headers = new Headers();

    headers.append('Content-Type', 'application/json')

    let init = {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
          username: this.state.signUpName,
          password: this.state.signUpPass
        })
      }
    ;
    fetch("user/", init)
      .then((response) => {
          this.setState((preState) => {
              this.getOauthToken(this.state.signUpName, this.state.signUpPass, this.getCurrentUser);
              return {loginName: this.state.signUpName, loginPass: this.state.signUpPass};
            }
          );
        }
      ).catch(
      e => {
        this.removeToken();
      }
    )
  }

  getOauthToken(name, pass, cb) {
    console.log(" try get token : " + name + " _ " + pass);
    let header = new Headers();
    header.append('Authorization', 'Basic YnJvd3Nlcjo=');
    let init = {
      method: 'POST',
      headers: header,
      body: JSON.stringify({
        scope: 'ui',
        username: name,
        password: pass,
        grant_type: 'password'
      })
    };
    fetch('uaa/oauth/token', init)
      .then(response => {
        console.log(" get token success : " + response.body.toString());
        return response.json();
      })
      .then(json => {
        // this.setState({accessToken: json.access_token});
        console.log("store token : " + json.toString());
        localStorage.setItem('token', json.access_token);
        return this.getToken()
      })
      .then(token => {
        console.log(" call cb " + cb)
        cb();
      })
      .catch(e => {
        console.log("get token fail!");
        this.removeToken();
      })
  }

  getCurrentUser() {
    console.log(" try get current user ");
    let header = new Headers();
    header.append('Authorization', 'Bearer' + this.getToken())
    let init = {
      method: 'GET',
      headers: header,
    };

    fetch('user/current', init)
      .then(response => {
        console.log(" get current user success " + response.toString());
        return response.json()
      })
      .then(json => {
        console.log(" get current user " + json.toString());
        this.setState({current: json.toString()});
      })
      .catch(e => {
        console.log(" get current user error");
        this.removeToken()
      })
  }

  getToken() {
    localStorage.getItem('token');
  }

  removeToken() {
    localStorage.removeItem('token');
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
        <FetchTest/>
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