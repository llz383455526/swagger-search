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

        const showDeprecated={
            textDecoration:"line-through"
        }

        let pathBlock=null;
        if(this.state.apiInfo.deprecated){
            
            pathBlock = <span><span className="path deprecated">{this.state.apiInfo.path}</span>
             <span className="deprecated-icon">已废弃</span></span>
              
         }else{
            pathBlock = <span className="path">{this.state.apiInfo.path}</span>
         }


        return (
        <div className="item-wrapper" onClick={this.redictToOrigin}>
            <div className="header">
                <span className="summary">{this.state.apiInfo.summary}</span>
                <span className="author">{this.state.apiInfo.author}</span>
                <span className="project-title">{this.state.apiInfo.description}</span>
            </div>
            <div className="footer">
                <span className="method" style={this.state.apiInfo.method.search(/GET/ig)!=-1?backgroundColorGet:backgroundColorPost}>
                {this.state.apiInfo.method.toUpperCase()}
                </span>
                {pathBlock}
                
                
                
                
            </div>
        </div>
        )
    }
    
}

export default ApiItem;