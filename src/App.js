import React, {Component} from 'react';
import {Input, Modal, message,Button, List} from 'antd';
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
      searchDone: false,
      visible: false,
      apiSourceVisible: false,
      apiSourceList: [],
      swaggerInput: '',
      swaggerInputRemark: ''
    };
  }

  componentDidMount(){
    //获取api信息
    this.initApiInfo();
  }
  addCustomApiSource = (e)=> {
    this.setState({visible: true})
  }
  shwoApiSource = ()=> {
    let apiSourceList = config.getProjectUrls();
    this.setState({
      apiSourceVisible: true,
      apiSourceList
    })
  }
  handleOk = e => {
    if(this.state.swaggerInput.trim().indexOf('http') !== 0) {
      message.error('必须是以 http(s)开头的URL地址')
      return
    }
    let param = {
      title: this.state.swaggerInputRemark || '自定义备注',
      url: this.state.swaggerInput
    }
    config.addProjectUrl(param, (error, data) => {
      if(error) {
        message.error(error.message)
        return
      }

      this.setState({
        visible: false,
      })
      message.success(data.msg)
      this.initApiInfo()
    })
  }

  handleCancel = e => {
    this.setState({
      visible: false,
    });
  }
  initApiInfo() {
    let apiSourceList = config.getProjectUrls()
    if(apiSourceList.length === 0) {
      this.setState({ initialDone: true });
      return
    }

    let projectUrlArray = apiSourceList.flatMap((item)=>{
      return item.url
    })
    Promise
      .race(apiCenter.collectApiInfo(projectUrlArray))
      .then(() => {
        this.setState({ initialDone: true });
      }).catch((e) => {
      });
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
            }}>功能列表</h3>
            <ul>
              <li className="nav-item">
                <Button onClick={this.shwoApiSource}>查看API源地址</Button>
              </li>
              <li className="nav-item">
                <Button onClick={this.addCustomApiSource}>添加API源地址</Button>
              </li>
              
            </ul>
          </div>
        </div>
        <History onHistorySelect={this.searchApi}></History>
        <Modal
          title="添加自定义 swagger 地址"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Input style={{marginBottom: "10px"}} placeholder="添加备注" value={this.state.swaggerInputRemark} onChange={(event)=>{this.setState({swaggerInputRemark: event.currentTarget.value})}}/>
          <Input placeholder="输入swagger请求地址" value={this.state.swaggerInput} onChange={(event)=>{ this.setState({swaggerInput: event.currentTarget.value})}}/>
        </Modal>
        <Modal
          title="Api源地址列表"
          visible={this.state.apiSourceVisible}
          onOk={()=>{this.setState({apiSourceVisible: false})}}
          onCancel={()=>{this.setState({apiSourceVisible: false})}}
        >
          <List
            itemLayout="horizontal"
            dataSource={this.state.apiSourceList}
            renderItem={item => (
              <List.Item>
                <div className="url-list-item">
                  <span className="url-list-title">备注：{item.title}</span>
                  <div><span>地址：</span><a className="url-list-url">{item.url}</a></div>                     
                </div>
              </List.Item>
            )}
          />
        </Modal>
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
