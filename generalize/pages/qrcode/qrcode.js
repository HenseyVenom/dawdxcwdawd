// pages/qrcode/qrcode.js
import {
    pRequest
} from "../../utils/requestUtils.js"
import network from '../../network.js'
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        userInfo: {},
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
        imgUrl: '',
        query: '',
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        var that = this
        console.log(app.globalData.userInfo)
            //debugger
        if (app.globalData.userInfo) {
            this.setData({
                userInfo: app.globalData.userInfo,
                hasUserInfo: true
            })
        } else if (this.data.canIUse) {
            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
            // 所以此处加入 callback 以防止这种情况
            app.userInfoReadyCallback = res => {
                this.setData({
                    userInfo: res.userInfo,
                    hasUserInfo: true
                })
            }
        } else {
            // 在没有 open-type=getUserInfo 版本的兼容处理
            wx.getUserInfo({
                success: res => {
                    app.globalData.userInfo = res.userInfo
                    this.setData({
                        userInfo: res.userInfo,
                        hasUserInfo: true
                    })
                }
            })
        }
        this.getUserData()

    },
    getUserInfo: function(e) {
        console.log(e)
        app.globalData.userInfo = e.detail.userInfo
        this.setData({
            userInfo: e.detail.userInfo,
            hasUserInfo: true
        })
    },

    //生成二维码
    qrcodeFun: function(that) {
        let url = network.baseUrl + 'front/unAuth/wxMini/getQRCode'
        wx.request({
            url: url, //生成二维码的地址
            method: 'POST',
            responseType: 'arraybuffer',
            data: {
                'content': network.webUrl + "/popularizeRed?" + app.getShareQuery(),
                "width": 400,
                "height": 400
            },
            header: {
                'content-type': 'application/json' // 默认值
            },
            success: function(res) {
                console.log(res)
                var src2 = wx.arrayBufferToBase64(res.data); //对数据进行转换操
                that.setData({
                    imgUrl: 'data:image/png;base64,' + src2
                })
            }
        })
    },

    /**
     * 用户点击右上角分享
     */
    // onShareAppMessage: function(Object) {
    //   if (Object.from == 'button') {
    //     console.log('Object:', Object)
    //     if (Object.target.dataset.name == 'invite') {
    //       return {
    //         title: "1亿元报班补贴等您领取",
    //         path: '/pages/invite/invite?' + this.data.query,
    //         imageUrl: '/images/course_on_sell.png'
    //       }
    //     }
    //   }
    // },

    shareCourse(e) {
        wx.navigateTo({
            url: '/pages/share/share?type=0',
        })
    },

    getUserData() {
        pRequest('front/unAuth/wxMini/getUserData', {
            token: getApp().getToken()
        }).then((res) => {
            var query = res.popularizeUrl.split('?')[1]
            var reg = /^(\d{3})\d{4}(\d{4})$/;
            res.popularizeAgentMobile = res.popularizeAgentMobile.replace(reg, "$1****$2")
            this.setData({
                userData: res,
                query: query
            })
            this.qrcodeFun(this)
        }).catch((err) => {

        })
    },
})