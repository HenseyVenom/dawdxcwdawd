// components/topDateFilter/topDateFilter.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    filterDate: [],
    filterSelectPostion: 1,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    changeFilter: function (e) {
      this.setData({
        filterSelectPostion: e.currentTarget.dataset.i
      })
      var myEventDetail = {
        filteIndex: this.data.filterSelectPostion,
        filter: this.data.filterDate[this.data.filterSelectPostion]
      } // detail对象，提供给事件监听函数
      var myEventOption = {} // 触发事件的选项
      this.triggerEvent('filterChange', myEventDetail, myEventOption)
    }
  },
  attached: function () {
    this.setData({
      filterDate: createFilterDate()
    })
  }
})

function createFilterDate() {
  var list = []
  list.push('全部')
  list.push('今天')
  list.push('三天内')
  list.push('一周内')
  return list
}