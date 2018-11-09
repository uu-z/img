<template lang="pug">
  .pixiv
    .toolbox(v-if="$refs.waterfall" :style="{ maxWidth: waterfallWidth + 'px'}")
      Select(v-model="options.params.mode" @on-change="reload" :style="{flex: 1}")
        Option(v-for="item in modes" :value="item.mode" :key="item.mode") {{item.label}}
      RadioGroup(v-model="type" type="button" @on-change="reload")
        Radio(label="正常")
        Radio(label="R18" disabled)
    .waterfall-box
      vue-waterfall-easy(ref="waterfall" :maxCols="5" :imgWidth="240" srcKey="url" :imgsArr="imgsArr" @scrollReachBottom="loadImage" @click="clickFn")
</template>

<script>
import axios from 'axios';
import { getImgTypeFromUrl, axiosProxy } from '../utils/';
import store2 from 'store2';
import get from 'lodash/get';
import PixivApi from '../utils/pixiv-api-client.js';

const pixiv = new PixivApi();

export default {
	data() {
		return {
			options: {
				url: 'https://www.pixiv.net/ranking.php',
				params: {
					mode: 'daily',
					p: 0,
					format: 'json'
				}
			},
			modes: {
				daily: {
					mode: 'daily',
					label: '日排行'
				},
				weekly: {
					mode: 'weekly',
					label: '周排行'
				},
				monthly: {
					mode: 'monthly',
					label: '月排行'
				},
				rookie: {
					mode: 'rookie',
					label: '新人排行'
				},
				original: {
					mode: 'original',
					label: '原创排行'
				},
				male: {
					mode: 'male',
					label: '男性欢迎排行'
				},
				female: {
					mode: 'female',
					label: '女性欢迎排行'
				}
			},
			type: '正常',
			imgsArr: []
		};
	},
	computed: {
		waterfallWidth() {
			const { colWidth, cols } = this.$refs.waterfall;
			return colWidth * cols;
		}
	},
	watch: {},
	async mounted() {
		this.loadImage();
	},
	methods: {
		async clickFn(event, { index, value }) {},
		async loadImage(state) {
			this.options.params.p++;
			let options = this.options;
			if (this.type == 'R18') {
				options.params.mode += '_r18';
			}

			const { mode } = this.options.params;

			let result = await axiosProxy({
				url: this.options.url,
				params: {
					...this.options.params,
					mode: this.type == 'R18' ? mode + '_r18' : mode
				}
			});

			let contents = get(result, 'data.contents', []);
			contents = contents.map((i) => {
				i.url = i.url.replace('i.pximg.net', 'i.pixiv.cat');
				return i;
			});

			this.imgsArr = this.imgsArr.concat(contents);
		},
		reload() {
			this.imgsArr = [];
			this.options.params = Object.assign(this.options.params, {
				p: 0
			});
			this.loadImage();
		}
	}
};
</script>

<style lang="stylus">
.pixiv{
	.waterfall-box {
		position: absolute;
		top: 0;
		bottom: 0;
		width: 100%;
		z-index: -1;

		.vue-waterfall-easy-scroll {
			padding-top: 50px;
		}
	}

	.toolbox {
		margin: 0 auto;
		padding 5px 0
		background: #f5f5f5;
		padding-right: 1vw;
		display: flex;
		justify-content: space-between;
	}
}

</style>
