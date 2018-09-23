// pages/share/share.js
import network from '../../network.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    shareInfo: {
      name: '',
      url:'',
    },
    type: 0,
    shareType :[
      {
        name: '报班找学贝，1亿报班补贴大放送',
        url: network.webUrl+'/popularizeRed',
      },
      {
        name: '特价来袭，直击底价，瓜分1亿课程补贴',
        url: network.webUrl +'/course/detail',
      },
      {
        name: '特价来袭，直击底价，瓜分1亿课程补贴',
        url: network.webUrl +'/activity/detail',
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      id: options.id ? options.id : '',
      type: options.type
    })
    let shareInfo = this.data.shareType[options.type]
    if (options.type != 0) {
      shareInfo.url += ('?id=' + options.id + '&' + getApp().getShareQuery())
    }else{
      shareInfo.url += ('?' + getApp().getShareQuery())
    }
    this.setData({
      shareInfo: shareInfo
    })
  },
  copyShare() {
    wx.setClipboardData({
      data: this.data.shareInfo.name+',点击'+this.data.shareInfo.url+'领取',
      success: (res) => {
        that.setData({
          showModal: true
        })
      }
    })
  }
})