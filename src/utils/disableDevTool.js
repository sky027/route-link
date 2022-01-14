(function() {
  window.onkeydown = window.onkeyup = window.onkeypress = function (event) {
    // 判断是否按下F12，F12键码为123
    if (event.keyCode === 123) {
      // 阻止默认事件行为
      event.preventDefault();
      window.event.returnValue = false;
      return false
    }
  }
  // 为右键添加自定义事件，可以禁用
  window.oncontextmenu = function(event) {
    event.preventDefault();
    return false;
  }
  // 定时器检测，开启调试后跳转登录页
  window.setInterval(() => {
    const before = new Date();
    debugger;
    const after = new Date();
    const cost = after.getTime() - before.getTime();
    if (cost > 100) {
      console.log(
        "%c%c 警告：禁止非法启用调试模式，请重新登录",
        "line-height:48px;",
        "line-height:48px;padding:4px;background:#fe0000;color:#fff;fonts-size:16px;margin-right:15px;fonts-weight: bold;"
      );
      window.localStorage.clear()
      window.sessionStorage.clear()
      window.location.reload()
    }
  }, 1000)
})()
