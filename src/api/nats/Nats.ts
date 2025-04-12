import * as nats_core from "@nats-io/nats-core";
import {ConnectionOptions, NatsConnection} from "@nats-io/nats-core";
import {useSso} from "../../store/SsoStore.tsx";
import pickCoreEngine from "../core_engine/PickCoreEngine.ts";

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

const servers = ["ws://127.0.0.1:4223"];
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
    token: useSso.getState().token
  }
  connection = await nats_core.wsconnect(nats_options).then(c => {
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

export {initNats, sendWorkerMessage};