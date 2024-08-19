<script setup>
import navbar from '@/pages/components/navbar.vue'
import { useToast } from 'wot-design-uni' // ui组件库
const Toast = useToast()
const workInfo = ref({})

const postForm = ref({
    rateValue: 5,
    remark: null
})

onLoad((query) => {
    workInfo.value = JSON.parse(JSON.stringify(query))
    console.log("🚀 ~ onLoad ~ workInfo.value:", workInfo.value)
    console.log(query); // 输出: value1
})

const rateText = {
    1: '非常差',
    2: '差',
    3: '一般',
    4: '满意',
    5: '非常满意'

}

</script>
<template>
    <wd-toast></wd-toast>
    <view class="evaluate_box">
        <navbar :title="'评价'" />
        <view class="evaluate_flow">
            <view class="evaluate">
                <view class="tit">您对本次运维满意吗？</view>
                <view class="headPortrait">
                    <image class="Portrait" src="http://116.62.107.90:8673/images/fns/headPortrait.png"
                        mode="scaleToFill" />
                    <view class="name_box">
                        <text class="name">{{ workInfo?.name }}</text>
                        <text class="remark">运维结束时间:2022-12-30 12:00:00</text>
                    </view>
                </view>
                <view class="rate_box">
                    <text>评价</text>
                    <wd-rate v-model="postForm.rateValue" size="24px" space="6px" />
                    <text>{{ rateText[postForm.rateValue] }}</text>
                </view>
                <view class="testarea_box">
                    <textarea placeholder="您的反馈会督促我们做的更好" class="textarea_inp"></textarea>

                </view>
            </view>
        </view>

    </view>
</template>

<style lang="scss" scoped>
.evaluate_box {
    width: 100%;
    height: 100vh;
    overflow: hidden;
    background-color: #f7f7fc;

    .evaluate_flow {
        flex: 1;
        width: 100;
        padding-bottom: 100rpx;
        overflow-y: scroll;

        .evaluate {
            width: calc(100% - 80rpx);
            margin: 20rpx auto;
            height: 1000rpx;
            background: #FFFFFF;
            box-shadow: 0rpx 5rpx 11rpx 2rpx rgba(0, 0, 0, 0.09);
            border-radius: 14rpx;
            padding: 20rpx;
            box-sizing: border-box;

            .tit {
                width: 100%;
                height: 60rpx;
                font-size: 30rpx;
                color: #172028;
                font-weight: bold;
            }

            .headPortrait {
                width: 100%;
                height: 100rpx;
                display: flex;
                align-items: center;

                .Portrait {
                    width: 80rpx;
                    height: 80rpx;
                    // border-radius: 50%;
                }

                .name_box {
                    flex: 1;
                    margin-left: 10rpx;
                    display: flex;
                    flex-direction: column;

                    .name {
                        font-size: 26rpx;
                        color: #000000;
                    }

                    .remark {
                        font-size: 22rpx;
                        color: #8D949A;
                        margin-top: 10rpx;
                    }

                }

            }

            .rate_box {
                width: 100%;
                height: 100rpx;
                font-size: 26rpx;
                color: #000000;
                display: flex;
                align-items: center;

                text {
                    margin: 0 40rpx;

                    &:first-child {
                        margin: 0 20rpx;
                    }
                }
            }

            .testarea_box {
                width: 100%;
                height: 220rpx;
                background: #F4F4F4;
                border-radius: 5rpx;

                .textarea_inp {
                    width: 100%;
                    height: 100%;
                    padding: 12rpx;
                    box-sizing: border-box;
                    font-size: 28rpx;
                }
            }

        }

    }

}
</style>
