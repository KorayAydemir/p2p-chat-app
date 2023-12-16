export function handleCall(p2pService, viewService, { code }){
    p2pService.connectPeers(code);
    p2pService.establishMediaConnection();

    p2pService.onStream((stream) => {
        viewService.showConnectedContent();
        viewService.setRemoteStream(stream);
    });
}

export function handleHangup(p2pService, viewService){
    p2pService.closeConnection();
    viewService.showReadyToCallContent();
}
