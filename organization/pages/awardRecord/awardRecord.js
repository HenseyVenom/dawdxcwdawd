// pages/awardRecord/awardRecord.js
import {
  pRequest
} from "../../utils/requestUtils.js"
import utils from '../../utils/util.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tablist: [{
      name: '全部',
      value: 'inviteFriends',
      },
      {
        name: '注册',
        value: 'registerBackQB',
      },
      {
        name: '预约试听课',
        value: 'courseSignBackQB',
      },
      {
        name: '购买课程',
        value: 'buyCourseBackQB',
      }
    ],
    multiArrayDate: [
      [],
      []
    ],
    multiIndex: [118, 7],
    yearMonth: '',
    sourceType: 'inviteFriends',
    personList: [],
    totalCount: 0,
    monthAwardCount: 0,
    monthInviteCount: 0,
    currentDate: '',
    showMonthText: '本月',
    pO: {
      page: 0,
      size: 20
    },
    isLoading: false,
    inviteObj:{},
    selectawardcount:0,
    inviteCount:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      totalCount: options.creditTotalAmount
    })
    console.log('isLoading:', this.data.isLoading)

    this.data.yearMonth = new Date().pattern("YYYY-MM-dd")
    this.data.yearMonth = this.data.yearMonth.substr(0,8)+'01'
    let yearArr = this.data.multiArrayDate[0]
    let MonthArr = this.data.multiArrayDate[1]
    for (let i = 2017; i < 2100; i++) {
      yearArr.push(i + '年')
    };
    for (var j = 1; j < 13; j++) {
      if (j < 10) {
        let num = '0' + j
        MonthArr.push(j + '月')
      } else {
        MonthArr.push(j + '月')
      }
    }
    this.setData({
      multiArrayDate: [yearArr, MonthArr]
    })
    this.getPersionList()
    this.myBalanceIntegralStat()
  },
  //选择日期的下表
  bindMultiPickerChange: function(e) {
    var year = this.data.multiArrayDate[0][e.detail.value[0]];
    year = year.substring(0, year.length - 1)
    var month = this.data.multiArrayDate[1][e.detail.value[1]];
    month = month.substring(0, month.length - 1)
    this.setShowMonthText(year, month)
    this.setData({
      yearMonth: year + '-' + month + '-01'
    })
    

  },
  //跳转到奖励明细
  enterDetail:function(e){

    var i = e.currentTarget.dataset.i
   
    wx.navigateTo({
      url: '/pages/rewardDetail/rewardDetail?id=' + this.data.personList[i].id + '&type=' + this.data.personList[i].type,
    })

  },

  //tab切换
  switchTab: function(e) {
    var i = e.currentTarget.dataset.index
    this.setData({
      personList: [],
      sourceType: e.currentTarget.dataset.index
    })
    this.onPullDownRefresh()

  },

  setShowMonthText(year, month) {
    
     var showMonthText;
    // if (year == this.data.currentDate.getFullYear()) {
    //   if (month == (this.data.currentDate.getMonth() + 1)) {
    //     showMonthText = '本月'
    //   } else {
    //     showMonthText = month + '月'
    //   }
    // } else {
    //   showMonthText = year + '年' + month + '月'
    // }
    showMonthText = year + '年' + month + '月'
    this.setData({
      showMonthText: showMonthText,
      yearMonth: year + '-' + month + '-01'
    })
 
    this.onPullDownRefresh()
  },
  //我的积分、贝壳统计数
  myBalanceIntegralStat(){
    let url = "front/unAuth/myBalanceIntegralStat?token=" + getApp().getToken() + "&clientId=organ&clientSecret=organ"
    pRequest(url,{}).then(res=>{
       //consoel.log(res)
       this.setData({
         inviteObj: res
       })
     //debugger
    })
  },

  onPullDownRefresh: function() {
    if (this.data.isLoading) {
      return
    }
    this.setData({
      ['pO.page']: 0
    })
    this.getPersionList()

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    if (this.data.isLoading) {
      return
    }
    this.setData({
      ['pO.page']: this.data.pO.page + 1
    })
    this.getPersionList()
  },
  getPersionList: function() {
    this.data.isLoading = true
    wx.showLoading({
      title: '加载中...',
    })
    var url = 'front/unAuth/myBalanceInOut?token=' + getApp().getToken() + '&nowDate=' + this.data.yearMonth + "&clientId=personal&clientSecret=personal&page=" + this.data.pO.page + '&size=' + this.data.pO.size
    if (this.data.sourceType) {
      url += ('&sourceType=' + this.data.sourceType)
    }
    pRequest(url).then((res) => {
      this.loadingFinish()
      this.setData({
        selectawardcount: res.amount,
         inviteCount:res.inviteCount
      })
      if (this.data.pO.page == 0) {
        if (res.finPopularityInOutLogList.content){
          this.setData({
            personList: createList(res.finPopularityInOutLogList.content)
          })
        }else{
          this.setData({
            personList: []
          })
        }     
        // console.log(this.data.personList)
        // debugger
      } else {
        this.setData({
          personList: this.data.personList.concat(createList(res.finPopularityInOutLogList.content))
        })
      }
      this.setData({
        ['pO.totalPage']: res.finPopularityInOutLogList.totalPages,
        ['pO.page']: resf.inPopularityInOutLogList.number,
      })
    }).catch((err) => {
      this.loadingFinish()
    })
  },
  loadingFinish: function() {
    wx.stopPullDownRefresh()
    this.data.isLoading = false
    wx.hideLoading()
    if (this.data.isLoadingMore) {
      this.setData({
        isLoadingMore: false
      })
    }
  },
})

function createList(list) {
  // console.log(list)
  return list.map((item) => {
    return {
      nickName: item.nickName,
      avatars: item.avatars,
       createAt: new Date(item.createAt).pattern("YYYY年MM月dd"),
      rewardType: item.rewardType,
      amount: item.amount,
      id: item.id,
      createAtStr: item.createAtStr,
      type: item.type
    }
  })
}