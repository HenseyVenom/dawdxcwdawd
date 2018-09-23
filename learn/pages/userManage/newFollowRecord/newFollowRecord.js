// pages/userManage/newFollowRecord/newFollowRecord.js
import {
  pRequest
} from '../../../utils/requestUtils.js'
var dateTimePicker = require('../../../utils/dateTimePicker.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    phone: '',
    personClientId: '',
    text: '',
    nexttime:'',
    dateTimeArray:null,
    dateTime1: null,
    startYear: 1988,
    endYear: 2050,
    

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      name: options.name,
      phone: options.phone,
    })
    if (options.personClientId) {
      this.setData({
        personClientId: options.personClientId,
      })
    }
    // 获取完整的年月日 时分秒，以及默认显示的数组
     var obj1 = dateTimePicker.dateTimePicker(this.data.startYear, this.data.endYear);
     // 精确到分的处理，将数组的秒去掉
     var lastArray = obj1.dateTimeArray.pop();
     var lastTime = obj1.dateTime.pop();

     this.setData({
       dateTimeArray: obj1.dateTimeArray,
       dateTime1: obj1.dateTime
     });
  },
  textChange: function(e) {
    this.setData({
      text: e.detail.value
    })
  },
  changeDateTime1(e) {
    let indexarr = e.detail.value
   
    let dateArr1 =  this.data.dateTimeArray
    let nextdate = dateArr1[0][indexarr[0]] + '-' + dateArr1[1][indexarr[1]] + '-' + dateArr1[2][indexarr[2]] + ' ' + dateArr1[3][indexarr[3]] + ':' + dateArr1[4][indexarr[4]]
    
    this.setData({ 
      dateTime1: e.detail.value,
      nexttime: nextdate,
     });
  },
  changeDateTimeColumn1(e) {
     var arr = this.data.dateTime1, dateArr = this.data.dateTimeArray;
     arr[e.detail.column] = e.detail.value;
     dateArr[2] = dateTimePicker.getMonthDay(dateArr[0][arr[0]], dateArr[1][arr[1]]);
      //letdateArr[0][arr[0]]
     this.setData({
        dateTimeArray: dateArr,
        dateTime1: arr
     });
   
   },
  addNewRecord: function(e) {
    if (!this.data.text){
      wx.showToast({
        title: '请填写跟进记录',
        icon: 'none',
      })
      return
    }
    let reg = /[\u4e00-\u9fa5]/
    if (!reg.test(this.data.text)) {
      wx.showToast({
        title: '填写跟进记录必须包含中文',
        icon: 'none',
      })
      return
    }

    if (!this.data.nexttime) {
       wx.showToast({
        title: '请填写下次沟通时间',
        icon: 'none',
      })
      return
    }
    wx.showLoading({
      title: '正在添加跟进记录',
    })
    let setnextTIme = this.data.nexttime+':00'
    var params = {
      clientId: this.data.personClientId,
      nextFollowTime: setnextTIme,
      followContent: this.data.text
    }
    pRequest('com/task/addInfo', params).then((resp) => {
      wx.hideLoading()
      this.addSuccess()
    }).catch((err) => {
      wx.hideLoading()
    })
  },
  //选择沟通时间
  bindDateChange:function(e){ 
    this.setData({
      nexttime: e.detail.value
    })
  },
  addSuccess: function() {
    var pages = getCurrentPages()
    var previousPage = pages[pages.length - 2]
    wx.navigateBack({
    })
    if (previousPage) {
      if (previousPage.refresh){
        previousPage.refresh()
      }
    }
  }
})