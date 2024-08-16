import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { login, logout } from '../api'

const initState = { userName: '', avatar: '', token: null, }

export const useUserStore = defineStore(
  'user',
  () => {
    const userInfo = ref({ ...initState })
    const loginForm = ref({})
    const deviceId = ref(null) // 设备id 做设备唯一标识
    const lang = ref('zh') // 语言
    const userMap = ref({ // 当前最新定位的经纬度
      longitude: null,
      latitude: null
    })

    const setUserInfo = (val) => {
      userInfo.value = val
    }

    //切换语言
    const switchLang = (locale) => {
      if (lang.value == 'zh') {
        locale.value = 'en';
        lang.value = 'en'
      } else if (lang.value == 'en') {
        locale.value = 'zh';
        lang.value = 'zh'
      }
      return true
      //以下是需要切换页面标题和tabbar时候刷新的操作
      // uni.redirectTo({
      //   url: '/pages/index/index'
      // })
    }

    const loginInfo = async (postForm) => {
      const { code, data, msg } = await login(postForm)
      if (code == 0) {
        userInfo.value = data
        userInfo.value.phone = postForm.phone
        loginForm.value = postForm
        uni.switchTab({// 跳转到首页
          url: '/pages/home/index',
        })
      }
      return {
        code,
        msg,
        data,
      }
    }

    const clearUserInfo = async () => {
      userInfo.value = { ...initState }
      uni.reLaunch({ url: '/pagesAccount/login/index' })
      await logout()
    }

    const isLogined = computed(() => !!userInfo.value.token)
    const isLoginFn = () => {
      if (!userInfo.value.token) {
        uni.showToast({
          title: '请先登录',
          icon: 'none',
          duration: 2000
        })
        setTimeout(clearUserInfo(), 1200) // 延时跳转
        return false
      } else {
        // console.log("登录了");
        return true
      }
    }

    return {
      userInfo,
      loginForm,
      deviceId,
      lang,
      switchLang,
      setUserInfo,
      loginInfo,
      clearUserInfo,
      isLogined,
      isLoginFn,
      userMap
    }
  },
  {
    persist: true,
  },
)

