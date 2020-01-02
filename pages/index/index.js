//index.js
//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    infos: [
      {
        text: '线上贷',
        url: '../infody/infody',
        loanType:"online"
      },
      {
        text: '信用贷',
        loanType: "credit",
        url: '../infody/infody'
      },
      {
        text: '房贷',
        loanType: "house",
        url: '../infody/infody'
      },
      {
        text: '企业贷',      
        loanType: 'company',
        url: '../infody/infody'
      }
    ]
  },
  bindRecord:function(e){
    wx.navigateTo({
      url: '../record/record',
    })
  },
  bindOnLine:function(e){
    this.navigateToDetail(0)
  },
  bindCredit:function(e){
    this.navigateToDetail(1)
  },
  bindHouse:function(e){
    this.navigateToDetail(2)
  },
  bindCompany:function(e){
    this.navigateToDetail(3)
  },
  navigateToDetail(idx){
    var info = this.data.infos[idx]
    wx.navigateTo({
      url: info.url + "?loantype=" + info.loanType,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

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