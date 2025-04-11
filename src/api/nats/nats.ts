import * as nats_core from "@nats-io/nats-core";
import {ConnectionOptions} from "@nats-io/nats-core";

interface Interaction {
    id: string;
    channel: number;
    queue: string;
    priority: number;
}

interface Message {
    id: string;
    workerId: string;
    epoch: number;
    type: string;
    subtype: string;
    interaction: Interaction;
    message: string;

}

let nats_options: ConnectionOptions = {servers: ["ws://127.0.0.1:4223"], tls: null}
let connection = await nats_core.wsconnect(nats_options).then(c => {
    return c;
}).catch(e => {
    console.error("failed to connect to NATS", e)
    return null;
})
if (connection == null) {

} else {
    connection.subscribe("worker.*", {callback: onMessage})
}

function onMessage(err: Error | null, msg: any) {
    if (err) {
        console.error("NATS on message error", err)
        return;
    }
    if (msg) {

        const message: Message = msg.json();
        console.log("received a message ", message)
    }
}