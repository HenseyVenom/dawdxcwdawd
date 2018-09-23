// pages/bankCard/bankCardBinding/bankCardBinding.js
import {
  pRequest
} from '../../../utils/requestUtils.js'
const app =getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    idCard: '',//改成银行名称了
    bankCard: '',
    branchName: '',
    region: [],
    fromWithdraw: false,
    accountType: 1,
    openBankList:['工商银行','建设银行','招商银行','平安银行','兴业银行','华夏银行'],
    priviteBankList: ['工商银行', '农业银行', '中国银行', '建设银行', '中信银行', '光大银行', '华夏银行', '平安银行', '招商银行', '兴业银行', '浦发银行', '储蓄银行', '宁波银行', '南京银行']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if (options.fromWithdraw) {
      this.setData({
        fromWithdraw: options.fromWithdraw,
      })
    }
  },

  bindInput(e) {
    var key = e.currentTarget.dataset.name
    this.setData({
      [key]: e.detail.value
    })
  },
  bindingBankCard(res) {
    if (!this.data.name || !this.data.idCard || !this.data.bankCard) {
      return
    }
    var par = /^[\u4E00-\u9FA5]{2,20}$/
    if (!par.exec(this.data.name)){
      wx.showToast({
        title: '姓名最少2个字，最多20个字,只支持汉字',
        icon: 'none'
      })
      return
    }
    if (this.data.accountType == 1){
      if (this.data.priviteBankList.indexOf(this.data.idCard)==-1){
        wx.showToast({
          title: '暂时不支持绑定' + this.data.idCard+'的银行卡',
          icon:'none'
        })
        return
      }
    }else{
      if (this.data.openBankList.indexOf(this.data.idCard) == -1) {
        wx.showToast({
          title: '暂时不支持绑定' + this.data.idCard + '的银行卡',
          icon: 'none'
        })
        return
      }
    }
    pRequest("xb/front/unAuth/wxMini/perfectBankData", {
      bankCity: this.data.region[1],
      bankName: this.data.idCard,
      bankProvince: this.data.region[0],
      branchName: this.data.branchName,
      cardHolder: this.data.name,
      cardNumber: this.data.bankCard,
      cardType: this.data.accountType == 1 ? 'privatecash' : 'privatecash',
      token: app.getXbToken()
    }).then((res)=>{
      if (this.data.fromWithdraw) {
        var pages = getCurrentPages()
        var bankName = this.data.idCard
        var num = this.data.bankCard.substring(this.data.bankCard.length - 4, this.data.bankCard.length)
        pages.forEach((item) => {
          if (item.route == 'pages/bankCard/withdraw/withdraw') {
            item.setData({
              bankCard: {
                name: bankName + num
              }
            })
          }
        })
      }
      wx.navigateBack({
      })
    }).catch((res)=>{

    })
  },
  bindRegionChange: function(e) {
    this.setData({
      region: e.detail.value
    })
  },
  changeType: function(e) {
    this.setData({
      accountType: e.currentTarget.dataset.value
    })
  }
})