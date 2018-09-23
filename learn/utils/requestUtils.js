import network from '../network.js'
const app = getApp()

function handleResponse(response, success, failCallBack) {

  if (response.data.status == 0 || response.data.success) {
    if (success) {
      
      if (response.data.status == 0){
       
        if (response.data.data || response.data.data === null || response.data.data === 0) {
           
          success(response.data.data)
        }
        return
      }
      if (response.data.success){
        //debugger
        success(response.data.result)
        return
      }
    }
  } else {
    if (response.data.success === false){//学呗接口返回
      errorFromXb(response)
      return
    }
    if (response.data.status == '100') { //未登录
      //token已存在，登录过期
      if (app.isLogin()) {
        app.saveToken(null)
        wx.showModal({
          title: '登录失效',
          content: '登录已过期请重新登录',
          showCancel: false,
          success: (action) => {
            if (action.confirm) {
              wx.navigateTo({
                url: '/pages/login/login',
              })
            } else {
              wx.showToast({
                title: '登录已过期',
                icon: 'none'
              })
            }
          }
        })
      } else { //token不存在
        wx.showModal({
          title: '登录',
          content: '请前往登录',
          showCancel: false,
          success: (action) => {
            if (action.confirm) {
              wx.navigateTo({
                url: '/pages/login/login',
              })
            } else {
              wx.showToast({
                title: '未登录',
                icon: 'none'
              })
            }
          }
        })
      }
      return
    }
    var errorMessage
    if (response.data.message) {
      errorMessage = response.data.message
    } else {
      if (response.data.messages && response.data.messages.length > 0) {
        if (response.data.messages[0].message) {
          errorMessage = response.data.messages[0].message
        } else {
          errorMessage = response.data.messages[0].kind
        }
      }
    }
    wx.showToast({
      title: errorMessage,
      icon: 'none'
    })
    if (failCallBack) {
      failCallBack('')
    }
  }
}
function errorFromXb(response){
  if (response.data.error == "MEMBER_TOKEN_INVALID_ERROR" || response.data.error == "您的会话已超时,请重新登录") {
    if (app.isLoginXb()) {
      app.saveToken(null)
      wx.showModal({
        title: '登录失效',
        content: '登录已过期请重新登录',
        showCancel:false,
        success: (action) => {
          if (action.confirm) {
            wx.navigateTo({
              url: '/pages/login/login',
            })
          } else {
            wx.showToast({
              title: '登录已过期',
              icon: 'none'
            })
          }
        }
      })
    } else {
      wx.showModal({
        title: '登录',
        content: '请前往登录',
        showCancel: false,
        success: (action) => {
          if (action.confirm) {
            wx.navigateTo({
              url: '/pages/login/login',
            })
          } else {
            wx.showToast({
              title: '未登录',
              icon: 'none'
            })
          }
        }
      })
    }
    return
  }
  var errorMessage = response.data.errorDescription || response.data.message
  wx.showToast({
    title: errorMessage,
    icon: 'none'
  })
  if (failCallBack) {
    failCallBack('')
  }
}

function pRequest(api, data) {
  app.putExtraDate(api, data)
  updateFormId()
  return new Promise((resolve, reject) => {
    wxPromisify(wx.request)({
      url: network.compoundUrl(api),
      method: "POST",
      header: {
        'content-type': 'application/json',
        'X-ZX-TOKEN': app.globalData.token,
        'X-ZX-APP-ID': app.globalData.appId
      },
      data: data,
    }).then(res => {
      handleResponse(res, function(successResponse) {     
        resolve(successResponse)
      }, function(errorMessage) {
        reject(errorMessage)
      })
    }).catch(res => {
      wx.showToast({
        title: res.errMsg,
        icon: 'none'
      })
      reject(res.errMsg)
    })
  })

}

function pGetRequest(api) {
  updateFormId()
  return new Promise((resolve, reject) => {
    wxPromisify(wx.request)({
      url: network.compoundUrl(api),
      method: "GET",
      header: {
        'content-type': 'application/json',
        'X-ZX-TOKEN': app.globalData.token,
      },
    }).then(res => {
      handleResponse(res, function(successResponse) {
        // console.log("successResponse:", successResponse)
        resolve(successResponse)
      }, function(errorMessage) {
        reject(errorMessage)
      })
    }).catch(res => {
      wx.showToast({
        title: res.errMsg,
        icon: 'none'
      })
      reject(res.errMsg)
    })
  })
}

//将小程序的API封装成支持Promise的API
function wxPromisify(fn) {
  return function(obj = {}) {
    return new Promise((resolve, reject) => {
      obj.success = function(res) {
        resolve(res)
      }

      obj.fail = function(res) {
        reject(res)
      }

      fn(obj)
    })
  }
}
//提交formId
function updateFormId() {
  if (!app.globalData.token) return
  if (!app.globalData.formIds || app.globalData.formIds.length == 0) {
    return
  }
  var formIds = app.globalData.formIds
  app.globalData.formIds = []
  wx.request({
    url: network.baseUrl + 'formId/save',
    method: "POST",
    header: {
      'content-type': 'application/json',
      'X-ZX-TOKEN': app.globalData.token
    },
    data: {
      formIds: formIds
    },
    success: function(res) {
      // app.globalData.formIds=[]
    },
  })
}
export {
  pRequest,
  pGetRequest
}