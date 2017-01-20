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
  onLoad: function (options) {
    this.fetchData(options.id);
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
    //console.log(e)
    var id = e.currentTarget.dataset.id
    var idx = e.currentTarget.dataset.idx
    var count = `detail[${idx}].count`
    console.log(this.data.detail)
    if (this.data.detail[idx].count !== 1) {
      this.setData({
        //counts: this.data.counts - 1,
        //display: "quantity-decrease"
        [count]:Number.parseInt(this.data.detail[idx].count) - 1
      });
    }else {
      this.setData({
        //[app_price]:this.data.detail[idx].app_price - 1
        display: "decrease-none"
      });
      wx.request({
      url: Api.addMenu(id,'cancel'),
      success: function (res) {
        console.log(res);
      }
    })
      //this.setData({[idx] : true})
        //modalHidden: false,
        //counts: this.data.counts - 1,
        //display: "decrease-none"
      //}
      //);
    }
  },
  increaseNum: function (e) {
    var idx = e.currentTarget.dataset.idx
    var count = `detail[${idx}].count`
    // if (this.data.counts == 0) {
    //   this.setData({
    //     counts: this.data.counts + 1,
    //     display: "quantity-decrease"
    //   });
    // } else {
      this.setData({
        //counts: this.data.counts + 1
        [count]:Number.parseInt(this.data.detail[idx].count) + 1
      });
    // }
  },
  modalConfirm: function (e) {
    //var minus = e.target.dataset.minus
    var minus = 0 
    var idx = `detail[${minus}].selected`
    //console.log(e)
    this.setData({ 
      [idx] : true,
      modalHidden: true 
    })
  },
  modalCancel: function (e) {
    this.setData({
      modalHidden: true
    })
  }
})