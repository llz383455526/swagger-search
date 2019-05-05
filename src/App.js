import React, {Component} from 'react';
import {Input} from 'antd';
import History from './history/History.js'
import config from "./config"
import apiCenter from './apiCenter'
import ApiList from './apiList/ApiList'
import './App.css';
require("babel-polyfill");

const Search = Input.Search;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResult: [],
      initialDone: false,
      searchDone:false
    };

    //获取api信息
    Promise
      .race(apiCenter.collectApiInfo(config.getProjectUrls()))
      .then(() => {
        this.setState({initialDone: true});
        console.dir(this)
      }).catch((e)=>{
        
      })
  }

  render() {

    let placeholder = "系统初始化中，请稍候...",
        disabled = true;
    if (this.state.initialDone) {
      placeholder = "API名称/路径关键字";
      disabled = false;
    }
    return (

      <div className="App">
        <div className="search-wrapper">
          <img src="images/api_logo.png" className="logo"/>
          <Search
            placeholder={placeholder}
            disabled={disabled}
            className="search"
            onInput={this.searchApi}
            onSearch={this.searchApi}
            size="large"
            type="primary"/>
        </div>

        <div className="main-content">
          <ApiList className="block list" dataList={this.state.searchResult} searchDone={this.state.searchDone}></ApiList>
          <div className="block nav">
            <h3
              style={{
              borderBottom: "1px solid #e1e1e1",
              padding: "5px"
            }}>快捷方式</h3>
            <ul>
              <li>
                todo
              </li>
              <li>
                todo
              </li>
            </ul>
          </div>
        </div>
        <History onHistorySelect={this.searchApi}></History>

      </div>
    );
  }

  searchApi = (key) => {
    if (typeof key !== "string") {
      key = key.target.value
    }
    let results = apiCenter.searchApi(key.toLowerCase());
    this.setState({
      searchResult: results,
      searchDone:true
    })
  }

}

export default App;
