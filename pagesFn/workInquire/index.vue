<script setup>
import navbar from '@/pages/components/navbar.vue'
import { useNotify, useToast, useMessage, useQueue } from 'wot-design-uni' // ui组件库
const message = useMessage()
import { toNavigation, makePhoneCall, debounce } from '@/utils'
import dayjs from 'dayjs';
import { finishedList, } from '@/api'
import { useUserStore, useWorkStore } from '@/store'

const Toast = useToast()
const { safeAreaInsets } = uni.getSystemInfoSync()
const { userInfo } = storeToRefs(useUserStore())
const { workDetail } = storeToRefs(useWorkStore())

const workList = ref([{},])
const getForm = ref({
    search: null,
    pageNum: 1,
    pageSize: 10,
    startTime: null,
    endTime: null,
    orderType: null, //
    workState: null // 客户名称
})

const total = ref(0) // 总条数
const isTriggered = ref(false) // 是否在下拉刷新中?
const listState = ref('loading') // 加载状态
const showLoadmore = ref(false) // 是否显示加载更多

const orderTypeList = ref([ // 工单类型
    { label: '全部', value: null },
    { label: '车辆维护', value: 2 },
    { label: '车辆新装', value: 3 },
    { label: '行车记录仪新装', value: 4 }
])

const workStateList = ref([{ label: '全部', value: null }]) //客户选项

onMounted(() => {

})

const getListFn = async () => {
    return
    const { code, data, msg } = await finishedList(getForm.value)
    if (code != 0) return Toast.error(msg)
    total.value = data.total
    if (isTriggered.value) isTriggered.value = false
    showLoadmore.value = false
    workList.value = [...workList.value, ...data.records]
}

const searchInput = debounce(() => {
    getForm.value.pageNum = 1
    workList.value = []
    // getListFn()
}, 600); // 第二个参数是延迟时间，单位为毫秒

const scanBtn = () => {
    uni.scanCode({
        success: (res) => {
            console.log("res", res);
        },
        fail: (err) => {
            console.log("err", err);
        }
    })
}

const onRefresherrefresh = () => { // 下拉刷新
    isTriggered.value = true
    getForm.value.pageNum = 1
    workList.value = []
    getListFn()
}

const scrollBottom = () => { // 上拉加载
    listState.value = 'loading'
    showLoadmore.value = true
    let lengths = workList.value.length
    if (lengths < total.value) {
        getForm.value.pageNum++
        getListFn()
    } else {
        listState.value = 'finished' // 加载完成
        setTimeout(() => {
            showLoadmore.value = false
        }, 1200);
    }
}

const { closeOutside } = useQueue()
const sliderValue = ref(Date.now())

const dropMenu = ref(null) // 

function handleConfirm() { //自定义时间下拉 确定按钮
    getForm.value.startTime = dayjs(sliderValue.value).format("YYYY-MM-DD")
    getForm.value.endTime = dayjs(sliderValue.value).endOf('month').format("YYYY-MM-DD")
    console.log("handleConfirm-getForm.value ", getForm.value);
    dropMenu.value.close()
    workList.value = []
    getListFn()
}

function handleClose() { //自定义时间下拉 关闭按钮
    sliderValue.value = new Date()
    getForm.value.startTime = null
    getForm.value.endTime = null
    dropMenu.value.close()
    console.log("getForm.value", getForm.value);
    getListFn()
}

function handleChange2({ value }) {
    getForm.value.pageNum = 1
    workList.value = []
    getListFn()
}
function handleChange4({ value }) {
    getForm.value.pageNum = 1
    workList.value = []
    getListFn()
}

const evacuateBtn = (item) => {
    const evacuateValue = ref('')
    console.log("🚀 ~ evacuateBtn ~ item:", item)
    message.prompt({
        title: '撤单',
        inputValue: evacuateValue.value,
        inputPlaceholder: '请输入撤单原因',
        inputError: '请输入撤单原因',
        inputPattern: /^.+$/ // 正则校验
    })
        .then((resp) => {
            console.log(resp)
        })
        .catch((error) => {
            console.log(error)
        })
}

