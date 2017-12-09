import React, {Component} from 'react';
import {Tag} from 'antd'
import "./history.css"
class History extends Component {

    constructor(props) {
        super(props);
        this.colors = [
            "magenta",
            "red",
            "orange",
            "gold",
            "lime",
            "green",
            "cyan",
            "blue",
            "geekblue",
            "purple"
        ];
        localStorage.setItem("localHistory", JSON.stringify(["overInfo", "dict"]));
        this.state = {
            historyList: JSON.parse(localStorage.getItem("localHistory"))
        }
    
    }


    getRandomIntInclusive(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
    }

    tagClick=(e)=>{
        let text = e.target.innerText;
        this.props.onHistorySelect(text)
    }
    render() {
        return (
            <div className="history-wrapper">
            <span className="title">历史记录：</span>
            <ul >
            {
                this.state.historyList.map((item) => {
                    let colorIndex = this.getRandomIntInclusive(1, this.colors.length);
                    return <Tag key={item.toString()} color={this.colors[colorIndex] } className="history-tag" onClick={this.tagClick}>{item}</Tag>
                })
            }
            </ul>
            </div>
        )
    };
}

export default History;