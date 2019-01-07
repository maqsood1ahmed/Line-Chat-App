import React from "react";

require('./message.css');

class User extends React.Component {

    render() {
        const fromMe = this.props.direction === "to" ? 'from-me' : '';
        let style;
        if(this.props.direction === "to"){
            style={
                'background-color' : 'lightgreen'
            }
        }
        else{
            style = {
                'background-color' : 'rgb(211, 211, 211)'
            }
        }
        return (
            <div id="message-body" className={`message ${fromMe}`}>              
                <div style={style}>{this.props.message}</div> 
            </div>
        )
    }
}

export default User;