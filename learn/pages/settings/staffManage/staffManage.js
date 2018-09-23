import { pRequest} from '../../../utils/requestUtils.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    startX: 0,
    list: [{}, {}],
    editIndex: 0,
    delBtnWidth: 75,
    showDeleteIndex: -1,
    page:{
      pageSize:10,pageNo:1
    },
    ManagePersonList:[],
    searchData:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.onPullDownRefresh()
  },

  //查看人员详情
  enteredtorinfo: function(e) {
    console.log(e)
    let id = e.currentTarget.dataset.item.id;
    let shopId = e.currentTarget.dataset.item.shopId  
    wx.navigateTo({
      url: '../staffInfo/staffInfo?info=1&id=' + id + '&shopId=' + shopId
    })
  },
  //新增人员详情
  addinfo: function(e) {
    wx.navigateTo({
      url: '../staffInfo/staffInfo?info=2'
    })
  },
  keyvalue:function(e){
    pRequest('person/list',{
      personName: e.detail.value
    }).
    then(res=>{
      this.assemble(res)
    })

  },


  //人员管理
  infoPerson(){
    pRequest('person/list',{
    }).then(res=>{
      this.assemble(res)        
    })  
  },
  assemble:function(res){
    let arr = []
    res.forEach(item => {
      for (var i = 0; i < arr.length; i++) {
        if (arr[i].shopId === item.shopId) {
          arr[i].nodeList.push(item)
          arr[i].nodeList.num++
          return
        }
      }
      arr.push({
        shopName: item.shopName,
        shopId: item.shopId,
        num: 1,
        nodeList: [item]
      });
    })
    this.setData({
      ManagePersonList: arr
    })
  },


  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    this.infoPerson()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  touchS: function(e) {
    console.log("touchS" + e);
    //判断是否只有一个触摸点
    if (this.data.showDeleteIndex != -1) {
      var key = 'list[' + this.data.showDeleteIndex + '].txtStyle'
      this.setData({
        [key]: 'margin-left:0px'
      })
    }
    if (e.touches.length == 1) {
      this.setData({
        //记录触摸起始位置的X坐标
        startX: e.touches[0].clientX
      });
    }
  },
  //触摸时触发，手指在屏幕上每移动一次，触发一次
  touchM: function(e) {
    console.log("touchM:" + e);
    var that = this
    if (e.touches.length == 1) {
      //记录触摸点位置的X坐标
      var moveX = e.touches[0].clientX;
      //计算手指起始点的X坐标与当前触摸点的X坐标的差值
      var disX = that.data.startX - moveX;
      //delBtnWidth 为右侧按钮区域的宽度
      var delBtnWidth = that.data.delBtnWidth;
      var txtStyle = "";
      if (disX == 0 || disX < 0) { //如果移动距离小于等于0，文本层位置不变
        txtStyle = "margin-left:0px";
      } else if (disX > 0) { //移动距离大于0，文本层left值等于手指移动距离
        txtStyle = "margin-left:-" + disX + "px";
        if (disX >= delBtnWidth) {
          //控制手指移动距离最大值为删除按钮的宽度
          txtStyle = "margin-left:-" + delBtnWidth + "px";
        }
      }
      //获取手指触摸的是哪一个item
      var index = e.currentTarget.dataset.index;
      var list = that.data.list;
      //将拼接好的样式设置到当前item中
      list[index].txtStyle = txtStyle;
      //更新列表的状态
      this.setData({
        list: list
      });
    }
  },
  touchE: function(e) {
    console.log("touchE" + e);
    var that = this
    if (e.changedTouches.length == 1) {
      //手指移动结束后触摸点位置的X坐标
      var endX = e.changedTouches[0].clientX;
      //触摸开始与结束，手指移动的距离
      var disX = that.data.startX - endX;
      var delBtnWidth = that.data.delBtnWidth;
      //如果距离小于删除按钮的1/2，不显示删除按钮
      var txtStyle = disX > delBtnWidth / 2 ? "margin-left:-" + delBtnWidth + "px" : "margin-left:0px";
      //获取手指触摸的是哪一项
      var index = e.currentTarget.dataset.index;
      var list = that.data.list;
      list[index].txtStyle = txtStyle;
      //更新列表的状态
      that.setData({
        list: list,
        showDeleteIndex: index
      });
    }
  }
})