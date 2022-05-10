function buildMsgFrom(msg){
    return `<div class="msg-from p-3" style="width: max-content; border-radius: 20px;">${msg}</div>`;
}
function buildMsgTo(msg){
    return `<div class="msg-to p-3" style="width: max-content; border-radius: 20px;">${msg}</div>`;
}
function sendMsg(msg){
    $('#messenger #message-box > #msg-body').append(buildMsgTo(msg));
    socket.emit("hms-message", msg);
}
function receiveMsg(msg){
    $('#messenger #message-box > #msg-body').append(buildMsgFrom(msg));
    $('#messenger #message-box > #msg-body').animate({
        scrollTop: $('#messenger #message-box > #msg-body')[0].scrollHeight+'px'
    }, 500)
}