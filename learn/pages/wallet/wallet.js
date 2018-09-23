// pages/wallet/wallet.js
const app =getApp()
import{
  pRequest
} from '../../utils/requestUtils.js'
import{
  formatCurrency
} from '../../utils/util.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bankCard:{},
    accountInfo:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
  onShow:function(e){
    this.getAccountInfo()
  },
  itemClick(e) {
    var name = e.currentTarget.dataset.name
    var path = e.currentTarget.dataset.path
    if (name =='withdraw'){
      wx.showToast({
        title: '暂未开通',
        icon:'none'
      })
      return
    }
    wx.navigateTo({
      url: '/pages/' + (path ? path+'/':'') + name + '/' + name,
    })
  },
  // onShareAppMessage(Object) {
  //   if (Object.from == 'button') {
  //     console.log('Object:', Object)
  //     if (Object.target.dataset.name == 'invite') {
  //       return {
  //         title: "快来领1800的优惠券啦",
  //         path: "/pages/invite/invite?" + app.getShareQuery(),
  //         imageUrl: '/images/course_on_sell.png'
  //       }
  //     }
  //   }
  // },
  getAccountInfo() {
    pRequest('xb/front/unAuth/wxMini/getIntegralData?token='+app.getXbToken()).then((res) => {
      this.setData({
        accountInfo: {
          'creditTotalAmount': res.creditTotalAmount,
          'creditAvailableAmount': formatCurrency(res.creditAvailableAmount),
          'creditFrozenAmount': formatCurrency(res.creditFrozenAmount),
        }
      })
    }).catch((err) => {

    })
  },
  getUserData() {
    pRequest('xb/front/unAuth/wxMini/getUserData', {
      token: getApp().getXbToken()
    }).then((res) => {
      var bankName = res.bankName
      if (bankName) {
        var num = res.cardNumber.substring(res.cardNumber.length - 4, res.cardNumber.length)
        this.setData({
          bankCard: {
            name: bankName + num
          },
        })
      }
    }).catch((err) => {

    })
  },
  share(e){
    wx.navigateTo({
      url: '/pages/invite/award/award',
    })
  }
})