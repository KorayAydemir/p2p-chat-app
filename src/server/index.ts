import { ExpressPeerServer } from "peer";
import express from "express";
import path from "path";
import http from "http";
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { Config } from "../config";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express()
const server = http.createServer(app)

const peerServer = ExpressPeerServer(server, {
    proxied: true,
    path: Config.APP_PATH 
})

app.use(peerServer)

app.use(express.static(path.join(__dirname, '..', '..')))

app.get("/", (request, response) => {
    response.sendFile(`client/pages/index.html`, { root: path.join(__dirname, '..') })
})

const port = process.env.PORT || 3000
server.listen(port)
console.log(`Listening on: ${port}`)

