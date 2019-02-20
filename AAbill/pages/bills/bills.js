const app = getApp()
// pages/bills/bills.js

// function transposition_1D(Mat)
// function transposition_2D(Mat)

// (function) new Mat: default zero
function Mat(rows, cols) {
  var Mat = new Array();
  for (var i = 0; i < rows; i++) {
    Mat[i] = new Array();
    for (var j = 0; j < cols; j++) {
      Mat[i][j] = 0;
    }
  }
  return Mat;
}

// (function) dot1-constructure...
function dot1(a, b) {
  return a.map(function (row) {
    return row.map(function (_, i) {
      return row.reduce(function (sum, cell, j) {
        return sum + cell * b[j][i];
      }, 0);
    });
  });
}

// (function) dot2
function dot2(a, b) {
  var Mat = [];
  var rows = a.length;
  var mul = a[0].length;
  var cols = b[0].length;
  for (var i = 0; i < rows; i++) {
    Mat[i] = [];
    for (var j = 0; j < cols; j++) {
      Mat[i][j] = 0;
      for (var k = 0; k < mul; k++) {
        Mat[i][j] += a[i][k] * b[k][j];
      }
    }
  }
  return Mat;
}

// (function) abs
function abs(c) {
  if (c < 0) {
    c = -1 * c
  }
  return c
}

// (function) same
function same(Mat_gap, Mat_exchage) {
  for (var i = 0; i < Mat_gap.length; i++) {
    for (var j = i + 1; j < Mat_gap.length; j++) {
      if (Mat_gap[i] == -1 * Mat_gap[j] && Mat_gap[i] < 0) {
        Mat_exchage[i][j] = Mat_gap[j][0];
        Mat_gap[i][0] = 0;
        Mat_gap[j][0] = 0;
      }
      if (Mat_gap[i] == -1 * Mat_gap[j] && Mat_gap[j] < 0) {
        Mat_exchage[j][i] = Mat_gap[i][0];
        Mat_gap[i][0] = 0;
        Mat_gap[j][0] = 0;
      }
    }
  }
}

// (function) padding
function padding(Mat_gap, Mat_exchage) {
  var min_abs = 0;
  same(Mat_gap, Mat_exchage);
  for (var i = 0; i < Mat_gap.length; i++) {
    for (var j = i; j < Mat_gap.length; j++) {
      //same(Mat_gap, Mat_exchage);
      if (Mat_gap[i][0] * Mat_gap[j][0] > 0) {
        continue;
      }
      else {
        if (Mat_gap[i][0] > 0 && abs(Mat_gap[i][0]) > abs(Mat_gap[j][0])) {
          min_abs = abs(Mat_gap[j][0]);
          Mat_exchage[j][i] = min_abs;
          Mat_gap[i][0] -= min_abs;
          Mat_gap[j][0] += min_abs;
        }
        if (Mat_gap[i][0] > 0 && abs(Mat_gap[i][0]) < abs(Mat_gap[j][0])) {
          min_abs = abs(Mat_gap[i][0]);
          Mat_exchage[j][i] = min_abs;
          Mat_gap[i][0] -= min_abs;
          Mat_gap[j][0] += min_abs;
        }
        if (Mat_gap[i][0] < 0 && abs(Mat_gap[i][0]) > abs(Mat_gap[j][0])) {
          min_abs = abs(Mat_gap[j][0]);
          Mat_exchage[i][j] = min_abs;
          Mat_gap[i][0] += min_abs;
          Mat_gap[j][0] -= min_abs;
        }
        if (Mat_gap[i][0] < 0 && abs(Mat_gap[i][0]) < abs(Mat_gap[j][0])) {
          min_abs = abs(Mat_gap[i][0]);
          Mat_exchage[i][j] = min_abs;
          Mat_gap[i][0] += min_abs;
          Mat_gap[j][0] -= min_abs;
        }
        same(Mat_gap, Mat_exchage);
      }
    }
  }
}

// example 1
var num_people = 4;
var name = ['徐诗楠', '徐昊', '谈舒杰', '徐怡靖']
var who_pay = [[0], [0], [0], [0], [2], [0]];
var who_relate = [[1, 1, 0, 1, 1, 1], [1, 1, 1, 1, 0, 1], [0, 0, 2, 0, 1, 1], [0, 0, 1, 0, 0, 1]];
var money_event = [[124], [60], [417], [99.6], [38], [360]];

// example 2
var num_people = 3;
var name = ['徐诗楠', '徐昊', '谈舒杰']
var who_pay = [[2], [2], [0]];
var who_relate = [[1, 1, 1], [1, 1, 1], [1, 1, 1]];
var money_event = [[194], [183], [533]];


function exchage(num_people, name, who_pay, who_relate, money_event) {
  var num_people = who_relate.length;
  var num_event = who_pay.length;
  var people_AA = new Array(num_event);
  var money = Mat(num_event, 1);
  var weight = Mat(num_people, num_event);
  var cost = Mat(num_people, 1);
  var pay = Mat(num_people, 1);
  var gap = Mat(num_people, 1);
  var exchange = Mat(num_people, num_people);

  // sum -> people_AA
  for (var j = 0; j < num_event; j++) {
    people_AA[j] = 0;
    for (var i = 0; i < num_people; i++) {
      people_AA[j] += who_relate[i][j];
    }
  }

  // division -> money
  for (var i = 0; i < num_event; i++) {
    money[i][0] = money_event[i][0] / people_AA[i];
  }

  // dot -> cost
  weight = who_relate;
  cost = dot2(weight, money);

  // accumulation -> pay
  for (var i = 0; i < num_event; i++) {
    pay[who_pay[i][0]][0] += money_event[i][0]
  }

  // sub -> gap
  for (var i = 0; i < num_people; i++) {
    gap[i][0] = pay[i][0] - cost[i][0]
  }
  //gap=[[90],[-40],[120],[-170]]

  // padding -> exchage
  padding(gap, exchange)
  for (var i = 0; i < num_people; i++) {
    for (var j = 0; j < num_people; j++) {
      exchange[i][j] = exchange[i][j].toFixed(2)
    }
  }

  // json
  var result_json = [];
  for (var i = 0; i < num_people; i++) {
    for (var j = 0; j < num_people; j++) {
      if (exchange[i][j] != 0) {
        var one_row = {};
        one_row.from = name[i];
        one_row.to = name[j];
        one_row.money = exchange[i][j];
        result_json.push(one_row);
      }
    }
  }
  return result_json
}

var a = exchage(num_people, name, who_pay, who_relate, money_event)
console.log(a)

app.data_transmit9 = a

//var b = JSON.stringify(a)
//console.log(b)
//app.data_transmit2 = b
//console.log(app.data_transmit2)

var xxxx = app.data_transmit1
console.log(xxxx)

app.data_transmit3 = 'aaa'

var x4 = app.data_transmit4
console.log(x4)

Page({

  /**
   * 页面的初始数据
   */
  data: {

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