const evaluateBtn = (item) => {
    uni.navigateTo({
        url: "/pagesFn/evaluate/index?name=张三三&id=1",
    })
}

const clickItem = (item) => {
    item.isHistory = true
    workDetail.value = item
    uni.navigateTo({
        url: "/pagesFn/components/workDetails",
    })
}

</script>
<template>
    <wd-toast />
    <wd-message-box />
    <view class="workInquire_box">
        <view class="workInquire_flow">
            <navbar :title="'工单查询'" />
            <view class="top_choose" @click="closeOutside">
                <wd-drop-menu :close-on-click-modal="false">
                    <wd-drop-menu-item ref="dropMenu" title="时间段" close-on-click-modal>
                        <view>
                            <wd-datetime-picker-view type="date" v-model="sliderValue" :maxDate="new Date()" />
                            <view class="btns">
                                <wd-button type="info" @tap="handleClose">取消</wd-button>
                                <wd-button @tap="handleConfirm">确定</wd-button>
                            </view>
                        </view>
                    </wd-drop-menu-item>
                    <wd-drop-menu-item v-model="getForm.orderType" title="工单类型" :options="orderTypeList"
                        @change="handleChange2" />
                    <wd-drop-menu-item v-model="getForm.workState" title="工单状态" :options="workStateList"
                        @change="handleChange4" />
                </wd-drop-menu>
            </view>

            <view class="search_box">
                <view class="search">
                    <image class="search_img" src="http://116.62.107.90:8673/images/homeMap/search.png"
                        mode="scaleToFill" />
                    <input type="text" v-model="getForm.search" placeholder="搜索" @input="searchInput">
                    <image class="qr_img" src="http://116.62.107.90:8673/images/fns/qr_img.png" @tap="scanBtn"
                        mode="scaleToFill" />
                </view>
            </view>
        </view>
        <scroll-view class="list_boxs" :scroll-y="true" :show-scrollbar="false" @scrolltolower="scrollBottom"
            @refresherrefresh="onRefresherrefresh" :refresher-triggered="isTriggered" refresher-enabled
            :lower-threshold="50">
            <view class="work_item" v-for="(item, idx) in workList" :key="idx">
                <view class="work_top">
                    <image src="http://116.62.107.90:8673/images/fns/map.png" class="work_icon" mode="scaleToFill" />
                    <view class="work_title">
                        <text class="tit">{{ item?.clientName ? item?.clientName : '-' }}-{{ item?.carPlate ?
                            item?.carPlate :
                            '-' }}</text>
                        <text class="tags tag1" v-if="item.orderStatus">{{ item.orderStatus }}</text>
                        <!-- <text class="tags tag2">待新装</text> -->
                        <!-- <text class="tags tag3">待运维</text> -->
                    </view>
                    <image src="http://116.62.107.90:8673/images/icons/item_arrow.png" class="item_arrow"
                        mode="scaleToFill" />
                </view>
                <view class="work_center" @tap.stop="clickItem(item)">
                    <view class="work_it">
                        <view class="label">联系人:</view>
                        <view class="value">{{ item?.contactName ? item?.contactName : '-' }}</view>
                    </view>

                    <view class="work_it">
                        <view class="label">联系电话:</view>
                        <view class="value isImg">
                            <text>{{ item?.contactPhone ? item?.contactPhone : '-' }}</text>
                            <image class="position_img" src="http://116.62.107.90:8673/images/homeMap/phone.png"
                                @tap.stop="makePhoneCall(item?.contactPhone)" mode="scaleToFill" />
                        </view>
                    </view>

                    <view class="work_it" v-if="item.orderType == 3">
                        <view class="label">新装设备:</view>
                        <view class="value">{{ item?.installType ? item?.installType : '-' }}</view>
                    </view>
                    <view class="work_it" v-else-if="item.orderType == 2">
                        <view class="label">运维内容:</view>
                        <view class="value">{{ item?.content ? item?.content : '-' }}</view>
                    </view>

                    <view class="work_it">
                        <view class="label">地址:</view>
                        <view class="value isImg">
                            <text>{{ item?.address ? item?.address : '-' }}</text>
                            <image class="position_img" src="http://116.62.107.90:8673/images/homeMap/address.png"
                                @tap.stop="toNavigation(item)" mode="scaleToFill" />
                        </view>
                    </view>

                    <view class="work_it" v-if="item.orderType == 3">
                        <view class="label">设备型号:</view>
                        <view class="value">{{ item?.terminalModel ? item?.terminalModel : '-' }}</view>
                    </view>

                    <view class="work_it" v-else-if="item.orderType == 2">
                        <view class="label">故障概述:</view>
                        <view class="value">{{ item?.faultContent ? item?.faultContent : '-' }}</view>
                    </view>

                    <view class="work_it">
                        <view class="label">设备序列号:</view>
                        <view class="value">{{ item?.terminalSerial ? item?.terminalSerial : '-' }}</view>
                    </view>
                </view>
                <view class="btn_box">
                    <view class="btn" @tap.stop="evacuateBtn(item)">撤单</view>
                    <view class="btn" @tap.stop="evaluateBtn(item)">评价</view>
                </view>
            </view>
            <wd-status-tip v-if="workList.length == 0" image="content" tip="暂无工单" />
        </scroll-view>
        <wd-loadmore v-if="showLoadmore" custom-class="loadmore" :state="listState" />
    </view>
