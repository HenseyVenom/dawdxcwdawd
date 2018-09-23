// pages/bankCard/bankCardList/bankCardList.js
import { pRequest } from '../../../utils/requestUtils.js'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isChooseType: false,
    cardObj:{},
    cadeImg:'',
    showCade:false,
    bankimgurl: 'defaultbank',
    cardlist: [
      {
        name: '北京银行',
        imgUrl: 'beijing'
      },
      {
        name: '工商银行',
        imgUrl: 'gongshang'
      },
      {
        name: '光大银行',
        imgUrl: 'guangda'
      },
      {
        name: '广发银行',
        imgUrl: 'guangfa'
      },
      {
        name: '华夏银行',
        imgUrl: 'huaxia'
      },
      {
        name: '建设银行',
        imgUrl: 'jianshe'
      },
      {
        name: '交通银行',
        imgUrl: 'jiaotong'
      },
      {
        name: '民生银行',
        imgUrl: 'minsheng'
      },
      {
        name: '农业银行',
        imgUrl: 'nongye'
      },
      {
        name: '平安银行',
        imgUrl: 'pinan'
      },
      {
        name: '浦发银行',
        imgUrl: 'pufa'
      },
      {
        name: '兴业银行',
        imgUrl: 'xingye'
      },
      {
        name: '招商银行',
        imgUrl: 'zhaoshao'
      },
      {
        name: '中国银行',
        imgUrl: 'zhongguo'
      },
      {
        name: '中信银行',
        imgUrl: 'zhongxin'
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if (options.isChooseType) {
      this.setData({
        isChooseType: options.isChooseType
      })
    }
    this.getCardData()

  },
  addNewBankCard: function(res) {
    
    wx.navigateTo({
      url: '/pages/bankCard/bankCardBinding/bankCardBinding',
    })
  },
  bankCardItem: function(res) {
    if (this.data.isChooseType) {
      var pages= getCurrentPages()
      pages.forEach((item)=>{
        if (item.route =='pages/bankCard/withdraw/withdraw'){
          // item.setData({
          //   bankCard: {
          //     name: '工商银行0533',
          //     id:'0010101023'
          //   }
          // })
        }
      })
      wx.navigateBack({})
    } else {
      wx.navigateTo({
        url: '/pages/bankCard/bankCardUnbinding/bankCardUnbinding?bankName=' + this.data.cardObj.bankName + '&cardNumber=' + this.data.cardObj.cardNumber + '&bankurl='+this.data.bankimgurl
      })
    }
  },
  //获取银行卡信息
  getCardData:function(){
    pRequest('/front/unAuth/wxMini/getUserData', {
      token: app.getToken()
    })
    .then(res => {
      if (res.bankName){
        this.setData({
          showCade: false,
        })     
      }else{
        this.setData({
          showCade: true,
        }) 
      }
      //let imgUrl = "/images/" + res.bankName+".png"
       this.setData({
         cardObj:res
       }) 
      let bankindex = this.data.cardlist.findIndex(item => {
        return item.name == this.data.cardObj.bankName
      })
      if (bankindex == -1) {
        this.setData({
          bankimgurl: 'defaultbank'
        })
      } else {
    
        this.setData({
          bankimgurl: this.data.cardlist[bankindex].imgUrl
        })
      } 
    })
   
  }
})