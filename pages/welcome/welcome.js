//welcome.js
Page({
  data: {
    numPeople: 3
  },
  addPeople: function (e) {
    const numPeople = this.data.numPeople < 9 ? this.data.numPeople + 1 : this.data.numPeople;
    this.setData({
      numPeople,
    })
    console.log('+1 people. current people: ', numPeople);
  },
  subPeople: function (e) {
    const numPeople = this.data.numPeople > 2 ? this.data.numPeople - 1 : this.data.numPeople;
    this.setData({
      numPeople,
    })
    console.log('-1 people. current people: ', numPeople);
  }
})
