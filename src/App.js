import React, {Component} from 'react';
import {Input, Button} from 'antd';
import History from './history/History.js'
import apiCenter from './apiCenter'
import ApiList from './apiList/ApiList'
import './App.css';

const Search = Input.Search;

class App extends Component {
  constructor(props) {
    super(props);
    this.state={searchResult:[]};
  }
  render() {
    return (
      <div className="App">
        
        <div className="search-wrapper">
        <img src="images/api_logo.png" className="logo"/>
        <Search
          placeholder="API名称/开发者姓名(pingyin)"
          className="search"
          onSearch={this.searchApi}
          size="large"
          type="primary"/>
        </div>

        <div className="main-content">
          <ApiList className="block list" dataList={this.state.searchResult}></ApiList>
          <div className="block nav">
            <h3 style={{borderBottom:"1px solid #e1e1e1",padding:"5px"}}>快捷方式</h3>
            <ul>
              <li><a href="http://58.67.206.4:48080/" target="_blank">1、官方API目录</a></li>
              <li>todo</li>
              <li>todo</li>
              <li>todo</li>
            </ul>
          </div>
        </div>        
        <History onHistorySelect={this.searchApi}></History>
        
        
      
      
        

      </div>
    );
  }

  searchApi = (key) => {

    this.setState({
      searchResult: apiCenter.searchApi(key.toLowerCase())
    })
  }

  
}

export default App;
