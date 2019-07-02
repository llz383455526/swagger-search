最近供职的两家公司都是利用swagger创建api 文档，都存在文档分散，检索困难的问题。这个项目的开发目的就是为了解决这些问题。
swaggerSearch 项目主要目的是开发一款chrome扩展，解决目前swagger API文档太多，查找麻烦的问题。项目使用React.js编写，swaggerSearch扩展为您带来以下功能：
1. 按开发者/API 名称/模块名称等关键字搜索API相关信息
1. 支持跨系统搜索并自动定位到目标 API，支持添加自定义swagger源
    效果见动图：![Markdown](https://github.com/llz383455526/api-center/blob/master/ search.gif?raw=true)
1. 自动屏蔽 swagger 页面顶部的大片错误信息（我们公司内部会出现）
1. 自动展开swagger页面API列表，支持利用自带搜索在当前页面进行检索
    效果见动图：![Markdown](https://github.com/llz383455526/api-center/blob/master/ search2.gif?raw=true)

**注意：**该扩展对后端代码无侵入，但对 swagger 版本有依赖，目前在swagger v2 版本中测试通过！

# 安装
## 通过编译源码获取扩展文件（推荐）
**好处:** 可以根据自身需求修改源码来扩展功能
> 前提：你得先装有nodejs以及npm
- git clone
- npm install
- npm run build

## 下载项目中已经编译好的文件：
1. 您可以直接下载 swaggerSearch.zip文件。解压得到原始文件夹。

- 然后根据图示在 chrome 中加载该扩展：
![Markdown](https://github.com/llz383455526/api-center/blob/master/install%20instructions.png?raw=true)

## changeLog
1. version 0.1.0
    - 添加按开发者姓名（拼音)/API名称/模块名称搜索API
    - 添加侧边栏：添加Java API文档快捷入口
1. version 0.2.0
    - 搜索优化：提供及时搜索，搜索更便捷；搜索关键词优化，搜索更准确
    - 初始化优化：操作更流畅，用户体验更好
1. version 0.3.0
    - bug修复： 修复搜索结果>1时才会展示列表的 bug
    - 当有operationId优化： 由于 operationId 不是必须的。当有operationId 时，api 路径会使用operationId，若无时路径是post_apiName 的形式
1. version 0.4.0
    - 去除 swagger 页面的报错信息
    - 支持自定义添加 swagger 地址源
    - 自动监听 swagger 页面，页面加载完成后展开 api 列表，便于在当前页面进行搜索。

# 写在最后
如果对您有帮助，欢迎star，欢迎提 Issue！
    
