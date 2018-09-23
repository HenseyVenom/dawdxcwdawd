// components/bookModal/bookDateModal.js
import util from '../../utils/util.js'
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    showBookModal:{
      type:Boolean,
      value:false
    },
    courseName:{
      type:String,
      value:""
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    date: new Date().pattern("YYYY-MM-dd"),
    startdate: new Date().pattern("YYYY-MM-dd"),
    time: new Date().pattern("HH:mm"),
    bookCourse:''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    confirmDate:function(e){
      var myEventDetail = {
        date:this.data.date,
        time:this.data.time,
       // bookCourse:this.data.bookCourse
      } // detail对象，提供给事件监听函数
      if (!this.data.courseName){
        if (!this.data.bookCourse){
          wx.showToast({
            title: '请填写课程',
            icon:'none'
          })
          return
        }else{
          myEventDetail.courseName = this.data.bookCourse
        }
      }
      var myEventOption = {} // 触发事件的选项
      this.triggerEvent('bookDateConfirm', myEventDetail, myEventOption)
    },
    cancelModal:function(e){
      this.setData({
        showBookModal: false
      })
    },
    bindDateChange:function(e){
      this.setData({
        date: e.detail.value
      })
    },
    bindTimeChange: function (e) {
      this.setData({
        time: e.detail.value
      })
    },
    changeInput:function(e){
      this.setData({
        bookCourse:e.detail.value
      })
    }
  },
})
