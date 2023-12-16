const callBtn = document.querySelector(".call-btn");
const audioContainer = document.querySelector(".call-container");

export const showReadyToCallContent = (peerId) => {
    window.caststatus.textContent = `Your device ID is: ${peerId}`;
    callBtn.hidden = false;
    audioContainer.hidden = true;
};

export const showConnectedContent = () => {
    window.caststatus.textContent = "You're connected";
    callBtn.hidden = true;
    audioContainer.hidden = false;
}

export const setRemoteStream = (stream) => {
    window.remoteAudio.srcObject = stream;
    window.remoteAudio.autoplay = true;
    window.peerStream = stream;
}
