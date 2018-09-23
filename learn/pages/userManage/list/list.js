import {
  pRequest
} from '../../../utils/requestUtils.js'
const app = getApp()

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
          // this.handlerRefresh()
          this.init()
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
    clientInfo: {},
    levelArr: [],
    index: 0,
    consultArr: [{
      name: '王鑫',
      id: 0
    }, {
      name: '流星',
      id: 1
    }]
  },
  ready: function() {
    console.log('ready:')
    this.init()
    //console.log(this.personClientId)
    //debugger
    
  },
  /**
   * 组件的方法列表
   */
  methods: {
    init(){
      this.getClientDetail()
      this.getCounselorList()
      if (app.globalData.gradeList) {
        this.setData({
          levelArr: app.globalData.gradeList
        })
      } else {
        this.getGradeList((res) => {
          this.setData({
            levelArr: app.globalData.gradeList
          })
        })
      }
    },
    changeLevel() {

    },
    linktoAdd() {
      wx.navigateTo({
        url: '../newClient/newClient',
      })
    },
    getClientDetail() {
      wx.showLoading({
        title: '加载中...',
      })
      pRequest('com/client/get', {

        id: this.data.personClientId

      }).then((resp) => {
        wx.hideLoading()
        this.setData({
          clientInfo: convertClientInfo(resp)
        })
        this.triggerEvent('parentShopName', resp.shopName)
      }).catch((err) => {
        wx.hideLoading()
      })
    },

    getGradeList(callBack) {
      pRequest('grade/list', {}).then((res) => {
        app.globalData.gradeList = convertGrade(res)
        if (callBack) {
          callBack(res)
        }
      })
    },
    //获取顾问列表
    getCounselorList() {
      pRequest('person/list', {}).then((res) => {
        this.setData({
          consultArr: res
        })
      }).catch((err) => {
        console.log('err:', err)
      })
    },

    //重新分配顾问
    allocateToCounselor(e) {
      // debugger
      wx.showLoading({
        title: '请稍等...',
      })
      pRequest('com/client/allotPerson', {
        id: this.data.personClientId,
        personId: this.data.consultArr[e.detail.value].id,
        shopId: this.data.clientInfo.shopId,
      }).then((resp) => {
        wx.hideLoading()
        this.setData({
          ['clientInfo.personName']: this.data.consultArr[e.detail.value].personName
        })
      }).catch((err) => {
        wx.hideLoading()
      })
    },
    //更改等级
    updateGrade(e) {
      wx.showLoading({
        title: '请稍等...',
      })
      pRequest('com/client/updateGrade', {
        id: this.data.personClientId,
        gradeId: this.data.levelArr[e.detail.value].id,
      }).then((resp) => {
        wx.hideLoading()
        this.setData({
          ['clientInfo.level']: this.data.levelArr[e.detail.value].name
        })
      }).catch((err) => {
        wx.hideLoading()
      })
    },
    callTel(e) {
      if (!this.data.clientInfo) {
        return
      }
      wx.makePhoneCall({
        phoneNumber: this.data.clientInfo.parent[0].tel,
      })
    },
    editInfo:function(e){
      if (!this.data.clientInfo) {
        return
      }
      wx.navigateTo({
        url: '../newClient/newClient?clientId=' + this.data.clientInfo.clientId + "&clientInfo=" + JSON.stringify(this.data.clientInfo) + '&personClientId=' + this.data.personClientId,
      })
    },

  },
})

function convertClientInfo(resp) {
  return {
    parent: [{
      parentName: resp.clientName,
      gender: resp.clientSex,
      tel: resp.clientPhone,
    }],
    clientId:resp.id,
    level: resp.gradeName,
    levelId:resp.gradeId,
    sourceName: '学贝',
    sourceId: '1',
    personName: resp.personName,
    personId: resp.personId,
    students: resp.childsDTOList.map((child) => {
      return {
        studentName: child.childName,
        age: child.birthday ? child.birthday.substring(0,10):'',
        gender: child.childSex,
        id:child.id
      }
    }),
    shopId: resp.shopId,
    shopName: resp.shopName,
  }
}

function convertGrade(resp) {
  return resp.map((item) => {
    return {
      name: item.gradeName ? item.gradeName : item.sysGradeName,
      id: item.sysGradeId ? item.sysGradeId : item.sysGradeId
    }
  })
}