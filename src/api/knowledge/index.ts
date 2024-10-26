import { request } from "@/utils/service";
import type * as Knowledge from "./types/knowledge";

/** 获取可访问知识库名称接口 */
export function getKnowledgeListApi(userId: string) {
    return request<Knowledge.KnowledgeBasesResponse>({
        url: `/api/knowledge-bases/${userId}`,
        method: "get"
    });
}
