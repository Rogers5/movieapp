// posts.js
var Api = require('../../utils/api.js');
var util = require('../../utils/util.js');
Page({
  data: {
    title: '话题列表',
    postsList: [],
    hidden: false,
    count_nowplaying:{},
    count_upcoming:{},
    disabled: false,
    showorder: '加入菜单',
    showtype:'0',
    page: 1,
    tab: 'all'
  },
  onPullDownRefresh: function () {
    this.fetchData();
    console.log('下拉刷新', new Date());
  },
  onShow: function () {
    console.log(1)
    this.fetchData();
  },
  onTapTag: function (e) {
    console.dir(e)
    var self = this;
    var tab = e.currentTarget.id;
    self.setData({
      tab: tab
    });
    if (tab !== 'all') {
      this.fetchData({tab: tab});
    } else {
      this.fetchData();
    }
  },
  fetchData: function (data) {
    var self = this;
    self.setData({
      hidden: false
    });
    if (!data) data = {};
    if (!data.page) data.page = 1;
    if (data.page === 1) {
      self.setData({
        postsList: []
      });
    }
    wx.request({
      url: Api.getTopics(data),
      success: function (res) {
        console.log(res.data.data);
        self.setData({
          postsList: res.data.data
        });
        setTimeout(function () {
          self.setData({
            hidden: true
          });
        }, 300);
      }
    });
  },
  redictAdd: function (e) {
    //加入菜单 jin 2017-01-13 str
    console.log(e);
    var id = e.currentTarget.id;
    var key =  e.target.dataset.id;
    var idx = `postsList[${key}].selected`;
    wx.request({
      url: Api.addMenu(id,'add'),
      success: function (res) {
        console.log(res);
      }
    })
    this.setData({ [idx] : true });
    //2017-01-13 jin 2017-01-13 end
  },
  
  redictCancel: function (e) {
    //加入菜单 jin 2017-01-13 str
    var id = e.currentTarget.id;
    var key =  e.target.dataset.id;
    var idx = `postsList[${key}].selected`;
    this.setData({ [idx] : false });
    wx.request({
      url: Api.addMenu(id,'cancel'),
      success: function (res) {
        console.log(res);
      }
    })
    //2017-01-13 jin 2017-01-13 end
  },

  lower: function (e) {
    var self = this;
    self.setData({
      page: self.data.page + 1
    });
    if (self.data.tab !== 'all') {
      this.fetchData({tab: self.data.tab, page: self.data.page});
    } else {
      this.fetchData({page: self.data.page});
    }
  }
})
