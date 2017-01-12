// posts.js
var Api  = require('../../utils/api.js');
var util = require('../../utils/util.js');
Page({
  data: {
    title: '电影排片表',
    detail: {},
    movie:{},
    film:{},
    hidden: false,
    counts:10,
    display:"quantity-decrease"
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
  },
  decreaseNum: function (e) {
    if(this.data.counts !== 1){
      this.setData({
          counts: this.data.counts - 1,
          display:"quantity-decrease"
      });
    }else{
      this.setData({
          display:"decrease-none"
      });
    }
    
    //console.log("ID:"+id);

  },
  increaseNum: function (e) {
    //var id = "show"+e.currentTarget.id;
    if(this.data.counts == 1){
      this.setData({
          counts: this.data.counts + 1,
          display:"quantity-decrease"
        });
    }else{
        this.setData({
          counts: this.data.counts + 1
        });
    }
    
    //console.log("ID:"+id);

  }
})