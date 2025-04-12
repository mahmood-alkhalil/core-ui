import axios from "axios";
import {AxiosInstance} from "axios";
import {useSso} from "../store/SsoStore.tsx";

let httpClient: AxiosInstance;

function initHttpClient() {
  httpClient = axios.create({
    headers: {
      Authorization: `Bearer ${useSso.getState().token}`,
    },
  })
}

export {httpClient, initHttpClient};