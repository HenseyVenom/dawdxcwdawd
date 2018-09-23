// pages/bankCard/bankCardList/bankCardList.js
import{
  pRequest
} from '../../../utils/requestUtils.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isChooseType: false,
    bankCard:{},
    bankimgurl:'defaultbank',
    cardlist:[
      {
       name:'北京银行',
       imgUrl:'beijing'
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
  },
  onShow(){
    this.getUserData()
  },
  addNewBankCard: function(res) {
    wx.navigateTo({
      url: '/pages/bankCard/bankCardBinding/bankCardBinding',
    })
  },
  bankCardItem: function(res) {
    return
    if (this.data.isChooseType) {
      var pages= getCurrentPages()
      pages.forEach((item)=>{
        if (item.route =='pages/bankCard/withdraw/withdraw'){
          var bankName = this.data.bankCard.bankName
          var num = this.data.bankCard.cardNumber.substring(this.data.bankCard.cardNumber.length - 4, this.data.bankCard.cardNumber.length)
          item.setData({
            bankCard: {
              name: bankName+num
            }
          })
        }
      })
      wx.navigateBack({})
    } else {
      debugger
      wx.navigateTo({
        url: '/pages/bankCard/bankCardUnbinding/bankCardUnbinding?bankName=' + this.data.bankCard.bankName + '&cardNumber=' + this.data.bankCard.cardNumber,
      })
    }
  },
  getUserData() {
    pRequest('front/unAuth/wxMini/getUserData', {
      token: getApp().getToken()
    }).then((res) => {
      var that = this
      that.setData({
        bankCard: res,
      })
      let bankindex = this.data.cardlist.findIndex(item=>{
        return item.name == this.data.bankCard.bankName
      })
    //  console.log(bankindex)
    //   debugger
      if (bankindex==-1){
        that.setData({
           bankimgurl: 'defaultbank'
        })
      }else{
        that.setData({
          bankimgurl: this.data.cardlist[bankindex].imgUrl
        })
      }

    }).catch((err) => {

    })
  },
})