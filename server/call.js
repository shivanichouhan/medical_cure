let localVideo = document.getElementById("local-video")
let remoteVideo = document.getElementById("remote-video")

localVideo.style.opacity = 0
remoteVideo.style.opacity = 0

localVideo.onplaying = () => { localVideo.style.opacity = 1 }
remoteVideo.onplaying = () => { remoteVideo.style.opacity = 1 }

let peer
function init(userId) {
    peer = new Peer(userId, { host: "https://backend.xpresscure.com/videocallapp", key: "natuskey2", secure: true } )

    // console.log(userId)
    // peer = new Peer(userId, {
    //     host: 'https://backend.xpresscure.com/videocallapp',
    //     port: 9000,
    //     path: '/videocallapp'
    // })

    listen()
}

let localStream
function listen() {
    peer.on('call', (call) => {
        console.log("calllllllll",call)
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
        console.log(stream, "streammmmmmmmmmmmmmmmmmmmmm")
        localVideo.srcObject = stream
        localStream = stream

        const call = peer.call(otherUserId, stream)
        console.log(call)
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
