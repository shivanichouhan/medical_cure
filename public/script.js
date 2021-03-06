// const socket = io('/')
// // undefined - server takes care of id
// // connecting to peer server - takes all webrtc info from the user and converts it to simple id
// const myPeer = new Peer(undefined, {
//     host: '/',
//     port: '3001'
// })


// myPeer.on('open', id => {
//     // room id, user id (pass ids whenever we join)
//     socket.emit('join-room', ROOM_ID, id)

// })

// socket.on('user-connected', userId => {
//     console.log('User id: ' + userId)
// })

// Oncology
// Cardiology
// Neurology
// Psychiatry
// Endocrinology
// Gastroenterology
// Nephrology
// Pulmonology
// Urology


// Dermatology, Venerology and Leprosy
// Paediatrics
// Gynaecology
//  General Medicine
// Family Medicine
// Ear, Nose and Throat
// Orthopaedics


const socket = io("/");
const videoGrid = document.getElementById("video-grid");
const myVideo = document.createElement("video");
const showChat = document.querySelector("#showChat");
const backBtn = document.querySelector(".header__back");
myVideo.muted = true;

backBtn.addEventListener("click", () => {
    document.querySelector(".main__left").style.display = "flex";
    document.querySelector(".main__left").style.flex = "1";
    document.querySelector(".main__right").style.display = "none";
    document.querySelector(".header__back").style.display = "none";
});

showChat.addEventListener("click", () => {
    document.querySelector(".main__right").style.display = "flex";
    document.querySelector(".main__right").style.flex = "1";
    document.querySelector(".main__left").style.display = "none";
    document.querySelector(".header__back").style.display = "block";
});

const user = prompt("Enter your name");


// config: {
//     'iceServers': [
//         { url: 'stun:stun1.l.google.com:19302' },
//         {
//             url: 'turn:numb.viagenie.ca',
//             credential: 'muazkh',
//             username: 'webrtc@live.com'
//         }
//     ]
// }
// var peer = new Peer({host:'backend.xpresscure.com', debug: 3, path: "/peerjs", secure:true, port:443})


// var peer1 =  {
//     path: "/peerjs",
//     host: "127.1.1",
//     debug: 3,
//     port:2222,
//     config: { 'iceServers': [{ 'urls': 'stun:stun.l.google.com:19302' }] }

// }
// var peer = new Peer(undefined,peer1);


const iceConfiguration = {
    iceServers: [
        {
            urls: 'turn:turn.xpresscure.com:36217',
            username: 'username',
            credentials: 'password'
        }
    ]
}

const peerConnection = new RTCPeerConnection(iceConfiguration);

console.log("connection stablise",peerConnection,"kkkkkkkk")

let myVideoStream;
navigator.mediaDevices
    .getUserMedia({
        audio: true,
        video: true,
    })
    .then((stream) => {
        console.log(stream,"stremingggggggggggggggggggg")
        myVideoStream = stream;
        addVideoStream(myVideo, stream);

        peer.on("call", (call) => {
            call.answer(stream);
            const video = document.createElement("video");
            call.on("stream", (userVideoStream) => {
                addVideoStream(video, userVideoStream);
            });
        });

        socket.on("user-connected", (userId) => {
            connectToNewUser(userId, stream);
        });
    });

const connectToNewUser = (userId, stream) => {
    const call = peer.call(userId, stream);
    const video = document.createElement("video");
    call.on("stream", (userVideoStream) => {
        addVideoStream(video, userVideoStream);
    });
};

peer.on("open", (id) => {
    socket.emit("join-room", ROOM_ID, id, user);
});

const addVideoStream = (video, stream) => {
    video.srcObject = stream;
    video.addEventListener("loadedmetadata", () => {
        video.play();
        videoGrid.append(video);
    });
};

let text = document.querySelector("#chat_message");
let send = document.getElementById("send");
let messages = document.querySelector(".messages");

send.addEventListener("click", (e) => {
    if (text.value.length !== 0) {
        socket.emit("message", text.value);
        text.value = "";
    }
});

text.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && text.value.length !== 0) {
        socket.emit("message", text.value);
        text.value = "";
    }
});

const inviteButton = document.querySelector("#inviteButton");
const muteButton = document.querySelector("#muteButton");
const stopVideo = document.querySelector("#stopVideo");
muteButton.addEventListener("click", () => {
    const enabled = myVideoStream.getAudioTracks()[0].enabled;
    if (enabled) {
        myVideoStream.getAudioTracks()[0].enabled = false;
        html = `<i class="fas fa-microphone-slash"></i>`;
        muteButton.classList.toggle("background__red");
        muteButton.innerHTML = html;
    } else {
        myVideoStream.getAudioTracks()[0].enabled = true;
        html = `<i class="fas fa-microphone"></i>`;
        muteButton.classList.toggle("background__red");
        muteButton.innerHTML = html;
    }
});

stopVideo.addEventListener("click", () => {
    const enabled = myVideoStream.getVideoTracks()[0].enabled;
    if (enabled) {
        myVideoStream.getVideoTracks()[0].enabled = false;
        html = `<i class="fas fa-video-slash"></i>`;
        stopVideo.classList.toggle("background__red");
        stopVideo.innerHTML = html;
    } else {
        myVideoStream.getVideoTracks()[0].enabled = true;
        html = `<i class="fas fa-video"></i>`;
        stopVideo.classList.toggle("background__red");
        stopVideo.innerHTML = html;
    }
});

inviteButton.addEventListener("click", (e) => {
    prompt(
        "Copy > this link and send it to people you want to meet with",
        window.location.href
    );
});

socket.on("createMessage", (message, userName) => {
    messages.innerHTML =
        messages.innerHTML +
        `<div class="message">
        <b><i class="far fa-user-circle"></i> <span> ${userName === user ? "me" : userName
        }</span> </b>
        <span>${message}</span>
    </div>`;
});
