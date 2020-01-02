//app.js
App({ 
  globalData: {
    isAgree: false,
    sets:{},
    screenWidth: 750,
    screenHeight: wx.getSystemInfoSync().screenHeight / wx.getSystemInfoSync().screenWidth * 750
  }
})