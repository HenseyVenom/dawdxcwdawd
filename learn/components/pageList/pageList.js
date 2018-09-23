// components/pageList/pageList.js
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
    page: {
      pageNo: 1,
      pageSize: 10,
      pageCount: 1
    },
    isLoading: false, //分页数据是否加载中
    requestCount: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    refresh() {
      if (this.data.isLoading) {
        return
      }
      this.setData({
        ['page.pageNo']:1
      })
    },
    loadMore() {
      if (this.data.isLoading) {
        return
      }
      if (this.data.page.pageCount == this.data.page.pageNo) {
        wx.showToast({
          title: '没有更多了',
          icon: 'none'
        })
        return
      }
      this.setData({
        ['page.pageNo']: this.data.page.pageNo+1
      })
    },
  }
})