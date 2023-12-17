class PeerToPeer {
    createPeer() {
        this.peer = new Peer(
            `${Math.floor(Math.random() * 2 ** 18)
                .toString(36)
                .padStart(4, "0")}`,
            //{
            //    host: location.hostname,
            //    debug: 1,
            //    path: Config.APP_PATH,
            //},
        );

        return (onPeerReady) =>
            this.peer.on("open", (peerId) => onPeerReady(peerId));
    }

    connectToPeer(code) {
        this.code = code;
        this.conn = this.peer.connect(code);

        return (onConnectedCb) =>
            this.conn.on("open", () => {
                onConnectedCb();

                this.listenIncomingMessages();
            });
    }

    onIncomingConnection() {
        return ({ answerConnection, onConnected }) =>
            this.peer.on("connection", (c) => {
                this.conn = c;
                console.log("New incoming connection : ", this.conn.peer);

                const { shouldConnect } = answerConnection();

                if (shouldConnect) {
                    this.openConnection();
                    onConnected();
                } else {
                    this.closeConnection();
                }
            });
    }

    openConnection() {
        this.conn.on("open", () => {
            this.listenIncomingMessages();
        });
    }

    closeConnection() {
        this.conn.close();
    }

    listenIncomingMessages() {
        this.conn.on("data", (data) => {
            console.log("Received", data);
            document.querySelector(
                ".chat-messages",
            ).innerHTML += `<p>${data}</p>`;
        });
    }

    sendMessage(msg) {
        console.log("sending the message: ", msg);
        // send message at sender or receiver side
        if (this.conn && this.conn.open) {
            this.conn.send(msg);
            document.querySelector(
                ".chat-messages",
            ).innerHTML += `<p>${msg}</p>`;
        }
    }
}

export const p2p = new PeerToPeer();
