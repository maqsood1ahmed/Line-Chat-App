import React from "react";

require('./user.css');

class User extends React.Component {

    sendFriendId = () => {
        var friendId = this.props.friendId;
        this.props.onclick(friendId);            
    }
    render() {
        return (
            <div id="user-div" onClick={this.sendFriendId}>
                <div id="user-div-pic"> <img src={this.props.pictureUrl} /> </div>                
               <div id="user-div-username"> {this.props.userName} </div>
            </div>
        )
    }
}

export default User;
