//"/ysb/v2/api-docs",
let projectUrlTags=[
    "caigou-api",               //采购精灵服务
    "commons-api",              //通用接口
    "credit-pay",               //白条模块
    "drug-knowledge",           //药知识
    "file-service",              //文件服务
    "intelli-purchase",         //智能采购
    "online-pharmacy",          //网上药店
    "order-ysb",                //order服务
    "pharm-study",              //药学习
   
    "scm-api",                  //特推/商业
    "special-topic",            //专题
    "store-manager",            //掌店宝
    "ysb",                      //药师帮采购--店员版
    "ysb-user",                 //user-service  
    "ysb-weixin-mp",            //weixi
    "we-globuy"                //全球购微店  
]

/**
 * 新增接口
 * @param {*} urlStr 多个项目用逗号隔开
 */
function addProjectUrl(urlStr){
    let urlArr = urlStr.toLowerCase().split(",");
    const projectUrlTagStr = projectUrlTags.join(" ");
    urlArr.array.forEach(element => {
        if(!projectUrlTagStr.includes(element)){
            projectUrlTags.push(element);
        }
    });

    //todo 刷新本地接口数据
}

function getProjectUrls(){
    let prefix="";
    let debug = false;
    if(!debug){
        prefix="http://test.ysbang.cn"
    }
    return projectUrlTags.map((projectUrlTag)=>{
        return prefix+"/"+projectUrlTag+"/v2/api-docs"
    })
}
export default {
    addProjectUrl,
    getProjectUrls
}