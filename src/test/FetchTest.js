/**
 * Created by wangbo on 2017/4/13.
 */

import React, {Component} from 'react'

import 'es6-promise'
import 'isomorphic-fetch'


class FetchTest extends Component {
  constructor(props) {
    super(props);

    this.state = {url: "www.baidu.com"};

    this.handleClick = this.handleClick.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }

  handleInput(e) {
    console.log("change url " + e.target.value);
    this.setState({url: e.target.value});
  }

  handleClick(e) {
    e.preventDefault();
    console.log("fetch url : " + this.state.url)
    fetch(this.state.url)
      .then((response) => {
        console.log("fetch result :" + response.status)
      }).catch((e) => {
      console.log(" fetch error ")
    })
  }

  render() {
    return (
      <div>
        <input type="text" onChange={this.handleInput} value={this.state.url}/>
        <button onClick={this.handleClick}>Fetch</button>
      </div>
    )
  }
}

export default FetchTest