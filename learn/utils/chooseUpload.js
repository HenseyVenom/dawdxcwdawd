const app = getApp()
function chooseImage(page) {
  wx.chooseImage({
    success: function (res) {
      var uploadUrl = app.globalData.baseUrl + "tea/myHome/uploadImage ";
      upload(uploadUrl, res.tempFilePaths, function (response) {
        if (page.data.imageList == null) {
          page.data.imageList = [response.data]
        } else {
          page.data.imageList.push(response.data)
        }
        console.log("page", page.data.imageList)
        page.setData({
          imageList: page.data.imageList
        })
      })
    },
  })
}

/**
 * 上传文件
 *
 */
function upload(uploadUrl, files, handler) {
  wx.showLoading({
    icon: "loading",
    title: "正在上传"
  })
  console.log('upload', uploadUrl)
  var uploadTast = wx.uploadFile({
    url: uploadUrl,
    filePath: files[0],
    header: {
      'X-ZX-TOKEN': app.globalData.token,
      'X-ZX-APP-ID': app.globalData.appId
      // 'cookie': app.globalData.cookieId,
    },
    formData: { emulateJSON: true },
    name: 'file',
    success: function (e) {
      console.log(e);
      if (e.statusCode != 200) {
        wx.showModal({
          title: '提示',
          content: '上传失败:' + e.statusCode,
          showCancel: false
        })
        return;
      }
      handler(JSON.parse(e.data))
    },
    fail: function (e) {
      console.log(e);
      wx.showModal({
        title: '提示',
        content: '上传失败',
        showCancel: false
      })
    },
    complete: function () {
      wx.hideLoading()  //隐藏Toast
    }
  })
}
module.exports.chooseImage = chooseImage