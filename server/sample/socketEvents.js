exports = module.exports = function (io) {
    io.on('connection', socket => {
        console.log('유저 접속!', socket.id)

        socket.on('chat message', data => {
            console.log(`메시지1 : `, data)
            io.emit('chat message', {
                name: data.name,
                message: data.message
            })
        })
        socket.on('disconnect', () => {
            console.log('disconnected')
        })
    })

    const namespace1 = io.of('/namespace1');
    namespace1.on('connection', socket => {
        console.log('namespace1 connected', socket.id)
        namespace1.emit('news', {
            name: 'asd',
            message: '33'
        })

    })
}
