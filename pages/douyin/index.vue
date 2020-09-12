<template>
	<view class="page">
		<swiper class="swiper" :circular="circular" :vertical="true" @change="onSwiperChange">
			<swiper-item v-for="(item,index) in videoList" :key="item.id">
				<video @click="videoplay(index)" class="video" :id="item.id" :ref="item.id" :src="item.src" :controls="false" 
				 :loop="true"
				 :show-center-play-btn="false" 
				 preload="auto" 
			   object-fit='fill' 
				 x5-playsinline="" 
			   playsinline="true"
				 webkit-playsinline="true" 
				 x-webkit-airplay="allow"
				 x5-video-player-type="h5" 
				 x5-video-player-fullscreen=""
				 x5-video-orientation="portraint">
				 <cover-image :id="item.id+'img'" :src="item.img" class="video-image"></cover-image>
				 <cover-view class="video-love" @click="love(item)">
				 	<uni-icons type="heart-filled" :color="isactive==true?'#f44336':'#ffffff'" size="55" />
				 	<view class="video-num">{{item.love_num}}</view>
				 </cover-view>
				 <cover-view class="video-comm" @click="comm">
				 	<uni-icons type="chat-filled" color="#ffffff" size="50" />
				 	<view class="video-num">{{item.comm_num}}</view>
				 </cover-view>
				 <cover-view class="video-redo" @click="redo">
				 	<uni-icons type="redo-filled" color="#ffffff" size="50" />
				 	<view class="video-num">{{item.redo_num}}</view>
				 </cover-view>
				</video>	
			</swiper-item>
		</swiper>
	</view>
