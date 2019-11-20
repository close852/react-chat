import React from 'react'

function ChatMessage({ name, message }) {
    return (
        <div>
            <strong>{name}</strong> <em>{message}</em>
        </div>
    )
}

export default ChatMessage
