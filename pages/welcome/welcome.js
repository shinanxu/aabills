Component({
  properties: {},
  data: {},
  lifetimes: {
    created: function() {},
    attached: function() {
      // 页面创建时执行
      console.info("Page loaded!");
    },
    detached: function() {
      // 页面销毁时执行
      console.info("Page unloaded!");
    }
  },
  methods: {}
});
