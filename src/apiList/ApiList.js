import React,{Component} from "react"
import ReactDom from 'react-dom'
import './ApiList.css'
import ApiItem from './ApiItem'




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
                    <ApiItem apiInfo={apiInfo} key={apiInfo.path}></ApiItem> 
                )
            })
        }
        </div>
    )
           
    
    }
}


export default ApiList;