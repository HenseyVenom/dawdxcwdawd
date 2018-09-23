// pages/settings/clientLevelSettings/clientLevelSettings.js
import { pRequest } from '../../../utils/requestUtils.js'
import { filteremoji }from '../../../utils/util.js'
const app = getApp()
Page({

  data: {
    gradeObj:{
      content:"",
    },
    gardeContent:'',//
    gradeModel:false,
    page:{
      pageSize:10,pageNo:1
    },
    defaultgardeList:{ },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.gradeList()
  },
  
  close:function(){

  },

  closeModel(){
   // let gradeName = 'gradeObj.gradeName';
   var that = this
   setTimeout(function(){
     that.setData({
        gradeObj: {},
        gradeModel: false
     })
   },100)
   
  },
 
  //input返回等级
  bindgrade:function(e){
    let gradeName = 'gradeObj.gradeName';
    var value = filteremoji(e.detail.value)
    this.setData({
      [gradeName]: value.replace(/\s+/g, '')
    })
  },

  //编辑等级Model
  addGardeModel:function(e){
    let content = (e.currentTarget.dataset.grade.gradeName ? e.currentTarget.dataset.grade.gradeName : e.currentTarget.dataset.grade.sysGradeName);
    var obj = {
      gradeName: content,
      id: e.currentTarget.dataset.grade.id,
      sysGradeName: e.currentTarget.dataset.grade.sysGradeName,
      sysGradeId: e.currentTarget.dataset.grade.sysGradeId
    } 
    this.setData({
      gradeObj: obj,
      gradeModel:true  
    })
    console.log(this.data.gradeObj)
    // debugger
  },


  //删除等级
  delectGrade:function(e){
    var that = this
    if(!e.currentTarget.dataset.delect.id){
      wx.showToast({
        title: '请先编辑再删除',
        icon: 'none'
      })
      return
    }

    wx.showModal({
      title: '温馨提示',
      content: '确定要删除吗？',
      success: function (res) {
        if (res.confirm) {
          pRequest('grade/del', {
            id: e.currentTarget.dataset.delect.id
          }).then(res => {
            that.gradeList()
          })
        } else if (res.cancel) {
          //console.log('用户点击取消')
        }
      }
    })
   
  },

  //确定修改等级
  sureTap:function(){

    if (!this.data.gradeObj.gradeName){
      wx.showToast({
        title: '等级名称不能为空',
        icon: 'none'
      })
      return
    }
    console.log(this.data.gradeObj.gradeName)
    console.log(/^[0-9a-zA-Z_\u4e00-\u9fa5]+$/.test(this.data.gradeObj.gradeName))
      
    if (!/^[0-9a-zA-Z_\u4e00-\u9fa5]+$/.test(this.data.gradeObj.gradeName)){
      wx.showToast({
        title: '请输入汉字数字字母下划线',
        icon: 'none'
      })
      return
    }
  
    let url = this.data.gradeObj.id ? '/grade/edit' :'/grade/save'
    let obj = {}

    if (this.data.gradeObj.id){
      obj = {
        id: this.data.gradeObj.id,
        gradeName: this.data.gradeObj.gradeName,
        sysGradeId: this.data.gradeObj.sysGradeId
      }
    }else{
      obj={
        id: null,
        gradeName: this.data.gradeObj.gradeName,
        sysGradeId: this.data.gradeObj.sysGradeId
      }
    }
  
    pRequest(url,obj).then(res => {
      wx.showToast({
        title: '等级名称修改成功',
        icon: 'none'
      })
      this.setData({
        gradeModel: false 
      })
      this.gradeList()
    })

  },

  //等级列表
  gradeList:function(){
    pRequest('grade/listPage',{
      page: this.data.page
    }).then(res=>{  
      
      this.setData({
        defaultgardeList : res
      })   
      app.globalData.gradeList = convertGrade(res.list)
    })
  },
  
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */

  onPullDownRefresh: function () {
    this.gradeList()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
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