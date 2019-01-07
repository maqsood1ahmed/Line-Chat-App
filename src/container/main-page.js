import React from 'react';

import {connect} from "react-redux";
import * as actionCreators from "../actions/index.js";

import axios from 'axios';
import socketIOClient from 'socket.io-client';

import './main-page.css';
import User from '../components/users-box/user.js';
import ChatApp from './chat-app/chat-app.js';

class MainPage extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            users: [],
            messages: '',
            socket: socketIOClient("https://mysterious-sands-35555.herokuapp.com/"),
            currentUser: ''
        }

        this.state.socket.on('server-user', user => {
            console.log('user added');
            let users = this.state.users;
            users.push(user);
            this.setState({users: users});
            });

      }

    changeFreindMessages = (frientId) => {
         this.props.fetchMessages(frientId);
    }

    componentDidMount(){
        let url = "https://mysterious-sands-35555.herokuapp.com/users";
        axios.get(url)
            .then((res)=>{
                let users = res.data;
                this.setState({users: res.data});
            })
            .catch(err => console.log(err));
    }



    render(){
        let users = this.state.users;
        console.log(users);
        let user = <User />;
        if(users && users!==''){
            if(users){
                user = users.map( user => (
                    <User
                        key={user.userId}
                        userName={user.idName} 
                        friendId={user.userId}
                        pictureUrl = {user.pictureUrl}
                        onclick={this.changeFreindMessages} 
                        />
                ) )
            }
        }

        let friendId = this.state.users[0];
        if(friendId){
            console.log(friendId.userId);
            this.props.fetchMessages(friendId.userId);
        }
        return(
            <div id="line-chat-page">
                <div id="users-list">
                    
                    <div>
                        <div id="users-header">
                            <h2 style={{border:'1px solid black'}}> Friends List </h2>
                        </div>
                        <div id="list">
                            {user}
                        </div>
                    </div>
                    <div id="qrcode">
                        <div style={{"margin-left": "10px"}}> <img src="https://qr-official.line.me/M/VsOqSRhAuH.png" /> </div>    
                        <div  style={{"margin-left": "10px"}}> <small> Scan this QR code for Friendship </small></div>
                    </div>
                </div>
                <div id="chat-app">
                    <ChatApp socket={this.state.socket} />
                </div>
            </div>
        )
    }
}


export default connect( null , actionCreators )(MainPage);