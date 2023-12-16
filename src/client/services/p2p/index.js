import { Config } from "../../../config.js";
//
//class PeerToPeer {
//    createPeer(callback) {
//        this.peer = new Peer(
//            `${Math.floor(Math.random() * 2 ** 18)
//                .toString(36)
//                .padStart(4, "0")}`,
//            {
//                host: location.hostname,
//                debug: 1,
//                path: Config.APP_PATH,
//            },
//        );
//        window.peer = this.peer;
//
//        this.peer.on("open", (peerId) => callback(peerId));
//    }
//
//    connectPeers(code) {
//        this.code = code;
//        this.conn = this.peer.connect(code);
//    }
//
//    establishMediaConnection() {
//        this.call = this.peer.call(this.code, window.localStream);
//    }
//
//    onStream(callback) {
//        this.call.on("stream", (stream) => {
//            console.log("peer", this.peer);
//            callback(stream);
//        });
//    }
//
//    onConnection() {
//        this.peer.on("connection", function (connection) {
//            this.conn = connection;
//            const peer_id = connection.peer;
//            console.log("connected to: " + peer_id);
//        });
//    }
//
//    answerCall({
//        onAccepted,
//        onStreamReceived,
//        onConnectionClosed,
//        onDenied,
//    }) {
//        this.peer.on("call", (call) => {
//            const acceptedCall = confirm("Do you want to answer?");
//
//            if (acceptedCall) {
//                call.answer(window.localStream);
//                onAccepted();
//
//                call.on("stream", (stream) => {
//                    console.log("Stream Received");
//                    onStreamReceived(stream);
//                });
//
//                call.on("close", () => onConnectionClosed());
//            } else {
//                onDenied()
//            }
//        });
//    }
//
//    closeConnection(){
//        this.conn.close();
//    }
//}
//
//export const p2p = new PeerToPeer();

class PeerToPeer {
    createPeer(callback) {
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

        this.peer.on("open", (peerId) => callback(peerId));
    }

    onConnectionEvent() {
        this.peer.on("connection", (c) => {
            this.conn = c;
            console.log("New connection : ");
            console.log(this.conn.peer)
            this.conn.on("open", () => {
                // Receive messages - receiver side
                this.conn.on("data", (data) => {
                    console.log("Received", data);
                });
            });
        });
    }

    connectPeers(code) {
        this.code = code;
        this.conn = this.peer.connect(code);

        this.conn.on("open", () => {
            console.log("connected");
            // Receive messages - sender side
            this.conn.on("data", (data) => {
                console.log("Received", data);
            });
        });
    }

    sendMessage() {
        console.log("sending message");
        // send message at sender or receiver side
        if (this.conn && this.conn.open) {
            this.conn.send("hello world");
        }
    }
}

export const p2p = new PeerToPeer();
