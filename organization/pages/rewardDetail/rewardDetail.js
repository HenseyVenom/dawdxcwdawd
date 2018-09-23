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
    sourceType: '',
    rewardDetail: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
//   debugger
    this.setData({
      id: options.id,
      sourceType: options.type
    })
   
    this.getRewardDetail()
  },

  getRewardDetail() {
    pRequest('front/unAuth/myBalanceIntegralDetail?id=' + this.data.id + '&clientId=android-1&clientSecret=9EV64I3J&sourceType=' + this.data.sourceType).then((res) => {
      if (res.createAt){
        res.createAt = new Date(res.createAt).Format("yyyy年MM月dd")
      }
      
      if (res.sginTime){
        res.sginTime = new Date(res.sginTime).Format("YYYY年MM月dd日 HH:mm:ss")
      }
      this.setData({
        rewardDetail: res
      })
    }).catch((err)=>{
      console.log('err:',err)
    })
  }

})