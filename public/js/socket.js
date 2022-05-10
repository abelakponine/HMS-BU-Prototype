var socket = io("https://socket.pekaboom.com/hms", {secure: true});

socket.on('connect', ()=>
{
    socket.on('hms-message', (msg)=>{
        window.receiveMsg(msg);
    })

});

