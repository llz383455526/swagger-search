最近供职的两家公司都是利用swagger创建api 文档，都存在文档分散，检索困难的问题。这个项目的开发目的就是为了解决这些问题。
ApiCenter是一款chrome插件，使用ReactJs编写，主要是为了解决目前内部API文档太多，查找麻烦的问题。使用APICenter，您可以：
1. 按开发者/API 名称/模块名称等关键字搜索API相关信息(done)
1. 支持跨系统搜索并自动定位到目标 API，支持添加自定义swagger源
1. 自动屏蔽 swagger 页面顶部的大片错误信息（我们公司内部会出现）
1. 自动展开swagger页面API列表，支持利用自带搜索在当前页面进行检索

**注意：**对后端代码无侵入，但对 swagger api 接口数据结构有依赖，目前支持 swagger v2 版本！
使用效果如下：
![Markdown](https://github.com/llz383455526/api-center/blob/master/swagger-search.gif?raw=true)

### 推荐使用方法：
> 前提：你得先装有nodejs以及npm
- git clone
- npm install
- npm run build
- 然后根据下图顺序加载build目录即可
![Markdown](https://github.com/llz383455526/api-center/blob/master/install%20instructions.png?raw=true)


### 您也可以：
1. 您可以直接下载apiCenter.zip文件。解压后，通过扩展程序加载文件。


## 版本历史
1. version 1.0
    - 添加按开发者姓名（拼音），api 名称搜索
    - 添加侧边栏：添加Java api文档快捷入口
1. version 2.0
    - 搜索优化：提供及时搜索，搜索更便捷；搜索关键词优化，搜索更准确
    - 初始化优化：操作更流畅，用户体验更好
1. version 3.0
    - bug修复： 修复搜索结果>1时才会展示列表的 bug
    - 不是必须的。当有operationId优化： 由于 operationId 不是必须的。当有operationId 时，api 路径会使用operationId，若无时路径是post_apiName 的形式
1. version 4.0
    - 去除 swagger 页面的报错信息
    - 支持自定义添加 swagger 地址源
    - 自动监听 swagger 页面，页面加载完成后展开 api 列表，便于在当前页面进行搜索。

# 注意事项
    
