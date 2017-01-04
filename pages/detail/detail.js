// posts.js
var Api  = require('../../utils/api.js');
var util = require('../../utils/util.js');
Page({
  data: {
    title: '电影排片表',
    detail: {},
    movie:{},
    film:{},
    hidden: false
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
        console.log(res.data);     
        self.setData({
          detail: res.data.cinema_array,
          movie : res.data.movie_array,
          film  : res.data.filmslice_array
        });
        setTimeout(function () {
          self.setData({
            hidden: true
          });
        }, 300);
      }
    });
  }
})