import network from '../network.js'
const app = getApp()

function showErrorMessage(messages) {
  var errorMessage
  if (messages[0].message) {
    errorMessage = messages[0].message
  } else {
    errorMessage = messages[0].kind
  }
  wx.showToast({
    title: errorMessage,
    icon: 'none'
  })
}

function handleResponse(response, success, failCallBack) {
  // console.log('response:',response)
  if (response.data.success) {
    if (success) {
      success(response.data.result)
    }
  } else {
    if (response.data.error == "MEMBER_TOKEN_INVALID_ERROR" || response.data.error=="您的会话已超时,请重新登录") {
      if (app.isLogin()) {
        app.saveToken(null)
        wx.showModal({
          title: '登录失效',
          content: '登录已过期是否重新登录',
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
          content: '是否前往登录',
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
}

function pGetRequest(api) {
  updateFormId()
  return new Promise((resolve, reject) => {
    wxPromisify(wx.request)({
      url: network.baseUrl + api,
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

function pRequest(api, data) {
  app.putExtraDate(api, data)
  updateFormId()
  if (app.isLogin()){
    if(api.indexOf('?')!=-1){
      api = api + '&token=' + app.getToken()
    }else{
      api = api + '?token=' + app.getToken()
    }
  }
  return new Promise((resolve, reject) => {
    wxPromisify(wx.request)({
      url: network.baseUrl + api,
      method: "POST",
      header: {
        'content-type': 'application/json',
        // 'X-ZX-TOKEN': app.globalData.token,
      },
      data: data,
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
    url: network.baseUrl + '/formId/save',
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
// module.exports = {
//   simplePost: simplePost,
//   pRequest: pRequest
// }
export {
  pRequest,
  pGetRequest
}