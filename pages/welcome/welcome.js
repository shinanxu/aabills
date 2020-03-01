//welcome.js
Page({
  data: {
    numPeople: 3,
    currentStep: 0
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
  },
  nextStep: function (e){
    const currentStep = this.data.currentStep + 1 > 4 ? 4 : this.data.currentStep + 1
    this.setData({
      currentStep,
    })
    console.log('next step. current step: ', currentStep);
  },
  test: function (e) {
    console.log('test');
  }
})