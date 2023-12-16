import { Config } from "../../../config.js";

class PeerToPeer {
    createPeer(callback) {
        this.peer = new Peer(
            `${Math.floor(Math.random() * 2 ** 18)
                .toString(36)
                .padStart(4, "0")}`,
            {
                host: location.hostname,
                debug: 1,
                path: Config.APP_PATH,
            },
        );
        window.peer = this.peer;

        this.peer.on("open", (peerId) => callback(peerId));
    }

    connectPeers(code) {
        this.code = code;
        this.conn = this.peer.connect(code);
    }

    establishMediaConnection() {
        this.call = this.peer.call(this.code, window.localStream);
    }

    onStream(callback) {
        this.call.on("stream", (stream) => {
            console.log("peer", this.peer);
            callback(stream);
        });
    }

    onConnection() {
        this.peer.on("connection", function (connection) {
            this.conn = connection;
            const peer_id = connection.peer;
            console.log("connected to: " + peer_id);
        });
    }

    answerCall({
        onAccepted,
        onStreamReceived,
        onConnectionClosed,
        onDenied,
    }) {
        this.peer.on("call", (call) => {
            const acceptedCall = confirm("Do you want to answer?");

            if (acceptedCall) {
                call.answer(window.localStream);
                onAccepted();

                call.on("stream", (stream) => {
                    console.log("Stream Received");
                    onStreamReceived(stream);
                });

                call.on("close", () => onConnectionClosed());
            } else {
                onDenied()
            }
        });
    }

    closeConnection(){
        this.conn.close();
    }
}

export const p2p = new PeerToPeer();
