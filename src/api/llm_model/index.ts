import { requestV1 } from "@/utils/service"
import type * as LlmModel from "./types/llm_model"

/** 获取模型列表 */
export function getLlmModelsApi() {
  return requestV1<LlmModel.LlmModelsResponseData>({
    url: "/api/llm_model/list_running_models",
    method: "get"
  })
}
