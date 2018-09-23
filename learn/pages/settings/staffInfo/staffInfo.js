// pages/settings/staffInfo/staffInfo.js
import { pRequest } from '../../../utils/requestUtils.js'
import { filteremoji } from '../../../utils/util.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showAdd:true,
    showSex:false,
    sexCount:0,
    PermissionModel:false,
    shopCount:1,
    infoDetail:{ 
    },
    sexList:[
    {
      name:'男',
      stauts:1,   
    },
    {
      name:'女',
      stauts:2,
    }],
    PermissionList: [
      {
        name: '主管',
        stauts: 1,
      },
      {
        name: '顾问',
        stauts: 2,
      }
    ],
    StoreList:[],
    personId:'',
    shopId:'',
    updatePerson:0,
    animationData: {}
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    
    if (options.info==1){
      var that = this
      this.setData({
        showAdd:false,
        shopId: options.shopId,
        personId: options.id
      })

      setTimeout(function(){
        that.personDatailFun()
      },500)
         
    }else{
      this.setData({
        showAdd: true,
        infoDetail:{
          userType:2,
          sex:1
        }
      })
    }
    this.shopListModel()
    
  },

  onReady: function () {
  
    
  },
  delectPerson:function(){
   var that = this
    wx.showModal({
      title: '溫馨提示',
      content: '确认删除该人员?',
      success: function (res) {
       // console.log(that.data.infoDetail.id) 
        //debugger
        if (res.confirm) {
          pRequest('/person/del', {
            id: that.data.infoDetail.id,
          }).then(res => {
            wx.navigateTo({
              url: '../staffManage/staffManage',
            })
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
    
  },
  
  //选择性别
  bindselectSex(e){
    let sex = 'infoDetail.sex';
    let index = e.detail.value
      this.setData({
        [sex]: this.data.sexList[index].stauts
      })
  },
  //绑定门店 
  bindSelectShop: function (e) {
    let index = e.detail.value;
    let shopId = 'infoDetail.shopId';
    let shopName = 'infoDetail.shopName';
    this.setData({
      [shopId]: this.data.StoreList[index].id,
      [shopName]: this.data.StoreList[index].shopName
    })
  },

  keyperson:function(e){ 
    let personName = 'infoDetail.personName'
    var value = filteremoji(e.detail.value)
    this.setData({
      [personName]: value.replace(/\s+/g, '')
    })
  },

  PermissionTab:function(e){
     
    let sex = 'infoDetail.sex';
    this.setData({
      [sex]: e.currentTarget.dataset.obj.stauts,
      sexCount: e.currentTarget.dataset.obj.stauts
    })
    pRequest('/person/edit', {
      sex: this.data.infoDetail.sex,
      id: this.data.infoDetail.id
    }).then(res => {
      this.setData({
        updatePerson: 0
      })
      this.personDatailFun()
      this.refushPage()
     
    })

  },
  //刷新上一頁面
  refushPage:function(){
    let pages = getCurrentPages();//得到当前所有的页面
    if (pages.length > 1) {

      let prePage = pages[pages.length - 2];//-1的话就是当前页
      prePage.setData({
        ManagePersonList: []
      })
      prePage.infoPerson();
    }
  },

  keytell:function(e){
    let phone = 'infoDetail.phone'
    var value = filteremoji(e.detail.value)
    this.setData({
      [phone]: value.replace(/\s+/g, '')
    })
  },


  //人员详情
  personDatailFun:function(){
    pRequest('/person/getPerson',{
      id: this.data.personId,
      shopId:this.data.shopId
    }).then(res => {
       this.setData({
         infoDetail:res
       })
    })
  },

 

  //添加人员
  Addperson:function(){
    console.log(this.data.infoDetail)
    if(!this.data.infoDetail.personName){
      wx.showToast({
        title: '人员姓名不能为空',
        icon: 'none'
      })
      return
    }
    if (this.data.infoDetail.personName.length>20) {
      wx.showToast({
        title: '人员姓名不能超过20个字',
        icon: 'none'
      })
      return
    }
    if (!this.data.infoDetail.sex) {
      wx.showToast({
        title: '请选择人员性别',
        icon: 'none'
      })
      return
    }
    
    if (!this.data.infoDetail.phone) {
      wx.showToast({
        title: '手机号不能为空',
        icon: 'none'
      })
      return
    }
    if (!/^1[34578]\d{9}$/.test(this.data.infoDetail.phone)){
      wx.showToast({
        title: '手机号格式不对',
        icon: 'none'
      })
      return
    }
    
    if (!this.data.infoDetail.shopId) {
      wx.showToast({
        title: '请选择门店',
        icon: 'none'
      })
      return
    }
    pRequest('person/save',this.data.infoDetail)
    .then(res=>{
      wx.navigateTo({
        url: '../staffManage/staffManage',
      })
    })
  },
  
  //修改人员Model
  showPersonModel:function(e){   
   // debugger
    this.setData({
      updatePerson: e.currentTarget.dataset.update, 
    })
    if (e.currentTarget.dataset.update=='3'){
      this.setData({
        sexCount: this.data.infoDetail.sex 
      })

    } else if (e.currentTarget.dataset.update == '4'){
      this.setData({
        shopCount: this.data.infoDetail.shopId
      })
    }
  },

  //确定修改人员
  editorPerson:function(){
    console.log(this.data.infoDetail)
  // debugger
  let obj = {}
  if (this.data.updatePerson==1){
    if (!this.data.infoDetail.personName) {
      wx.showToast({
        title: '人员姓名不能为空',
        icon: 'none'
      })
      return
    }
    if (!/^[\u4e00-\u9fa5]+$/.test(this.data.infoDetail.personName)) {
      wx.showToast({
        title: '请输入汉字数',
        icon: 'none'
      })
      return
    }
   obj={
     personName: this.data.infoDetail.personName,
     id: this.data.infoDetail.id
   }
  } else if (this.data.updatePerson == 2){
    
    if (!this.data.infoDetail.phone) {
      wx.showToast({
        title: '手机号不能为空',
        icon: 'none'
      })
      return
    }
    if (!/^1[34578]\d{9}$/.test(this.data.infoDetail.phone)) {
      wx.showToast({
        title: '手机号格式不对',
        icon: 'none'
      })
      return
    }
    obj={
      phone: this.data.infoDetail.phone,
      id: this.data.infoDetail.id
    }
    
  }
    pRequest('/person/edit',obj).then(res => {
      this.setData({
        updatePerson: 0
      })
      this.personDatailFun()
      this.refushPage()

    })
  }, 
  //门店列表
   shopListModel:function(){
     pRequest('shop/findListByPersonId',{
      
     }).then(res=>{
        console.log(res)
         let arr = []
        res.forEach(item=>{
          let obj = {
            shopName:item.shopName,
            phone: item.phone,
            otherShopId:item.phone,
            id: item.id,
            name: item.shopName
          }
          arr.push(obj)
        })
        this.setData({
          StoreList:arr
        })

        //debugger
     })
   },
})