<script setup>
import navbar from '@/pages/components/navbar.vue'
import { useToast } from 'wot-design-uni' // ui组件库
const Toast = useToast()

</script>
<template>
    <wd-toast></wd-toast>
    <view class="workInquire_box">
        <navbar :title="'工单查询'" />
        <view class="workInquire_flow">
            工单查询
        </view>

    </view>
</template>

<style lang="scss" scoped>
.workInquire_box {
    width: 100%;
    height: 100vh;
    overflow: hidden;
    background-color: #f7f7fc;

    .workInquire_flow {
        flex: 1;
        width: 100;
        padding-bottom: 100rpx;
        overflow-y: scroll;
        
    }

}
</style>
