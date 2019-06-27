function $(selector){
  return document.querySelectorAll(selector)
}
function hideError() {
  // $_q('.errors-wrapper').style.display="none"
  const fd = setInterval(()=>{
    if ($('.errors-wrapper').length > 0 && $('.errors-wrapper')[0].style.display != "none"){
      $('.errors-wrapper')[0].style.display = "none"
      clearInterval(fd)
    }
  }, 300)
}
/**
 * 组织检索数据源
 * opblock-summary-path  接口路径
 * opblock-summary-description 接口描述
 */
function  prepareSearchSource() {

}

let resultHrefArray = []
let currentIndex = 0
let searchResult

function setStatistics() {
  searchResult.innerText=`${currentIndex}/${resultHrefArray.length}`
}
function locateToNext(){
    if (resultHrefArray.length == 0 )
      return
    resultHrefArray[currentIndex].click()
    currentIndex++
    setStatistics()
    if (currentIndex >= resultHrefArray.length) {
      currentIndex = 0
    }
}
function search(searchKey) {
  let pathArray = $('.opblock-summary-path')
  searchResult = !searchResult && document.querySelector('#searchResult')
  // let descriptionArray = $_q('.opblock-summary-description')

  resultHrefArray = []
  currentIndex = 0
  pathArray.forEach((item, index) => {
    let alink = item.firstChild
    if(alink.href.indexOf(searchKey) > -1) {
      resultHrefArray.push(alink)
    }
  })
  setStatistics()
}


/**
 * 展开折叠的 api 项目，否则在准备搜索源时会找不到隐藏的项
 */
function unfold(item){
  setTimeout(() => {
    let alink = item.querySelector('.opblock-tag>a')
      alink.click()
  },0)
}
function addSearch(){
  let div = document.createElement('div')
  div.className = 'content-script-search-wrapper'
  /**搜索框 */
  let input = document.createElement('input')
  input.className = 'content-script-search'
  input.id = 'content-script-search'
  input.addEventListener("input", (event)=>{
    let searchKey = event.target.value
    
    // 1. 整理搜索源
    searchKey && search(searchKey)
  })
  // 按回车时定位到下一个搜索项
  input.addEventListener('keypress', (event)=>{
    let key = event.which || event.keyCode
    if(key == 13){
      locateToNext()
    }
  })

  /** 搜索结果列表 */
  let resultDiv = document.createElement('div')
  resultDiv.className = 'content-script-search-result'
  resultDiv.id = "searchResult"

  div.appendChild(input)
  div.appendChild(resultDiv)
  document.body.appendChild(div);
  
}
hideError()
let fd = setInterval(()=>{
  if($('.opblock-tag-section').length > 0) { // 页面加载完成
    clearInterval(fd)
    // 1. 展开所有分组
    let foldArray = $('.opblock-tag-section');
    foldArray.forEach(item => {
      if(!item.classList.contains('is-open')) {
        unfold(item)
      }
    })
  }
}, 1500)
// addSearch()
