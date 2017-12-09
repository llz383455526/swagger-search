import React,{Component} from "react"
import ReactDom from 'react-dom'
import './ApiItem.css'



class ApiItem extends Component{

    constructor(props){
        super(props);
        this.state = {
            apiInfo:props.apiInfo
        }
    }
    
    redictToOrigin=()=>{
        window.open(this.props.apiInfo.jumpUrl)
    }

    render() {
        const backgroundColorPost={
            backgroundColor:"#10a54a"
        }
        const backgroundColorGet={
            backgroundColor:"#0f6ab4"
        }

        return (
        <div className="item-wrapper" onClick={this.redictToOrigin}>
            <div className="header">
                <span className="summary">{this.state.apiInfo.summary}</span>
                <span className="author">{this.state.apiInfo.author}</span>
            </div>
            <div className="footer">
                <span className="method" style={this.state.apiInfo.method.search(/GET/ig)!=-1?backgroundColorGet:backgroundColorPost}>
                {this.state.apiInfo.method.toUpperCase()}
                </span>
                <span className="path">{this.state.apiInfo.path}</span>
                
            </div>
        </div>
        )
    }
    
}

export default ApiItem;