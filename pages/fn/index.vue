<script setup>
import { useUserStore } from '@/store'
// import { getAppTodoNum } from '@/api'


const userStore = useUserStore()
const { userInfo } = storeToRefs(userStore)
console.log("🚀 ~ userInfo:", userInfo.value) // userInfo.userType
// 获取屏幕边界到安全区域距离
const { safeAreaInsets } = uni.getSystemInfoSync()

onShow(() => {
  userStore.isLoginFn()
})
const fnList = ref([
  {
    id: '1',
    name: '发起工单',
    icon: 'http://116.62.107.90:8673/images/fns/workInitiate.png',
    msgNum: 0,
    path: '/pagesFn/workInitiate/index',
    permission: [1, 2, 3] // 1企业 2 主管 3 个人
  },
  {
    id: '2',
    name: '工单查询',
    icon: 'http://116.62.107.90:8673/images/fns/workInquire.png',
    msgNum: 0,
    path: '/pagesFn/workInquire/index',
    permission: [1, 2, 3]
  },
  {
    id: '3',
    name: '在线咨询',
    icon: 'http://116.62.107.90:8673/images/fns/consult.png',
    msgNum: 0,
    path: '/pagesFn/consult/index',
    permission: [1, 2, 3]
  },
])

// onMounted(() => {})

const toPages = (item) => {
  uni.navigateTo({
    url: item.path,
  })
}
</script>
<template>
  <wd-toast></wd-toast>
  <view class="fn_box">
    <view class="top_box" :style="{ paddingTop: safeAreaInsets?.top + 'px', height: safeAreaInsets?.top + 124 + 'px' }">
      <view class="title">我的任务</view>
    </view>
    <view class="picture_box">
      <image class="image_bg" src="http://116.62.107.90:8673/images/fns/fn_bg.png" mode="scaleToFill" />
    </view>
    <view class="fn_list">
      <view class="task_item" v-for="(item, index) in fnList" :key="index" @tap="toPages(item)"
        :class="{ isHide: item?.permission && !item?.permission.includes(userInfo.userType) }">
        <image :src="item.icon" mode="scaleToFill" />
        <view class="name">
          {{ item.name }}
          <text class="text_num max" v-if="item?.msgNum > 99">...</text>
          <text class="text_num" v-else-if="item?.msgNum">{{ item?.msgNum }}</text>
        </view>
      </view>
    </view>
  </view>
</template>
<style lang="scss" scoped>
.fn_box {
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background-color: #f7f7fc;

  .fn_list {
    display: flex;
    flex-wrap: wrap;
    width: 90%;
    margin: 10rpx auto;

    .task_item {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 47%;
      height: 200rpx;
      margin-bottom: 30rpx;
      background-color: #fff;
      border-radius: 7rpx 7rpx 7rpx 7rpx;
      box-shadow: 0rpx 5rpx 11rpx 2rpx rgba(205, 205, 205, 0.31);
      margin: 1.2%;

      &.isHide {
        display: none !important;
      }

      // &:nth-child(2n - 1) {
      //   margin: 3.5%;
      // }

      image {
        width: 88rpx;
        height: 88rpx;
        margin-bottom: 10rpx;
      }

      .name {
        position: relative;
        width: 120rpx;
        height: 40rpx;
        font-size: 26rpx;
        line-height: 40rpx;
        color: #252525;
        text-align: center;
        background-color: #fff;

        .text_num {
          position: absolute;
          top: -16rpx;
          right: -16rpx;
          width: 28rpx;
          height: 28rpx;
          font-size: 20rpx;
          line-height: 28rpx;
          color: #fff;
          text-align: center;
          background-color: #e60505;
          border-radius: 50%;
          opacity: 0.6;
        }
      }
    }
  }

  .picture_box {
    position: relative;
    width: 100%;
    height: 200rpx;

    .image_bg {
      position: absolute;
      top: -120rpx;
      left: calc((100% - 700rpx) / 2);
      z-index: 9;
      width: 700rpx;
      height: 320rpx;
    }
  }

  .top_box {
    box-sizing: border-box;
    width: 100%;
    padding-bottom: 20rpx;
    background: linear-gradient(90deg, #4557d1 0%, #75dbed 100%);
    box-shadow: 0rpx 5rpx 11rpx 2rpx rgba(0, 0, 0, 0.09);

    .title {
      width: 100%;
      height: 60rpx;
      font-size: 33rpx;
      line-height: 60rpx;
      color: #ffffff;
      text-align: center;
    }
  }
}
</style>
