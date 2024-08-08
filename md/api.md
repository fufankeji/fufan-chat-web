# 1. 注册登录

**注册接口：/api/users/register**

![image-20240802101254830](https://muyu001.oss-cn-beijing.aliyuncs.com/img/image-20240802101254830.png)

**登录接口：/api/users/login**

![image-20240802101353224](https://muyu001.oss-cn-beijing.aliyuncs.com/img/image-20240802101353224.png)

# 2. 大模型普通对话

**对话接口：/api/chat**

![image-20240802101548254](https://muyu001.oss-cn-beijing.aliyuncs.com/img/image-20240802101548254.png)

**新建对话接口：/api/conversations**

![image-20240802101939383](https://muyu001.oss-cn-beijing.aliyuncs.com/img/image-20240802101939383.png)

注意：这里面的 chat_tpye 是区分的：

- 普通对话页面：general_chat
- 知识库对话页面：chat_with_retrieval
- AI搜索页面：chat_with_search
- 推荐系统页面：chat_with_recommend

**获取指定用户的会话列表：/api/users/{user_id}/conversations**

![image-20240802103323831](https://muyu001.oss-cn-beijing.aliyuncs.com/img/image-20240802103323831.png)

**删除指定会话接口：/api/conversations/{conversation_id}**

![image-20240802104014887](https://muyu001.oss-cn-beijing.aliyuncs.com/img/image-20240802104014887.png)

**更新指定会话名称：/api/conversations/{conversation_id}/update_name**

![image-20240802104154030](https://muyu001.oss-cn-beijing.aliyuncs.com/img/image-20240802104154030.png)

**获取指定会话的消息列表：** 有问题，我需要改代码。

# 3. 知识库问答对话

**与知识库对话接口：/api/chat/knowledge_base_chat**

其中： docs 是检索到的知识库，前端只需要展示，不需要点击链接，是非流式返回。 answer是最终要流式输出的回复。

![image-20240805102325067](https://muyu001.oss-cn-beijing.aliyuncs.com/img/image-20240805102325067.png)

**获取每个用户可以访问的知识库名称：/api/knowledge-bases/{user_id}** （这个要做一个选择框）

![image-20240802104736120](https://muyu001.oss-cn-beijing.aliyuncs.com/img/image-20240802104736120.png)

# 4. AI搜索

**AI 搜索接口：/api/chat/search_engine_chat**

![image-20240805110952050](https://muyu001.oss-cn-beijing.aliyuncs.com/img/image-20240805110952050.png)

# 5. 推荐

**推荐 接口：/api/chat/recommend_chat**

![image-20240805111347057](https://muyu001.oss-cn-beijing.aliyuncs.com/img/image-20240805111347057.png)
