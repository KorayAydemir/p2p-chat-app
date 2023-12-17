const joinBtn = document.querySelector(".join-btn");
const chatContainer = document.querySelector(".chat-container");
const sendMsgContainer = document.querySelector(".send-msg-container");

export const showReadyToConnectContent = (peerId) => {
    window.caststatus.textContent = `Your device ID is: ${peerId}`;
    joinBtn.hidden = false;
    chatContainer.hidden = true;
};

export const showConnectedContent = () => {
    window.caststatus.textContent = "You're connected";
    joinBtn.hidden = true;
    chatContainer.hidden = false;
    sendMsgContainer.hidden = false;
}

export const setRemoteStream = (stream) => {
    window.remoteAudio.srcObject = stream;
    window.remoteAudio.autoplay = true;
    window.peerStream = stream;
}
