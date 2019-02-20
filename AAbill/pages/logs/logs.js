//logs.js
const app = getApp()
const util = require('../../utils/util.js')


var s9 = app.data_transmit9
console.log(s9)

Page({
  data: {
    logs: []
  },
  onLoad: function () {
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(log => {
        return util.formatTime(new Date(log))
      })
    })
  }
})


