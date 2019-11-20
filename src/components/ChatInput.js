import React, { useState } from 'react'
import PropTypes from 'prop-types'

function ChatInput({ onSubmitMessage }) {

    let [message, setMessage] = useState('');
    return (
        <form
            action="#"
            onSubmit={e => {
                onSubmitMessage(message)
                setMessage('')
                e.preventDefault()
            }}
        >
            <input
                id=""
                type="text"
                placeholder={'Enter message...'}
                value={message}
                onChange={e => setMessage(e.target.value)}
            />
            <input type="submit" value={'Send'} />
        </form>
    )

}
ChatInput.propTypes = {
    onSubmitMessage: PropTypes.func.isRequired,
}

export default ChatInput
