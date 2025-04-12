import * as nats_core from "@nats-io/nats-core";
import {ConnectionOptions, NatsConnection,DisconnectStatus} from "@nats-io/nats-core";
import {useSso} from "../../store/SsoStore.tsx";
import pickCoreEngine from "../core_engine/PickCoreEngine.ts";
import { v4 as uuidv4 } from 'uuid';
import { useNats } from "../../store/NatsStore.tsx";

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

const servers = ["ws://10.10.0.55:4223"];
let engineId: string;
let connection: NatsConnection | null;

async function initNats() {
  if (!useSso.getState().authenticated) {
    console.error("cannot connect to messaging server without being authed.")
    return;
  }

  try {
    const response = await pickCoreEngine();
    engineId = response.data.id
  } catch (e) {
    console.error("failed to get an engine id to publish to, wont connect to messaging server", e);
    return;
  }

  let nats_options: ConnectionOptions = {
    servers: servers,
    tls: null,
    token: useSso.getState().token,
    maxPingOut:2,
    pingInterval:5000,
    name:uuidv4()
  }
  connection = await nats_core.wsconnect(nats_options).then(c => {
    c.closed().then(onClose)
    useNats.getState().setConnectionName(nats_options.name!);
    useNats.getState().setInitializing(false);
    useNats.getState().setConnected(true);
    return c;
  }).catch(e => {
    console.error("failed to connect to NATS", e)
    return null;
  })
  await subscribeToSubjects();
}

async function subscribeToSubjects() {
  if (connection != null && !connection.isClosed()) {
    connection.subscribe(`worker.${useSso.getState().userId}`, {callback: onMessage})
  }
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

function sendWorkerMessage(msg: Message) {
  if (connection != null && !connection.isClosed()) {
    connection.publish(`${engineId}.worker.${useSso.getState().userId}`, JSON.stringify(msg))
  }
}

function onClose(){
  (async () => {
    for await (const s of connection?.status()!) {
      switch (s.type) {
        case "disconnect":
          console.warn(`messaging client disconnected`);
          break;
        case "ldm":
          console.warn("messaging client has been requested to reconnect");
          break;
        case "update":
          console.warn(`messaging client received a cluster update`);
          break;
        case "reconnect":
          console.warn(`messaging client reconnect`);
          break;
          case "forceReconnect":
          console.warn(`messaging client force reconnect`);
          break;
        case "ping":
          console.log("messaging client got a ping");
          break;
        case "reconnecting":
          console.warn("messaging client is attempting to reconnect");
          break;
        case "staleConnection":
          console.warn("messaging client has a stale connection");
          break;
        default:
          console.log(`messaging status got an unknown status`);
      }
    }
})().then();
}

export {initNats, sendWorkerMessage};