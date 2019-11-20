exports = module.exports = function (io) {
    let room = ['room1', 'room2'];
    let cnt = 0;

    io.on('connection', socket => {
        console.log('유저 접속!123', socket.id)

        socket.on('disconnect', () => {
            console.log('user disconnected');
        });

        socket.on('leaveRoom', (num, name) => {
            console.log('leaveRoom > ', num);

            socket.leave(room[num], () => {
                console.log(name + ' leave a ' + room[num]);
                io.to(room[num]).emit('leaveRoom', num, name);
            });
        });

        socket.on('joinRoom', (num, name) => {
            console.log('joinRoom > ', num);
            socket.join(room[num], () => {
                console.log(name + ' join a ' + room[num]);
                io.to(room[num]).emit('joinRoom', num, name);
            });
        });
        socket.on('chat message', (num, name, msg) => {
            cnt = num;
            console.log('chat message > ', cnt, name, msg, room[cnt]);
            io.to(room[cnt]).emit('chat message', num, name, msg);
        });


    })
}
