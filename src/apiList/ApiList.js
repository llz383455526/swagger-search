import React,{Component} from "react"
import ReactDom from 'react-dom'
import './ApiList.css'


function ApiItem(props){
    const backgroundColorPost={
        backgroundColor:"#10a54a"
    }
    const backgroundColorGet={
        backgroundColor:"#0f6ab4"
    }

    return (
        <div className="item-wapper">
            <p className="author">开发者：{props.apiInfo.author}</p>
            <div className="footer">
                <span className="method" style={props.apiInfo.method.search(/GET/ig)!=-1?backgroundColorGet:backgroundColorPost}>{props.apiInfo.method.toUpperCase()}</span>
                <span className="path">{props.apiInfo.path}</span>
                <span className="summary">{props.apiInfo.summary}</span>
            </div>
        </div>
    )
}

class ApiList extends Component {
    constructor(props){
        super(props);
        console.log(props)
    }


   
    render(){
        
        return ( 
        <div className="api-list">
        {   
            this.props.dataList.map((apiInfo,index)=>{
                return (
                    <ApiItem apiInfo={apiInfo} key={index}></ApiItem> 
                )
            })
        }
        </div>
    )
           
    
    }
}


export default ApiList;