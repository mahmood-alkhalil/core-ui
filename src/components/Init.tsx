import {useSso} from "../store/SsoStore.tsx";
import {useEffect} from "react";
import {initNats} from "../api/nats/Nats.ts";
import {initHttpClient} from "../utils/HttpClient.ts";

export default function Init() {
  const {authenticated} = useSso(state => state);

  useEffect(() => {
    if (authenticated) {
      initHttpClient();
      initNats().then(() => {
      });
    }
  }, [authenticated])
  return <></>

}