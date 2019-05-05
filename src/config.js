
let projectUrlArr=[
    "http://192.168.1.94:11851/v2/api-docs?group=ayg",               //采购精灵服务  
    "http://192.168.1.94:11831/v2/api-docs?group=ayg",               //采购精灵服务  
]

/**
 * 新增接口
 * @param {*} urlStr 多个项目用逗号隔开
 */
function addProjectUrl(urlStr){
    let urlArr = urlStr.toLowerCase().split(",");
    const projectUrlTagStr = projectUrlArr.join(" ");
    urlArr.array.forEach(element => {
        if(!projectUrlTagStr.includes(element)){
            projectUrlArr.push(element);
        }
    });

    //todo 刷新本地接口数据
}

function getProjectUrls(){
    return projectUrlArr
}
export default {
    addProjectUrl,
    getProjectUrls
}