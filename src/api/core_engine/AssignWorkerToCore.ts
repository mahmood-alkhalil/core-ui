import {httpClient} from "../../utils/HttpClient.ts";
import {AxiosResponse} from "axios";

type Engine = {
  engineId: string;
}
export default function assignWorkerToCore(): Promise<AxiosResponse<Engine>> {
  return httpClient.post<Engine>("http://localhost:8080/core/v1/worker/assign-to-core");
}