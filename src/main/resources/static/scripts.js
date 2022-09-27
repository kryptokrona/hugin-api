var stompClient = null;
var notificationCount = 0;

$(document).ready(function() {
    console.log("Index page is ready");
    connect();
});

function connect() {
    var socket = new SockJS('/ws');
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function (frame) {
        console.log('Connected: ' + frame);
        stompClient.subscribe('/topic/posts', function (message) {
            console.log("Board Post: ")
            console.log(message)
        });

        stompClient.subscribe('/topic/posts-encrypted', function (message) {
            console.log("Encrypted Post: ")
            console.log(message)
        });

        stompClient.subscribe('/topic/posts-encrypted-group', function (message) {
            console.log("Encrypted Group Post: ")
            console.log(message)
        });
    });
}