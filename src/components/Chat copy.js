import React, { useState, } from 'react'
import ChatInput from './ChatInput'
import ChatMessage from './ChatMessage'
import io from 'socket.io-client'

const token = 'asd';
const socket = io.connect(`/?token=${token}`)
function Chat() {
    let [name, setName] = useState('');
    let [messages, setMessages] = useState([])

    socket.on('chat message', msg => {
        console.log('msg123', msg);
        addMessage(msg);
    })

    const addMessage = message => {
        setMessages(messages => [...messages, message])
    }

    const submitMessage = message => {
        const msg = { name: name, message: message }
        // console.log(msg)
        socket.emit('chat message', msg);
    }

    return (
        <div>
            <div>
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

        </div>
    )
}

export default Chat
