 // pages/bankCard/withdraw.js
 import {
   formatCurrency
 } from '../../../utils/util.js'
 import {
   pRequest
 } from '../../../utils/requestUtils.js'
 Page({

   /**
    * 页面的初始数据
    */
   data: {
     shellCount: 0,
     ratio: 0,
     exCount: '',
     taxRatio: 0,
     tax: 0,
     withdrawMoney: 0,
     showShellCount: 0,
     bankCard: {},
     showModal: false,
     showBindingModal: false,
     lowestWithdrawMoney: 0,
     totalMoney: 0
   },

   /**
    * 生命周期函数--监听页面加载
    */
   onLoad: function(options) {
     this.getMyShell()
     this.getUserData()
   },
   exCountChange: function(e) {
     if (!e.detail.value) {
       this.setData({
         exCount: '',
         tax: '',
         withdrawMoney: 0
       })
       return
     }
     
  let num = e.detail.value.split('.')
   if(num[1]) {
        if (num[1].length > 2) {
          //  console.log(num[1].substr(0, 2))  
          this.setData({
            exCount: num[0] + '.' + num[1].substr(0, 2)
          })
        } else {
          this.setData({
            exCount: e.detail.value
          })
        }
  } else {
  
      num[0] = num[0].replace(/\b(0+)/gi, "")
      if (!num[0]) {
        num[0] = '0'
      }
      this.setData({
        exCount: num[0] + (num.length > 1 ? '.' + num[1] : '')
      })

   }
   //  let totalShell = formatCurrency(this.data.shellCount)
     var exCount = this.data.exCount > this.data.shellCount ? this.data.shellCount : this.data.exCount
     pRequest('front/unAuth/wxMini/computeMoney?bkCount=' + exCount).then((res) => {
       this.setData({
         exCount: exCount,
         tax: formatCurrency(res.tax),
         withdrawMoney: formatCurrency(res.realMoney),
         totalMoney: res.totalMoney
       })
     }).catch((err) => {

     })
   },
   withdraw: function(e) {
     if (this.data.exCount <= 0 || !this.data.bankCard.name) {
       return
     }
     if (this.data.lowestWithdrawMoney > this.data.totalMoney) {
       let title = "最小提现金额为" + this.data.lowestWithdrawMoney + "元"
       wx.showToast({
         title: title,
         icon: 'none'
       })
       return
     }
     wx.showLoading({
       title: '请稍等',
     })
     pRequest('front/unAuth/wxMini/withdrawDeposit?bkCount=' + this.data.exCount).then((res) => {
       wx.hideLoading()
       this.setData({
         showModal: true
       })
       this.getMyShell()
     }).catch((res) => {
       //  wx.hideLoading()
     })
   },
   getMyShell() {
     pRequest('front/unAuth/wxMini/getIntegralData', {}).then((res) => {
       this.setData({
         shellCount: res.creditAvailableAmount,
         ratio: res.price,
         taxRatio: 0.2,
         lowestWithdrawMoney: res.lowestWithdrawMoney
       })
       this.setData({
         showShellCount: formatCurrency(this.data.shellCount)
       })
     }).catch((err) => {

     })
   },
   getUserData() {
     pRequest('front/unAuth/wxMini/getUserData', {
       token: getApp().getToken()
     }).then((res) => {
       var bankName = res.bankName
       if (bankName) {
         var num = res.cardNumber.substring(res.cardNumber.length - 4, res.cardNumber.length)
         this.setData({
           bankCard: {
             name: bankName + num
           },
         })
       } else {
         this.setData({
           showBindingModal: true,
         })
       }
     }).catch((err) => {

     })
   },
   selectBankCard(res) {
     if (!this.data.bankCard.name) {
       this.bindBankCard()
     }
     return
     wx.navigateTo({
       url: '/pages/bankCard/bankCardList/bankCardList?isChooseType=true',
     })
   },
   closeModal(e) {
     this.setData({
       showModal: false
     })
     wx.navigateBack({})
   },
   bindBankCard(e) {
     this.setData({
       showBindingModal: false
     })
     wx.navigateTo({
       url: '/pages/bankCard/bankCardBinding/bankCardBinding?fromWithdraw=true',
     })
   },
 })