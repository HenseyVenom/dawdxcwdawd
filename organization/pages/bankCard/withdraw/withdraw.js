// pages/bankCard/withdraw.js
import {formatCurrency } from '../../../utils/util.js'
import { pRequest,simpleGet } from '../../../utils/requestUtils.js'
const app = getApp()
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
    bankCard:{},
    showModal:false,
    showBindingModal:false,
    holdshell:{},
    totalMoney:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getMyShell()
    this.presentShellFun()
  },

  //计算金额
  exCountChange: function (e) {

    if (!e.detail.value) {
      this.setData({
        exCount: '',
        tax: '',
        withdrawMoney: 0
      })
      return
    }

    let num = e.detail.value.split('.')
    num[0] = num[0].replace(/\b(0+)/gi, "")
    if (!num[0]) {
      num[0] = '0'
    }
    this.setData({
      exCount: num[0] + (num.length > 1 ? '.' + num[1] : '')
    })
    let totalShell = formatCurrency(this.data.shellCount)
    var exCount = this.data.exCount > totalShell ? totalShell : this.data.exCount
    let url = 'front/unAuth/wxMini/computeMoney?token=' + "123123123123&bkCount=" + e.detail.value
    pRequest(url,{})
    .then(res=>{
      this.setData({
        exCount: exCount,
        tax: formatCurrency(res.tax),
        withdrawMoney: formatCurrency(res.realMoney),
        totalMoney: res.totalMoney
     })

    })
  },
  //提交审核
  withdraw: function (e) {
    if (this.data.exCount <= 0 || !this.data.bankCard.name){
      return
    }
    if (this.data.holdshell.lowestWithdrawMoney > this.data.totalMoney){
      let title = "最小提现金额为" + this.data.lowestWithdrawMoney + "元"
      wx.showToast({
        title: title,
        icon: 'none'
      })
      return
    }
    let url = "/front/unAuth/wxMini/withdrawDeposit?token=" + app.getToken() + '&bkCount=' + this.data.exCount
    pRequest(url, {  
    })
    .then(res => {
      this.setData({
        showModal: true
      })
      this.presentShellFun()
      var pages = getCurrentPages()
      pages.forEach((item) => {
        if (item.route == 'pages/index/index') {
          console.log(item)
          //debugger
          item.presentShellFun()
        }
      })
    })
  },

  //获取账号积分数据
  presentShellFun:function(){
   // let url = 'front/unAuth/wxMini/getIntegralData?token=' + "13256768672"
    let url = 'front/unAuth/wxMini/getIntegralData?token=' + app.getToken()
    pRequest(url,{
    })
    .then(res=>{
      this.setData({
        showShellCount: res.creditAvailableAmount,
        ratio: formatCurrency(res.price),
        holdshell:res
      })
    })
  //debugger
 
    pRequest('/front/unAuth/wxMini/getUserData', {
      token: app.getToken()
    })
    .then(res => {
      let name = 'bankCard.name'
      this.setData({
        bankCard:res,
        [name]: res.bankName + res.cardNumber.substr(res.cardNumber.legnth - 4, 4)
      }) 
      if (res.bankName){
        this.setData({
          showBindingModal:false
        }) 
      }else{
        this.setData({
          showBindingModal: true
        }) 
       // showBindingModal: true
      }   
    })
  
  },
  getMyShell() {
    this.setData({
      shellCount: 1000000000,
      ratio: 0.000003,
      taxRatio: 0.2,
    })
    this.setData({
      showShellCount: formatCurrency(this.data.shellCount)
    })
  },
  selectBankCard(res){
    wx.navigateTo({
      url: '/pages/bankCard/bankCardList/bankCardList?isChooseType=true',
    })
  },
  closeModal(e){
    this.setData({
      showModal:false
    })
  },
  bindBankCard(e){
    this.setData({
      showBindingModal: false
    })
    wx.navigateTo({
      url: '/pages/bankCard/bankCardBinding/bankCardBinding?fromWithdraw=true',
    })
  }
})