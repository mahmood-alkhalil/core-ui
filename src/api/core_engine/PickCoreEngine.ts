import {httpClient} from "../../utils/HttpClient.ts";
import {AxiosResponse} from "axios";

type Engine = {
  id: string;
}
export default function pickCoreEngine(): Promise<AxiosResponse<Engine>> {
  return httpClient.get<Engine>("http://localhost:8080/core/v1/engine/id");
}