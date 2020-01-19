// pages/common/common.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isAgree: false,
    name: "",
    requestAmount: "",
    phoneNum: "",
    validateCode: "",
    timer: "",
    countDownNum: "30",
    flag: true,
    word: "获取验证码",

    topimg: "",
    loantype: "",
    imageUrls: {
      online: "../../img/0102online.png",
      credit: "../../img/0103credit.png",
      house: "../../img/0104house.png",
      company: "../../img/0105company.png"
    },
    grids: [{
        img: "../../img/loaninfo/11.png",
        line1:"高额度",
        line2:"一次授信",
        line3:"终身使用"
      },
      {
        img: "../../img/loaninfo/12.png",
        line1: "低压力",
        line2: "利息负担小",
        line3: "资金利用大"
      },
      {
        img: "../../img/loaninfo/13.png",
        line1: "产品多样",
        line2: "百家机构合作",
        line3: "多种方案选择"
      },
      {
        img: "../../img/loaninfo/21.png",
        line1: "方便快捷",
        line2: "三步申请 条件宽松",
        line3: "审核迅速 闪电放款"
      },
      {
        img: "../../img/loaninfo/22.png",
        line1: "服务至上",
        line2: "品质服务",
        line3: "专业一对一无隐形费用"
      },
      {
        img: "../../img/loaninfo/23.png",
        line1: "诚信合规",
        line2: "长久品质",
        line3: "合作均为正规机构"
      }
    ]
  },
  bindNameInput: function(e) {
    this.setData({
      name: e.detail.value
    })
  },
  bindMoneyInput: function(e) {
    this.setData({
      requestAmount: e.detail.value
    })
  },
  bindPhoneInput: function(e) {
    this.setData({
      phoneNum: e.detail.value
    })
  },
  bindCodeInput: function(e) {
    this.setData({
      validateCode: e.detail.value
    })
  },
  bindAgreeChange: function(e) {
    this.setData({
      isAgree: !!e.detail.value.length
    });
  },
  bindAgreeClick: function(e) {

  },
  bindGetValidateCode: function() {
    if (!this.data.flag) return;
    if ("" === this.data.name || "" === this.data.requestAmount || "" === this.data.phoneNum) wx.showToast({
      title: "请完善信息",
      icon: "none",
      duration: 2e3
    })
    else if (/^1(3|4|5|6|7|8|9)\d{9}$/.test(this.data.phoneNum)) {
      var t = this;
      t.setData({
        flag: false,
        word: t.data.countDownNum + "s"
      })
      this.sendValidateCode(t, this.data.phoneNum)
    } else wx.showToast({
      title: "请填写正确的手机号码",
      icon: "none",
      duration: 2e3
    });
  },
  sendValidateCode: function(t, phoneNumber) {
    wx.request({
      url: app.globalData.url + "/Home/SendMessage",
      data: {
        phone: phoneNumber
      },
      method: "get",
      success: function(e) {
        if (true === e.data.isSuccess) {
          console.log(e.data.isSuccess)
          wx.showToast({
            title: e.data.message,
            icon: "success",
            duration: 2e3
          })
        } else {
          wx.showToast({
            title: e.data.message,
            icon: "none",
            duration: 2e3
          })
        }
        t.countDown()
      },
      fail: function(t) {
        wx.showModal({
          title: "提示",
          content: t.data.message,
          success: function(t) {
            t.confirm ? console.log("用户点击确定") : t.cancel && console.log("用户点击取消");
          }
        });
      }
    });
  },
  countDown: function() {
    var t = this
    var e = t.data.countDownNum;
    t.setData({
      timer: setInterval(function() {
        e--, t.setData({
          word: e + "s"
        }), e <= 0 && (t.setData({
          word: "获取验证码",
          flag: true
        }), clearInterval(t.data.timer));
      }, 1e3)
    });
  },
  bindSubmit: function() {
    if ("" === this.data.name || this.data.index1 < 0 || "" === this.data.phoneNum || this.data.validateCode === "") {
      wx.showToast({
        title: "请完善信息",
        icon: "none",
        duration: 2e3
      })
    } else if (!this.data.isAgree) {
      wx.showToast({
        title: "同意《相关条款》后才能提交结果",
        icon: "none",
        duration: 2e3
      })
    } else {
      var t = app.globalData.sets
      t.Name = this.data.name
      t.PhoneNumber = this.data.phoneNum
      t.ValidateCode = this.data.validateCode
      t.RequestAmount = this.data.requestAmount
      t.LoanType = this.data.loantype
      console.log(t)
      wx.request({
        url: app.globalData.url + '/Home/AddClientInfo',
        data: t,
        method: "post",
        success: function(e) {
          if (true === e.data.isSuccess) {
            wx.navigateTo({
              url: '../result/result'
            })
          } else {
            wx.showToast({
              title: e.data.message,
              icon: "none",
              duration: 2e3
            })
          }
        },
        fail: function(t) {
          wx.showModal({
            title: "提示",
            content: t.data.message,
            success: function(t) {
              t.confirm ? console.log("用户点击确定") : t.cancel && console.log("用户点击取消");
            }
          });
        }
      });
    }
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.setData({
      isAgree: app.globalData.isAgree
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      loantype: options.loantype,
      topimg: this.data.imageUrls[options.loantype],
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }

})