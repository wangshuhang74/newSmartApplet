<script setup>
import navbar from '@/pages/components/navbar.vue'
import { baseURL } from '@/utils/http'
import { useToast } from 'wot-design-uni' // ui组件库
const Toast = useToast()
console.log("🚀 ~ Toast:", Toast)

const postForm = ref({
    demo1: null,
    demo2: null,
    demo3: "demo3",
    demo4: null,
    demo5: null,
    demo6: null,
    demo7: null,
    demo8: null,
    demo9: null,
    demo10: [],
})

const selectPicker = ref(null)// 选择器实列
const selectType = ref('radio') // checkbox radio
const selectColumns = ref([])//选择器选项变量
const selectValue = ref(null) // 选择器选中值
const selectDataType = ref('')//当前选择器的类型

const openSelect = (item, type) => {
    selectDataType.value = type
    switch (type) {
        case 'demo1':
            selectType.value = 'radio'
            selectColumns.value = [
                {
                    label: 'demo1',
                    value: 'demo1'
                },
                {
                    label: 'demo11',
                    value: 'demo11'
                },
            ]
            selectValue.value = item.demo1
            break;
        case 'demo2':
            selectType.value = 'radio'
            selectColumns.value = [
                {
                    label: 'demo2',
                    value: 'demo2'
                },
                {
                    label: 'demo21',
                    value: 'demo21'
                },
            ]
            selectValue.value = item.demo2
            break;
        case 'demo3':
            selectType.value = 'radio'
            selectColumns.value = [
                {
                    label: 'demo3',
                    value: 'demo3'
                },
                {
                    label: 'demo31',
                    value: 'demo31'
                },
            ]
            selectValue.value = item.demo3
            break;
        case 'demo6':
            selectType.value = 'radio'
            selectColumns.value = [
                {
                    label: 'demo6',
                    value: 'demo6'
                },
                {
                    label: 'demo61',
                    value: 'demo61'
                },
            ]
            selectValue.value = item.demo4
            break;
        default:
            selectColumns.value = [
                {
                    label: '暂无数据',
                    value: '',
                    disabled: true
                },

            ]
            selectValue.value = null
            break;
    }

    setTimeout(() => {
        selectPicker.value.open()
    }, 100,)
}

const selectClose = ({ value }) => {
    postForm.value[selectDataType.value] = value
    console.log("🚀 ~ selectClose ~ value:", value)
}

const submitForm = () => {

}

const upAlbum = () => {
    uni.chooseImage({
        count: 6,
        sizeType: ["original", "compressed"],
        sourceType: ["album", "camera"],
        success: (res) => {
            let tempFilePaths = res.tempFilePaths;
            tempFilePaths.forEach((item) => {
                uni.uploadFile({
                    url: baseURL + "sysFile/uploadFile",
                    filePath: item,
                    name: "file",
                    formData: {
                        fileName: "工单图片",
                    },
                    success: (uploadFileRes) => {
                        const { data } = JSON.parse(uploadFileRes.data);
                        postForm.value.demo10.push(data.url);
                    },
                });
            });
        },
    });
}
const demo8Confirm = (val) => {
    console.log("🚀 ~ demo8Confirm ~ val:", val)
}

</script>
<template>
    <wd-toast></wd-toast>
    <view class="workInitiate_box">
        <navbar :title="'发起工单'" />
        <scroll-view class="workInitiate_flow" :scroll-y="true" :show-scrollbar="false" :lower-threshold="50">
            <view class="initiate_form">
                <view class="inp_item">
                    <view class="label">工单类型:</view>
                    <view class="inp_value" @tap="openSelect(postForm, 'demo1')">
                        <view class="val">
                            <text v-if="postForm.demo1">{{ postForm.demo1 }}</text>
                            <text v-else class="placeholderText">请选择</text>
                        </view>
                        <image class="select_icon" src="http://116.62.107.90:8673/images/icons/select_icon.png"
                            mode="scaleToFill" />
                    </view>
                </view>

                <view class="inp_item">
                    <view class="label">故障概述:</view>
                    <view class="inp_value" @tap="openSelect(postForm, 'demo2')">
                        <view class="val">
                            <text v-if="postForm.demo2">{{ postForm.demo2 }}</text>
                            <text v-else class="placeholderText">请选择</text>
                        </view>
                        <image class="select_icon" src="http://116.62.107.90:8673/images/icons/select_icon.png"
                            mode="scaleToFill" />
                    </view>
                </view>

                <view class="inp_item">
                    <view class="label">车牌号码/VIN码:</view>
                    <view class="inp_value" @tap="openSelect(postForm, 'demo3')">
                        <view class="val">
                            <text v-if="postForm.demo3">{{ postForm.demo3 }}</text>
                            <text v-else class="placeholderText">请选择</text>
                        </view>
                        <image class="select_icon" src="http://116.62.107.90:8673/images/icons/select_icon.png"
                            mode="scaleToFill" />
                    </view>
                </view>

                <wd-input type="text" v-model="postForm.demo4" label="车辆数:" placeholder="请输入" />
                <wd-input type="text" v-model="postForm.demo5" label="所属企业:" placeholder="请输入" />

                <view class="inp_item">
                    <view class="label">所属区域:</view>
                    <view class="inp_value" @tap="openSelect(postForm, 'demo6')">
                        <view class="val">
                            <text v-if="postForm.demo6">{{ postForm.demo6 }}</text>
                            <text v-else class="placeholderText">请选择</text>
                        </view>
                        <image class="select_icon" src="http://116.62.107.90:8673/images/icons/select_icon.png"
                            mode="scaleToFill" />
                    </view>
                </view>

                <wd-input type="text" v-model="postForm.demo7" label="详细地址:" placeholder="请输入" />
                <wd-calendar v-model="postForm.demo8" label="预期运维时间:" :show-confirm="false"
                    :min-date="new Date().getTime()" @confirm="demo8Confirm" />
                <wd-input type="text" v-model="postForm.demo9" label="联系电话:" placeholder="请输入" />

                <view class="upImg_box">
                    <view class="label">故障附件:<text class="up_tip"> &nbsp;&nbsp;&nbsp;请上传jpg、png格式图片</text></view>
                    <view class="img_box">
                        <view class="img_item" v-for="(img, idx) in postForm.demo10">
                            <image class="img" :src="baseURL + img" :key="idx" mode="scaleToFill" />
                        </view>
                        <view class="img_item up_btn" @tap="upAlbum">
                            <image class="up_img" src="http://116.62.107.90:8673/images/fns/up_img.png"
                                mode="scaleToFill" />
                        </view>
                    </view>
                </view>
            </view>
            <view class="foot_btns" @click="submitForm">
                <text>提交</text>
            </view>
        </scroll-view>
        <wd-select-picker use-default-slot ref="selectPicker" filterable :type="selectType" :columns="selectColumns"
            v-model="selectValue" @confirm="selectClose" />
    </view>
