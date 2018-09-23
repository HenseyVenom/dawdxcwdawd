import {
  pRequest
} from '../../../utils/requestUtils.js'
const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    listType: {
      type: Number,
      value: 0,
    },
    currentTab: {
      type: Number,
      value: 0,
      observer: function(newVal) {
        if (this.data.listType == newVal) {
          this.getdealLsit()
        }
      }
    },
    personClientId: {
      type: String,
      value: ''
    },
    shopName: {
      type: String,
      value: ''
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    page: {
      pageNum: 1,
      pageSize: 10
    },
    tradingRecord: [],
  },
  ready() {
    
  },
  /**
   * 组件的方法列表
   */
  methods: {
    addDealFun() {
      wx.navigateTo({
        url: '../newDealRecord/newDealRecord?shopName=' + this.data.shopName + '&personClientId=' + this.data.personClientId,
      })
    },
    //获取交易列表
    getdealLsit() {
      pRequest('/com/clientDeal/list', {
        clientId: this.data.personClientId
      }).then(res => {
        res.forEach((item)=>{
          if (item.dealDate){
            item.dealDate=item.dealDate.substring(0,10)
          }
        })
        this.setData({
          tradingRecord: res
        })
      })
    },

    getShopNameFun(value) {
      // debugger
      this.setData({
        shopName: value
      })
    }
  }
})