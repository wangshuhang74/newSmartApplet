<script setup>
import navbar from '@/pages/components/navbar.vue'
import { useToast } from 'wot-design-uni' // ui组件库
const Toast = useToast()


</script>
<template>
    <wd-toast></wd-toast>
    <view class="workInitiate_box">
        <navbar :title="'发起工单'" />
        <view class="workInitiate_flow">
            发起工单
        </view>

    </view>
</template>

<style lang="scss" scoped>
.workInitiate_box {
    width: 100%;
    height: 100vh;
    overflow: hidden;
    background-color: #f7f7fc;

    .workInitiate_flow {
        flex: 1;
        width: 100;
        padding-bottom: 100rpx;
        overflow-y: scroll;

    }

}
</style>
