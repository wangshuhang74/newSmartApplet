// 获取导航栏信息
export function getdeviceInfo() {
  const globalData = {
    statusBarHeight: 0, // 状态导航栏高度
    navHeight: 0, // 总体高度
    navigationBarHeight: 0, // 导航栏高度(标题栏高度)
    windowHeight: 0, // 可使用窗口高度
    customHeight: 0, //胶囊高度
    customTop: 0, // 胶囊顶部距离状态栏顶部距离
  };

  let custom = {
    top: 0,
    height: 0,
  };
  /*#ifdef MP-WEIXIN || MP-ALIPAY */
  // 状态栏高度
  globalData.statusBarHeight = uni.getSystemInfoSync().statusBarHeight;
  // 获取微信胶囊的位置信息 width,height,top,right,left,bottom
  custom = uni.getMenuButtonBoundingClientRect();
  // 导航栏高度(标题栏高度) = 胶囊高度 + (顶部距离 - 状态栏高度) * 2
  globalData.navigationBarHeight =
    custom.height + (custom.top - globalData.statusBarHeight) * 2;
  console.log("胶囊高度", custom.top);
  globalData.customHeight = custom.height
  globalData.customTop = custom.top

  // 总体高度 = 状态栏高度 + 导航栏高度
  globalData.navHeight =
    globalData.navigationBarHeight + globalData.statusBarHeight;
  /*#endif*/

  return { globalData, custom };
}
