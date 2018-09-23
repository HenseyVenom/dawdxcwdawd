// pages/bankCard/bankCardUnbinding/bankCardUnbinding.js
import { pRequest } from '../../../utils/requestUtils.js'
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    cardDetail:{},
    cardImg:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    let imgUrl = "/images/" + options.bankName + ".png"
    this.setData({
  
      cardImg: imgUrl,
      cardDetail: options
    })
    //this.getCardData()
  },

  //获取银行卡信息
  // getCardData: function () {
  //   pRequest('/front/unAuth/wxMini/getUserData', {
  //     token: app.getToken()
  //   })
  //     .then(res => {
  //       let imgUrl = "/images/" + res.bankName + ".png"
  //       this.setData({
  //         cardDetail: res, 
  //         cardImg:imgUrl
  //       })
  //     })

  // },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})