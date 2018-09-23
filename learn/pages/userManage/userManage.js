import {
  pRequest
} from '../../utils/requestUtils.js'
const app = getApp()
var page = {
  pageNo: 1,
  pageSize: 10,
  dataCount: 0,
  pageCount: 0
};
var isLoading = false; //分页数据是否加载中
var requestCount = 0
Page({
  /**
   * 页面的初始数据
   */
  data: {
    showSearchInput: false,
    clientList: [],
    levelArr: [],
    items: ['类型', '等级'],
    activeItem: -1,
    categoryArr: [{name:'全部'},{ name: '预约' }, { name: '签到' },{name: '成交'}],
    searchKeyword: '',
    clientType:null,//筛选的类型
    gradeId:null//筛选的等级
  },
  clickItem(e) {
    // console.log(e.currentTarget.dataset.num)
    if (this.data.activeItem == e.currentTarget.dataset.num) {
      this.setData({
        activeItem: -1,
        activeLevel: -1
      })
    } else {
      this.setData({
        activeItem: e.currentTarget.dataset.num,
        activeLevel: -1
      })
    }
  },
  checkItem: function(e) {
    // console.log(e.currentTarget.dataset.num)
    var filterType = this.data.activeItem
    if (filterType==0){//类型
    this.setData({
        activeItem: -1,
        clientType: e.currentTarget.dataset.num
    })
    }else{//等级
      this.setData({
        activeItem: -1,
        gradeId: this.data.levelArr[e.currentTarget.dataset.num].id
      })
    }
    this.onPullDownRefresh()
  },
  showSearchInput(e) {
    this.setData({
      showSearchInput: true
    })
  },
  bindSearchName(e) {
    this.setData({
      searchKeyword: e.detail.value
    })
  },
  searchBlur() {
    if (this.data.searchKeyword)
      return
    this.setData({
      showSearchInput: false
    })
  },
  confirmKeyword(e) {
    this.onPullDownRefresh()
  },
  linktoDetail(e) {
    var i = e.currentTarget.dataset.i
    var name = this.data.clientList[i].clientName
    var phone = this.data.clientList[i].tel
    var id = this.data.clientList[i].id
    wx.navigateTo({
      url: './detail/detail?id=' + id + '&name=' + name + "&phone=" + phone,
    })
  },
  linktoAdd() {
    wx.navigateTo({
      url: '/pages/userManage/newClient/newClient',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if (app.globalData.gradeList) {
      var list = new Array().concat(app.globalData.gradeList)
      list.unshift({ name: '全部', id: null })
      this.setData({
        levelArr: list
      })
    } else {
      this.getGradeList((res) => {
        var list = new Array().concat(app.globalData.gradeList)
        list.unshift({ name: '全部', id: null })
        this.setData({
          levelArr: list
        })
      })
    }
  },
  getGradeList(callBack) {
    pRequest('grade/list', {}).then((res) => {
      app.globalData.gradeList = convertGrade(res)
      if (callBack) {
        callBack(res)
      }
    })
  },
  onShow:function(){
    this.onPullDownRefresh()
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    if (isLoading) {
      return
    }
    page.pageNo = 1;
    this.getUserList()
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    if (isLoading) {
      return
    }
    if (page.pageCount == page.pageNo) {
      wx.showToast({
        title: '没有更多了',
        icon: 'none'
      })
      return
    }
    page.pageNo++;
    this.getUserList()
  },

  getUserList: function() {
    isLoading = true
    wx.showLoading({
      title: '加载中...',
    })
    requestCount++
    pRequest("com/client/findListPage", {
      page: page,
      keyword: this.data.searchKeyword,
      clientType: this.data.clientType == 0 ? '' : this.data.clientType,
      gradeId: this.data.gradeId
    }).then((resp) => {
      wx.hideLoading()
      isLoading = false
      page.dataCount = resp.page.dataCount
      page.pageCount = resp.page.pageCount
      // this.setData({
      //   clientList: convertClientList(resp.list)
      // })
      if (page.pageNo == 1) {
        this.setData({
          clientList: convertClientList(resp.list)
        })
      } else {
        this.setData({  
          clientList: this.data.clientList.concat(convertClientList(resp.list))
        })
      }
    }).catch((err) => {
      isLoading = false
      wx.hideLoading()
    })
  },
  

  closeFilter(e){
    this.setData({
      activeItem:-1
    })
  },
  callPhone: function (e) {
    if (e.currentTarget.dataset.phone) {
      wx.makePhoneCall({
        phoneNumber: e.currentTarget.dataset.phone,
      })
    }
  }
})

function convertClientList(list) {
  return list.map((item) => {
    return {
      clientName: item.clientName,
      level: item.gradeName,
      tel: item.clientPhone,
      clientType: item.clientType,
      id: item.id,
      personClientId: item.personClientId,
      shopName: item.shopName,
      followContent: item.followContent,
      nextFollowTime: item.nextFollowTime

    }
  })
}

function convertGrade(resp) {
  return resp.map((item) => {
    return {
      name: item.gradeName ? item.gradeName : item.sysGradeName,
      id: item.id ? item.id : item.sysGradeId
    }
  })
}