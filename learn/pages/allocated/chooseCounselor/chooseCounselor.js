// pages/allocated/chooseCounselor/chooseCounselor.js
import { pRequest} from '../../../utils/requestUtils.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    counselorList:[],
    selectPostion:-1,
    personClientId:'',
    shopId:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   // debugger
    this.setData({
      personClientId: options.personClientId,
      shopId: options.shopId,
    })
    this.getCounselorList()
  },
  cliclItem:function(e){
    this.setData({
      selectPostion:e.currentTarget.dataset.i
    })
  },
  clickSave:function(e){
    if (this.data.counselorList.length<1){
      wx.showToast({
        title: '请添加顾问',
        icon:'none'
      })
      return
    }
   
    if (this.data.selectPostion==-1){
        wx.showToast({
          title: '请选择顾问',
          icon: 'none'
        })
      return
    }
    wx.showLoading({
      title: '请稍等',
    })
    pRequest('com/client/allotPerson', {
      id: this.data.personClientId,
      personId: this.data.counselorList[this.data.selectPostion].id,
    }).then((resp) => {
      wx.hideLoading()
      wx.showToast({
        title: '分配顾问成功',
      })
      this.saveSuccess()
    }).catch((err) => {
      wx.hideLoading()
    })
  },
  getCounselorList:function(){
    pRequest('person/list',{
      shopId: this.data.shopId
    }).then((resp)=>{
      this.setData({
        counselorList:resp
      })
    }).catch((err)=>{

    })
  },
  saveSuccess:function(){
    var pages = getCurrentPages()
    var previousPage = pages[pages.length - 2]
    wx.navigateBack({
    })
    if (previousPage) {
      previousPage.refresh()
    }
  }
})

function createFakeCounselor(){
  var list=[]
  for(var i=0;i<4;i++){
    list.push('王恩')
  }
  return list
}