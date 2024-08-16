// 持久化插件文件
// import { PiniaPluginContext } from 'pinia'
import { deepClone } from 'wot-design-uni/components/common/util' // 持久化插件
export function persist({ store }) {
  // 暂存State
  let persistState = deepClone(store.$state)
  // 从缓存中读取
  const storageState = uni.getStorageSync(store.$id)
  if (storageState) {
    persistState = storageState
  }
  store.$state = persistState
  store.$subscribe(() => {
    // 在存储变化的时候将store缓存
    uni.setStorageSync(store.$id, deepClone(store.$state))
  })
}
