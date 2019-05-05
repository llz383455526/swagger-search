药师帮ApiCenter
ApiCenter是一款chrome插件，使用ReactJs编写，主要是为了解决目前内部API文档太多，查找麻烦的问题。使用APICenter，您可以：
1. 按开发者姓名搜索api相关信息
1. 按api名称搜索API信息
1. 同时使用开发者姓名和API关键字精确搜索API信息。
1. 按需添加API信息源（开发中)

**注意**对后端代码无侵入，但对 swagger api 接口数据结构有依赖！
使用效果如下：
![Markdown](https://github.com/llz383455526/api-center/blob/master/swagger-search.gif?raw=true)

### 推荐使用方法：
> 前提：你得先装有nodejs以及npm
- git clone
- npm i
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

# 注意事项
    1. 由于浏览器的跨域拦截，根据自己需求修改 public/manifest.json 的 permissions 字段，添加自己的域名。