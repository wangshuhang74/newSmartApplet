<script setup>
import { onLaunch, onShow, onHide } from '@dcloudio/uni-app'


onLaunch(() => {
	// 禁止 横屏
	// #ifdef APP-PLUS	 
	plus.screen.lockOrientation("portrait-primary")
	// #endif
})


onShow(() => {
	// console.log('App Show')
})
onHide(() => {
	// console.log('App Hide')
})
</script>

<style lang="scss">
/*每个页面公共css */
@import '@/uni_modules/uni-scss/index.scss';

/* #ifndef APP-NVUE */
// 设置整个项目的背景色
page {
	background-color: #f5f5f5;
}

/* #endif */
.example-info {
	font-size: 14px;
	color: #333;
	padding: 10px;
}

/* stylelint-disable selector-type-no-unknown */
button::after {
	border: none;
}

swiper,
scroll-view {
	flex: 1;
	height: 100%;
	overflow: hidden;
}

image {
	width: 100%;
	height: 100%;
	vertical-align: middle;
}

// 单行省略，优先使用 unocss: text-ellipsis
.ellipsis {
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}

// 两行省略
.ellipsis-2 {
	display: -webkit-box;
	overflow: hidden;
	text-overflow: ellipsis;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
}

// 三行省略
.ellipsis-3 {
	display: -webkit-box;
	overflow: hidden;
	text-overflow: ellipsis;
	-webkit-line-clamp: 3;
	-webkit-box-orient: vertical;
}
</style>
