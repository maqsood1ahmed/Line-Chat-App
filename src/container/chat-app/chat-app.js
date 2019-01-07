import React from "react";
import {connect} from "react-redux";

import Message from '../../components/chat-box/messages-box/message/message.js';
import MessageSendBox from '../../components/chat-box/messages-box/message-send-box/message-send-box.js';

import './chat-app.css'

// require('./chat-app.css');

class ChatApp extends React.Component {

    constructor(props) {
        super(props);
        
        this.state = { 
            messages: [],
        };

      this.sendHandler = this.sendHandler.bind(this);

    this.props.socket.on('server-message', message => {
        console.log('message received');
        this.addMessage(message);
      });
    }

  sendHandler(message) {

    let length = this.state.messages.length;
    let lastMessage = this.state.messages[length-1];
    let messageId = lastMessage.messageId + 1;
    console.log(messageId);
      const messageObject = {
          Message: message,
          currentFriend: this.state.messages[0].friendId,
          direction: 'to',
          messageId: messageId,
          banned: lastMessage.banned,
          userId: this.state.messages[0].userId,
      };

      // // Emit the message to the server
      this.props.socket.emit('client-message', messageObject);

      // // messageObject.fromMe = true;
      this.addMessage(messageObject);
  }

    addMessage(message) {
        // Append the message to the component state
        const messages = this.state.messages;
        messages.push(message);
        this.setState({ messages });
        console.log('adding message!!!!!!!');
    }

    scrollToBottom() {
        const scrollHeight = this.messageList.scrollHeight;
        const height = this.messageList.clientHeight;
        const maxScrollTop = scrollHeight - height;
        this.messageList.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
      }

      componentDidUpdate() {
        this.scrollToBottom();
      }

    render() {

        if(this.props.messages){
            if(this.state.messages === '')
            {
                this.setState({messages: this.props.messages})
            }
            else if(this.props.messages !== this.state.messages)
            {
                this.setState({messages: this.props.messages})
            }
        }

        let messages = this.state.messages;
        let message = null;

        if(messages){
            message = messages.map( message => (
                <Message
                    key={parseInt(message.messageId)}
                    message={message.Message} 
                    direction={message.direction}
                    friendId= {message.friendId}/>
            ) )
        }


        return (
            <div id="chat-app">                
                <div id="messages-div" ref={(div) => {this.messageList = div;}}>
                    {message}
                </div>
                <div id="send-message-div">
                    <MessageSendBox  onSend={this.sendHandler} />
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        messages: state.messages
    };
};

export default connect( mapStateToProps, null )(ChatApp);