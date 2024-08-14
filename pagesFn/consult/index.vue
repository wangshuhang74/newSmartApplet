<script setup>
import navbar from '@/pages/components/navbar.vue'
import { useToast } from 'wot-design-uni' // ui组件库
const Toast = useToast()



</script>
<template>
    <wd-toast></wd-toast>
    <view class="consult_box">
        <navbar :title="'在线咨询'" />
        <view class="consult_flow">
            在线咨询在线咨询在线咨询在线咨询在线咨询
        </view>

    </view>
</template>

<style lang="scss" scoped>
.consult_box {
    width: 100%;
    height: 100vh;
    overflow: hidden;
    background-color: #f7f7fc;

    .consult_flow {
        flex: 1;
        width: 100;
        padding-bottom: 100rpx;
        overflow-y: scroll;

    }

}
</style>
