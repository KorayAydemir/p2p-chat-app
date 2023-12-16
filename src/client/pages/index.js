import * as domain from "../domain/index.js";
import * as view from "../views/index.js";
import * as p2pService from "../services/p2p/index.js";
import * as mediaService from "../services/media/index.js";

const p2p = p2pService.p2p;

//p2p.createPeer((peerId) => {
//    view.showReadyToCallContent(peerId);
//});
//
//document.querySelector(".call-btn").addEventListener("click", () => {
//    const code = (() => window.prompt("please enter the sharing code"))();
//    domain.handleCall(p2p, view, { code });
//});
//
//document.querySelector(".hangup-btn").addEventListener("click", () => {
//    domain.handleHangup(p2p, view);
//});
//
//p2p.onConnection();
//
//p2p.answerCall({
//    onAccepted: () => {
//        view.showConnectedContent();
//    },
//    onStreamReceived: (stream) => {
//        view.setRemoteStream(stream);
//    },
//    onConnectionClosed: () => {
//        console.log("connection closed");
//        view.showReadyToCallContent();
//    },
//    onDenied: () => {
//        console.log("call denied");
//    },
//});
//
//mediaService.getLocalStream();
/////////////////////// second take

p2p.createPeer((peerId) => {
    view.showReadyToCallContent(peerId);
});

p2p.onConnectionEvent();

document.querySelector(".call-btn").addEventListener("click", () => {
    const code = (() => window.prompt("please enter the sharing code"))();
    p2p.connectPeers(code);
    view.showConnectedContent();
});

document.querySelector(".hangup-btn").addEventListener("click", () => {
    p2p.sendMessage();

})
