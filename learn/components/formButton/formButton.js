// component/formButton/formButton.js
//页面中所有点击事件都用这个控件代替，这个控件是在点击的时候生出formId用的
const app = getApp()
var util = require('../../utils/util.js')
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    openType: {
      type: String,
      value: '',
    },
    bindgetuserinfo: {
      type: String,
      value: 'onGotUserInfo',
    },
    buttonName: {
      type: String,
      value: '',
    }

  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    bindSubmit: function (e) {
      var formId = e.detail.formId
      console.log("formId:", formId)
      if (!formId || formId == 'the formId is a mock one' || formId == '' || formId == null) return
      app.globalData.formIds.push({
        formId: e.detail.formId,
        date: new Date().pattern('YYYY-MM-dd HH:mm:ss')
      })
    },
    //bindonGotUserInfo 获取用户信息的回调
    onGotUserInfo: function (res) {
      // console.log('userInfo:',res)
      var userInfo = res // detail对象，提供给事件监听函数
      var myEventOption = {} // 触发事件的选项
      this.triggerEvent('onGotUserInfo', userInfo, myEventOption)
    }
  }
})
