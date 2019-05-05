const _ = require('lodash')
const axios  = require('axios')


let allProjectApiList=[];   //存储所有项目的api信息


/**
 * 
 * @param {*} data 从接口获取的接口信息数据
 * @return 整理后的项目api信息
 */
function projectApiAnalyze(data){
    //每个功能模块的api信息
    let _projectApiInfo={
        "description":"",       //项目描述
        "title":"",             //所属模块
        "projectApiPageUrl":'',     //项目api文档页面地址
        "apiList":[]              //该项目下的所有api信息


    }

    _projectApiInfo.description = data.info.description;
    _projectApiInfo.title = data.info.title;
    _projectApiInfo.projectApiPageUrl = data.host+data.basePath+"/swagger-ui.html#!";

    _.forEach(data.paths,(pathData,path)=>{
        let apiItem={
            apiName:"",
            path:"",
            method:'',
            author:"",
            operationId:"",     
            summary:"",
            deprecated:false
        };
        apiItem.path = path;        //api 路径信息
    
        apiItem.method =Object.keys(pathData)[0];   //api请求方式


        const pathInfo = pathData[apiItem.method];
        apiItem.author = pathInfo.tags.length > 0 ? pathInfo.tags[0] : '';      //api开发者信息
        apiItem.deprecated = pathInfo.deprecated || false;                   //api是否废弃
    
        apiItem.operationId = pathInfo.operationId || '';
        apiItem.apiName = apiItem.operationId.replace(new RegExp("Using"+apiItem.method,"ig"),"")   //api 名称
        apiItem.summary = pathInfo.summary;     //api 功能描述
        _projectApiInfo.apiList.push(apiItem)
    })

    return _projectApiInfo;

}

/**
 * 遍历所有项目的api信息
 * @param {*} projectUrls 所有项目页面对应获取api信息的接口地址
 */

function collectApiInfo(projectUrls){
    return projectUrls.map((projectUrl,key)=>{
        return axios.get(projectUrl).then((response)=>{
            if(response.status!=200){
                alert("接口:"+projectUrl+"访问失败，请通知开发者修复");
                return
            }
            let projectApiInfo = projectApiAnalyze(response.data);
            allProjectApiList.push(projectApiInfo);
          })
    })
}


function searchApi(searchKey){
    let results = {};
    allProjectApiList.forEach((projectApi)=>{
        projectApi.apiList.forEach((api)=>{
            //1、搜索关键词分词
            let cutkeys = searchKey.split(" ");


            //2、关键词与作者和api名称匹配，取交集
            let isContain = true;
            cutkeys.forEach((cutkey)=>{
                if(cutkey.trim()=="") return;
                if(api.author.toLowerCase().includes(cutkey) || api.operationId.toLowerCase().includes(cutkey) ){
                   isContain = true & isContain;
                }else{
                    isContain = false & isContain;
                }
            })

            if(isContain){
                let findOne = api;
                if (api.operationId) {
                    findOne.jumpUrl = "http://" + projectApi.projectApiPageUrl + "/" + api.author + "/" + api.operationId;
                } else {
                    findOne.jumpUrl = "http://" + projectApi.projectApiPageUrl + "/" + api.author + "/" + api.method + '_' + api.path;
                }
                
                findOne.projectTitle= projectApi.title;
                findOne.description= projectApi.description.split("：").length>1?projectApi.description.split("：")[1]:projectApi.description;
                let hash = findOne.path;
                !results[hash] && (results[hash] = findOne);
            }
            
        })
    })
    
    var resultsArr = Object.values(results);
    if(resultsArr.length===0){
        console.log("根据关键字："+searchKey+",未匹配到结果");
    }
    return resultsArr;

}

const apiCenter={
    collectApiInfo,
    searchApi
}


export default apiCenter


