import {
  pRequest
} from "../../../utils/requestUtils.js"
const app = getApp()
var isLoading = false; //分页数据是否加载中
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
          this.getOrderRecordList()
        }
      }
    },
    personClientId: {
      type: String,
      value: ''
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    reservedList: [],
    showBookModal:false,
  },
  ready: function() {
    // this.getOrderRecordList()
  },
  /**
   * 组件的方法列表
   */
  methods: {
    getOrderRecordList() {
      isLoading = true
      wx.showLoading({
        title: '加载中...',
      })
      pRequest('com/task/findPlanList', {
        clientId: this.data.personClientId
      }).then((res) => {
        loadingFinish()
        this.setData({
          reservedList: convertList(res)
        })
      }).catch((err) => {
        loadingFinish()
      })
    },
    book: function (e) {
      var i = e.currentTarget.dataset.i
      this.setData({
        showBookModal: true
      })
    },
    confirmDate: function (e) {
      wx.showLoading({
        title: '处理中',
      })
      pRequest('com/task/toShopDateSet', {
        inviteDate: e.detail.date + ' ' + e.detail.time + ":00",
        clientId: this.data.personClientId,
        courseName: e.detail.courseName,
      }).then((res) => {
        wx.hideLoading()
        this.setData({
          showBookModal: false
        })
        this.getOrderRecordList()
      }).catch((err) => {
        wx.hideLoading()
      })
    },
  },
})

function loadingFinish() {
  isLoading = false
  wx.hideLoading()
}

function convertList(list) {
  return list.map((item) => {
    return {
      course: item.courseName,
      shopName: item.shopName,
      reserveTime: item.inviteDate,
      isOut: new Date(item.inviteDate).getTime() < Date.now(),
      isSign: item.isSign
    }
  })
}