</template>
<script>
	const videoData = [{
			src: 'https://img.cdn.aliyun.dcloud.net.cn/guide/uniapp/hellouniapp/hello-nvue-swiper-vertical-01.mp4'
		},
		{
			src: 'https://img.cdn.aliyun.dcloud.net.cn/guide/uniapp/hellouniapp/hello-nvue-swiper-vertical-02.mp4'
		},
		{
			src: 'https://img.cdn.aliyun.dcloud.net.cn/guide/uniapp/hellouniapp/hello-nvue-swiper-vertical-03.mp4'
		},
		{
			src: 'https://img.cdn.aliyun.dcloud.net.cn/guide/uniapp/hellouniapp/hello-nvue-swiper-vertical-01.mp4'
		},
		{
			src: 'https://img.cdn.aliyun.dcloud.net.cn/guide/uniapp/hellouniapp/hello-nvue-swiper-vertical-02.mp4'
		},
		{
			src: 'https://img.cdn.aliyun.dcloud.net.cn/guide/uniapp/hellouniapp/hello-nvue-swiper-vertical-03.mp4'
		}
	];

	export default {
		data() {
			return {
				isactive: false,
				circular: true,
				videoList: [{
						id: "video0",
						src: "https://img.cdn.aliyun.dcloud.net.cn/guide/uniapp/hellouniapp/hello-nvue-swiper-vertical-01.mp4",
						img: "/static/head.jpg",
						love_num: 101,
						comm_num: 1431,
						redo_num: 1001,
					},
					{
						id: "video1",
						src: "https://img.cdn.aliyun.dcloud.net.cn/guide/uniapp/hellouniapp/hello-nvue-swiper-vertical-01.mp4",
						img: "/static/head.jpg",
						love_num: 1100,
						comm_num: 1132,
						redo_num: 1002,
					},
					{
						id: "video2",
						src: "https://img.cdn.aliyun.dcloud.net.cn/guide/uniapp/hellouniapp/hello-nvue-swiper-vertical-01.mp4",
						img: "/static/head.jpg",
						love_num: 3100,
						comm_num: 1233,
						redo_num: 1003,
					}
				],
				videoDataList: []
			}
		},
		onLoad(e) {},
		onReady() {
			this.init();
			this.getData();
		},
		methods: {
			init() {
				this._videoIndex = 0;
				this._videoContextList = [];
				console.log(this)
				for (var i = 0; i < this.videoList.length; i++) {
					this._videoContextList.push(uni.createVideoContext('video' + i, this));
				}
				this._videoDataIndex = 0;
			},
			videoplay(index) {
				const id = this._videoContextList[index].id
				const video = document.getElementById(`${id}`).firstChild.firstChild
				video.paused ?
					this._videoContextList[index].play() :
					this._videoContextList[index].pause()
			},
			getData(e) {
				this.videoDataList = videoData;
				setTimeout(() => {
					this.updateVideo(true);
				}, 200)
			},
			onSwiperChange(e) {
				this.isactive = false
				let currentIndex = e.detail.current;
				if (currentIndex === this._videoIndex) {
					return;
				}

				let isNext = false;
				if (currentIndex === 0 && this._videoIndex === this.videoList.length - 1) {
					isNext = true;
				} else if (currentIndex === this.videoList.length - 1 && this._videoIndex === 0) {
					isNext = false;
				} else if (currentIndex > this._videoIndex) {
					isNext = true;
				}

				if (isNext) {
					this._videoDataIndex++;
				} else {
					this._videoDataIndex--;
				}

				if (this._videoDataIndex < 0) {
					this._videoDataIndex = this.videoDataList.length - 1;
				} else if (this._videoDataIndex >= this.videoDataList.length) {
					this._videoDataIndex = 0;
				}

				this.circular = (this._videoDataIndex != 0);

				if (this._videoIndex >= 0) {
					this._videoContextList[this._videoIndex].pause();
					this._videoContextList[this._videoIndex].seek(0);
				}

				this._videoIndex = currentIndex;

				setTimeout(() => {
					this.updateVideo(isNext);
				}, 200);
			},
			getNextIndex(isNext) {
				let index = this._videoIndex + (isNext ? 1 : -1);
				if (index < 0) {
					return this.videoList.length - 1;
				} else if (index >= this.videoList.length) {
					return 0;
				}
				return index;
			},
			getNextDataIndex(isNext) {
				let index = this._videoDataIndex + (isNext ? 1 : -1);
				if (index < 0) {
					return this.videoDataList.length - 1;
				} else if (index >= this.videoDataList.length) {
					return 0;
				}
				return index;
			},
			updateVideo(isNext) {
				this.$set(this.videoList[this._videoIndex], 'src', this.videoDataList[this._videoDataIndex].src);
				this.$set(this.videoList[this.getNextIndex(isNext)], 'src', this.videoDataList[this.getNextDataIndex(isNext)].src);
				
				setTimeout(() => {
					this._videoContextList[this._videoIndex].hideStatusBar();
					this._videoContextList[this._videoIndex].play();
				}, 200);
				console.log("v:" + this._videoIndex + " d:" + this._videoDataIndex + "; next v:" + this.getNextIndex(
					isNext) + " next d:" + this.getNextDataIndex(isNext));
			},
			love(item) {
				item.love_num += 1
				this.isactive = !this.isactive
			},
			comm() {
				uni.showToast({
					title: '点击评论'
				});
			},
			redo() {
				uni.showToast({
					title: '点击分享'
				});
			}
		}
	}
</script>

<style>
	/* #ifndef APP-PLUS */
	page {
		width: 100%;
		min-height: 100%;
		display: flex;
	}

	/* #endif */

	.page {
		flex: 1;
		width: 750rpx;
	}

	.swiper {
		height: 100vh;
		flex: 1;
		background-color: #007AFF;
	}

	.swiper-item {
		flex: 1;
	}

	.video {
		position: relative;
		flex: 1;
		/* #ifndef APP-PLUS */
		width: 100%;
		/* #endif */
		height: 100vh;
		z-index: 0;
	}
	cover-view,cover-image {
	  display: inline-block;
	}

	.video-image {
		position: fixed;
		bottom: 60vh;
		right: 10px;
		height: 60px;
		width: 60px;
		border-radius: 50%;
		border: 3px solid #fff;
		z-index: 100;
	}

	.video-love {
		position: fixed;
		height: 80px;
		bottom: 46vh;
		right: 15px;
		z-index: 100;
	}

	.video-num {
		text-align: center;
		position: relative;
		bottom: 10px;
		font-size: 14px;
		font-weight: bold;
		color: #FFFFFF;
		z-index: 100;
	}

	.video-comm {
		position: fixed;
		height: 80px;
		bottom: 32vh;
		right: 15px;
		z-index: 100;
	}

	.video-redo {
		position: fixed;
		height: 80px;
		bottom: 19vh;
		right: 15px;
		z-index: 100;
	}
</style>
