/**
 * Created by wangbo on 2017/4/13.
 */

import React, {Component} from 'react'

import 'es6-promise'
import 'isomorphic-fetch'


class FetchTest extends Component {
  constructor(props) {
    super(props);

    this.state = {
      url: "int.dpool.sina.com.cn/iplookup/iplookup.php?format=json&ip=218.4.255.12",
      fetchResult: "waiting",
      fetchData: ""
    };

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
    this.setState({fetchResult: "waiting"});

    var init = {
        method: 'GET',
        mode: 'cors',
        cache: 'default',
        headers: {
          // 'Access-Control-Allow-Origin': "*",
          // 'Accept': 'application/x-www-form-urlencoded',
          // 'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT, DELETE',
          // 'Authorization':'Bearer e3a4ca4b-bdaa-4034-a842-3641055819a3'
        }
      }
    ;


    fetch(this.state.url, init)
      .then((response) => {
        console.log("fetch result :" + response.status + "_" + response.ok)
        this.setState({fetchResult: "success " + response.status + "_" + response.ok});
        return response.text()
      })
      .then(data => {
        this.setState({fetchData: data})
      })
      .catch((e) => {
        console.log(" fetch error ")
        this.setState({fetchResult: "error" + e})
      })
  }

  render() {
    return (
      <div>
        <input type="text" onChange={this.handleInput} value={this.state.url}/>
        <button onClick={this.handleClick}>Fetch</button>
        <p>Fetch result : {this.state.fetchResult}</p>
        <p>Fetch Data: {this.state.fetchData}</p>
      </div>
    )
  }
}

export default FetchTest