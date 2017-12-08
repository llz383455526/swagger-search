import {projectUrls} from "./config"
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
        "projectApiPageUrl":'',     //项目api文档页面地址
        "apiList":[]              //该项目下的所有api信息


    }

    _projectApiInfo.description = data.info.description+data.info.title;
    _projectApiInfo.projectApiPageUrl = data.host+data.basePath+"swagger-ui.html#!";

    _.forEach(data.paths,(pathData,path)=>{
        let apiItem={
            apiName:"",
            path:"",
            method:'',
            author:"",
            operationId:"",     
            summary:""
        };
        apiItem.path = path;        //api 路径信息
    
        apiItem.method =Object.keys(pathData)[0];   //api请求方式


        const pathInfo = pathData[apiItem.method];
        apiItem.author = pathInfo.tags[0] && pathInfo.tags[0].toLowerCase();      //api开发者信息
    
        apiItem.operationId = pathInfo.operationId.toLowerCase();
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
    projectUrls.forEach((projectUrl,key)=>{
        axios.get(projectUrl).then((response)=>{
            if(response.status!=200){
                alert("接口获取错误，请通知开发者修复");
                return
            }
            let projectApiInfo = projectApiAnalyze(response.data);
            allProjectApiList.push(projectApiInfo);
          })
    })
    
}


function searchApi(searchKey){
    let results=[];

    allProjectApiList.forEach((projectApi)=>{
        projectApi.apiList.forEach((api)=>{
            if(api.author.includes(searchKey) || api.operationId.includes(searchKey) ){
                let findOne = api;
                findOne.jumpUrl = projectApi.projectApiPageUrl+api.author+"/"+api.operationId;
                console.dir(findOne);
                results.push(findOne);
            }
        })
    })

    return results;

}




collectApiInfo(projectUrls);
const apiCenter={
    searchApi
}


export default apiCenter


