import network from '../network'
import wepy from 'wepy'

const app = wepy.$instance

function errorFromXb(response, failCallBack) {
  if (response.data.error == "MEMBER_TOKEN_INVALID_ERROR" || response.data.errorDescription == "您的会话已超时,请重新登录") {
    whenUnLogin(app.isLoginXb())
    if (failCallBack) {
      failCallBack('')
    }
    return
  }
  var errorMessage = response.data.errorDescription || response.data.message
  if (failCallBack) {
    failCallBack(errorMessage)
  }
}

function errorFromZx(response, failCallBack) {
  if (response.data.status == '100') { //未登录
    whenUnLogin(app.isLoginZX())
    if (failCallBack) {
      failCallBack('')
    }
    return
  }
  if(response.data.status==2){
    if(response.data.messages&&response.data.messages.length>0){
      var firstError=response.data.messages[0]
      if(firstError.code=='10005'){
        whenUnLogin(app.isLogin())
        if (failCallBack) {
          failCallBack('')
        }
        return
      }
    }
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
  if (failCallBack) {
    failCallBack(errorMessage)
  }
}

function whenUnLogin(isExpire) {
  console.log(isExpire)
  if (isExpire) {//token已存在，登录过期
    app.logoOut()
    wx.showModal({
      title: '登录失效',
      content: '登录已过期是否重新登录',
      success: (action) => {
        if (action.confirm) {
          wx.reLaunch({
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
          wx.reLaunch({
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
}

function handleResponse(response, success, failCallBack) {
  // console.log('response:',response)
  if(response.statusCode!=200){//网络请求错误
    if (failCallBack) {
      failCallBack('error code:'+response.statusCode)
    }
    return
  }
  if (response.data.status == 0 || response.data.success) {
    if (success) {
      if (response.data.status == 0) {
        if (response.data.data || response.data.data === null || response.data.data === 0) {
          success(response.data.data)
          return
        }
        if (response.data.messages) {
          errorFromZx(response,failCallBack)
          return
        }
        return
      }
      if (response.data.success) {
        success(response.data.result)
        return
      }
    }
  } else {
    if (response.data.success === false) {//学呗接口返回
      errorFromXb(response, failCallBack)
      return
    }
    errorFromZx(response, failCallBack)
  }

}

function pGetRequest(api,header) {
  updateFormId()
  return new Promise((resolve, reject) => {
    wxPromisify(wx.request)({
      url: network.compoundUrl(api),
      method: "GET",
      header: header?Object.assign({},getDefaultHeader(api),header):getDefaultHeader(api),
    }).then(res => {
      handleResponse(res, function (successResponse) {
        // console.log("successResponse:", successResponse)
        resolve(successResponse)
      }, function (errorMessage) {
        //请求结果返回了错误
        if(errorMessage){
          wx.showToast({
            title: errorMessage,
            icon: 'none'
          })
        }
        reject('')
      })
    }).catch(err => {
      //上边then代码中出现错误
      if (err) {
        wx.showToast({
          title: err,
          icon: 'none'
        })
        return
      }
      reject('')
    })
  })
}

function pRequest(api, data,header) {
  app.putExtraDate(api, data)
  updateFormId()
  // if (app.isLogin()) {
  //   if (api.indexOf('?') != -1) {
  //     api = api + '&token=' + app.getToken()
  //   } else {
  //     api = api + '?token=' + app.getToken()
  //   }
  // }
  return new Promise((resolve, reject) => {
    wxPromisify(wx.request)({
      url: network.compoundUrl(api),
      method: "POST",
      header: header?Object.assign({},getDefaultHeader(api),header):getDefaultHeader(api),
      data: data,
    }).then(res => {
      handleResponse(res, function (successResponse) {
        // console.log("successResponse:", successResponse)
        resolve(successResponse)
      }, function (errorMessage) {
        if(errorMessage){
          wx.showToast({
            title: errorMessage,
            icon: 'none'
          })
        }
        reject('')
      })
    }).catch(err => {
      if (err) {
        wx.showToast({
          title: err,
          icon: 'none'
        })
        return
      }
      reject('')
    })
  })

}

//将小程序的API封装成支持Promise的API
function wxPromisify(fn) {
  return function (obj = {}) {
    return new Promise((resolve, reject) => {
      obj.success = function (res) {
        resolve(res)
      }

      obj.fail = function (res) {
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
    },
    data: {
      formIds: formIds
    },
    success: function (res) {
      // app.globalData.formIds=[]
    },
  })
}

function getDefaultHeader(api) {
  var defaultHeader = {
    'content-type': 'application/json',
    'X-ZX-TOKEN': app.getToken(),
    'X-ZX-APP-ID': app.globalData.appId,
  }
  if(api.indexOf('auth')>=0){
    defaultHeader.Authorization=app.getTokenType()+' '+app.getAccessToken()
  }
  return defaultHeader
}
export {
  pRequest,
  pGetRequest
}
