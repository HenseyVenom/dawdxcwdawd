// pages/rewardDetail/rewardDetail.js
import {
  pRequest
} from '../../utils/requestUtils.js'
import utils from '../../utils/util.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: 1,
    sourceType: 'inviteSign',
    rewardDetail: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: options.id,
      sourceType: options.sourceType
    })
    this.getRewardDetail()
  },

  getRewardDetail() {
    pRequest('front/unAuth/myBalanceIntegralDetail?id=' + this.data.id + '&clientId=android-1&clientSecret=9EV64I3J&sourceType=' + this.data.sourceType).then((res) => {
      res.createAt = new Date(res.createAt).pattern("YYYY年MM月dd日")
      if (res.sginTime) {
        res.sginTime = new Date(res.sginTime).pattern("YYYY年MM月dd日 HH:mm:ss")
      }
      this.setData({
        rewardDetail: res
      })
    }).catch((err) => {
      console.log('err:', err)
    })
  }

})