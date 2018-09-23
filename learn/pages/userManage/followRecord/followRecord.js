import {
  pRequest
} from "../../../utils/requestUtils.js"
const app = getApp()
var isLoading = false; //分页数据是否加载中
Component({
  properties: {
    listType: {
      type: Number,
      value: 0, //不存在此属性时
    },
    currentTab: {
      type: Number,
      value: 0,
      observer: function(newVal) {
        if (this.data.listType == newVal) {
          this.getFollowRecordList()
        }
      }
    },
    foucsChange:{
      type: Number,
      value: false,
      observer: function (newVal) {
        if(newVal){
          this.getFollowRecordList()
          this.properties.foucsChange=false
        }
      }
    },
    name:{
      type:String,
      value:''
    },
    phone:{
      type: String,
      value: ''
    },
    personClientId: {
      type: String,
      value: ''
    }
  },
  data: {
    list:[]

  },
  methods: {
    enterFollow: function() {
      var personClientId = this.data.personClientId
      var name = this.data.name
      var phone = this.data.phone
      wx.navigateTo({
        url: '/pages/userManage/newFollowRecord/newFollowRecord?personClientId=' + personClientId + '&name=' + name + "&phone=" + phone
      })
    },
    getFollowRecordList:function(){
      isLoading = true
      wx.showLoading({
        title: '加载中...',
      })
      pRequest('com/task/findInfo', {
        clientId: this.data.personClientId
      }).then((res) => {
        loadingFinish()
        this.setData({
          // list: convertList(res)
          list:res
        })
      }).catch((err) => {
        loadingFinish()
      })
    }
  }
})

function loadingFinish() {
  isLoading = false
  wx.hideLoading()
}

function convertList(list) {
  return list.map((item) => {
    return {
      content: item.followContent,
      personName: item.personName,
      followDate: item.followDate.substring(0,10),
    }
  })
}