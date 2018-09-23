// pages/userManage/newClient/newClient.js
import {
  pRequest
} from '../../../utils/requestUtils.js'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: [{
      label: '男',
      value: 1
    }, {
      label: '女',
      value: 2
    }],
    index: '',
    levelArr: [],
    sourceArr: [{
      name: '学贝',
      id: '1'
    }],
    consultArr: [],
    childArr: [{
      name: '',
      gender: 1,
      age: ''
    }],
    shopList: [],
    sex: '',
    parentName: '',
    gender: 1,
    phone: '',
    gradeName: '',
    gradeId: '',
    sourceName: '',
    sourceId: '',
    counselorName: '',
    counselorId: '',
    shopName: '',
    shopId: '',
    clientId: '',
    personClientId: '',
    endTime:''
  },
  bindInput(e) {
    var key = e.currentTarget.dataset.name
    this.setData({
      [key]: e.detail.value
    })
  },
  bindListInput(e) {
    var i = e.currentTarget.dataset.i
    var key = 'childArr[' + i + '].' + e.currentTarget.dataset.name
    this.setData({
      [key]: e.detail.value
    })
  },
  bindPGenderChange(e) { //选择家长性别
    this.setData({
      index: e.detail.value,
      gender: this.data.array[e.detail.value].value
    })
  },
  updateGrade(e) {
    console.log(this.data.levelArr[e.detail.value].id)
    this.setData({
      gradeId: this.data.levelArr[e.detail.value].id,
      gradeName: this.data.levelArr[e.detail.value].name,
    })
  },
  updateSource(e) {
    this.setData({
      sourceId: this.data.sourceArr[e.detail.value].id,
      sourceName: this.data.sourceArr[e.detail.value].name,
    })
  },
  updateCounselor(e) {
    this.setData({
      counselorId: this.data.consultArr[e.detail.value].id,
      counselorName: this.data.consultArr[e.detail.value].personName,
    })
  },
  updateShop(e) {
    this.setData({
      shopId: this.data.shopList[e.detail.value].id,
      shopName: this.data.shopList[e.detail.value].shopName,
    })
  },
  bindGenderChange(e) { //选择孩子性别
    let i = e.target.dataset.index
    this.data.childArr[i].gender = Number(e.detail.value) + 1
    this.setData({
      childArr: this.data.childArr
    })
  },
  bindDateChange(e) {
    let i = e.target.dataset.index
    var key = 'childArr[' + i + '].age'
    this.setData({
      [key]: e.detail.value
    })
  },
  addChild() {
    this.data.childArr.push({
      name: '',
      gender: 1,
      age: '',
    })
    this.setData({
      childArr: this.data.childArr
    })
  },
  submitForm() {
    if (!this.data.parentName) {
      wx.showToast({
        title: '请填写家长姓名',
        icon: 'none'
      })
      return
    }
    if (this.data.parentName.length>20) {
      wx.showToast({
        title: '家长姓名不能超过20个字',
        icon: 'none'
      })
      return
    }
    if (!this.data.gender) {
      wx.showToast({
        title: '请选择家长性别',
        icon: 'none'
      })
      return
    }
    if (!this.data.phone) {
      wx.showToast({
        title: '请填写家长的联系方式',
        icon: 'none'
      })
      return
    }
    if (!this.data.gradeId) {
      wx.showToast({
        title: '请选择等级',
        icon: 'none'
      })
      return
    }
    if (!this.data.sourceId) {
      wx.showToast({
        title: '请选择来源',
        icon: 'none'
      })
      return
    }
    // if (!this.data.counselorId) {
    //   wx.showToast({
    //     title: '请选择顾问',
    //     icon: 'none'
    //   })
    //   return
    // }
    if (!this.data.shopId) {
      wx.showToast({
        title: '请选择门店',
        icon: 'none'
      })
      return
    }
    var childList = this.data.childArr
    for (var i = 0; i < childList.length; i++) {
      if (!childList[i].name) {
        wx.showToast({
          title: '请填写孩子昵称',
          icon: 'none'
        })
        return
      }
      if (childList[i].name.length>20) {
        wx.showToast({
          title: '孩子昵称不能超过20个字',
          icon: 'none'
        })
        return
      }
      if (!childList[i].age) {
        wx.showToast({
          title: '请选择出生日期',
          icon: 'none'
        })
        return
      }
      if (!childList[i].gender) {
        wx.showToast({
          title: '请选择孩子性别',
          icon: 'none'
        })
        return
      }
    }
    wx.showLoading({
      title: '请稍等...',
    })
    var params = {
      "childsDTOList": this.data.childArr.map((child) => {
        return {
          "birthday": child.age,
          "childName": child.name,
          "childSex": child.gender,
          "id": child.id
        }
      }),
      "gradeId": this.data.gradeId,
      "clientName": this.data.parentName,
      "clientPhone": this.data.phone,
      "clientSex": this.data.gender,
      "personId": this.data.counselorId,
      "shopId": this.data.shopId,
      "source": this.data.sourceName
      
    }
    if (this.data.clientId) { //编辑
      params.id = this.data.clientId
      params.editType = 2
      params.childsDTOList.forEach((child) => {
        if (child.id) {
          child.editType = 2
        } else {
          child.editType = 1
        }
      })
      params.personClientId = this.data.personClientId
    }
    pRequest(this.data.clientId ? 'com/client/update' : 'com/client/savePersonAndChilds', params).then((res) => {
      wx.hideLoading()   
      wx.showToast({
        title: this.data.clientId ? '修改成功' : '添加成功',
      })
      if (this.data.clientId) {
        this.refreshPrevious()
      } else {
        wx.navigateBack({})
      }
    }).catch((err) => {
      // wx.hideLoading()
    })
    // console.info(this.data.childArr)

  },
  refreshPrevious() {
    var pages = getCurrentPages()
    var previousPage = pages[pages.length - 2]
    wx.navigateBack({})
    if (previousPage) {
      previousPage.refreshClientPage(0)
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
     endTime:(new Date()).pattern("YYYY-MM-dd")
    }) 
    if (options.clientInfo) {
      this.initEditInfo(options)
    }
    this.setData({
      sex: {
        1: '男',
        2: '女'
      },
    })
    this.getCounselorList()
    this.getStoreList()
    this.getGradeList()
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
    // console.log(this.data.levelArr)
    // debugger
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
  //获取店铺列表
  getStoreList() {
    pRequest('shop/findListByPersonId', {}).then((res) => {
      this.setData({
        shopList: res
      })
    }).catch((err) => {
      console.log('err:', err)
    })
  },
  initEditInfo(options) {
    var clientInfo = JSON.parse(options.clientInfo)
   
    this.setData({
      personClientId: options.personClientId,
      clientId: options.clientId,
      parentName: clientInfo.parent[0].parentName,
      gender: clientInfo.parent[0].gender,
      phone: clientInfo.parent[0].tel,
      gradeName: clientInfo.level,
      gradeId: clientInfo.levelId,
      sourceName: clientInfo.sourceName,
      sourceId: clientInfo.sourceId,
      counselorName: clientInfo.personName,
      counselorId: clientInfo.personId,
      shopName: clientInfo.shopName,
      shopId: clientInfo.shopId,
      childArr: clientInfo.students.map((child) => {
        return {
          name: child.studentName,
          gender: child.gender,
          age: child.age,
          id: child.id
        }
      })
    })
  }
})

function convertGrade(resp) {
  return resp.map((item) => {
    return {
      name: item.gradeName ? item.gradeName : item.sysGradeName,
      id: item.id ? item.id : item.sysGradeId
    }
  })
}