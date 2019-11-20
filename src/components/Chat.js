import React, { Component } from 'react';
import ChatInput from './ChatInput'
import ChatMessage from './ChatMessage'
import io from 'socket.io-client'
// import './Chat.css'
class Chat extends Component {
    state = {
        name: '',
        messages: [],
        socket: io.connect(`/`),
    }

    setName = (name) => {
        this.setState({ name })
    }

    submitMessage = message => {
        const msg = { name: this.state.name, message: message }
        console.log('submitMessage > ', msg)
        // let nsp = this.state.nsp === 1 ? 2 : 1;
        // this.setState({
        //     nsp
        // })
        // this.setNameSpace();
        // console.log(msg)
        this.state.socket.emit('chat message', this.num, this.state.name, msg);
    }

    // setNameSpace = () => {
    //     console.log(this.state.nsp);
    //     this.setState({
    //         socket: io.connect('/namespace' + this.state.nsp)
    //     })
    // }
    componentDidMount = () => {
        // setInterval(this.send(), 1000)
        // this.send()


        this.state.socket.on('chat message', (num, name, msg) => {
            console.log('chat message', num, name, msg);
            this.addMessage(msg);
        })

        this.state.socket.on('leaveRoom', (num, msg) => {
            console.log('leaveRoom', num, msg);
            this.addMessage(msg);
        })

        this.state.socket.on('joinRoom', (num, msg) => {
            console.log('joinRoom', num, msg);
            this.addMessage(msg);
        })
    }

    addMessage = message => {
        this.setState(({ messages }) => ({
            messages: [...messages, message]
        }))
    }
    room = ['room1', 'room2'];
    ///
    num = 0;
    handleRoom = (e) => {
        this.state.socket.emit('leaveRoom', this.num, this.state.name);
        console.log('leaveRoom > ', this.num)
        this.num++;
        this.num = this.num % 2;
        console.log('joinRoom > ', this.num)
        this.state.socket.emit('joinRoom', this.num, this.state.name);

    }
    render() {
        const { name, messages } = this.state;
        const { setName, submitMessage, handleRoom } = this;

        return (
            <div>
                <div>

                    <select onChange={handleRoom}>
                        <option value="1">Room1</option>
                        <option value="2">Room2</option>
                    </select>
                    <label htmlFor="name">
                        Name:&nbsp;
                    <input
                            type="text"
                            id={'name'}
                            placeholder={'Enter your name...'}
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
                    </label>
                    <ChatInput
                        onSubmitMessage={messageString => submitMessage(messageString)}
                    />
                    {messages.map((message, index) =>
                        <ChatMessage
                            key={index}
                            name={message.name}
                            message={message.message}
                        />,
                    )}

                </div>
            </div >
        );
    }
}

export default Chat;