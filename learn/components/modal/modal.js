// components/modal/modal.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    showModal: {
      type: Boolean,
      value: false
    },
    buttonText:{
      type: String,
      value: "确定"
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
    onConfirmClick:function(e){
      this.triggerEvent('clickOk', {}, {})
    },
    hideModal:function(e){
      this.setData({
        showModal:false,
      })
    }
  }
})
