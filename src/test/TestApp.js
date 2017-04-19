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

      loginOrSignUp: false,

      loginCell: "",
      loginPass: "",

      signUpCell: "",
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
    console.log(" click login with" + this.state.loginCell + "_" + this.state.loginPass)
    this.getOauthToken(this.state.loginCell, this.state.loginPass, this.getCurrentUser);
  }

  handleSignUp(e) {
    e.preventDefault();
    console.log(
      `clike sign up with
      ${this.state.signUpCell}
      ${this.state.signUpName}
      ${this.state.signUpPass}
      `
    )

    let headers = new Headers();

    headers.append('Content-Type', 'application/json')

    let init = {
        method: 'POST',
        // mode: 'no-cors',
        headers: headers,
        credentials: 'include',
        body: JSON.stringify({
          cell: this.state.signUpCell,
          name: this.state.signUpName,
          password: this.state.signUpPass,
          role: 'USER'
        })
      }
    ;
    fetch("/user/", init)
      .then((response) => {

          console.log(" sign up result " + response.status);

          this.setState((preState) => {
              this.getOauthToken(this.state.signUpCell, this.state.signUpPass, this.getCurrentUser);
              return {loginCell: this.state.signUpName, loginPass: this.state.signUpPass};
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
    header.append('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
    let init = {
      method: 'POST',
      // mode: 'no-cors',
      credentials: 'include',
      headers: header,
      body: `scope=ui&username=${name}&password=${pass}&grant_type=password`
    };
    fetch('/uaa/oauth/token', init)
      .then(response => {
        console.log(" get token success : " + response.toString());
        return response.json();
      })
      .then(json => {
        // this.setState({accessToken: json.access_token});
        let token = json.access_token;
        console.log("store token : " + token);
        localStorage.setItem('token', token);
        // return this.getToken()
        return token;
      })
      .then(token => {
        console.log(" call cb " + cb)
        cb();
      })
      .catch(e => {
        console.log("get token fail!" + e.message);
        this.removeToken();
      })
  }

  getCurrentUser() {
    console.log(" try get current user ");
    let header = new Headers();
    let token = this.getToken();
    header.append('Authorization', 'Bearer' + token)
    let init = {
      method: 'GET',
      credentials: 'include',
      headers: header,
      // mode: 'no-cors',
    };

    fetch('/user/current', init)
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
    return localStorage.getItem('token');
  }

  removeToken() {
    localStorage.removeItem('token');
  }


  handleInput(e) {
    var input = e.target.value;

    // console.log(" input " + input + " in " + e.target)

    if (e.target === this._loginPassword) {
      this.setState({loginPass: input});
    } else if (e.target === this._loginCell) {
      this.setState({loginCell: input});
    } else if (e.target === this._signUpName) {
      this.setState({signUpName: input});
    } else if (e.target === this._signUpPass) {
      this.setState({signUpPass: input});
    } else if (e.target === this._signUpPassConfirm) {
      this.setState({signUpPassConfirm: input});
    } else if (e.target === this._signUpCell) {
      this.setState({signUpCell: input})
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
            <p>LoginCell: </p><input type="text" value={this.state.loginCell} ref={it => this._loginCell = it}
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
            <p>SignUp cell: </p><input type="text" value={this.state.signUpCell} ref={it => this._signUpCell = it}
                                       onChange={this.handleInput} placeholder="13522098888"/><br/>
            <p>SignUp Name: </p><input type="text" value={this.state.signUpName} ref={it => this._signUpName = it}
                                       onChange={this.handleInput} placeholder="wangbo"/><br/>
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