import React,{Component} from "react"
import ReactDom from 'react-dom'



class ApiList extends Component {
    constructor(props){
        super(props);
        console.log(props)
    }

    render(){
        return ( 
        <ul>
            {   
              this.props.dataList.map((apiInfo,index)=>{
                return <li key={index}>{apiInfo.path}</li>
              })
            }
        </ul>
    )
           
    
    }
}


export default ApiList;