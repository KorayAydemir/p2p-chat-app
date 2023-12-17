export function joinChat(p2pService, { code }){
    const onConnectionAcceptedCb = p2pService.connectToPeer(code);
    return onConnectionAcceptedCb;
}

export function leaveChat(p2pService){
    p2pService.closeConnection();
}

export function sendMessage(p2pService, msg){
    p2pService.sendMessage(msg);
}

export function setUpPeer(p2pService){
    const onPeerReady = p2pService.createPeer();

    const onIncomingConnection = p2pService.onIncomingConnection();

    return { onPeerReady, onIncomingConnection };
}