</template>

<style lang="scss" scoped>
.workInitiate_box {
    width: 100%;
    height: 100vh;
    overflow: hidden;
    background-color: #f7f7fc;

    .workInitiate_flow {
        // flex: 1;
        width: 100;
        // padding-bottom: 60rpx;

        .initiate_form {
            width: calc(100% - 60rpx);
            min-height: 1000rpx;
            margin: 40rpx auto 0 auto;
            border-radius: 7rpx 7rpx 7rpx 7rpx;
            background-color: #ffffff;
            box-shadow: 0rpx 0rpx 10rpx 0rpx rgba(0, 0, 0, 0.1);
            padding: 10rpx 20rpx;
            box-sizing: border-box;

            :deep(.wd-input) {
                padding: 18rpx 6rpx 6rpx 0 !important;
                height: 60rpx;
                border-bottom: 2rpx solid #EFEFEF;

                .wd-input__label-inner {
                    font-size: 24rpx;
                    color: #AAAAAA;
                }

                .wd-input__inner {
                    text-align: right;
                    padding-right: 36rpx;
                    box-sizing: border-box;
                }

                .uni-input-placeholder {
                    font-size: 24rpx;
                    color: #bfbfbf !important;
                }

                .wd-input__placeholder {
                    font-size: 24rpx;
                    color: #bfbfbf !important;
                }

            }

            :deep(.wd-calendar) {
                padding: 18rpx 6rpx 6rpx 0 !important;
                height: 60rpx;
                border-bottom: 2rpx solid #EFEFEF;

                .wd-calendar__cell {
                    padding: 0 0 0 0 !important;

                    .wd-calendar__label {
                        font-size: 24rpx;
                        color: #AAAAAA;
                    }

                    .wd-calendar__body {
                        text-align: right;
                    }
                }
            }

            .label {
                font-size: 24rpx;
                color: #AAAAAA;
                margin-right: 16rpx;
                padding-left: 4rpx;
                box-sizing: border-box;
                flex-shrink: 0; // 不缩小
            }

            .inp_item {
                width: 100%;
                height: 60rpx;
                padding: 12rpx 0;
                display: flex;
                align-items: center;
                border-bottom: 2rpx solid #EFEFEF;

                .inp_value {
                    font-size: 24rpx;
                    color: #000000;
                    flex: 1;
                    box-sizing: border-box;
                    // padding-right: 50rpx;

                    display: flex;
                    align-items: center;

                    .select_icon {
                        width: 24rpx;
                        height: 13rpx;
                        flex-shrink: 0;
                        padding-right: 12rpx;
                    }

                    .val {
                        text-align: right;
                        flex: 1;
                        box-sizing: border-box;
                        padding-right: 12rpx;
                        //溢出显示省略号
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                    }

                    .placeholderText {
                        color: #bfbfbf;
                        font-weight: normal !important;
                    }
                }



                .inp_box {
                    display: flex;
                    align-items: center;

                    .input_val {
                        text-align: right;
                        font-size: 24rpx;
                        color: #AAAAAA;
                        flex: 1;
                        box-sizing: border-box;
                        padding-right: 50rpx;

                        .input-placeholder {
                            font-size: 24rpx;
                            color: #AAAAAA;
                        }


                    }

                }

            }

            .upImg_box {
                width: 100%;
                min-height: 160rpx;
                margin: 30rpx 0;

                .img_box {
                    width: 100%;
                    min-height: 120rpx;
                    padding-top: 10rpx;
                    display: flex;
                    flex-wrap: wrap;
                    box-sizing: border-box;

                    .img_item {
                        width: 116rpx;
                        height: 116rpx;
                        margin: 0 10rpx 10rpx 0;

                        .img {
                            width: 116rpx;
                            height: 116rpx;
                        }

                    }

                    .up_btn {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        background: #F4F4F4;
                        border-radius: 7rpx 7rpx 7rpx 7rpx;

                        .up_img {
                            width: 43rpx;
                            height: 33rpx;
                        }
                    }
                }
            }

        }

        .foot_btns {
            width: calc(100% - 60rpx);
            height: 66rpx;
            margin: 120rpx auto;
            height: 89rpx;
            background: linear-gradient(90deg, #1082FF 0%, #5FA9FF 100%);
            border-radius: 14rpx 14rpx 14rpx 14rpx;
            display: flex;
            align-items: center;
            justify-content: center;

            text {
                font-weight: 500;
                font-size: 32rpx;
                color: #FFFFFF;
            }
        }

    }

}
</style>
