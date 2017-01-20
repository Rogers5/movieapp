// posts.js
var Api = require('../../utils/api.js');
var util = require('../../utils/util.js');
Page({
  data: {
    title: '订单确认',
    detail: {},
    movie: {},
    film: {},
    hidden: false,
    modalHidden: true
  },
  onShow: function () {
    this.fetchData();
  },
  fetchData: function (data) {
    var self = this;
    self.setData({
      hidden: false
    });
    wx.request({
      url: Api.getDetail(data),
      success: function (res) {
        console.log(res.data.order_detail);
        self.setData({
          detail: res.data.order_detail
        });
        setTimeout(function () {
          self.setData({
            hidden: true
          });
        }, 300);
      }
    });
  },
  decreaseNum: function (e) {
    var id = e.currentTarget.dataset.id
    var idx = e.currentTarget.dataset.idx
    var count = `detail[${idx}].count`
    console.log(id)
    
    if (this.data.detail[idx].count == 1) {
      wx.request({
        url: Api.addMenu(id, 'del'),
        success: function (res) {
          console.log(res);
        }
      });
      this.setData({
        [count]: false
      });
    } else {
      this.setData({
        [count]: Number.parseInt(this.data.detail[idx].count) - 1
      });
      
    }
  },
  increaseNum: function (e) {
    var idx = e.currentTarget.dataset.idx
    var count = `detail[${idx}].count`
    this.setData({
      [count]: Number.parseInt(this.data.detail[idx].count) + 1
    });
  },
  modalConfirm: function (e) {
    var minus = 0
    var idx = `detail[${minus}].selected`
    this.setData({
      [idx]: true,
      modalHidden: true
    })
  },
  modalCancel: function (e) {
    this.setData({
      modalHidden: true
    })
  }
})