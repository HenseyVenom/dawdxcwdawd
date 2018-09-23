import { pRequest } from '../../../utils/requestUtils.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    courseArr: [],
    date: '',
    shopName:'',
    dealForm:{},
    personId:'',
  },
  bindDateChange: function (e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (option) {
   // debugger
    let shopName = 'dealForm.shopName'
    this.setData({
      [shopName]: option.shopName,
      personId: option.personClientId
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
   
  },
  //填写金额
  keyMoney:function(e){
    let Money = 'dealForm.Money'
    this.setData({
      [Money]: e.detail.value
    })
  },
  keyOrderNumber(e){
    this.setData({
      ['dealForm.orderNo']: e.detail.value
    })
  },
  //填写课程名称
  keyCouse: function (e) {
    let courseName = 'dealForm.courseName'
    this.setData({
      [courseName]: e.detail.value
    })
  },
  //填写支付方式
  keypay:function(e){
    let payWay = 'dealForm.payWay'
    this.setData({
      [payWay]: e.detail.value
    })
  },
  //添加记录
  adddealFun:function(){
    // wx.navigateBack({
    //   delta: 1
    // })
    if (!this.data.dealForm.Money){
      wx.showToast({
        title: '支付金额能为空',
        icon: 'none'
      })
      return
    }
    if (!(/^[0-9]*$/.test(this.data.dealForm.Money))) {
      wx.showToast({
        title: '支付金额请输入数字',
        icon: 'none'
      })
      return
    }
    if (!this.data.dealForm.payWay) {
      wx.showToast({
        title: '支付方式不能为空',
        icon: 'none'
      })
      return
    }
    if (!this.data.dealForm.orderNo) {
      wx.showToast({
        title: '订单编号不能为空',
        icon: 'none'
      })
      return
    }
    if (!this.data.dealForm.courseName) {
      wx.showToast({
        title: '课程不能为空',
        icon: 'none'
      })
      return
    }
    if(!this.data.date){
      wx.showToast({
        title: '请选择交易时间',
        icon: 'none'
      })
      return
    }
    var pages = getCurrentPages();//得到当前所有的页面
    pRequest('com/clientDeal/save', {
      courseName: this.data.dealForm.courseName,
      dealDate: this.data.date,
      money: this.data.dealForm.Money,
      clientId: this.data.personId,
      payWay: this.data.dealForm.payWay,
      orderCode:this.data.dealForm.orderNo,
    }).then(res => {
     
      // wx.navigateTo({
      //   url: '../userManage',
      // })
      var pages = getCurrentPages();//得到当前所有的页面
      if (pages.length > 1) {
        var prePage = pages[pages.length - 2];//-1的话就是当前页
        prePage.setData({
          tradingRecord: []
        })
        prePage.tradingRecord()
         
      }
        wx.navigateBack({
        delta: 1
      })
    })
  },

  refreshPrevious() {
    var pages = getCurrentPages()
    var previousPage = pages[pages.length - 2]
    wx.navigateBack({})
    if (previousPage) {
      previousPage.refreshClientPage(1)
    }
  },
 
})