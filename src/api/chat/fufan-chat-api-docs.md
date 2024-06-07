# 1. /api/chat

接口名称：**POST** `/chat` - 聊天接口

请求参数

| 参数名              | 类型               | 必填 | 描述                         | 示例值                                         |
| ------------------- | ------------------ | :--: | ---------------------------- | ---------------------------------------------- |
| `query`             | `str`              |  是  | 用户输入的问题               | "你好，请你详细的向我介绍一下什么是机器学习？" |
| `user_id`           | `str`              |  否  | 用户的ID                     | "user123"                                      |
| `conversation_id`   | `str`              |  否  | 对话框的ID                   | "conv456"                                      |
| `conversation_name` | `str`              |  否  | 对话框的名称                 | "学习对话"                                     |
| `history_len`       | `int`              |  否  | 从数据库中取历史消息的数量   | 5                                              |
| `history`           | `Union[int, List]` |  否  | 前端传来的当前会话的历史消息 | `[{ "role": "user", "content": "你好" }]`      |
| `stream`            | `bool`             |  否  | 是否采用流式输出             | `true`                                         |
| `model_name`        | `str`              |  否  | 使用的大模型的名称           | "chatglm3-6b"                                  |
| `temperature`       | `float`            |  否  | 大模型的采样温度             | 0.8                                            |
| `max_tokens`        | `int`              |  否  | 大模型生成的最大Token数      | 1024                                           |
| `prompt_name`       | `str`              |  否  | 使用的提示模板的名称         | "default"                                      |

响应格式

- **流式输出 (`stream=true`)**: 使用 server-sent events，连续输出生成的文本。
- **非流式输出 (`stream=false`)**: 返回整个响应文本。

响应示例 (非流式)

```json
{
  "text": "机器学习是一门关于算法和统计的科学，旨在创建那些能从数据中学习的模型。",
  "message_id": "12345"
}
```

功能描述

此API接口用于处理用户输入的查询并通过指定的大模型生成响应。接口支持流式和非流式输出，可以处理会话历史，并允许通过不同的模型和参数来调整生成的响应。

错误处理

- 如果提供的`model_armor_name`不在支持的模型列表中，将返回一个错误。
- 如果`max_tokens`小于或等于0，将自动处理为`None`以使用模型的默认设置。