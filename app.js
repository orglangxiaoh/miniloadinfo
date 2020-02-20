//app.js
App({ 
  globalData: {
    isAgree: false,
    sets:{},
    screenWidth: 750,
    screenHeight: wx.getSystemInfoSync().screenHeight / wx.getSystemInfoSync().screenWidth * 750,
    url: "https://www.gxph.org.cn",
    //url: "Http://10.1.3.222:8096",
    "navigationBarBackgroundColor": "#DE2910",
    "navigationBarTextStyle": "white"
  }
})