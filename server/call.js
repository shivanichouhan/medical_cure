let localVideo = document.getElementById("local-video")
let remoteVideo = document.getElementById("remote-video")

localVideo.style.opacity = 0
remoteVideo.style.opacity = 0

localVideo.onplaying = () => { localVideo.style.opacity = 1 }
remoteVideo.onplaying = () => { remoteVideo.style.opacity = 1 }




let peer
function init(userId) {
    // peer = new Peer(userId, {
    //     host: '/',
    //     path: '/myapp'
    // })
    // console.log(userId)
    // peer = new Peer(userId,{
    //     host: '/',
    //     port: 5000,
    //     path: '/peerjs/myapp'
    // });

    peer = new Peer(userId,{
        host: "localhost",
        port: 2222,
        path: '/peerjs',
        debug: 3,
        config: {
            'iceServers': [
                { url: 'stun:stun1.l.google.com:2222' },
                {
                    url: 'turn:numb.viagenie.ca',
                    credential: 'password',
                    username: 'username'
                }
            ]
        }
    });
    
    // peer = new Peer(userId, peerObj)
    console.log(userId)

    listen()
}

let localStream
function listen() {
    peer.on('call', (call) => {
        console.log("calllllllllll", call)
        navigator.getUserMedia({
            audio: true,
            video: true
        }, (stream) => {
            localVideo.srcObject = stream
            localStream = stream

            call.answer(stream)
            call.on('stream', (remoteStream) => {
                remoteVideo.srcObject = remoteStream

                remoteVideo.className = "primary-video"
                localVideo.className = "secondary-video"

            })

        })

    })
}

function startCall(otherUserId) {
    navigator.getUserMedia({
        audio: true,
        video: true
    }, (stream) => {
        console.log("start callllllll", stream, "CALLLLLLLLLLLLLLLLLLLLLL")
        localVideo.srcObject = stream
        localStream = stream

        const call = peer.call(otherUserId, stream)
        call.on('stream', (remoteStream) => {
            remoteVideo.srcObject = remoteStream

            remoteVideo.className = "primary-video"
            localVideo.className = "secondary-video"
        })

    })
}

function toggleVideo(b) {
    if (b == "true") {
        localStream.getVideoTracks()[0].enabled = true
    } else {
        localStream.getVideoTracks()[0].enabled = false
    }
}

function toggleAudio(b) {
    if (b == "true") {
        localStream.getAudioTracks()[0].enabled = true
    } else {
        localStream.getAudioTracks()[0].enabled = false
    }
}

//run server --   peerjs --port 9000 --key peerjs --path /myapp