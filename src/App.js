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
        <Search
          placeholder="API名称/开发者姓名(pingyin)"
          className="search"
          onSearch={this.searchApi}
          size="large"
          type="primary"/>
        </div>
        
        <History onHistorySelect={this.searchApi}></History>
        <ApiList className="list" dataList={this.state.searchResult}></ApiList>

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
