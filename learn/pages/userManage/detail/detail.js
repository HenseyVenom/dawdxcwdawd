// pages/userManage/userManage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navbar: ['客户信息', '交易记录', '预约记录', '跟进记录'],
    currentTab: 0,
    personClientId:'',
    shopName:'',
    name:'',
    phone:'',
    foucsChange:false,
  },
  navbarTap: function (e) {
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    })
   // debugger
    if (e.currentTarget.dataset.idx==1){
      this.selectComponent('#tradingRecord').getShopNameFun(this.data.shopName)
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    debugger
    this.setData({
      name: options.name,
      phone: options.phone,
      personClientId: options.id
    })
  },
  getShopName(e){
    this.setData({
      shopName: e.detail
    })
  },
  onShow(){
    if (this.data.currentTab==3){
      this.setData({
        foucsChange:true
      })
    }
  },
  tradingRecord(){
    this.selectComponent('#tradingRecord').getdealLsit()
  },
  refreshClientPage(tab){
    this.setData({
      currentTab:-1
    })
    this.setData({
      currentTab: tab
    })
  },
  onPageScroll(e){
    console.log('scrollTop:', e.scrollTop)
  }
})