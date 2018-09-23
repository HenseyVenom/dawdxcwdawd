// pages/receive/course/course.js
import{
  pRequest, pGetRequest
} from '../../../utils/requestUtils.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    classIntro: "<p>1、培养学员的英语思维和英文交流能力</p><p>2、拓展学员的英语应用场景和表达能力&gt;</p><p>3、实战演练英语口语在生活中的运用</p><p><img src='http://p5mbint1y.bkt.clouddn.com/d95ee1a9dbef4ee2b88cae48d48429b2.jpg'></p>".replace(/\<img/gi, '<img class="rich-img" '),
    isShare: false,
    courseId:'',
    courseDetail:{},
    rtn:'',
    rts:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if(options.isShare){
      this.setData({
        isShare: true,
        rtn: options.rtn,
        rts: options.rts,
      })
    }
    this.setData({
      courseId:options.id
    })
    this.getCourseDetail()
  },
  getCourseDetail(){
    wx.showLoading({
      title: '加载中...',
    })
    pGetRequest('front/unAuth/organShop/shopCourse/view/'+this.data.courseId).then((res)=>{
      wx.hideLoading()
      this.setData({
        courseDetail:res
      })
      this.setData({
        ['courseDetail.classBanner']:JSON.parse(res.classBanner),
        ['courseDetail.classIntro']: res.classIntro.replace(/\<img/gi, '<img class="rich-img" '),
      })
    }).catch((err) => {
      wx.hideLoading()

    })

  },
  shareCourse(e){
    wx.navigateTo({
      url: '/pages/share/share?id='+this.data.courseId+'&type=1',
    })
  },

  /**
   * 用户点击右上角分享
   */
  // onShareAppMessage: function() {
  //   console.log('shareUrl:', '/pages/receive/course/course?isShare=true&' + getApp().getShareQuery())
  //   return{
  //     title: this.data.courseDetail.name,
  //     imageUrl:'/images/course_on_sell.png',
  //     path: '/pages/receive/course/course?isShare=true&' + getApp().getShareQuery() + '&id=' + this.data.courseId
  //   }
  // },
  phoneFun: function (e) {
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.phone //仅为示例，并非真实的电话号码
    })
  },
  buyCourse:function(e){
    wx.navigateTo({
      url: '/pages/receive/login/login?rtn=' + this.data.rtn + '&rts=' + this.data.rts,
    })
  }
})