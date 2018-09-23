// pages/bankCard/withdrawRecord/withdrawRecord.js
import { pRequest } from '../../../utils/requestUtils.js'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page:0,
    size:10,
    withdrawRecordList:[],
    totalPages:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     this.withdrawList()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },
  //提现记录列表
  withdrawList:function(){
    wx.showLoading({
      title: '加载中...',
    })
    let url = '/front/unAuth/wxMini/withdrawDepositRecord?token=' + app.getToken() + "&page=" + this.data.page + "&size=" + this.data.size
  //  debugger
    pRequest(url,{})
    .then(res=>{
      wx.stopPullDownRefresh()
      wx.hideLoading()
    //  debugger
      if (res.content.length>0){
        let RecordList = this.data.withdrawRecordList.concat(res.content);
        this.setData({
          withdrawRecordList: RecordList,
          totalPages: res.totalPages
        })
      } 
     // console.log(this.data.withdrawRecordList)
      
      }).catch((err) => {
        wx.stopPullDownRefresh()
        wx.hideLoading()
      })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
   // debugger
    this.setData({
      page:0,
      withdrawRecordList:[]
    })
   
    this.withdrawList()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if ((this.data.totalPages-1) == this.data.page) {
      wx.showToast({
        title: '没有更多了',
        icon: 'none'
      })
      return
    }
    this.setData({
      page:this.data.page+1
    })
    console.log(this.data.page)
    //debugger
   
    this.withdrawList()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})