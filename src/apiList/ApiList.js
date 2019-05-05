import React,{Component} from "react"
import ReactDom from 'react-dom'
import {Icon} from 'antd';
import './ApiList.css'
import ApiItem from './ApiItem'




class ApiList extends Component {
    constructor(props){
        super(props);
        console.log(props)
    }


   
    render(){

        let content=null;
        if(this.props.dataList.length > 0){
            content = this.props.dataList.map((apiInfo,index)=>{
                return (
                    <ApiItem apiInfo={apiInfo} key={apiInfo.path}></ApiItem> 
                )
            })
        }else if(this.props.searchDone){
            content = <div className="empty-tip"><Icon type="exclamation-circle-o"/>  未找到符合条件的API信息，该API可能位于word文档中</div>;

        }

        return ( 
            <div className="api-list">
                {content}
            </div>
        )
           
    
    }
}


export default ApiList;