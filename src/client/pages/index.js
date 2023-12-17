import * as domain from "../domain/index.js";
import * as view from "../views/index.js";
import * as p2pService from "../services/p2p/index.js";

const p2p = p2pService.p2p;

const { onPeerReady, onIncomingConnection } =
    domain.setUpPeer(p2p);

onPeerReady((peerId) => {
    view.showReadyToConnectContent(peerId);
});

onIncomingConnection({
    answerConnection: () => {
        const shouldConnect = window.confirm(
            "Do you want to accept the connection?",
        );

        return { shouldConnect };
    },
    onConnected: () => {
        view.showConnectedContent();
    },
});

document.querySelector(".join-btn").addEventListener("click", () => {
    const code = (() => window.prompt("please enter the sharing code"))();
    const onConnectionAccepted = domain.joinChat(p2p, { code });

    onConnectionAccepted(() => {
        view.showConnectedContent();
    });
});

document.querySelector(".leave-btn").addEventListener("click", () => {
    domain.leaveChat(p2p, view);
    view.showReadyToConnectContent();
});

document.querySelector(".send-msg-btn").addEventListener("click", () => {
    const msg = document.querySelector("#msg-input").value;
    domain.sendMessage(p2p, msg);
});
