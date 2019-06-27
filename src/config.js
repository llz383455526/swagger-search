const LOCAL_KEY = 'api-center-project-config'

let defaultProjectUrl=[
    {
        url: "http://192.168.1.89:11839/v2/api-docs?group=ayg",
        title: '渠道管理平台89:11839'
    },
    {
        url: "http://192.168.1.94:11831/v2/api-docs?group=ayg", 
        title: 'openadmin 94:11831'
    },
    {
        url: "http://192.168.1.94:11841/v2/api-docs?group=ayg",
        title: '94:11841'
    },
    {
        url:  "http://192.168.1.94:11851/v2/api-docs?group=ayg",
        title: '94:11851'
    }      
]

/**
 * 新增接口
 * @param {*} urlStr 多个项目用逗号隔开
 */
function addProjectUrl(projectUrlObj, callback){
    let url = projectUrlObj.url
    let localConfigStr = localStorage.getItem(LOCAL_KEY)
    let apiSourceList = []

    if(localConfigStr) {
        apiSourceList = JSON.parse(localConfigStr)
    } 
    const projectUrlArray = apiSourceList.flatMap((item)=>{
        return item.url
    });
    if (!projectUrlArray.join(' ').includes(url)){
        apiSourceList.push(projectUrlObj)
        localStorage.setItem(LOCAL_KEY, JSON.stringify(apiSourceList))
        
        callback(null, {msg: '添加完成', data: apiSourceList})
    } else {
        let error = new Error('本地已存在该地址，请勿重复添加')
        callback(error)
    }
}

function getProjectUrls(){
    let localConfig = localStorage.getItem(LOCAL_KEY)
    return localConfig ? JSON.parse(localConfig) : defaultProjectUrl
}

function init() {
    let localConfig = localStorage.getItem(LOCAL_KEY)
    if (!localConfig && defaultProjectUrl.length > 0) {
        localStorage.setItem(LOCAL_KEY, JSON.stringify(defaultProjectUrl))
    }
}

init()
export default {
    addProjectUrl,
    getProjectUrls
}