import network from '../network.js'
const app = getApp()
function simpleGet(api, success, comp) {
  wx.request({
    url: network.baseUrl + api,
    method: "GET",
    header: {
      'content-type': 'application/json',
      'X-ZX-TOKEN':'844A17C1671C94D856168CA60F8F73CC',
      'X-ZX-APP-ID': app.globalData.appId
    },
    success: function(res) {
      if (res.data.status == 0) {
        if (res.data.messages.length == 0) {
          if (success) {
            success(res.data.data)
          }
        } else {
          showErrorMessage(res.data.messages)
        }
      } else {
        var message
        if (res.data.messages instanceof Array) {
          message = res.data.messages[0].kind
        } else {
          message = res.data.message
        }
        wx.showToast({
          title: message,
          icon: 'none'
        })
      }
    },
    fail: function(res) {
      console.log(res)
      wx.showToast({
        title: res.errMsg,
        icon: 'none'
      })
    },
    complete: function(res) {
      if (comp)
        comp(res)
    }
  })
};

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
    if (!response.data.success && response.data.errorDescription =="您的会话已超时,请重新登录") { //未登录
      if (app.isLogin()) {
      //  debugger
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
      } else { //token不存在
      
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
    
    var errorMessage
    if (response.data.errorDescription) {
      errorMessage = response.data.errorDescription
    } else {
      // if (response.data.messages && response.data.messages.length > 0) {
      //   if (response.data.messages[0].message) {
      //     errorMessage = response.data.messages[0].message
      //   } else {
      //     errorMessage = response.data.messages[0].kind
      //   }
      // }
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

function pRequest(api, data) {
  app.putExtraDate(api, data)
  updateFormId()
  return new Promise((resolve, reject) => {
    wxPromisify(wx.request)({
      url: network.baseUrl + api,
      method: "POST",
      header: {
        'content-type': 'application/json',
        'X-ZX-TOKEN': '450E6404D313B22FC46DAD199537DCC6',
        'X-ZX-APP-ID': app.globalData.appId
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
    }, data: {
      formIds: formIds
    }, success: function (res) {
      // app.globalData.formIds=[]
    },
  })
}
// module.exports = {
//   simplePost: simplePost,
//   pRequest: pRequest
// }
export { pRequest,simpleGet}