</template>

<style lang="scss" scoped>
.workInquire_box {
    width: 100%;
    height: 100vh;
    overflow: hidden;
    background-color: #f7f7fc;
    display: flex;
    flex-direction: column;

    .workInquire_flow {
        width: 100%;


        .top_choose {
            width: 100%;
            height: 80rpx;
            background-color: #fff;
            box-sizing: border-box;
            margin-bottom: 30rpx;

            .wd-drop-menu {
                box-sizing: border-box;

            }

            :deep(.wd-icon-arrow-down) {
                font-size: 42rpx !important;

                &::before {
                    transform: translateX(10rpx) !important;
                }
            }

            :deep(.wd-drop-menu__item) {
                &:last-child {
                    margin-right: 40rpx;
                }
            }

            .btns {
                width: 100%;
                height: 120rpx;
                display: flex;
                align-items: center;
                justify-content: center;
            }

        }

        .search_box {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 66rpx !important;
            // height: 100%;
            margin-top: 10rpx;

            .search {
                display: flex;
                align-items: center;
                justify-content: space-between;
                width: 680rpx;
                height: 66rpx;
                background: #FBFBFB;
                border: 2rpx solid #F4F4F5;
                border-radius: 30rpx 30rpx 30rpx 30rpx;


                .search_img {
                    width: 32rpx;
                    height: 32rpx;
                    margin: 0 10rpx 0 30rpx;
                }

                .qr_img {
                    width: 38rpx;
                    height: 38rpx;
                    margin: 0 30rpx 0 10rpx;
                }

                input {
                    flex: 1;
                    height: 100%;
                    padding-left: 10rpx;
                    font-size: 24rpx;
                    color: #333333;
                }
            }

        }


    }

    .list_boxs {
        flex: 1;
        width: 100%;
        box-sizing: border-box;
        padding: 20rpx 0 20rpx 0;

        :deep(.wd-checkbox-group) {
            background-color: transparent !important;
            background: transparent !important;
        }

        .work_item {
            width: 90%;
            min-height: 260rpx;
            max-height: 360rpx;
            background-color: #fff;
            margin: 0rpx auto 50rpx auto;
            padding: 10rpx 20rpx 0 20rpx;
            box-sizing: border-box;
            box-shadow: 0rpx 5rpx 11rpx 2rpx rgba(0, 0, 0, 0.09);
            border-radius: 14rpx 14rpx 14rpx 14rpx;

            .work_top {
                width: 100%;
                height: 66rpx;
                margin: 0 auto;
                display: flex;
                align-items: center;
                justify-content: space-between;
                flex-wrap: nowrap;

                .work_icon {
                    width: 24rpx;
                    height: 30rpx;
                    margin: 0 10rpx 0 14rpx;
                }

                .item_arrow {
                    width: 13rpx;
                    height: 23rpx;
                    margin-left: 10rpx;
                }

                .work_title {
                    flex: 1;
                    line-height: 66rpx;
                    overflow: hidden;
                    overflow-x: auto;
                    white-space: nowrap;

                    .tit {
                        font-weight: bold;
                        font-size: 26rpx;
                        color: #191919;
                    }

                    .tags {
                        min-width: 70rpx;
                        padding: 4rpx 12rpx;
                        height: 38rpx;
                        border-radius: 6rpx 6rpx 6rpx 6rpx;
                        // opacity: 0.4;
                        text-align: center;
                        line-height: 38rpx;
                        font-size: 24rpx;
                        margin-left: 30rpx;
                        margin-top: 10rpx;


                        &.tag1 {
                            color: #EE793D;
                            background-color: rgba(220, 114, 60, .4);
                        }

                        &.tag2 {
                            color: #26d843;
                            background-color: rgba(46, 203, 66, .4);
                        }

                        &.tag3 {
                            color: #cc1f1f;
                            background-color: rgba(167, 47, 47, .4);
                        }

                    }

                }

            }

            .work_center {
                width: 100%;
                height: 200rpx;
                border-top: 2rpx solid #EFEFEF;
                border-bottom: 2rpx solid #EFEFEF;
                display: flex;
                flex-wrap: wrap;
                box-sizing: border-box;


                .work_it {
                    width: 49%;
                    margin-left: 6rpx;
                    height: calc(100% / 3.2);
                    display: flex;
                    align-items: center;

                    .label {
                        min-width: 60rpx;
                        font-size: 26rpx;
                        color: #AAAAAA;
                        margin-right: 6rpx;
                    }

                    .isImg {
                        padding-right: 24rpx;
                        box-sizing: border-box;
                    }

                    .value {
                        flex: 1;
                        font-size: 26rpx;
                        color: #000000;
                        position: relative;
                        white-space: nowrap;
                        /* 不换行 */
                        overflow: hidden;
                        /* 溢出隐藏 */
                        text-overflow: ellipsis;
                        /* 超出部分显示省略号 */

                        text {
                            white-space: nowrap;
                            /* 不换行 */
                            overflow: hidden;
                            /* 溢出隐藏 */
                            text-overflow: ellipsis;
                            /* 超出部分显示省略号 */
                        }

                        .position_img {
                            position: absolute;
                            top: calc(50% - 15rpx);
                            right: 2rpx;
                            width: 30rpx;
                            height: 30rpx;
                            margin-left: 4rpx;
                        }

                    }


                }


            }

            .btn_box {
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: flex-end;

                .btn {
                    min-width: 80rpx;
                    padding: 0 20rpx;
                    height: 48rpx;
                    line-height: 48rpx;
                    background: linear-gradient(90deg, #4557D1 0%, #75DBED 100%);
                    border-radius: 7rpx 7rpx 7rpx 7rpx;
                    font-weight: 400;
                    font-size: 26rpx;
                    color: #FFFFFF;
                    text-align: center;
                    margin: 16rpx 0;
                    margin-left: 20rpx;
                }
            }


        }

        :deep(.uni-scroll-view-refresher) {
            background: transparent !important;
            background-color: transparent !important;
        }
    }

}
</style>
